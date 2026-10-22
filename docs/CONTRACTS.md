---
covers: [src/content/source.ts, src/lib/events-server.ts, src/lib/analytics.ts, src/app/api/**, src/content/types.ts]
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
