import type { SitePage } from "../types";
import { DEMO_LINK } from "./shared";

// Copy from the previous support page.
export const SUPPORT: SitePage = {
  slug: "support",
  path: "/support",
  label: "Support",
  updated: "2026-10-30",
  meta: {
    title: "Contact support: email us or book a product demo | DocStar",
    description: "Get help with DocStar: email support@docstar.io for a reply within 24 hours on business days, book a 1:1 demo, or have your AI agent report what's missing.",
    keywords: ["DocStar support", "contact DocStar", "DocStar demo"],
  },
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "Support",
      title: "Contact DocStar ==support==",
      sub: "Email support@docstar.io and we reply within 24 hours on business days, or book a 1:1 demo. Whether you're documenting your first API or setting up an MCP server, we'll help you get unstuck.",
      primary: { kind: "link", label: "support@docstar.io", href: "mailto:support@docstar.io" },
      secondary: { kind: "link", label: "Book a demo", href: DEMO_LINK },
    },
    {
      type: "cards",
      key: "contact",
      title: "How to ==reach us==.",
      columns: 2,
      items: [
        {
          label: "email",
          title: "Email us",
          body: "Our technical support team typically replies within 24 hours on business days to ensure you get unstuck fast.",
          cta: { kind: "link", label: "support@docstar.io", href: "mailto:support@docstar.io" },
        },
        {
          label: "demo",
          title: "Book a 1:1 demo",
          body: "Want a guided tour? Book a demo with a product specialist. We'll show you how your agent documents your API, how the MCP server and CLI work, and answer your questions.",
          cta: { kind: "link", label: "Book a demo", href: DEMO_LINK },
        },
      ],
    },
    {
      type: "faq",
      key: "faq",
      kicker: "FAQ",
      title: "Before you ==write to us==.",
      items: [
        { q: "Where are the help docs?", a: "At docstar.io/help, including guides for connecting your AI assistant to DocStar and using the CLI." },
        { q: "Can my AI agent report a problem for me?", a: "Yes. Agents connected to the DocStar MCP can file bugs and feature requests with the send_feedback_to_docstar tool. Without MCP they can POST to the public ideas API; see the page for AI agents." },
        { q: "How do I request deletion of my data?", a: "Email support@docstar.io with the subject \"Data Deletion Request\", your registered email and what to delete. The data retention policy explains verification and timelines." },
        { q: "How fast will you reply?", a: "Within 24 hours on business days." },
      ],
    },
    {
      type: "prose",
      key: "more",
      body: "Looking for quick answers? [Read the DocStar help docs](https://docstar.io/help).\n\nYour AI agent can also tell us what's missing or broken: see [instructions for AI agents](/agents). For data requests, see the [data retention and deletion policy](/data-retention-policy).",
    },
  ],
};
