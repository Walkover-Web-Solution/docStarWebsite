# docstar.io SEO report

Branch `seo/overhaul`, 12 commits on `main` (`f960ff7`), 2026-10-30. See also [AUDIT.md](AUDIT.md) for the findings and [PLAN.md](PLAN.md) for the keyword map and decisions.

## Summary

**Fixed in code**
- The home page told every human visitor, and Google's inspection tools, `noindex`. A/B variants no longer carry it, and crawlers are never bucketed.
- Metadata now always renders in `<head>`.
- Every page has a share image, complete OpenGraph and Twitter tags, Organization, WebSite and BreadcrumbList data, and SoftwareApplication with real offers.
- Titles and descriptions are rewritten from a keyword map with one primary keyword per page. `/pricing` drops the old positioning.
- `robots.txt`, the sitemap (real dates), markdown-twin canonicals and `Vary: Accept`, canonical redirects and security headers are fixed.
- The nightly autopilot can no longer change titles or descriptions.
- Tailwind (43 KB) left the marketing pages. Lighthouse mobile performance on `/` went from 84 to 96, on `/pricing` from 79 to 98, and SEO from 91 to 100 on every page.

**Built but hidden:** 17 new pages (About, Customers, MSG91, 5 comparisons plus a hub, 5 solutions, Changelog, 2 tools) with TODO-COPY placeholders, plus a working llms.txt checker.

**Added:** an SEO test suite and CI.

**Needs you:**
- deploy, then publish the new copy from Admin;
- two Cloudflare fixes (www returns 522, HSTS is zeroed);
- Search Console;
- the decisions in PLAN.

## Going live, in order

1. **Review and merge** `seo/overhaul`. Confirm PLAN decision 1 first: the Free and Pro feature bullets on `/pricing` go live on deploy.
2. **Deploy:** `npm run cf:deploy`.
3. **Publish the new copy.** For each page in Admin → Website (`/`, `/mcp`, `/cli`, `/api-docs`, `/for/integrators`, `/agents`, `/analytics`, `/white-label`, `/support`, the three legal pages):
   - open the page and click **Load code version**;
   - check the sections marked *edited* or *new*, then **Publish**.
   - The live copy lives in the database, so until this step those pages keep their old titles. Each publish can be restored from the page history.
   - **Stop or conclude the running home-page A/B test first.** A page with a running test can't be edited cleanly, and both test arms predate the new copy.
4. **Cloudflare (dashboard, zone docstar.io)**
   - Rules → Redirect Rules: `www.docstar.io/*` → `https://docstar.io/${1}`, 301. A proxied DNS record for `www` must exist; it returns 522 today.
   - SSL/TLS → Edge Certificates → HSTS: set Max-Age to 6 months or more. It is 0 today, which overrides the app's header. Turn on `includeSubDomains` and `preload` only once every `*.docstar.io` host is HTTPS-only.
   - Check that `test.docstar.io/robots.txt` now returns `Disallow: /`. It's served by the Worker now, so the middleware override applies; this couldn't be verified locally.
5. **Search Console and Bing:** see "Manual tasks" below.

## Checklist status

**A. Crawling and indexing**

| Item | Status | Where |
|---|---|---|
| robots: allow public pages, disallow internal paths, AI crawlers allowed, absolute sitemap | **Done** | `src/app/robots.ts` (replaces `public/robots.txt`) |
| sitemap: canonical HTML URLs only, real `lastmod`, no `.md` | **Done** | `src/app/sitemap.xml/route.ts`; dates from the publish date or `updated` |
| 200 for pages, 301 for old URLs, real 404 | **Done** (already true; now tested) | `scripts/seo-check.mjs` |
| no accidental `noindex`; previews noindexed | **Done** | variant `noindex` removed; `test.*` override now reachable |
| one host, one slash rule, lowercase | **Partial** | Slash rule (308 to no-slash) and uppercase→lowercase 301 are done (`middleware.ts`). **www → apex is a Cloudflare task.** |
| app.docstar.io login noindex | **OK as found** | `/login` sends `noindex`; not in the sitemap |
| content and metadata in server HTML | **Done** | `htmlLimitedBots`; all copy, FAQ answers and run logs are server-rendered |
| real `<a href>` links | **OK as found**; footer and related cards add more | `SiteChrome.tsx`, `related()` in `shared.ts` |

