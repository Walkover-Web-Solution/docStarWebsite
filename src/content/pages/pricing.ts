import type { SitePage } from "../types";
import { APP_SIGNUP, DEMO_LINK, copyPrompt, related } from "./shared";

// This page is never synced to the database (admin HIDDEN), so it goes live on deploy.
export const PRICING: SitePage = {
  slug: "pricing",
  path: "/pricing",
  label: "Pricing",
  updated: "2026-11-12",
  meta: {
    title: "Pricing for API docs, MCP servers and CLIs | DocStar",
    description:
      "Every DocStar feature is free, including the MCP server and CLI. Pro is $25/month with 10 members, then $5 per extra member. Enterprise for unlimited members.",
    keywords: ["DocStar pricing", "API documentation pricing", "free API docs tool", "MCP server pricing"],
  },
  sections: [
    {
      type: "pricing",
      key: "plans",
      title: "DocStar pricing: ==start free==, grow with your team",
      sub: "Every feature is included on every plan. You only pay for team members.",
      free: {
        title: "Included on every plan",
        sub: "The full DocStar workspace—docs site, MCP server, CLI and agent tooling—for every plan.",
        features: [
          "Unlimited pages and collections",
          "API docs site on your custom domain, with a try-it playground and full-text search",
          "Hosted MCP server, so AI agents can search your docs and call your API",
          "DocStar CLI: every endpoint becomes a command",
          "llms.txt and a markdown copy of every page",
          "Import OpenAPI, Swagger or Postman; export to OpenAPI",
          "Agent analytics",
          "Drift detection with the GitHub app",
          "White-label: your domain on the docs and MCP server, your name on the CLI",
          "Real-time collaborative editing, published version history and redirects",
          "Built-in AI assistant",
        ],
      },
      plans: [
        {
          title: "Free",
          price: "$0",
          description: "1 member.",
          features: [],
          cta: { kind: "link", label: "Start free", href: APP_SIGNUP },
        },
        {
          title: "Pro",
          price: "$25",
          priceNote: "per month",
          description: "For growing teams that need more seats.",
          features: ["10 members included", "$5 per extra member per month"],
          cta: { kind: "link", label: "Get started with Pro", href: APP_SIGNUP },
          highlight: true,
        },
        {
          title: "Enterprise",
          price: "Let’s talk",
          priceNote: "Custom pricing",
          description: "Governance, security and onboarding tailored to your organization.",
          features: ["Unlimited members", "Dedicated success manager", "Priority support"],
          cta: { kind: "link", label: "Talk to us", href: DEMO_LINK },
        },
      ],
    },
    {
      type: "prose",
      key: "fair-usage",
      body: `## Fair usage

There are no hard limits on pages, collections, MCP calls or agent traffic. Fair usage means normal documentation use. If an account’s usage is unusually high, for example automated scraping or load testing through the MCP server, we’ll email you first and work it out together. We never take your docs offline without contacting you.`,
    },
    related("Before you ==choose a plan==.", ["api-docs", "mcp", "white-label"]),
    {
      type: "faq",
      key: "faq",
      kicker: "FAQ",
      title: "DocStar pricing ==questions==",
      items: [
        {
          q: "Is the Free plan really free?",
          a: "Yes. Every feature is included. You only pay for team members, under our [fair-usage policy](#fair-usage).",
        },
        {
          q: "How many members are included?",
          a: "Free includes 1 member. Pro includes 10 members, then $5 per extra member per month. Enterprise includes unlimited members.",
        },
        {
          q: "What does Enterprise add?",
          a: "Unlimited members, a dedicated success manager and priority support.",
        },
        {
          q: "Can I use my own domain on the Free plan?",
          a: "Yes. Custom domains and white-label are included on every plan.",
        },
        {
          q: "Which features are on the Free plan?",
          a: "All of them. Plans differ only in members and support.",
        },
        {
          q: "Do you charge for MCP calls or agent traffic?",
          a: "No. See [Fair usage](#fair-usage).",
        },
        {
          q: "Who counts as a member?",
          a: "Anyone who can edit in your workspace. Readers and AI agents using your docs are free and unlimited.",
        },
        {
          q: "What happens when I add an 11th member on Pro?",
          a: "It’s $5 per month for each extra member.",
        },
      ],
    },
    {
      type: "cta",
      key: "final-cta",
      title: "Start free. ==Let your agent== write the docs.",
      sub: "Paste one prompt into your coding agent and publish your first API docs today.",
      primary: copyPrompt,
      secondary: { kind: "link", label: "Start free", href: APP_SIGNUP },
    },
  ],
};
