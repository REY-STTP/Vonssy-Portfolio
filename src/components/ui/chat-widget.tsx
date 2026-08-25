"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@/hooks/use-chat";
import { ChatIcon, CloseIcon, SendIcon } from "@/components/icons";
import { ChatMarkdown } from "@/components/ui/chat-markdown";

interface ChatWidgetProps {
  reduceMotion: boolean;
}

const SUGGESTIONS = [
  "Who is Vonssy?",
  "What kind of projects does Vonssy work on?",
  "What kind of help can you provide?",
];

export function ChatWidget({ reduceMotion }: ChatWidgetProps) {
  const { isOpen, setIsOpen, messages, isStreaming, error, setError, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isOpen, isStreaming]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), reduceMotion ? 0 : 120);
    // Clear pending focus timers so we never touch the DOM after unmount.
    return () => window.clearTimeout(timer);
  }, [isOpen, reduceMotion]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  const handleSubmit = () => {
    const value = input.trim();
    if (!value || isStreaming) return;
    setInput("");
    setError(null);
    sendMessage(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setError(null);
    sendMessage(suggestion);
  };

  const handleClear = () => {
    clearChat();
    setError(null);
  };

  return (
    <>
      <motion.button
        type="button"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        initial={false}
        animate={{ scale: reduceMotion ? 1 : isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
        className="chat-bubble button"
        style={{ pointerEvents: isOpen ? "none" : "auto" }}
      >
        <ChatIcon />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            className="chat-panel soft"
            role="dialog"
            aria-modal="false"
            aria-label="Chat with Vonssy AI"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.97 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
          >
            <div className="chat-panel-header">
              <div className="chat-panel-title">
                <span className="availability-dot" aria-hidden="true" />
                <span className="mono text-xs font-bold uppercase tracking-wide">Vonssy AI</span>
              </div>
              <button
                type="button"
                aria-label="Clear chat"
                onClick={handleClear}
                className="chat-header-action"
                disabled={messages.length === 0}
              >
                Clear
              </button>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
                className="chat-header-close button button-ghost"
              >
                <CloseIcon size={16} />
              </button>
            </div>

            <div ref={scrollRef} className="chat-messages" aria-live="polite">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-row chat-row-${message.role}`}
                >
                  <div className="chat-message">
                    {message.role === "assistant" ? (
                      <ChatMarkdown content={message.content} />
                    ) : (
                      message.content
                    )}
                    {message.streaming && <span className="chat-cursor" aria-hidden="true" />}
                  </div>
                </div>
              ))}

              {messages.length === 0 && (
                <div className="chat-empty">
                  <p className="text-soft">Ask me anything about Vonssy&apos;s projects, skills, and how to contact him.</p>
                  <div className="chat-suggestions">
                    {SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        className="button button-ghost chat-suggestion"
                        onClick={() => handleSuggestion(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <div className="chat-error">
                  <span>{error}</span>
                  <button type="button" className="chat-error-retry" onClick={() => setError(null)}>
                    Dismiss
                  </button>
                </div>
              )}
            </div>

            <div className="chat-input-wrap">
              <textarea
                ref={inputRef}
                className="chat-input"
                rows={1}
                value={input}
                placeholder="Ask about Vonssy..."
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isStreaming}
              />
              <button
                type="button"
                aria-label="Send message"
                onClick={handleSubmit}
                className="button button-primary chat-send"
                disabled={!input.trim() || isStreaming}
              >
                <SendIcon size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
