# Competitor research: API documentation for people and agents

Checked: 2026-10-24. Status of every entry: research_candidate (not approved strategy).
Method: WebFetch of official product, docs, pricing and GitHub pages. WebFetch summarises pages with a small model, so figures are as reported by that summary; re-verify before publishing any comparison. Quotes are short phrases only.
"Not found on pages checked" means exactly that, not absence.

DocStar baseline (from `src/content/home.ts`, `site.ts`; current copy, not approved strategy): code-to-docs by a coding agent from one prompt, no OpenAPI file required; outputs docs site, llms.txt/llms-full.txt, markdown twins, hosted MCP server, CLI, OpenAPI; drift detection via GitHub app; agent analytics; white-label.

## Summary table

| Name | Category | Overlap | Entry price seen |
|---|---|---|---|
| Mintlify | direct | Highest: agent-era docs platform | Starter $0; Pro $450/mo annual |
| ReadMe | direct | API docs + MCP + llms.txt + CLI | Starter $0; Pro $250/mo annual |
| GitBook | indirect-to-direct | Docs for people and AI, API docs solution | Free $0; Essential $65/site/mo + $12/user |
| Redocly | direct | OpenAPI-based docs, MCP, CLI, agent-readiness | Pro $249/mo (30-day trial, no free tier) |
| Scalar | direct | OpenAPI docs + hosted MCP | Free $0; Pro $150/mo |
| Postman | indirect | Publishes docs from collections/specs; MCP server product | Free $0 (docs on every plan) |
| Swagger (Studio/Portal/SwaggerHub) | indirect | Spec-first design and docs portal | Not stated on pages checked |
| Stoplight | indirect (status uncertain) | Design-first, interactive docs | Basic $44/mo annual |
| Docusaurus / static generators | substitute | Hand-written docs | Open source (MIT) |
| Raw OpenAPI + Swagger UI | substitute | Free rendered reference | Open source (Apache 2.0) |

No competitor was dropped. Stoplight is kept but flagged low relevance (see section).

---

