/**
 * Hero section featuring animated background imagery, motion-enhanced copy, and a modal demo scheduler.
 * Client-side hooks drive scroll-based reveals and overlay toggling.
 */
"use client";

import { useInView } from "react-intersection-observer";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
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
        className="relative flex flex-col items-center justify-center"
      >
        {/* <div className="absolute inset-0 bg-[url('/bg-images/hero-svg2.svg')] bg-cover bg-center bg-no-repeat opacity-60"></div> */}
        <div className="relative mt-12 py-20 pb-2 gap-8 flex flex-col items-center justify-center z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Heading */}
          <MotionWrapper
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="h1">
              Turn Documentations Into
              <br />
              Team Culture
            </h1>
          </MotionWrapper>

          {/* Subtitle */}
          <MotionWrapper
            className="md:text-xl max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Write blogs, craft FAQs, and build internal knowledgebase — faster,
            smarter, together.
          </MotionWrapper>

          {/* CTA Buttons */}
          <MotionWrapper
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <MotionWrapper
              as="a"
              href="https://app.docstar.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
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
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Demo
            </MotionWrapper>
          </MotionWrapper>
        </div>

        <ImageCarousel heroImages={heroImages} />
      </section>

      {showScheduler && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm px-4 theme-overlay-light"
          onClick={closeScheduler}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-md shadow-2xl theme-bg-secondary"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeScheduler}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-md transition focus:outline-none focus-visible:ring-2 theme-bg-secondary"
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
      <ContentSection testimonials={testimonials} appsMarquee={appsMarquee} />
    </>
  );
};

export default Hero;
