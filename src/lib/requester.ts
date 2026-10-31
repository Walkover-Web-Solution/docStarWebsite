// Classifies who is making a request: a person in a browser, or an agent, crawler or
// HTTP client. Agents don't run JavaScript, so this runs on the server (middleware and
// /api/e). Same values as admin_events.actor_type.

export type ActorType = "human" | "ai_agent" | "ai_crawler" | "ai_search" | "http_client" | "bot";
export type Requester = { actorType: ActorType; agentName: string | null };

// Order matters: the first match wins.
const KNOWN: [RegExp, ActorType, string][] = [
  // fetches made for a user, live, by an AI assistant or coding agent
  [/Claude-User/i, "ai_agent", "Claude"],
  [/ChatGPT-User/i, "ai_agent", "ChatGPT"],
  [/Perplexity-User/i, "ai_agent", "Perplexity"],
  [/MistralAI-User/i, "ai_agent", "Mistral"],
  [/claude-code|Claude Code/i, "ai_agent", "Claude Code"],
  [/Cursor/i, "ai_agent", "Cursor"],
  [/Codex/i, "ai_agent", "Codex"],
  [/Windsurf|Codeium/i, "ai_agent", "Windsurf"],
  [/GitHub-Copilot|Copilot/i, "ai_agent", "Copilot"],
  [/Devin/i, "ai_agent", "Devin"],
  [/Gemini/i, "ai_agent", "Gemini"],
  [/docstar-cli/i, "ai_agent", "docstar-cli"],
  // AI search indexes
  [/OAI-SearchBot/i, "ai_search", "OpenAI Search"],
  [/Claude-SearchBot/i, "ai_search", "Claude Search"],
  [/PerplexityBot/i, "ai_search", "Perplexity"],
  [/YouBot/i, "ai_search", "You.com"],
  // AI training crawlers
  [/GPTBot/i, "ai_crawler", "GPTBot"],
  [/ClaudeBot|anthropic-ai/i, "ai_crawler", "ClaudeBot"],
  [/Google-Extended/i, "ai_crawler", "Google-Extended"],
  [/Applebot-Extended/i, "ai_crawler", "Applebot-Extended"],
  [/Bytespider/i, "ai_crawler", "Bytespider"],
  [/CCBot/i, "ai_crawler", "CommonCrawl"],
  [/Meta-ExternalAgent|meta-externalfetcher/i, "ai_crawler", "Meta"],
  [/Amazonbot/i, "ai_crawler", "Amazonbot"],
  [/cohere-ai/i, "ai_crawler", "Cohere"],
  [/Diffbot/i, "ai_crawler", "Diffbot"],
  // programmatic HTTP clients (often agents' fetch tools)
  [/^curl\//i, "http_client", "curl"],
  [/^Wget/i, "http_client", "wget"],
  [/python-requests|python-httpx|aiohttp|urllib/i, "http_client", "python"],
  [/node-fetch|undici|axios|got\b|^node\b/i, "http_client", "node"],
  [/Go-http-client/i, "http_client", "go"],
  [/okhttp|Java\//i, "http_client", "java"],
  [/PostmanRuntime/i, "http_client", "postman"],
  // classic search and social bots. Google's other crawlers (URL Inspection, GoogleOther, Shopping, Ads,
  // Lighthouse in PageSpeed Insights…) use browser-like user agents and must never be treated as people:
  // people can be put into A/B tests, crawlers always get the live page.
  [/Googlebot/i, "bot", "Googlebot"],
  [/Google-InspectionTool|GoogleOther|Storebot-Google|AdsBot-Google|Mediapartners-Google|APIs-Google|Google-Site-Verification|FeedFetcher-Google|Google-Read-Aloud|Chrome-Lighthouse/i, "bot", "Google"],
  [/BingPreview|adidxbot|MicrosoftPreview/i, "bot", "Bingbot"],
  [/Applebot/i, "bot", "Applebot"],
  [/bingbot/i, "bot", "Bingbot"],
  [/DuckDuckBot/i, "bot", "DuckDuckGo"],
  [/YandexBot/i, "bot", "Yandex"],
  [/Baiduspider/i, "bot", "Baidu"],
  [/facebookexternalhit|Twitterbot|LinkedInBot|Slackbot|Discordbot|TelegramBot|WhatsApp/i, "bot", "link preview"],
  [/HeadlessChrome|Puppeteer|Playwright|PhantomJS/i, "bot", "headless browser"],
  [/bot\b|crawler|spider|crawl/i, "bot", "other bot"],
];

export function classify(userAgent: string | null | undefined, headers?: Headers): Requester {
  const ua = (userAgent || "").trim();
  if (!ua) return { actorType: "http_client", agentName: "no user agent" };
  for (const [re, actorType, agentName] of KNOWN) {
    if (re.test(ua)) return { actorType, agentName };
  }
  // A browser UA that asks for markdown is almost always an agent's fetch tool.
  if (headers?.get("accept")?.toLowerCase().includes("text/markdown")) return { actorType: "ai_agent", agentName: "markdown client" };
  if (/Mozilla\/5\.0/.test(ua)) return { actorType: "human", agentName: null };
  return { actorType: "http_client", agentName: ua.split(/[\s/]/)[0].slice(0, 40) || "unknown" };
}
