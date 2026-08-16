import { pipeline, env } from "@huggingface/transformers";

const MODEL_ID = "Xenova/paraphrase-multilingual-MiniLM-L12-v2";

const localModelPath = process.env.RAG_MODEL_PATH;

if (localModelPath) {
  env.localModelPath = localModelPath;
}

let embedderPromise: ReturnType<typeof createEmbedder> | null = null;

async function createEmbedder() {
  return pipeline("feature-extraction", MODEL_ID);
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  if (!embedderPromise) {
    embedderPromise = createEmbedder();
  }
  const embedder = await embedderPromise;

  const outputs = await embedder(texts, { pooling: "mean", normalize: true });

  const list = Array.isArray(outputs) ? outputs : [outputs];
  const batch = list[0];

  if (!batch || !batch.dims || batch.dims.length < 2) {
    throw new Error("Unexpected embedding output shape");
  }

  const [batchSize, dim] = batch.dims;
  const data = batch.data as Float32Array;

  const vectors: number[][] = [];
  for (let i = 0; i < batchSize; i++) {
    vectors.push(Array.from(data.subarray(i * dim, (i + 1) * dim)));
  }
  return vectors;
}
