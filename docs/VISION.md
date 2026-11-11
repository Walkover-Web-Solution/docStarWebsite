---
covers: [src/content/site.ts, src/content/home.ts, src/content/pages.ts, src/app/llms.txt/route.ts]
verified_at: 8ee0f16
verified_on: 2026-11-10
---
# Vision

## Current implementation
docstar.io is the marketing site for DocStar, positioned as "API documentation for people and agents" (`SITE.tagline` in `src/content/site.ts`). The home page pitch is: paste one prompt into a coding agent and DocStar turns the code into API docs, `llms.txt`, a hosted MCP server and a CLI, kept in sync.

The conversion goal is a **copied prompt** (`copy-prompt` CTA) that the visitor pastes into an agent, plus sign-ups at the app login URL. Both are tracked as analytics events (see [CONTRACTS.md](CONTRACTS.md)).

Audience signals in the content: developers and API owners (`/mcp`, `/cli`, `/api-docs`), integrators giving a third-party API to an agent (`/for/integrators`), and AI agents themselves (`/agents`, markdown twins, `llms.txt`). The home page names three buyer groups (API/product teams, DX/docs teams, internal platform teams) and links to published DocStar-vs-* blog comparisons before the FAQ.

Visitors who don't know the product yet are offered one quiet way in: a muted text link under the hero CTAs and at the end of the first FAQ answer point to the published "What is DocStar" post, the same post is the first Resources link in the footer, and `llms.txt` lists it under "Start here". The link is deliberately smaller and quieter than a button, so the copied prompt stays the hero's only conversion action.

## Approved direction (inferred from commits, not confirmed by a human)
- Agent-first: every page must be equally readable by agents as markdown. Commit `2bf125c` rebuilt the site on that premise.
- Content is data (typed sections), so it can be edited from the DocStar admin without a deploy.

## Proposals and hidden work
- `src/content/pages/hub.ts` and `src/content/pages/drift.ts` exist but are deliberately not in `PAGES` ("hidden until launch").

## Non-goals (inferred)
- Not the product app (that is `https://app.docstar.io`) and not the help docs (`https://docstar.io/help`, served elsewhere).
- No pricing logic or billing here; pricing is static copy.

## Request evaluation protocol
1. Unclear request: restate the visitor problem and propose a solution using existing section types before coding.
2. Conflicts with agent-first (for example content that exists only as HTML, or a page missing from `PAGES`): explain and recommend against.
3. A deliberate direction change: record it here and in [DECISIONS.md](DECISIONS.md).
4. Needs a backend capability that is missing: write the contract in [CONTRACTS.md](CONTRACTS.md). Never fake an endpoint.

Unknowns are tracked in [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md).
