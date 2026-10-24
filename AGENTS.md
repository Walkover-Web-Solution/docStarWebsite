# DocStar website

Marketing site for DocStar (docstar.io), an agent-first API documentation product. Next.js 15 App Router on Cloudflare Workers (OpenNext). Pages are typed content sections rendered as HTML and as markdown twins for agents. The site has its own Postgres backend (content versions, A/B/C experiments, analytics, ideas inbox, AI autopilot) and a private admin at `/admin`. The bundled `src/content` copy is the fallback.

The site should communicate like a capable marketing lead and change through reliable engineering. Humans own vision, priorities and approval; agents investigate, implement, verify and keep this knowledge current.

## Commands
| Task | Command |
|---|---|
| Install | `npm install` (`.npmrc` sets `legacy-peer-deps`) |
| Dev | `npm run dev` (runs `knowledge:build` first) |
| Build | `npm run build` (runs `knowledge:build` first) |
| Type check | `npm run typecheck` (builds the knowledge bundle, then `tsc --noEmit`) |
| Tests | `npm test` (node:test via tsx, `tests/`) |
| Database | `npm run migrate`, `npm run admin:user -- <email> "Name"` (need `DATABASE_URL`) |
| Deploy | `npm run cf:deploy` (OpenNext build + wrangler) |

No lint script exists. Never point local work at a shared or production `DATABASE_URL`; create a throwaway database (`createdb docstar_dev`).

## Reading order
Read this file, then what the task touches. Approved direction first, implementation second.
1. [docs/VISION.md](docs/VISION.md): purpose, approved vs inferred direction, non-goals.
2. [docs/POSITIONING.md](docs/POSITIONING.md): audiences, promise, claim register. Check copy against it.
3. [docs/DESIGN.md](docs/DESIGN.md): voice, tokens, components. [docs/SEO.md](docs/SEO.md): page map, indexing, redirects.
4. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/FLOWS.md](docs/FLOWS.md), [docs/CONTRACTS.md](docs/CONTRACTS.md): how it works, journeys, schemas and APIs.
5. [docs/MEASUREMENT.md](docs/MEASUREMENT.md), [docs/EXPERIMENTS.md](docs/EXPERIMENTS.md): events, metrics, experiment rules. Live experiment state is in the admin, not in Markdown.
6. [docs/COMPETITORS.md](docs/COMPETITORS.md): market context (reports in `docs/research/`).
7. [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md): setup, verification, deploy, admin operations. [docs/DECISIONS.md](docs/DECISIONS.md), [docs/OPEN_QUESTIONS.md](docs/OPEN_QUESTIONS.md).

Each knowledge file carries `status`, `owner`, `verified_at` and `verified_on` in its header. Treat `inferred` and `proposed` as evidence, not approval. The admin (Knowledge) shows the revision deployed and opens pull requests for edits; the repository is the only source.

## Rules
1. Edit copy in `src/content`, not JSX. Pages are data (`src/content/types.ts`). Live copy may differ: the admin edits versions stored in the database, with `src/content` as fallback.
2. A new page must be added to `PAGES` in `src/content/pages.ts`; routing, sitemap, `llms.txt`, markdown twins and middleware derive from it.
3. A new section type needs four edits: `src/content/types.ts`, a component in `src/components/site/sections/Sections.tsx`, a case in `src/components/site/SectionRenderer.tsx`, a branch in `src/content/markdown.ts`.
4. Every page must stay readable as markdown; agents are first-class readers.
5. The agent prompt lives only in `SITE.prompt` (`src/content/site.ts`).
6. Keep `data-section`, `data-cta`, `data-placement`; analytics and experiments read them.
7. Browser event names live in `src/lib/analytics.ts`, `src/app/api/e/route.ts` and `src/server/events.ts` (`SITE_EVENTS`); change all three and update [docs/MEASUREMENT.md](docs/MEASUREMENT.md).
8. Server code runs on the Workers runtime: no Node-only APIs outside `scripts/` and `tests/`. Database access goes through `withDb` (one connection per request; no session-level locks, since Hyperdrive pools).
9. Never remove a route or path without adding a redirect in `next.config.ts`.
10. The site must render with `DATABASE_URL` unset (bundled content).
11. Never commit or print secrets; only `.env.example` is tracked. Secrets are server-side only.
12. New UI: CSS modules under `.ds-site`. Tailwind and `src/scss` are legacy (the admin still uses Tailwind utilities).
13. Admin and `/api/admin/*` are protected server-side (`requireAdmin`); hiding or `noindex` is not authorization. Internal strategy and analytics never go in public bundles or routes.
14. Do not invent backend capabilities or fake integrations: describe what is missing in [docs/CONTRACTS.md](docs/CONTRACTS.md) and show "not connected" in the UI.
15. Knowledge is edited in Markdown in this repo. Do not add a second editable copy.

## Workflow for every change
1. Treat the request as raw input. Infer the underlying visitor or operator problem, the outcome, and brief acceptance criteria, keeping explicit constraints.
2. Check it against approved direction (VISION, POSITIONING). If it conflicts, say so and propose an aligned alternative; only an authorized owner changes direction, recorded in DECISIONS. Agents do not approve their own proposals.
3. Find the root cause and search for equivalent instances; fix confirmed shared causes in scope, list the rest as proposals.
4. Check connected pages and journeys, shared components, claims, SEO (URLs, redirects, canonical), analytics events, permissions and running experiments before changing anything. A page with a running experiment is not edited or published over; start a new phase.
5. Verify backend availability. If a capability is missing, document the contract and continue independent work.
6. Verify: `npm run typecheck`, `npm test`, `npm run build`, then the real behavior in a browser, the page's `.md` twin, and the affected journey. Report what you could not verify.
7. Update affected knowledge in the same change (docs, page map, contracts, decisions) and bump `verified_on`/`verified_at` only for what you actually checked.
8. Deliver the change reference, checks run, evidence, doc updates and blockers. Production changes follow the repository's release authority (see OPEN_QUESTIONS).

Reminder for any request: "Treat this as raw input; infer the outcome, keep explicit constraints. Read AGENTS.md and the relevant approved context. Find the shared cause. Protect journeys, brand truth, SEO, measurement and permissions. Verify, update knowledge, report evidence and blockers. Ask only blocking questions."

## Where things are
- `src/app/(site)/`: pages and `xv/` (experiment versions). `src/app/admin/`: admin UI. `src/app/api/`: `e`, `preview`, `admin/*`, `cron/*`, `internal/*`, `ideas`. `src/app/md`, `llms.txt`, `llms-full.txt`, `sitemap.xml`: agent outputs.
- `src/content/`: content model, pages, site chrome, competitor seed. `src/components/site/`: renderer and sections. `src/components/admin/`: admin UI.
- `src/server/`: content versions, experiments, events, knowledge, research, analyses, autopilot, settings, overview. `src/lib/`: analytics, requester classification, experiment assignment.
- `db/migrations/`: Postgres schema. `scripts/`: migrate, admin user, knowledge bundle. `tests/`: unit tests. `.github/workflows/`: migrations and the daily scheduler.
- `public/mcp/quickstart.md`: the quickstart agents fetch.
