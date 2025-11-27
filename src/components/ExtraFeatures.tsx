/**
 * Displays a responsive grid of feature highlight cards with subtle motion effects and image placeholders.
 * The component is client-rendered to leverage intersection animations and user interactions.
 */
"use client"

import { LazyMotion, domAnimation } from "framer-motion"
import {
  LucideIcon,
  Sparkles,
  ShieldCheck,
  Workflow,
  Zap,
  BookOpen,
  Globe2,
  Users,
  Search,
  Languages,
  Palette,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import MotionWrapper from "./motion/MotionDivWrapper"
import { type FeatureItem } from "@/data/features"

const iconCycle: LucideIcon[] = [Sparkles, ShieldCheck, Workflow, Zap, BookOpen, Globe2, Users, Search]
const gradientCycle = [
  "from-rose-100/70 via-white to-white",
  "from-amber-100/70 via-white to-white",
  "from-blue-100/60 via-white to-white",
  "from-emerald-100/60 via-white to-white",
]

const iconByFeatureId: Record<number, LucideIcon> = {
  1: ShieldCheck,
  2: Globe2,
  3: Workflow,
  4: Languages,
  5: Search,
  6: Users,
  7: Palette,
  8: Sparkles,
}
//testing
type ExtraFeaturesProps = {
  /** Maximum number of features to render. If undefined, all features are shown. */
  limit?: number
  /** Whether to show the "View all features" link when the list is truncated. */
  showViewAllLink?: boolean
  /** Feature identifiers that should be excluded from the listing. */
  excludeIds?: number[]
  /** Full feature collection provided by the server. */
  features: FeatureItem[]
}

/**
 * Renders an animated feature grid, optionally limited in size, with a call-to-action to view the entire catalog.
 */
export default function ExtraFeatures({
  limit,
  showViewAllLink = false,
  excludeIds = [],
  features: allFeatures,
}: ExtraFeaturesProps) {
  const baseFeatures =
    excludeIds.length > 0 ? allFeatures.filter((feature) => !excludeIds.includes(feature.id)) : allFeatures
  // Respect the optional limit so pages can surface a curated subset of the features.
  const features = typeof limit === "number" ? baseFeatures.slice(0, limit) : baseFeatures
  const shouldShowViewAll = showViewAllLink && allFeatures.length > 0

  return (
    <section id="features" className="bg-gray-50 py-20 scroll-mt-32">
      <LazyMotion features={domAnimation}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = iconByFeatureId[feature.id] ?? iconCycle[index % iconCycle.length]
              const accent = gradientCycle[index % gradientCycle.length]

              return (
                <Link
                  key={feature.id}
                  href={feature.link}
                  className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
                  aria-label={`Learn more about ${feature.text}`}
                >
                  <MotionWrapper
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="relative flex h-full flex-col overflow-hidden border border-stone-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl"
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                    />

                    <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-inset ring-white/60">
                          <Icon className="h-5 w-5 text-stone-700" />
                        </span>
                        <h3 className="text-lg font-semibold text-stone-900 sm:text-xl">{feature.text}</h3>
                      </div>

                      {feature.description && (
                        <p className="text-sm leading-relaxed text-stone-600 sm:text-base">{feature.description}</p>
                      )}

                      <div className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-stone-900 transition-colors group-hover:text-stone-700">
                        Learn more
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </MotionWrapper>
                </Link>
              )
            })}
          </div>
          {shouldShowViewAll && (
            <div className="mt-12 text-center">
              <Link
                href="/features"
                className="inline-flex items-center justify-center rounded-xl border border-gray-800 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors duration-200 hover:bg-gray-900 hover:text-white"
              >
                View all features
              </Link>
            </div>
          )}
        </div>
      </LazyMotion>
    </section>
  )
}
