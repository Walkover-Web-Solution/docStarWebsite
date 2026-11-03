import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Served by the Worker (not a static file), so the middleware can replace it on test.* hosts.
// AI crawlers and agents are welcome: every page has a markdown twin, listed in /llms.txt.
const PRIVATE = ["/admin", "/xv/", "/api/", "/md/", "/content.json"];
const AI_AGENTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      { userAgent: AI_AGENTS, allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
