import type { SitePage, TableSection } from "../types";
import { copyPrompt, finalCta, related, startFree } from "./shared";

// Comparison pages. Hidden until launch (DRAFT_PAGES in src/content/pages.ts).
// The DocStar column states only what DocStar has published (product pages and the docstar.io/blog
// comparisons). Competitor cells marked TODO-VERIFY must be checked against the vendor's own site before
// launch and re-checked monthly. Before launching, decide what happens to the overlapping blog posts
// (docstar-vs-mintlify, docstar-vs-readme-1, docstar-vs-gitbook): see seo/PLAN.md, decision 5.

const ROWS = [
  "Built for",
  "Source of the API reference",
  "Hosted MCP server",
  "CLI for your users",
  "llms.txt and markdown pages",
  "Editing",
  "Price to start",
] as const;

const DOCSTAR: Record<(typeof ROWS)[number], string> = {
  "Built for": "API docs that people and AI agents use",
  "Source of the API reference": "Your coding agent reads your code, or import OpenAPI, Swagger or Postman",
  "Hosted MCP server": "One per docs project: searches docs, reads endpoint contracts and calls your API with per-user OAuth or API keys",
  "CLI for your users": "docstar-cli: every published endpoint becomes a command",
  "llms.txt and markdown pages": "llms.txt and a markdown version of every page",
  Editing: "Real-time collaborative visual editor, Markdown import and export, GitHub sync",
  "Price to start": "Free plan; Pro is $25 a month with 10 members",
};

type Competitor = {
  slug: string;
  name: string;
  kicker: string;
  title: string;
  sub: string;
  cells: Record<(typeof ROWS)[number], string>;
  source: string;
  chooseThem: string[];
  chooseUs: string[];
};

const table = (c: Competitor): TableSection => ({
  type: "table",
  key: "comparison",
  kicker: "Side by side",
  title: `DocStar vs ${c.name}, ==at a glance==.`,
  columns: ["DocStar", c.name],
  rows: ROWS.map((label) => ({ label, cells: [DOCSTAR[label], c.cells[label]] })),
  note: c.source,
});

const comparePage = (c: Competitor, meta: SitePage["meta"]): SitePage => ({
  slug: `compare-${c.slug}`,
  path: `/compare/${c.slug}`,
  label: `DocStar vs ${c.name}`,
  updated: "2026-10-30",
  meta,
  sections: [
    { type: "hero", key: "hero", kicker: c.kicker, title: c.title, sub: c.sub, primary: copyPrompt, secondary: startFree },
    table(c),
    {
      type: "cards",
      key: "choose",
      kicker: "Which fits",
      title: "When to choose ==which==.",
      columns: 2,
      items: [
        { title: `Choose ${c.name} if…`, body: c.chooseThem.join(" ") },
        { title: "Choose DocStar if…", body: c.chooseUs.join(" ") },
      ],
    },
    related("See ==for yourself==.", ["mcp", "cli", "pricing"]),
    finalCta(`Try DocStar ==on your own API==.`),
  ],
});

const CHECK = "TODO-VERIFY: check the vendor's site";

export const COMPARE_MINTLIFY = comparePage(
  {
    slug: "mintlify",
    name: "Mintlify",
    kicker: "DocStar vs Mintlify",
    title: "DocStar vs ==Mintlify==.",
    sub: "Mintlify and DocStar both publish modern developer docs and take AI assistants seriously. They differ in who writes the docs, what the MCP server can do, and whether your users get a CLI. We build DocStar, so here's an honest comparison.",
    cells: {
      "Built for": "Design-led developer docs as code",
      "Source of the API reference": "OpenAPI and MDX",
      "Hosted MCP server": CHECK,
      "CLI for your users": "Not a focus (TODO-VERIFY)",
      "llms.txt and markdown pages": CHECK,
      Editing: "MDX in Git; TODO-VERIFY its current web editor",
      "Price to start": CHECK,
    },
    source: "Mintlify column as published in DocStar's comparison (docstar.io/blog/docstar-vs-mintlify). Both products change quickly; TODO-VERIFY every Mintlify cell on mintlify.com before launch.",
    chooseThem: ["Engineers write all your docs and want them in the repo, reviewed in pull requests.", "Your docs are mainly a developer reference and guides.", "Design polish with minimal effort is the top priority."],
    chooseUs: ["Several teams write docs, not just engineers.", "You want users to act on your API from Claude, ChatGPT or Cursor, signed in as themselves.", "You don't have a clean OpenAPI spec and want your agent to document the API from code."],
  },
  {"title": "DocStar vs Mintlify: API docs, MCP and CLI | DocStar", "description": "DocStar vs Mintlify: who writes the docs, hosted MCP servers that call your API, a CLI for every endpoint, llms.txt, editing and pricing, compared side by side."}
);

