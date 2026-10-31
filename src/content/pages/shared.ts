import type { CardsSection, Cta, CtaSection } from "../types";

// Pieces several pages reuse, so wording stays the same everywhere.

export const APP_LOGIN = "https://app.docstar.io/login";
// Sign-up intent: the app can open on sign-up instead of sign-in. SiteAnalytics counts both as signup.clicked.
export const APP_SIGNUP = "https://app.docstar.io/login?intent=signup";
export const DEMO_LINK = "https://cal.com/docstar-team";
export const MCP_INSTALL = "claude mcp add --transport http docstar https://mcp.docstar.io/mcp";

export const copyPrompt: Cta = { kind: "copy-prompt", label: "Copy prompt" };
export const startFree: Cta = { kind: "link", label: "Start free", href: APP_SIGNUP };
export const talkToUs: Cta = { kind: "link", label: "Talk to us", href: DEMO_LINK };
export const installMcp: Cta = { kind: "copy-text", label: "Copy MCP install command", text: MCP_INSTALL, copiedLabel: "Copied. Run it in your terminal" };

export const finalCta = (title = "Take the first step. ==Let your agent== write your API docs."): CtaSection => ({
  type: "cta",
  key: "final-cta",
  title,
  sub: "One prompt. Your docs, MCP server and CLI, live.",
  primary: copyPrompt,
  secondary: startFree,
});

// Cards that link one page to its neighbours, with descriptive link text (internal linking).
const LINKS = {
  mcp: { title: "Hosted MCP server", body: "Every API you document gets an MCP server that agents use to search your docs and call your API.", cta: { kind: "link", label: "How the MCP server works", href: "/mcp" } },
  cli: { title: "docstar-cli", body: "Every published endpoint becomes a terminal command, and the CLI runs as a local MCP server.", cta: { kind: "link", label: "Generate a CLI from your docs", href: "/cli" } },
  "api-docs": { title: "API docs", body: "A public API reference with a try-it playground, guides, llms.txt and markdown for every page.", cta: { kind: "link", label: "See the API docs platform", href: "/api-docs" } },
  analytics: { title: "Agent analytics", body: "See which people and agents read your docs, what they ask and what they couldn't find.", cta: { kind: "link", label: "Explore agent analytics", href: "/analytics" } },
  "white-label": { title: "White-label", body: "Your domain on the docs and the MCP server, your name on the CLI, your look everywhere.", cta: { kind: "link", label: "Brand every channel", href: "/white-label" } },
  integrators: { title: "For developers using APIs", body: "Install the DocStar MCP once and your agent can find, read and call any API on DocStar.", cta: { kind: "link", label: "Give any API to your agent", href: "/for/integrators" } },
  pricing: { title: "Pricing", body: "Start free. Pro adds members for growing teams; Enterprise adds governance and support.", cta: { kind: "link", label: "Compare plans", href: "/pricing" } },
} satisfies Record<string, CardsSection["items"][number]>;

export const related = (title: string, pages: (keyof typeof LINKS)[]): CardsSection => ({
  type: "cards",
  key: "related",
  kicker: "Related",
  title,
  columns: pages.length === 2 ? 2 : 3,
  items: pages.map((p) => LINKS[p]),
});
