import { PAGES } from "@/content/pages";

// Cloudflare Pages runs dynamic routes on the edge runtime.
export const runtime = "edge";

// The website's bundled page content (the same copy shown when a page isn't in the
// content store yet). The DocStar admin reads it to "Add to editor". Public, like the .md twins.
export function GET() {
  return Response.json(
    { pages: PAGES.map(({ slug, path, meta, sections }) => ({ slug, path, meta, sections })) },
    { headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=300" } }
  );
}
