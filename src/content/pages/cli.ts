import type { SitePage } from "../types";
import { finalCta, related } from "./shared";

export const CLI: SitePage = {
  slug: "cli",
  path: "/cli",
  label: "CLI",
  updated: "2026-10-30",
  meta: {
    title: "Generate a CLI from your API docs with docstar-cli | DocStar",
    description: "docstar-cli turns any DocStar docs site into terminal commands, one per published endpoint, and runs them as a local MCP server. No SDK to generate or maintain.",
    keywords: ["generate CLI from API docs", "docstar-cli", "API command line tool", "API CLI", "local MCP server"],
  },
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "CLI",
      title: "A CLI for your API, ==generated from your docs==.",
      sub: "docstar-cli turns any DocStar docs site into a command-line tool: each published endpoint becomes a real command, required parameters and all, and the same commands run as a local MCP server. No SDK to generate, nothing to keep in sync.",
      primary: { kind: "copy-text", label: "Copy install command", text: "npm install -g docstar-cli", copiedLabel: "Copied. Run it in your terminal" },
      secondary: { kind: "link", label: "CLI docs", href: "https://docstar.io/help/cli" },
      run: {
        title: "terminal",
        lines: [
          { who: "you", text: "docstar-cli init docs.msg91.com" },
          { who: "agent", text: "Pick modules: ◉ WhatsApp  ◯ Email  ◯ OTP" },
          { who: "agent", text: "Installed msg91 · whatsapp", done: true },
          { who: "you", text: "docstar-cli msg91 whatsapp check-whatsapp-prepaid-balance" },
          { who: "agent", text: "? Enter value for authkey" },
          { who: "agent", text: "200 OK", done: true },
        ],
      },
    },
    {
      type: "steps",
      key: "how-it-works",
      kicker: "How it works",
      title: "From docs site to terminal ==in three steps==.",
      steps: [
        { title: "Run init against any DocStar docs site", body: "It reads the site once and fetches each module's endpoint contract: method, URL, headers, body and parameters.", code: "docstar-cli init docs.msg91.com" },
        { title: "Pick the modules you need", body: "An interactive checklist shows every published module. Each endpoint becomes a real, inspectable command on disk.", code: "◉ WhatsApp (whatsapp)\n◯ Email (email)\n◯ OTP (otp)" },
        { title: "Run commands", body: "Pass flags, or leave them out and get prompted. Method, URL, headers and body come from the published endpoint; you supply the values.", code: "docstar-cli msg91 whatsapp <endpoint> --flag value" },
      ],
    },
    {
      type: "cards",
      key: "features",
      kicker: "Built for real use",
      title: "Only what's ==actually documented==.",
      items: [
        { title: "Prompts for what's missing", body: "Skip a required flag and the CLI asks for it, so a command works before you've read the docs." },
        { title: "Local-first", body: "Contracts are saved to ~/.docstar after install. No round-trip to the docs site per call." },
        { title: "Predictable commands", body: "Commands follow API → module → endpoint, and list lets you browse what's installed.", code: "docstar-cli list" },
        { title: "Published endpoints only", body: "Never drafts, internal notes or raw credentials." },
        { title: "Credentials per API", body: "Save keys once per API; they're sent as the headers or params the docs describe.", code: "docstar-cli config set msg91 authkey <value>" },
        { title: "Always current", body: "Re-run init any time to pick up newly published endpoints." },
      ],
    },
    {
      type: "agent-readable",
      key: "local-mcp",
      kicker: "For agents",
      title: "Your installed APIs, as ==a local MCP server==.",
      sub: "Run docstar-cli mcp to expose every installed endpoint as an MCP tool over stdio, named <api>__<module>__<endpoint>. Agents call your APIs with your saved credentials.",
      commands: [{ cmd: "docstar-cli mcp", output: "MCP server on stdio · tools:\nmsg91__whatsapp__check-whatsapp-prepaid-balance\nmsg91__whatsapp__send-message-on-group\n…" }],
    },
    {
      type: "faq",
      key: "faq",
      kicker: "FAQ",
      title: "CLI questions.",
      items: [
        { q: "Which APIs can I install?", a: "Any API documented on DocStar. Point init at its docs site, a custom domain or sub-path, or the collection's slug." },
        { q: "How do I keep the commands up to date?", a: "Re-run init. The CLI reads the published docs, so new and changed endpoints arrive with the next install." },
        { q: "How are API keys handled?", a: "Save a key once per API with config set, or sign in. You can also write a key into your project's env file. Keys are sent only as the headers or parameters the docs describe." },
        { q: "Can my company ship it under our own name?", a: "Yes. With white-label, your users run your CLI name with your branding, generated from the same docs." },
        { q: "Does the CLI send my credentials anywhere?", a: "No. Credentials stay in ~/.docstar on your machine and are only sent to the API you call." },
      ],
    },
    related("More from ==one source==.", ["mcp", "api-docs", "white-label"]),
    finalCta("Give your users ==a CLI==, without writing one."),
  ],
};
