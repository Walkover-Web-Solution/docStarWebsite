---
covers: [docs/research/competitors-2026-10-24.md, src/content/competitors.seed.json]
status: research candidates only; none confirmed by an owner
owner: unknown (who may confirm or drop competitors: see OPEN_QUESTIONS Q3)
source: official product, docs and pricing pages fetched 2026-10-24 (summaries by a small model; figures need re-verification before public use)
verified_at: fb315a0
verified_on: 2026-10-24
---
# Competitors

Canonical list of who matters and why. The editable **watchlist** (status, review cadence, source-change checks) lives in the admin under Research; dated detail and sources are in [research/competitors-2026-10-24.md](research/competitors-2026-10-24.md). This file records conclusions and uncertainty, not pricing tables: pricing is volatile, so read it from the report with its date.

Rules: "not found on pages checked" never means "absent". No public comparison page is built from this without verified, current facts and an owner's go-ahead. Observation, interpretation and recommendation are separated below.

## Candidates (all `research_candidate`, checked 2026-10-24)
| Name | Category | Why it matters (interpretation) | Biggest uncertainty |
|---|---|---|---|
| Mintlify | direct | Closest message overlap: docs "for agents", llms.txt/markdown/MCP seen on official pages | code-to-docs without a spec; CLI |
| ReadMe | direct | API docs with MCP, llms.txt and CLI on official pages: the bundle is not unique to DocStar | whether llms.txt is automatic |
| Redocly | direct | OpenAPI docs with MCP and agent-readiness | llms.txt; some doc URLs 404 |
| Scalar | direct | Low price, open-source-backed, hosted MCP | docs site was empty to the fetcher |
| GitBook | indirect | Contests "docs never drift" (stale-content flagging) | API reference depth |
| Postman (docs) | indirect | Incumbent, MCP server product, import source | free AI credits stated two ways |
| Swagger / SwaggerHub | indirect | Enterprise spec-first suite | pricing page 404; product status |
| Stoplight | indirect | Low agent focus seen; overlap shrinking | ownership and availability |
| Docusaurus / static generators | substitute | The real rival is stale hand-written docs | plugins not assessed |
| OpenAPI file + Swagger UI | substitute | Free path for teams with a maintained spec | hosted options |
Doing nothing (no docs, or docs in a README/wiki) is also a substitute; no evidence has been gathered for it.

## Observations the research supports (see report for sources)
Several direct competitors publish llms.txt, markdown pages and an MCP server on official pages. Most start from OpenAPI, Markdown or collections.

## Hypotheses, not approved strategy
Differentiation candidates: code-first with no spec; one prompt to every channel including a CLI; drift tied to the causing change; agent feedback and agent analytics; a hub to give any API to an agent. Each is a claim to verify in the product and against competitors before use ([POSITIONING.md](POSITIONING.md)).

## Operating
- Watchlist, cadence (default 7 days) and scope: admin > Research. A check fetches each listed page and records status, title and a text hash. Hash changes also fire on dynamic pages, so a "changed" flag means "look", not "they changed their offer".
- A person or agent reads changed sources, updates this file and the report with date and source, and records any positioning consequence in DECISIONS.
- Confirming a candidate, dropping one, or adding a competitor is an owner decision (the admin records who confirmed).
