
import CTA from "@/components/CTA"
import ExtraFeatures from "@/components/ExtraFeatures"
import Feature from "@/components/Features"
import Hero from "@/components/Hero"
import Testimonials from "@/components/Testimonials"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Feature autoCycle={true} cycleMs={4000} />
      <ExtraFeatures />
      <Testimonials />
      <CTA />
    </>
  )
}
