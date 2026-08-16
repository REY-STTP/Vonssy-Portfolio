import type { EmbeddingRecord, RetrievedChunk } from "@/types/rag";
import embeddingsData from "@/data/rag/embeddings.json";

let embeddings: EmbeddingRecord[] | null = null;

function loadEmbeddings(): EmbeddingRecord[] {
  if (!embeddings) {
    embeddings = embeddingsData as EmbeddingRecord[];
  }
  return embeddings;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function search(queryVector: number[], topK = 4): RetrievedChunk[] {
  const chunks = loadEmbeddings();
  const scored = chunks.map((chunk) => ({
    chunk,
    score: cosineSimilarity(queryVector, chunk.vector),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map(({ chunk, score }) => ({
    id: chunk.id,
    source: chunk.metadata.source,
    repoName: chunk.metadata.repoName,
    text: chunk.text,
    url: chunk.metadata.url,
    score,
  }));
}

export const MIN_SIMILARITY_THRESHOLD = 0.3;
