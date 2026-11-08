---
covers: [package.json, .windsurf/workflows/*.md, src/scss/_global.scss, db/migrations/*.sql, next.config.ts, README.md, scripts/migrate.mjs]
verified_at: 00fd0e7
verified_on: 2026-11-08
---
# Open Questions

| # | Question | Evidence | Needs |
|---|---|---|---|
| 1 | What is the exact PR and release flow (target branch, preview, who promotes)? | CI exists (`.github/workflows/seo.yml`); deploy is `npm run cf:deploy` by hand; nothing records who deploys or from which branch | Human |
| 2 | Remove unused dependencies `framer-motion`, `react-fast-marquee`, `react-intersection-observer`, `saas`? | Zero imports in `src` at `00fd0e7`; `saas` looks like a typo for `sass`. `lucide-react` is now used by the admin (`src/components/admin/*`), so keep it | Human OK, then `npm uninstall` and a build |
| 3 | Delete stale `.windsurf/workflows/*`? | They describe feature pages with a schema component, `framer-motion` clients and a Tailwind theme that no longer exist | Human OK |
| 4 | Remove legacy `src/scss/*` and Tailwind entirely? | Website pages no longer load them (2026-10-30); only `/admin` does, and it uses Tailwind classes throughout | Rewrite the admin styles first |
| 5 | Are `hub` and `drift` launching, and when? | Kept in `src/content/pages/`, in neither `LIVE_PAGES` nor `DRAFT_PAGES` | Product |
| 6 | The admin and database are on `main` but not on `prod` (`origin/prod` at `fc8accd` has no `src/app/admin`; `main` is 36 commits ahead). Is `main` the target architecture? | `git ls-tree origin/prod src/app` | Human |
| 7 | `README.md` duplicates setup and deploy steps from [DEVELOPMENT.md](DEVELOPMENT.md) and says migrations run on push to `prod`. | Verified at `00fd0e7` | Fix after Q10 |
| 8 | No lint script. (Typecheck, content, SEO and Lighthouse checks exist and run in CI.) | `package.json` | Human |
| 9 | SEO decisions listed in `seo/PLAN.md` ("Decisions needed"): pricing plan features, social profiles, About and MSG91 facts, compare pages vs blog posts, `/drift` and `/hub` launch. | `seo/PLAN.md` | Human |
| 10 | Should production deploy and migrate from `main` or `prod`? `migrate.yml` runs on `main`; the `scripts/migrate.mjs` header and `README.md` say `prod`. | `.github/workflows/migrate.yml` | Human |
| 11 | `db/migrations/003_signups.sql` stayed after the signups feature was removed (`61ee06b`). It allows a `signup` row type nothing writes, and mentions a `002_blog_post.sql` that is not on `main`. Keep it (it may already be applied) or add a migration that drops the type? | `db/migrations/`, `git show 61ee06b --stat` | Human |
| 12 | Ten retired help-era URLs redirect to `/` (for example `/features`, `/editor`, `/faq-generator`), against the website guidance "do not redirect removed pages to the homepage". Map them to closer pages, or accept? | `next.config.ts` `redirects()` | Product/SEO |
| 13 | `admin_events` has no retention or deletion job. How long are analytics events kept? | No delete or retention code in `src/server/events.ts` or `db/migrations` | Human (privacy) |
| 14 | `AGENTS.md` rule 7 says event-name changes also go to hitman-api, but nothing in this repo sends events to hitman-api any more (events go to the site's own database). Does hitman-api still read them? | `rg hitman src` finds nothing | Human |
| 15 | Is there an incident, rollback or database backup procedure? None is documented or tested in the repo. Workers observability is on (`wrangler.jsonc`). | `wrangler.jsonc`, `.github/workflows/` | Human |
