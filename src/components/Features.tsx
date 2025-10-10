"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
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

  // Auto-cycle images
  useEffect(() => {
    if (!autoCycle || items.length <= 1) return
    const id = setInterval(() => setActive((i) => (i + 1) % items.length), cycleMs)
    return () => clearInterval(id)
  }, [autoCycle, cycleMs])

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
                  <Link href={item.link}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-selected={isActive}
                      className={[
                        "group flex w-full items-start gap-3 rounded-md p-2 text-left transition-colors cursor-pointer hover:text-black",
                        isActive ? "bg-white/50" : "hover:bg-white/40",
                      ].join(" ")}
                    >
                      <span
                        aria-hidden
                        className={[
                          "mt-1 h-8 w-1.5 rounded-full transition-opacity",
                          item.barClass,
                          isActive ? "opacity-100" : "opacity-80",
                        ].join(" ")}
                      />
                      <span
                        className={[
                          "leading-relaxed text-2xl",
                          isActive ? "text-slate-800" : "text-slate-600",
                        ].join(" ")}
                      >
                        {item.text}
                      </span>
                    </button>
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
