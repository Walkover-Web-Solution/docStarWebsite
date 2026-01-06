"use client"

import { LazyMotion, domAnimation } from "framer-motion"
import Link from "next/link"
import FeaturesList from "@/app/features/FeaturesList"
import { FeatureItem } from "@/types/data-types"

type ExtraFeaturesProps = {
  limit?: number
  showViewAllLink?: boolean
  features: FeatureItem[]
}

export default function ExtraFeatures({
  limit,
  showViewAllLink = false,
  features: allFeatures,
}: ExtraFeaturesProps) {
  const features = typeof limit === "number" ? allFeatures.slice(0, limit) : allFeatures
  const shouldShowViewAll = showViewAllLink && allFeatures.length > 0

  return (
    <section id="features" className="bg-gray-50 py-20 scroll-mt-32">
      <LazyMotion features={domAnimation}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturesList features={features} />
          {shouldShowViewAll && (
            <div className="mt-12 text-center">
              <Link
                href="/features"
                className="btn btn-outline w-fit m-auto"
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