export const COMPARE_README = comparePage(
  {
    slug: "readme",
    name: "ReadMe",
    kicker: "DocStar vs ReadMe",
    title: "DocStar vs ==ReadMe==.",
    sub: "ReadMe is built around the developer hub: an interactive API reference and portals for API-first companies. DocStar publishes API docs for people and their AI agents, with a hosted MCP server and a CLI from the same source.",
    cells: {
      "Built for": "Developer hubs for API-first companies",
      "Source of the API reference": "OpenAPI (TODO-VERIFY other sources)",
      "Hosted MCP server": CHECK,
      "CLI for your users": CHECK,
      "llms.txt and markdown pages": CHECK,
      Editing: "Markdown-centered editing",
      "Price to start": CHECK,
    },
    source: "ReadMe column as published in DocStar's comparison (docstar.io/blog/docstar-vs-readme-1). TODO-VERIFY every ReadMe cell on readme.com before launch.",
    chooseThem: ["Your documentation is mostly one polished API portal.", "Your team lives in Markdown and wants mature reference tooling."],
    chooseUs: ["You want AI assistants to use your API directly, not just read about it.", "You want a CLI for every endpoint without writing an SDK.", "Several teams write API docs, guides and changelogs in one place."],
  },
  {"title": "DocStar vs ReadMe: API docs, MCP and pricing | DocStar", "description": "DocStar vs ReadMe: API reference, hosted MCP servers, a generated CLI, llms.txt and markdown, editing, automation and pricing, compared for API-first teams."}
);

export const COMPARE_GITBOOK = comparePage(
  {
    slug: "gitbook",
    name: "GitBook",
    kicker: "DocStar vs GitBook",
    title: "DocStar vs ==GitBook== for API docs.",
    sub: "GitBook is a popular home for product docs and knowledge bases. When the thing you document is an API, and you want developers and their agents to use it, the reference source, the MCP server and pricing per editor start to matter.",
    cells: {
      "Built for": "Product docs and knowledge bases",
      "Source of the API reference": "OpenAPI spec",
      "Hosted MCP server": "Read-only access to published docs (TODO-VERIFY)",
      "CLI for your users": "Not listed (TODO-VERIFY)",
      "llms.txt and markdown pages": "Yes",
      Editing: "Real-time collaborative editing on the Essential plan and up (TODO-VERIFY)",
      "Price to start": "Free plan; 10 editors on one Essential site were $185 a month, billed annually, in October 2026 (TODO-VERIFY)",
    },
    source: "GitBook column as published in DocStar's comparison (docstar.io/blog/docstar-vs-gitbook), as of October 2026. TODO-VERIFY every GitBook cell on gitbook.com before launch.",
    chooseThem: ["Your docs are mostly product guides and a knowledge base, not an API.", "You already run GitBook across many teams and want one tool for everything."],
    chooseUs: ["Your API is the product and you don't want to write an OpenAPI spec first.", "Assistants should call your API for signed-in users, not just answer questions about it.", "You want pricing that doesn't grow per site."],
  },
  {"title": "DocStar vs GitBook: API docs, MCP and pricing | DocStar", "description": "DocStar vs GitBook for API docs: the reference source, an MCP server that calls your API, a CLI for every endpoint, editing, custom domains and pricing."}
);

