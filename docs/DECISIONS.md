---
covers: [src/content/source.ts, src/middleware.ts, next.config.ts, src/server/**]
status: rationale from code comments, commits and this change; human approvals noted where known (none recorded)
owner: unknown
source: git history, code comments, verification 2026-10-24
verified_at: fb315a0
verified_on: 2026-10-24
---
# Decisions

Items marked *inferred* were not confirmed by a human. A superseded decision is kept with its replacement.

1. **Site rebuilt as agent-first (2026-10-19, `2bf125c`).** Typed content sections render to HTML and markdown. *Inferred approval.*
2. **Bundled content as fallback.** The site renders if the database is unset, missing a page, or down.
3. **~60 s per-instance cache of page content**; publishing clears the local instance.
4. **Markdown twins via middleware rewrite**, with `Vary: Accept`.
5. **Server-side agent analytics**, because agents do not run JavaScript; humans counted by the browser tracker. Same-origin beacon so ad-blockers rarely drop it; actor type decided server-side.
6. **Hidden pages** `hub` and `drift` kept out of `PAGES` until launch.
7. **Permanent redirects** for retired help-era URLs.
8. **Own backend on Postgres, replacing hitman-api as content source** (branch `website-standalone`, merged in `4c392b6`). *Supersedes the earlier "content optionally from hitman-api" decision.* Production runs on Cloudflare Workers with Hyperdrive (`d7bb891`). The earlier doc claim of Cloudflare Pages is superseded.
9. **Generic typed `admin` table** rather than a table per concept; shapes enforced in code.
10. **Experiments by page versions with middleware rewrite**, results from first-party events, decision thresholds in code (`DECISION`). Autopilot proposes; the server's policy enforces limits.
11. **(2026-10-24, this change) Repository Markdown is the only knowledge source; admin edits open pull requests.** Reason: no second editable copy, review before effect, a fresh agent reads files. `knowledge_edit` rows are proposals and state tracking, never a content copy. Trade-off: an edit is effective only after merge and deploy.
12. **(2026-10-24) Knowledge bundled at build time with git blob shas** (`scripts/build-knowledge.mjs`) because the Workers runtime has no file system; the bundle defines "effective" and enables conflict detection against GitHub.
13. **(2026-10-24) Deterministic analyses, AI only for optional interpretation.** Mechanical facts (links, SEO, claims words, measurement health, experiment health, freshness) need no model; interpretation is separate, labelled unverified, and off when AI is not connected. No cost budget is needed beyond a daily run cap.
14. **(2026-10-24) Experiment launch requires hypothesis, review date and rollback plan; at most 2 tests run site-wide; the slot check uses a transaction-scoped advisory lock.** Reason: concurrent starts must not exceed the cap (verified with concurrent starts).
15. **(2026-10-24) Research claims lock via an atomic settings-row claim, not session advisory locks**, because pooled connections (Hyperdrive) may not keep session state.
16. **(2026-10-24) Cleanup:** removed unused dependencies `framer-motion`, `react-fast-marquee`, `react-intersection-observer`, `saas` (zero imports in `src`, config or scripts; `saas` looked like a typo of `sass`, which is kept) and `.windsurf/workflows/*` (described pages and Tailwind patterns that no longer exist). Kept: `lucide-react` (used), `sass` (SCSS imports), Tailwind and `src/scss` (legacy but used by the admin and root layout; removal needs a visual regression check), and `public/` images (no `src` reference, but their URLs may have external consumers, unverified). Simpler: 4 fewer dependencies (81 lines of lockfile), 2 stale agent-instruction files. Verified by typecheck and a production build.
