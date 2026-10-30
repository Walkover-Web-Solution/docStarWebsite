import type { SitePage } from "./types";
import { APP_SIGNUP, related, startFree } from "./pages/shared";

export const HOME: SitePage = {
  slug: "home",
  path: "/",
  label: "Home",
  updated: "2026-10-30",
  meta: {
    title: "API documentation for people and AI agents | DocStar",
    description: "DocStar turns your code into API docs, llms.txt, a hosted MCP server and a CLI. Paste one prompt into your coding agent; DocStar keeps every channel in sync.",
    keywords: ["API documentation for AI agents", "agent-ready API docs", "MCP server", "llms.txt", "API docs for AI agents", "CLI from API"],
  },
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "API documentation for people and AI agents",
      title: "Your agent writes the docs. ==Every agent== can use them.",
      sub: "DocStar is API documentation for people and AI agents. Paste one prompt into your coding agent: it documents your API from your code, and DocStar publishes the docs, llms.txt, an MCP server and a CLI, and keeps them in sync.",
      primary: { kind: "copy-prompt", label: "Copy prompt" },
      secondary: { kind: "link", label: "See how it works", href: "#how-it-works" },
      works: "Claude Code · Cursor · Codex · VS Code · any MCP client",
      run: {
        title: "agent run",
        time: "00:41",
        lines: [
          { who: "you", text: "Document my API with DocStar." },
          { who: "agent", text: "Reading src/routes … 24 endpoints in 5 modules" },
          { who: "agent", text: "Auth: bearer token in Authorization header" },
          { who: "agent", text: "Created “Acme API” · 5 modules · 24 endpoints" },
          { who: "agent", text: "Published docs.acme.com", done: true },
          { who: "agent", text: "MCP server live at mcp.acme.com", done: true },
          { who: "agent", text: "CLI ready: npx docstar-cli init acme", done: true },
          { who: "agent", text: "Watching main for changes to keep docs in sync", done: true },
        ],
        summary: "3 channels live · no OpenAPI file needed",
      },
    },
    {
      type: "works-with",
      key: "works-with",
      label: "Works with",
      items: ["Claude Code", "Cursor", "Codex", "VS Code", "Windsurf", "Claude Desktop", "ChatGPT", "any MCP client"],
    },
    {
      type: "steps",
      key: "how-it-works",
      kicker: "How it works",
      title: "From code to every channel, ==in one prompt==.",
      sub: "No spec to write, no editor to learn. Your agent already knows your code.",
      steps: [
        {
          title: "Copy the prompt",
          body: "Paste it into Claude Code, Cursor or Codex, opened in your API's repo.",
          code: "Use the DocStar MCP to document\nthis API in DocStar.",
        },
        {
          title: "Your agent reads your code",
          body: "It finds every route with its auth, params, bodies and responses, groups them into modules, and shows you the plan before writing anything.",
          code: "found 24 endpoints in 5 modules\n? Create “Acme API” with these\n  modules? (y/n)",
        },
        {
          title: "You approve, DocStar publishes",
          body: "Docs, llms.txt, markdown, MCP server and CLI go live together. Your agent proposes, you publish.",
          code: "docs.acme.com            ✓\nmcp.acme.com             ✓\nnpx docstar-cli init acme ✓",
        },
      ],
    },
    {
      type: "channels",
      key: "channels",
      kicker: "One source, every format",
      title: "Write it once. ==Every reader== gets its format.",
      sub: "People, models, agents, terminals and tools each read an API differently. DocStar serves all of them from the same source.",
      items: [
        {
          name: "Docs site",
          reader: "for people",
          body: "Searchable API reference and guides on your domain, with try-it, code samples and your branding.",
          sample: "docs.acme.com/messages/send",
        },
        {
          name: "llms.txt + markdown",
          reader: "for models",
          body: "Every page has a .md twin, and your site has llms.txt. Models read clean text, not HTML.",
          sample: "GET docs.acme.com/llms.txt",
        },
        {
          name: "MCP server",
          reader: "for agents",
          body: "A hosted MCP server on your own domain. Agents search your docs and call your API as tools, with OAuth sign-in.",
          sample: "claude mcp add acme https://mcp.acme.com",
        },
        {
          name: "CLI",
          reader: "for terminals",
          body: "Every endpoint becomes a command, generated from your docs and updated with them.",
          sample: "npx docstar-cli acme messages send",
        },
        {
          name: "OpenAPI",
          reader: "for tools",
          body: "A current OpenAPI file for SDK generators, gateways and test tools.",
          sample: "GET docs.acme.com/openapi.json",
        },
      ],
    },
    {
      type: "pillars",
      key: "stays-true",
      kicker: "After launch",
      title: "Docs that ==keep up== with your API.",
      sub: "Publishing is the easy part. DocStar keeps the docs right as the API changes and shows you how they're used.",
      items: [
        {
          feature: "drift-detection",
          glyph: "≠",
          title: "Never drifts",
          body: "DocStar watches your repo. When a route, param or response changes, it flags the drift and drafts the fix for you to approve.",
          points: ["GitHub app", "Fixes linked to the PR that caused them", "Review before publish"],
        },
        {
          feature: "agent-feedback",
          glyph: "!",
          title: "Agents report gaps",
          body: "When an agent using your MCP server hits missing or wrong docs, it files the issue for you, with the exact question it couldn't answer.",
          points: ["Built into every MCP server", "Grouped and de-duplicated", "Straight to your inbox"],
        },
        {
          feature: "agent-analytics",
          glyph: "%",
          title: "See how agents use your API",
          body: "Human and agent traffic, split by channel. Top questions, failed searches, popular endpoints and the clients calling them.",
          points: ["Docs, MCP, CLI and llms.txt", "Agent and client names", "Missing-answer reports"],
        },
        {
          feature: "white-label",
          glyph: "@",
          title: "Your brand, every channel",
          body: "Your domain on the docs and the MCP server, your name on the CLI. DocStar stays in the background.",
          points: ["Custom domains", "Branded MCP server", "Branded CLI"],
        },
      ],
    },
    related("Every part of DocStar, ==in detail==.", ["mcp", "cli", "api-docs", "analytics", "white-label", "integrators"]),
    {
      type: "hub",
      key: "for-integrators",
      kicker: "For developers using APIs",
      title: "Using someone else's API? ==Hand it to your agent==.",
      sub: "Install the DocStar MCP once. Your agent can find, read and call every API documented on DocStar, always at the current version.",
      primary: {
        kind: "copy-text",
        label: "Copy MCP install command",
        text: "claude mcp add --transport http docstar https://mcp.docstar.io/mcp",
        copiedLabel: "Copied. Run it in your terminal",
      },
      secondary: { kind: "link", label: "List your API on DocStar", href: APP_SIGNUP },
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
      type: "agent-readable",
      key: "agent-readable",
      kicker: "Readable by agents",
      title: "This page has a ==markdown twin==.",
      sub: "Ask for markdown and you get clean text. Every page on docstar.io, and every docs site on DocStar, works the same way. Try it on MSG91's API docs, hosted on DocStar.",
      commands: [
        { cmd: 'curl https://docstar.io -H "Accept: text/markdown"', output: "# Your agent writes the docs. Every agent can use them.\n\nPaste one prompt into your coding agent…" },
        { cmd: "curl https://docs.msg91.com/llms.txt", output: "# Msg91\n\n## How to use this API (for AI agents)\n\n- Module index (discover modules): https://docs.msg91.com/module.json\n\n## Modules\n\n- [Email](https://docs.msg91.com/email/module.json)\n- [OTP](https://docs.msg91.com/otp/module.json)…" },
      ],
    },
    {
      type: "faq",
      key: "faq",
      kicker: "FAQ",
      title: "Questions, answered.",
      items: [
        {
          q: "What is DocStar?",
          a: "DocStar is an API documentation platform for people and AI agents. Your coding agent creates the docs from your code. DocStar publishes them as a docs site, llms.txt and markdown, a hosted MCP server, a CLI and an OpenAPI file, and keeps them in sync.",
        },
        {
          q: "Do I need an OpenAPI file?",
          a: "No. Your agent reads your routes directly. If you already have an OpenAPI or Postman file, you can import it instead.",
        },
        {
          q: "Which agents work with DocStar?",
          a: "Any agent or client that supports MCP, including Claude Code, Cursor, Codex, VS Code, Windsurf and ChatGPT.",
        },
        {
          q: "Will my agent publish without asking?",
          a: "No. Agents create drafts and propose changes. You review and publish, unless you turn on auto-publish for a project.",
        },
        {
          q: "Can I use my own domain and brand?",
          a: "Yes. The docs site, the MCP server and the CLI can all carry your domain and your name.",
        },
        {
          q: "How do my users hand my API to their agents?",
          a: "Every docs page has a Copy prompt button and one-click MCP install for Cursor, VS Code and Claude, so your users can give your API to their agent in one step.",
        },
      ],
    },
    {
      type: "cta",
      key: "final-cta",
      title: "Take the first step. ==Let your agent== write your API docs.",
      sub: "One prompt. Your docs, MCP server and CLI, live.",
      primary: { kind: "copy-prompt", label: "Copy prompt" },
      secondary: startFree,
    },
  ],
};
