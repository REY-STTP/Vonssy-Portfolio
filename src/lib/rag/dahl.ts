import type { ChatMessage } from "@/types/rag";

export interface DahlModelStatus {
  operational: boolean;
}

export interface DahlChatOptions {
  model: string;
  messages: ChatMessage[];
  stream?: boolean;
  signal?: AbortSignal;
}

const DEFAULT_MODEL = "MiniMaxAI/MiniMax-M2.7";
const FALLBACK_MODEL = "deepseek-ai/DeepSeek-V4-Flash-0731";

function baseUrl(): string {
  return process.env.DAHL_BASE_URL ?? "https://inference.dahl.global/v1";
}

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

function defaultHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${apiKey()}`,
    "User-Agent": USER_AGENT,
    Accept: "*/*",
  };
}

function apiKey(): string {
  return process.env.DAHL_API_KEY ?? "";
}

export async function checkModelStatus(model: string, window = "1h"): Promise<DahlModelStatus> {
  const url = `${baseUrl()}/status?model=${encodeURIComponent(model)}&window=${encodeURIComponent(window)}`;
  const res = await fetch(url, {
    headers: defaultHeaders(),
  });
  if (!res.ok) {
    return { operational: false };
  }
  const data = await res.json();
  return { operational: data?.operational === true };
}

export async function getAvailableModel(): Promise<string> {
  try {
    const status = await checkModelStatus(DEFAULT_MODEL);
    return status.operational ? DEFAULT_MODEL : FALLBACK_MODEL;
  } catch {
    return FALLBACK_MODEL;
  }
}

async function postChat(options: DahlChatOptions): Promise<Response> {
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

export async function streamChat(options: DahlChatOptions): Promise<ReadableStream<Uint8Array>> {
  const candidates = [options.model, FALLBACK_MODEL];
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

  throw new Error(`Dahl chat failed: ${lastError}`);
}