**B. Canonicals and duplicates**

| Item | Status | Where |
|---|---|---|
| absolute self-canonical without parameters | **Done** | `src/lib/seo.ts` |
| markdown alternate; `Link` canonical on the twin | **Done** | `seo.ts`, `src/app/md/[slug]/route.ts` |
| `Vary: Accept` | **Done** | HTML (middleware) and `.md` (route) |
| `/md/<slug>` duplicate | **Done** | 301 to the public `.md` URL; disallowed in robots |
| desktop and mobile nav exposed once | **OK as found** | CSS `display:none`. The mobile header already shows "Start free", so the audit's "missing" note was wrong. |

**C. Metadata**

| Item | Status | Where |
|---|---|---|
| titles 50–60, descriptions 140–160, unique, `{keyword} \| DocStar` | **Done** (enforced) | `src/content/**`, `scripts/check-content.mjs` |
| `metadataBase`, `lang="en"` | **OK as found** | |
| viewport (`viewport-fit=cover`), theme-color, icons, apple-touch-icon, manifest | **Done** | `layout.tsx`, `icon.png`, `apple-icon.png`, `manifest.ts`, `public/logo.png` |
| OpenGraph and Twitter with a per-page 1200×630 image | **Done** | `src/app/og/[image]/route.tsx` (prerendered) |
| robots `index, follow, max-image-preview:large, max-snippet:-1` | **Done** | `seo.ts` |

**D. Headings and content**

| Item | Status | Where |
|---|---|---|
| one H1 with the keyword; heading order | **Done**, one exception | The home H1 ("Your agent writes the docs…") is the brand line under an A/B test. The keyword is in the kicker, intro and title instead. See "Not done". |
| answer-first intros | **Done** | hero subs on every page |
| thin pages expanded | **Done** | support, agents, analytics, white-label and pricing gained sections built from published facts |
| consistent terminology ("DocStar", "MCP server", "llms.txt", "docstar-cli") | **Done** | the "docstar_" wordmark stays as the logo; its accessible name is "DocStar home" |
| separate "Start free" from "Sign in" | **Done** | `APP_SIGNUP = login?intent=signup` (`/signup` is 404 in the app) |

**E. Structured data**

| Item | Status | Where |
|---|---|---|
| Organization (logo, `sameAs`, `contactPoint`) | **Done**. `sameAs` lists only npm until social URLs are provided. | `seo.ts`, `SITE.social` |
| WebSite (home), SoftwareApplication (product pages and pricing, real offers, no ratings) | **Done** | `seo.ts` |
| BreadcrumbList and visible breadcrumbs | **Done** | `seo.ts`, `ui/Breadcrumbs.tsx` |
| TechArticle, BlogPosting, VideoObject | **Not applicable here** | Help and blog are served by the DocStar product; blog posts already have BlogPosting with a Person author. No videos exist. |
| FAQPage not relied on | **Done** | removed |
| JSON-LD test on every template | **Done** | `seo-check.mjs` |

**F–G. Structure and new pages**

| Item | Status | Where |
|---|---|---|
| hierarchy, footer columns, Company and social links | **Done** | `src/content/site.ts`; links to hidden pages appear when they launch |
| contextual internal links, no orphans | **Done** (tested) | related cards on every product page |
| new pages | **Built, hidden** | `company.ts`, `compare.ts`, `solutions.ts`, `changelog.ts`, `tools.ts` |
| blog hub and author system | **On the DocStar product** (your decision) | see "Product-side fixes" |
| free tools | **Done**: llms.txt checker works (`/api/tools/llms-check`); MCP readiness is a "talk to us" page | |

**H–J. Performance, mobile, media**

