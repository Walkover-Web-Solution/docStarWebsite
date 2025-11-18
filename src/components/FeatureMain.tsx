/**
 * Provides the interactive "Docs Templates" section featuring audience tabs, chip filters,
 * and animated screenshots that highlight different DocStar use cases.
 */
import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { Cog, Users, Wrench, Handshake, LifeBuoy, LayoutGrid, SunMedium, SlidersHorizontal, CalendarDays, FileText, Tag, Code, Layout, Briefcase } from "lucide-react"
import MotionWrapper from "./motion/MotionDivWrapper"

type Tab = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  // Per-tab preview image and tags
  preview: { src: string; alt: string }
  tags: { label: string; src: string; alt: string }[]
}

// Animate Presence-friendly wrapper around Next's Image component.
const MotionImage = motion(Image)

// Tab definitions outline the target audience, hero preview, and supporting tag examples.
const TABS: Tab[] = [
  {
    id: "dev",
    label: "Developers",
    icon: Code, // choose any dev-friendly icon
    preview: {
      src: "https://stuff.thingsofbrand.com/docstar.io/images/img3_helpmsg91.png",
      alt: "API documentation preview",
    },
    tags: [
      {
        label: "API Docs",
        src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/2qC4fST_EYL5/a9537e81-20d2-456a-af21-cba31dc520a8_Screenshot%202025-09-08%20160442_compressed.png",
        alt: "API documentation listing",
      },
    ],
  },
  {
    id: "product",
    label: "Product Teams",
    icon: Layout,
    preview: {
      src: "https://stuff.thingsofbrand.com/docstar.io/images/img3_docsmsg91.png",
      alt: "Product documentation preview",
    },
    tags: [
      {
        label: "Blogs",
        src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/jxLTn3oKu6pi/5ecf945f-223c-46e5-8b12-a4e853ba1257_Screenshot%202025-09-11%20110733_compressed.png",
        alt: "Knowledge blog layout",
      },
    ],
  },
  {
    id: "support",
    label: "Support Teams",
    icon: LifeBuoy,
    preview: {
      src: "https://stuff.thingsofbrand.com/docstar.io/images/img8_supportpage.png",
      alt: "Support documentation preview",
    },
    tags: [
      {
        label: "FAQs",
        src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/D16vizahFsSn/e8b76310-bac0-447e-9544-ccc44968802a_Screenshot 2025-09-11 120328_compressed.png",
        alt: "Support FAQ experience",
      },
    ],
  },
  {
    id: "business",
    label: "Business Teams",
    icon: Briefcase,
    preview: {
      src: "https://stuff.thingsofbrand.com/docstar.io/images/img8_blogs.png",
      alt: "Business documentation preview",
    },
    
    tags: [
      {
        label: "Internal Docs",
        src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/ZQ1q4ZkUHCiV/94e2d630-486e-4a28-b98d-4a83698e0d51_Screenshot 2025-09-11 160614_compressed.png",
        alt: "Internal documentation hub",
      },
      // { label: "Policies", src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/ZQ1q4ZkUHCiV/94e2d630-486e-4a28-b98d-4a83698e0d51_Screenshot 2025-09-11 160614_compressed.png" },
      // { label: "Team Resources", src: "/public/buisness2.png" },
    ],
  },
]

/**
 * Renders the feature templates section with animated tabs, filter chips, and screenshot transitions.
 */
export default function DocsTemplatesSection() {
  // Track which audience tab is active so we can update the preview and chips.
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)
  // Optional chip selection overrides the default tab preview with a contextual screenshot.
  const [activeTag, setActiveTag] = useState<Tab["tags"][number] | null>(null)

  // Keyboard arrow navigation for tabs to keep the control accessible.
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
  useEffect(() => {
    // Clear any selected chip when the user switches tabs so previews stay in sync.
    setActiveTag(null)
  }, [active])
  
  const tab = useMemo(() => TABS[active], [active])
  // Default to the tab's hero image unless a chip overrides it.
  const currentImage = activeTag ?? tab.preview

  return (
    <section className="w-full bg-rose-50" id="feature-main">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:px-12">
        {/* <header className="mb-8 text-center md:mb-10">
          <h2 className="lg:text-6xl font-semibold leading-tight text-slate-900 md:text-4xl">
          The Single Platform That Brings Every Team Together
          </h2>
        </header> */}

        {/* Tabs */}
        <div
          ref={listRef}
          role="tablist"
          aria-label="Documentation audiences"
          className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3 rounded-full border border-black bg-white/80 p-2 shadow-sm backdrop-blur"
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
                  "group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors cursor-pointer",
                  isActive
                    ? "text-slate-900 font-bold"
                    : "text-slate-600 hover:text-slate-900",
                ].join(" ")}
              >
                {/* Active backdrop */}
                <AnimatePresence>
                  {isActive && (
                    // Use a shared layout ID to animate the highlight pill between tabs.
                    <MotionWrapper
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-full bg-orange-400/30 border border-black"
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
        {/* Present supporting examples that can swap the hero screenshot for deeper context. */}
        {tab.tags.map((tag) => (
          <MotionWrapper
          as="button"
            key={tag.label}
            onClick={() => setActiveTag(tag)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={[
              "inline-flex items-center gap-1 rounded-full border border-black  px-3 py-1 text-xs transition cursor-pointer",
              activeTag?.label === tag.label 
                ? "bg-orange-200 text-slate-900 font-bold border-black"
                : "text-slate-600 hover:bg-slate-100 bg-white/60"
            ].join(" ")}
          >
            <Tag className="h-3.5 w-3.5" />
            {tag.label}
          </MotionWrapper>
        ))}
        </div>

        {/* Preview Card */}

        <div className="mx-auto mt-8 max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl p-4 border border-black ">
            <div className="mb-6 overflow-hidden rounded-xl ">
              <div className="relative aspect-[16/9] w-full">
                {/* Cross-fade between hero images as the active selection changes. */}
                <AnimatePresence mode="wait" initial={false}>
                  <MotionImage
                    key={currentImage.src}
                    src={currentImage.src}
                    alt={currentImage.alt ?? `${tab.label} preview`}
                    fill
                    sizes="(min-width: 1536px) 1100px, (min-width: 1280px) 1000px, (min-width: 1024px) 900px, (min-width: 768px) 80vw, 95vw"
                    className="absolute inset-0 h-full w-full object-fill"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.01 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    // Eagerly load the default hero for instant paint, lazily load subsequent swaps.
                    loading={active === 0 && !activeTag ? "eager" : "lazy"}
                    priority={active === 0 && !activeTag}
                    quality={90}
                    // Skip Next.js optimization to preserve animated transitions for these remote assets.
                    unoptimized
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
