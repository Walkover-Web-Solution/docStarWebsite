---
covers: [src/lib/analytics.ts, src/app/api/e/route.ts, src/server/events.ts, src/middleware.ts, src/server/analyses.ts, src/server/overview.ts]
status: implemented; instrumentation gaps listed
owner: unknown
source: code; schemas are in src/server/events.ts and docs/CONTRACTS.md
verified_at: fb315a0
verified_on: 2026-10-24
---
# Measurement

First-party, privacy-minimal analytics stored in this site's Postgres (`admin_events`). No referrer, country, user agent or personal data is stored; the visitor id is a random cookie (`ds_aid`, one year). Retention: no deletion job exists (OPEN_QUESTIONS Q10). Google Tag Manager also loads in the browser (`GTM-MGFDQP68`); its data is **not** readable here and its consent configuration is unverified. Schemas: [CONTRACTS.md](CONTRACTS.md) and `eventSchema` in `src/server/events.ts`.

## Conversion journey
1. Human **visits** a page (`page.viewed`, browser). 2. Sees sections (`section.viewed`, 50% visible for 800 ms). 3. **Copies the prompt** (`prompt.copied`, with a random `ref`). 4. The visitor's **agent arrives** (`agent.quickstart_fetched` with the same `ref`; server-side). 5. Clicks **sign up** (`signup.clicked`: any click to `app.docstar.io/login`). 6. Completes sign-up and activates in the product: **not observable here** (needs a contract with hitman-api/product; see CONTRACTS "missing").

## Metric definitions
| Metric | Numerator / denominator | Notes |
|---|---|---|
| Prompt-copy rate | distinct human visitors with `prompt.copied` / distinct human visitors with `page.viewed` | primary outcome for experiments; window and path stated per view |
| Agent-arrival rate | copies whose `ref` appears in a later `agent.quickstart_fetched` / human visitors | proxy that the prompt was used; refs are not unique across time windows |
| Sign-up click rate | distinct visitors with `signup.clicked` / human visitors | a click, not a sign-up |
| Agent reads | counts of `agent.*` events by actor type | agents do not run JS, so these come from the middleware |
Windows are UTC. Humans vs agents is decided server-side from the request (`src/lib/requester.ts`), never by the client. Bots that run JS are dropped (`/api/e` returns 204 for non-humans).

## Limits and honesty rules
- Attribution is last-touch by anonymous cookie; cross-device and cookie-cleared visitors look new.
- Ad-blockers may drop beacons despite the same-origin endpoint; agent reads are server-side and unaffected.
- Events with `props.synthetic = true` (test fixtures) are excluded from experiment evidence; they are not excluded from the general Analytics tab. Internal operator browsing is not tracked inside `/admin`, but operators who browse the public site are counted (no internal-traffic filter yet; OPEN_QUESTIONS Q11).
- Missing data is shown as "not measured" (Overview) and as `not_connected`/`stale`/`insufficient_data` (Analyses). Never read a missing source as zero.
- Search Console, product activation and CRM are not connected.

## Freshness and monitoring
The "Measurement health" analysis checks newest event age (stale after 48 h), expected event names present in 14 days, and visitor volume (under 100 is `insufficient_data`). It runs daily from the scheduler and on demand.

## Instrumentation gaps
Completed sign-up and activation; form-to-CRM handoff (there is no website form: the CTA hands off to the app); consent state; retention job; internal-traffic filter; Search Console; real-user performance (Core Web Vitals) data.