## Mintlify
- URL: https://www.mintlify.com (category: direct)
- Audience/use case: startups, enterprises, developer docs and DevRel teams; docs that serve agents and people.
- Positioning: "The documentation platform for agents"; "Self-updating documentation".
- Agent capabilities seen on official pages: llms.txt and llms-full.txt auto-hosted at root and `/.well-known/`; per-page `.md` URLs; `Link` and `X-Llms-Txt` headers (https://www.mintlify.com/docs/ai/llmstxt). Pricing page lists an MCP server on the free Starter plan. CLI: not found on pages checked (homepage).
- Pricing (https://www.mintlify.com/pricing, 2026-10-24): Starter $0 (up to 5 editor seats, no AI credits; includes custom domain, API playground, Git sync, MCP server); Pro $450/mo annual or $540/mo monthly, 10,000 credits/mo, overage $0.01/credit; Enterprise custom. 14-day Pro trial. OSS and startup programs.
- Could not verify: whether Mintlify generates docs from code with no spec; MCP server details beyond pricing line; CLI.
- Observation: Mintlify headlines agents as the reader and auto-hosts llms.txt, markdown and MCP.
- Interpretation: closest head-on competitor on messaging; DocStar's "agent writes the docs from code" and CLI-from-API may be the differentiators, if Mintlify does not match them.
- Recommendation: verify Mintlify's code-to-docs and CLI claims before any comparison page.

## ReadMe
- URL: https://readme.com (direct)
- Audience: API product teams, DX leads, technical writers; enterprise buyers (SSO, audit logs).
- Positioning: docs "that developers love and AI agents can read".
- Agent capabilities seen: reader-facing MCP server at `<project>.readme.io/mcp` (OpenAPI tools on all plans; docs search/fetch tools need the AI Booster Pack); llms.txt; clean Markdown for agents (https://docs.readme.com/main/docs/mcp). Homepage describes an agent with read/write access to docs, and a rebuilt CLI that also syncs OpenAPI.
- Pricing (https://readme.com/pricing, 2026-10-24): Starter $0 (1 project, 1 version, 1 admin); Pro $250/mo annual (1 project, unlimited versions, 5 admins, extra admins $20); Enterprise custom. Ask AI add-on $150/mo. Trial length not stated.
- Could not verify: AI Booster Pack price; whether llms.txt is automatic.
- Observation: ReadMe covers MCP, llms.txt, markdown and CLI on official pages.
- Interpretation: the "docs + MCP + CLI" bundle is not unique to DocStar.
- Recommendation: differentiate on source of truth (code via agent) and drift, not on channel count.

## GitBook
- URL: https://www.gitbook.com (indirect, drifting direct)
- Audience: public docs, help centers, knowledge bases, API docs; OSS, startups, regulated enterprise.
- Positioning: "The docs platform that flags outdated content. Then fixes it."; "for both people and AI".
- Agent capabilities seen: GitBook MCP listed as a feature (homepage); `.md` per page or `Accept: text/markdown`, `llms-full.txt`, `sitemap.md`, ask-parameter question interface (https://gitbook.com/docs/publishing-documentation/llms.txt, which is itself a 404; the content came from the page served). llms.txt index and CLI: not found on pages checked.
- Pricing (https://www.gitbook.com/pricing, 2026-10-24, annual): Free $0 (1 user); Essential $65/site/mo + $12/user/mo; Ultimate $249/site/mo + $12/user/mo; Enterprise custom. AI credit packs from $47.50.
- Could not verify: depth of OpenAPI/API-reference features.
- Observation: GitBook's drift/stale-content pitch overlaps DocStar's "Never drifts" pillar.
- Interpretation: drift claims are contested ground; DocStar's differentiator is repo/PR-linked drift on API code.
- Recommendation: be specific (route/param/response changes linked to the PR).

## Redocly
- URL: https://redocly.com (direct)
- Audience: API teams and platform teams with OpenAPI descriptions in git; governance.
- Positioning: "Does AI know how to use your product?"; "Find the gaps before an agent does."
- Agent capabilities seen: generated Docs MCP server with RBAC and optional public endpoint (https://redocly.com/docs/realm/config/mcp); Redocly CLI (lint, bundle, score, respect). llms.txt: not found on pages checked.
- Pricing (https://redocly.com/pricing, 2026-10-24): no free tier listed; 30-day Pro trial; Pro $249/mo ($2,988/yr, 3 projects); Scale $729/mo ($8,748/yr, 10 projects, SSO); Enterprise custom. AI features beta, not yet billed.
- Could not verify: llms.txt support (a docs page 404ed: https://redocly.com/docs/realm/mcp).
- Observation: spec-first; requires an API description.
- Interpretation: DocStar's no-OpenAPI-needed path targets teams without a clean spec.
- Recommendation: position as complementary for spec-less codebases; verify before claiming superiority.

## Scalar
- URL: https://scalar.com (direct)
- Audience: API developers wanting standards-based OpenAPI docs, SDKs, MCP.
- Positioning: "Make APIs agents will love with best in class Docs, SDKs & MCP Servers".
- Agent capabilities seen: hosted MCP server (homepage, pricing). Open-source repo (MIT) lists a CLI and an MCP Registry (https://github.com/scalar/scalar). llms.txt: not found on pages checked. https://docs.scalar.com redirected to a dashboard page with no content.
- Pricing (https://scalar.com/pricing, 2026-10-24): Free $0 (3 APIs, no custom domain/Git sync); Pro $150/mo or $125/mo yearly (hosted MCP, custom domain, Git sync); Business $600/mo or $500/mo yearly; Enterprise custom. 7-day trial; publishing docs requires a paid plan after trial. 1 credit = 200 MCP tool calls.
- Could not verify: llms.txt; docs-site details.
- Observation: free OSS renderer plus paid hosting and MCP.
- Interpretation: strong with developers who already have OpenAPI.
- Recommendation: note OSS goodwill; avoid price-only comparisons.

## Postman (API documentation / publishing)
- URL: https://www.postman.com/api-platform/api-documentation/ (indirect)
- Audience: teams already using Postman collections; public API network publishers.
- Positioning: MCP Server "Give API context to your AI agents"; docs generated from OpenAPI 3.0 or collections and kept current.
- Agent capabilities seen: Postman MCP Server and CLI (navigation, page copy); page footer notes a clean markdown version of the page for agents. llms.txt: not found on pages checked.
- Pricing (https://www.postman.com/pricing/, 2026-10-24): Free $0; Solo $9/mo annual; Team $19/user/mo annual; Enterprise contact. Docs publishing on every plan; Free docs carry Postman branding; custom domains Solo and up.
- Could not verify: Free plan AI credits (page says both 100 and 50); last ~52k characters of pricing page unread; whether the Postman MCP server serves published docs to consumers or manages workspaces.
- Observation: Postman's agent products centre on testing and API context, docs are one feature.
- Interpretation: strong incumbent for collection-based teams; weak match for "docs from code".
- Recommendation: treat as the import source (DocStar already imports Postman files) more than a rival.

## Swagger / SwaggerHub (SmartBear)
- URL: https://swagger.io/tools/swaggerhub/ (indirect)
- Audience: enterprises designing and governing APIs from specs.
- Positioning: "Build and govern APIs built for humans and agents."
- Agent capabilities seen: Studio offers MCP server creation; Portal docs can be generated using MCP tools, markdown-style rendering. llms.txt and CLI: not found on pages checked.
- Pricing: https://swagger.io/pricing/ was 404; https://swagger.io/tools/swaggerhub/pricing/ (2026-10-24) listed no plan names or prices. Not verified.
- Could not verify: SwaggerHub's current status versus Studio/Portal; any price.
- Observation: positioning now names Studio and Portal; SwaggerHub appears only as a login link.
- Interpretation: legacy enterprise spec-first suite; low overlap with small teams.
- Recommendation: low priority; recheck pricing via sales page.

## Stoplight
- URL: https://stoplight.io (indirect, low relevance, status uncertain)
- Positioning: "Design, document, and build APIs faster."
- Status: homepage shows a SmartBear acquisition headline, footer "2026 SmartBear Software"; ongoing sales not explicitly confirmed.
- Agent capabilities: llms.txt, MCP, CLI not found on pages checked.
- Pricing (https://stoplight.io/pricing, 2026-10-24, annual per month): Basic $44 (3 users), Startup $113 (8 users), Pro Team $362 (15 users), Enterprise custom; 14-day trials. Free plan unclear.
- Observation: no agent-facing features seen; owned by SmartBear.
- Interpretation: overlap shrinking; kept only as a design-first reference.
- Recommendation: do not feature in comparisons without re-verifying status.

## Docusaurus and static-site generators (substitute)
- URL: https://docusaurus.io (substitute)
- What it is: static site generator for docs in MDX/React, versioning, i18n, Algolia search; MIT (https://github.com/facebook/docusaurus).
- Overlap: teams hand-writing Markdown docs; the "do nothing / DIY" alternative.
- Agent capabilities: llms.txt, MCP, AI, OpenAPI plugin not found on pages checked (core). Third-party plugins not checked.
- Pricing: software free (MIT); hosting and maintenance effort not priced.
- Observation: no built-in sync with code.
- Interpretation: the real rival is neglect (docs go stale) plus engineering time.
- Recommendation: message against stale hand-written docs, not against Docusaurus.

## Raw OpenAPI file + Swagger UI (substitute)
- URL: https://swagger.io/tools/swagger-ui/ (substitute)
- What it is: open-source (Apache 2.0, https://github.com/swagger-api/swagger-ui) UI generated from an OpenAPI 2.0/3.x file, with try-it-out.
- Agent capabilities: not found on pages checked.
- Pricing: free; Swagger Studio can host it (price unverified).
- Observation: needs a maintained spec.
- Interpretation: many teams stop here; DocStar's OpenAPI output and import make it a superset.
- Recommendation: pitch "no spec to hand-maintain".

---

## Source URLs (all fetched 2026-10-24 unless noted)
OK: https://www.mintlify.com ; https://www.mintlify.com/pricing ; https://www.mintlify.com/docs/ai/llmstxt ; https://readme.com ; https://readme.com/pricing ; https://docs.readme.com/main/docs/mcp ; https://www.gitbook.com ; https://www.gitbook.com/pricing ; https://stoplight.io ; https://stoplight.io/pricing ; https://redocly.com ; https://redocly.com/pricing ; https://redocly.com/docs/realm/config/mcp ; https://scalar.com ; https://scalar.com/pricing ; https://github.com/scalar/scalar ; https://www.postman.com/api-platform/api-documentation/ ; https://www.postman.com/pricing/ (partial, truncated) ; https://swagger.io/tools/swaggerhub/ ; https://swagger.io/tools/swaggerhub/pricing/ ; https://swagger.io/tools/swagger-ui/ ; https://github.com/swagger-api/swagger-ui ; https://docusaurus.io ; https://github.com/facebook/docusaurus ; https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs
Failed or empty: https://swagger.io/pricing/ (404) ; https://redocly.com/docs/realm/mcp (404) ; https://gitbook.com/docs/publishing-documentation/llms.txt (404, though a response content was summarised, treat as unreliable) ; https://docs.scalar.com/ (301 to dashboard, empty content) ; https://dashboard.scalar.com/docs (no content)
Note: no WebSearch was used; all data comes from direct fetches.

## Contradictions and unknowns
- Postman Free AI credits: page text says 100 and table says 50/month; unresolved. Pricing page partly unread.
- GitBook: the llms.txt URL returned 404 yet the fetch summary described markdown/llms-full.txt features; confirm on a live GitBook site.
- Stoplight: acquisition headline versus "closed" footer; ongoing availability unconfirmed.
- Swagger: no pricing on pages checked; SwaggerHub status unclear.
- Mintlify: MCP only seen on the pricing page and a header reference; no MCP product page read.
- Redocly and Scalar llms.txt: not found on pages checked (not evidence of absence).
- Any CLI claim for Mintlify, GitBook, Postman (CLI exists but is Postman-platform CLI, not docs-to-commands): not compared like for like with docstar-cli.
- Prices are list prices as summarised; taxes, discounts, usage overages vary. Pages were not checked in a logged-out vs logged-in state.
- Not covered: customer/market share data, review sites, how competitors rank for relevant searches.

## Positioning gaps (hypotheses, not approved)
1. Code-first, no spec: most competitors seen start from OpenAPI, Markdown or collections. A coding agent reading routes may be unique, but Mintlify's "self-updating" and ReadMe's agent editing are close; verify.
2. One prompt to all channels (docs, llms.txt, MCP, CLI, OpenAPI): competitors each cover subsets on official pages; the full bundle plus CLI-from-API was not seen elsewhere on pages checked.
3. Drift tied to the causing PR: GitBook claims stale-content fixes; the repo-and-PR link is DocStar-specific in current copy.
4. Agent feedback loop and agent analytics (agents file gaps via MCP): not found on competitor pages checked.
5. Consumer-side hub ("give any API to your agent", docstar MCP): no equivalent seen, though Postman's MCP server catalog is adjacent.
6. Pricing: the free tier of Mintlify (with MCP) and Scalar/ReadMe free plans set expectations; DocStar's pricing page should be compared before claiming value.
