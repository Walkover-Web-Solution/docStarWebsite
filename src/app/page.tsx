
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
      <Feature autoCycle={true} cycleMs={4000} />
      <ExtraFeatures />
      <FAQSection
        tableId="tblx2m11t"
        id="faqs"
        variant="dark"
        eyebrow="Frequently Asked Questions"
        heading="Answers for teams getting started with DocStar"
        description="Everything you need to know about creating, publishing, and scaling your knowledge base with our platform."
      />
      <Testimonials />
      <CTA />
    </>
  )
}
