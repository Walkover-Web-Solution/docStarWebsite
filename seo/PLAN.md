# docstar.io SEO plan

Based on [AUDIT.md](AUDIT.md). Items are ticked as they ship on branch `seo/overhaul`. Results are in [REPORT.md](REPORT.md).

How changes reach production:
- Live page copy comes from the database (Admin), so code edits to existing pages go live only when someone clicks **Publish code version** in Admin for that page.
- `/pricing` is never synced to the database, so it changes on deploy.
- New pages are built but hidden (`DRAFT_PAGES`) until their copy is approved.

## 1. Critical fixes
- [ ] Remove `noindex` from A/B variant HTML. It is served at the real URL; today every human visitor and Google's inspection tools get `noindex` on `/`.
- [ ] Classify Google-InspectionTool, GoogleOther, Storebot-Google, AdsBot and other crawlers as bots (never bucketed into tests).
- [ ] Always render metadata in `<head>` (`htmlLimitedBots`).
- [ ] *(manual, Cloudflare)* `www.docstar.io` → 301 to `https://docstar.io`; it returns 522 today.
- [ ] *(manual, Cloudflare)* Zone HSTS max-age is 0; set it to 6 months or more.

## 2. Quick wins
- [ ] Per-page OG images (`/og/<slug>.png`) and complete OpenGraph and Twitter tags.
- [ ] Shared metadata helper (`src/lib/seo.ts`): absolute canonical, markdown alternate, robots `max-image-preview:large`.
- [ ] JSON-LD: Organization (every page), WebSite (home), BreadcrumbList, SoftwareApplication with real offers. Drop FAQPage.
- [ ] Rewrite all titles (50–60 characters) and descriptions (140–160) from the keyword map (section K).
- [ ] `/pricing`: agent-era positioning, "DocStar" spelling, final CTA, consistent "Talk to us".
- [ ] Sitemap: real `lastmod`; no `changefreq` or `priority`.
- [ ] `robots.ts`: served by the Worker (the test-host override works), disallow `/api/`, `/md/` and `/content.json`.
- [ ] Markdown twins: `Link: rel="canonical"` header, `Vary: Accept`; `/md/*` → 301 to the public `.md` URL.
- [ ] Fix markdown anchors (`#tools` → `/mcp#tools`, not `/#tools`).
- [ ] Security headers (HSTS, nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options, a minimal CSP).
- [ ] Icons: `apple-icon.png`, `icon.png`, `manifest.ts`, `logo.png`; `viewport` and `theme-color`.
- [ ] "Start free" goes to `login?intent=signup`, separate from "Sign in".
- [ ] Redirect uppercase paths to lowercase (`/MCP` → `/mcp`).

## 3. Structural
- [ ] Block the autopilot from editing `meta.title` and `meta.description`; protect the new SEO pages.
- [ ] "Publish code version" in Admin (dry-run diff first, then publish as a normal, rollback-able revision).
- [ ] Remove duplicate H2s; give each page an answer-first intro; expand thin pages from facts DocStar has already published.
- [ ] Footer: Product, Solutions, Resources, Company, social links; hidden pages are never linked.
- [ ] Visible breadcrumbs on pages two or more levels deep; skip link; footer `<nav>` with headings; reduced motion.
- [ ] Legacy SCSS and Tailwind (43 KB) load only in `/admin`; marketing pages get a scoped reset.
- [ ] New section types: `table` (comparisons), `changelog`, `tool` (llms.txt checker).
- [ ] SEO test suite (`npm run seo:check`), Lighthouse CI budgets, and a GitHub workflow for pull requests.

## 4. New pages (built, hidden until approved)

| Path | Status |
|---|---|
| `/about` | [ ] template, TODO-COPY |
| `/customers` | [ ] template |
| `/customers/msg91` | [ ] template, TODO-COPY (disclose that MSG91 and DocStar are both Walkover products) |
| `/compare` | [ ] hub |
| `/compare/mintlify`, `/compare/readme`, `/compare/gitbook`, `/compare/stainless`, `/compare/speakeasy` | [ ] tables seeded from DocStar's own published comparisons; competitor cells TODO-VERIFY |
| `/for/saas`, `/for/api-first-startups`, `/for/devrel`, `/for/messaging-apis`, `/for/fintech-apis` | [ ] templates, TODO-COPY |
| `/changelog` | [ ] seeded with October 2026 entries from the published "What's new" post |
| `/tools/llms-txt-checker` | [ ] working tool (`/api/tools/llms-check`) |
| `/tools/mcp-readiness` | [ ] page with waitlist CTA |

Each launches by moving it from `DRAFT_PAGES` to `PAGES`. That adds it to routing, the sitemap, llms.txt, llms-full.txt, the `.md` twins and the footer at once.

## 5. Ongoing (after launch)
- Monthly: add changelog entries; refresh the comparison tables (competitors change quickly).
- Write the blog briefs below (human or blog autopilot), each linking to its product page.
- Track Search Console queries per page against the keyword map, and re-map where Google ranks a different page.
- Field Core Web Vitals (CrUX) per template once traffic allows.

