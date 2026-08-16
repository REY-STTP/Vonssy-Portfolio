export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatUIMessage {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

export interface RetrievedChunk {
  id: string;
  source: string;
  repoName?: string;
  text: string;
  url?: string;
  score: number;
}

export interface EmbeddingRecord {
  id: string;
  vector: number[];
  text: string;
  metadata: {
    source: string;
    repoName?: string;
    url?: string;
  };
}

export interface RagSource {
  source: string;
  repoName?: string;
  url?: string;
  content: string;
}
