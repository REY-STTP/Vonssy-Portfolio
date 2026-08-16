"use client";

import { Fragment, type ReactNode } from "react";

function stripSystemReminders(content: string): string {
  return content
    .replace(/<system-reminder>[\s\S]*?<\/system-reminder>/gi, "")
    .replace(/<system>[\s\S]*?<\/system>/gi, "")
    .trim();
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key++}>{token.slice(2, -2)}</strong>
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code key={key++} className="chat-code-inline">
          {token.slice(1, -1)}
        </code>
      );
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderCodeBlock(code: string, key: string): ReactNode {
  const trimmed = code.replace(/^```[a-zA-Z0-9]*\s*\n?/, "").replace(/\n?```$/, "");
  return (
    <pre key={key} className="chat-code-block">
      <code>{trimmed}</code>
    </pre>
  );
}

export function ChatMarkdown({ content }: { content: string }) {
  const cleaned = stripSystemReminders(content);
  const lines = cleaned.split("\n");

  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let i = 0;
  let key = 0;

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push(<p key={`p-${key++}`}>{renderInline(paragraph.join(" "))}</p>);
      paragraph = [];
    }
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      flushParagraph();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push(renderCodeBlock(codeLines.join("\n"), `cb-${key++}`));
      continue;
    }

    if (/^[-*•]\s+/.test(trimmed)) {
      flushParagraph();
      const items: string[] = [];
      while (i < lines.length && /^[-*•]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*•]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul key={`ul-${key++}`}>
          {items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+[.)]\s+/.test(trimmed)) {
      flushParagraph();
      const items: string[] = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+[.)]\s+/, ""));
        i++;
      }
      blocks.push(
        <ol key={`ol-${key++}`}>
          {items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    if (trimmed === "") {
      flushParagraph();
      i++;
      continue;
    }

    paragraph.push(trimmed);
    i++;
  }

  flushParagraph();

  return <Fragment>{blocks}</Fragment>;
}
