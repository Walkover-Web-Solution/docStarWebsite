# Documentation maintenance

State for the weekly docs refresh. The next run starts from the reviewed revision below: review `git log <revision>..main`, then the "Next run" list.

## Last run
- Reviewed revision: `00fd0e7` (`main`, 2026-11-08). First run of the weekly refresh.
- Checks run: `npm ci`, `npm run typecheck`, `npm run check:content`, `DATABASE_URL= npm run build`, `npm run seo:check`; curl checks of `/mcp`, `/mcp.md` (canonical `Link`, `Vary: Accept`), `/llms.txt`, `/api/preview` (401 signed out), `/xv/…` (`X-Robots-Tag`), `/api/tools/llms-check` (404 while hidden). All matched the docs.
- Not run: `npm run lhci`, `npm run cf:build`, `npm run migrate`, anything needing a database or the admin.
- Later merge of `main` at `65d86db` (2026-11-11): kept this branch's corrections and `main`'s own doc edits (homepage buyer groups in VISION, sitemap `lastmod` and llms.txt compare links in ARCHITECTURE and CONTRACTS). The only conflict was the ARCHITECTURE header; `covers` stays the wider list, and `verified_at` stays `main`'s later stamp (`8ee0f16`). Homepage sections reuse existing section types. Not re-audited beyond that merge.
- Later merge of `main` at `7e697d0` (2026-11-11): A/B arms share the live title and meta description (`getPageContent`, `experiments.ts`). Kept as decision 18 and in FLOWS 1 and 7. The conflicting DESIGN SEO paragraph still claimed FAQPage markup, so that sentence was not restored. Not re-audited beyond reading that change.

## Coverage map
Status: verified = checked against code at the reviewed revision; partial = exists but incomplete or partly unverified; missing = no guidance; n/a = not relevant here.

| Topic | Authoritative location | Status |
|---|---|---|
| Product purpose, audience, non-goals | [VISION.md](VISION.md) | partial: direction is inferred from commits, not confirmed by a human; no success metrics beyond the copy-prompt goal |
| Pages and content model | [ARCHITECTURE.md](ARCHITECTURE.md), `src/content/pages.ts` | verified |
| Request, agent, preview, publish, A/B, autopilot and ideas flows | [FLOWS.md](FLOWS.md) | verified |
| Server modules and data model | [ARCHITECTURE.md](ARCHITECTURE.md) "Server modules", `db/migrations` | verified |
| Exposed routes, events, cookies, env vars | [CONTRACTS.md](CONTRACTS.md) | verified |
| Auth and permissions | [CONTRACTS.md](CONTRACTS.md) Auth column, `src/server/auth.ts` | verified; one admin role only |
| Setup, commands, CI | [DEVELOPMENT.md](DEVELOPMENT.md) | verified (except `lhci`, `cf:build`, `migrate`) |
| Testing | [DEVELOPMENT.md](DEVELOPMENT.md) | partial: content and SEO checks only; no unit or integration tests |
| Design tokens, components, accessibility | [DESIGN.md](DESIGN.md) | partial: no brand voice or manual a11y test recorded |
| SEO (metadata, JSON-LD, sitemap, robots, redirects) | [ARCHITECTURE.md](ARCHITECTURE.md), `seo/PLAN.md`, `seo/REPORT.md` | verified (crawl passes); redirect targets questioned (OPEN_QUESTIONS 12) |
| Marketing claims and proof | `AGENTS.md` rule 15, `seo/PLAN.md` | partial: no approved-claims list beyond TODO-COPY markers |
| Measurement and experiments | [CONTRACTS.md](CONTRACTS.md) events, [FLOWS.md](FLOWS.md) flows 2 and 7 | verified (code); results not checked against live data |
| Caching | [ARCHITECTURE.md](ARCHITECTURE.md) "Content sourcing", [DECISIONS.md](DECISIONS.md) 3 | verified: 60 s page cache per instance, 30 s experiment list, `private, no-store` for variants |
| Security and privacy | [DECISIONS.md](DECISIONS.md) 16, [CONTRACTS.md](CONTRACTS.md) | partial: no event retention (OPEN_QUESTIONS 13) |
| Operations: deploy, rollback, recovery | [DEVELOPMENT.md](DEVELOPMENT.md) | missing: deploy is manual and undocumented beyond the command; no rollback or backup procedure (OPEN_QUESTIONS 1, 15) |
| Agent access (llms.txt, `.md` twins, quickstart, ideas API) | [ARCHITECTURE.md](ARCHITECTURE.md), [CONTRACTS.md](CONTRACTS.md), `public/mcp/quickstart.md` | verified (outputs render); quickstart content not reviewed against the product |
| Agent instruction discovery | `AGENTS.md`; `CLAUDE.md` imports it (`@AGENTS.md`) | verified; `.windsurf/workflows` are stale (OPEN_QUESTIONS 3) |
| CLI/SDK, infrastructure as code, data pipelines | none | n/a: this repo is the marketing site; the DocStar CLI and MCP live in the product |
| Localization | none | n/a: English only, no locale routing |

## Next run
- Re-check the open questions in [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md), especially 1, 6, 10, 11, 14 and 15.
- Run `npm run lhci` and `npm run cf:build` where Chrome and Wrangler are available, and record the outcome in [DEVELOPMENT.md](DEVELOPMENT.md).
- Review `public/mcp/quickstart.md` and `SITE.prompt` against the product's published docs.
- `README.md` overlaps [DEVELOPMENT.md](DEVELOPMENT.md); consolidate once Q10 is answered.
