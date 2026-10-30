---
covers: [src/content/source.ts, src/lib/events-server.ts, src/lib/analytics.ts, src/app/api/**, src/content/types.ts, src/app/sitemap.xml/route.ts]
verified_at: d850eb7
verified_on: 2026-10-30
---
# Contracts

## Consumed
- **Postgres** (`HYPERDRIVE` binding on Cloudflare, `DATABASE_URL` elsewhere): pages, revisions, ideas, experiments and events in the `admin` and `admin_events` tables (`db/migrations`).
- **`https://api.docstar.io/p/published-urls/<id>`** (two ids in `src/app/sitemap.xml/route.ts`): help and blog URLs for the sitemap. Plain URL lists without dates.

## Exposed by this site
| Route | Purpose | Auth |
|---|---|---|
| `POST /api/e` | Browser analytics beacon. Ignores non-human senders; max 30 events; accepted and dropped when there is no database. | none |
| `GET /api/tools/llms-check?url=<site>` | llms.txt report as JSON: `{ site, llmsUrl, found, checks: [{ id, label, status: pass\|warn\|fail, detail }], stats: { bytes, sections, links } }`. https and public hosts only; 400 for bad input, 429 above 10 checks a minute per caller; CORS `*`. Returns 404 while `/tools/llms-txt-checker` is in `DRAFT_PAGES`. | none |
| `POST /api/ideas` | Feature requests, ideas and bugs from people or agents. | none (rate-limited) |
| `GET /api/preview` | Admin draft preview (sets draft mode). | admin session |
| `/api/admin/*` | Admin API. | admin session |
| `/api/internal/*` | Middleware → server: events, running experiments. | `x-internal-key` |
| `POST /api/cron/autopilot` | Daily autopilot run. | `Bearer CRON_SECRET` |
| `GET /content.json` | Bundled pages for the admin ("Copied from code", "Load code version"). | none |
| `GET /llms.txt`, `/llms-full.txt`, `/<page>.md`, `/index.md` | Agent-readable content; `.md` responses send `Link: <html>; rel="canonical"` and `Vary: Accept`. | none |
| `GET /og/<slug>.png` | Share image per page (static). | none |
| `GET /robots.txt`, `/sitemap.xml`, `/manifest.webmanifest` | Crawling and install metadata. | none |

## Browser events
`page.viewed`, `section.viewed`, `cta.clicked`, `prompt.copied`, `signup.clicked`. The list is duplicated in `src/lib/analytics.ts` and `src/app/api/e/route.ts` (`BROWSER_EVENTS`); change both. `signup.clicked` fires for any link containing `app.docstar.io/login`, including `?intent=signup`.

Server events (middleware): `agent.quickstart_fetched`, `agent.llms_fetched`, `agent.markdown_fetched`, `agent.page_fetched`. Who counts as a person is decided by `classify()` in `src/lib/requester.ts`. Search, ads and inspection crawlers (Googlebot, Google-InspectionTool, GoogleOther, Bingbot, Applebot, Lighthouse…) are bots: they are never put into A/B tests.

## Cookies
- `ds_aid`: random anonymous id, 1 year.
- `ds_x`: the visitor's A/B variants.
- `isLogin` is set by the app and only read here.

## Environment variables
| Name | Use |
|---|---|
| `DATABASE_URL` | Postgres outside Cloudflare; unset means bundled content only |
| `JWT_SECRET` | Admin sign-in cookie and the internal key |
| `CRON_SECRET` | Authorizes the autopilot cron |
| `VIASOCKET_ORG_ID`, `VIASOCKET_PROJECT_ID`, `VIASOCKET_EMBED_SECRET` | The autopilot's AI, through viaSocket |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, default `https://docstar.io` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional Search Console meta tag |
| `NEXT_PUBLIC_SHOW_DRAFT_PAGES` | `1` routes the hidden `DRAFT_PAGES` (local review and CI only; never in production) |

Values live in `.env*` (git-ignored); only `.env.example` is committed. Never print or commit secrets.
