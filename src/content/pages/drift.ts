import type { SitePage } from "../types";
import { finalCta, startFree, talkToUs } from "./shared";

export const DRIFT: SitePage = {
  slug: "drift",
  path: "/drift",
  meta: {
    title: "API docs that never drift | DocStar",
    description: "DocStar watches your repo. When a route, parameter or response changes, it flags the drift and drafts the doc fix for you to approve, linked to the pull request that caused it.",
    keywords: ["API documentation drift", "docs in sync with code", "GitHub API docs", "automatic API docs updates"],
  },
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "Drift detection",
      title: "API docs that ==never drift==.",
      sub: "DocStar watches your repo. When a route, parameter or response changes, it flags the drift and drafts the fix for you to approve, linked to the pull request that caused it.",
      primary: startFree,
      secondary: talkToUs,
      run: {
        title: "pull request #482 merged",
        lines: [
          { who: "agent", text: "Changed: POST /v1/messages adds required field “channel”" },
          { who: "agent", text: "Docs say: “channel” not listed · drift found" },
          { who: "agent", text: "Drafted fix: param table, example, MCP tool schema" },
          { who: "you", text: "Approve" },
          { who: "agent", text: "Published docs, MCP and CLI updated", done: true },
        ],
      },
    },
    {
      type: "steps",
      key: "how-it-works",
      kicker: "How it works",
      title: "Your docs ==follow your code==.",
      steps: [
        { title: "Connect GitHub", body: "Install the DocStar GitHub app on the repo and pick the branch to track." },
        { title: "Every merge is checked", body: "DocStar compares what changed in the code (routes, params, bodies, responses, auth) with what the docs say." },
        { title: "You approve the fix", body: "Drift comes with a drafted update. Review it, edit if needed, and publish. Nothing goes live without you." },
      ],
    },
    {
      type: "cards",
      key: "what-is-checked",
      kicker: "What's checked",
      title: "The parts ==that break integrations==.",
      items: [
        { title: "Routes and methods", body: "New, renamed and removed endpoints." },
        { title: "Parameters and bodies", body: "Required fields, types, enums and defaults." },
        { title: "Responses and errors", body: "Status codes, response shapes and error formats." },
        { title: "Authentication", body: "Header names, schemes and scopes." },
        { title: "Every channel at once", body: "One fix updates the docs site, markdown, MCP tools, CLI commands and OpenAPI." },
        { title: "Or sync from a spec", body: "Prefer OpenAPI? A generated GitHub Actions workflow syncs your spec and markdown on every push." },
      ],
    },
    {
      type: "faq",
      key: "faq",
      kicker: "FAQ",
      title: "Drift questions.",
      items: [
        { q: "Does DocStar publish changes on its own?", a: "No. It drafts the fix and links it to the change. You approve and publish." },
        { q: "Do I need OpenAPI?", a: "No. DocStar reads route definitions directly, and uses an OpenAPI spec when you have one." },
        { q: "What access does the GitHub app need?", a: "Read access to code, metadata and pull requests on the repos you choose." },
      ],
    },
    finalCta("Ship code. ==The docs keep up.=="),
  ],
};
