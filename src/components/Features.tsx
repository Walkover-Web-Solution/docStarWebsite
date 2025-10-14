"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import MotionWrapper from "./motion/MotionDivWrapper"

type FeatureItem = {
  id: number
  text: string
  barClass: string
  image: { src: string; alt: string }
  link: string
}

type Props = {
  autoCycle?: boolean
  cycleMs?: number
}

const items: FeatureItem[] = [
  {
    id: 1,
    text: "Centralized Knowledge Base",
    barClass: "bg-rose-300/60",
    image: {
      src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/nJnoRrQ__W6d/793987ab-3a39-46bb-84ac-00b323d4f742_ChatGPT%20Image%20Sep%206,%202025,%2004_16_38%20PM_compressed.png",
      alt: "Knowledge base with tags",
    },
    link: "/faq",
  },
  {
    id: 2,
    text: "Create API Documentation Easily",
    barClass: "bg-amber-300/70",
    image: {
      src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/nJnoRrQ__W6d/983e3386-8d33-4f0f-8f0c-1253245613a7_ChatGPT%20Image%20Sep%206,%202025,%2003_12_17%20PM_compressed.png",
      alt: "Automated reminders dashboard",
    },
    link: "/api-documentation-platform",
  },
  {
    id: 3,
    text: "Publish Engaging Blogs to Grow Your Presence",
    barClass: "bg-rose-300/80",
    image: {
      src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/nJnoRrQ__W6d/b9bc61b1-92bf-43d7-92cb-8076ac20bb45_ChatGPT%20Image%20Sep%206,%202025,%2003_09_27%20PM_compressed.png",
      alt: "AI suggestions panel",
    },
    link: "/publish-page",
  },
]

export default function Feature({ autoCycle = false, cycleMs = 4500 }: Props) {
  const [active, setActive] = useState(0)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)

  // Auto-cycle images
  useEffect(() => {
    if (!autoCycle || items.length <= 1 || hasUserInteracted) return
    const id = setInterval(() => setActive((i) => (i + 1) % items.length), cycleMs)
    return () => clearInterval(id)
  }, [autoCycle, cycleMs, hasUserInteracted])

  const activateItem = (index: number) => {
    setActive(index)
    if (autoCycle && !hasUserInteracted) {
      setHasUserInteracted(true)
    }
  }

  const progressPct = ((active + 1) / items.length) * 100

  return (
    <section className="w-full bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 md:gap-16 md:py-24 lg:px-12">
        
        {/* Left: Title + Features */}
        <div className="max-w-2xl flex flex-col">
          <h2 className="text-pretty text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
            Minimal Documentation platform.
          </h2>

          <ul className="mt-8 space-y-3">
            {items.map((item, i) => {
              const isActive = i === active
              return (
                <li key={item.id}>
                  <Link
                    href={item.link}
                    onMouseEnter={() => activateItem(i)}
                    onFocus={() => activateItem(i)}
                    className={[
                      "group flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/70",
                      isActive
                        ? "bg-white/70 border-rose-200 shadow-sm text-slate-900"
                        : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60 hover:border-rose-100 hover:shadow-sm",
                    ].join(" ")}
                  >
                    <span
                      aria-hidden
                      className={[
                        "h-8 w-1.5 rounded-full transition-opacity",
                        item.barClass,
                        isActive ? "opacity-100" : "opacity-80",
                      ].join(" ")}
                    />
                    <div className="flex flex-1 items-center justify-between gap-3">
                      <span className="leading-relaxed text-lg sm:text-xl">{item.text}</span>
                      <span
                        className={[
                          "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
                          isActive
                            ? "border-rose-300 bg-rose-100 text-rose-600"
                            : "border-slate-200 text-slate-400 group-hover:border-rose-200 group-hover:text-rose-500",
                        ].join(" ")}
                        aria-hidden
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Right: Images + progress pill */}
        <div className="flex items-center">
          <div className="w-full space-y-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-rose-100 shadow-sm" style={{ height: "340px" }}>
              <AnimatePresence initial={false} mode="wait">
                <MotionWrapper
                  key={items[active].image.src}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 h-full w-full"
                >
                  <Image
                    src={items[active].image.src}
                    alt={items[active].image.alt}
                    fill
                    className="object-cover"
                    priority={active === 0}
                  />
                </MotionWrapper>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="h-4 w-full rounded-full bg-rose-100">
              <MotionWrapper
                className="h-4 rounded-full bg-rose-300"
                style={{ width: `${progressPct}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="sr-only">
                Showing feature {active + 1} of {items.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
