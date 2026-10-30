import type { SitePage } from "../types";
import { finalCta, related, startFree, talkToUs } from "./shared";

export const WHITE_LABEL: SitePage = {
  slug: "white-label",
  path: "/white-label",
  label: "White-label",
  updated: "2026-10-30",
  meta: {
    title: "White-label API docs, MCP server and CLI | DocStar",
    description: "Publish white-label API docs on your domain, run the MCP server at mcp.yourcompany.com and ship the CLI under your name, with your logo, colours and fonts.",
    keywords: ["white-label API documentation", "custom domain API docs", "branded MCP server", "branded CLI"],
  },
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "White-label",
      title: "White-label API docs, ==on every channel==.",
      sub: "DocStar publishes your API docs, MCP server and CLI under your brand: your domain on the docs and the MCP server, your name on the CLI, your logo, colours and fonts. DocStar stays in the background.",
      primary: startFree,
      secondary: talkToUs,
      code: {
        title: "acme, everywhere",
        body: "docs.acme.com          docs site\nmcp.acme.com           MCP server\n$ acme messages send   CLI\nacme.com/llms.txt      for models",
      },
    },
    {
      type: "cards",
      key: "channels",
      kicker: "What carries your brand",
      title: "Nothing says ==DocStar== unless you want it to.",
      columns: 2,
      items: [
        { label: "docs", title: "Your domain", body: "Publish on a custom domain, subdomain or sub-path. DocStar handles certificates and redirects." },
        { label: "mcp", title: "Your MCP server", body: "Run the MCP server on your own domain, set up with DNS and certificate checks from DocStar. Agents see your name on every tool.", code: "claude mcp add acme https://mcp.acme.com" },
        { label: "cli", title: "Your CLI", body: "Give your users a CLI with your name and branding, generated from the same docs and updated with them.", code: "acme messages send --to +15550100" },
        { label: "look", title: "Your look", body: "Logo, favicon, colours, fonts, header and footer, light and dark. The “Built with DocStar” badge can go." },
      ],
    },
    {
      type: "steps",
      key: "setup",
      kicker: "Set up",
      title: "Your domain, ==live in three steps==.",
      steps: [
        { title: "Add your domain in DocStar", body: "Choose a custom domain, subdomain or sub-path for the docs, and a domain such as mcp.acme.com for the MCP server." },
        { title: "Point a DNS record at DocStar", body: "DocStar checks the record and issues the certificate, so the docs and the MCP server are served over HTTPS on your domain." },
        { title: "Publish under your brand", body: "Set your logo, favicon, colours, fonts, header and footer. Connect URLs and CLI commands carry your name." },
      ],
    },
    {
      type: "faq",
      key: "faq",
      kicker: "FAQ",
      title: "White-label ==questions==.",
      items: [
        { q: "Can I use my own domain for the MCP server?", a: "Yes. Point a DNS record at DocStar; it verifies the record and issues the certificate." },
        { q: "Can I remove DocStar branding?", a: "Yes. Docs, MCP tools and CLI can all carry only your brand." },
        { q: "Does white-label change how agents connect?", a: "No. Agents connect the same way; they just see your name and domain." },
        { q: "Can the docs live on a sub-path of my site?", a: "Yes. Publish on a custom domain, a subdomain or a sub-path such as acme.com/docs." },
      ],
    },
    related("What ==carries your brand==.", ["api-docs", "mcp", "cli"]),
    finalCta("Your API, ==your brand==, every channel."),
  ],
};
