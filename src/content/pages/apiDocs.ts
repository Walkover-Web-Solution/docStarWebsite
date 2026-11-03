import type { SitePage } from "../types";
import { copyPrompt, finalCta, related } from "./shared";

export const API_DOCS: SitePage = {
  slug: "api-docs",
  path: "/api-docs",
  label: "API docs",
  updated: "2026-10-30",
  meta: {
    title: "API documentation platform with playground and MCP | DocStar",
    description: "Publish an API reference with a try-it playground, guides and your branding. Write it from code or import OpenAPI and Postman; get llms.txt, MCP and a CLI too.",
    keywords: ["API documentation platform", "API reference with playground", "interactive API docs", "import OpenAPI", "llms.txt generator"],
  },
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "API docs",
      title: "The API documentation platform ==people and agents== can read.",
      sub: "DocStar publishes your API reference with a try-it playground, guides and your branding. Let your agent write it from your code, or import OpenAPI or Postman, and get llms.txt, markdown, an MCP server and a CLI from the same docs.",
      primary: copyPrompt,
      secondary: { kind: "link", label: "See a live example", href: "https://docs.msg91.com" },
      code: {
        title: "one source, every reader",
        body: "docs.acme.com            for people\ndocs.acme.com/llms.txt   for models\ndocs.acme.com/x.md       for agents\nmcp.acme.com             for agents\nOpenAPI 3 export         for tools\ndocstar-cli acme         for terminals",
      },
    },
    {
      type: "cards",
      key: "features",
      kicker: "The reference",
      title: "Everything a public API reference ==needs==.",
      sub: "Without running a separate docs site.",
      items: [
        { title: "Written by your agent", body: "Your coding agent reads your routes and creates every endpoint, with auth, params, bodies and responses. No OpenAPI file needed." },
        { title: "Or import a spec", body: "Bring OpenAPI 3, Swagger 2 or a Postman collection and get a structured reference." },
        { title: "Try it in the docs", body: "Readers send real requests with params, headers, body and auth, right from the page." },
        { title: "Environments", body: "Switch base URLs and variables between sandbox and production." },
        { title: "Guides and changelogs", body: "Getting-started guides and API changelogs live with the reference." },
        { title: "Search and AI answers", body: "Readers ask questions and get answers grounded in your reference." },
        { title: "Your domain", body: "Publish on a custom domain, subdomain or sub-path, with your logo, colours and fonts." },
        { title: "No lock-in", body: "Export your docs back to OpenAPI 3 at any time." },
        { title: "Copy prompt on every page", body: "Your users hand your API to their agent in one click, with one-click MCP connect for Cursor, VS Code and Claude." },
      ],
    },
    {
      type: "channels",
      key: "channels",
      kicker: "One source, every format",
      title: "One reference, ==five formats==.",
      items: [
        { name: "Docs site", reader: "for people", body: "Searchable reference and guides with try-it and code samples.", sample: "docs.acme.com/messages/send" },
        { name: "llms.txt + markdown", reader: "for models", body: "Every page has a .md twin, and the site has llms.txt.", sample: "GET docs.acme.com/llms.txt" },
        { name: "MCP server", reader: "for agents", body: "Hosted, on your domain, with search, contract and call tools.", sample: "claude mcp add acme https://mcp.acme.com" },
        { name: "CLI", reader: "for terminals", body: "Every endpoint becomes a command.", sample: "npx docstar-cli acme messages send" },
        { name: "OpenAPI export", reader: "for tools", body: "Export your docs to OpenAPI 3 for SDK generators and gateways.", sample: "Export to OpenAPI 3 any time" },
      ],
    },
    {
      type: "pillars",
      key: "stays-true",
      kicker: "Stays true",
      title: "A reference that ==stays right== after launch.",
      items: [
        { feature: "drift-detection", glyph: "≠", title: "Never drifts", body: "DocStar watches your repo and drafts doc fixes when routes, params or responses change.", points: ["GitHub app", "GitHub Actions sync"] },
        { feature: "agent-analytics", glyph: "%", title: "See who reads it", body: "People and agents, split by channel, with the questions they ask and the answers they couldn't find.", points: ["Docs, MCP, CLI, llms.txt"] },
      ],
    },
    {
      type: "faq",
      key: "faq",
      kicker: "FAQ",
      title: "API documentation ==questions==.",
      items: [
        { q: "Do I need an OpenAPI file?", a: "No. Your agent can write the docs from your code. If you have OpenAPI, Swagger or Postman, import it instead." },
        { q: "Can I see a live example?", a: "Yes. MSG91's API docs at docs.msg91.com run on DocStar, including llms.txt and module.json for agents." },
        { q: "Can I keep guides next to the reference?", a: "Yes. Guides, changelogs and endpoints live in the same project and share navigation and search." },
        { q: "Does DocStar generate llms.txt?", a: "Yes. Every published docs site gets llms.txt, and every page is also served as clean markdown, so models read your content without the page chrome." },
        { q: "Can I leave DocStar later?", a: "Yes. Export your docs to OpenAPI 3 at any time." },
      ],
    },
    related("What the same docs ==also power==.", ["mcp", "cli", "analytics"]),
    finalCta("Publish API docs ==agents can use==, from one prompt."),
  ],
};
