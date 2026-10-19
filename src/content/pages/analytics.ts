import type { SitePage } from "../types";
import { finalCta, startFree, talkToUs } from "./shared";

export const ANALYTICS: SitePage = {
  slug: "analytics",
  path: "/analytics",
  meta: {
    title: "See how AI agents use your API | DocStar",
    description: "Human and agent traffic across your docs, MCP server, CLI and llms.txt. See which agents call you, what they ask, what they couldn't find, and the gaps they report.",
    keywords: ["API docs analytics", "AI agent analytics", "MCP analytics", "developer docs analytics"],
  },
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "Agent analytics",
      title: "See how ==agents use== your API.",
      sub: "People and AI agents, across your docs site, MCP server, CLI and llms.txt. See who reads you, what they ask, and what they couldn't find.",
      primary: startFree,
      secondary: talkToUs,
      code: {
        title: "this week · acme api",
        body: "readers           people 1,240 · agents 3,815\nby channel        MCP 2,102 · llms.txt 911 · docs 1,240 · CLI 802\ntop agents        Claude Code · Cursor · ChatGPT\nmost read         POST /v1/messages\nnot found         “bulk send limit” (41 searches)\nreported gaps     3 new from agents",
      },
    },
    {
      type: "cards",
      key: "metrics",
      kicker: "What you see",
      title: "Your API's ==real audience==.",
      items: [
        { title: "People vs agents", body: "Every read and call, split by who made it: a person, an AI agent, a crawler or a script." },
        { title: "By channel", body: "Docs site, markdown and llms.txt, MCP tools and CLI commands, side by side." },
        { title: "Which agents", body: "Claude, ChatGPT, Cursor, Codex and more, plus the clients and models behind them." },
        { title: "Top questions", body: "What people and agents search for, and which pages and endpoints answer them." },
        { title: "Missing answers", body: "Searches and tool calls that came back empty: the docs you should write next." },
        { title: "Reported gaps", body: "Agents using your MCP server report missing or wrong docs, grouped and de-duplicated, with the question that failed." },
      ],
    },
    {
      type: "faq",
      key: "faq",
      kicker: "FAQ",
      title: "Analytics questions.",
      items: [
        { q: "How do you tell agents from people?", a: "On the server, from each request's client and channel. Agents rarely run JavaScript, so browser-only analytics miss them." },
        { q: "Do you track my users personally?", a: "No. Reports are aggregate. Visitor IDs are random and hold no personal data." },
        { q: "Can agents report problems with my docs?", a: "Yes. Every hosted MCP server lets the agent report missing or wrong information straight to your inbox." },
      ],
    },
    finalCta("Know who ==really reads== your docs."),
  ],
};
