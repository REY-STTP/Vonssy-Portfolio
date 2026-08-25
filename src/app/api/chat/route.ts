import { NextRequest } from "next/server";
import { embedTexts } from "@/lib/rag/embed";
import { search, MIN_SIMILARITY_THRESHOLD } from "@/lib/rag/retrieve";
import {
  buildRewriteMessages,
  buildSystemPrompt,
  buildUserPrompt,
  getOutOfScopeMessage,
  sanitizeUntrusted,
} from "@/lib/rag/prompt";
import { DEFAULT_MODEL, completeChat, streamChat } from "@/lib/rag/llm";
import type { ChatMessage, RetrievedChunk, SourceRef } from "@/types/rag";

export const runtime = "nodejs";
// Streaming LLM responses can be slow — allow up to the Hobby-plan maximum.
export const maxDuration = 60;

const MAX_MESSAGE_LENGTH = 1000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const RATE_LIMIT_PRUNE_THRESHOLD = 5000;

// Conversation history limits — keeps prompts (and abuse surface) bounded.
const MAX_HISTORY_MESSAGES = 8;
const MAX_HISTORY_CONTENT_CHARS = 1500;

// Best-effort answer cache for repeated questions. On Vercel this lives
// per-instance (resets on cold start), so treat it as a cost optimization,
// not a correctness layer.
const ANSWER_CACHE_TTL_MS = 60 * 60 * 1000;
const ANSWER_CACHE_MAX_ENTRIES = 100;
const answerCache = new Map<string, { reply: string; sources: SourceRef[]; expiresAt: number }>();

