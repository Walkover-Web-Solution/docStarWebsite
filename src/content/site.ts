import type { SiteSettings } from "./types";

const APP_LOGIN = "https://app.docstar.io/login";

export const SITE: SiteSettings = {
  // Same prompt as components/homeSection/CopyAgentPrompt.tsx.
  prompt: `Use the DocStar MCP (https://mcp.docstar.io/mcp) to turn my app's API into an MCP server, so my users can use my product from their AI assistants.
First read https://docstar.io/mcp/quickstart.md and follow it step by step.
Work from my latest code. Document each endpoint, then give me the MCP URL to share with my users. Ask me before you create or publish anything.`,
  nav: [
    { label: "MCP", href: "/mcp" },
    { label: "CLI", href: "/cli" },
    { label: "API docs", href: "/api-docs" },
    { label: "For agents", href: "/agents" },
    { label: "Pricing", href: "/pricing" },
  ],
  signIn: { label: "Sign in", href: APP_LOGIN },
  start: { label: "Start free", href: APP_LOGIN },
  tagline: "API documentation for people and agents.",
  footer: [
    {
      title: "Product",
      links: [
        { label: "MCP server", href: "/mcp" },
        { label: "CLI", href: "/cli" },
        { label: "API docs", href: "/api-docs" },
        { label: "Agent analytics", href: "/analytics" },
        { label: "White-label", href: "/white-label" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Use DocStar",
      links: [
        { label: "Give any API to your agent", href: "/for/integrators" },
        { label: "For AI agents", href: "/agents" },
        { label: "MCP quickstart", href: "/mcp/quickstart.md" },
        { label: "llms.txt", href: "/llms.txt" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Support", href: "/support" },
        { label: "Help docs", href: "https://docstar.io/help" },
        { label: "Privacy policy", href: "/privacy-policy" },
        { label: "Data retention", href: "/data-retention-policy" },
      ],
    },
  ],
};