| Item | Status | Where |
|---|---|---|
| Server Components, minimal client JS | **OK as found** | client JS: `CtaButton`, `SiteAnalytics`, `LlmsChecker` |
| fonts via `next/font` with `display: swap` | **OK as found** | |
| remove unused CSS and JS | **Done** | Tailwind and legacy SCSS only in `/admin`; 418 KB of unused images removed |
| third-party scripts | **OK as found** | GTM `afterInteractive` |
| static generation and immutable caching | **Partial** | `/_next/static/*` immutable via `public/_headers`. HTML stays dynamic (database-backed, 60 s cache); see follow-ups. |
| animations transform/opacity, reduced motion | **Done** | button transitions now respect reduced motion |
| Lighthouse CI budgets | **Done** | `lighthouserc.json` |
| mobile: no page-level horizontal scroll, tables scroll in their own box, ≥ 16px body, tap targets | **Done** | table container scrolls; footer links have padding (≥ 24px targets, WCAG 2.2 AA). Body text stays 15.5–16px as designed. |
| `next/image`, alt text | **N/A**: no images on pages | `seo-check` enforces `alt` |
| demo videos with a facade and VideoObject | **Not done**: no videos exist yet | |

**K–N. Keywords, accessibility, security, AI search**

| Item | Status | Where |
|---|---|---|
| K. keyword map | **Done** | PLAN K. Volumes "to verify" (no SEO API key). |
| L. landmarks, skip link, focus, labels, live regions | **Done** | skip link, footer `<nav>` and headings, checker with label and `role=status` |
| L. axe on every template | **Done** via Lighthouse accessibility (axe-core) in CI | |
| M. headers | **Done** in app; HSTS zone fix manual | `next.config.ts`, `public/_headers` |
| M. contact info, about, legal in footer | **Partial**: About is hidden until TODO-COPY is filled | |
| N. llms.txt and twins for every page; quotable intros; consistent facts | **Done** | Removed the claim that every docs site has `llms-full.txt` (they return 404). |

**T. SEO test suite**

| Item | Status | Where |
|---|---|---|
| status, H1, titles, canonical, noindex, OG, JSON-LD, alt, links, sitemap, robots, twins and llms.txt | **Done** | `npm run seo:check`, `npm run check:content`, `.github/workflows/seo.yml` |

## Lighthouse before and after (lab, local production build)

Lighthouse 13.5.0, the same machine and settings for both runs.

| Page | Mobile perf | Mobile SEO | Desktop perf | A11y | BP | Mobile LCP | CLS |
|---|---|---|---|---|---|---|---|
| `/` | 84 → **96** | 91 → **100** | 100 → 100 | 96 → 96 | 100 → 100 | 4.64s → **2.79s** | 0 → 0 |
| `/mcp` | 97 → 96 | 91 → **100** | 100 → 100 | 100 → 100 | 100 → 100 | 2.61s → 2.76s | 0 → 0 |
| `/cli` | 97 → 96 | 91 → **100** | 100 → 100 | 100 → 100 | 100 → 100 | 2.61s → 2.76s | 0 → 0 |
| `/api-docs` | 97 → 96 | 91 → **100** | 100 → 100 | 100 → 100 | 100 → 100 | 2.63s → 2.76s | 0 → 0 |
| `/pricing` | 79 → **98** | 91 → **100** | 100 → 100 | 100 → 100 | 96 → **100** | 4.74s → **2.47s** | 0 → 0 |
| `/agents` | 99 → 96 | 91 → **100** | 100 → 100 | 100 → 100 | 100 → 100 | 1.96s → 2.76s | 0 → 0 |
| `/for/integrators` | 98 → 97 | 91 → **100** | 100 → 100 | 100 → 100 | 100 → 100 | 2.46s → 2.61s | 0 → 0 |
| `/support` | n/a → 96 | n/a → 100 | n/a → 100 | 100 | 100 | 2.76s | 0 |

- **Every page meets the targets:** Performance ≥ 90, SEO 100, Accessibility ≥ 95, Best Practices ≥ 95, CLS < 0.1.
- **Mobile LCP is 2.6–2.8 s in simulated throttling** on most pages (target < 2.5 s; Lighthouse CI warns on it). It rose by about 0.15 s on pages that were already fast:
  - the LCP element is the H1, held back by render-blocking CSS and the display-font swap;
  - the pages gained content and the share-image and JSON-LD bytes.
  - Live docstar.io measured 2.5–2.7 s before. Field data will tell the real story (see below).
