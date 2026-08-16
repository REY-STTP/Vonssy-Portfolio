import type { ChatMessage, RetrievedChunk } from "@/types/rag";

const SYSTEM_PROMPT = [
  "You are the assistant for Vonssy (Reyvaldi Zakaria), a Web3 builder and automation engineer.",
  "Answer questions only about Vonssy's projects, skills, and how to contact him.",
  "Use the provided context chunks as your primary source of truth.",
  "If the answer is not present in the context, say honestly that the information is not in the data rather than making something up.",
  "Cite the source repo when relevant (e.g. from the source label in the context).",
  "Be concise and direct in your answers.",
].join("\n");

const OUT_OF_SCOPE_RESPONSE =
  "That question is outside what I can help with. I only know about Vonssy's projects, skills, and contact info. You can reach Vonssy directly on Telegram (t.me/vonssy_part_2) or email (rey.zakaria123@gmail.com).";

function buildContextBlock(chunks: RetrievedChunk[]): string {
  return chunks
    .map((chunk, index) => {
      const sourceLabel = chunk.repoName ? `[${chunk.repoName}]` : `[${chunk.source}]`;
      return `Context ${index + 1} ${sourceLabel}:\n${chunk.text}`;
    })
    .join("\n\n");
}

export function buildSystemPrompt(): ChatMessage {
  return { role: "system", content: SYSTEM_PROMPT };
}

export function buildUserPrompt(question: string, chunks: RetrievedChunk[]): ChatMessage {
  const context = buildContextBlock(chunks);
  const content = [
    "Answer the question using the context below. If the context is insufficient, say so honestly.",
    "",
    "--- CONTEXT ---",
    context,
    "--- END CONTEXT ---",
    "",
    `Question: ${question}`,
  ].join("\n");
  return { role: "user", content };
}

export function getOutOfScopeMessage(): ChatMessage {
  return { role: "assistant", content: OUT_OF_SCOPE_RESPONSE };
}
