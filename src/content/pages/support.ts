import type { SitePage } from "../types";
import { DEMO_LINK } from "./shared";

// Copy from the previous support page.
export const SUPPORT: SitePage = {
  slug: "support",
  path: "/support",
  meta: {
    title: "Contact Support | DocStar",
    description: "Email DocStar support or book a 1:1 demo. We typically reply within 24 hours on business days.",
    keywords: ["DocStar support", "contact DocStar", "DocStar demo"],
  },
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "Support",
      title: "Contact ==Support==",
      sub: "Whether you’re just getting started, launching your documentation hub, or have a technical question. Reach out, and we’ll respond promptly.",
      primary: { kind: "link", label: "support@docstar.io", href: "mailto:support@docstar.io" },
      secondary: { kind: "link", label: "Book your Demo", href: DEMO_LINK },
    },
    {
      type: "cards",
      key: "contact",
      title: "How to ==reach us==",
      columns: 2,
      items: [
        {
          label: "email",
          title: "Email Us",
          body: "Our technical support team typically replies within 24 hours on business days to ensure you get unstuck fast.",
          cta: { kind: "link", label: "support@docstar.io", href: "mailto:support@docstar.io" },
        },
        {
          label: "demo",
          title: "Schedule a 1:1 Demo",
          body: "Want a guided tour? Book a demo with our product specialist—we’ll show you the features, best practices, and answer any questions.",
          cta: { kind: "link", label: "Book your Demo", href: DEMO_LINK },
        },
      ],
    },
    {
      type: "prose",
      key: "more",
      body: "Looking for quick answers? [Check our help docs](https://docstar.io/help)\n\nYour AI agent can also tell us what's missing or broken: see [For agents](/agents).",
    },
  ],
};
