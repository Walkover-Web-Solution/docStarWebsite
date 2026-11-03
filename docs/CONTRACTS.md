---
covers: [src/content/source.ts, src/lib/events-server.ts, src/lib/analytics.ts, src/lib/mw-experiments.ts, src/app/api/**, src/content/types.ts, src/app/sitemap.xml/route.ts]
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

## Middleware experiment events (browser)
`src/lib/mw-experiments.ts` is the only copy of the external middleware's experiment snippet. Any client component can import `mwVariant` and `mwSend`. No page does yet.

- `mwVariant(experiment, variants)` hashes `experiment:visitorId` (FNV-1a) into the weighted list, in the order the middleware defined. It is synchronous. On any error it returns the first variant, the control, or `undefined` when the list is empty.
- `mwSend({ event, experiment, variant, goal? })` appends one `exposure` or `conversion` and returns immediately. Callers must not await it, retry it, read the response, or call it during render.
- `POST https://cursor-slack-bot.embarko.app/repos/docstarwebsite/events` with body `{ key, visitor_id, event, experiment, variant, goal? }`. `key` is `NEXT_PUBLIC_MW_EVENTS_KEY` from `.env.example` (publishable, append-only), inlined at build by `next.config.ts`. A missing key skips the send. `visitor_id` is `localStorage` `mw_visitor`, created on first use.
- Transport is `navigator.sendBeacon`, then `fetch` with `keepalive`, `credentials: "omit"`, and a 3 second abort. A failure stops later sends on that page. The page does not wait on this host.
- An event for a test the middleware is not running is refused. Do not call `mwSend` until that test is defined and started there.
- This is not `POST /api/e` and not the revision tests in `src/lib/experiments.ts`.

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
| `NEXT_PUBLIC_MW_EVENTS_KEY` | publishable append-only key for middleware A/B events; in `.env.example` |

Values live in `.env*` (git-ignored); only `.env.example` is committed. Never print or commit secrets.
