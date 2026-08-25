import type { ChatMessage } from "@/types/rag";

export interface LLMChatOptions {
  model: string;
  messages: ChatMessage[];
  stream?: boolean;
  signal?: AbortSignal;
}

export const DEFAULT_MODEL = "agnes-2.5-flash";
const FALLBACK_MODELS = ["mistral-medium-3-5"];
const MAX_TOKENS = 512;
const REQUEST_TIMEOUT_MS = 30_000;

function baseUrl(): string {
  return process.env.LLM_BASE_URL ?? "";
}

function apiKey(): string {
  return process.env.LLM_API_KEY ?? "";
}

function defaultHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${apiKey()}`,
    Accept: "*/*",
  };
}

export async function streamChat(options: LLMChatOptions): Promise<ReadableStream<Uint8Array>> {
  // Try the requested model first, then each fallback in order.
  let lastError = "";

  for (const model of [options.model, ...FALLBACK_MODELS]) {
    try {
      const res = await postChat({ ...options, model, stream: true });

      if (res.ok && res.body) {
        return res.body;
      }

      const body = await res.text().catch(() => "");
      // Do not propagate provider response bodies into thrown errors —
      // they may leak endpoint/provider details to the client via the 500 path.
      console.error(`LLM chat request rejected: model=${model} status=${res.status} body=${body.slice(0, 200)}`);
      lastError = `model=${model} status=${res.status}`;
    } catch (err) {
      lastError = `model=${model} ${err instanceof Error ? err.message : "unknown error"}`;
    }
  }

  throw new Error(`LLM chat failed: ${lastError}`);
}

// Non-streaming completion for internal tasks (e.g. query rewriting).
export async function completeChat(options: Omit<LLMChatOptions, "stream">): Promise<string> {
  let lastError = "";

  for (const model of [options.model, ...FALLBACK_MODELS]) {
    try {
      const res = await postChat({ ...options, model, stream: false });

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        console.error(`LLM completion rejected: model=${model} status=${res.status} body=${body.slice(0, 200)}`);
        lastError = `model=${model} status=${res.status}`;
        continue;
      }

      const json = (await res.json().catch(() => null)) as { choices?: Array<{ message?: { content?: unknown } }> } | null;
      const content = json?.choices?.[0]?.message?.content;
      if (typeof content === "string" && content.trim()) {
        return content.trim();
      }
      lastError = `model=${model} empty completion`;
    } catch (err) {
      lastError = `model=${model} ${err instanceof Error ? err.message : "unknown error"}`;
    }
  }

  throw new Error(`LLM completion failed: ${lastError}`);
}

// Combines the caller's signal (if any) with a hard timeout so a hung
// provider connection cannot keep the request open indefinitely.
function withTimeout(signal?: AbortSignal): { signal: AbortSignal; cancel: () => void } {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const onAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) controller.abort();
    else signal.addEventListener("abort", onAbort, { once: true });
  }
  return {
    signal: controller.signal,
    cancel: () => {
      clearTimeout(timer);
      signal?.removeEventListener("abort", onAbort);
    },
  };
}

async function postChat(options: LLMChatOptions): Promise<Response> {
  const timeout = withTimeout(options.signal);
  try {
    return await fetch(`${baseUrl()}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...defaultHeaders(),
      },
      body: JSON.stringify({
        model: options.model,
        messages: options.messages,
        stream: options.stream ?? false,
        max_tokens: MAX_TOKENS,
      }),
      signal: timeout.signal,
    });
  } finally {
    // Headers received (or the request failed) — stop the connect timeout.
    timeout.cancel();
  }
}