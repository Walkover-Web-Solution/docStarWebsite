import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Cog, Users, Wrench, Handshake, LifeBuoy, LayoutGrid, SunMedium, SlidersHorizontal, CalendarDays, FileText, Tag, Code, Layout, Briefcase } from 'lucide-react'

type Tab = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  // Per-tab preview image and tags
  preview: { src: string; alt: string }
  tags: { label: string; src: string }[] 
}


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
      { label: "API Docs", src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/2qC4fST_EYL5/a9537e81-20d2-456a-af21-cba31dc520a8_Screenshot%202025-09-08%20160442_compressed.png" },
      { label: "SDK Guides", src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/2qC4fST_EYL5/3d9b4eac-1eab-4893-982b-2f5f83029683_ChatGPT%20Image%20Sep%208,%202025,%2004_25_57%20PM_compressed.png" },
      { label: "Technical Specs", src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/2qC4fST_EYL5/323aaeee-30a0-46d8-8ba0-b77cef1da26a_12345_compressed.png" },
      { label: "Integration Docs", src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/2qC4fST_EYL5/e05bac47-9af6-40d2-ad2f-ca5cade41b7b_ChatGPT%20Image%20Sep%208,%202025,%2006_09_18%20PM_compressed.png" },
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
      { label: "Blogs", src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/jxLTn3oKu6pi/5ecf945f-223c-46e5-8b12-a4e853ba1257_Screenshot%202025-09-11%20110733_compressed.png" },
      { label: "Guides", src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/jxLTn3oKu6pi/6c0f1630-654f-45f0-98a0-35646c880c53_ChatGPT%20Image%20Sep%2011,%202025,%2011_36_14%20AM_compressed.png" },
      { label: "Feature Docs", src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/jxLTn3oKu6pi/cae875a1-1d8b-42f8-8709-fb024d5e55a0_Screenshot%202025-09-11%20112606_compressed.png" },
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
      { label: "FAQs", src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/D16vizahFsSn/e8b76310-bac0-447e-9544-ccc44968802a_Screenshot 2025-09-11 120328_compressed.png" },
      { label: "Help Centers", src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/D16vizahFsSn/c3752ea6-54ad-413a-9243-6705b45d980a_ChatGPT Image Sep 11, 2025, 12_20_38 PM_compressed.png" },
      { label: "Troubleshooting", src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/D16vizahFsSn/9b42b784-5754-405e-8e92-0031c934db50_ChatGPT Image Sep 11, 2025, 01_00_31 PM_compressed.png" },
      { label: "Escalation Guides", src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/D16vizahFsSn/5b1a65ee-2456-4aec-b6c8-4ca49d199ddf_Screenshot 2025-09-11 154025_compressed.png" },
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
      { label: "Internal Docs", src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/ZQ1q4ZkUHCiV/94e2d630-486e-4a28-b98d-4a83698e0d51_Screenshot 2025-09-11 160614_compressed.png" },
      // { label: "Policies", src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/ZQ1q4ZkUHCiV/94e2d630-486e-4a28-b98d-4a83698e0d51_Screenshot 2025-09-11 160614_compressed.png" },
      // { label: "Team Resources", src: "/public/buisness2.png" },
    ],
  },
]

export default function DocsTemplatesSection() {
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)
  const [activeTag, setActiveTag] = useState<{ label: string; src: string } | null>(null) // ⬅️ added

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
  useEffect(() => {
    setActiveTag(null)
  }, [active])
  
  const tab = useMemo(() => TABS[active], [active])
  const currentImage = activeTag ?? tab.preview

  return (
    <section className="w-full bg-rose-50" id="features">
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
          <motion.button
            key={tag.label}
            onClick={() => setActiveTag(tag)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={[
              "inline-flex items-center gap-1 rounded-full border border-stone-200  px-3 py-1 text-xs transition",
              activeTag?.label === tag.label 
                ? "bg-orange-200 text-slate-900 border-orange-300"
                : "text-slate-600 hover:bg-slate-100 bg-white/60"
            ].join(" ")}
          >
            <Tag className="h-3.5 w-3.5" />
            {tag.label}
          </motion.button>
        ))}
        </div>

        {/* Preview Card */}

        <div className="mx-auto mt-8 max-w-5xl">
          <div className="relative overflow-hidden rounded-xl bg-slate-900 p-4">
            <div className="mb-6 overflow-hidden rounded-xl bg-stone-200">
              <div className="relative aspect-[16/9] w-full">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={currentImage.src}
                    src={currentImage.src}
                    // alt={currentImage.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.01 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
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