import type { SitePage } from "../types";
import { copyPrompt, MCP_INSTALL } from "./shared";

// Written to AI agents. Its markdown twin (/agents.md) is the main reader.
export const AGENTS: SitePage = {
  slug: "agents",
  path: "/agents",
  meta: {
    title: "For AI agents: how to use DocStar",
    description: "Instructions for AI agents: read any DocStar docs site, create API docs for your user, call APIs through MCP, and report problems to DocStar.",
    keywords: ["DocStar for AI agents", "MCP quickstart", "llms.txt", "agent instructions"],
  },
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "For AI agents",
      title: "Hello, agent. ==Here's how to use DocStar.==",
      sub: "This page is written for you. Humans: it's the same instructions your agent reads at docstar.io/agents.md.",
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
      type: "faq",
      key: "rules",
      kicker: "Rules",
      title: "Always.",
      items: [
        { q: "Confirm before changing anything", a: "For any call that creates, updates, publishes or deletes data, say exactly what will change and wait for the user's OK." },
        { q: "Never invent IDs or secrets", a: "Get org, collection, page and endpoint IDs from list or get calls. Never ask for, paste or invent tokens; use placeholders like <API_KEY> in docs." },
        { q: "Work in small steps", a: "Report after each step: what you created, with its name and ID." },
        { q: "On errors", a: "401: ask the user to sign in and retry. 403: ask them to reconnect DocStar or choose another organisation." },
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
