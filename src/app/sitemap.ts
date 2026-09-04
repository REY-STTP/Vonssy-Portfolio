import type { MetadataRoute } from "next";
import { CANONICAL_URL } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? CANONICAL_URL;

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/llms.txt`,
      lastModified: new Date("2026-05-11T00:00:00+07:00"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/llms-full.txt`,
      lastModified: new Date("2026-05-11T00:00:00+07:00"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/hire.md`,
      lastModified: new Date("2026-05-11T00:00:00+07:00"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date("2026-05-11T00:00:00+07:00"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date("2026-05-11T00:00:00+07:00"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
