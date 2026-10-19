import type { SitePage } from "../types";
import { copyPrompt, finalCta } from "./shared";

export const MCP: SitePage = {
  slug: "mcp",
  path: "/mcp",
  meta: {
    title: "Hosted MCP server for your API | DocStar",
    description: "DocStar hosts an MCP server for every API you document. Agents search your docs, read the exact contract and make real calls, with OAuth sign-in. No server to build or keep in sync.",
    keywords: ["MCP server", "hosted MCP", "MCP for API", "Model Context Protocol", "API for AI agents"],
  },
  sections: [
    {
      type: "hero",
      key: "hero",
      kicker: "MCP server",
      title: "Your API, as an ==MCP server==.",
      sub: "DocStar hosts an MCP server for every API you document. Agents search your docs, read the exact contract and make real calls. No server to build, host or keep in sync.",
      primary: copyPrompt,
      secondary: { kind: "link", label: "What agents can do", href: "#tools" },
      works: "Claude Code · Claude Desktop · ChatGPT · Cursor · VS Code · any MCP client",
      code: {
        title: "connect your agent",
        body: "$ claude mcp add --transport http acme https://mcp.acme.com\n\n✓ Connected to acme · 3 tools\n  search_acme_docs\n  get_acme_api_docs\n  call_any_api_of_acme",
      },
    },
    {
      type: "steps",
      key: "how-it-works",
      kicker: "How it works",
      title: "From your code to an MCP server, ==without writing one==.",
      steps: [
        { title: "Your agent documents your API", body: "Paste the prompt into your coding agent. It reads your routes and creates the API docs in DocStar." },
        { title: "DocStar creates the MCP server", body: "Every API docs project gets a hosted MCP server, named after your API, on a DocStar URL or your own domain." },
        { title: "Any agent can use your API", body: "Your users connect their agents in one step. The tools read your published docs, so they're always current." },
      ],
    },
    {
      type: "cards",
      key: "tools",
      kicker: "Tools",
      title: "What agents can do ==with your API==.",
      sub: "Every MCP server comes with tools to find, read and call your API. Add your own for the jobs that matter most.",
      columns: 2,
      items: [
        { label: "find", title: "Find the right endpoint", body: "Agents search your docs in plain language and land on the right endpoint, guide or example.", code: "search_acme_docs “send a WhatsApp template”" },
        { label: "read", title: "Read the exact contract", body: "They get methods, URLs, parameters, request bodies, responses and examples, straight from your published docs.", code: "get_acme_api_docs → refunds module" },
        { label: "act", title: "Make real calls", body: "Agents call your API for the user, signed in with the user's own access, and confirm before anything that changes data.", code: "POST /v1/refunds → 201 Created" },
        { label: "your tools", title: "Add your own tools", body: "Turn key endpoints into dedicated tools, like create_refund, so agents use them directly. Write instructions that tell agents how your API works.", code: "create_refund · get_order · list_payments" },
      ],
    },
    {
      type: "cards",
      key: "connect",
      kicker: "Connect",
      title: "Works with ==every MCP client==.",
      columns: 3,
      items: [
        { title: "Claude Code", body: "Add it from the terminal.", code: "claude mcp add --transport http acme https://mcp.acme.com" },
        { title: "Cursor and VS Code", body: "Add it to your MCP settings.", code: '{ "mcpServers": { "acme": { "url": "https://mcp.acme.com" } } }' },
        { title: "ChatGPT and Claude Desktop", body: "Add a custom connector and paste the URL. Users sign in with OAuth when the tools need it." },
      ],
    },
    {
      type: "cards",
      key: "hosted-or-local",
      kicker: "Hosted or local",
      title: "Run it ==where you need it==.",
      columns: 2,
      items: [
        { label: "hosted by DocStar · HTTP", title: "Hosted MCP server", body: "Paste one URL into your client. Find, read and call tools plus your own, with OAuth sign-in for each user. Best for sharing your API with every customer's agents." },
        { label: "on your machine · stdio", title: "docstar-cli mcp", body: "Install your API with docstar-cli, then run it as a local MCP server with one tool per endpoint. Best for scripting, testing and power users.", cta: { kind: "link", label: "See the CLI", href: "/cli" } },
      ],
    },
    {
      type: "faq",
      key: "faq",
      kicker: "FAQ",
      title: "MCP questions.",
      items: [
        { q: "Do I need to build or host anything?", a: "No. DocStar creates and hosts the MCP server for each API docs project. You publish your docs; the server follows them." },
        { q: "How do the tools stay up to date?", a: "The tools read your published docs. Republish and every connected agent sees the new contract." },
        { q: "How do users authenticate?", a: "The hosted server supports OAuth sign-in, so each user's agent calls your API with that user's own access." },
        { q: "Can it run on my own domain?", a: "Yes. The MCP server can run on your domain, for example mcp.acme.com, with DNS and certificate set up from DocStar." },
      ],
    },
    finalCta("Your API, ready for ==every agent==."),
  ],
};
