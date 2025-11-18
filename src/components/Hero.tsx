/**
 * Hero section featuring animated background imagery, motion-enhanced copy, and a modal demo scheduler.
 * Client-side hooks drive scroll-based reveals and overlay toggling.
 */
"use client";

import { useInView } from "react-intersection-observer";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import DocsTemplatesSection from "./FeatureMain";
import MotionWrapper from "./motion/MotionDivWrapper";

/**
 * Landing hero that introduces DocStar, showcases key value props, and provides CTAs for signup or demos.
 */
const Hero = () => {
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
        className="relative flex flex-col items-center justify-center overflow-hidden bg-white"
      >
        <div className="relative min-h-screen md:mt-12 gap-8 flex flex-col items-center justify-center z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-black">
          {/* Heading */}
          <MotionWrapper
            className="font-bold text-black mt-20 md:mt-0 text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.4em] text-black">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-neutral-900 shadow-sm">
                <Sparkles className="h-4 w-4 text-amber-600" aria-hidden />
                AI-Powered Documentation Platform
              </span>
            </p>
            <h1 className="leading-[1.3] text-black">
              Turn{" "}
              <span className="bg-white/60 text-black px-3 rounded-md">
                documentations
              </span>{" "}
              into
              <br />
              <span className="italic font-bold">Team Culture</span>
            </h1>
          </MotionWrapper>

          {/* Subtitle */}
          <MotionWrapper
            className="md:text-2xl max-w-3xl mx-auto leading-relaxed font-semibold text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Write blogs, craft FAQs, and build internal knowledgebase — faster,
            smarter, together.
          </MotionWrapper>

          {/* CTA Buttons */}
          <MotionWrapper
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <MotionWrapper
              as="a"
              href="https://app.docstar.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-lg rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-black font-bold px-6 py-3 text-black flex items-center bg-white hover:bg-neutral-100 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started for Free
              <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </MotionWrapper>

            <MotionWrapper
              as="button"
              type="button"
              onClick={openScheduler}
              className="px-6 py-3 rounded-2xl font-semibold text-lg text-black bg-white border border-black shadow-md hover:bg-neutral-100 hover:shadow-lg transition-all duration-300 flex items-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Demo
            </MotionWrapper>
          </MotionWrapper>
        </div>
      </section>

      {showScheduler && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={closeScheduler}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeScheduler}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close scheduler"
            >
              <X className="h-5 w-5" />
            </button>
            <iframe
              src="https://cal.com/docstar-team/30min?embed=1&hide_event_type_details=1"
              className="h-[75vh] w-full"
              loading="lazy"
              allow="camera; microphone; autoplay; encrypted-media"
            />
          </div>
        </div>
      )}

      {/* Lazy load heavy section */}
      <DocsTemplatesSection />
    </>
  );
};

export default Hero;
