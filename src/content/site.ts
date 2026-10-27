import type { SiteSettings } from "./types";

const APP_LOGIN = "https://app.docstar.io/login";

export const SITE: SiteSettings = {
  // The only copy-prompt text: CtaButton, markdown.ts and llms.txt all read it from here. Keep it goal-only; the steps live in the quickstart.
  prompt: `Use DocStar to let my users use my app from their AI assistants.
Follow https://docstar.io/mcp/quickstart.md, document my app's user-facing APIs from my latest code, and set up MCP.`,
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
        { label: "Explore more", href: "https://walkover-products.embarko.app/?from=docstar", newTab: true },
        { label: "Terms of service", href: "/terms" },
        { label: "Privacy policy", href: "/privacy-policy" },
        { label: "Data retention", href: "/data-retention-policy" },
      ],
    },
  ],
};
