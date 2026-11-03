import type { SitePage } from "../types";
import { APP_SIGNUP, DEMO_LINK, copyPrompt, related } from "./shared";

// Prices and seat counts are unchanged from the previous pricing page. TODO-COPY (seo/PLAN.md decision 1):
// confirm which plans include the hosted MCP server, docstar-cli, custom MCP domains, agent analytics and
// white-label. Until then the plan lists name only features DocStar has already published for the Free plan.
// This page is never synced to the database (admin HIDDEN), so it goes live on deploy.
export const PRICING: SitePage = {
  slug: "pricing",
  path: "/pricing",
  label: "Pricing",
  updated: "2026-10-30",
  meta: {
    title: "Pricing for API docs, MCP servers and CLIs | DocStar",
    description: "Start free with DocStar, then move to Pro at $25 a month with 10 members included, or talk to us about Enterprise governance, security and onboarding support.",
    keywords: ["DocStar pricing", "API documentation pricing", "free API docs tool", "MCP server pricing"],
  },
  sections: [
    {
      type: "pricing",
      key: "plans",
      title: "DocStar pricing: ==start free==, grow with your team",
      sub: "Publish API docs that people and their AI agents can read, for free. Move to Pro when more of your team writes the docs.",
      free: {
        title: "Everything you need in the Free plan",
        sub: "Unlimited pages and the full API docs workspace at no cost, under our fair-usage policy.",
        features: [
          "Unlimited pages",
          "API reference with a try-it playground",
          "Import OpenAPI, Swagger or Postman",
          "Export to OpenAPI",
          "Real-time collaborative editing",
          "Custom domain",
          "Site customization controls",
          "Redirect management",
          "Published version history",
          "Full-text search",
          "Built-in AI assistant",
          "1 member included",
        ],
        link: { kind: "link", label: "See all features in the help docs", href: "https://docstar.io/help" },
      },
      plans: [
        {
          title: "Pro",
          price: "$25",
          priceNote: "per month",
          description: "For growing teams that need more seats and advanced customization.",
          features: ["Everything in the Free plan", "10 members included", "Add teammates for $5/user"],
          cta: { kind: "link", label: "Get started with Pro", href: APP_SIGNUP },
          highlight: true,
        },
        {
          title: "Enterprise",
          price: "Let’s talk",
          priceNote: "Custom pricing",
          description: "Advanced governance, security and onboarding, tailored to your organization.",
          features: ["Everything in Pro", "Unlimited members & collections", "Dedicated success manager", "Priority support"],
          cta: { kind: "link", label: "Talk to us", href: DEMO_LINK },
        },
      ],
    },
    {
      type: "faq",
      key: "faq",
      kicker: "FAQ",
      title: "DocStar pricing ==questions==",
      items: [
        { q: "Is the Free plan really free?", a: "Yes. The Free plan includes unlimited pages and the full API docs workspace at no cost, under our fair-usage policy." },
        { q: "How many members are included?", a: "The Free plan includes 1 member. Pro includes 10 members, and you can add teammates for $5/user." },
        { q: "What does Enterprise add?", a: "Everything in Pro, plus unlimited members & collections, a dedicated success manager and priority support." },
        { q: "Can I use my own domain on the Free plan?", a: "Yes. Publish your docs on a custom domain from the Free plan." },
      ],
    },
    related("Before you ==choose a plan==.", ["api-docs", "mcp", "white-label"]),
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
