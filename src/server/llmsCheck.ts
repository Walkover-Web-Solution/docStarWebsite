import { HttpError } from "./http";

// The llms.txt checker behind /tools/llms-txt-checker. It fetches a site's /llms.txt on the server
// and checks it against the llms.txt proposal (https://llmstxt.org): an H1 title, a > summary, ##
// sections of [name](url) links, plus a few things that help agents (llms-full.txt, markdown links).
//
// It fetches URLs other people give us, so: https only, public hostnames only (no IPs, no localhost,
// no internal names; on Cloudflare `global_fetch_strictly_public` also blocks private addresses),
// redirects followed by hand and re-checked, a timeout and a size cap on every fetch.

export type Check = { id: string; label: string; status: "pass" | "warn" | "fail"; detail: string };
export type LlmsReport = { site: string; llmsUrl: string; found: boolean; checks: Check[]; stats: { bytes: number; sections: number; links: number } };

const TIMEOUT_MS = 8000;
const MAX_BYTES = 512 * 1024;
const MAX_REDIRECTS = 3;

/** Turns what a person typed ("docs.acme.com", "https://acme.com/docs") into a checked https origin and base path. */
export function normalizeSite(input: string): URL {
  const raw = input.trim();
  if (!raw || raw.length > 300) throw new HttpError(400, "Enter a website address, like docs.acme.com");
  let url: URL;
  try {
    url = new URL(/^[a-z]+:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    throw new HttpError(400, "That doesn't look like a website address");
  }
  assertPublic(url);
  url.hash = "";
  url.search = "";
  return url;
}

function assertPublic(url: URL) {
  if (url.protocol !== "https:") throw new HttpError(400, "Only https:// sites can be checked");
  if (url.username || url.password) throw new HttpError(400, "Addresses with credentials can't be checked");
  if (url.port && url.port !== "443") throw new HttpError(400, "Only the standard https port can be checked");
  const host = url.hostname.toLowerCase();
  const isIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.includes(":") || host.startsWith("[");
  if (isIp || !host.includes(".") || /(^|\.)(localhost|local|internal|intranet|lan|home|corp)$/.test(host)) {
    throw new HttpError(400, "Only public websites can be checked");
  }
}

/** GET with a timeout, a size cap and hand-checked redirects. */
async function fetchText(start: URL): Promise<{ status: number; url: URL; type: string; text: string; truncated: boolean }> {
  let url = start;
  for (let hop = 0; ; hop++) {
    const res = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "user-agent": "DocStar-llms-checker/1.0 (+https://docstar.io/tools/llms-txt-checker)", accept: "text/plain, text/markdown, */*" },
    });
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      if (hop >= MAX_REDIRECTS) throw new HttpError(502, "Too many redirects");
      url = new URL(res.headers.get("location")!, url);
      assertPublic(url);
      continue;
    }
    const reader = res.body?.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    let truncated = false;
    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) {
        truncated = true;
        await reader.cancel();
        break;
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(chunks.reduce((n, c) => n + c.byteLength, 0));
    let at = 0;
    for (const c of chunks) {
      bytes.set(c, at);
      at += c.byteLength;
    }
    return { status: res.status, url, type: res.headers.get("content-type") || "", text: new TextDecoder().decode(bytes), truncated };
  }
}

const status = async (url: string) => {
  try {
    const target = new URL(url);
    assertPublic(target);
    return (await fetchText(target)).status;
  } catch {
    return 0;
  }
};

