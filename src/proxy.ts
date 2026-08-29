import { NextResponse, type NextRequest } from "next/server";

// Canonical host, derived from the same env used for metadata/robots/sitemap.
const CANONICAL_HOST = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.vonssy-portfolio.web.id"
)
  .replace(/^https?:\/\//, "")
  .replace(/\/+$/, "")
  .toLowerCase();

export function proxy(request: NextRequest) {
  // Only enforce the canonical host on the production deployment.
  // Previews (VERCEL_ENV === "preview") and local dev are left untouched
  // so their own URLs keep working.
  if (process.env.VERCEL_ENV !== "production") {
    return NextResponse.next();
  }

  const host = request.headers.get("host")?.toLowerCase().split(":")[0] ?? "";

  if (host && host !== CANONICAL_HOST) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Run on pages/routes, but skip internal assets, generated files, and the
  // Google Search Console verification file so they are never redirected.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|opengraph-image|robots.txt|sitemap.xml|llms.txt|googleca0c20b3a88a10d9.html).*)",
  ],
};
