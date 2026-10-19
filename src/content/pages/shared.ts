import type { Cta, CtaSection } from "../types";

// Pieces several pages reuse, so wording stays the same everywhere.

export const APP_LOGIN = "https://app.docstar.io/login";
export const DEMO_LINK = "https://cal.com/docstar-team";
export const MCP_INSTALL = "claude mcp add --transport http docstar https://mcp.docstar.io/mcp";

export const copyPrompt: Cta = { kind: "copy-prompt", label: "Copy prompt" };
export const startFree: Cta = { kind: "link", label: "Start free", href: APP_LOGIN };
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
