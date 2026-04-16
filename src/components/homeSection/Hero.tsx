/**
 * Hero section featuring animated background imagery, motion-enhanced copy, and a modal demo scheduler.
 * Client-side hooks drive scroll-based reveals and overlay toggling.
 */
"use client";

import { useInView } from "react-intersection-observer";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MotionWrapper from "../motion/MotionDivWrapper";
import ImageCarousel from "./ImageCarousel";
import { HeroImage } from "@/types/data-types";
import ContentSection from "../contentSection/ContentSection";
import { TestimonialItem, AppsMarqueeItem } from "@/types/data-types";

interface HeroProps {
  heroImages: HeroImage[];
  testimonials: TestimonialItem[];
  appsMarquee: AppsMarqueeItem[];
}
/**
 * Landing hero that introduces DocStar, showcases key value props, and provides CTAs for signup or demos.
 */
const Hero = ({ heroImages, testimonials, appsMarquee }: HeroProps) => {
  const searchParams = useSearchParams();
  const refParam = searchParams.get('ref');
  const loginUrl = refParam
    ? `https://app.docstar.io/login?ref=${encodeURIComponent(refParam)}`
    : 'https://app.docstar.io/login';

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  // The intersection observer ensures entrance animations only play after the hero enters view.

  const headlineWords = ["creators", "developers", "teams"];
  const [index, setIndex] = useState(0);
  const [showScheduler, setShowScheduler] = useState(false);

  useEffect(() => {
    // Rotate the highlighted persona in the headline to keep the message dynamic.
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlineWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showScheduler) {
      // Prevent the background from scrolling while the scheduling modal is open.
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [showScheduler]);

  const openScheduler = () => setShowScheduler(true);
  const closeScheduler = () => setShowScheduler(false);

  return (
    <>
      <section
        ref={ref}
        className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      >
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />

        {/* Radial gradient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-gray-100/40 to-transparent dark:from-gray-900/40 rounded-full blur-3xl" />
        </div>

        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 mt-8">
            <div className="max-w-5xl mx-auto space-y-8">
              {/* AI Badge */}
              <MotionWrapper
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex items-center justify-center relative">
                  {/* Glow effect behind badge */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200/50 via-gray-300/50 to-gray-200/50 dark:from-gray-800/50 dark:via-gray-700/50 dark:to-gray-800/50 blur-xl opacity-60" />
                  
                  <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                    <span className="text-lg">✨</span>
                    <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                      AI-Powered Documentation Platform
                    </span>
                  </div>
                </div>
              </MotionWrapper>

              {/* Heading */}
              <MotionWrapper
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative">
                  {/* Subtle glow behind heading */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/30 to-transparent dark:via-gray-900/30 blur-2xl" />
                  
                  <h1 className="relative text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.1] tracking-tight text-gray-950 dark:text-white">
                    Turn Documentations Into
                    <br />
                    <span className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">Team Culture</span>
                  </h1>
                </div>
              </MotionWrapper>

              {/* Subtitle */}
              <MotionWrapper
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                  Write blogs, craft FAQs, and build internal knowledgebase — faster,
                  smarter, together.
                </p>
              </MotionWrapper>

              {/* CTA Buttons */}
              <MotionWrapper
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <MotionWrapper
                  as="a"
                  href={loginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center cursor-pointer justify-center px-8 py-4 text-base md:text-lg font-semibold text-white dark:text-black bg-black dark:bg-white border-2 border-black dark:border-white rounded-lg transition-all duration-200 ease-out min-w-[220px] will-change-transform"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  Get Started for Free
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                </MotionWrapper>

                <MotionWrapper
                  as="button"
                  type="button"
                  onClick={openScheduler}
                  className="inline-flex items-center cursor-pointer justify-center px-8 py-4 text-base md:text-lg font-semibold text-black dark:text-white bg-transparent border-2 border-black dark:border-white rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 ease-out min-w-[220px] will-change-transform"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  Schedule Demo
                </MotionWrapper>
              </MotionWrapper>
            </div>
          </div>
        </div>

        <div className="w-full pb-0 relative z-10">
          <ImageCarousel heroImages={heroImages} />
        </div>
      </section>

      {showScheduler && (
        <MotionWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          onClick={closeScheduler}
        >
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md" />
          
          <MotionWrapper
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800"
            onClick={(event: React.MouseEvent) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeScheduler}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
              aria-label="Close scheduler"
            >
              <X className="h-5 w-5 text-gray-900 dark:text-gray-100" />
            </button>
            <iframe
              src="https://cal.com/docstar-team/30min?embed=1&hide_event_type_details=1"
              className="h-[75vh] w-full"
              loading="lazy"
              allow="camera; microphone; autoplay; encrypted-media"
            />
          </MotionWrapper>
        </MotionWrapper>
      )}
      <ContentSection testimonials={testimonials} appsMarquee={appsMarquee} />
    </>
  );
};

export default Hero;
