import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Cog, Users, Wrench, Handshake, LifeBuoy, LayoutGrid, SunMedium, SlidersHorizontal, CalendarDays, FileText, Tag, Code, Layout, Briefcase } from 'lucide-react'

type Tab = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  // Per-tab preview image and tags
  preview: { src: string; alt: string }
  tags: string[]
}

// const TABS: Tab[] = [
//   {
//     id: "eng",
//     label: "Engineering",
//     icon: Wrench,
//     preview: {
//       // Using the provided image as a demo preview
//       src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8appL3Yw6iIlyrOiCgT8fH48lCwI81.png",
//       alt: "Engineering documentation template preview",
//     },
//     tags: ["Technical documentation", "Project documentation", "QA Template", "Software documentation"],
//   },
//   {
//     id: "hr",
//     label: "HR",
//     icon: Users,
//     preview: {
//       src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600&auto=format&fit=crop",
//       alt: "HR docs template preview",
//     },
//     tags: ["Policies", "Onboarding", "Benefits", "Handbook"],
//   },
//   {
//     id: "ops",
//     label: "Operations",
//     icon: Cog,
//     preview: {
//       src: "https://images.unsplash.com/photo-1537432376769-00a2f2c19c2d?q=80&w=1600&auto=format&fit=crop",
//       alt: "Operations docs template preview",
//     },
//     tags: ["Runbooks", "SOP", "Incident Response", "Inventory"],
//   },
//   {
//     id: "sales",
//     label: "Sales",
//     icon: Handshake,
//     preview: {
//       src: "https://images.unsplash.com/photo-1552664730-86f1f1d4a1c2?q=80&w=1600&auto=format&fit=crop",
//       alt: "Sales docs template preview",
//     },
//     tags: ["Playbooks", "Battlecards", "Pricing", "Case Studies"],
//   },
//   {
//     id: "support",
//     label: "Support",
//     icon: LifeBuoy,
//     preview: {
//       src: "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?q=80&w=1600&auto=format&fit=crop",
//       alt: "Support docs template preview",
//     },
//     tags: ["Knowledge base", "Macros", "Escalation", "FAQs"],
//   },
//   {
//     id: "browse",
//     label: "Browse all templates",
//     icon: LayoutGrid,
//     preview: {
//       src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1600&auto=format&fit=crop",
//       alt: "All templates gallery",
//     },
//     tags: ["All", "Popular", "Recently added", "Recommended"],
//   },
// ]

// Color system (4-5 colors total):
// - Primary brand: orange (classes: orange-400 family)
// - Neutrals: stone-50 (section bg), slate-900 (headings, dark card), white (text on dark), slate-600 (body)
// Avoid extra hues to keep palette tight.


const TABS: Tab[] = [
  {
    id: "dev",
    label: "Developers",
    icon: Code, // choose any dev-friendly icon
    preview: {
      src: "https://stuff.thingsofbrand.com/docstar.io/images/img3_helpmsg91.png",
      alt: "API documentation preview",
    },
    tags: ["API Docs", "SDK Guides", "Technical Specs", "Integration Docs"],
  },
  {
    id: "product",
    label: "Product Teams",
    icon: Layout,
    preview: {
      src: "https://stuff.thingsofbrand.com/docstar.io/images/img3_docsmsg91.png",
      alt: "Product documentation preview",
    },
    tags: ["Blogs", "Guides", "Release Notes", "Feature Docs"],
  },
  {
    id: "support",
    label: "Support Teams",
    icon: LifeBuoy,
    preview: {
      src: "https://stuff.thingsofbrand.com/docstar.io/images/img8_supportpage.png",
      alt: "Support documentation preview",
    },
    tags: ["FAQs", "Help Centers", "Troubleshooting", "Escalation Guides"],
  },
  {
    id: "business",
    label: "Business Teams",
    icon: Briefcase,
    preview: {
      src: "https://stuff.thingsofbrand.com/docstar.io/images/img8_blogs.png",
      alt: "Business documentation preview",
    },
    tags: ["Internal Docs", "Processes", "Policies", "Team Resources"],
  },
]

export default function DocsTemplatesSection() {
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  // Keyboard arrow navigation for tabs
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      setActive((i + 1) % TABS.length)
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      setActive((i - 1 + TABS.length) % TABS.length)
    } else if (e.key === "Home") {
      e.preventDefault()
      setActive(0)
    } else if (e.key === "End") {
      e.preventDefault()
      setActive(TABS.length - 1)
    }
  }

  // Derive active tab data
  const tab = useMemo(() => TABS[active], [active])

  return (
    <section className="w-full bg-rose-50" id="features">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:px-12">
        <header className="mb-8 text-center md:mb-10">
          <h2 className="lg:text-6xl font-semibold leading-tight text-slate-900 md:text-4xl">
          The Single Platform That Brings Every Team Together
          </h2>
        </header>

        {/* Tabs */}
        <div
          ref={listRef}
          role="tablist"
          aria-label="Documentation audiences"
          className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3 rounded-full bg-white/80 p-2 shadow-sm backdrop-blur"
        >
          {TABS.map((t, i) => {
            const Icon = t.icon
            const isActive = i === active
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${t.id}`}
                id={`tab-${t.id}`}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={[
                  "group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
                  isActive
                    ? "text-slate-900"
                    : "text-slate-600 hover:text-slate-900",
                ].join(" ")}
              >
                {/* Active backdrop */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-full bg-orange-400/30"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                </AnimatePresence>
                <Icon className="relative z-10 h-4 w-4" />
                <span className="relative z-10">{t.label}</span>
              </button>
            )
          })}
        </div>

        {/* Chips */}
        <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-2">
          {tab.tags.map((tag) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white/70 px-3 py-1 text-xs text-slate-600"
            >
              <Tag className="h-3.5 w-3.5" />
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Preview Card */}
        <div className="mx-auto mt-8 max-w-5xl">
          {/* <div className="rounded-2xl border border-stone-200 bg-white p-3 shadow-sm"> */}
            <div className="relative overflow-hidden rounded-xl bg-slate-900 p-4">
              {/* Hero image area */}
              <div className="mb-6 overflow-hidden rounded-xl bg-stone-200">
                <div className="relative aspect-[16/9] w-full">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={tab.preview.src}
                      src={tab.preview.src}
                      alt={tab.preview.alt}
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.01 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    />
                  </AnimatePresence>
                </div>
              </div>

              {/* Title + meta */}
              <div className="relative z-0">
                {/* <h3 className="text-balance text-2xl font-semibold text-white md:text-3xl">
                  to add something
                </h3> */}

                <dl className="mt-5 grid grid-cols-1 gap-3 text-sm text-white/80 md:grid-cols-2">
                </dl>
              </div>
            </div>
          {/* </div> */}
        </div>

      </div>
    </section>
  )
}