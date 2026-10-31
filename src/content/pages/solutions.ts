import type { SitePage } from "../types";
import { copyPrompt, finalCta, related, startFree, talkToUs } from "./shared";

// Solution pages by audience (/for/…). Hidden until launch (DRAFT_PAGES in src/content/pages.ts).
// Product statements come from DocStar's published pages; TODO-COPY marks what needs the team's input
// (customer names, segment-specific numbers, compliance claims).

export const FOR_SAAS: SitePage = {
  slug: "for-saas",
  path: "/for/saas",
  label: "SaaS companies",
  updated: "2026-10-30",
  meta: {"title": "API documentation for SaaS companies and agents | DocStar", "description": "Give your SaaS customers API docs, an MCP server and a CLI they can hand to their AI agents, written from your code and kept in sync as your product ships."},
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "For SaaS companies",
      title: "Let your customers' agents ==use your product==.",
      sub: "DocStar gives SaaS companies API documentation that people and AI agents can use: a docs site, llms.txt, a hosted MCP server and a CLI, written from your code and kept in sync as you ship. Your customers connect their AI assistant and act on your product, signed in as themselves.",
      primary: copyPrompt,
      secondary: talkToUs,
    },
    {
      type: "cards",
      key: "why",
      kicker: "Why it matters",
      title: "Your next users ==arrive through an agent==.",
      items: [
        { title: "In the assistant they already use", body: "Customers add your MCP server to Claude, ChatGPT, Cursor or VS Code and work with your product without leaving it." },
        { title: "Signed in as themselves", body: "The hosted MCP server uses OAuth, so each customer's agent calls your API with that customer's own access." },
        { title: "Docs that keep up with releases", body: "DocStar watches your repo and drafts doc fixes when routes, params or responses change, for you to approve." },
      ],
    },
    {
      type: "steps",
      key: "how-it-works",
      kicker: "How it works",
      title: "From your repo to ==your customers' agents==.",
      steps: [
        { title: "Your agent documents your API", body: "Paste one prompt into Claude Code, Cursor or Codex in your API's repo. It reads your routes and drafts the docs for you to review." },
        { title: "You publish once", body: "Docs, llms.txt, markdown, the MCP server and the CLI go live together, on your domain and under your brand." },
        { title: "Customers connect", body: "Every docs page has a Copy prompt button and one-click MCP connect, so customers hand your API to their agent in one step." },
      ],
    },
    {
      type: "cards",
      key: "proof",
      kicker: "Customers",
      title: "SaaS teams ==on DocStar==.",
      columns: 2,
      items: [
        { title: "TODO-COPY: SaaS customer", body: "TODO-COPY: a SaaS customer that agrees to be named, with one line on what they publish and a link to their docs." },
        { title: "MSG91", body: "MSG91's API docs at docs.msg91.com run on DocStar, with llms.txt and module.json for agents.", cta: { kind: "link", label: "Read the MSG91 case study", href: "/customers/msg91" } },
      ],
    },
    related("What SaaS teams ==use most==.", ["mcp", "white-label", "analytics"]),
    finalCta("Make your product ==agent-ready==."),
  ],
};

export const FOR_STARTUPS: SitePage = {
  slug: "for-api-first-startups",
  path: "/for/api-first-startups",
  label: "API-first startups",
  updated: "2026-10-30",
  meta: {"title": "API documentation for startups, in one prompt | DocStar", "description": "Launch API docs, llms.txt, a hosted MCP server and a CLI from one prompt in your coding agent. Start free and keep the docs in sync as your startup's API grows."},
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "For API-first startups",
      title: "Launch your API docs ==in one prompt==.",
      sub: "DocStar lets API-first startups publish API docs, llms.txt, a hosted MCP server and a CLI from one prompt in your coding agent. No OpenAPI file to write, no docs site to build, and a free plan to start.",
      primary: copyPrompt,
      secondary: startFree,
    },
    {
      type: "cards",
      key: "why",
      kicker: "Why startups pick DocStar",
      title: "Docs that ==ship with the API==.",
      items: [
        { title: "No spec required", body: "Your agent reads your routes and writes the reference: auth, params, bodies and responses. Have OpenAPI or Postman already? Import it instead." },
        { title: "Every channel at once", body: "A docs site for developers, llms.txt and markdown for models, an MCP server for agents and a CLI for terminals, from the same source." },
        { title: "Start free", body: "The Free plan includes unlimited pages and a custom domain. Pro is $25 a month with 10 members when the team grows." },
      ],
    },
    {
      type: "faq",
      key: "faq",
      kicker: "FAQ",
      title: "Startup ==questions==.",
      items: [
        { q: "How long does it take to publish?", a: "TODO-COPY: a typical time from prompt to published docs, measured on real projects." },
        { q: "Will the docs keep up as we iterate?", a: "Yes. DocStar watches your repo and drafts doc fixes when routes, params or responses change. You review before anything is published." },
        { q: "Can we leave later?", a: "Yes. Export your docs to OpenAPI 3 at any time." },
      ],
    },
    related("What you ==get on day one==.", ["api-docs", "mcp", "pricing"]),
    finalCta("Ship your API ==with its docs==."),
  ],
};

