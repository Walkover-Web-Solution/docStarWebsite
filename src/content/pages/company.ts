import type { SitePage } from "../types";
import { DEMO_LINK, copyPrompt, finalCta, related, startFree, talkToUs } from "./shared";

// Company pages. Hidden until launch (DRAFT_PAGES in src/content/pages.ts): text marked TODO-COPY
// needs real facts from the team before these pages go live. See seo/PLAN.md, decisions 3 and 4.

export const ABOUT: SitePage = {
  slug: "about",
  path: "/about",
  label: "About",
  updated: "2026-10-30",
  meta: { title: "About DocStar: API docs for people and AI agents | DocStar", description: "DocStar is the API documentation platform for the agent era, built by Walkover. Who we are, why we built DocStar, how we work, and how to get in touch with us." },
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "About DocStar",
      title: "API docs for people ==and their agents==.",
      sub: "DocStar is an API documentation platform for the agent era: your coding agent writes the docs from your code, and DocStar publishes them as a docs site, llms.txt, a hosted MCP server and a CLI. DocStar is a product by Walkover.",
      primary: copyPrompt,
      secondary: { kind: "link", label: "Contact us", href: "/support" },
    },
    {
      type: "cards",
      key: "story",
      kicker: "Why we built it",
      title: "More of your readers are ==agents==.",
      columns: 3,
      items: [
        { title: "Agents read docs differently", body: "Coding agents and AI assistants don't browse. They need clean text, exact contracts and tools they can call, on top of the docs people read." },
        { title: "Docs drift", body: "Docs written by hand fall behind the code. An agent that already knows your code can write them and keep them current." },
        { title: "One source, every channel", body: "A docs site, llms.txt, an MCP server and a CLI shouldn't be four projects. DocStar serves all of them from one source." },
      ],
    },
    {
      type: "cards",
      key: "company",
      kicker: "Company",
      title: "Who ==we are==.",
      columns: 2,
      items: [
        { label: "team", title: "The team", body: "TODO-COPY: who builds DocStar, how many people, and the founders or leads to name (with photos and links if wanted)." },
        { label: "walkover", title: "Part of Walkover", body: "TODO-COPY: one or two sentences on Walkover, its other products (MSG91, viaSocket…) and where the company is based." },
        { label: "location", title: "Where we are", body: "TODO-COPY: office address or city and country, and the legal entity name for invoices." },
        { label: "contact", title: "Get in touch", body: "Email support@docstar.io for help, or book a 1:1 demo with the team.", cta: { kind: "link", label: "Book a demo", href: DEMO_LINK } },
      ],
    },
    related("What ==DocStar does==.", ["mcp", "api-docs", "cli"]),
    finalCta("Try DocStar ==on your own API==."),
  ],
};

export const CUSTOMERS: SitePage = {
  slug: "customers",
  path: "/customers",
  label: "Customers",
  updated: "2026-10-30",
  meta: { title: "Customers: teams publishing API docs with DocStar | DocStar", description: "See how API teams publish docs, llms.txt, a hosted MCP server and a CLI with DocStar, starting with MSG91's API docs at docs.msg91.com, hosted on DocStar." },
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "Customers",
      title: "API teams ==publishing with DocStar==.",
      sub: "DocStar customers publish API docs, llms.txt, a hosted MCP server and a CLI from one source. MSG91's API docs at docs.msg91.com run on DocStar.",
      primary: { kind: "link", label: "Read the MSG91 story", href: "/customers/msg91" },
      secondary: startFree,
    },
    {
      type: "cards",
      key: "stories",
      kicker: "Case studies",
      title: "How teams ==use DocStar==.",
      columns: 2,
      items: [
        { label: "messaging API", title: "MSG91", body: "SMS, WhatsApp, email and OTP APIs, documented on DocStar with llms.txt and module.json for agents, an MCP server and docstar-cli.", cta: { kind: "link", label: "MSG91 case study", href: "/customers/msg91" } },
        { label: "next", title: "TODO-COPY: second customer", body: "TODO-COPY: add more customers here once they agree to be named, with a one-line summary each." },
      ],
    },
    {
      type: "cta",
      key: "final-cta",
      title: "Want your API ==on this page==?",
      sub: "Publish your API docs with DocStar and tell us how it went.",
      primary: copyPrompt,
      secondary: talkToUs,
    },
  ],
};

export const MSG91: SitePage = {
  slug: "customers-msg91",
  path: "/customers/msg91",
  label: "MSG91",
  updated: "2026-10-30",
  meta: { title: "MSG91 case study: API docs and MCP for agents | DocStar", description: "How MSG91 publishes its messaging API docs on DocStar with llms.txt, module.json, a hosted MCP server and docstar-cli, so developers' agents can call the API." },
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "Case study · MSG91",
      title: "MSG91's API, ==ready for every agent==.",
      sub: "MSG91 publishes its messaging API docs on DocStar at docs.msg91.com. Developers read the reference; their agents read llms.txt and module.json, connect the MCP server and run endpoints with docstar-cli. MSG91 and DocStar are both Walkover products.",
      primary: { kind: "link", label: "See docs.msg91.com", href: "https://docs.msg91.com" },
      secondary: { kind: "link", label: "Read MSG91's llms.txt", href: "https://docs.msg91.com/llms.txt" },
      code: {
        title: "docs.msg91.com, for agents",
        body: "GET https://docs.msg91.com/llms.txt\nGET https://docs.msg91.com/module.json\nGET https://docs.msg91.com/whatsapp/module.json\n\n$ docstar-cli init docs.msg91.com",
      },
    },
    {
      type: "cards",
      key: "setup",
      kicker: "What's live",
      title: "One source, ==every channel==.",
      columns: 2,
      items: [
        { label: "people", title: "API reference", body: "Email, OTP, WhatsApp and other modules in one searchable reference with a try-it playground." },
        { label: "models", title: "llms.txt and module.json", body: "An llms.txt map and a module.json per module, so agents find the right endpoint without scraping HTML.", code: "curl https://docs.msg91.com/llms.txt" },
        { label: "terminals", title: "docstar-cli", body: "Developers install MSG91's modules and run endpoints as commands, prompted for the values they leave out.", code: "docstar-cli msg91 whatsapp check-whatsapp-prepaid-balance" },
        { label: "agents", title: "Through the DocStar MCP", body: "Agents connected to the DocStar MCP search for MSG91, read the WhatsApp contract and write the integration." },
      ],
    },
    {
      type: "cards",
      key: "results",
      kicker: "Results",
      title: "What ==changed==.",
      columns: 3,
      items: [
        { title: "TODO-COPY: result 1", body: "TODO-COPY: a measured outcome MSG91 agrees to publish, such as agent traffic share, time to publish, or support tickets." },
        { title: "TODO-COPY: result 2", body: "TODO-COPY: a second outcome, with the number and the period it covers." },
        { title: "TODO-COPY: quote", body: "TODO-COPY: a short quote from a named person at MSG91, with their role, approved by them." },
      ],
    },
    related("Build ==the same setup==.", ["api-docs", "mcp", "cli"]),
    finalCta("Make your API ==agent-ready==, like MSG91."),
  ],
};
