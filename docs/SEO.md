---
covers: [src/content/pages.ts, next.config.ts, public/robots.txt, src/app/sitemap.xml/route.js, src/app/(site)/**, src/middleware.ts]
status: implemented facts; keyword/intent opportunities proposed only; no Search Console data connected
owner: unknown
source: code, delivered HTML checked by the SEO analysis (admin > Analyses) on 2026-10-24 against a local build
verified_at: fb315a0
verified_on: 2026-10-24
---
# SEO

Evidence rule: **implemented** = verified in code or delivered HTML. **proposed** = hypothesis. There is **no search evidence** (queries, impressions, indexing) in this repo or connected to the admin; `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is optional and unconfirmed. Do not promise rankings or AI-search inclusion.

## Rendering assumptions
Pages are server-rendered by Next (App Router, Workers) with content fetched per request (cached ~60 s per instance) or bundled; the HTML a crawler receives contains the content. Every page has a markdown twin (`/<path>.md`, `/index.md`, `Accept: text/markdown`, `Vary: Accept`). Experiment versions (`/xv/...`) render under the real path via rewrite, send `private, no-store`, and are `noindex` if reached directly. Agents and crawlers are never put in experiments, so crawlers see the live page.

## Page map (`PAGES` in `src/content/pages.ts`)
| Path | Audience / topic (as intended by the page) | Indexing intent | Notes |
|---|---|---|---|
| `/` | API docs for people and agents; prompt CTA | index | `SoftwareApplication` + `FAQPage` JSON-LD |
| `/mcp` | Hosted MCP server for an API | index | |
| `/cli` | CLI generated from API docs | index | |
| `/api-docs` | Docs from code | index | target of many retired URLs |
| `/for/integrators` | Give a third-party API to an agent | index | |
| `/agents` | Reading DocStar as an agent | index | |
| `/analytics` | Agent analytics | index | |
| `/white-label` | Branded docs | index | |
| `/pricing` | Plans | index | prices live only here |
| `/support` | Support | index | |
| `/privacy-policy`, `/data-retention-policy`, `/terms` | Legal | index | meta description of privacy page is 66 characters |
Not live (hidden): `/hub`, `/drift`. Non-page URLs: `/llms.txt`, `/llms-full.txt`, `/sitemap.xml` (site pages plus published help and blog URLs from api.docstar.io), `/mcp/quickstart.md`. Help docs (`/help`) and blog are served elsewhere.
Per page: title, description, canonical, OpenGraph/Twitter, markdown alternate, JSON-LD `WebPage` (+ `FAQPage` when a faq section exists), share image `src/app/opengraph-image.tsx`. Ownership of each page: unknown.

## Crawling and indexing
- `public/robots.txt`: allow all; disallow `/admin` and `/xv/`; named AI crawlers allowed; sitemap declared. `test.*` hosts serve `Disallow: /` and `X-Robots-Tag: noindex` (middleware).
- `/admin/*` and `/xv/*` send `X-Robots-Tag: noindex, nofollow`. This is not protection: admin access is enforced by sign-in on every API and the draft preview checks the session.
- `not-found` is noindex.

## Redirects (`next.config.ts`, permanent)
29 retired help-era paths map to the closest new page. **Known issue:** 10 of them map to `/` (for example `/features`, `/gallery-view`, `/embed-editor`, `/faq-generator`, `/simple-website`). Redirecting unrelated removed pages to the homepage can be treated as soft 404s. Not changed: needs a decision and, ideally, Search Console data on which old URLs still have traffic (OPEN_QUESTIONS Q9). Never remove a path without a redirect.

## Checks (admin > Analyses > "Search basics", "Links and delivered pages")
Mechanical, run against delivered HTML: title 15 to 70 characters, description 70 to 180, one `<h1>`, canonical present, no accidental `noindex`, structured data present, duplicate titles/descriptions, sitemap lists pages, `/admin` is noindex, every page and markdown twin returns 200. Latest local run (2026-10-24, build at fb315a0 plus this change): `/mcp` description 181 characters, `/privacy-policy` description 66 characters; everything else passed. These are not search performance evidence.

## Known issues
1. Description lengths above. 2. Retired URLs redirecting to `/`. 3. No Search Console, so indexing status and queries are unknown. 4. Image alt text and internationalization not audited (no localization exists).

## Proposed (not evidence)
Intent pages for "MCP server for my API", "llms.txt for API docs", "API docs from code" are plausible topics from the product's own pages; validate with Search Console or keyword data before building. Experiments on public pages follow [EXPERIMENTS.md](EXPERIMENTS.md); conversion tests are not search-ranking tests.
