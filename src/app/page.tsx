
import CTA from "@/components/CTA"
import ExtraFeatures from "@/components/ExtraFeatures"
import FAQSection from "@/components/FAQSection"
import Feature from "@/components/Features"
import Hero from "@/components/Hero"
import Testimonials from "@/components/Testimonials"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Feature />
      <ExtraFeatures limit={4} showViewAllLink excludeIds={[1]} />
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
