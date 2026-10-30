---
covers: [src/content/source.ts, src/middleware.ts, next.config.ts, src/content/pages.ts, src/lib/seo.ts, src/server/autopilot/policy.ts]
verified_at: d850eb7
verified_on: 2026-10-30
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
10. **SEO overhaul (2026-10-30, branch `seo/overhaul`; see `seo/AUDIT.md`, `seo/PLAN.md`, `seo/REPORT.md`).**
    - One metadata and JSON-LD helper (`src/lib/seo.ts`) for every page.
    - FAQPage markup dropped: FAQs stay as visible content only.
    - Metadata is never streamed into `<body>` (`htmlLimitedBots`).
11. **A/B variants carry no `noindex`.** The variant HTML is served at the real URL, so `noindex` there de-indexed the live page for every visitor in a test and for Google's inspection tools. Direct `/xv/` hits are still blocked by `X-Robots-Tag`, robots.txt and the canonical.
12. **The autopilot never edits `meta`.** Titles and descriptions follow the keyword map and change only by hand. SEO pages (compare, customers, about, changelog, tools, solutions) are protected entirely.
13. **New pages ship hidden** (`DRAFT_PAGES`) until their TODO-COPY placeholders are replaced, instead of going live as thin pages.
14. **The blog stays on the DocStar product** (`docstar.io/blog`). This site links to it and lists it in the sitemap.
15. **Tailwind and `src/scss` load only in `/admin`.** Website pages use a cascade-layered reset; pixel-identical screenshots confirmed no visual change.
16. **CSP is minimal** (`frame-ancestors`, `object-src`, `base-uri`) until the GTM container's tags are known; HSTS has no `includeSubDomains` until every subdomain is confirmed HTTPS-only.
