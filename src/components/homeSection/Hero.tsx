/**
 * Hero section featuring animated background imagery, motion-enhanced copy, and a modal demo scheduler.
 * Client-side hooks drive scroll-based reveals and overlay toggling.
 */
"use client";

import { useInView } from "react-intersection-observer";
import { ArrowRight, X, Sparkles, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MotionWrapper from "../motion/MotionDivWrapper";
import ImageCarousel from "./ImageCarousel";
import { HeroImage, TestimonialItem, AppsMarqueeItem } from "@/types/data-types";
import ContentSection from "../contentSection/ContentSection";
import Link from "next/link";
import Script from "next/script";
import { useDocStarSearchControls } from "@/hooks/useDocStarSearchControls";

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
  const refParam = searchParams.get("ref");
  const loginUrl = refParam
    ? `https://app.docstar.io/login?ref=${encodeURIComponent(refParam)}`
    : "https://app.docstar.io/login";

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  // The intersection observer ensures entrance animations only play after the hero enters view.

  const [showScheduler, setShowScheduler] = useState(false);
  const [osKey, setOsKey] = useState("⌘");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
      setOsKey(isMac ? "⌘" : "Ctrl");
    }
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

  useDocStarSearchControls();

  return (
    <>
      <Script
        src="https://script.docstar.io/scripts/search-sdk/search-sdk.script.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && (window as any).DocStarSearch) {
            (window as any).DocStarSearch.configure({
              collectionId: "fLMgydvRdvN7",
              environment: "prod",
              openMode: "iframe",
              debounceDelay: 300,
              enableKeyboardShortcut: true,
              minSearchLength: 2,
            });
          }
        }}
      />
      <section
        ref={ref}
        className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden"
      >
        {/* Beige Background with Grid */}
        <div className="absolute inset-0 bg-[#faf7f2] dark:bg-[var(--theme-bg)]">
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808030_1px,transparent_1px),linear-gradient(to_bottom,#80808030_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-70"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          
          {/* Decorative Floating Cards (visible on large screens) */}
          <MotionWrapper
            initial={{ opacity: 0, x: -60, y: 20, rotate: -12 }}
            animate={inView ? { opacity: 1, x: 0, y: 0, rotate: -6 } : {}}
            transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.4 }}
            className="hidden xl:flex absolute top-[5%] xl:left-[1%] 2xl:left-[8%] items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 dark:border-white/20 backdrop-blur-xl rounded-2xl border border-gray-200/60 dark:border-gray-700/50 shadow-2xl z-0"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shadow-inner">
              <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-left">
              <div className="text-xs font-extrabold text-gray-900 dark:text-white">AI Assistant</div>
              <div className="text-[10px] font-medium text-gray-500">Drafts ready in 2s</div>
            </div>
          </MotionWrapper>

          <MotionWrapper
            initial={{ opacity: 0, x: 60, y: 20, rotate: 12 }}
            animate={inView ? { opacity: 1, x: 0, y: 0, rotate: 6 } : {}}
            transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.4 }}
            className="hidden xl:flex absolute top-[35%] xl:right-[1%] 2xl:right-[8%] items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 dark:border-white/20 backdrop-blur-xl rounded-2xl border border-gray-200/60 dark:border-gray-700/50 shadow-2xl z-0"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shadow-inner">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-xs font-extrabold text-gray-900 dark:text-white">Webhook Integration</div>
              <div className="text-[10px] font-medium text-gray-500">Real-time updates</div>
            </div>
          </MotionWrapper>

          {/* Ultra-Modern Announcement Badge */}
          <MotionWrapper
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 relative z-10"
          >
            <div className="group relative inline-flex items-center gap-2 px-1.5 pr-4 py-1.5 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-[var(--theme-color)]/40 transition-all cursor-alias">
              {/* <span className="bg-[var(--theme-color)] text-[var(--theme-color-foreground)] text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full shadow-inner">
                New
              </span> */}
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                Introducing DocStar AI
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 group-hover:text-[var(--theme-color)] transition-all duration-300" />
            </div>
          </MotionWrapper>

          {/* Epic Headline with SVG Underline */}
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto mb-8 relative z-10"
          >
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-black tracking-[-0.03em] text-gray-950 dark:text-white leading-[1.05] lg:leading-[1.05]">
              Turn Documentations Into{" "}
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-bl from-[var(--theme-color)] via-cyan-500 to-black/80 dark:to-cyan-500 via-blue-500">
                  Team's culture.
                </span>
                <svg className="absolute w-full h-4 -bottom-1 left-0 text-[var(--theme-color)]/30 dark:text-[var(--theme-color)]/40 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,15 Q50,25 100,5" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
          </MotionWrapper>

          {/* Crisp Subtitle */}
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto mb-10 relative z-10"
          >
            <p className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
              Create, organize, and discover documentation with AI. Build internal knowledgebases and beautiful public docs in seconds.
            </p>
          </MotionWrapper>

          {/* Dynamic CTAs */}
          <MotionWrapper
            className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full sm:w-auto relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative group w-full sm:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--theme-color)] to-blue-500 rounded-2xl blur-md opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <Link
                href={loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-gray-950 dark:bg-white dark:text-gray-950 rounded-xl transition-all shadow-xl hover:scale-[1.02]"
              >
                Start Building Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <button
              type="button"
              onClick={openScheduler}
              className="w-full sm:w-auto inline-flex cursor-pointer items-center justify-center px-8 py-4 text-base font-bold text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all shadow-sm hover:shadow-md hover:scale-[1.02]"
            >
              Book a Demo
            </button>
          </MotionWrapper>

          {/* Developer-Centric Shortcut Hint */}
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="my-10 flex items-center justify-center gap-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 relative z-10"
          >
            <span>Press</span>
            <div className="flex items-center gap-1">
              <kbd className="flex items-center justify-center min-w-[24px] h-7 px-1.5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded font-sans text-xs font-bold shadow-sm text-gray-700 dark:text-gray-300">
                {osKey}
              </kbd>
              <kbd className="flex items-center justify-center min-w-[24px] h-7 px-1.5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded font-sans text-xs font-bold shadow-sm text-gray-700 dark:text-gray-300">
                K
              </kbd>
            </div>
            <span>to explore the docs</span>
          </MotionWrapper>
        </div>

        {/* Carousel Integrated Elegantly Below */}
        <MotionWrapper
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full mt-16 lg:mt-24 relative z-10"
        >
          <ImageCarousel heroImages={heroImages} />
        </MotionWrapper>
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