export const FOR_DEVREL: SitePage = {
  slug: "for-devrel",
  path: "/for/devrel",
  label: "DevRel teams",
  updated: "2026-10-30",
  meta: {"title": "API docs tools for DevRel teams, built for agents | DocStar", "description": "Developer relations teams use DocStar to publish API docs that people and AI agents read, see how agents use them, and fix the gaps agents report from MCP."},
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "For DevRel teams",
      title: "Developer experience, ==now for agents too==.",
      sub: "DocStar helps developer relations teams publish API docs that both people and AI agents can use, see how agents actually use them, and fix the gaps agents report through your MCP server.",
      primary: copyPrompt,
      secondary: talkToUs,
    },
    {
      type: "cards",
      key: "why",
      kicker: "What DevRel gets",
      title: "Measure the ==audience you couldn't see==.",
      items: [
        { title: "People vs agents", body: "Every read and call split by who made it, across the docs site, markdown and llms.txt, MCP tools and CLI commands." },
        { title: "Missing answers", body: "Searches and tool calls that came back empty: the docs to write next." },
        { title: "Reported gaps", body: "Agents using your MCP server report missing or wrong docs, grouped and de-duplicated, with the question that failed." },
        { title: "Copy prompt on every page", body: "Developers hand your API to their agent in one click, with one-click MCP connect for Cursor, VS Code and Claude." },
        { title: "Guides next to the reference", body: "Getting-started guides and changelogs live with the API reference and share navigation and search." },
        { title: "Your brand everywhere", body: "Your domain on the docs and the MCP server, your name on the CLI." },
      ],
    },
    related("Tools for ==developer experience==.", ["analytics", "api-docs", "white-label"]),
    finalCta("See how agents ==read your docs==."),
  ],
};

export const FOR_MESSAGING: SitePage = {
  slug: "for-messaging-apis",
  path: "/for/messaging-apis",
  label: "Messaging APIs",
  updated: "2026-10-30",
  meta: {"title": "Messaging API docs for SMS, WhatsApp and email | DocStar", "description": "Publish messaging API docs for SMS, WhatsApp, email and OTP that developers' agents can call through a hosted MCP server and a CLI, like MSG91 does on DocStar."},
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "For messaging APIs",
      title: "Messaging API docs ==agents can call==.",
      sub: "DocStar publishes messaging API docs for SMS, WhatsApp, email and OTP that developers read and their agents can call: llms.txt, a hosted MCP server and a CLI from the same source. MSG91 runs its API docs on DocStar.",
      primary: copyPrompt,
      secondary: { kind: "link", label: "Read the MSG91 case study", href: "/customers/msg91" },
      run: {
        title: "agent run",
        lines: [
          { who: "you", text: "Send an order confirmation on WhatsApp." },
          { who: "agent", text: "docstar › search APIs: “whatsapp send message”" },
          { who: "agent", text: "Found MSG91 WhatsApp · docs.msg91.com/whatsapp/module.json" },
          { who: "agent", text: "Added sendOrderConfirmation() with retries", done: true },
        ],
      },
    },
    {
      type: "cards",
      key: "why",
      kicker: "Built for messaging",
      title: "Every channel, ==one module each==.",
      items: [
        { title: "Modules per channel", body: "SMS, WhatsApp, email and OTP each get a module with its own contract, so agents land on the right endpoint." },
        { title: "Complete request examples", body: "Every endpoint's JSON body example includes every accepted field, so agents can send exactly what your API expects." },
        { title: "A CLI for quick tests", body: "Developers install the modules they need and run endpoints as commands, prompted for any value they leave out.", code: "docstar-cli msg91 whatsapp check-whatsapp-prepaid-balance" },
      ],
    },
    related("What ==MSG91 uses==.", ["api-docs", "mcp", "cli"]),
    finalCta("Make your messaging API ==agent-ready==."),
  ],
};

export const FOR_FINTECH: SitePage = {
  slug: "for-fintech-apis",
  path: "/for/fintech-apis",
  label: "Fintech APIs",
  updated: "2026-10-30",
  meta: {"title": "Fintech API documentation with MCP and OAuth | DocStar", "description": "Publish payments and fintech API docs with a hosted MCP server that calls your API with each user's own OAuth access and separate read and write tools."},
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "For fintech APIs",
      title: "Fintech API docs, ==safe for agents to use==.",
      sub: "DocStar publishes payments and fintech API docs with a hosted MCP server that calls your API with each user's own OAuth access. Reads and writes are separate tools, so agents can confirm with the user before anything that moves money or changes data.",
      primary: copyPrompt,
      secondary: talkToUs,
    },
    {
      type: "cards",
      key: "why",
      kicker: "Control",
      title: "Agents act ==only as the user==.",
      items: [
        { title: "Per-user OAuth", body: "Each user signs in, and every call runs with that user's own permissions. No shared keys in prompts." },
        { title: "Reads separate from writes", body: "Read-only GET requests have their own tool; writes are separate, so assistants can ask before changing data." },
        { title: "Named tools for key endpoints", body: "Give endpoints like create_refund their own tool and instructions, so agents use them the way you intend." },
        { title: "Published endpoints only", body: "The MCP server and the CLI only see published endpoints, never drafts or internal notes." },
        { title: "Your domain", body: "Run the docs and the MCP server on your own domain, for example mcp.acme.com." },
        { title: "TODO-COPY: security and compliance", body: "TODO-COPY: certifications, data residency and security reviews DocStar can state publicly. Do not publish this card until confirmed." },
      ],
    },
    related("The pieces ==that matter here==.", ["mcp", "white-label", "analytics"]),
    finalCta("Give agents ==safe access== to your API."),
  ],
};

export const SOLUTION_PAGES = [FOR_SAAS, FOR_STARTUPS, FOR_DEVREL, FOR_MESSAGING, FOR_FINTECH];
