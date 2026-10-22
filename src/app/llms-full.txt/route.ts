import { renderPageMarkdown } from "@/content/markdown";
import { getSitePages } from "@/content/source";

// Read from the database on every request (cached for a minute), so admin edits reach agents.
export const dynamic = "force-dynamic";

export const revalidate = 60;

export async function GET() {
  const pages = await getSitePages();
  return new Response(pages.map(renderPageMarkdown).join("\n\n---\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
}
