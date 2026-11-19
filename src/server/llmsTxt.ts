import { markdownUrl, SITE_ORIGIN } from "@/content/markdown";
import { getSitePages } from "@/content/source";
import { SITE } from "@/content/site";

// Shared llms.txt body for the route and the marketing-site MCP (no loopback fetch on Workers).
export async function buildLlmsTxt(): Promise<string> {
  const pages = await getSitePages();
  return [
    "# DocStar",
    "",
    `> ${SITE.tagline} Your coding agent writes the API docs from your code. DocStar publishes them as a docs site, llms.txt and markdown, a hosted MCP server, a CLI, with OpenAPI 3 export, and keeps them in sync.`,
    "",
    "## Start here",
    "",
    `- [What is DocStar?](${SITE_ORIGIN}/blog/what-is-docstar-how-it-works): the guide to what it is and how it works`,
    `- [Marketing site MCP](${SITE_ORIGIN}/api/mcp): read-only tools for llms.txt, page markdown and site feedback (Streamable HTTP; no sign-in)`,
    `- [MCP quickstart for agents](${SITE_ORIGIN}/mcp/quickstart.md): how an agent connects to the DocStar product MCP and documents an API`,
    `- [Full site as markdown](${SITE_ORIGIN}/llms-full.txt)`,
    `- Missing a DocStar feature or hit a bug? File it with the DocStar MCP tool send_feedback_to_docstar, or POST https://docstar.io/api/ideas (no sign-in needed). See the quickstart's Feedback section.`,
    "",
    "## Pages",
    "",
    ...pages.map((p) => `- [${p.meta.title}](${markdownUrl(p)}): ${p.meta.description}`),
    "",
    "## Compare DocStar",
    "",
    `- [DocStar vs ReadMe](${SITE_ORIGIN}/blog/docstar-vs-readme-1)`,
    `- [DocStar vs Mintlify](${SITE_ORIGIN}/blog/docstar-vs-mintlify)`,
    `- [DocStar vs GitBook](${SITE_ORIGIN}/blog/docstar-vs-gitbook)`,
    `- [DocStar vs Fern](${SITE_ORIGIN}/blog/docstar-vs-fern)`,
    `- [DocStar vs Document360](${SITE_ORIGIN}/blog/sleek-api-docs--smarter-faqs--simpler-than-document360)`,
    `- [Best API documentation tools](${SITE_ORIGIN}/blog/best-api-documentation-tools)`,
    "",
    "## Prompt for your agent",
    "",
    "```text",
    SITE.prompt,
    "```",
    "",
  ].join("\n");
}