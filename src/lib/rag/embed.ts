// Provider-agnostic embedding client for any OpenAI-compatible /embeddings
// endpoint. Defaults target Jina AI (generous token-based limits, flexible
// Matryoshka dimensions) — configure via EMBEDDINGS_* env vars, see .env.example.

const BASE_URL = process.env.EMBEDDINGS_BASE_URL ?? "https://api.jina.ai/v1";
const MODEL = process.env.EMBEDDINGS_MODEL ?? "jina-embeddings-v3";

// Matryoshka output size: 1024 balances retrieval quality and index size
// (a 3072-dim vector is 6x larger on disk for marginal quality gains at
// this index scale).
const DIMENSIONS = Number(process.env.EMBEDDINGS_DIMENSIONS ?? 1024);

const BATCH_SIZE = Number(process.env.EMBEDDINGS_BATCH_SIZE ?? 64);
const DEFAULT_DELAY_MS = Number(process.env.EMBEDDINGS_DELAY_MS ?? 250);
const MAX_RETRIES = 8;

/** Asymmetric retrieval tasks supported by Jina embeddings. */
export type EmbeddingTask = "retrieval.passage" | "retrieval.query";

function apiKey(): string {
  const key = process.env.EMBEDDINGS_API_KEY ?? process.env.JINA_API_KEY ?? "";
  if (!key) {
    throw new Error(
      "Missing embedding API key — set EMBEDDINGS_API_KEY (or JINA_API_KEY) in your environment."
    );
  }
  return key;
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

async function embedBatch(texts: string[], task?: EmbeddingTask, retries = MAX_RETRIES): Promise<number[][]> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(`${BASE_URL}/embeddings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey()}`,
      },
      body: JSON.stringify({
        model: MODEL,
        input: texts,
        ...(Number.isFinite(DIMENSIONS) && DIMENSIONS > 0 ? { dimensions: DIMENSIONS } : {}),
        // Jina-specific asymmetric retrieval tuning; other providers ignore it.
        ...(MODEL.startsWith("jina-") && task ? { task } : {}),
      }),
    });

    if ((res.status === 429 || res.status >= 500) && attempt < retries) {
      const bodyText = await res.text().catch(() => "");
      const serverDelay = parseRetryDelay(bodyText);
      const wait = Math.min(serverDelay ?? DEFAULT_DELAY_MS * Math.pow(2, attempt), 30_000);
      console.log(`  Rate limited (${res.status}), waiting ${wait}ms before retry ${attempt + 1}/${retries}...`);
      await sleep(wait);
      continue;
    }

    if (!res.ok) {
      const bodyText = await res.text().catch(() => "");
      throw new Error(`Embeddings failed (${res.status}): ${bodyText}`);
    }

    const json = await res.json();
    const data = json.data as { embedding: number[] }[] | undefined;
    if (!data || data.length !== texts.length) {
      throw new Error("Embeddings response shape mismatch");
    }
    return data.map((item) => item.embedding);
  }
  throw new Error("Embeddings failed after retries");
}

async function embedWithTask(texts: string[], task: EmbeddingTask): Promise<number[][]> {
  if (texts.length === 0) return [];

  const results: number[][] = [];
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    if (i > 0) await sleep(DEFAULT_DELAY_MS);
    const vectors = await embedBatch(batch, task);
    results.push(...vectors);
  }
  return results;
}

/** Embed documents/chunks to be retrieved (indexing side). */
export function embedPassages(texts: string[]): Promise<number[][]> {
  return embedWithTask(texts, "retrieval.passage");
}

/** Embed visitor questions at query time (runtime side). */
export function embedQueries(texts: string[]): Promise<number[][]> {
  return embedWithTask(texts, "retrieval.query");
}
