import { NextRequest } from "next/server";
import { embedTexts } from "@/lib/rag/embed";
import { search, MIN_SIMILARITY_THRESHOLD } from "@/lib/rag/retrieve";
import { buildSystemPrompt, buildUserPrompt, getOutOfScopeMessage, sanitizeUntrusted } from "@/lib/rag/prompt";
import { DEFAULT_MODEL, streamChat } from "@/lib/rag/llm";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 1000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const RATE_LIMIT_PRUNE_THRESHOLD = 5000;

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

  let body: { message?: string };
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

  try {
    const [queryVector] = await embedTexts([message]);
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

    const messages = [buildSystemPrompt(), buildUserPrompt(message, chunks)];
    const stream = await streamChat({ model: DEFAULT_MODEL, messages, stream: true });

    return new Response(
      new ReadableStream({
        async start(controller) {
          const reader = stream.getReader();
          const decoder = new TextDecoder();
          let buffer = "";
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
                    controller.enqueue(new TextEncoder().encode(delta));
                  }
                } catch {
                  // ignore malformed chunks
                }
              }
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
