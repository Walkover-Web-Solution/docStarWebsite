---
covers: [src/content/site.ts, src/content/home.ts, src/content/pages.ts]
status: inferred (no human-approved vision document found in the repo)
owner: unknown (see OPEN_QUESTIONS Q1)
source: git history (2bf125c, a481a85), src/content, docs/research/competitors-2026-10-24.md
verified_at: fb315a0
verified_on: 2026-10-24
---
# Vision

Source status legend: **approved** (a human owner stated it), **implemented** (in code/copy today), **researched** (dated evidence), **proposed** (hypothesis), **unknown**. Nothing below is currently marked approved; the repository holds no strategy document from an owner. Questions that need an owner are in [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md).

## Product purpose (implemented, owner confirmation pending)
DocStar is documentation for people **and** agents. The site's pitch: paste one prompt into a coding agent; DocStar turns the code into API docs, `llms.txt`, a hosted MCP server and a CLI, and keeps them in sync (`SITE.tagline`, `home.ts`). The website's job is to get a visitor to try that.

## Who and why (implemented as copy; not validated)
- Developers and API owners who want their API usable by AI assistants (`/mcp`, `/cli`, `/api-docs`).
- Integrators who want to hand a third-party API to their own agent (`/for/integrators`).
- AI agents and crawlers as readers (`/agents`, markdown twins, `llms.txt`).
Detail, alternatives and objections: [POSITIONING.md](POSITIONING.md).

## Conversion goals (implemented)
1. A **copied prompt** pasted into an agent (`prompt.copied`, joined to the agent's quickstart fetch by `ref`).
2. A click to sign up at the app login (`signup.clicked`). Completed sign-up and activation happen in the product and are **not observable** from this site. See [MEASUREMENT.md](MEASUREMENT.md).

## Guiding principles
- **Agent-first (implemented, inferred as approved from commit 2bf125c):** every page is equally readable as markdown; content is data, so it can change without a deploy.
- **Truthful claims:** claims need a recorded source ([POSITIONING.md](POSITIONING.md) claim register). No invented customers, prices, metrics.
- **Evidence over taste:** changes to what persuades are tested ([EXPERIMENTS.md](EXPERIMENTS.md)), not shipped on opinion.
- **One source per fact:** copy in `src/content`, knowledge in this repo, live experiment state in the database.

## Non-goals (inferred)
- Not the product app (`https://app.docstar.io`) and not the help docs (`https://docstar.io/help`).
- No billing or pricing logic here; pricing is static copy.
- This site does not store customer (tenant) data. The admin is for internal operators only.

## Proposals and hidden work
- `hub` and `drift` pages exist in `src/content/pages/` but are not in `PAGES` ("hidden until launch").
- Competitor-informed positioning gaps are hypotheses in [COMPETITORS.md](COMPETITORS.md), not strategy.

## Request evaluation protocol
Unclear request: restate the visitor problem and propose a solution using existing section types. Conflict with agent-first or with the claim register: explain and recommend against. Deliberate direction change: an authorized owner records it here and in [DECISIONS.md](DECISIONS.md). Missing backend capability: write the contract in [CONTRACTS.md](CONTRACTS.md), never fake it.
