# docstar.io SEO audit

Audited 2026-10-30 on branch `seo/overhaul` (from `main` at `f960ff7`).

**Method**
- Ran a local production build (`npm run build && DATABASE_URL= npm run start`, bundled content) and crawled it with `scripts/seo-check.mjs`. The raw crawl is in `seo/crawl-before.json`.
- Ran Lighthouse 13.5.0 (mobile and desktop) locally and against live docstar.io. Reports are in `seo/lighthouse/before*/`.
- Checked live HTTP behaviour with `curl` on docstar.io, www.docstar.io, test.docstar.io and app.docstar.io.

Severity: **critical** (removes pages from search or misleads crawlers now), **high** (clear ranking or indexing loss), **medium** (missed opportunity or quality signal), **low** (polish).

## 1. Stack and rendering

| Area | Finding |
|---|---|
| Framework | Next.js 15.5.3, App Router, React 19. |
| Hosting | Cloudflare Workers via OpenNext (`wrangler.jsonc`, `npm run cf:deploy`), with a custom domain `docstar.io`. Not Cloudflare Pages as `AGENTS.md` says. |
| Content | Pages are typed sections (`src/content`). The live copy is the published revision in the site's Postgres database (Hyperdrive). The bundled copy is used when there is no database. Once a page is in the database, the database wins. |
| Rendering | Every page is `force-dynamic` and reads the database through a 60 s in-memory cache. HTML is sent with `Cache-Control: private, no-cache, no-store`. |
| Metadata | `generateMetadata` per page. No title template, no shared helper, and the home page and other pages duplicate the logic. |
| Images | None on marketing pages. No `next/image` in use. The only image output is the root `opengraph-image.tsx`. |
| Fonts | `next/font/google`, self-hosted: Space Grotesk, Inter, JetBrains Mono, with `display: swap`. |
| CSS | CSS modules under `.ds-site`, plus the legacy SCSS and Tailwind imported globally in the root layout. That is 43 KB of Tailwind CSS on every page, used only by `/admin`. |
| JS | Three client components (`CtaButton`, `SiteAnalytics`, analytics lib). First Load JS is 102 kB shared. GTM loads `afterInteractive`. |
| Middleware | Markdown twins (`.md` and `Accept: text/markdown`), server-side agent analytics, A/B variant rewrites to `/xv/<rev>`, test-host noindex. |
| A/B tests and autopilot | Experiments and the nightly AI autopilot can change live titles, descriptions and copy (`src/server/autopilot`). |
| Tests and CI | No tests, lint or build CI. Only the `autopilot.yml` cron and `migrate.yml` workflows exist. |

## 2. URL inventory

| URL | Template | Purpose | Indexable |
|---|---|---|---|
| `/` | `(site)/page.tsx` | Home: product overview, copy-prompt CTA | yes |
| `/mcp` | `[...slug]` | Hosted MCP server product page | yes |
| `/cli` | `[...slug]` | docstar-cli product page | yes |
| `/api-docs` | `[...slug]` | API docs product page | yes |
| `/analytics` | `[...slug]` | Agent analytics product page | yes |
| `/white-label` | `[...slug]` | White-label product page | yes |
| `/pricing` | `[...slug]` | Plans | yes |
| `/agents` | `[...slug]` | Instructions for AI agents | yes |
| `/for/integrators` | `[...slug]` | Developers giving APIs to their agent | yes |
| `/support` | `[...slug]` | Contact | yes |
| `/privacy-policy`, `/terms`, `/data-retention-policy` | `[...slug]` | Legal | yes |
| `/<page>.md`, `/index.md`, any page with `Accept: text/markdown` | `md/[slug]` via middleware | Markdown twins for agents | alternate (should point to the HTML) |
| `/md/<slug>` | `md/[slug]` | Internal rewrite target, reachable directly | **duplicate** |
| `/llms.txt`, `/llms-full.txt` | route handlers | Agent index and full text | yes (text) |
| `/mcp/quickstart.md` | `public/` | Agent quickstart | yes (text) |
| `/sitemap.xml` | route handler | Site pages, plus help and blog URLs fetched from api.docstar.io | n/a |
| `/robots.txt` | `public/robots.txt` | Static file; served before the Worker | n/a |
| `/content.json` | route handler | Bundled content for the admin | should be disallowed |
| `/xv/<rev>/<path>` | `xv/...` | A/B variant (rewrite target) | no (header, robots and canonical) |
| `/admin/*`, `/api/*` | admin and API | Private | no |
| `/hub`, `/drift` | content only, not in `PAGES` | Hidden pages | 404 |
| `/help/*`, `/blog/*` | **another app** (DocStar product) | Help docs (65 URLs), blog (28 URLs) | yes, listed in this sitemap |
| 30 old feature URLs | `next.config.ts` redirects | Permanent redirects to new pages | redirect |

