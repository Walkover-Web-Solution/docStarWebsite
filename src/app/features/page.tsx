import MotionWrapper from "@/components/motion/MotionDivWrapper"
import { fetchFeatures } from "@/services/features.api"
import { FeatureItem } from "@/types/data-types"
import FeaturesList from "./FeaturesList"
export const revalidate = 3600

export const runtime = "edge"

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
        </div>
      </section>

      {hasFeatures && (
        <section className="px-4 pb-24 sm:px-6">
          <FeaturesList features={features} />
        </section>
      )}
    </div>
  )
}
