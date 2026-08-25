import fs from "node:fs";
import path from "node:path";
import { ragRepos } from "../src/data/rag/repos";
import { manualSources } from "../src/data/rag/manual";
import { embedTexts } from "../src/lib/rag/embed";
import type { EmbeddingRecord, RagSource } from "../src/types/rag";

const GH_API = "https://api.github.com";
const OUT_DIR = path.join(process.cwd(), "src", "data", "rag");
const GH_MAX_RETRIES = 3;
const GH_BASE_DELAY_MS = 2_000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Retries transient failures (network errors, 403/429 rate limiting)
// with exponential backoff, honoring Retry-After / x-ratelimit-reset.
async function fetchWithRetry(url: string, headers: Record<string, string>): Promise<Response> {
  for (let attempt = 0; attempt <= GH_MAX_RETRIES; attempt++) {
    let res: Response;
    try {
      res = await fetch(url, { headers });
    } catch (err) {
      if (attempt === GH_MAX_RETRIES) throw err;
      const wait = GH_BASE_DELAY_MS * Math.pow(2, attempt);
      console.warn(`  ! Network error (${err instanceof Error ? err.message : "unknown"}), retrying in ${wait}ms...`);
      await sleep(wait);
      continue;
    }

    if ((res.status === 403 || res.status === 429) && attempt < GH_MAX_RETRIES) {
      const retryAfterSec = Number(res.headers.get("retry-after"));
      const resetMs = Number(res.headers.get("x-ratelimit-reset")) * 1000;
      const wait =
        (!Number.isNaN(retryAfterSec) && retryAfterSec > 0 ? retryAfterSec * 1000 : 0) ||
        Math.min(Math.max(resetMs - Date.now(), 0), 60_000) ||
        GH_BASE_DELAY_MS * Math.pow(2, attempt);
      console.warn(`  ! GitHub ${res.status} (rate limit?), waiting ${Math.round(wait)}ms before retry ${attempt + 1}/${GH_MAX_RETRIES}...`);
      await sleep(wait);
      continue;
    }

    return res;
  }
  throw new Error("GitHub fetch failed after retries");
}

async function fetchReadme(owner: string, repo: string): Promise<string | null> {
  const token = process.env.GITHUB_TOKEN ?? "";
  const res = await fetchWithRetry(`${GH_API}/repos/${owner}/${repo}/readme`, {
    Accept: "application/vnd.github+json",
    "User-Agent": "vonssy-portfolio-ingest",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  });
  if (!res.ok) {
    console.warn(`  ! README not available for ${owner}/${repo} (${res.status})`);
    return null;
  }
  const data = await res.json();
  if (data.content) {
    return Buffer.from(data.content, "base64").toString("utf-8");
  }
  return null;
}

async function fetchRepoMetadata(owner: string, repo: string): Promise<Record<string, unknown> | null> {
  const token = process.env.GITHUB_TOKEN ?? "";
  const res = await fetchWithRetry(`${GH_API}/repos/${owner}/${repo}`, {
    Accept: "application/vnd.github+json",
    "User-Agent": "vonssy-portfolio-ingest",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return {
    stars: data.stargazers_count,
    forks: data.forks_count,
    language: data.language,
    topics: data.topics,
  };
}

function splitByHeadings(text: string): string[] {
  const sections = text.split(/^##\s+/m);
  if (sections.length <= 1) {
    return splitByParagraphs(text);
  }
  const result: string[] = [];
  const first = sections[0].trim();
  if (first) result.push(first);
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i].trim();
    if (section) result.push(section);
  }
  return result;
}

function splitByParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

const NOISE_PATTERNS = [
  /^table of contents/i,
  /^support the project/i,
  /^donat/i,
  /^sponsor/i,
  /^star (this |the )?repo/i,
  /^contributing/i,
  /^license/i,
  /^disclaimer/i,
  /^disclaimer & privacy/i,
  /^thanks? (to|for)/i,
  /^acknowledg/i,
  /^bu(ild|y) me a coffee/i,
  /^penutup/i,
  /^dependensi (backend|frontend)/i,
  /^teknologi yang digunakan/i,
];

const NOISE_BODY_PATTERNS = [
  /\*\*deskripsi\*\*\s*:/i,
  /\*\*fungsi\*\*\s*:/i,
  /support the project/i,
  /^support me/i,
  /^terima kasih/i,
];

function isNoise(text: string): boolean {
  const firstLine = text.trim().split("\n")[0];
  if (NOISE_PATTERNS.some((pattern) => pattern.test(firstLine))) return true;
  return NOISE_BODY_PATTERNS.some((pattern) => pattern.test(text));
}

function isMeaningful(text: string): boolean {
  const cleaned = text
    .replace(/^(?:#{1,6}\s*)+/gm, "")
    .replace(/^[*-_]{3,}\s*$/gm, "")
    .replace(/[*_`>#\-\s]/g, "")
    .trim();
  return cleaned.length >= 20;
}

function chunkText(text: string): string[] {
  const chunks: string[] = [];
  for (const section of splitByHeadings(text)) {
    if (isNoise(section)) continue;
    if (section.length <= 1200) {
      if (isMeaningful(section)) chunks.push(section);
    } else {
      for (const para of splitByParagraphs(section)) {
        if (!isNoise(para) && isMeaningful(para)) chunks.push(para);
      }
    }
  }
  return chunks;
}

async function main() {
  console.log("Building raw sources...");
  const sources: RagSource[] = manualSources.map((s) => ({ ...s }));

  for (const repo of ragRepos) {
    console.log(`  Fetching ${repo.owner}/${repo.name}...`);
    const readme = await fetchReadme(repo.owner, repo.name);
    const meta = await fetchRepoMetadata(repo.owner, repo.name);

    if (readme) {
      sources.push({
        source: "github",
        repoName: repo.name,
        url: `https://github.com/${repo.owner}/${repo.name}`,
        content: readme,
      });
    }

    let metaText = `Repository: ${repo.owner}/${repo.name}\nDescription: ${repo.description}\nTags: ${repo.tags.join(", ")}`;
    if (meta) {
      metaText += `\nStars: ${meta.stars}\nForks: ${meta.forks}\nLanguage: ${meta.language}\nTopics: ${(meta.topics as string[]).join(", ")}`;
    }
    sources.push({
      source: "github-meta",
      repoName: repo.name,
      url: `https://github.com/${repo.owner}/${repo.name}`,
      content: metaText,
    });
  }

  console.log("Chunking sources...");
  const chunks: { text: string; metadata: EmbeddingRecord["metadata"] }[] = [];
  sources.forEach((src) => {
    chunkText(src.content).forEach((text) => {
      chunks.push({
        text,
        metadata: {
          source: src.source,
          repoName: src.repoName,
          url: src.url,
        },
      });
    });
  });

  console.log(`Embedding ${chunks.length} chunks...`);
  const texts = chunks.map((c) => c.text);
  const vectors = await embedTexts(texts);

  const records: EmbeddingRecord[] = chunks.map((c, i) => ({
    id: `chunk-${i}`,
    vector: vectors[i],
    text: c.text,
    metadata: c.metadata,
  }));

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const embeddingsPath = path.join(OUT_DIR, "embeddings.json");

  // Minified: this file is imported as a module at runtime — pretty-printing
  // roughly doubles its size for zero benefit.
  fs.writeFileSync(embeddingsPath, JSON.stringify(records));

  const sizeKB = (fs.statSync(embeddingsPath).size / 1024).toFixed(1);
  console.log(`Done. ${records.length} chunks written to ${embeddingsPath} (${sizeKB} KB).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
