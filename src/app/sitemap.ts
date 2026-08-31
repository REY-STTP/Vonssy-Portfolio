import type { MetadataRoute } from "next";
import { CANONICAL_URL } from "@/data/site";

const BUILD_DATE = new Date("2026-08-31");

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? CANONICAL_URL;

  return [
    {
      url: siteUrl,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
