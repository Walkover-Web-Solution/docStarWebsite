# docstar.io website

Next.js site with its own backend and admin panel (`/admin`). Fully separate from the DocStar product backend.

## Setup
1. Postgres database (local: `createdb docstar-website`).
2. `cp .env.example .env.local` and fill `DATABASE_URL`, `JWT_SECRET`, `CRON_SECRET`, `VIASOCKET_*`. `NEXT_PUBLIC_MW_EVENTS_KEY` is already set in the example (publishable, append-only).
3. `npm install && npm run migrate` (creates tables; idempotent).
4. `npm run admin:user -- <email>` prints a generated password for a team member.
5. `npm run dev`.

## Deploy
- Tables: pushing to the prod branch runs `.github/workflows/migrate.yml` (secret `DATABASE_URL`).
- Autopilot: `.github/workflows/autopilot.yml` calls `/api/cron/autopilot` daily (secrets `SITE_URL`, `CRON_SECRET`).
- Cloudflare Workers (free plan fits: ~2 MiB gzipped): set `DATABASE_URL`, `JWT_SECRET`, `CRON_SECRET`, `VIASOCKET_*` as Worker secrets, then `npm run cf:deploy`. The database must be reachable from Cloudflare (public SSL endpoint or Hyperdrive).

## Ideas API
`POST /api/ideas` is public and anonymous (rate limited per IP). See `/llms.txt`.
