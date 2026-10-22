---
covers: [src/middleware.ts, src/app/api/**, src/components/site/ui/CtaButton.tsx, src/components/site/SiteAnalytics.tsx]
verified_at: b8f8ce7
verified_on: 2026-10-21
---
# Flows

## 1. Human visits a page
1. Middleware matches the path (static assets, `_next` and `api` are excluded), sets `Vary: Accept` on page paths, and sets the `ds_aid` cookie for browsers that accept HTML.
2. If the cookie `isLogin=true` is present on `/` for a human, middleware redirects to `https://app.docstar.io/login`.
3. The page renders from `getSitePage`; `SiteAnalytics` sends `page.viewed`, `section.viewed`, `scroll.depth`, `cta.clicked` through `/api/e`.

## 2. Visitor copies the prompt (core conversion)
1. `CtaButton` with `kind: "copy-prompt"` copies `SITE.prompt`, adding `?ref=<id>` to the quickstart URL (`makeRef`).
2. It tracks `prompt.copied` with that `ref`.
3. The visitor's agent fetches `/mcp/quickstart.md?ref=<id>`; middleware logs `agent.quickstart_fetched` with the same `ref`, joining the copy to the agent fetch.

## 3. Agent or crawler reads the site
1. Request is classified by `classify` in `src/lib/requester.ts` (`ai_agent`, `ai_crawler`, `ai_search`, `http_client`, `bot`, `human`).
2. `/<page>.md` or `Accept: text/markdown` rewrites to `/md/<slug>`.
3. Middleware emits `agent.markdown_fetched`, `agent.llms_fetched` or `agent.page_fetched` server-side, since agents do not run JavaScript.

## 4. Admin preview of a draft
hitman-api issues `/api/preview?token=<payload>.<HMAC>` valid 10 minutes, signed with `SITE_PREVIEW_SECRET`. A valid token enables draft mode and redirects to the page path (only paths in `PAGES`). `?exit=1` disables it.

## 5. Publish from the admin
hitman-api calls `POST /api/revalidate` with `x-revalidate-secret` and `tags` starting `site:`. Caches also expire after 60 s, because tag revalidation does not reach every edge host.

## 6. Retired URL
`next.config.ts` `redirects()` maps old help-era paths to the closest new page with permanent redirects.
