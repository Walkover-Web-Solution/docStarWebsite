# DocStar website

Marketing site for DocStar (docstar.io), an agent-first API documentation product. Next.js 15 App Router on Cloudflare Workers (OpenNext). Pages are typed content sections rendered as HTML and as markdown twins for agents. Live content is the published revision in the site's own Postgres database (edited in `/admin`), with the bundled copy in `src/content` as the fallback.

## Commands
| Task | Command |
|---|---|
| Install | `npm install` |
| Dev | `npm run dev` |
| Build | `npm run build` |
| Start | `npm run start` |
| Type check | `npm run typecheck` |
| Content test | `npm run check:content` |
| SEO crawl (running build) | `npm run seo:check` |
| Lighthouse budgets (running build, port 3000) | `npm run lhci` |

No lint script exists. CI: `.github/workflows/seo.yml`.

## Reading order
1. [docs/VISION.md](docs/VISION.md) 2. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) 3. [docs/FLOWS.md](docs/FLOWS.md) 4. [docs/DESIGN.md](docs/DESIGN.md) 5. [docs/CONTRACTS.md](docs/CONTRACTS.md) 6. [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) 7. [docs/DECISIONS.md](docs/DECISIONS.md) 8. [docs/OPEN_QUESTIONS.md](docs/OPEN_QUESTIONS.md)

## Rules
1. Edit copy in `src/content`, not JSX. Pages are data (`src/content/types.ts`).
2. A new page goes in `LIVE_PAGES` in `src/content/pages.ts` (or `DRAFT_PAGES` while its copy has placeholders); routing, sitemap, `llms.txt`, markdown twins, OG images, middleware and footer all derive from it. Give it a `label` and an `updated` date.
3. A new section type needs five edits: `src/content/types.ts`, the zod schema in `src/server/siteSchema.ts`, a component in `src/components/site/sections/Sections.tsx`, a case in `src/components/site/SectionRenderer.tsx`, and a branch in `src/content/markdown.ts`.
4. Every page must stay readable as markdown; agents are first-class readers.
5. The agent prompt lives only in `SITE.prompt` (`src/content/site.ts`).
6. Keep `data-section`, `data-cta` and `data-placement` attributes; analytics reads them.
7. Browser event names live in both `src/lib/analytics.ts` and `src/app/api/e/route.ts`; change both, and hitman-api.
8. Code runs on Cloudflare Workers (`nodejs_compat`); check `npm run cf:build` when adding server code or dependencies.
9. Never remove a route or path without adding a redirect in `next.config.ts`.
10. Keep the bundled content fallback working; the site must render with `DATABASE_URL` unset.
11. Never commit or print secrets; only `.env.example` is tracked.
12. Tailwind and `src/scss` are legacy; build new UI with CSS modules under `.ds-site`.
13. Do not invent backend endpoints; describe them in `docs/CONTRACTS.md`.
14. Page metadata and JSON-LD come only from `src/lib/seo.ts`. Titles are 50–60 characters ending in " | DocStar", descriptions 140–160, one H1 per page, one primary keyword per page (`seo/PLAN.md` section K). `npm run check:content` enforces this.
15. Never state a product fact, customer, number or competitor claim that DocStar hasn't published; mark it TODO-COPY or TODO-VERIFY and keep the page in `DRAFT_PAGES`.

## Where things are
- `src/app/(site)/`: pages. `src/app/admin/`, `src/app/api/admin/`: the admin. `src/app/api/`: `e`, `ideas`, `preview`, `tools/llms-check`, `internal`, `cron`. `src/app/md`, `src/app/llms.txt`, `src/app/llms-full.txt`, `src/app/sitemap.xml`, `src/app/robots.ts`, `src/app/og`: agent and crawler outputs.
- `src/content/`: content model, pages, site chrome.
- `src/components/site/`: renderer, sections, UI atoms, CSS.
- `src/lib/`: SEO metadata and JSON-LD (`seo.ts`), analytics and requester classification. `src/server/`: database content, revisions, experiments, autopilot. `src/middleware.ts`: markdown twins, canonical redirects, A/B rewrites and agent analytics.
- `seo/`: the SEO audit, plan (keyword map) and report. `scripts/`: content test, SEO crawl, migrations.
- `public/mcp/quickstart.md`: the quickstart agents fetch.

## PR and deployment flow
Production is Cloudflare Workers via OpenNext (`npm run cf:deploy`, by hand). CI (`.github/workflows/seo.yml`) runs on every PR. Whether PRs target `main` or `prod` is unconfirmed (see docs/OPEN_QUESTIONS.md).

## Verification
Run `npm run typecheck`, `npm run check:content`, `npm run build`, then `npm run seo:check` against `DATABASE_URL= npm run start`; check the page and its `.md` twin, and update the matching `docs/*.md` in the same commit. Copy changes to existing pages go live through Admin > page > Load code version > Publish.
