const GEMINI_EMBEDDING_MODEL = "models/gemini-embedding-001";
const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai";
const BATCH_SIZE = 20;
const DEFAULT_DELAY_MS = 700;

function apiKey(): string {
  return process.env.GEMINI_API_KEY ?? "";
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseRetryDelay(body: string): number | null {
  try {
    const json = JSON.parse(body);
    const details = json.error?.details as Array<{ "@type": string; retryDelay?: string }> | undefined;
    if (!details) return null;
    const retryInfo = details.find((d) => d["@type"] === "type.googleapis.com/google.rpc.RetryInfo");
    if (!retryInfo?.retryDelay) return null;
    const match = retryInfo.retryDelay.match(/^(\d+)s$/);
    return match ? parseInt(match[1], 10) * 1000 : null;
  } catch {
    return null;
  }
}

async function embedBatch(texts: string[], retries = 5): Promise<number[][]> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(`${GEMINI_BASE_URL}/embeddings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey()}`,
      },
      body: JSON.stringify({
        model: GEMINI_EMBEDDING_MODEL,
        input: texts,
      }),
    });

    if (res.status === 429 && attempt < retries) {
      const body = await res.text().catch(() => "");
      const serverDelay = parseRetryDelay(body);
      const wait = serverDelay ?? DEFAULT_DELAY_MS * Math.pow(2, attempt);
      console.log(`  Rate limited, waiting ${wait}ms before retry ${attempt + 1}/${retries}...`);
      await sleep(wait);
      continue;
    }

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Gemini embeddings failed (${res.status}): ${body}`);
    }

    const json = await res.json();
    const data = json.data as { embedding: number[] }[] | undefined;
    if (!data || data.length !== texts.length) {
      throw new Error("Gemini embeddings response shape mismatch");
    }
    return data.map((item) => item.embedding);
  }
  throw new Error("Gemini embeddings failed after retries");
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];

  const results: number[][] = [];
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    if (i > 0) await sleep(DEFAULT_DELAY_MS);
    const vectors = await embedBatch(batch);
    results.push(...vectors);
  }
  return results;
}
