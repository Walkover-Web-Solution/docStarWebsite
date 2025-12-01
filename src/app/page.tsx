import CTA from "@/components/CTA"
import ExtraFeatures from "@/components/ExtraFeatures"
import FAQSection from "@/components/FAQSection"
import Feature from "@/components/Features"
import Hero from "@/components/Hero"
import Testimonials from "@/components/Testimonials"
import { fetchFeatures, type FeatureItem } from "@/data/features"

export const runtime = "edge"

export default async function HomePage() {
  let features: FeatureItem[] = []

  try {
    const apiFeatures = await fetchFeatures()
    features = apiFeatures.slice(0, 3)
  } catch (error) {
    console.error("[HomePage] Unable to load features from API:", error)
  }

  return (
    <>
      <Hero />
      <Feature />
      {features.length > 0 && <ExtraFeatures features={features} showViewAllLink />}
      <FAQSection
        tableId="tblx2m11t"
        id="faqs"
        eyebrow="Frequently Asked Questions"
        eyebrowClassName="text-neutral-900"
      />
      <Testimonials />
      <CTA />
    </>
  )
}
