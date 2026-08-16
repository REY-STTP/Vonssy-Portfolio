import { NextRequest } from "next/server";
import { embedTexts } from "@/lib/rag/embed";
import { search, MIN_SIMILARITY_THRESHOLD } from "@/lib/rag/retrieve";
import { buildSystemPrompt, buildUserPrompt, getOutOfScopeMessage } from "@/lib/rag/prompt";
import { getAvailableModel, streamChat } from "@/lib/rag/dahl";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { message?: string };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const message = body.message?.trim();
  if (!message) {
    return new Response("message is required", { status: 400 });
  }

  try {
    const [queryVector] = await embedTexts([message]);
    const chunks = search(queryVector, 4);

    if (chunks.length === 0 || chunks[0].score < MIN_SIMILARITY_THRESHOLD) {
      const outOfScope = getOutOfScopeMessage();
      return new Response(
        JSON.stringify({
          reply: outOfScope.content,
          chunks: [],
          score: chunks.length ? chunks[0].score : 0,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    const messages = [buildSystemPrompt(), buildUserPrompt(message, chunks)];
    const model = await getAvailableModel();
    const stream = await streamChat({ model, messages, stream: true });

    return new Response(
      new ReadableStream({
        async start(controller) {
          const reader = stream.getReader();
          const decoder = new TextDecoder();
          let buffer = "";
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split("\n");
              buffer = lines.pop() ?? "";
              for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed.startsWith("data:")) continue;
                const data = trimmed.slice(5).trim();
                if (data === "[DONE]") continue;
                try {
                  const parsed = JSON.parse(data);
                  const delta = parsed?.choices?.[0]?.delta?.content;
                  if (delta) {
                    controller.enqueue(new TextEncoder().encode(delta));
                  }
                } catch {
                  // ignore malformed chunks
                }
              }
            }
          } finally {
            reader.releaseLock();
            controller.close();
          }
        },
      }),
      {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
          "X-Accel-Buffering": "no",
        },
      }
    );
  } catch (error) {
    console.error("Chat route error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
