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

function apiKey(): string {
  return process.env.DAHL_API_KEY ?? "";
}

export async function checkModelStatus(model: string, window = "1h"): Promise<DahlModelStatus> {
  const url = `${baseUrl()}/status?model=${encodeURIComponent(model)}&window=${encodeURIComponent(window)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey()}` },
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
      Authorization: `Bearer ${apiKey()}`,
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
  let res = await postChat({ ...options, stream: true });

  if (res.status === 429 || res.status === 502 || (res.status >= 400 && res.status < 500 && res.status !== 401 && res.status !== 403)) {
    res = await postChat({ ...options, model: FALLBACK_MODEL, stream: true });
  }

  if (!res.ok) {
    throw new Error(`Dahl chat failed with status ${res.status}`);
  }

  if (!res.body) {
    throw new Error("Dahl chat response has no body");
  }

  return res.body;
}
