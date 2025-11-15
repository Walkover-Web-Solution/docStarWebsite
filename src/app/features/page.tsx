import Image from "next/image"
import Link from "next/link"
import MotionWrapper from "@/components/motion/MotionDivWrapper"
import { defaultFeatureBlurDataURL, fetchFeatures, type FeatureItem } from "@/data/features"
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

export default async function FeaturesPage() {
  let features: FeatureItem[] = []

  try {
    features = await fetchFeatures()
  } catch (error) {
    console.error("[FeaturesPage] Unable to load features from API:", error)
  }

  const hasFeatures = features.length > 0

  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      <section className="px-6 pb-12 pt-28 sm:pt-32">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 text-center">
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold uppercase tracking-[0.35em] text-stone-500"
          >
            Explore DocStar
          </MotionWrapper>

          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <h1 className="text-4xl font-semibold text-stone-900 sm:text-5xl">
              Everything DocStar offers, available from day one
            </h1>
          </MotionWrapper>

          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="mx-auto max-w-3xl text-base text-stone-600 sm:text-lg">
              Get unrestricted access to all features, no matter your choice of plan. Empower every team to publish,
              collaborate, and scale documentation effortlessly.
            </p>
          </MotionWrapper>

          {/* <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Link
              href="https://app.docstar.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-[#b11f1f] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#961818]"
            >
              Start for free
            </Link>
          </MotionWrapper> */}
        </div>
      </section>

      {hasFeatures && (
        <section className="px-4 pb-24 sm:px-6">
          <div className="relative mx-auto max-w-7xl p-6 md:p-10">
            <div className="relative grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = iconByFeatureId[feature.id] ?? iconCycle[index % iconCycle.length]
                const accent = gradientCycle[index % gradientCycle.length]
                const isFeaturedCard = index === 0
                return (
                  <Link
                    key={feature.id}
                    href={feature.link}
                    className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f4ef]"
                    aria-label={`Learn more about ${feature.text}`}
                  >
                    <MotionWrapper
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="relative flex h-full flex-col overflow-hidden border border-stone-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl"
                    >
                      <div className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                      {/* <div className="relative h-48 w-full overflow-hidden sm:h-52">
                        <Image
                          src={feature.image.src}
                          alt={feature.image.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          quality={70}
                          priority={isFeaturedCard}
                          fetchPriority={isFeaturedCard ? "high" : "auto"}
                          loading={isFeaturedCard ? undefined : "lazy"}
                          placeholder="blur"
                          blurDataURL={feature.image.blurDataURL ?? defaultFeatureBlurDataURL}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                      </div> */}

                      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-inset ring-white/60">
                            <Icon className="h-5 w-5 text-stone-700" />
                          </span>
                          <h3 className="text-lg font-semibold text-stone-900 sm:text-xl">{feature.text}</h3>
                        </div>

                        <p className="text-sm leading-relaxed text-stone-600 sm:text-base">{feature.description}</p>

                        <div className="mt-auto pt-2 inline-flex items-center gap-2 text-sm font-semibold text-stone-900 transition-colors group-hover:text-stone-700">
                          Learn more
                          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </MotionWrapper>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
