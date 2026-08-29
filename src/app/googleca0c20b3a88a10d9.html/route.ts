export const dynamic = "force-static";

// Google Search Console HTML-file verification.
// Serves the exact verification string at /googleca0c20b3a88a10d9.html
// on any host (www, apex, or vercel.app) so verification never depends
// on the canonical-redirect proxy or static file serving.
export function GET() {
  return new Response("google-site-verification: googleca0c20b3a88a10d9", {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
