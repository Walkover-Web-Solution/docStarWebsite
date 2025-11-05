/**
 * Displays a responsive grid of feature highlight cards with subtle motion effects and image placeholders.
 * The component is client-rendered to leverage intersection animations and user interactions.
 */
"use client"

import { LazyMotion, domAnimation } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import MotionWrapper from "./motion/MotionDivWrapper"
import { defaultFeatureBlurDataURL, features as allFeatures, type FeatureItem } from "@/data/features"

/**
 * Single feature card rendered inside the grid, memoized to avoid unnecessary rerenders when parent props change.
 */
const FeatureCard = React.memo(({ feature }: { feature: FeatureItem }) => {
  const router = useRouter()

  const handleClick = () => {
    // Use client-side navigation for internal feature detail links.
    router.push(feature.link)
  }

  return (
    <MotionWrapper
      className="group relative border border-gray-300 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-600 cursor-pointer"
      onClick={handleClick}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        {feature.image.src && (
          <Image
            src={feature.image.src}
            alt={feature.image.alt || feature.text}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            quality={70}
            placeholder="blur"
            blurDataURL={feature.image.blurDataURL ?? defaultFeatureBlurDataURL}
          />
        )}
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
          {feature.text}
        </h3>
        
        {/* <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {feature.description}
        </p> */}

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
            Learn More
          </span>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-black/70 transition-colors duration-200">
            <ArrowRight className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-200" />
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </MotionWrapper>
  )
})

// Preserve a helpful display name for React DevTools.
FeatureCard.displayName = 'FeatureCard'

type ExtraFeaturesProps = {
  /** Maximum number of features to render. If undefined, all features are shown. */
  limit?: number
  /** Whether to show the "View all features" link when the list is truncated. */
  showViewAllLink?: boolean
  /** Feature identifiers that should be excluded from the listing. */
  excludeIds?: number[]
}

/**
 * Renders an animated feature grid, optionally limited in size, with a call-to-action to view the entire catalog.
 */
export default function ExtraFeatures({ limit, showViewAllLink = false, excludeIds = [] }: ExtraFeaturesProps) {
  const baseFeatures =
    excludeIds.length > 0 ? allFeatures.filter((feature) => !excludeIds.includes(feature.id)) : allFeatures
  // Respect the optional limit so pages can surface a curated subset of the features.
  const features = typeof limit === "number" ? baseFeatures.slice(0, limit) : baseFeatures
  const shouldShowViewAll = showViewAllLink && typeof limit === "number" && limit < baseFeatures.length

  return (
    <section id="features" className="bg-gray-50 py-20 scroll-mt-32">
      <LazyMotion features={domAnimation}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Stagger card entrance to create a smooth cascade effect as the section scrolls into view. */}
            {features.map((feature, index) => (
              <MotionWrapper
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <FeatureCard feature={feature} />
              </MotionWrapper>
            ))}
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