- **Home accessibility stays 96:** axe samples the hero's run-log labels while they fade in. At rest they pass contrast.
- **Live before:** home SEO was 66 (the `noindex`), `/mcp` 100. Re-run `npx lighthouse@13.5.0 https://docstar.io/` after deploy and step 3.

**Core Web Vitals (field)**
- None are available yet: no CrUX API key, and Search Console isn't connected here.
- After deploy, read Search Console → Core Web Vitals (by URL group), or the PageSpeed Insights "Discover what your real users are experiencing" panel for `/`.
- Targets at p75 mobile: LCP < 2.5 s, INP < 200 ms, CLS < 0.1.
- TTFB depends on the database read when the 60 s cache is cold; watch it in the Cloudflare Worker analytics.

## Files changed (89 files, +3,345 / −560)

| Area | Files |
|---|---|
| SEO helper, metadata, JSON-LD | `src/lib/seo.ts`, `src/app/(site)/page.tsx`, `[...slug]/page.tsx`, `xv/…/page.tsx`, `src/app/layout.tsx` |
| Share images, icons | `src/app/og/[image]/route.tsx`, `src/app/icon.png`, `apple-icon.png`, `manifest.ts`, `public/logo.png` |
| Crawling | `src/app/robots.ts`, `src/app/sitemap.xml/route.ts`, `src/app/md/[slug]/route.ts`, `src/middleware.ts`, `src/lib/requester.ts`, `next.config.ts`, `public/_headers` |
| Content | `src/content/home.ts`, `src/content/pages/*.ts` (all pages and 5 new files), `site.ts`, `pages.ts`, `types.ts`, `markdown.ts`, `source.ts` |
| Components | `SiteChrome.tsx`, `sections/Sections.tsx`, `SectionRenderer.tsx`, `ui/Breadcrumbs.tsx`, `tools/LlmsChecker.tsx`, `reset.css`, CSS modules |
| Server | `src/server/siteSchema.ts`, `content.ts`, `llmsCheck.ts`, `autopilot/policy.ts`, `autopilot/run.ts`, `src/app/api/tools/llms-check`, `src/app/api/e` |
| Admin | `PageEditor.tsx` (Load code version), `admin/layout.tsx` (legacy styles) |
| Tests and CI | `scripts/seo-check.mjs`, `scripts/seo/*.mjs`, `scripts/check-content.mjs`, `lighthouserc.json`, `.github/workflows/seo.yml` |
| Docs | `seo/*.md`, `docs/ARCHITECTURE.md`, `CONTRACTS.md`, `DEVELOPMENT.md`, `DECISIONS.md`, `OPEN_QUESTIONS.md`, `AGENTS.md`, `.env.example` |

## Not done, and why

- **Home H1 keyword.** The H1 is the brand line and the subject of a running A/B test. Test a variant such as "API docs your agent writes. ==Every agent== can use them." rather than changing it blind.
- **Blog and author system, RSS, categories.** These live on the DocStar product (your decision); see "Product-side fixes".
- **VideoObject and video facades.** There are no demo videos yet. When there are, host them on YouTube and add a facade component plus VideoObject in `seo.ts`.
- **Enforced `script-src` CSP.** It needs the GTM container's tag list (PLAN decision 9).
- **HTML edge caching.** Pages are database-backed and dynamic; an OpenNext incremental cache (R2) or `s-maxage` for anonymous visitors would cut TTFB. Out of scope; it needs care with the A/B cookie.
- **SEO keyword volumes.** No Ahrefs or Semrush key; marked "to verify".

## Manual tasks

