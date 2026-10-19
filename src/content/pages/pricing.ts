import type { SitePage } from "../types";
import { APP_LOGIN } from "./shared";

// Plans and prices word for word from the previous pricing page.
export const PRICING: SitePage = {
  slug: "pricing",
  path: "/pricing",
  meta: {
    title: "Pricing - DocStar",
    description: "Documentation without barriers. Publish knowledge bases, blogs, and API docs freely with Docstar pricing.",
    keywords: ["DocStar pricing", "API docs pricing", "free API documentation"],
  },
  sections: [
    {
      type: "pricing",
      key: "plans",
      title: "Build beautiful documentation ==for free==",
      sub: "Paywalls get out of the way? Docstar keeps the essential tools open so you can publish knowledge bases, blogs, and API docs without friction.",
      free: {
        title: "Everything you need in the Free plan",
        sub: "Unlock the full Docstar workspace with unlimited pages, collaboration, and publishing tools at no cost under our fair-usage policy.",
        features: [
          "Block-based editor with integrations",
          "Spaces & Collection: Unlimited",
          "API playground",
          "Custom domain support",
          "Redirect management",
          "Site customization controls",
          "User feedback & site insights",
          "Built-in SEO tooling",
          "Published versions history",
          "Real-time collaboration",
          "Import / Export",
          "Members: 1 included",
          "Unlimited pages",
          "Trash & recovery",
          "Articles bulk actions",
          "Inbuilt AI assistant",
          "Full text search",
        ],
        link: { kind: "link", label: "See all features", href: "https://docstar.io/help" },
      },
      plans: [
        {
          title: "Pro",
          price: "$25",
          priceNote: "per month",
          description: "Perfect for growing teams that need advanced customization and additional seats.",
          features: ["Everything in the Free plan", "10 members included", "Add teammates for $5/user"],
          cta: { kind: "link", label: "Get started with Pro", href: APP_LOGIN },
          highlight: true,
        },
        {
          title: "Enterprise",
          price: "Let’s talk",
          priceNote: "Custom pricing",
          description: "Advanced governance, security, and onboarding tailored around your organization.",
          features: ["Everything in Pro", "Unlimited members & collections", "Dedicated success manager", "Priority support"],
          cta: { kind: "link", label: "Talk to us", href: "/support" },
        },
      ],
    },
    {
      type: "faq",
      key: "faq",
      kicker: "FAQ",
      title: "DocStar Pricing FAQs",
      items: [
        { q: "Is the Free plan really free?", a: "Yes. The Free plan includes the full Docstar workspace with unlimited pages, collaboration, and publishing tools at no cost under our fair-usage policy." },
        { q: "How many members are included?", a: "The Free plan includes 1 member. Pro includes 10 members, and you can add teammates for $5/user." },
        { q: "What does Enterprise add?", a: "Everything in Pro, plus unlimited members & collections, a dedicated success manager and priority support." },
      ],
    },
  ],
};
