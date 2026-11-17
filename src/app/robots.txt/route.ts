import { SITE_URL } from "@/lib/site";

// Served by the Worker (not a static file), so the middleware can replace it on test.* hosts.
// AI crawlers and agents are welcome: every page has a markdown twin, listed in /llms.txt.
const PRIVATE = ["/admin", "/xv/", "/api/", "/md/", "/content.json"];
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

function robotsBody(): string {
  const aiBlock = [
    AI_AGENTS.map((agent) => `User-Agent: ${agent}`).join("\n"),
    "Allow: /",
    ...PRIVATE.map((path) => `Disallow: ${path}`),
  ].join("\n");

  return [
    "User-Agent: *",
    "Content-Signal: search=yes, ai-input=yes, ai-train=no",
    "Allow: /",
    ...PRIVATE.map((path) => `Disallow: ${path}`),
    "",
    aiBlock,
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
}

export async function GET() {
  return new Response(robotsBody(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}