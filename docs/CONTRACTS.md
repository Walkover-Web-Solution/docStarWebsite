---
covers: [src/content/source.ts, src/lib/events-server.ts, src/lib/analytics.ts, src/app/api/**, src/content/types.ts, src/app/sitemap.xml/route.ts]
verified_at: 00fd0e7
verified_on: 2026-11-08
---
# Contracts

## Consumed
- **Postgres** (`HYPERDRIVE` binding on Cloudflare, `DATABASE_URL` elsewhere): pages, revisions, ideas, experiments and events in the `admin` and `admin_events` tables (`db/migrations`).
- **`https://api.docstar.io/p/published-urls/<id>?lastmod=true`** (two ids in `src/app/sitemap.xml/route.ts`): help and blog URLs for the sitemap. Returns `[{ url, lastmod: "YYYY-MM-DD" | null }]`. A plain URL string is still accepted and has no date; a missing or unparseable `lastmod` is omitted from that sitemap entry.

## Exposed by this site
| Route | Purpose | Auth |
|---|---|---|
| `POST /api/e` | Browser analytics beacon. Ignores non-human senders; max 30 events; accepted and dropped when there is no database. | none |
| `GET /api/tools/llms-check?url=<site>` | llms.txt report as JSON: `{ site, llmsUrl, found, checks: [{ id, label, status: pass\|warn\|fail, detail }], stats: { bytes, sections, links } }`. https and public hosts only; 400 for bad input, 429 above 10 checks a minute per caller; CORS `*`. Returns 404 while `/tools/llms-txt-checker` is in `DRAFT_PAGES`. | none |
| `POST /api/ideas` | Feature requests, ideas and bugs from people or agents (`submitSchema` in `src/server/ideas.ts`; limits in [FLOWS.md](FLOWS.md) flow 9). Returns 201 with a private `followUpUrl`. CORS `*`. | none (rate-limited) |
| `GET /api/ideas/public/<secret>` | The sender's own idea: status and the team's note. | the secret in the link |
| `GET /api/preview?path=<page>` / `?exit=1` | Admin draft preview (sets or clears draft mode). | admin session |
| `/api/admin/*` | Admin API. | admin session |
| `/api/internal/*` | Middleware → server: events, running experiments. | `x-internal-key` |
| `POST /api/cron/autopilot` | Daily autopilot run. | `Bearer CRON_SECRET` |
| `GET /content.json` | Bundled pages for the admin ("Copied from code", "Load code version"). | none |
| `GET /llms.txt`, `/llms-full.txt`, `/<page>.md`, `/index.md` | Agent-readable content; `.md` responses send `Link: <html>; rel="canonical"` and `Vary: Accept`. | none |
| `GET /og/<slug>.png` | Share image per page (static). | none |
| `GET /robots.txt`, `/sitemap.xml`, `/manifest.webmanifest` | Crawling and install metadata. | none |
| `/xv/<revision><path>` | Internal rewrite target for A/B variants; `X-Robots-Tag: noindex` when requested directly. | none |

## Browser events
`page.viewed`, `section.viewed`, `cta.clicked`, `prompt.copied`, `signup.clicked`. The list is kept in three places: `BrowserEvent` in `src/lib/analytics.ts`, `BROWSER_EVENTS` in `src/app/api/e/route.ts`, and `SITE_EVENTS` in `src/server/events.ts` (which also lists the server events and is the database whitelist). Change all three. `signup.clicked` fires for any link containing `app.docstar.io/login`, including `?intent=signup`. `/api/e` drops non-human senders, keeps at most 30 events and 100 KB per request, and accepts only A/B/C variant values.

Events are stored in `admin_events` without referrer, country or user agent (`src/server/events.ts`). No retention or deletion job exists in the code (see [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md)).

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
| `HYPERDRIVE` (Worker binding, `wrangler.jsonc`) | Postgres on Cloudflare; used instead of `DATABASE_URL` there |
| `VIASOCKET_ORG_ID`, `VIASOCKET_PROJECT_ID`, `VIASOCKET_EMBED_SECRET` | The autopilot's AI, through viaSocket. The two ids are plain `vars` in `wrangler.jsonc`; the embed secret is a Worker secret |
| `AUTOPILOT_AI_SERVICE`, `AUTOPILOT_AI_MODEL` | Optional model override for the autopilot (`src/server/autopilot/ai.ts`) |
| `SEO_BASE_URL` | `npm run seo:check` target only, default `http://localhost:3000` |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, default `https://docstar.io` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional Search Console meta tag |
| `NEXT_PUBLIC_SHOW_DRAFT_PAGES` | `1` routes the hidden `DRAFT_PAGES` (local review and CI only; never in production) |

Values live in `.env*` (git-ignored); only `.env.example` is committed. Never print or commit secrets.
