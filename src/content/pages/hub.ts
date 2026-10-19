import type { SitePage } from "../types";
import { APP_LOGIN, finalCta, installMcp } from "./shared";

export const HUB: SitePage = {
  slug: "hub",
  path: "/hub",
  meta: {
    title: "The API hub for AI agents | DocStar",
    description: "Every API on DocStar in one place: readable by people, callable by agents, always current. Install the DocStar MCP once to reach them all, or list your own API.",
    keywords: ["API hub", "API directory for AI agents", "MCP API catalog", "API marketplace"],
  },
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "The hub",
      title: "Every API, ==ready for your agent==.",
      sub: "docstar.io/<api> puts each API's docs in one place: readable by people, callable by agents, always current. Install the DocStar MCP once to reach them all.",
      primary: installMcp,
      secondary: { kind: "link", label: "List your API", href: APP_LOGIN },
      code: {
        title: "docstar.io/msg91",
        body: "MSG91 · messaging APIs · owner-verified\n\nmodules   Email · OTP · OTP Widget · RCS · WhatsApp\nfor you   docs.msg91.com\nfor LLMs  docs.msg91.com/llms.txt\nfor agents  DocStar MCP · search_msg91_docs",
      },
    },
    {
      type: "steps",
      key: "how-it-works",
      kicker: "How it works",
      title: "Find, read, ==call==.",
      steps: [
        { title: "Find", body: "Your agent searches the hub for the API that does the job: “send a WhatsApp message”, “verify an OTP”." },
        { title: "Read", body: "It reads the owner's published contract: endpoints, auth, bodies, errors and examples." },
        { title: "Call", body: "It writes the integration and can make real calls with your credentials, through the DocStar MCP." },
      ],
    },
    {
      type: "cards",
      key: "why",
      kicker: "Why it's different",
      title: "Not a scrape. ==The source.==",
      items: [
        { title: "Owner-verified", body: "Listings are published by the API's owner on DocStar, not scraped from the web." },
        { title: "Always current", body: "When the owner publishes, every agent sees the new version at once." },
        { title: "Callable, not just readable", body: "Every API comes with MCP tools that make real requests, not just pages to read." },
      ],
    },
    {
      type: "cards",
      key: "for-owners",
      kicker: "For API owners",
      title: "Put your API ==where agents look==.",
      columns: 2,
      items: [
        { title: "List your API", body: "Publish your docs on DocStar and your API appears in the hub, with its own MCP tools.", cta: { kind: "link", label: "Start free", href: APP_LOGIN } },
        { title: "Claim your listing", body: "Already listed? Claim it to manage the docs, see who uses your API and reply to agent-reported gaps.", cta: { kind: "link", label: "Talk to us", href: "https://cal.com/docstar-team" } },
      ],
    },
    {
      type: "faq",
      key: "faq",
      kicker: "FAQ",
      title: "Hub questions.",
      items: [
        { q: "Which APIs are in the hub?", a: "APIs whose owners publish their docs on DocStar, such as MSG91." },
        { q: "Is it free for integrators?", a: "Reading public docs is free. Calls go to the API owner with your own credentials." },
        { q: "How do I add my API?", a: "Publish your API docs on DocStar. Let your agent write them from your code with one prompt." },
      ],
    },
    finalCta("Put your API ==in every agent's reach==."),
  ],
};
