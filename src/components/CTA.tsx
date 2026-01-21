/**
 * Renders the marketing call-to-action section with animation and a primary link to start using DocStar.
 * The section is only visible on the client because it relies on intersection observers and motion variants.
 */
"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import MotionWrapper from "./motion/MotionDivWrapper"

/**
 * Displays the CTA block with animated entrance once it enters the viewport,
 * highlighting the free trial entry point.
 */
const CTA = () => {
  const router = useRouter()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  // Reveal the CTA once at least 10% of the section is visible to achieve a subtle entrance animation.

  return (
    <section className="py-20 relative overflow-hidden">
      <MotionWrapper
        ref={ref}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-8 inline-flex items-center rounded-full px-6 py-3 theme-overlay-light">
          <Sparkles className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">
            Start Your Free Trial Today
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Ready to transform your
          <br />
          <span>documentation workflow?</span>
        </h2>

        <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-80">
          Join thousands of teams who've already streamlined their documentation
          process with DocStar&apos;s AI-powered platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <MotionWrapper
            as="a"
            href="https://app.docstar.io/login"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary flex items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started for Free
            <ArrowRight className="h-5 w-5 ml-2" />
          </MotionWrapper>

          {/* If you want internal navigation */}
          {/* 
          <MotionWrapper
            onClick={() => router.push("/demo")}
            className="text-white hover:text-gray-300 font-semibold text-lg px-8 py-4 rounded-xl border-2 border-white/30 hover:border-gray-300 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Schedule Demo
          </MotionWrapper> 
          */}
        </div>
      </MotionWrapper>
    </section>
  )
}

export default CTA