## K. Keyword map

Volumes are **to verify**: no Ahrefs or Semrush key is configured. Each primary keyword belongs to exactly one URL. "Blog" rows are on the DocStar product's blog (`docstar.io/blog`).

### Existing pages

| URL | Primary keyword | Secondary keywords | Intent | New title |
|---|---|---|---|---|
| `/` | API documentation for AI agents | agent-ready API docs, AI-written API docs, DocStar | commercial, navigational | API documentation for people and AI agents \| DocStar |
| `/mcp` | hosted MCP server for your API | MCP server for API, remote MCP server, MCP server OAuth, MCP server custom domain | commercial | Hosted MCP server for your API, with OAuth \| DocStar |
| `/cli` | generate a CLI from API docs | docstar-cli, API command line tool, local MCP server from CLI | commercial | Generate a CLI from your API docs with docstar-cli \| DocStar |
| `/api-docs` | API documentation platform | API reference with playground, interactive API docs, import OpenAPI or Postman, llms.txt generator, export OpenAPI | commercial | API documentation platform with playground and MCP \| DocStar |
| `/analytics` | API docs analytics for AI agents | AI agent traffic, MCP analytics, llms.txt analytics, docs search analytics | commercial | API docs analytics: see how AI agents use your API \| DocStar |
| `/white-label` | white-label API documentation | custom domain API docs, branded MCP server, branded CLI | commercial | White-label API docs, MCP server and CLI \| DocStar |
| `/pricing` | DocStar pricing | API documentation pricing, free API docs tool, MCP server pricing | transactional | Pricing for API docs, MCP servers and CLIs \| DocStar |
| `/agents` | DocStar for AI agents | DocStar MCP quickstart, agent instructions, llms.txt for agents | navigational (agents) | AI agent instructions: read, write and call APIs \| DocStar |
| `/for/integrators` | give your AI agent access to any API | MCP for third-party APIs, connect an API to Claude Code or Cursor, API docs for coding agents | informational, commercial | Give your AI agent any API with one MCP install \| DocStar |
| `/support` | DocStar support | contact DocStar, DocStar demo | navigational | Contact support: email us or book a product demo \| DocStar |
| `/privacy-policy` | DocStar privacy policy | n/a | navigational | Privacy policy: how we collect and protect data \| DocStar |
| `/terms` | DocStar terms of service | n/a | navigational | Terms of service: accounts, content and billing \| DocStar |
| `/data-retention-policy` | DocStar data retention policy | data deletion request | navigational | Data retention and deletion policy and timelines \| DocStar |
| `/drift` (hidden) | API docs drift detection | docs drift, GitHub docs sync, outdated API docs | commercial | (exists in code) |
| `/hub` (hidden) | API directory for AI agents | MCP API hub, find APIs for agents | commercial | (exists in code) |

### New pages

| URL | Primary keyword | Secondary keywords | Intent |
|---|---|---|---|
| `/compare` | DocStar alternatives and comparisons | API docs tool comparison | commercial |
| `/compare/mintlify` | DocStar vs Mintlify | Mintlify MCP server, Mintlify vs DocStar pricing | commercial |
| `/compare/readme` | DocStar vs ReadMe | ReadMe alternative for MCP | commercial |
| `/compare/gitbook` | DocStar vs GitBook | GitBook API docs alternative | commercial |
| `/compare/stainless` | DocStar vs Stainless | Stainless alternative, SDK vs CLI and MCP | commercial |
| `/compare/speakeasy` | DocStar vs Speakeasy | Speakeasy alternative, Speakeasy MCP | commercial |
| `/for/saas` | API documentation for SaaS companies | SaaS API docs, SaaS MCP server | commercial |
| `/for/api-first-startups` | API documentation for startups | startup API docs tool, launch API docs fast | commercial |
| `/for/devrel` | API docs tools for DevRel teams | developer relations documentation, developer experience docs | commercial |
| `/for/messaging-apis` | messaging API documentation | SMS API docs, WhatsApp API MCP server | commercial |
| `/for/fintech-apis` | fintech API documentation | payments API docs, banking API MCP server | commercial |
| `/customers` | DocStar customers | DocStar case studies | navigational |
| `/customers/msg91` | MSG91 API docs case study | MSG91 MCP server, MSG91 llms.txt | informational |
| `/about` | about DocStar | DocStar company, Walkover DocStar | navigational |
| `/changelog` | DocStar changelog | DocStar release notes, DocStar updates | navigational |
| `/tools/llms-txt-checker` | llms.txt checker | llms.txt validator, check llms.txt | transactional (tool) |
| `/tools/mcp-readiness` | MCP readiness check for your API | is my API ready for AI agents | transactional (tool) |

### Blog (DocStar product): existing posts and new briefs

