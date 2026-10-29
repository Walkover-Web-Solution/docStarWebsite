// What's trending in AI, for the blog autopilot: Hacker News stories, plus recent posts from AI companies, the MCP
// spec and Reddit. All public and keyless; any source that fails or is blocked (Reddit often blocks servers) is
// skipped. Titles come from outside people: the prompt treats them as untrusted data.

const UA = "docstar-blog-autopilot/1.0 (+https://docstar.io)";

const HN_QUERIES = ["MCP", "AI agent", "LLM", "Claude", "API documentation", "llms.txt"];
const HN_HOURS = 48;
const HN_MIN_POINTS = 20;
const MAX_HN = 30;

// [source, feed URL, how many days back counts as recent]
const FEEDS: [string, string, number][] = [
  ["OpenAI", "https://openai.com/news/rss.xml", 7],
  ["Google AI", "https://blog.google/technology/ai/rss/", 7],
  ["Hugging Face", "https://huggingface.co/blog/feed.xml", 7],
  ["MCP spec releases", "https://github.com/modelcontextprotocol/modelcontextprotocol/releases.atom", 30],
  ["Simon Willison", "https://simonwillison.net/atom/everything/", 3],
  ["Reddit r/LocalLLaMA, r/ClaudeAI, r/mcp", "https://www.reddit.com/r/LocalLLaMA+ClaudeAI+mcp/top/.rss?t=day&limit=25", 2],
];
const MAX_PER_FEED = 8;

export type HnStory = { title: string; url: string; points: number; comments: number; hn: string };
export type FeedItem = { source: string; title: string; url: string; date: string };

/** Top stories of the last 48 hours on Hacker News for each query, merged by URL. HN's search is loose; the AI judges relevance. */
export async function hackerNews(): Promise<HnStory[]> {
  const since = Math.floor(Date.now() / 1000) - HN_HOURS * 3600;
  const lists = await Promise.all(
    HN_QUERIES.map((q) =>
      fetch(`https://hn.algolia.com/api/v1/search?tags=story&query=${encodeURIComponent(q)}&numericFilters=${encodeURIComponent(`created_at_i>${since},points>${HN_MIN_POINTS}`)}&hitsPerPage=20`, {
        signal: AbortSignal.timeout(15_000),
      })
        .then((r) => (r.ok ? r.json() : { hits: [] }))
        .then((d: any) => (d?.hits || []) as any[])
        .catch(() => [] as any[])
    )
  );
  const byUrl = new Map<string, HnStory>();
  for (const hit of lists.flat()) {
    const hn = `https://news.ycombinator.com/item?id=${hit.objectID}`;
    const url = hit.url || hn;
    if (!hit.title || byUrl.has(url)) continue;
    byUrl.set(url, { title: String(hit.title).slice(0, 200), url, points: hit.points || 0, comments: hit.num_comments || 0, hn });
  }
  return [...byUrl.values()].sort((a, b) => b.points - a.points).slice(0, MAX_HN);
}

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();

const tag = (block: string, name: string) => block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`))?.[1];

/** The entries of an RSS or Atom feed: title, link, date. Small on purpose: these feeds are simple. */
export function parseFeed(xml: string) {
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>|<entry[\s>][\s\S]*?<\/entry>/g) || [];
  return blocks
    .map((b) => {
      const link = tag(b, "link") || b.match(/<link[^>]*href="([^"]+)"/)?.[1] || "";
      const date = tag(b, "pubDate") || tag(b, "published") || tag(b, "updated") || "";
      return { title: decode(tag(b, "title") || ""), url: decode(link), date: new Date(decode(date)) };
    })
    .filter((e) => e.title && /^https?:\/\//.test(e.url) && !isNaN(e.date.getTime()));
}

/** Recent posts from each feed, newest first, at most a few per feed. */
export async function feeds(): Promise<FeedItem[]> {
  const lists = await Promise.all(
    FEEDS.map(([source, url, days]) =>
      fetch(url, { headers: { "user-agent": UA, accept: "application/rss+xml, application/atom+xml, application/xml, text/xml" }, redirect: "follow", signal: AbortSignal.timeout(15_000) })
        .then((r) => (r.ok ? r.text() : ""))
        .then((xml) => {
          const since = Date.now() - days * 86_400_000;
          return parseFeed(xml)
            .filter((e) => e.date.getTime() >= since)
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .slice(0, MAX_PER_FEED)
            .map((e) => ({ source, title: e.title.slice(0, 200), url: e.url, date: e.date.toISOString().slice(0, 10) }));
        })
        .catch(() => [] as FeedItem[])
    )
  );
  return lists.flat();
}