All 13 pages are linked from the header or footer. The crawl found no broken internal links and no orphan pages.

## 3. Findings

### Critical

| URL | Issue | Fix |
|---|---|---|
| `/` (live) | An A/B test runs on the home page, and **both arms** are rewritten to `/xv/<rev>`. The variant template sets `<meta name="robots" content="noindex, nofollow">`. Every human visitor gets `noindex` on the home page: 8 of 8 browser requests did. Google-InspectionTool (Search Console's live test) and GoogleOther are classified as humans and get it too. Googlebot and Bingbot don't, which is why the page is still indexed, but Lighthouse SEO on the live home page is **66** ("Page is blocked from indexing"). | Variant pages carry the live page's own tags with no `noindex`. Direct `/xv/` hits stay blocked by `X-Robots-Tag`, `robots.txt` and the canonical. Classify Google-InspectionTool, GoogleOther, Storebot, AdsBot and other crawlers as bots, so they always get the live page. |
| www.docstar.io | `http://www.docstar.io` redirects 301 to `https://www.docstar.io/`, which returns **522** (origin unreachable). Links to www are dead. | Cloudflare: add a redirect rule `www.docstar.io/*` → `https://docstar.io/$1` (301). Manual task; nothing in the repo routes www. |
| all pages (local `next start`) | Next 15 streams metadata. With a browser user agent, `<title>`, description, canonical and OG tags arrive **inside `<body>`**. Live (OpenNext) currently returns them in `<head>`, but that depends on the runtime. AI crawlers that don't run JS may ignore tags in `<body>`. | Set `htmlLimitedBots: /.*/` in `next.config.ts` so metadata always blocks into `<head>`. |

### High

| URL | Issue | Fix |
|---|---|---|
| all 13 pages | **No `og:image` or `twitter:image`.** Each page's `openGraph` object replaces the root `opengraph-image`, so share previews show no image, while `twitter:card` still says `summary_large_image`. | A per-page OG image (`/og/<slug>.png`, prerendered), set explicitly in shared metadata. |
| all pages | **No Organization, WebSite or BreadcrumbList JSON-LD.** The brand name "DocStar" is shared with unrelated products, and nothing disambiguates it (no logo, no `sameAs`, no contact). | `src/lib/seo.ts`: Organization on every page, WebSite on home, BreadcrumbList below home, SoftwareApplication with real offers. |
| `/sitemap.xml` | `lastmod` is the request time on every URL, with `changefreq daily` everywhere. Google ignores a `lastmod` that is always "now", so real changes get no signal. | Use the published revision date from the database, or the bundled `updated` date. Drop `changefreq` and `priority`. Help and blog URLs have no date in their feeds, so leave `lastmod` off for them. |
| `/pricing` | Title "Pricing - DocStar" (17 chars, wrong format). The description and H1 sub sell "knowledge bases, blogs" (old positioning). "Docstar" is spelled with a lowercase s 4 times. The free-plan list is the old editor product (block editor, spaces, bulk actions). No final CTA. "Talk to us" goes to `/support` here and to cal.com elsewhere. | Rewrite in agent-era positioning. Plan features need confirmation (see PLAN decisions). |
| HSTS | Live sends `strict-transport-security: max-age=0; includeSubDomains; preload`, which tells browsers to *forget* HSTS. This comes from the Cloudflare zone setting. | Cloudflare: SSL/TLS → Edge Certificates → HSTS, set max-age to at least 6 months (manual). The app now sends `max-age=31536000`. |
| security headers | No CSP, `Referrer-Policy`, `Permissions-Policy` or `X-Frame-Options` in the app. Only `nosniff` (from Cloudflare). | `headers()` in `next.config.ts` and `public/_headers`. |
| `/mcp`, `/cli`, `/analytics` | Meta descriptions are 181, 178 and 164 characters, so they get truncated. | Rewrite to 140–160. |
| `/support`, `/privacy-policy`, `/data-retention-policy`, `/terms`, `/for/integrators`, `/white-label` | Descriptions of 94, 66, 71, 99, 128 and 128 characters. | Rewrite to 140–160. |
| 10 of 13 pages | Titles under 50 characters (`/agents` 33, `/support` 25, legal 24–44, `/mcp` 40, `/analytics` 40, `/for/integrators` 39). | Rewrite to 50–60, `{Primary keyword} \| DocStar`. |
| live A/B tests and the autopilot | The nightly autopilot can rewrite `meta.title` and `meta.description` and publish them immediately (`policy.ts:68-71`), optimizing for prompt copies, not search. | Block `meta` edits by the autopilot. |

### Medium

| URL | Issue | Fix |
|---|---|---|
| `.md` twins | No `Link: <html>; rel="canonical"` header, so the twins compete with the HTML as duplicates. `/mcp.md` sends `Vary: rsc, next-router-…` instead of `Vary: Accept`. Negotiated responses on the HTML URL do send `Vary: Accept`. | Send `Link` canonical and `Vary: Accept` from the markdown route. |
| `/md/<slug>` | The internal rewrite target can be reached directly: a third copy of each page. | 301 to the public `.md` URL; disallow `/md/` in robots. |
| `/robots.txt` | Static file, served from Cloudflare assets before the Worker, so the middleware's `test.*` override never runs. `test.docstar.io/robots.txt` returns nothing usable. `/api/` and `/content.json` aren't disallowed. | Move to `src/app/robots.ts`, disallow `/api/`, `/md/` and `/content.json`, and keep AI crawlers allowed. |
| FAQPage markup | 9 pages emit FAQPage. FAQ rich results are limited to government and health sites, and `/agents` marks its "Rules" (not questions) as a FAQ. | Drop FAQPage. Keep the FAQs as visible HTML. |
| duplicate H2s | "Take the first step. Let your agent write your API docs." on `/`, `/cli` and `/api-docs`. "Write it once…" and "Docs that keep up…" on `/` and `/api-docs`. "Give any API to your agent." is a home H2 and the `/for/integrators` H1. | Write a distinct heading per page. |
| thin pages | `/support` about 104 words, `/white-label` 222, `/pricing` 234, `/analytics` 247, `/agents` 297. | Expand using facts already published by DocStar. |
| markdown twins | `#anchor` links become `https://docstar.io/#anchor`, pointing at the **home page** (`/mcp.md` "What agents can do", `/for/integrators.md` "See how it works"). | `abs()` resolves anchors against the page URL. |
| CTAs | "Sign in", "Start free", "List your API" and "Get started with Pro" all go to `app.docstar.io/login`. `app.docstar.io/signup` is 404. | "Start free" and sign-up CTAs go to `login?intent=signup`. |
| site structure | No About, Customers, Changelog, Compare or Solutions pages. Footer has no social links and no company details. One `/for/` page. | New page templates (hidden until copy is approved), footer columns, social links. |
| icons | The Apple touch icon is the 197 KB `.ico`, and there is no web manifest. `public/DocStar-Logo/favicon.ico` duplicates `src/app/favicon.ico`. | `apple-icon.png` (180), `icon.png` (192), `manifest.ts`, `logo.png` for Organization. |
| no `viewport` export | No `theme-color`. | `viewport` export. |
| performance | Tailwind (43 KB) and legacy SCSS load on every marketing page and block render. Only `/admin` uses them. Local mobile LCP on home is 4.6 s (lab; the H1 is the LCP, delayed by render-blocking CSS). Live home mobile LCP is 2.5 s. | Load the legacy styles only under `/admin`, and add a scoped reset for `.ds-site`. |
| hero run log | The animated lines fade in from `opacity: 0`, so Lighthouse measured "agent" labels mid-fade at contrast 1.41:1. The steady-state contrast passes. | Start the animation from a visible state (translate only), so text is never low-contrast. |
| `/blog` (DocStar product) | 28 posts. Several are from the old knowledge-base positioning ("Lock the gates…", "FAQs into smart conversations"). Footer copy says "API Docs & FAQs built for teams". `/blog/` and `/blog` both return 200. No markdown twin (`Accept: text/markdown` returns HTML). | Product-side fixes; see REPORT. BlogPosting with Person author and RSS already exist. |
| blog vs new pages | The blog already has `docstar-vs-mintlify`, `docstar-vs-readme-1`, `docstar-vs-gitbook`, `docstar-vs-fern`, `mintlify-alternatives`, `best-api-documentation-tools`, `what-is-an-mcp-server`, `turn-your-api-into-an-mcp-server`, `generate-cli-from-openapi`, `is-your-documentation-readable-by-ai-llms-txt` and a monthly "What's new". New `/compare/*` pages would compete with these posts for the same queries. | Keyword map assigns one owner per query; see PLAN K. |

### Low

| URL | Issue | Fix |
|---|---|---|
| chrome | No skip link. Footer columns use `<p>` titles and aren't in a `<nav>`. | Skip link, footer `<nav>` with headings. |
| mobile menu | No "Start free" in the mobile panel. Desktop and mobile navs are both in the HTML, but CSS `display:none` exposes only one to assistive tech. | Add "Start free" to the panel. |
| reduced motion | Button hover and press transforms ignore `prefers-reduced-motion`. | Disable them under reduced motion. |
| `public/` | About 418 KB of unused images (`Step3.png`, `template-section-images/*`). | Delete. |
| `next.config.ts` | `images.remotePatterns` lists 8 old hosts that are no longer used. | Leave; harmless. Cleanup is optional. |
| docs | `AGENTS.md` and `docs/*` describe hitman-api, Cloudflare Pages and `/api/revalidate`, which no longer match the code. | Update the parts this work touches. |

## 4. Checklist status before changes

| Item | Status |
|---|---|
| A. robots.txt | Partial: allows AI crawlers and lists the sitemap. Static, so the test-host override fails; `/api/` and `/md/` aren't disallowed. |
| A. sitemap | Partial: the URL set is correct; `lastmod` is fake. |
| A. status codes | OK: pages 200; unknown pages 404 with `noindex`; old URLs 308. |
| A. noindex | **Fail**: live home sends `noindex` to all human visitors and Google's inspection tools. |
| A. one host | **Fail**: www returns 522. https and apex OK; trailing slash 308s to no slash; uppercase paths 404 (no redirect). |
| A. app.docstar.io | OK: `/login` sends `noindex` and isn't in the sitemap. |
| A. server HTML | OK: all copy, FAQ answers and run logs are in the HTML. The copy-prompt text itself is only in JS, and in the `.md` twins and llms.txt. |
| A. real links | OK: plain `<a href>` everywhere. `#how-it-works` anchors are secondary CTAs only. |
| B. canonical | OK: absolute and self-referencing. |
| B. markdown alternate | Partial: `<link rel="alternate" type="text/markdown">` is present; no `Link` canonical header on the twins. |
| B. Vary | Partial: OK on HTML and negotiated responses, missing on `.md` URLs. |
| C. titles and descriptions | **Fail** on 12 of 13 pages (length or positioning). |
| C. OG and Twitter | **Fail**: no image, no `site_name` or locale. |
| C. icons, viewport, manifest | Fail: see above. |
| D. one H1 | OK on all pages. |
| D. answer-first intros | Partial. |
| E. structured data | Fail: see above. |
| F. structure | Partial: no Company or Resources hubs on the site; the blog and help live on DocStar. |
| H. performance | Live: home mobile 96, `/mcp` mobile 96. Local lab: 79–99 mobile, 100 desktop. CLS 0 everywhere. |
| L. accessibility | 96–100. Contrast failure only mid-animation. |
| M. security | Fail: no app security headers; HSTS is zeroed at the zone. |
| T. tests | None. |

## 5. Lighthouse before (lab)

Local production build, no database:

| Page | Form | Perf | A11y | BP | SEO | LCP | CLS | TBT | TTFB |
|---|---|---|---|---|---|---|---|---|---|
| home | mobile | 84 | 96 | 100 | 91 | 4.64s | 0.000 | 4ms | 0.07s |
| home | desktop | 100 | 96 | 100 | 91 | 0.55s | 0.000 | 0ms | 0.03s |
| mcp | mobile | 97 | 100 | 100 | 91 | 2.61s | 0.000 | 1ms | 0.01s |
| mcp | desktop | 100 | 100 | 100 | 91 | 0.58s | 0.000 | 0ms | 0.03s |
| cli | mobile | 97 | 100 | 100 | 91 | 2.61s | 0.000 | 5ms | 0.04s |
| cli | desktop | 100 | 100 | 100 | 91 | 0.55s | 0.000 | 0ms | 0.02s |
| api-docs | mobile | 97 | 100 | 100 | 91 | 2.63s | 0.000 | 6ms | 0.01s |
| api-docs | desktop | 100 | 100 | 100 | 91 | 0.51s | 0.000 | 0ms | 0.06s |
| pricing | mobile | 79 | 100 | 96 | 91 | 4.74s | 0.000 | 225ms | 0.04s |
| pricing | desktop | 100 | 100 | 100 | 91 | 0.51s | 0.000 | 0ms | 0.04s |
| agents | mobile | 99 | 100 | 100 | 91 | 1.96s | 0.000 | 8ms | 0.02s |
| agents | desktop | 100 | 100 | 100 | 91 | 0.55s | 0.000 | 0ms | 0.02s |
| for/integrators | mobile | 98 | 100 | 100 | 91 | 2.46s | 0.000 | 0ms | 0.04s |
| for/integrators | desktop | 100 | 100 | 100 | 91 | 0.55s | 0.000 | 0ms | 0.01s |

- Local SEO is 91 because metadata is streamed into `<body>`, so Lighthouse sees no meta description.
- Pricing "best practices" is 96 because `/api/e` returns 503 without a database (a local-only artifact).

Live docstar.io:

| Page | Form | Perf | A11y | BP | SEO | LCP | CLS | TBT | TTFB |
|---|---|---|---|---|---|---|---|---|---|
| home | mobile | 96 | 96 | 96 | **66** | 2.54s | 0.000 | 10ms | 0.03s |
| home | desktop | 100 | 96 | 100 | **66** | 0.79s | 0.000 | 0ms | 0.07s |
| mcp | mobile | 96 | 100 | 100 | 100 | 2.70s | 0.000 | 0ms | 0.03s |
| mcp | desktop | 98 | 100 | 100 | 100 | 0.94s | 0.000 | 0ms | 0.03s |
| help (DocStar app) | mobile | 83 | 94 | 96 | 92 | 3.56s | 0.000 | 71ms | 0.07s |
| help (DocStar app) | desktop | 98 | 89 | 96 | 92 | 0.92s | 0.000 | 0ms | 0.03s |

Field Core Web Vitals (CrUX) aren't available without a Search Console or CrUX API key; see REPORT for how to collect them.
