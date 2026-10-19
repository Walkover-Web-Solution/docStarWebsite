import { renderPageMarkdown } from "@/content/markdown";
import { pageBySlug } from "@/content/pages";
import { getSitePage } from "@/content/source";

// Cloudflare Pages runs dynamic routes on the edge runtime.
export const runtime = "edge";
export const revalidate = 60;

// Markdown twin of any page. Middleware rewrites /<page>.md and `Accept: text/markdown` here.
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!pageBySlug(slug)) return new Response("Not found\n", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  return new Response(renderPageMarkdown(await getSitePage(slug)), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
}
