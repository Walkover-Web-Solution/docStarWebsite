---
description: Apply modern design pattern to feature pages
---

# Modern Design Pattern for Feature Pages

This workflow documents the modern design pattern used across DocStar feature pages. Use this guide to apply consistent, premium styling to new or existing pages while maintaining the project's theme and content.

## Design Principles

- **Theme Consistency**: Always use CSS variables `[var(--theme-bg)]`, `[var(--theme-color)]`, `theme-bg-secondary`, and `theme-border`
- **Content Preservation**: Never change the actual content—only the presentation/design
- **Modern Aesthetics**: Premium cards, gradient text, floating elements, and smooth animations
- **Responsive Design**: Mobile-first approach with responsive breakpoints

## Required Imports

```tsx
"use client";

import { motion } from "framer-motion";
import {
  // Feature-specific icons from lucide-react
  ArrowRight,
  Terminal,
  // ... other icons
} from "lucide-react";
import Link from "next/link";
```

## Key Components

### 1. TerminalWindow Component

Add this reusable component for displaying code snippets in a Mac-style terminal:

```tsx
const TerminalWindow = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={`rounded-xl overflow-hidden border theme-border shadow-2xl bg-[#0d1117] ${className}`}>
    <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-gray-800">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
      </div>
      <div className="mx-auto text-xs font-mono text-gray-500 flex items-center gap-2">
        <Terminal className="w-3 h-3" />
        {title}
      </div>
    </div>
    <div className="p-5 font-mono text-sm text-gray-300 overflow-x-auto leading-relaxed">
      {children}
    </div>
  </div>
);
```

**Important**: When using curly braces in JSX content, escape them as `{\"{\"}` and `{\"}\"}`

## Section Patterns

### Hero Section

```tsx
<div className="relative min-h-[75vh] flex items-center border-b theme-border overflow-hidden">
  <div className="absolute inset-0 theme-bg-secondary">
    {/* Subtle Grid Background */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] to-transparent"></div>
  </div>

  {/* Floating elements */}
  <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--theme-color)]/10 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-20 left-10 w-96 h-96 bg-[accent-color]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

  <div className="container mx-auto px-4 sm:px-6 relative z-10">
    <div className="grid lg:grid-cols-2 gap-12 items-center pt-20 pb-16">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border theme-border mb-6 bg-[var(--theme-bg)] shadow-sm backdrop-blur-md">
          <Icon className="w-4 h-4 text-[var(--theme-color)]" />
          <span className="text-xs font-semibold tracking-wide uppercase">
            Feature Name
          </span>
        </div>

        <h1 className="h1 mb-6 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-[var(--theme-color)] to-[accent-color]">
            Feature Title
          </span>
        </h1>

        <p className="text-base sm:text-lg opacity-70 mb-8 leading-relaxed max-w-xl">
          Feature description text
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="https://app.docstar.io/login"
            target="_blank"
            className="btn btn-primary shadow-lg shadow-[var(--theme-color)]/20"
          >
            CTA Text
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </motion.div>

      {/* Hero Visual with Terminal */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative hidden lg:block"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-[accent-color]/20 rounded-2xl transform rotate-3 scale-105 blur-xl"></div>
        <TerminalWindow title="filename.md" className="relative z-10 transform -rotate-2 hover:rotate-0 transition-all duration-500">
          {/* Code content */}
        </TerminalWindow>
        
        {/* Floating Badge */}
        <div className="absolute -bottom-6 -left-6 p-4 rounded-xl theme-bg-secondary border theme-border shadow-xl flex items-center gap-4 z-20 animate-bounce" style={{ animationDuration: '3s'}}>
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider">Status</p>
            <p className="text-sm font-medium opacity-80">Status Text</p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</div>
```

### Feature Cards Section

```tsx
<div className="py-16 md:py-24 relative">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-border-color)]/20 to-transparent"></div>
  
  <div className="relative z-10 px-4 sm:px-6">
    <div className="text-center mb-16">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[accent-color]/10 text-[accent-color] mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
        Section Title
      </h2>
      <p className="text-base md:text-lg opacity-60 max-w-2xl mx-auto">
        Section description
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-[accent-color]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
            <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 leading-tight">
              {feature.title}
            </h3>
            <p className="text-sm opacity-70 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</div>
```

### Premium Glowing Card (Benefits Section)

```tsx
<div className="py-16 md:py-24 px-4 sm:px-6">
  <div className="max-w-4xl mx-auto relative group">
    <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)] to-[accent-color] rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
    
    <div className="relative p-8 md:p-12 rounded-3xl bg-[var(--theme-bg)] border theme-border overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Icon className="w-48 h-48" />
      </div>
      
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-[var(--theme-color)]" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold">Section Title</h3>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-4 relative z-10">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-4 p-4 rounded-xl theme-bg-secondary border theme-border hover:-translate-y-1 transition-transform duration-300 shadow-sm">
            {benefit.icon}
            <div className="flex-1">
              <p className="text-sm font-medium opacity-90 leading-relaxed">{benefit.title}</p>
              <p className="text-xs opacity-60 mt-1 leading-relaxed">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
```

### CTA Section

```tsx
<div className="py-16 md:py-24 relative overflow-hidden">
  <div className="absolute inset-0 theme-bg-secondary"></div>
  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--theme-bg)]"></div>

  <div className="relative px-4 sm:px-6 text-center z-10 max-w-3xl mx-auto">
    <div className="inline-flex justify-center items-center w-16 h-16 rounded-2xl bg-[var(--theme-color)]/10 text-[var(--theme-color)] mb-6 shadow-xl shadow-[var(--theme-color)]/20">
      <Icon className="w-8 h-8" />
    </div>

    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
      CTA Headline
    </h2>

    <p className="text-lg opacity-70 mb-10 leading-relaxed">
      CTA description text
    </p>

    <button
      className="btn btn-primary px-8 py-4 text-lg shadow-2xl shadow-[var(--theme-color)]/30 hover:scale-105 transition-transform"
      onClick={() => {
        window.open("https://app.docstar.io/login");
      }}
    >
      CTA Button Text
      <ArrowRight className="w-5 h-5 ml-2" />
    </button>
  </div>
</div>
```

## Color Accents by Page

Use these accent colors for gradient effects to maintain visual variety:

- **GithubWorkflowClient**: Blue (`to-blue-500`)
- **AIPoweredSearchClient**: Blue (`to-blue-500`)
- **ApiPlayground**: Blue (`to-blue-500`)
- **CollaborateContent**: Orange (`to-orange-500`)
- **EditViaLink**: Purple (`to-purple-500`)
- **CustomDomainClient**: Cyan (`to-cyan-500`)
- **FAQGeneratorClient**: Pink (`to-pink-500`)

## Typography Guidelines

- **Headings**: Use `h1` class for main hero, `text-3xl md:text-4xl font-semibold` for section headers
- **Descriptions**: Use `text-base md:text-lg opacity-70` for paragraph text
- **Card Titles**: Use `text-xl font-bold` for card headings
- **Card Descriptions**: Use `text-sm opacity-70` for card body text

## Animation Patterns

- **Fade In**: `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}`
- **Slide Left**: `initial={{ opacity: 0, x: -30 }}` → `whileInView={{ opacity: 1, x: 0 }}`
- **Slide Right**: `initial={{ opacity: 0, x: 30 }}` → `whileInView={{ opacity: 1, x: 0 }}`
- **Stagger**: Add `delay: index * 0.1` for sequential animations
- **Viewport**: Always use `viewport={{ once: true }}` for scroll-triggered animations

## Common Tailwind Classes

### Borders & Backgrounds
- `theme-border` - Themed border color
- `theme-bg` - Primary background
- `theme-bg-secondary` - Secondary background
- `[var(--theme-bg)]` - CSS variable background
- `[var(--theme-color)]` - CSS variable accent color

### Spacing
- `py-16 md:py-24` - Vertical padding for sections
- `px-4 sm:px-6` - Horizontal padding for containers
- `gap-6` - Grid gap for cards
- `mb-16` - Margin bottom for section headers

### Effects
- `shadow-xl` - Large shadow
- `shadow-2xl` - Extra large shadow
- `blur-xl` - Blur effect for glowing backgrounds
- `backdrop-blur-md` - Backdrop blur for overlays

### Transitions
- `transition-all duration-300` - Smooth transitions
- `hover:-translate-y-1` - Lift on hover
- `hover:scale-110` - Scale on hover
- `group-hover:opacity-100` - Reveal on group hover

## Checklist for New Pages

- [ ] Add required imports (motion, lucide-react icons, Link)
- [ ] Add TerminalWindow component
- [ ] Create hero section with floating elements and terminal visual
- [ ] Add feature cards section with gradient glows
- [ ] Add premium glowing card for benefits/features
- [ ] Add modern CTA section
- [ ] Use theme CSS variables throughout
- [ ] Apply framer-motion animations
- [ ] Test responsive behavior
- [ ] Verify content is preserved
