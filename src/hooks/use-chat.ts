"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatUIMessage } from "@/types/rag";

const HISTORY_KEY = "vonssy-chat-history";

function loadHistory(): ChatUIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (m): m is ChatUIMessage =>
        m && typeof m === "object" && (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
    );
  } catch {
    return [];
  }
}

export function useChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatUIMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const messagesRef = useRef<ChatUIMessage[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
    if (typeof window === "undefined") return;

    // Debounce persistence: token-by-token streaming mutates `messages`
    // many times per second, and stringify-ing the whole history on every
    // delta wastes CPU. Only write after the stream settles briefly.
    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
      } catch {
        // ignore storage errors
      }
    }, 400);

    return () => window.clearTimeout(timer);
  }, [messages]);

  useEffect(() => {
    // Mount-time hydration from sessionStorage: messages must start empty on
    // the server and restore after mount, so setState here is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessages(loadHistory());
  }, []);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const appendMessage = useCallback((message: ChatUIMessage) => {
    setMessages((prev) => {
      const next = [...prev, message];
      return next;
    });
  }, []);

  const updateLastAssistant = useCallback((delta: string) => {
    setMessages((prev) => {
      const next = [...prev];
      const last = next[next.length - 1];
      if (last && last.role === "assistant") {
        next[next.length - 1] = { ...last, content: last.content + delta };
      } else {
        next.push({ role: "assistant", content: delta });
      }
      return next;
    });
  }, []);

  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setIsStreaming(false);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      appendMessage({ role: "user", content: trimmed });
      appendMessage({ role: "assistant", content: "", streaming: true });
      setError(null);
      setIsStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed }),
          signal: controller.signal,
        });

        if (!res.ok) {
          let detail = "Something went wrong.";
          try {
            const data = await res.json();
            detail = data?.error ?? detail;
          } catch {
            // keep default
          }
          throw new Error(detail);
        }

        const contentType = res.headers.get("Content-Type") ?? "";
        if (contentType.includes("application/json")) {
          const data = await res.json();
          const reply = typeof data?.reply === "string" ? data.reply : "";
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: "assistant", content: reply, streaming: false };
            return next;
          });
          setIsStreaming(false);
          return;
        }

        if (!res.body) throw new Error("No response body");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          if (chunk) updateLastAssistant(chunk);
        }

        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last && last.role === "assistant") {
            next[next.length - 1] = { ...last, streaming: false };
          }
          return next;
        });
      } catch (err) {
        if (controller.signal.aborted) return;
        const message = err instanceof Error ? err.message : "Something went wrong.";
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last && last.role === "assistant" && last.streaming) {
            next.pop();
          }
          return next;
        });
        setError(message);
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [appendMessage, updateLastAssistant, isStreaming]
  );

  return {
    isOpen,
    setIsOpen,
    messages,
    isStreaming,
    error,
    setError,
    sendMessage,
    clearChat,
  };
}
