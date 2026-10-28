---
covers: [src/content/source.ts, src/middleware.ts, next.config.ts, src/content/pages.ts]
verified_at: b8f8ce7
verified_on: 2026-10-21
---
# Decisions

Rationale below comes from code comments and git history; items marked inferred are not confirmed.

1. **Site rebuilt as agent-first (2026-10-19, commit `2bf125c`).** Replaced the Tailwind/framer-motion feature pages with typed content sections. Reason: one source renders as HTML and markdown.
2. **Bundled content as fallback.** `getSitePage` falls back to `src/content` on unset URL, 404 or error, so an API outage never blanks the site.
3. **60 s time-based revalidation in addition to tag revalidation.** Comment in `src/content/source.ts`: tag revalidation does not reach edge-runtime pages on every host.
4. **Markdown twins via middleware rewrite.** Gives `/<page>.md` and `Accept: text/markdown` without separate routes per page; `Vary: Accept` is set.
5. **Server-side agent analytics.** Agents do not run JavaScript, so middleware logs their reads; humans are counted by the browser tracker.
6. **Same-origin `/api/e` beacon** so ad-blockers rarely drop events; actor type is decided server-side, never by the client.
7. **Hidden pages** `hub` and `drift` kept in the repo but out of `PAGES` until launch.
8. **Permanent redirects** from retired help-era URLs (`next.config.ts`).
9. **`legacy-peer-deps`** added for the Cloudflare Pages build (commit `858a8c9`).
10. **`/home` is a route alias of the homepage.** It renders the `home` page only. It is not added to `PAGES`, so sitemap, `llms.txt` and the canonical stay on `/`.
