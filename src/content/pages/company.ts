import type { SitePage } from "../types";
import { DEMO_LINK, copyPrompt, finalCta, related, startFree, talkToUs } from "./shared";

// Company pages. Hidden until launch (DRAFT_PAGES in src/content/pages.ts): text marked TODO-COPY
// needs real facts from the team before these pages go live. See seo/PLAN.md, decisions 3 and 4.

export const ABOUT: SitePage = {
  slug: "about",
  path: "/about",
  label: "About",
  updated: "2026-11-11",
  meta: {
    title: "About DocStar | API documentation for people and AI agents",
    description: "DocStar is API documentation for people and AI agents, built by Walkover, the team behind MSG91. Learn what we build, why, and who it’s for.",
    keywords: ["about DocStar", "DocStar company", "Walkover DocStar"],
  },
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "About DocStar",
      title: "About ==DocStar==",
      sub: "DocStar is API documentation for people and AI agents. Your coding agent writes the docs from your code, and DocStar publishes them as a docs site, llms.txt, a hosted MCP server and a CLI, kept in sync as your API changes.",
      primary: startFree,
      secondary: { kind: "link", label: "Get in touch", href: "mailto:support@docstar.io" },
    },
    {
      type: "prose",
      key: "story",
      body: "## Why we built DocStar\n\nMore and more of the people who use an API never read its docs. They ask Claude, ChatGPT or Cursor to do the job, and the AI reads the docs and makes the calls. When the docs are missing, out of date or hard for a machine to read, the agent guesses and the call fails.\n\nWe built DocStar so that every API can be used correctly by both the people and the agents who depend on it.",
    },
    {
      type: "cards",
      key: "beliefs",
      title: "What we ==believe==",
      columns: 3,
      items: [
        {
          title: "One source of truth",
          body: "Docs, MCP and CLI are never separate projects. Publish once and every channel changes together.",
        },
        {
          title: "AI does the writing",
          body: "You shouldn’t need a spec file or an editor to start. Your coding agent already knows your code.",
        },
        {
          title: "People stay in control",
          body: "Agents propose and people publish. Every AI edit is a draft until someone approves it.",
        },
        {
          title: "Agents act for real users",
          body: "An AI calls your API as the signed-in user, through your own sign-in, and never sees their credentials.",
        },
        {
          title: "Docs stay true",
          body: "An agent is only as good as the docs it reads, so DocStar works to keep docs matched to the code.",
        },
        {
          title: "Your brand, not ours",
          body: "Your domain on the docs site and the MCP server, and your name on the CLI.",
        },
      ],
    },
    {
      type: "cards",
      key: "audience",
      title: "Who DocStar ==is for==",
      columns: 3,
      items: [
        {
          title: "API companies and product teams",
          body: "Who want customers’ AI assistants to use their API without mistakes.",
        },
        {
          title: "Developer experience and docs teams",
          body: "Who want one place to write and publish.",
        },
        {
          title: "Internal platform teams",
          body: "Who want their own engineers’ agents to use internal APIs safely.",
        },
      ],
    },
    {
      type: "prose",
      key: "company",
      body: "## Built by Walkover\n\nDocStar is built by Walkover, the team behind MSG91. MSG91's API reference, its MCP server and its CLI all run on DocStar, so we use what we build every day.\n\n[Explore more Walkover products](https://walkover-products.embarko.app/?from=docstar)\n\n## Learn more\n\n- [What is DocStar and how it works](/blog/what-is-docstar-how-it-works)\n- [How DocStar compares](/blog/best-api-documentation-tools)\n- [Pricing](/pricing)",
    },
    {
      type: "cta",
      key: "final-cta",
      title: "Get in ==touch==",
      sub: "Questions, partnerships or press: support@docstar.io",
      primary: startFree,
      secondary: { kind: "link", label: "support@docstar.io", href: "mailto:support@docstar.io" },
    },
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
