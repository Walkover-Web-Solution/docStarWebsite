---
covers: [package.json, .windsurf/workflows/*.md, src/scss/_global.scss]
verified_at: b8f8ce7
verified_on: 2026-10-21
---
# Open Questions

| # | Question | Evidence | Needs |
|---|---|---|---|
| 1 | What is the exact PR and release flow (target branch, preview, who promotes)? | No CI in repo; Cloudflare Pages inferred from comments | Human |
| 2 | Remove unused dependencies `framer-motion`, `lucide-react`, `react-fast-marquee`, `react-intersection-observer`, `saas`? | Zero imports in `src` at this commit; `saas` looks like a typo for `sass` | Human OK, then `npm uninstall` and a build |
| 3 | Delete stale `.windsurf/workflows/*`? | They describe feature pages with a schema component, `framer-motion` clients and a Tailwind theme that no longer exist | Human OK |
| 4 | Remove legacy `src/scss/*` and Tailwind? | `.ds-site` pages use CSS modules; the root layout still imports the SCSS | Visual regression check first |
| 5 | Are `hub` and `drift` launching, and when? | Hidden in `src/content/pages.ts` | Product |
| 6 | The admin routes and database that exist on branch `website-standalone` are not on `prod`. Which is the target architecture? | `website-standalone` differs by about 100 files | Human |
| 7 | `README.md` is the create-next-app boilerplate. | Verified | Rewrite after Q1 |
| 8 | No lint, test or typecheck scripts. | `package.json` | Human |
