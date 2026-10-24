---
covers: [package.json, .github/workflows/*, docs/**]
status: open items; each needs the owner named
owner: unknown
source: gaps found 2026-10-24
verified_at: fb315a0
verified_on: 2026-10-24
---
# Open Questions

| # | Question | Affects | Independent work meanwhile | Resolves when |
|---|---|---|---|---|
| 1 | Who owns the vision, positioning and release approval? What are the branch, review and promote steps (the repo's default is `main`; older docs said `prod`)? | VISION, POSITIONING, deploys, who may launch experiments | Everything marked inferred stays labelled | An owner confirms; record in DECISIONS |
| 2 | Is each claim in the POSITIONING claim register true today (one-prompt output, "never drifts", agent analytics, MSG91 reference, plan limits "unlimited pages")? | Copy, pricing, comparison pages | Banned-wording analysis runs | Product owner provides evidence and date |
| 3 | Who confirms competitors, and which of the 10 candidates are real? | COMPETITORS, watchlist | Source checks run on candidates | Owner confirms in admin > Research |
| 4 | GitHub writeback for knowledge: provide `GITHUB_TOKEN` (contents + pull requests write) and `GITHUB_REPO` on the Worker. | Knowledge edits only save as drafts without it | Verified against a local mock | Real repository edit merged and deployed once |
| 5 | Is the analyses scheduler running? Needs repo secrets `SITE_URL` and `CRON_SECRET` and the same `CRON_SECRET` on the Worker. | Scheduled analyses and research | Manual runs work | A scheduled run appears in admin > Analyses |
| 6 | Do the analyses and research checks work on the deployed Worker (own-origin fetches under `global_fetch_strictly_public`, CPU limits)? Only verified locally. | Analyses "links" and "seo", research | Per-analysis failure is recorded, not hidden | First production run |
| 7 | Remove legacy `src/scss` and Tailwind? | Root layout, admin styling | None | Visual regression check on all pages |
| 8 | Are the `public/` images (`Step3.png`, `template-section-images/`, `DocStar-Logo/`) used by external pages? | Possible removal | None | Owner of docstar.io assets confirms |
| 9 | Which retired URLs redirecting to `/` have traffic or backlinks? | SEO redirects | None | Search Console access (Q13) |
| 10 | Retention for `admin_events` and consent behaviour of GTM | Privacy, MEASUREMENT | None | Owner states the policy; add a purge job |
| 11 | Internal-traffic filter for operators browsing the public site | Experiment evidence | `props.synthetic` for fixtures | Decide: cookie or IP rule |
| 12 | Experiment statistics: a sequential or multiple-comparison method for three arms and daily looks | Verdict trust | Thresholds make early wins unlikely; a person promotes | Decide method or adopt a provider |
| 13 | Search Console, completed sign-up/activation, performance field data are not connected | MEASUREMENT | Honest "not connected" states | Access and contracts (CONTRACTS "missing") |
| 14 | Experiment cookie `Set-Cookie` on cacheable HTML for untested pages while a test runs; confirm Cloudflare does not cache those responses | Cache correctness | None | Check response caching on production |
| 15 | Are `hub` and `drift` launching? | Page map | None | Product decision |
| 16 | The autopilot (daily AI agent) can publish factual edits and start tests under `policy.ts`; confirm the owner accepts that authority | Autopilot settings | It is off by default until switched on | Owner confirms limits in Settings |
