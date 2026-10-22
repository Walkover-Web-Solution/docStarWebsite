---
covers: [package.json, .npmrc, .env.example, next.config.ts]
verified_at: b8f8ce7
verified_on: 2026-10-21
---
# Development

## Commands (from `package.json`)
| Task | Command |
|---|---|
| Install | `npm install` (`.npmrc` sets `legacy-peer-deps=true`, needed for the Cloudflare Pages build) |
| Dev server | `npm run dev` (Next with Turbopack, http://localhost:3000) |
| Production build | `npm run build` |
| Start built app | `npm run start` |

There is no lint, test or typecheck script. Type check manually with `npx tsc --noEmit`.

## Running without a backend
Leave `DOCSTAR_API_URL` unset: pages render from `src/content`. Copy `.env.example` to `.env.local` to point at hitman-api; secrets are shared with hitman-api and not stored here.

## Verifying a content change
1. `npm run dev`, open the page, check the `/<path>.md` twin and `/llms.txt`.
2. Confirm a new page appears in `PAGES` (`src/content/pages.ts`) and in `/sitemap.xml`.
3. For analytics changes, watch `POST /api/e` in the browser network tab (204 expected).

## PR and deployment flow
- Branch from `prod`; open the PR against `prod`. Production hosting is Cloudflare Pages (edge runtime comments in routes, `.npmrc` note).
- **Not confirmed by a human.** No CI workflows exist in this repo at this commit. See [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md).
