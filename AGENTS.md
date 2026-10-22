# DocStar website

Marketing site for DocStar (docstar.io), an agent-first API documentation product. Next.js 15 App Router; pages are typed content sections rendered as HTML and as markdown twins for agents. Live content optionally comes from hitman-api, with a bundled fallback.

## Commands
| Task | Command |
|---|---|
| Install | `npm install` |
| Dev | `npm run dev` |
| Build | `npm run build` |
| Start | `npm run start` |
| Type check | `npx tsc --noEmit` |

No lint or test scripts exist.

## Reading order
1. [docs/VISION.md](docs/VISION.md) 2. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) 3. [docs/FLOWS.md](docs/FLOWS.md) 4. [docs/DESIGN.md](docs/DESIGN.md) 5. [docs/CONTRACTS.md](docs/CONTRACTS.md) 6. [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) 7. [docs/DECISIONS.md](docs/DECISIONS.md) 8. [docs/OPEN_QUESTIONS.md](docs/OPEN_QUESTIONS.md)

## Rules
1. Edit copy in `src/content`, not JSX. Pages are data (`src/content/types.ts`).
2. A new page must be added to `PAGES` in `src/content/pages.ts`; routing, sitemap, `llms.txt`, markdown twins and middleware all derive from it.
3. A new section type needs four edits: `src/content/types.ts`, a component in `src/components/site/sections/Sections.tsx`, a case in `src/components/site/SectionRenderer.tsx`, and a branch in `src/content/markdown.ts`.
4. Every page must stay readable as markdown; agents are first-class readers.
5. The agent prompt lives only in `SITE.prompt` (`src/content/site.ts`).
6. Keep `data-section`, `data-cta` and `data-placement` attributes; analytics reads them.
7. Browser event names live in both `src/lib/analytics.ts` and `src/app/api/e/route.ts`; change both, and hitman-api.
8. Dynamic routes use `export const runtime = "edge"` (Cloudflare Pages); do not use Node-only APIs.
9. Never remove a route or path without adding a redirect in `next.config.ts`.
10. Keep the bundled content fallback working; the site must render with `DOCSTAR_API_URL` unset.
11. Never commit or print secrets; only `.env.example` is tracked.
12. Tailwind and `src/scss` are legacy; build new UI with CSS modules under `.ds-site`.
13. Do not invent backend endpoints; describe them in `docs/CONTRACTS.md`.

## Where things are
- `src/app/(site)/`: pages. `src/app/api/`: `e`, `preview`, `revalidate`. `src/app/md`, `src/app/llms.txt`, `src/app/llms-full.txt`, `src/app/sitemap.xml`: agent outputs.
- `src/content/`: content model, pages, site chrome.
- `src/components/site/`: renderer, sections, UI atoms, CSS.
- `src/lib/`: analytics and requester classification. `src/middleware.ts`: markdown twins and agent analytics.
- `public/mcp/quickstart.md`: the quickstart agents fetch.

## PR and deployment flow
Branch from `prod`, open the PR against `prod`; production is Cloudflare Pages. Unconfirmed by a human and no CI exists (see docs/OPEN_QUESTIONS.md).

## Verification
Run `npm run build` and `npx tsc --noEmit`, check the page and its `.md` twin, and update the matching `docs/*.md` in the same commit.
