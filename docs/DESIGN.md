---
covers: [src/components/site/**, src/app/(site)/layout.tsx, src/scss/*.scss, tailwind.config.js, lighthouserc.json]
verified_at: 00fd0e7
verified_on: 2026-11-08
---
# Design

## Current system ("Transcript" direction)
Tokens are defined on `.ds-site` in `src/components/site/site.css`: `--bg`, `--ink`, `--muted`, `--rule`, `--lime`, `--lime-soft`, `--card`, `--border`, `--shadow-sm`/`--shadow`/`--shadow-lg`, `--radius`/`--radius-lg`, `--gutter` (16px, 24px from 720px), `--max`. Look: off-white background, ink text, lime highlight, hard 1.5px ink borders with offset shadows. Fonts come from `src/components/site/fonts.ts` (Space Grotesk display, Inter sans, JetBrains Mono).

Rich text: `==word==` in content renders the lime highlight (`RichText`; stripped in markdown output).

No brand-voice or design-philosophy document beyond this exists in the repo; `docs/guidance/website.md` gives the default style.

## Components
- `Sections.tsx` exports one component per section type: Hero, WorksWith, Steps, Channels, Pillars, Hub, AgentReadable, Faq, FinalCta, Cards, Pricing, Prose, Table, Changelog, Tool. `SectionRenderer.tsx` switches on all 15.
- UI atoms in `src/components/site/ui/`: `Breadcrumbs`, `CtaButton`, `Markdown`, `RichText`, `RunLog`, `SectionHead`.
- Interactive tools: `src/components/site/tools/LlmsChecker.tsx` (the `tool` section).
- Chrome: `SiteChrome.tsx` (`SkipLink`, `SiteNav`, `SiteFooter`).
- Styles are CSS modules: `sections.module.css`, `ui.module.css`, `chrome.module.css`, `tools.module.css`.
- Each section root carries `data-section={key}`; analytics relies on it.

## Accessibility (as implemented)
- Skip link to `<main id="main">` in `src/app/(site)/layout.tsx`.
- Visible focus: `.ds-site :focus-visible` draws a 2px ink outline.
- Reduced motion: `prefers-reduced-motion` stops the caret and `ui.module.css` animations.
- Lighthouse budgets in CI (`lighthouserc.json`): accessibility ≥ 0.95, performance ≥ 0.9, best practices ≥ 0.95, SEO = 1, CLS ≤ 0.1 on eight key pages. No manual keyboard or screen-reader test is recorded.

## Rules
- Put copy in content files, not JSX. Use existing section types before inventing one.
- New CTAs go through `CtaButton` so `data-cta` and `data-placement` are emitted.
- Scope website CSS under module classes or `.ds-site`.

## Legacy layers (admin only)
`src/scss/*` and Tailwind (`tailwind.config.js`) predate the rebuild and are imported only by `src/app/admin/layout.tsx` ([DECISIONS.md](DECISIONS.md) 15). Website pages never load them. The `.windsurf/workflows/*` files describe the old framer-motion Tailwind pages and are stale. See [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md).

## SEO
Head tags, JSON-LD and share images are described in [ARCHITECTURE.md](ARCHITECTURE.md) "Search and agent outputs" (`src/lib/seo.ts`, `/og/<slug>.png`). FAQs are visible content only, with no FAQPage markup ([DECISIONS.md](DECISIONS.md) 10).