| Blog post | Primary keyword | Status |
|---|---|---|
| `what-is-an-mcp-server` | what is an MCP server | exists; link to `/mcp` |
| `turn-your-api-into-an-mcp-server` | turn your API into an MCP server | exists; link to `/mcp` |
| `postman-collection-to-mcp-server` | Postman collection to MCP server | exists |
| `mcp-server-authentication` | MCP server authentication | exists |
| `is-your-documentation-readable-by-ai-llms-txt` | llms.txt explained (what is llms.txt) | exists; refresh as the llms.txt pillar; link to `/tools/llms-txt-checker` |
| `generate-cli-from-openapi` | generate CLI from OpenAPI | exists; distinct from `/cli` (docs-based CLI) |
| `best-api-documentation-tools` | best API documentation tools | exists; pillar for the compare cluster; links to `/compare/*` |
| `mintlify-alternatives` | Mintlify alternatives | exists |
| `docstar-vs-mintlify`, `docstar-vs-readme-1`, `docstar-vs-gitbook` | **cannibalizes** `/compare/*` | decide: 301 to `/compare/*` at launch, or don't launch those compare pages |
| `docstar-vs-fern` | DocStar vs Fern | exists; candidate for `/compare/fern` |
| NEW: How to make your API usable by AI agents | make API usable by AI agents | brief below |
| NEW: OpenAPI to MCP server | OpenAPI to MCP | brief below |
| NEW: How to keep API docs in sync with code | keep API docs in sync with code | brief below; links to `/drift` |
| NEW: Best tools to generate an MCP server from an API | MCP server generator tools | brief below |

**Cannibalization flags**
1. The `/compare/{mintlify,readme,gitbook}` pages and the blog posts `docstar-vs-*` target the same queries. One URL per competitor must own "DocStar vs X".
2. `/drift` and the new blog brief: the page owns "drift detection" (product), the post owns "keep API docs in sync with code" (how-to).
3. `/changelog` and the monthly "What's new" posts: the changelog owns "DocStar changelog" and links to each monthly post for details.
4. `/api-docs` and the home page: home owns "API documentation for AI agents"; `/api-docs` owns "API documentation platform" (the reference product).

### Blog briefs

1. **How to make your API usable by AI agents** (pillar). Intent: informational.
   - Outline: what agents need (machine-readable contract, llms.txt and markdown, an MCP server, auth that works per user, examples), a checklist, common failure modes (tool-call accuracy, missing errors), measuring agent usage.
   - Links: `/mcp`, `/api-docs`, `/analytics`, `/tools/mcp-readiness`. 1,800–2,200 words.
2. **OpenAPI to MCP: turn a spec into a hosted MCP server**. Intent: how-to.
   - Outline: what maps from OpenAPI to tools, auth (OAuth vs keys), naming tools, testing in Claude and Cursor, keeping the server in sync.
   - Links: `/mcp`, `turn-your-api-into-an-mcp-server`. 1,200–1,500 words.
3. **How to keep API docs in sync with code**. Intent: how-to.
   - Outline: why docs drift, detecting drift (diff routes vs docs, CI checks, GitHub app), review flow, agent-reported gaps.
   - Links: `/drift` (when launched), `/api-docs`. 1,200–1,500 words.
4. **Best tools to generate an MCP server from an API** (2026). Intent: commercial investigation.
   - Outline: an honest roundup with criteria (hosting, auth, sync, pricing), with DocStar included and disclosed.
   - Links: `/mcp`, `/compare`. 1,500–2,000 words.

## Decisions needed

| # | Decision | Default until decided |
|---|---|---|
| 1 | Free and Pro feature lists on `/pricing`. The current list is the old editor product. Which of MCP server, CLI, custom MCP domain, analytics and white-label are on which plan? | Feature bullets drafted only from statements DocStar has already published (blog comparisons, product pages). Confirm before deploy. |
| 2 | Social profile URLs (LinkedIn, X, GitHub, YouTube) for the footer and `sameAs`. | Only the npm `docstar-cli` package is listed. |
| 3 | `/about`: team, story, location, legal entity. The blog footer says "A product by Walkover". | Hidden page with TODO-COPY. |
| 4 | MSG91 case study: facts, metrics, quote, permission. MSG91 is also a Walkover product, so the page must say so. | Hidden page with TODO-COPY and the disclosure. |
| 5 | Compare pages vs existing blog comparisons (cannibalization flag 1). | Pages hidden; recommend launching them and 301-ing the blog `docstar-vs-*` posts. |
| 6 | Launch `/drift` and `/hub`? | Stay hidden. |
| 7 | Competitor facts on `/compare/*` (pricing, MCP features). | Marked TODO-VERIFY; must be checked against each vendor's site within a week of launch. |
| 8 | A real sign-up URL. `app.docstar.io/signup` is 404. | `login?intent=signup`. |
| 9 | CSP `script-src`: which tags does the GTM container load? | Minimal CSP (`frame-ancestors`, `object-src`, `base-uri`). |
| 10 | HSTS `includeSubDomains` and `preload`: are all `*.docstar.io` hosts HTTPS-only? | `max-age=31536000` only. |
