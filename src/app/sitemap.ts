import type { MetadataRoute } from "next";
import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";
import { join } from "node:path";
import { CANONICAL_URL } from "@/data/site";

const FALLBACK_DATE = "2026-05-11T00:00:00+07:00";
const REPO_ROOT = process.cwd();

// Waktu commit terakhir yang menyentuh file-file sumber (null jika git tak tersedia).
function gitLastModified(paths: string[]): Date | null {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
      cwd: REPO_ROOT,
      encoding: "utf-8",
      timeout: 10_000,
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (!out) return null;
    const date = new Date(out);
    return Number.isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

// mtime terbaru di antara file-file sumber (null jika file tak terbaca).
function mtimeNewest(paths: string[]): Date | null {
  try {
    let newest = 0;
    for (const p of paths) {
      const m = statSync(join(/*turbopackIgnore: true*/ REPO_ROOT, p)).mtimeMs;
      if (m > newest) newest = m;
    }
    return newest > 0 ? new Date(newest) : null;
  } catch {
    return null;
  }
}

function lastModified(paths: string[]): Date {
  return gitLastModified(paths) ?? mtimeNewest(paths) ?? new Date(FALLBACK_DATE);
}

// File sumber yang menentukan "kapan konten route ini terakhir berubah".
const HOME_SOURCES = [
  "src/app/page.tsx",
  "src/app/layout.tsx",
  "src/data/projects.ts",
  "src/data/faq.ts",
  "src/data/site.ts",
  "src/data/stack.ts",
  "src/data/philosophy.ts",
  "src/data/navigation.ts",
];
const LLMS_SOURCES = ["public/llms.txt", "src/data/projects.ts", "src/data/faq.ts", "src/data/site.ts"];
const LLMS_FULL_SOURCES = [
  "public/llms-full.txt",
  "src/data/projects.ts",
  "src/data/faq.ts",
  "src/data/site.ts",
];
const HIRE_SOURCES = ["public/hire.md", "src/data/site.ts"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? CANONICAL_URL;

  return [
    {
      url: siteUrl,
      lastModified: lastModified(HOME_SOURCES),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/llms.txt`,
      lastModified: lastModified(LLMS_SOURCES),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/llms-full.txt`,
      lastModified: lastModified(LLMS_FULL_SOURCES),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/hire.md`,
      lastModified: lastModified(HIRE_SOURCES),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: lastModified(["src/app/privacy/page.tsx"]),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: lastModified(["src/app/terms/page.tsx"]),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
