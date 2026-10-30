import { renderPageMarkdown } from "@/content/markdown";
import { pageBySlug } from "@/content/pages";
import { getSitePage } from "@/content/source";
import { absolute } from "@/lib/seo";

export const revalidate = 60;

// Markdown twin of any page. Middleware rewrites /<page>.md and `Accept: text/markdown` here.
// The HTML page is the canonical version (Link header), and caches must key on Accept because the
// same URL serves HTML or markdown.
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!pageBySlug(slug)) return new Response("Not found\n", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  const page = await getSitePage(slug);
  return new Response(renderPageMarkdown(page), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      Link: `<${absolute(page.path)}>; rel="canonical"`,
      Vary: "Accept",
    },
  });
}
