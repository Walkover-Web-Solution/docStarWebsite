import type { SitePage } from "../types";
import { finalCta, related, startFree, talkToUs } from "./shared";

export const ANALYTICS: SitePage = {
  slug: "analytics",
  path: "/analytics",
  label: "Agent analytics",
  updated: "2026-10-30",
  meta: {
    title: "API docs analytics: see how AI agents use your API | DocStar",
    description: "See people and AI agents across your docs, MCP server, CLI and llms.txt: which agents read you, what they search for and the answers they couldn't find.",
    keywords: ["API docs analytics", "AI agent analytics", "MCP analytics", "llms.txt analytics", "docs search analytics"],
  },
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "Agent analytics",
      title: "See how ==agents use== your API.",
      sub: "DocStar's agent analytics show people and AI agents across your docs site, MCP server, CLI and llms.txt: who reads your API docs, what they ask, and what they couldn't find.",
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
      type: "steps",
      key: "how-it-works",
      kicker: "How it works",
      title: "Counted where ==agents actually read==.",
      sub: "Agents rarely run JavaScript, so browser-only analytics never see them. DocStar counts on the server, on every channel it serves.",
      steps: [
        { title: "Every request is classified", body: "Each read and call is labelled on the server by who made it: a person, an AI agent, a crawler or a script, with the agent or client name when it's known." },
        { title: "Every channel is counted", body: "Docs pages, markdown and llms.txt fetches, MCP tool calls and CLI commands land in one report, side by side." },
        { title: "Gaps turn into a to-do list", body: "Searches and tool calls that came back empty, and the gaps agents report through your MCP server, show you which docs to write next." },
      ],
    },
    {
      type: "faq",
      key: "faq",
      kicker: "FAQ",
      title: "Agent analytics ==questions==.",
      items: [
        { q: "How do you tell agents from people?", a: "On the server, from each request's client and channel. Agents rarely run JavaScript, so browser-only analytics miss them." },
        { q: "Do you track my users personally?", a: "No. Reports are aggregate. Visitor IDs are random and hold no personal data." },
        { q: "Can agents report problems with my docs?", a: "Yes. Every hosted MCP server lets the agent report missing or wrong information straight to your inbox." },
        { q: "Which agents can you identify?", a: "Claude, ChatGPT, Cursor, Codex and more, plus the clients and models behind them when they say who they are." },
      ],
    },
    related("Where the ==numbers come from==.", ["api-docs", "mcp", "cli"]),
    finalCta("Know who ==really reads== your docs."),
  ],
};
