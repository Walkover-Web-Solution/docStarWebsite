---
covers: [src/content/source.ts, src/lib/events-server.ts, src/lib/analytics.ts, src/lib/mw-experiments.ts, src/app/api/**, src/content/types.ts]
verified_at: b8f8ce7
verified_on: 2026-10-21
---
# Contracts

## Consumed from hitman-api (`DOCSTAR_API_URL`)
- `GET /site/pages/<slug>` (`?draft=1` with header `x-preview-secret` in preview): returns `{slug, path, meta, sections}` matching `SitePage` in `src/content/types.ts`. 404 means "use bundled copy".
- `POST /site/events` with header `x-events-key` (`SITE_EVENTS_SECRET`), body `{events: ServerEvent[]}`, max 50 per call. Event names must also be allowed in hitman-api (the events service, not in this repo).
- `https://api.docstar.io/p/published-urls/<id>` (two ids hard-coded in `src/app/sitemap.xml/route.js`): help and blog URLs for the sitemap.

## Exposed by this site
| Route | Purpose | Auth |
|---|---|---|
| `POST /api/e` | Browser analytics beacon; ignores non-human senders; max 30 events | none |
| `GET /api/preview` | Token (HMAC-SHA256, `SITE_PREVIEW_SECRET`) enables draft mode | token |
| `POST /api/revalidate` | `revalidateTag` for tags starting `site:` | `x-revalidate-secret` |
| `GET /content.json` | Bundled pages for the admin "Add to editor"; CORS `*` | none |
| `GET /llms.txt`, `/llms-full.txt`, `/md/<slug>` | Agent-readable content | none |

## Browser events
`page.viewed`, `section.viewed`, `cta.clicked`, `prompt.copied`, `snippet.copied`, `faq.opened`, `nav.clicked`, `signup.clicked`, `demo.clicked`, `early_access.requested`, `scroll.depth`, `experiment.exposed`. The list is duplicated in `src/lib/analytics.ts` and `src/app/api/e/route.ts` (`BROWSER_EVENTS`); change both.

Server events (middleware): `agent.quickstart_fetched`, `agent.llms_fetched`, `agent.markdown_fetched`, `agent.page_fetched`.

## Middleware experiment events (browser)
`src/lib/mw-experiments.ts` is the only copy of the external middleware's experiment snippet. Any client component can import `mwVariant` and `mwSend`. No page does yet.

- `mwVariant(experiment, variants)` hashes `experiment:visitorId` (FNV-1a) into the weighted list, in the order the middleware defined. It is synchronous. On any error it returns the first variant, the control, or `undefined` when the list is empty.
- `mwSend({ event, experiment, variant, goal? })` appends one `exposure` or `conversion` and returns immediately. Callers must not await it, retry it, read the response, or call it during render.
- `POST https://cursor-slack-bot.embarko.app/repos/docstarwebsite/events` with body `{ key, visitor_id, event, experiment, variant, goal? }`. `key` is the publishable append-only key in that module. `visitor_id` is `localStorage` `mw_visitor`, created on first use.
- Transport is `navigator.sendBeacon`, then `fetch` with `keepalive`, `credentials: "omit"`, and a 3 second abort. A failure stops later sends on that page. The page does not wait on this host.
- An event for a test the middleware is not running is refused. Do not call `mwSend` until that test is defined and started there.
- This is not `POST /api/e` and not the revision tests in `src/lib/experiments.ts`.

## Cookies
`ds_aid`: random anonymous id, 1 year. `isLogin` is set by the app and only read here.

## Environment variables
| Name | Use |
|---|---|
| `DOCSTAR_API_URL` | hitman-api base; unset means bundled content only |
| `SITE_PREVIEW_SECRET` | verifies preview tokens, fetches drafts |
| `SITE_REVALIDATE_SECRET` | authorizes `/api/revalidate` |
| `SITE_EVENTS_SECRET` | authorizes event forwarding |
| `NEXT_PUBLIC_SITE_URL` | canonical origin, default `https://docstar.io` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | optional Search Console tag |

Values live in `.env*` (git-ignored); only `.env.example` is committed. Never print or commit secrets.
