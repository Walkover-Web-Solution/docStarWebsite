import type { SitePage } from "../types";
import { finalCta, related } from "./shared";

// Landing page for visitors arriving from Product Hunt. It states only what DocStar has already published
// elsewhere on the site; add any launch offer here once the team confirms it (AGENTS.md rule 15).
export const PRODUCT_HUNT: SitePage = {
  slug: "producthunt",
  path: "/producthunt",
  label: "Product Hunt",
  updated: "2026-10-31",
  meta: {
    title: "DocStar on Product Hunt: API Docs Agents Can Use | DocStar",
    description: "Welcome from Product Hunt. Paste one prompt into your coding agent and DocStar turns your code into API docs, llms.txt, a hosted MCP server and a CLI.",
    keywords: ["DocStar Product Hunt", "API docs for AI agents launch"],
  },
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "Welcome, Product Hunt",
      title: "Your agent writes the docs. ==Every agent== can use them.",
      sub: "DocStar is API documentation for people and AI agents. Paste one prompt into your coding agent: it documents your API from your code, and DocStar publishes the docs, llms.txt, a hosted MCP server and a CLI.",
      primary: { kind: "copy-prompt", label: "Copy prompt" },
      secondary: { kind: "link", label: "Start free", href: "https://app.docstar.io/login?intent=signup" },
      works: "Claude Code · Cursor · Codex · VS Code · any MCP client",
      run: {
        title: "agent run",
        lines: [
          { who: "you", text: "Document my API with DocStar." },
          { who: "agent", text: "Reading src/routes … 24 endpoints in 5 modules" },
          { who: "agent", text: "Created “Acme API” as drafts for your review" },
          { who: "agent", text: "Docs, llms.txt, MCP server and CLI ready on publish", done: true },
        ],
      },
    },
    {
      type: "cards",
      key: "try-it-now",
      kicker: "Try it in two minutes",
      title: "See a ==live example== before you sign up.",
      sub: "MSG91's API docs run on DocStar. Read them, give them to your agent or call them from your terminal.",
      columns: 3,
      items: [
        { title: "Read the docs", body: "A searchable API reference with a markdown twin for every page.", cta: { kind: "link", label: "Open the MSG91 docs", href: "https://docs.msg91.com" } },
        { title: "Hand it to your agent", body: "Models read clean text, not HTML.", code: "curl https://docs.msg91.com/llms.txt" },
        { title: "Run it from the terminal", body: "Every published endpoint becomes a command.", code: "npx docstar-cli init msg91" },
      ],
    },
    {
      type: "steps",
      key: "how-it-works",
      kicker: "How it works",
      title: "From code to every channel, ==in one prompt==.",
      steps: [
        { title: "Copy the prompt", body: "Paste it into Claude Code, Cursor or Codex, opened in your API's repo." },
        { title: "Your agent reads your code", body: "It finds your routes with their auth, params, bodies and responses, and saves them as drafts for you to review." },
        { title: "You publish", body: "Docs, llms.txt, markdown, the MCP server and the CLI go live from the same source." },
      ],
    },
    {
      type: "faq",
      key: "faq",
      kicker: "FAQ",
      title: "Questions from Product Hunt.",
      items: [
        { q: "What is DocStar?", a: "DocStar is an API documentation platform for people and AI agents. Your coding agent writes the docs from your code; DocStar publishes them as a docs site, llms.txt and markdown, a hosted MCP server and a CLI." },
        { q: "Is there a free plan?", a: "Yes. Start free, then move to Pro at $25 a month with 10 members included. See the pricing page for the details." },
        { q: "Will my agent publish without asking?", a: "No. Your agent saves the docs as drafts, and you review and publish them in DocStar." },
        { q: "Do I need an OpenAPI file?", a: "No. Your agent reads your routes directly. If you already have an OpenAPI, Swagger or Postman file, you can import it instead." },
      ],
    },
    related("Keep exploring ==DocStar==.", ["mcp", "cli", "pricing"]),
    finalCta("Take the first step. ==Let your agent== write your API docs."),
  ],
};
