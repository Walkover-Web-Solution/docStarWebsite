import type { SiteSettings } from "./types";
import { APP_LOGIN, APP_SIGNUP } from "./pages/shared";

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
  start: { label: "Start free", href: APP_SIGNUP },
  tagline: "API documentation for people and agents.",
  supportEmail: "support@docstar.io",
  // TODO-COPY: add the company's LinkedIn, X, GitHub and YouTube profile URLs here once confirmed.
  social: [{ label: "npm: docstar-cli", href: "https://www.npmjs.com/package/docstar-cli" }],
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
      title: "Solutions",
      links: [
        { label: "Give any API to your agent", href: "/for/integrators" },
        { label: "SaaS companies", href: "/for/saas" },
        { label: "API-first startups", href: "/for/api-first-startups" },
        { label: "DevRel teams", href: "/for/devrel" },
        { label: "Messaging APIs", href: "/for/messaging-apis" },
        { label: "Fintech APIs", href: "/for/fintech-apis" },
        { label: "For AI agents", href: "/agents" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "https://docstar.io/blog" },
        { label: "Help docs", href: "https://docstar.io/help" },
        { label: "Changelog", href: "/changelog" },
        { label: "Compare", href: "/compare" },
        { label: "llms.txt checker", href: "/tools/llms-txt-checker" },
        { label: "MCP quickstart", href: "/mcp/quickstart.md" },
        { label: "llms.txt", href: "/llms.txt" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Customers", href: "/customers" },
        { label: "Support", href: "/support" },
        { label: "Terms of service", href: "/terms" },
        { label: "Privacy policy", href: "/privacy-policy" },
        { label: "Data retention", href: "/data-retention-policy" },
      ],
    },
  ],
};
