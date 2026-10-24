---
covers: [src/content/home.ts, src/content/site.ts, src/content/pages/*.ts]
status: implemented copy summarised; nothing approved by an owner; claims unverified unless noted
owner: unknown
source: src/content (read 2026-10-24), docs/research/competitors-2026-10-24.md
verified_at: fb315a0
verified_on: 2026-10-24
---
# Positioning

Reads from [VISION.md](VISION.md); does not repeat it. Everything here describes **what the site says today** plus clearly labelled proposals. A campaign for one audience must not redefine the product: put campaign targeting in its own section below, not in the core promise.

## Audiences and buying situations (implemented as page intent; not researched)
| Audience | Situation the copy assumes | Page | CTA today |
|---|---|---|---|
| API owner / developer with a coding agent | "My API docs are missing or stale and agents can't use my API" | `/`, `/mcp`, `/cli`, `/api-docs` | Copy prompt, Start free |
| Integrator / agent builder | "I want my agent to call a third-party API" | `/for/integrators` | Copy MCP install command, List your API |
| AI agent / crawler | Needs clean text | `/agents`, `.md` twins, `/llms.txt` | none (reads) |
| Team buyer | Needs plan and price | `/pricing`, `/white-label` | Start free |
Buyer roles, triggers and objections have **not** been researched or confirmed. Proposed work: interview 5 recent signups (owner: unknown).

## Category and alternatives
Self-described: "API documentation for people and agents". Real alternatives (researched, 2026-10-24, unverified summaries): agent-era docs platforms (Mintlify, ReadMe), spec-first tools (Redocly, Scalar, Swagger), general docs (GitBook), Postman, and substitutes (hand-written Docusaurus, raw OpenAPI + Swagger UI). Detail: [COMPETITORS.md](COMPETITORS.md).

## Core promise (implemented)
"Your agent writes the docs. Every agent can use them." One prompt turns code into docs, an MCP server and a CLI, kept in sync.

## Differentiators (implemented as copy; proposed as gaps, not approved)
1. Starts from code, no spec to write. 2. One prompt to many channels (docs, llms.txt, markdown, MCP, CLI). 3. Drift detection tied to code changes. 4. Agents report gaps; agent analytics. 5. A hub to give any documented API to an agent.
Competitor pages checked did not show #4 or #5, but absence on pages checked is not proof ([COMPETITORS.md](COMPETITORS.md)).

## Claim register
Status values: `verified` (evidence checked by a person, date given), `unverified` (stated in copy, no evidence recorded), `needs-owner`. **No claim is currently `verified`.** The Claims analysis in the admin also flags banned over-promising wording; it does not verify truth.
| Claim (where) | Evidence / authoritative source | Status |
|---|---|---|
| One prompt produces docs, MCP server and CLI (`home.ts` hero, steps) | Product behaviour in hitman-api / docstar-cli; not checked from this repo | unverified |
| Docs "never drift" (`home.ts` pillars) | Drift detection feature in product (hidden `drift` page exists) | unverified, strong wording |
| Agents report gaps; agent analytics (`home.ts`, `/analytics`) | Product feature; no evidence here | unverified |
| MSG91's API docs hosted on DocStar (`home.ts` markdown-twin section) | Third-party customer reference; needs permission/date | needs-owner |
| Free plan: 1 member, "unlimited pages", fair usage; Pro $25/mo with 10 members, +$5/user; Enterprise custom (`pricing.ts`, "word for word from the previous pricing page") | Billing system / product pricing | unverified against billing |
| "Works with" logos (`home.ts` works-with) | Integration list in product | unverified |
Rule: repeated facts (prices, limits) live in one content file; other pages link to it. The Claims analysis flags price-like figures outside `/pricing`.

## Message hierarchy (implemented, home)
1. Outcome headline. 2. One prompt, three steps. 3. Formats per reader. 4. Keeps up with the API. 5. Give any API to your agent. 6. Markdown twin proof. 7. FAQ. 8. Repeat CTA.

## Offer and CTAs
Primary: copy the prompt (agent does the work, visitor approves). Secondary: Start free (app login). CTA text, destination and onboarding must agree; the prompt's quickstart is `public/mcp/quickstart.md`.

## Campaign targeting
None defined. Add campaign-specific audience pages here or in `docs/campaigns/` with their own status.

## Proposals (not approved)
- Make the agent-feedback loop and agent analytics a lead differentiator if confirmed true by the product owner.
- Add a comparison page only with verified, dated competitor facts and an owner's go-ahead (see [COMPETITORS.md](COMPETITORS.md)).
