---
covers: [package.json, .npmrc, .env.example, next.config.ts, scripts/*, tests/*, .github/workflows/*, wrangler.jsonc]
status: implemented; release authority unconfirmed
owner: unknown
source: commands run 2026-10-24
verified_at: fb315a0
verified_on: 2026-10-24
---
# Development

## Commands (verified 2026-10-24)
| Task | Command |
|---|---|
| Install | `npm install` |
| Dev (http://localhost:3000) | `npm run dev` |
| Type check | `npm run typecheck` (passes) |
| Tests | `npm test` (8 pass) |
| Build | `npm run build` (passes with `JWT_SECRET` and a local `DATABASE_URL`) |
| Migrate | `DATABASE_URL=postgres://localhost/docstar_dev npm run migrate` |
| Create operator | `npm run admin:user -- you@example.com "You"` (prints the password once) |
| Deploy | `npm run cf:deploy` |
There is no lint script. A Sass `@import` deprecation warning from `src/scss` appears on every build (pre-existing).

## Local setup
```
createdb docstar_dev
export DATABASE_URL=postgres://localhost/docstar_dev JWT_SECRET=$(openssl rand -hex 32) CRON_SECRET=local
npm run migrate && npm run admin:user -- you@example.com "You" && npm run dev
```
**Do not use a shared or production `DATABASE_URL`.** `.env` in a working copy may point at a remote database; exported shell variables take precedence over `.env`. Without `DATABASE_URL` the site renders bundled content and the admin APIs answer 503 with a clear message. Optional: `GITHUB_*` for knowledge writeback (a mock is fine locally), `VIASOCKET_*` for AI.

## Verifying a change
1. `npm run typecheck`, `npm test`, `npm run build`.
2. Open the page, its `.md` twin and `/llms.txt`; check the browser console and network (`POST /api/e` returns 204).
3. Run the admin analyses ("Links and delivered pages", "Search basics", "Claims") and fix new findings.
4. For admin changes sign in and exercise the section in a browser; for API changes also call it unauthenticated (expect 401).
5. Update affected docs and the page map ([SEO.md](SEO.md)).

## Admin operations
- **Edit knowledge:** admin > Knowledge > document > edit > Open pull request (needs writeback). Merge it; after the deploy the edit becomes effective; "Check status" refreshes. Restore an older edit by loading it into the editor and submitting.
- **Run or pause analyses:** admin > Analyses (Run now; Pause schedule) or Settings (per-analysis interval and enable, daily budget). The scheduler is the GitHub Actions workflow `.github/workflows/autopilot.yml` (daily 03:30 UTC; needs repo secrets `SITE_URL`, `CRON_SECRET`); pausing in the admin stops scheduled runs without touching the workflow.
- **Research:** admin > Research (Check now; Pause scheduled checks; cadence).
- **Experiments:** admin > Website & experiments. Stop is the emergency brake; everyone gets the live page immediately for new requests.
- **Autopilot:** admin > Website > Autopilot (on/off, run now, roll back actions).

## Deployment and recovery
Production is a Cloudflare Worker (`wrangler.jsonc`, route docstar.io, Hyperdrive binding). `migrate.yml` applies migrations on push to `main` when `db/migrations/**` changes. Recover content by restoring a page version in the admin; recover code by redeploying a previous commit. Releases: see OPEN_QUESTIONS Q1 (branch and approval flow unconfirmed; `AGENTS` earlier said "branch from prod", but the repository's default branch is `main`).
