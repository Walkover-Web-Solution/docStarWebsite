import { PAGES } from "@/content/pages";

// The website's bundled page content (the same copy shown when a page isn't in the database yet).
// The admin reads it to copy pages into the editor. Public, like the .md twins.
export function GET() {
  return Response.json(
    { pages: PAGES.map(({ slug, path, meta, sections }) => ({ slug, path, meta, sections })) },
    { headers: { "Cache-Control": "public, max-age=300" } }
  );
}
