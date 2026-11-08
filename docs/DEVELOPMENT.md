---
covers: [package.json, .npmrc, .env.example, next.config.ts, .github/workflows/*.yml, lighthouserc.json, scripts/*.mjs]
verified_at: 00fd0e7
verified_on: 2026-11-08
---
# Development

## Commands (from `package.json`)
| Task | Command |
|---|---|
| Install | `npm install` (`.npmrc` sets `legacy-peer-deps=true`) |
| Dev server | `npm run dev` (Next with Turbopack, http://localhost:3000) |
| Production build | `npm run build` |
| Start built app | `npm run start` |
| Type check | `npm run typecheck` |
| Content test | `npm run check:content`: every page, live and draft, against the database schema and the SEO rules (title 50–60 chars ending in "\| DocStar", description 140–160, one H1, label, unique title, description and primary keyword) |
| SEO crawl | `npm run seo:check` against a running build (`SEO_BASE_URL`, default `http://localhost:3000`) |
| Lighthouse budgets | `npm run lhci` against a running build on port 3000 (`lighthouserc.json`) |
| Cloudflare build / deploy | `npm run cf:build` / `npm run cf:deploy` |
| Database migrations | `npm run migrate` (runs `db/migrations/*.sql` once each in name order, recorded in `schema_migrations`, under an advisory lock) |
| Admin user | `npm run admin:user -- <email>` prints a generated password |

Node 22 in CI. First-time setup with a database: create Postgres `docstar-website`, `cp .env.example .env.local`, fill `DATABASE_URL`, `JWT_SECRET` (32+ chars), `CRON_SECRET` and `VIASOCKET_*`, then `npm run migrate` and `npm run admin:user`. None of that is needed to work on content: the site renders from `src/content` without a database.

Dependency versions are pinned exactly; keep them pinned when adding packages (`npm install --save-exact`).

## Running without a database
- Run with `DATABASE_URL` empty and pages render from `src/content`.
- `next` loads `.env.local`, so set it explicitly: `DATABASE_URL= npm run start`.
- To review the hidden pages, build and start with `NEXT_PUBLIC_SHOW_DRAFT_PAGES=1`.

## Verifying a change
1. `npm run typecheck && npm run check:content`.
2. `DATABASE_URL= npm run build && DATABASE_URL= npm run start`, then in another terminal `npm run seo:check` and `npm run lhci`.
3. Open the page, its `/<path>.md` twin and `/llms.txt`; a new page must appear in `/sitemap.xml`.
4. For analytics changes, watch `POST /api/e` in the browser network tab (204 expected).
5. Changed copy of an existing page reaches production only after deploy and Admin > page > **Load code version** > **Publish** (except `/pricing`, which is code-only).

Last run in this environment (2026-11-08, `00fd0e7`, no database): `npm ci`, `npm run typecheck`, `npm run check:content` (31 pages, 14 live, 0 errors), `DATABASE_URL= npm run build` and `npm run seo:check` (14 pages, 0 errors) passed. `npm run lhci`, `npm run cf:build`, `npm run migrate` and the admin were not run. No unit or integration test suite exists; the admin, A/B tests and autopilot have no automated tests.

## CI
- `.github/workflows/seo.yml`, on every pull request and on pushes to `main` and `prod`:
  - typecheck, content test, build, SEO crawl and Lighthouse budgets;
  - the SEO crawl again with draft pages on.
  - It needs no secrets or database.
- `autopilot.yml` runs the daily autopilot (repository secrets `SITE_URL`, `CRON_SECRET`; GitHub pauses schedules after 60 days without activity).
- `migrate.yml` applies migrations on push to `main` that touches `db/migrations/**` or `scripts/migrate.mjs` (secret `DATABASE_URL`).

## PR and deployment flow
Production is Cloudflare Workers via OpenNext (`npm run cf:deploy`, run by hand). See [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) for the unconfirmed release flow.