**Search engines**
1. Google Search Console:
   - add a Domain property for `docstar.io` (DNS TXT in Cloudflare);
   - submit `https://docstar.io/sitemap.xml`;
   - URL-inspect `/` after deploy to confirm it's "Indexable".
   - Optionally set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` for an HTML-tag check.
2. Bing Webmaster Tools: import from Search Console and submit the sitemap.
3. IndexNow:
   - generate a key, serve it at `/<key>.txt` (add the file to `public/`);
   - POST changed URLs to `https://api.indexnow.org/indexnow` on publish.
   - Bing and Yandex use it, Google does not.
4. Watch Search Console → Pages for "Excluded by noindex" on `/`. It should clear once the fixed build is live.

**Copy and facts needed** (PLAN "Decisions needed")
- Pricing plan features per plan.
- Social profiles (LinkedIn, X, GitHub, YouTube).
- About: team, location, legal entity.
- MSG91 case study: results, quote, permission. Keep the Walkover disclosure.
- Compare pages: verify every TODO-VERIFY cell on the vendor's site; decide on the overlapping blog posts.
- Solution pages: customer names and segment-specific numbers.
- Changelog: older months.
- To launch a page, move it from `DRAFT_PAGES` to `LIVE_PAGES` in `src/content/pages.ts`.

**Product-side fixes (DocStar blog and help, other apps)**
- `docstar.io/blog/` and `/blog` both return 200: redirect the trailing slash.
- Blog posts and `/help` don't answer `Accept: text/markdown`.
- DocStar docs sites don't serve `llms-full.txt` (404 on docs.msg91.com and docstar.io/help). Either ship it or keep the site copy as it is now (it no longer claims it).
- The checker flags docs.msg91.com's `llms.txt` for a missing `>` summary, and a module description reads "hiiii": fix it in MSG91's collection.
- Blog footer copy uses the old positioning ("API Docs & FAQs built for teams").
- Several old posts target the knowledge-base era. Refresh or consolidate them with 301s.
- Author pages and category archives with self-canonicals, if the blog renderer supports them. RSS already exists at `/blog/rss.xml`.

## Off-page plan (section O)

**Listings**
- G2, Capterra, Product Hunt (launch the MCP and CLI angle), AlternativeTo (list as an alternative to Mintlify, ReadMe and GitBook), SaaSHub, StackShare.
- MCP directories and registries: the official MCP Registry, Smithery, mcp.so, PulseMCP, Glama. List the DocStar MCP (`https://mcp.docstar.io/mcp`) and, with permission, MSG91's.
- npm: make `docstar-cli`'s README link to `https://docstar.io/cli` and the homepage field to docstar.io. Its homepage is currently a personal GitHub repo.
- GitHub: a DocStar org README and repo links to docstar.io.

**Brand entity**
- Use the same name, logo and description everywhere.
- LinkedIn company page, X, GitHub org, YouTube, Crunchbase; link them back from the footer (`SITE.social`) so they reach `Organization.sameAs`.
- State the Walkover relationship consistently.

**Backlinks**
1. MSG91 case study: publish it, and ask MSG91 to link "Docs by DocStar" from docs.msg91.com and its developer pages.
2. Roundups: pitch "best MCP tools", "best API documentation tools" and "llms.txt generators" list authors, with the llms.txt checker as the hook.
3. Guest posts on developer publications (dev.to, freeCodeCamp, The New Stack, Smashing for docs UX). Topics: "making your API usable by agents", "tool-call accuracy is a docs problem".
4. Digital PR with a data report: run the llms.txt checker over the top 500 API docs sites and publish "State of llms.txt 2026". Linkable, quotable, repeatable.
5. Ecosystem pages: Cursor, Claude (connector directory), VS Code MCP lists, Windsurf. Ask to be listed where integrations are showcased.
6. Unlinked mentions: search for "DocStar" plus MCP/API docs mentions monthly and ask for a link.
7. Any paid placement must use `rel="sponsored"`. No link schemes.

## Follow-ups worth doing next
- Launch `/tools/llms-txt-checker` first: it works today and is the most linkable asset. Then the MSG91 case study.
- Add `/compare/fern` (a blog post exists) once the compare decision is made.
- Edge-cache anonymous HTML to bring TTFB and LCP down.
- Monthly: changelog entry, compare-table check, Search Console query review against the keyword map.
