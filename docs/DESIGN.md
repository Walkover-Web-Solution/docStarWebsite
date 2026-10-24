---
covers: [src/components/site/**, src/components/admin/**, src/scss/*.scss, tailwind.config.js]
status: implemented direction ("Transcript"); voice rules observed from copy, not approved
owner: unknown
source: code and content
verified_at: fb315a0
verified_on: 2026-10-24
---
# Design

## Current system ("Transcript" direction)
Tokens are defined on `.ds-site` in `src/components/site/site.css`: `--bg`, `--ink`, `--muted`, `--lime`, `--lime-soft`, `--card`, `--border`, `--shadow`, `--radius`, `--max`. Look: off-white background, ink text, lime highlight, hard 1.5px ink borders with offset shadows. Fonts come from `src/components/site/fonts.ts` (Space Grotesk display, Inter sans, JetBrains Mono).

Rich text: `==word==` in content renders the lime highlight (`RichText`; stripped in markdown output).

## Components
- `Sections.tsx` exports one component per section type (Hero, WorksWith, Steps, Channels, Pillars, Hub, AgentReadable, Cards, Pricing, Prose, Faq, FinalCta).
- UI atoms in `src/components/site/ui/`: `CtaButton`, `RichText`, `RunLog`, `SectionHead`, `Markdown`.
- Styles are CSS modules: `sections.module.css`, `ui.module.css`, `chrome.module.css`.
- Each section root carries `data-section={key}`; analytics relies on it.

## Voice and terminology (observed in copy; approve before treating as rules)
Plain, direct sentences; the visitor's situation first ("Paste one prompt into your coding agent"); product nouns: "docs", "MCP server", "CLI", "agent", "markdown twin". Highlighting uses `==word==` on the phrase that carries the idea. Avoid: vague superlatives, manufactured urgency, the banned wording in `src/server/autopilot/policy.ts` (the Claims analysis flags it). Simulated demos (the "agent run" panels) are illustrations and must stay labelled as such.

## Accessibility and motion
Target WCAG 2.2 AA; **not audited**. Admin pills carry text labels (not colour only), forms have labels, sections use headings. Needs a keyboard, contrast and screen-reader pass on the public pages (OPEN_QUESTIONS; no tooling exists). Respect `prefers-reduced-motion` for any new motion.

## Admin look
Admin reuses the same tokens (`--a-*` aliases in `src/components/admin/admin.css`), calm cards, status pills with text (`components/admin/Ui.tsx`). No decorative charts: every block exists to prompt an action.

## Rules
- Put copy in content files, not JSX. Use existing section types before inventing one.
- New CTAs go through `CtaButton` so `data-cta` and `data-placement` are emitted.
- Scope website CSS under module classes or `.ds-site`.

## Legacy layers
`src/scss/*` (imported by the root layout) and Tailwind (`@import "tailwindcss"` in `src/scss/_global.scss`) predate the rebuild. Public site pages use CSS modules; the admin uses Tailwind utilities. The stale `.windsurf` workflows were removed (DECISIONS 16). Removing the legacy layers needs a visual regression check (OPEN_QUESTIONS Q7).

## SEO
Per page: title, description, keywords, canonical, markdown alternate link, OpenGraph, Twitter card (`generateMetadata`), JSON-LD `WebPage` (home: `SoftwareApplication`) and `FAQPage` when a faq section exists. Share image: `src/app/opengraph-image.tsx`. `src/app/not-found.tsx` is noindex.
