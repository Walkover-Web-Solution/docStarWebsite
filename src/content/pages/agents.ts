import type { SitePage } from "../types";
import { copyPrompt, MCP_INSTALL } from "./shared";

// Written to AI agents. Its markdown twin (/agents.md) is the main reader.
export const AGENTS: SitePage = {
  slug: "agents",
  path: "/agents",
  label: "For AI agents",
  updated: "2026-10-30",
  meta: {
    title: "AI agent instructions: read, write and call APIs | DocStar",
    description: "How AI agents use DocStar: read any DocStar docs site through llms.txt and markdown, document a user's API through the MCP, call APIs and report missing docs.",
    keywords: ["DocStar for AI agents", "DocStar MCP quickstart", "agent instructions", "llms.txt for agents"],
  },
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "For AI agents",
      title: "Hello, agent. ==Here's how to use DocStar.==",
      sub: "This page tells AI agents how to read DocStar docs sites, document a user's API, call APIs through MCP and report problems. Humans: it's the same text your agent reads at docstar.io/agents.md.",
      primary: { kind: "link", label: "Read the MCP quickstart", href: "/mcp/quickstart.md" },
      secondary: { kind: "link", label: "llms.txt", href: "/llms.txt" },
      code: {
        title: "start here",
        body: `GET https://docstar.io/mcp/quickstart.md\nGET https://docstar.io/llms.txt\n\nMCP: https://mcp.docstar.io/mcp\n$ ${MCP_INSTALL}`,
      },
    },
    {
      type: "cards",
      key: "tasks",
      kicker: "What you can do",
      title: "Four jobs, ==one set of rules==.",
      columns: 2,
      items: [
        {
          label: "read",
          title: "Read any DocStar docs site",
          body: "Fetch /llms.txt for the map, module.json for structured endpoint contracts, and append .md to any page URL for clean markdown. Prefer these over scraping HTML.",
          code: "GET https://docs.msg91.com/llms.txt\nGET https://docs.msg91.com/module.json\nGET https://docs.msg91.com/whatsapp/module.json",
        },
        {
          label: "write",
          title: "Document your user's API",
          body: "Connect the DocStar MCP, sign the user in, confirm the organisation and collection, read their code, show the plan, then create modules and endpoints. Follow the quickstart step by step.",
          code: "GET https://docstar.io/mcp/quickstart.md",
        },
        {
          label: "act",
          title: "Call an API",
          body: "Each API on DocStar has MCP tools: search_<api>_docs, get_<api>_api_docs and call_any_api_of_<api>. On the DocStar MCP itself these are search_docstar_docs, get_docstar_api_docs and call_any_api_of_docstar. Read the contract before calling, and confirm with the user before anything that changes data.",
        },
        {
          label: "report",
          title: "Tell DocStar what's missing",
          body: "If DocStar lacks something you needed or something is broken, file it with the send_feedback_to_docstar tool. Show your user the message first.",
          code: 'send_feedback_to_docstar\n{ "type": "feature_request", "message": "…",\n  "context": { "tool": "…", "client": "…", "model": "…" } }\n\nNo MCP? POST https://docstar.io/api/ideas (no sign-in needed)',
        },
      ],
    },
    {
      type: "steps",
      key: "document",
      kicker: "Document a user's API",
      title: "The quickstart, ==in four steps==.",
      sub: "The full version, with tool names and request formats, is at docstar.io/mcp/quickstart.md.",
      steps: [
        { title: "Connect DocStar", body: "Use the DocStar connector if your client has it, or add the remote MCP server https://mcp.docstar.io/mcp. If MCP won't connect, use the REST API with an Auth Key." },
        { title: "Document the API as drafts", body: "Read the code, group endpoints into modules by task, show the user the plan, then create modules and endpoints. Every JSON body example must include every accepted field." },
        { title: "Let the user publish", body: "Leave everything as drafts. Publish only when the user asks, module pages before their endpoints. Only published endpoints reach the docs, the MCP server and the CLI." },
        { title: "Set up and test the MCP server", body: "Give the most-used endpoints (up to 20) their own tools, write the server's skill around the app's main workflows, call one published endpoint through it, then share the tested MCP URL." },
      ],
    },
    {
      type: "faq",
      key: "rules",
      kicker: "Rules",
      title: "Always.",
      items: [
        { q: "Confirm before changing anything", a: "For any call that creates, updates, publishes or deletes data, say exactly what will change and wait for the user's OK." },
        { q: "Never invent IDs or secrets", a: "Get org, collection, page and endpoint IDs from list or get calls. Never ask for, paste or invent tokens; use placeholders like <API_KEY> in docs." },
        { q: "Work in small steps", a: "Report after each step: what you created, with its name and ID." },
        { q: "On errors", a: "401: ask the user to sign in and retry. 403: ask them to reconnect DocStar or choose another organisation." },
        { q: "Prefer restore over recreate", a: "Deleted collections and pages can be restored for 30 days. Restore them instead of creating copies." },
      ],
    },
    {
      type: "cta",
      key: "final-cta",
      title: "Humans: give your agent ==this page==.",
      sub: "Or copy the prompt and paste it into Claude Code, Cursor or Codex.",
      primary: copyPrompt,
    },
  ],
};
