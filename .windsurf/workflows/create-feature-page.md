---
description: Create a highly engaging, modern, and beautiful feature landing page.
---

When the user asks you to "create a new feature page", "revamp a page", or "make a landing page like the GitHub Actions integration page", assume the persona of an elite UX/UI frontend engineer. Your goal is to build a highly engaging, modern, premium landing page that matches our highest quality visual standards.

Follow these prompt instructions strictly:

## 1. Architecture
- Split the page into two files: a Server Component (`page.tsx`) for SEO/metadata using `FeatureSchema`, and a Client Component (`[FeatureName]Client.tsx`) with `"use client"` for all UI, `framer-motion` animations, and `lucide-react` icons.

## 2. The Premium Design System
Do not build basic, boring pages with simple text and boxes. Inject movement, depth, and technical elegance using these techniques:

### Hero Section
- Make it at least `min-h-[75vh]` to feel grand.
- **Backgrounds:** Use subtle CSS noise textures (`mix-blend-overlay`) and large, absolute floating orbs (`blur-3xl animate-pulse`) in theme colors (e.g., `var(--theme-color)` or blue/emerald) to create a glowing atmosphere.
- **Typography:** Add a pill-shaped badge above the main headline. Use text gradients (`bg-clip-text text-transparent bg-gradient-to-r`) for emphasis words in the `h1`.
- **Right-side Visual:** Never leave the hero empty. Always include a 3D-tilted visual hook (`transform rotate-3 scale-105`)—such as an abstract representation of the feature, a dashboard card, or a terminal window, combined with overlapping floating status badges.

### Bento Box & Dynamic Layouts
- **Break the Grid:** Do not default to a basic 3-column or 4-column card grid. Use alternating left-right zigzag layouts or a Bento Box approach (`grid-cols-12` spanning different column widths).
- **Interactive Cards:** Give cards premium hover states. Translate them slightly on hover (`hover:-translate-y-1`) and add glowing drop shadows (`shadow-[0_0_30px_...]`). 
- **Hidden Glows:** Place an absolute gradient div behind the card content with `opacity-0 group-hover:opacity-100 blur-xl transition-opacity` so the card "lights up" when hovered.

### Technical & Developer UI (Mac-Style Terminals)
- If displaying code, workflows, or technical steps, **do not use plain `<pre>` or `<code>` blocks**.
- Build a custom "Mac-Style Terminal Window" container with a top header containing the red, yellow, and green window control dots.
- Give the terminal container a dark background (`bg-[#0d1117]`) and deep shadows.
- Fake an IDE syntax highlighter by using inline spans with specific text colors (e.g., pink for keys, green for commands, blue for values, gray for comments).

### Feature Highlights & Deep Sections
- Use giant watermark icons in the background of feature sections (e.g., an absolute `lucide-react` icon at `opacity-10`).
- Create seamless section transitions using subtle border gradients (`bg-gradient-to-b from-[var(--theme-border-color)] to-transparent`).

### The Skewed CTA Footer
- Give the final Call-To-Action section visual separation by applying a skewed overlay background (`transform -skew-y-2`).
- Center the typography, make it large, and use a primary button that scales up slightly on hover.

## 3. General Styling Rules
- **Theming:** Strictly use the project's CSS variables for colors: `[var(--theme-bg)]`, `[var(--theme-color)]`, `theme-bg-secondary`, `theme-border`.
- **Typography & Icons:** Use `lucide-react` extensively. Make description text slightly faded (`opacity-70`) to establish clear typographic hierarchy.
- **Animations:** Wrap major sections or hero elements in `framer-motion` `<motion.div>` tags for smooth fade-in and slide-up entrance animations (`initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}`).