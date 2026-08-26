import fs from "node:fs";
import path from "node:path";
import { ragRepos } from "../src/data/rag/repos";
import { manualSources } from "../src/data/rag/manual";
import { embedPassages } from "../src/lib/rag/embed";
import type { EmbeddingRecord, RagSource } from "../src/types/rag";

const GH_API = "https://api.github.com";
const OUT_DIR = path.join(process.cwd(), "src", "data", "rag");
const GH_MAX_RETRIES = 3;
const GH_BASE_DELAY_MS = 2_000;
// Auto-discovery accounts + safety cap on pagination.
const DISCOVERY_OWNERS = ["vonssy", "REY-STTP"] as const;
const MAX_DISCOVERY_PAGES = 10;

interface DiscoveredRepo {
  owner: string;
  name: string;
  description: string | null;
  topics: string[];
  stars: number;
}

interface WorklistRepo {
  owner: string;
  name: string;
  description: string;
  tags: string[];
  /** Curated (showcase) repos get full README ingestion; discovered repos are metadata-only. */
  full: boolean;
}

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

// Auto-discovery: every public, non-fork, non-archived repo for the owners.
async function fetchPublicRepos(owner: string): Promise<DiscoveredRepo[]> {
  const token = process.env.GITHUB_TOKEN ?? "";
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "vonssy-portfolio-ingest",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const all: DiscoveredRepo[] = [];
  let page = 1;
  while (page <= MAX_DISCOVERY_PAGES) {
    const res = await fetchWithRetry(
      `${GH_API}/users/${owner}/repos?type=public&sort=updated&per_page=100&page=${page}`,
      headers
    );
    if (!res.ok) {
      console.warn(`  ! Repo list unavailable for ${owner} (${res.status}) — skipping remainder`);
      break;
    }
    const data = (await res.json()) as Array<{
      fork?: boolean;
      archived?: boolean;
      name?: string;
      description?: string | null;
      topics?: unknown;
      stargazers_count?: number;
      owner?: { login?: string };
    }>;
    if (!Array.isArray(data) || data.length === 0) break;

    for (const repo of data) {
      if (!repo.name || repo.fork || repo.archived) continue;
      // Drop empty shells — no description, no topics, no stars means there
      // is nothing meaningful for the assistant to say about them.
      const stars = repo.stargazers_count ?? 0;
      const description = repo.description ?? null;
      const topics = Array.isArray(repo.topics) ? repo.topics.filter((t): t is string => typeof t === "string") : [];
      if (!description && topics.length === 0 && stars < 1) continue;
      all.push({
        owner: repo.owner?.login ?? owner,
        name: repo.name,
        description,
        topics,
        stars,
      });
    }

    if (data.length < 100) break;
    page++;
  }
  return all;
}

/** Merges the curated list with auto-discovered public repos (curated wins on duplicates).
 *  Every repo that passes the quality filter gets full README ingestion —
 *  Jina's token-based limits comfortably cover the whole index. */
async function buildWorklist(): Promise<WorklistRepo[]> {
  const worklist: WorklistRepo[] = ragRepos.map((repo) => ({
    owner: repo.owner,
    name: repo.name,
    description: repo.description,
    tags: [...repo.tags],
    full: true,
  }));

  const curatedKeys = new Set(worklist.map((r) => `${r.owner}/${r.name}`.toLowerCase()));
  let added = 0;
  for (const owner of DISCOVERY_OWNERS) {
    console.log(`  Discovering public repos for ${owner}...`);
    for (const discovered of await fetchPublicRepos(owner)) {
      const key = `${discovered.owner}/${discovered.name}`.toLowerCase();
      if (curatedKeys.has(key)) continue;
      curatedKeys.add(key);
      worklist.push({
        owner: discovered.owner,
        name: discovered.name,
        description: discovered.description ?? "",
        tags: discovered.topics,
        full: true,
      });
      added++;
    }
  }
  console.log(`  Discovery added ${added} extra repos.`);
  return worklist;
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
  console.log("Building worklist (curated + discovered)...");
  const worklist = await buildWorklist();

  console.log("Building raw sources...");
  const sources: RagSource[] = manualSources.map((s) => ({ ...s }));

  for (const repo of worklist) {
    console.log(`  Fetching ${repo.owner}/${repo.name}${repo.full ? "" : " (meta only)"}...`);
    // Full README ingestion is reserved for curated showcase repos.
    const readme = repo.full ? await fetchReadme(repo.owner, repo.name) : null;
    const meta = await fetchRepoMetadata(repo.owner, repo.name);

    if (readme) {
      sources.push({
        source: "github",
        repoName: repo.name,
        url: `https://github.com/${repo.owner}/${repo.name}`,
        content: readme,
      });
    }

    let metaText = `Repository: ${repo.owner}/${repo.name}\nDescription: ${repo.description || "(none)"}\nTags: ${repo.tags.join(", ")}`;
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

  console.log(`Chunked into ${chunks.length} chunks from ${sources.length} sources.`);

  // Dry-run: report discovery/chunking stats without spending Gemini quota.
  if (process.env.INGEST_DRY_RUN === "1") {
    console.log("INGEST_DRY_RUN=1 — stopping before embedding. No files written.");
    return;
  }

  console.log(`Embedding ${chunks.length} chunks...`);
  const texts = chunks.map((c) => c.text);
  const vectors = await embedPassages(texts);

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
