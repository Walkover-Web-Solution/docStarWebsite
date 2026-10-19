import type { SitePage } from "../types";
import { finalCta, installMcp } from "./shared";

export const INTEGRATORS: SitePage = {
  slug: "for-integrators",
  path: "/for/integrators",
  meta: {
    title: "Give any API to your AI agent | DocStar",
    description: "Install the DocStar MCP once. Your agent can find, read and call every API documented on DocStar, always at the current version.",
    keywords: ["API for AI agents", "MCP for APIs", "give API docs to agent", "Claude Code API integration"],
  },
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "For developers using APIs",
      title: "Give ==any API== to your agent.",
      sub: "Install the DocStar MCP once. Your agent can find, read and call every API documented on DocStar, always at the current version. No copy-pasting docs into chat.",
      primary: installMcp,
      secondary: { kind: "link", label: "See how it works", href: "#how-it-works" },
      works: "Claude Code · Cursor · Codex · VS Code · any MCP client",
      run: {
        title: "agent run",
        lines: [
          { who: "you", text: "Send an order confirmation on WhatsApp." },
          { who: "agent", text: "docstar › search APIs: “whatsapp send message”" },
          { who: "agent", text: "Found MSG91 WhatsApp · docs.msg91.com/whatsapp/module.json" },
          { who: "agent", text: "Read the contract: auth, body, errors" },
          { who: "agent", text: "Added sendOrderConfirmation() with retries", done: true },
        ],
      },
    },
    {
      type: "steps",
      key: "how-it-works",
      kicker: "How it works",
      title: "One install, ==every API==.",
      steps: [
        { title: "Install the DocStar MCP", body: "One command in your agent. Sign in with DocStar when it asks.", code: "claude mcp add --transport http docstar \\\n  https://mcp.docstar.io/mcp" },
        { title: "Ask for what you need", body: "Describe the task. Your agent searches the APIs on DocStar and picks the right endpoint." },
        { title: "Your agent reads and calls", body: "It reads the exact contract, writes the integration and can make real test calls with your credentials." },
      ],
    },
    {
      type: "cards",
      key: "on-every-docs-page",
      kicker: "On every DocStar docs site",
      title: "Hand one API to your agent ==in one click==.",
      items: [
        { title: "Copy prompt", body: "Every docs page has a Copy prompt button that gives your agent the whole API: where the docs are and how to call them." },
        { title: "One-click MCP connect", body: "Add that API's own MCP server to Cursor, VS Code or Claude in one step." },
        { title: "Markdown and llms.txt", body: "Every page has a markdown twin and the site has llms.txt, so agents read clean text, not HTML.", code: "curl https://docs.msg91.com/llms.txt" },
      ],
    },
    {
      type: "faq",
      key: "faq",
      kicker: "FAQ",
      title: "Questions from integrators.",
      items: [
        { q: "Which APIs are available?", a: "Every API documented on DocStar. Your agent searches them through the DocStar MCP, or you can point it at any DocStar docs site." },
        { q: "Is the documentation current?", a: "Yes. Agents read the API owner's published docs directly, not a scraped copy." },
        { q: "Do I need an account?", a: "Reading public docs doesn't. Signing in with DocStar lets your agent call APIs and save your work." },
      ],
    },
    finalCta("Your agent, with ==every API== at hand."),
  ],
};
