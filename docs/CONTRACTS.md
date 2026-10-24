---
covers: [src/server/events.ts, src/app/api/**, src/server/adminTypes.ts, src/content/types.ts, src/server/knowledge.ts, src/server/analyses.ts, .env.example, wrangler.jsonc]
status: implemented; "missing" items are not built
owner: unknown
source: code
verified_at: fb315a0
verified_on: 2026-10-24
---
# Contracts

## Persistence (`db/migrations`)
- `admin` (generic typed rows; spec and statuses per type in `src/server/adminTypes.ts`): `user`, `page`, `page_revision`, `idea`, `experiment`, `ai_proposal`, `ai_run`, `setting`, `knowledge_edit`, `competitor`, `analysis_run`. `data` JSONB is validated per type on every write.
- `admin_events`: `ts, event, actor_type, agent_name, anon_id, path, ref, variants (test key → A|B|C), props`.
Consumers: this site only. Owner: this repo.

## Browser and server events
Allowed names (`SITE_EVENTS`): `page.viewed`, `section.viewed`, `cta.clicked`, `prompt.copied`, `signup.clicked` (browser); `agent.page_fetched`, `agent.markdown_fetched`, `agent.llms_fetched`, `agent.quickstart_fetched` (server). Browser names are listed in `src/lib/analytics.ts`, `src/app/api/e/route.ts` and `SITE_EVENTS`: change all three. Props used: `cta_id`, `placement`, `section_key`, `synthetic` (exclude from experiment evidence). `ref` is a random 12-character id.
Earlier docs listed events (`snippet.copied`, `faq.opened`, `scroll.depth`, `experiment.exposed`, ...) that no longer exist; exposure is a `page.viewed` carrying `variants`.

## Public routes
| Route | Purpose | Auth |
|---|---|---|
| `POST /api/e` | Browser beacon; non-humans ignored; max 30 events | none (same-origin by use) |
| `GET /api/preview?path=` | Enable draft mode for an operator | admin cookie |
| `GET /content.json` | Bundled pages (admin "add to editor"); CORS `*` | none |
| `GET /llms.txt`, `/llms-full.txt`, `/md/<slug>`, `/sitemap.xml` | Agent and search outputs | none |
| `POST /api/ideas`, `GET /api/ideas/public/<secret>` | Feedback from agents/people; follow-up by secret link | rate limited |

## Admin API (all require the `ds_admin` cookie; writes require same-origin)
`/api/admin/`: `login`, `logout`, `me`, `overview`, `settings`, `pages[/slug[/revisions]]`, `revisions/<id>[/publish|/rollback]`, `experiments` (GET list, POST create), `experiments/<id>` (GET, PATCH draft fields), `experiments/<id>/start|stop|conclude|brief`, `knowledge` (GET list, `?path=` one), `knowledge/edits` (POST), `knowledge/edits/<id>` (POST action submit|refresh|discard), `research` (GET, POST), `research/<id>` (PATCH), `research/run`, `research/settings`, `analyses`, `analyses/<id>`, `analyses/<id>/run`, `analyses/settings`, `analyses/runs/<id>/interpret`, `autopilot*`, `ideas*`, `analytics`.
Internal (key derived from `JWT_SECRET`): `/api/internal/events`, `/api/internal/experiments` (middleware only).
Scheduled (Bearer `CRON_SECRET`): `POST /api/cron/autopilot`, `POST /api/cron/analyses`.

## Content schema
`SitePage` and `Section` in `src/content/types.ts`; validated for stored versions by `pageContentSchema` (`src/server/siteSchema.ts`).

## Knowledge writeback (GitHub REST)
Uses `GET /contents`, `GET /git/ref/heads/<base>`, `POST /git/refs`, `PUT /contents`, `POST /pulls`, `GET /pulls/<n>`. Needs a token with contents and pull-requests write on `GITHUB_REPO`. `GITHUB_API_URL` overrides the base URL (GitHub Enterprise, tests). **Verified against a local mock only**, not real GitHub.

## Environment variables (values never in the repo)
| Name | Use |
|---|---|
| `DATABASE_URL` / `HYPERDRIVE` binding | Postgres (binding wins on Workers) |
| `JWT_SECRET` (32+ chars) | admin session and internal key |
| `CRON_SECRET` | authorizes scheduled endpoints |
| `VIASOCKET_ORG_ID`, `VIASOCKET_PROJECT_ID`, `VIASOCKET_EMBED_SECRET`, optional `AUTOPILOT_AI_SERVICE`/`MODEL` | AI for autopilot and analysis reading |
| `GITHUB_TOKEN`, `GITHUB_REPO`, optional `KNOWLEDGE_BASE_BRANCH` (default `main`), `GITHUB_API_URL` | knowledge writeback |
| `NEXT_PUBLIC_SITE_URL` | canonical origin, scheduler target |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | optional Search Console tag |
Repository secrets for Actions: `SITE_URL`, `CRON_SECRET`, `DATABASE_URL`.

## Missing capabilities (not built; no fake endpoints)
1. **Product activation and completed sign-up** from app.docstar.io / hitman-api into this site's measurement. Needs: an authenticated endpoint or event feed keyed by the `ref`/visitor id with consent rules. Owner: product/hitman-api team (unknown).
2. **Search Console** read access (queries, indexing). Needs: an owner granting API access and a service account.
3. **Coding-agent challenger generation** for experiments. Needs: an agent interface and its authority rules.
4. **Real-user performance data** (Core Web Vitals). Needs a field-data source.
5. **CRM / form handoff**: none exists because there is no form.
