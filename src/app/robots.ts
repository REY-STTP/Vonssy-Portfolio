import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Keep the fallback in sync with layout.tsx / sitemap.ts / site.ts.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://github.com/vonssy";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