export async function checkLlmsTxt(input: string): Promise<LlmsReport> {
  const site = normalizeSite(input);
  const base = site.pathname.replace(/\/+$/, "");
  const llmsUrl = new URL(`${base}/llms.txt`, site.origin);
  const checks: Check[] = [];
  const add = (id: string, label: string, s: Check["status"], detail: string) => checks.push({ id, label, status: s, detail });

  let res;
  try {
    res = await fetchText(llmsUrl);
  } catch (error) {
    if (error instanceof HttpError) throw error;
    const timedOut = (error as Error)?.name === "TimeoutError";
    add("reachable", "llms.txt can be fetched", "fail", timedOut ? "The site didn't answer within 8 seconds." : "The site couldn't be reached.");
    return { site: site.origin + base, llmsUrl: llmsUrl.toString(), found: false, checks, stats: { bytes: 0, sections: 0, links: 0 } };
  }

  const found = res.status === 200;
  add("reachable", "llms.txt can be fetched", found ? "pass" : "fail", found ? `${res.url} returned 200.` : `${res.url} returned ${res.status}. Publish the file at ${llmsUrl.pathname}.`);
  if (!found) return { site: site.origin + base, llmsUrl: llmsUrl.toString(), found, checks, stats: { bytes: 0, sections: 0, links: 0 } };

  const text = res.text.replace(/^﻿/, "");
  const looksLikeHtml = /^\s*<(!doctype|html)/i.test(text);
  const plain = /text\/(plain|markdown)/i.test(res.type);
  add("content-type", "Served as plain text or markdown", plain && !looksLikeHtml ? "pass" : looksLikeHtml ? "fail" : "warn", looksLikeHtml ? "The response is an HTML page, not a text file. Check that /llms.txt isn't caught by your site's 404 or SPA route." : `Content-Type is "${res.type || "missing"}". Use text/plain or text/markdown.`);
  if (looksLikeHtml) return { site: site.origin + base, llmsUrl: llmsUrl.toString(), found, checks, stats: { bytes: text.length, sections: 0, links: 0 } };

  const lines = text.split(/\r?\n/);
  const firstContent = lines.find((l) => l.trim());
  const h1 = firstContent?.match(/^#\s+(.+)/)?.[1];
  add("title", "Starts with an H1 title", h1 ? "pass" : "fail", h1 ? `"${h1.trim()}"` : "The first line should be '# Your project name'. It's the only required part of llms.txt.");

  const summary = lines.find((l) => /^>\s*\S/.test(l));
  add("summary", "Has a > summary", summary ? "pass" : "warn", summary ? summary.replace(/^>\s*/, "").slice(0, 160) : "Add a one-line '> ' summary under the title so a model knows what the site is about before reading further.");

  const sections = lines.filter((l) => /^##\s+\S/.test(l));
  const links = [...text.matchAll(/^\s*[-*]\s*\[([^\]]+)\]\(([^)\s]+)\)/gm)].map((m) => ({ name: m[1], href: m[2] }));
  add("sections", "Groups links under ## sections", sections.length ? "pass" : "warn", sections.length ? `${sections.length} section${sections.length === 1 ? "" : "s"}: ${sections.slice(0, 4).map((l) => l.replace(/^##\s+/, "")).join(", ")}${sections.length > 4 ? "…" : ""}` : "Organize links under '## ' headings such as '## Docs' or '## API'.");
  add("links", "Lists pages as [name](url) links", links.length ? "pass" : "warn", links.length ? `${links.length} link${links.length === 1 ? "" : "s"} found.` : "List your key pages as '- [Name](https://…): what it covers'.");

  const absolute = links.filter((l) => /^https?:\/\//.test(l.href));
  if (links.length) add("absolute", "Links use absolute URLs", absolute.length === links.length ? "pass" : "warn", absolute.length === links.length ? "Every link is absolute." : `${links.length - absolute.length} relative link${links.length - absolute.length === 1 ? "" : "s"}; agents that fetch llms.txt on its own can't resolve them.`);

  const md = links.filter((l) => /\.md($|[?#])/.test(l.href) || /\.txt($|[?#])/.test(l.href));
  if (links.length) add("markdown", "Links point to markdown versions", md.length ? "pass" : "warn", md.length ? `${md.length} of ${links.length} links go to .md or .txt files.` : "Link to clean markdown versions of pages (for example page.md) so agents skip the HTML.");

  const sample = absolute.slice(0, 5);
  if (sample.length) {
    const codes = await Promise.all(sample.map((l) => status(l.href)));
    const broken = sample.filter((_, i) => codes[i] !== 200);
    add("linked-pages", "Linked pages load", broken.length ? "warn" : "pass", broken.length ? `${broken.length} of the first ${sample.length} links didn't return 200: ${broken.map((b) => b.href).join(", ")}` : `The first ${sample.length} links return 200.`);
  }

  const full = await status(new URL(`${base}/llms-full.txt`, site.origin).toString());
  add("full", "Has llms-full.txt", full === 200 ? "pass" : "warn", full === 200 ? "llms-full.txt is available for agents that want everything in one file." : "Optional: publish llms-full.txt with the full text of your docs in one file.");

  if (res.truncated) add("size", "Small enough to read in one go", "warn", "The file is larger than 512 KB; only the start was checked. Keep llms.txt a short index and put full text in llms-full.txt.");
  else add("size", "Small enough to read in one go", text.length > 100_000 ? "warn" : "pass", `${Math.round(text.length / 1024)} KB.${text.length > 100_000 ? " Keep llms.txt a short index and put full text in llms-full.txt." : ""}`);

  return { site: site.origin + base, llmsUrl: res.url.toString(), found, checks, stats: { bytes: text.length, sections: sections.length, links: links.length } };
}

// A small per-instance limit, so the checker can't be used to hammer other sites through us.
const recent = new Map<string, number[]>();
export function rateLimit(key: string, perMinute = 10) {
  const now = Date.now();
  const hits = (recent.get(key) || []).filter((t) => now - t < 60_000);
  if (hits.length >= perMinute) throw new HttpError(429, "Too many checks. Try again in a minute.");
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5000) recent.clear();
}
