import type { SitePage } from "../types";
import { finalCta, related, talkToUs } from "./shared";

// Free tools. Hidden until launch (DRAFT_PAGES in src/content/pages.ts).
// The llms.txt checker works (src/app/api/tools/llms-check); the MCP readiness check is a waitlist page.

export const LLMS_CHECKER: SitePage = {
  slug: "tools-llms-txt-checker",
  path: "/tools/llms-txt-checker",
  label: "llms.txt checker",
  updated: "2026-10-30",
  meta: {"title": "llms.txt checker: validate your llms.txt free | DocStar", "description": "Check your site's llms.txt against the llms.txt proposal: H1 title, summary, sections, links, markdown versions and llms-full.txt. Free, instant, no sign-up."},
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "Free tool",
      title: "llms.txt ==checker==.",
      sub: "Check any site's llms.txt against the llms.txt proposal: an H1 title, a summary, sections of links, absolute URLs, markdown versions of pages and llms-full.txt. Enter an address below; it's free and needs no sign-up.",
      primary: { kind: "link", label: "Check your llms.txt", href: "#checker" },
      secondary: { kind: "link", label: "What is llms.txt?", href: "https://docstar.io/blog/is-your-documentation-readable-by-ai-llms-txt" },
    },
    {
      type: "tool",
      key: "checker",
      tool: "llms-txt-checker",
      kicker: "Check a site",
      title: "Is your llms.txt ==ready for agents==?",
      sub: "We fetch /llms.txt from the address you enter (https only), check its structure, test the first few links, and look for llms-full.txt.",
    },
    {
      type: "cards",
      key: "checks",
      kicker: "What we check",
      title: "The parts ==agents rely on==.",
      items: [
        { title: "An H1 title", body: "The only required part of llms.txt: '# Your project' on the first line." },
        { title: "A > summary", body: "One line under the title that tells a model what the site is about." },
        { title: "## sections of links", body: "Key pages listed as '- [Name](url): what it covers', grouped under headings." },
        { title: "Absolute, working links", body: "Agents often fetch llms.txt on its own, so links must be absolute and load." },
        { title: "Markdown versions", body: "Links to .md versions of pages let agents skip HTML and read clean text." },
        { title: "llms-full.txt", body: "Optional: all your docs in one file for agents that want everything." },
      ],
    },
    {
      type: "faq",
      key: "faq",
      kicker: "FAQ",
      title: "llms.txt ==questions==.",
      items: [
        { q: "What is llms.txt?", a: "A markdown file at /llms.txt that gives AI models a short map of a site: a title, a summary and links to the pages that matter, ideally in markdown." },
        { q: "Does DocStar create llms.txt for me?", a: "Yes. Every DocStar docs site publishes llms.txt, and every page is also available as clean markdown." },
        { q: "Can an agent use this checker?", a: "Yes. Call GET https://docstar.io/api/tools/llms-check?url=<site> and read the JSON report." },
      ],
    },
    related("Make your docs ==agent-readable==.", ["api-docs", "mcp", "analytics"]),
    finalCta("Get llms.txt, markdown and MCP ==from one prompt==."),
  ],
};

export const MCP_READINESS: SitePage = {
  slug: "tools-mcp-readiness",
  path: "/tools/mcp-readiness",
  label: "MCP readiness check",
  updated: "2026-10-30",
  meta: {"title": "MCP readiness check for your API and AI agents | DocStar", "description": "Find out how ready your API is for AI agents: llms.txt, markdown docs, an OpenAPI file, an MCP server and auth agents can use. Join the list for early access."},
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "Free tool · coming soon",
      title: "Is your API ==ready for AI agents==?",
      sub: "The MCP readiness check will score how well AI agents can find, read and call your API: llms.txt, markdown docs, an OpenAPI file, an MCP server and auth agents can use. It's in development; talk to us for early access.",
      primary: talkToUs,
      secondary: { kind: "link", label: "Check your llms.txt now", href: "/tools/llms-txt-checker" },
    },
    {
      type: "cards",
      key: "checks",
      kicker: "What it will check",
      title: "Five signals ==agents look for==.",
      items: [
        { title: "llms.txt", body: "A map of your docs that models can read first." },
        { title: "Markdown docs", body: "Clean text versions of every page, not just HTML." },
        { title: "A current OpenAPI file", body: "A machine-readable contract for tools and SDK generators." },
        { title: "An MCP server", body: "Tools agents can call to search your docs and use your API." },
        { title: "Auth agents can use", body: "OAuth or API keys that work from an agent, signed in as the user." },
      ],
    },
    related("Get ready ==today==.", ["mcp", "api-docs", "analytics"]),
    finalCta("Make your API ==agent-ready== in one prompt."),
  ],
};
