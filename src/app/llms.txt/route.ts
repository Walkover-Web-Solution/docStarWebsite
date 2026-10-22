import { markdownUrl, SITE_ORIGIN } from "@/content/markdown";
import { getSitePages } from "@/content/source";
import { SITE } from "@/content/site";

// Read from the database on every request (cached for a minute), so admin edits reach agents.
export const dynamic = "force-dynamic";

export const revalidate = 60;

// llms.txt for docstar.io, generated from the same content as the pages.
export async function GET() {
  const pages = await getSitePages();
  const body = [
    "# DocStar",
    "",
    `> ${SITE.tagline} Your coding agent writes the API docs from your code. DocStar publishes them as a docs site, llms.txt and markdown, a hosted MCP server, a CLI and an OpenAPI file, and keeps them in sync.`,
    "",
    "## Start here",
    "",
    `- [MCP quickstart for agents](${SITE_ORIGIN}/mcp/quickstart.md): how an agent connects to the DocStar MCP and documents an API`,
    `- [Full site as markdown](${SITE_ORIGIN}/llms-full.txt)`,
    `- Missing a DocStar feature or hit a bug? File it with the DocStar MCP tool send_feedback_to_docstar, or POST https://docstar.io/api/ideas (no sign-in needed). See the quickstart's Feedback section.`,
    "",
    "## Pages",
    "",
    ...pages.map((p) => `- [${p.meta.title}](${markdownUrl(p)}): ${p.meta.description}`),
    "",
    "## Prompt for your agent",
    "",
    "```text",
    SITE.prompt,
    "```",
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
}