export const COMPARE_STAINLESS = comparePage(
  {
    slug: "stainless",
    name: "Stainless",
    kicker: "DocStar vs Stainless",
    title: "DocStar vs ==Stainless==: docs, MCP and CLI vs SDKs.",
    sub: "Stainless and DocStar solve different halves of the developer experience. TODO-COPY: one honest paragraph on where Stainless fits (SDK generation from an OpenAPI spec) and where DocStar fits (docs, MCP server and CLI written from your code).",
    cells: {
      "Built for": "TODO-VERIFY: SDK generation from an OpenAPI spec",
      "Source of the API reference": "TODO-VERIFY: OpenAPI spec",
      "Hosted MCP server": CHECK,
      "CLI for your users": CHECK,
      "llms.txt and markdown pages": CHECK,
      Editing: CHECK,
      "Price to start": CHECK,
    },
    source: "TODO-VERIFY: every Stainless cell must come from stainless.com, with the date checked.",
    chooseThem: ["TODO-COPY: you need typed SDKs in several languages generated from a maintained OpenAPI spec."],
    chooseUs: ["You want public API docs, an MCP server and a CLI from one source, written from your code.", "You don't maintain an OpenAPI spec today."],
  },
  {"title": "DocStar vs Stainless: docs, MCP and CLI vs SDKs | DocStar", "description": "DocStar vs Stainless: hosted API docs, an MCP server and a CLI from your docs, compared with SDK generation from an OpenAPI spec. Which fits your API team?"}
);

export const COMPARE_SPEAKEASY = comparePage(
  {
    slug: "speakeasy",
    name: "Speakeasy",
    kicker: "DocStar vs Speakeasy",
    title: "DocStar vs ==Speakeasy==.",
    sub: "TODO-COPY: one honest paragraph on where Speakeasy fits (SDKs and MCP servers generated from an OpenAPI spec, TODO-VERIFY) and where DocStar fits (docs, a hosted MCP server and a CLI written from your code and kept in sync).",
    cells: {
      "Built for": "TODO-VERIFY: SDK and MCP generation from an OpenAPI spec",
      "Source of the API reference": "TODO-VERIFY: OpenAPI spec",
      "Hosted MCP server": CHECK,
      "CLI for your users": CHECK,
      "llms.txt and markdown pages": CHECK,
      Editing: CHECK,
      "Price to start": CHECK,
    },
    source: "TODO-VERIFY: every Speakeasy cell must come from speakeasy.com, with the date checked.",
    chooseThem: ["TODO-COPY: you need generated SDKs and already maintain an OpenAPI spec."],
    chooseUs: ["You want docs people and agents can read, plus a hosted MCP server and a CLI, without writing a spec first.", "You want to see how agents use your API and what they couldn't find."],
  },
  {"title": "DocStar vs Speakeasy: API docs, MCP and SDKs | DocStar", "description": "DocStar vs Speakeasy: API docs, a hosted MCP server and a CLI written from your code, compared with SDK and MCP generation from an OpenAPI spec, side by side."}
);

const ALL = [COMPARE_MINTLIFY, COMPARE_README, COMPARE_GITBOOK, COMPARE_STAINLESS, COMPARE_SPEAKEASY];

export const COMPARE: SitePage = {
  slug: "compare",
  path: "/compare",
  label: "Compare",
  updated: "2026-10-30",
  meta: {"title": "Compare DocStar with other API documentation tools | DocStar", "description": "How DocStar compares with Mintlify, ReadMe, GitBook, Stainless and Speakeasy on API docs, hosted MCP servers, CLIs, llms.txt, editing and pricing, side by side."},
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "Compare",
      title: "How DocStar ==compares==.",
      sub: "DocStar publishes API docs, llms.txt, a hosted MCP server and a CLI from one source, written by your coding agent. Here's how that compares with other API documentation and developer tools, honestly and side by side.",
      primary: copyPrompt,
      secondary: { kind: "link", label: "Best API documentation tools", href: "https://docstar.io/blog/best-api-documentation-tools" },
    },
    {
      type: "cards",
      key: "comparisons",
      kicker: "Comparisons",
      title: "DocStar ==versus==…",
      items: ALL.map((p) => ({ title: p.label!, body: p.meta.description.replace(/^DocStar vs [^:]+: /, ""), cta: { kind: "link" as const, label: `Read ${p.label}`, href: p.path } })),
    },
    finalCta("Compare it ==on your own API==."),
  ],
};

export const COMPARE_PAGES = [COMPARE, ...ALL];
