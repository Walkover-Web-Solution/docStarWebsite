---
covers: [src/middleware.ts, src/app/api/**, src/components/site/ui/CtaButton.tsx, src/components/site/SiteAnalytics.tsx, src/lib/experiments.ts, src/server/experiments.ts, src/server/autopilot/*.ts, src/server/ideas.ts]
verified_at: 00fd0e7
verified_on: 2026-11-08
---
# Flows

## 1. Human visits a page
1. Middleware matches the path (static assets, `_next` and `api` are excluded), sets `Vary: Accept` on page paths, and sets the `ds_aid` cookie for browsers that accept HTML.
2. If the cookie `isLogin=true` is present on `/` for a human, middleware redirects to `https://app.docstar.io/login`.
3. The page renders from `getSitePage`; `SiteAnalytics` sends `page.viewed`, `section.viewed`, `cta.clicked` and `signup.clicked` (any link to `app.docstar.io/login`) through `/api/e`.

## 2. Visitor copies the prompt (core conversion)
1. `CtaButton` with `kind: "copy-prompt"` copies `SITE.prompt`, adding `?ref=<id>` to the quickstart URL (`makeRef`).
2. It tracks `prompt.copied` with that `ref`.
3. The visitor's agent fetches `/mcp/quickstart.md?ref=<id>`; middleware logs `agent.quickstart_fetched` with the same `ref`, joining the copy to the agent fetch. A/B results call this join "agent arrived" (flow 7).

## 3. Agent or crawler reads the site
1. Request is classified by `classify` in `src/lib/requester.ts` (`ai_agent`, `ai_crawler`, `ai_search`, `http_client`, `bot`, `human`).
2. `/<page>.md` or `Accept: text/markdown` rewrites to `/md/<slug>`.
3. Middleware emits `agent.markdown_fetched`, `agent.llms_fetched` or `agent.page_fetched` server-side, since agents do not run JavaScript. It cannot reach the database itself, so it posts to `/api/internal/events` with `x-internal-key` (derived from `JWT_SECRET`, `src/lib/internal.ts`).

## 4. Admin preview of a draft
A signed-in admin (`ds_admin` cookie) opens `/api/preview?path=/mcp` (`src/app/api/preview/route.ts`). Without a session it returns 401; a path not in `PAGES` returns 404, so it is not an open redirect. Otherwise it enables draft mode and redirects to the page, which then reads the newest draft uncached. `/api/preview?exit=1` turns draft mode off.

## 5. Publish from the admin
`POST /api/admin/revisions/<id>/publish` calls `publishRevision` (`src/server/content.ts`): the revision becomes `published`, the previous one `superseded`, and the page's `publishedRevisionId` moves. Publishing clears the page cache of the server instance that handled it; other instances pick it up within 60 s (`REVALIDATE_SECONDS`). Rollback is `POST /api/admin/revisions/<id>/rollback`.

## 6. Retired URL
`next.config.ts` `redirects()` maps old help-era paths to the closest new page with permanent redirects. `/admin/signups` (removed tab) redirects temporarily to `/admin`.

## 7. A/B test
1. An admin (or the autopilot) creates an `experiment` row: variant A is always the live revision, plus one or two challenger revisions (`createSchema` in `src/server/experiments.ts`). The page must be published first.
2. Middleware fetches running tests from `/api/internal/experiments` (cached 30 s per instance). With `JWT_SECRET` unset, or if the call fails, no test runs and everyone gets the live page.
3. For people only (never agents, crawlers or `.md` twins), the variant is a stable hash of `ds_aid` and the test key, kept in the `ds_x` cookie. The variant is served by rewriting to `/xv/<revision><path>` with `Cache-Control: private, no-store`; the address bar is unchanged.
4. Exposure is the first `page.viewed` carrying the variant. Goal: `prompt.copied`. Guardrails: agent arrived (flow 2) and `signup.clicked`.
5. Decision rules (`DECISION`): at least 14 days, 300 visitors per variant, 95% win probability, and guardrail harm below 0.9. The autopilot publishes a winner or stops a loser; a test with no difference after 42 days ends keeping A.

## 8. Autopilot
`.github/workflows/autopilot.yml` posts daily to `/api/cron/autopilot` with `Bearer CRON_SECRET`. `scheduledRun` (`src/server/autopilot/run.ts`) does nothing while paused in Admin > Website > Autopilot or if it already ran today; a Postgres advisory lock allows one run at a time. It judges running tests, then asks the AI (viaSocket) for at most 3 actions. `src/server/autopilot/policy.ts` enforces the rules: protected pages, banned over-promising words, links limited to docstar.io, one running test, 2 new tests and 5 edits a week, and never `meta`. Each action is an `ai_proposal` row that can be rolled back (`/api/admin/autopilot/actions/<id>/rollback`).

## 9. Idea or bug from a person or agent
`POST /api/ideas` (CORS `*`, no sign-in; advertised in `/llms.txt`) validates with `submitSchema` (`src/server/ideas.ts`). Limits: 5 per hour and 20 per day per caller, 500 a day in total, at most 5,000 characters of details and 3 links. A filled hidden `website` field gets a quiet success. The response contains a private `followUpUrl` (`/api/ideas/public/<secret>`) showing status and the team's note. The team triages in Admin > Ideas.
