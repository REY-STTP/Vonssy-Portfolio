import type { ChatMessage } from "@/types/rag";

export interface LLMModelStatus {
  operational: boolean;
}

export interface LLMChatOptions {
  model: string;
  messages: ChatMessage[];
  stream?: boolean;
  signal?: AbortSignal;
}

export const DEFAULT_MODEL = "agnes-2.5-flash";
const FALLBACK_MODELS = ["mistral-medium-3-5"];

function baseUrl(): string {
  return process.env.LLM_BASE_URL ?? process.env.NARA_BASE_URL ?? "";
}

function apiKey(): string {
  return process.env.LLM_API_KEY ?? process.env.NARA_API_KEY ?? "";
}

function defaultHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${apiKey()}`,
    Accept: "*/*",
  };
}

export async function getAvailableModel(): Promise<string> {
  return DEFAULT_MODEL;
}

async function postChat(options: LLMChatOptions): Promise<Response> {
  return fetch(`${baseUrl()}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...defaultHeaders(),
    },
    body: JSON.stringify({
      model: options.model,
      messages: options.messages,
      stream: options.stream ?? false,
    }),
    signal: options.signal,
  });
}

export async function streamChat(options: LLMChatOptions): Promise<ReadableStream<Uint8Array>> {
  const candidates = [options.model, ...FALLBACK_MODELS];
  const attempted = new Set<string>();
  let lastError = "";

  for (const model of candidates) {
    if (attempted.has(model)) continue;
    attempted.add(model);

    const res = await postChat({ ...options, model, stream: true });

    if (res.ok && res.body) {
      return res.body;
    }

    const body = await res.text().catch(() => "");
    lastError = `model=${model} status=${res.status} ${body.slice(0, 200)}`;

    if (res.status === 401 || res.status === 403) {
      if (model === options.model) continue;
      break;
    }
  }

  throw new Error(`LLM chat failed: ${lastError}`);
}