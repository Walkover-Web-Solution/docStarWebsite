import FeatureSchema from "@/components/seo/FeatureSchema"
import MotionWrapper from "@/components/motion/MotionDivWrapper"
import { fetchFeatures } from "@/services/features.api"
import { fetchMeta } from "@/services/meta.api"
import { generateSEOMetadata } from "@/lib/seo"
import { FeatureItem } from "@/types/data-types"
import FeaturesList from "./FeaturesList"
import { cache } from "react"

export const dynamic = "force-dynamic"
export const runtime = "edge"

const PAGE_PATH = "/features"

const getCachedMeta = cache(async () => {
  try {
    return await fetchMeta(PAGE_PATH)
  } catch (error) {
    console.error("[FeaturesPage] Unable to load meta from API:", error)
    return null
  }
})

export async function generateMetadata() {
  const meta = await getCachedMeta()

  return generateSEOMetadata({
    meta,
    pathname: PAGE_PATH,
    defaultTitle: "DocStar Features | All-in-one Documentation Platform",
    defaultDescription: "Browse every DocStar capability—from AI-powered drafting to multi-language publishing—and see what's included on every plan.",
  })
}

export default async function FeaturesPage() {
  const meta = await getCachedMeta()

  const featureContent = {
    title: meta?.title ?? "DocStar Features | All-in-one Documentation Platform",
    description: meta?.description ?? "Browse every DocStar capability—from AI-powered drafting to multi-language publishing—and see what's included on every plan.",
    keywords: meta?.keywords ? (Array.isArray(meta.keywords) ? meta.keywords : [meta.keywords]) : ["docstar features", "documentation platform", "docstar product overview"],
  }

  let features: FeatureItem[] = []

  try {
    features = await fetchFeatures()
  } catch (error) {
    console.error("[FeaturesPage] Unable to load features from API:", error)
  }

  const hasFeatures = features.length > 0

  return (
    <FeatureSchema
      id="docstar-features-schema"
      title={featureContent.title}
      description={featureContent.description}
      path={PAGE_PATH}
      keywords={featureContent.keywords}
    >
      <div className="min-h-screen theme-bg-secondary">
        <section className="px-6 pb-12 pt-28 sm:pt-32">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 text-center">
            <MotionWrapper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm font-semibold uppercase tracking-[0.35em] opacity-70"
            >
              Explore DocStar
            </MotionWrapper>

            <MotionWrapper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              <h1 className="text-4xl font-semibold sm:text-5xl">
                Everything DocStar offers, available from day one
              </h1>
            </MotionWrapper>

            <MotionWrapper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="mx-auto max-w-3xl text-base sm:text-lg opacity-80">
                Get unrestricted access to all features, no matter your choice of plan. Empower every team to publish,
                collaborate, and scale documentation effortlessly.
              </p>
            </MotionWrapper>
          </div>
        </section>

        {hasFeatures && (
          <section className="px-4 pb-24 sm:px-6">
            <FeaturesList features={features} />
          </section>
        )}
      </div>
    </FeatureSchema>
  )
}