/** Dedupes retrieved chunks into a compact list of source references. */
function buildSourceRefs(chunks: RetrievedChunk[]): SourceRef[] {
  const seen = new Set<string>();
  const sources: SourceRef[] = [];
  for (const chunk of chunks) {
    const name = chunk.repoName ?? chunk.source;
    const key = `${name}|${chunk.url ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    sources.push({ name, url: chunk.url });
  }
  return sources;
}

function encodeSourcesHeader(sources: SourceRef[]): string {
  return encodeURIComponent(JSON.stringify(sources));
}

function getNormalizedCacheKey(message: string): string {
  // Collapse internal whitespace so "who  is Vonssy?" and "who is Vonssy?"
  // share a cache entry; case differences are normalized too.
  return message.toLowerCase().replace(/\s+/g, " ").trim();
}

// Parses untrusted history from the request body into safe ChatMessages.
function parseHistory(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  const valid = raw.filter(
    (item): item is { role: "user" | "assistant"; content: string } =>
      typeof item === "object" &&
      item !== null &&
      "role" in item &&
      "content" in item &&
      ((item as { role: unknown }).role === "user" || (item as { role: unknown }).role === "assistant") &&
      typeof (item as { content: unknown }).content === "string"
  );
  return valid
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => ({ role: m.role, content: sanitizeUntrusted(m.content).slice(0, MAX_HISTORY_CONTENT_CHARS) }))
    .filter((m) => m.content.length > 0);
}

function getCachedAnswer(key: string): { reply: string; sources: SourceRef[] } | null {
  const entry = answerCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    answerCache.delete(key);
    return null;
  }
  // Re-insert to mark this entry as most recently used.
  answerCache.delete(key);
  answerCache.set(key, entry);
  return { reply: entry.reply, sources: entry.sources };
}

function setCachedAnswer(key: string, reply: string, sources: SourceRef[]): void {
  const trimmed = reply.trim();
  if (!trimmed) return;
  if (answerCache.size >= ANSWER_CACHE_MAX_ENTRIES) {
    // Evict the least recently used entry.
    const oldest = answerCache.keys().next().value;
    if (oldest !== undefined) answerCache.delete(oldest);
  }
  answerCache.set(key, { reply: trimmed, sources, expiresAt: Date.now() + ANSWER_CACHE_TTL_MS });
}

// Fixed-window in-memory rate limiter, keyed by client IP.
// Sufficient for a single-node deployment; swap for a shared store
// (e.g. Redis/Upstash) if this route ever runs on serverless.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function pruneRateLimit(now: number) {
  for (const [key, entry] of rateLimitMap) {
    if (entry.resetAt <= now) rateLimitMap.delete(key);
  }
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  if (rateLimitMap.size > RATE_LIMIT_PRUNE_THRESHOLD) pruneRateLimit(now);

  const entry = rateLimitMap.get(key);
  if (!entry || entry.resetAt <= now) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

function clientKey(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isCrossOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false; // non-browser clients (curl, etc.) are allowed
  const host = req.headers.get("host");
  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

export async function POST(req: NextRequest) {
  if (isRateLimited(clientKey(req))) {
    return new Response(JSON.stringify({ error: "Too many requests. Please try again in a minute." }), {
      status: 429,
      headers: { "Content-Type": "application/json", "Retry-After": "60" },
    });
  }

  if (isCrossOrigin(req)) {
    return new Response("Forbidden", { status: 403 });
  }

  let body: { message?: string; history?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const rawMessage = body.message?.trim();
  if (!rawMessage) {
    return new Response("message is required", { status: 400 });
  }
  if (rawMessage.length > MAX_MESSAGE_LENGTH) {
    return new Response(`message must be at most ${MAX_MESSAGE_LENGTH} characters`, { status: 400 });
  }
  const message = sanitizeUntrusted(rawMessage);
  if (!message) {
    return new Response("message is required", { status: 400 });
  }

  const history = parseHistory(body.history);
  const cacheKey = getNormalizedCacheKey(message);

  // The answer cache is only safe for first-turn questions — a follow-up's
  // answer depends on its conversation context, which rarely repeats exactly.
  if (history.length === 0) {
    const cached = getCachedAnswer(cacheKey);
    if (cached) {
      // Same shape as the out-of-scope response — the client already
      // handles full JSON replies (renders them instantly, no stream).
      return new Response(JSON.stringify({ reply: cached.reply, cached: true }), {
        headers: { "Content-Type": "application/json", "X-Cache": "HIT", "X-Sources": encodeSourcesHeader(cached.sources) },
      });
    }
  }

  try {
    let searchQuery = message;

    // Multi-turn: resolve references ("what tech does IT use?") into a
    // standalone query before embedding. Falls back to the raw question
    // if rewriting fails — retrieval just gets slightly less precise.
    if (history.length > 0) {
      try {
        const rewritten = await completeChat({
          model: DEFAULT_MODEL,
          messages: buildRewriteMessages(history, message),
        });
        const cleaned = sanitizeUntrusted(rewritten.replace(/^["']+|["']+$/g, "")).slice(0, MAX_MESSAGE_LENGTH);
        if (cleaned) searchQuery = cleaned;
      } catch (err) {
        console.warn("Query rewriting failed, falling back to original question:", err instanceof Error ? err.message : err);
      }
    }

    const [queryVector] = await embedTexts([searchQuery]);
    const chunks = search(queryVector, 4);

    if (chunks.length === 0 || chunks[0].score < MIN_SIMILARITY_THRESHOLD) {
      const outOfScope = getOutOfScopeMessage();
      return new Response(
        JSON.stringify({
          reply: outOfScope.content,
          chunks: [],
          score: chunks.length ? chunks[0].score : 0,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    const messages = [buildSystemPrompt(), buildUserPrompt(message, chunks, history)];
    const sources = buildSourceRefs(chunks);
    const stream = await streamChat({ model: DEFAULT_MODEL, messages, stream: true });

    return new Response(
      new ReadableStream({
        async start(controller) {
          const reader = stream.getReader();
          const decoder = new TextDecoder();
          let buffer = "";
          let fullReply = "";
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split("\n");
              buffer = lines.pop() ?? "";
              for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed.startsWith("data:")) continue;
                const data = trimmed.slice(5).trim();
                if (data === "[DONE]") continue;
                try {
                  const parsed = JSON.parse(data);
                  const delta = parsed?.choices?.[0]?.delta?.content;
                  if (delta) {
                    fullReply += delta;
                    controller.enqueue(new TextEncoder().encode(delta));
                  }
                } catch {
                  // ignore malformed chunks
                }
              }
            }
            // Stream finished cleanly — remember first-turn answers so
            // repeat questions skip the paid APIs entirely.
            if (history.length === 0) {
              setCachedAnswer(cacheKey, fullReply, sources);
            }
          } finally {
            reader.releaseLock();
            controller.close();
          }
        },
      }),
      {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
          "X-Accel-Buffering": "no",
          // Retrieval sources for the client to render as citation chips.
          "X-Sources": encodeSourcesHeader(sources),
        },
      }
    );
  } catch (error) {
    console.error("Chat route error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
