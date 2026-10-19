import { renderPageMarkdown } from "@/content/markdown";
import { getSitePages } from "@/content/source";

// Cloudflare Pages runs dynamic routes on the edge runtime.
export const runtime = "edge";

export const revalidate = 60;

export async function GET() {
  const pages = await getSitePages();
  return new Response(pages.map(renderPageMarkdown).join("\n\n---\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
}
