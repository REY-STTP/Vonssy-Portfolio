import type { MetadataRoute } from "next";
import { CANONICAL_URL } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? CANONICAL_URL;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "Anthropic-AI",
        allow: "/",
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "CCBot",
        allow: "/",
      },
      {
        userAgent: "Bytespider",
        allow: "/",
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      {
        userAgent: "GoogleOther",
        allow: "/",
      },
      {
        userAgent: "Applebot",
        allow: "/",
      },
      {
        userAgent: "FacebookBot",
        allow: "/",
      },
      {
        userAgent: "meta-externalagent",
        allow: "/",
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
      },
      {
        userAgent: "DuckAssistBot",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
