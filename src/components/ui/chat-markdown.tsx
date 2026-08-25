"use client";

import { Fragment, type ReactNode } from "react";

function stripSystemReminders(content: string): string {
  return content
    .replace(/<system-reminder>[\s\S]*?<\/system-reminder>/gi, "")
    .replace(/<system>[\s\S]*?<\/system>/gi, "")
    .trim();
}

// Inline tokens: bold, strikethrough, inline code, markdown links, bare URLs.
const INLINE_PATTERN =
  /(\*\*[^*]+\*\*|~~[^~]+~~|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|https?:\/\/[^\s<>[\]]+)/g;

function isSafeUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = INLINE_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];

    if (token.startsWith("**")) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("~~")) {
      nodes.push(<del key={key++}>{token.slice(2, -2)}</del>);
    } else if (token.startsWith("`")) {
      nodes.push(
        <code key={key++} className="chat-code-inline">
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("[")) {
      // Markdown link: [label](url)
      const parsed = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token);
      if (parsed && isSafeUrl(parsed[2])) {
        nodes.push(
          <a
            key={key++}
            href={parsed[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-link"
          >
            {parsed[1]}
          </a>
        );
      } else {
        nodes.push(token);
      }
    } else {
      // Bare URL — peel off trailing punctuation so sentences stay clean.
      let url = token;
      let trailing = "";
      const tail = /[.,;:!?)\]]+$/.exec(url);
      if (tail) {
        trailing = tail[0];
        url = url.slice(0, -trailing.length);
      }
      nodes.push(
        <a key={key++} href={url} target="_blank" rel="noopener noreferrer" className="chat-link">
          {url}
        </a>
      );
      if (trailing) nodes.push(trailing);
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

function isTableSeparator(row: string[]): boolean {
  return row.length > 0 && row.every((cell) => /^:?-{2,}:?$/.test(cell));
}

function splitTableRow(line: string): string[] {
  return line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderTable(tableLines: string[], key: string): ReactNode {
  const rows = tableLines.map(splitTableRow);

  // GFM shape: header row, separator row (---), then body rows.
  const hasSeparator = rows.length >= 2 && isTableSeparator(rows[1]);
  const header = hasSeparator ? rows[0] : null;
  const bodyRows = hasSeparator ? rows.slice(2) : rows;

  return (
    <div key={key} className="chat-table-wrap">
      <table className="chat-table">
        {header && (
          <thead>
            <tr>
              {header.map((cell, ci) => (
                <th key={ci}>{renderInline(cell)}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {bodyRows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci}>{renderInline(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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

    // Table: current line starts with "|" and either this or the next line
    // is a separator row.
    if (
      trimmed.startsWith("|") &&
      (isTableSeparator(splitTableRow(trimmed)) ||
        (i + 1 < lines.length && lines[i + 1].trim().startsWith("|") && isTableSeparator(splitTableRow(lines[i + 1].trim()))))
    ) {
      flushParagraph();
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      blocks.push(renderTable(tableLines, `tbl-${key++}`));
      continue;
    }

    // Horizontal rule.
    if (/^(-{3,}|\*{3,})$/.test(trimmed)) {
      flushParagraph();
      blocks.push(<hr key={`hr-${key++}`} className="chat-hr" />);
      i++;
      continue;
    }

    // Heading (# .. ######).
    const headingMatch = /^(#{1,6})\s+(.+)$/.exec(trimmed);
    if (headingMatch) {
      flushParagraph();
      blocks.push(
        <p key={`h-${key++}`} className="chat-heading">
          {renderInline(headingMatch[2])}
        </p>
      );
      i++;
      continue;
    }

    // Blockquote (> line).
    if (trimmed.startsWith(">")) {
      flushParagraph();
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote key={`q-${key++}`} className="chat-quote">
          {quoteLines.map((quoteLine, qi) => (
            <p key={qi}>{renderInline(quoteLine)}</p>
          ))}
        </blockquote>
      );
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
