---
covers: [src/components/site/**, src/scss/*.scss, tailwind.config.js]
verified_at: b8f8ce7
verified_on: 2026-11-04
---
# Design

## Current system ("Transcript" direction)
Tokens are defined on `.ds-site` in `src/components/site/site.css`: `--bg`, `--ink`, `--muted`, `--lime`, `--lime-soft`, `--card`, `--border`, `--shadow`, `--radius`, `--max`. Look: off-white background, ink text, lime highlight, hard 1.5px ink borders with offset shadows. Fonts come from `src/components/site/fonts.ts` (Space Grotesk display, Inter sans, JetBrains Mono).

Rich text: `==word==` in content renders the lime highlight (`RichText`; stripped in markdown output).

## Components
- `Sections.tsx` exports one component per section type (Hero, WorksWith, Steps, Channels, Pillars, Hub, AgentReadable, Cards, Pricing, Prose, Faq, FinalCta).
- UI atoms in `src/components/site/ui/`: `CtaButton`, `NoteLink`, `RichText`, `RunLog`, `SectionHead`, `Markdown`.
- `NoteLink` is the quiet link: a plain `<a href>` (no `rel`), muted, 14.5px, underlined, under the hero CTAs (`hero.note`) and at the end of a FAQ answer (`faq.items[].link`). It is never a button, and inherits the section's alignment; the ink hero lightens it to its light-on-dark colour.
- Styles are CSS modules: `sections.module.css`, `ui.module.css`, `chrome.module.css`.
- Each section root carries `data-section={key}`; analytics relies on it.

## Rules
- Put copy in content files, not JSX. Use existing section types before inventing one.
- New CTAs go through `CtaButton` so `data-cta` and `data-placement` are emitted.
- Scope website CSS under module classes or `.ds-site`.

## Legacy layers (not used by site pages)
`src/scss/*` (imported by the root layout) and Tailwind (`@import "tailwindcss"` in `src/scss/_global.scss`, `tailwind.config.js`) predate the rebuild. No `.tsx` file in `src` uses Tailwind classes at this commit. The `.windsurf/workflows/*` files describe the old framer-motion Tailwind pages and are stale. See [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md).

## SEO
Per page: title, description, keywords, canonical, markdown alternate link, OpenGraph, Twitter card (`generateMetadata`), JSON-LD `WebPage` (home: `SoftwareApplication`) and `FAQPage` when a faq section exists. Share image: `src/app/opengraph-image.tsx`. `src/app/not-found.tsx` is noindex. An A/B variant uses the live page's title and meta description; its sections can differ.
