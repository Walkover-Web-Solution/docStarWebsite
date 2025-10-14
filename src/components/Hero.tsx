"use client";

import { useInView } from "react-intersection-observer";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import DocsTemplatesSection from "./FeatureMain";

import bg3 from "../../public/bg4.jpg";
import MotionWrapper from "./motion/MotionDivWrapper";

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const headlineWords = ["creators", "developers", "teams"];
  const [index, setIndex] = useState(0);
  const [showScheduler, setShowScheduler] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlineWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showScheduler) {
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
        className="relative flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Gradient fallback so the hero never flashes white */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        {/* Optimized background image */}
        <div className="absolute inset-0">
          <Image
            src={bg3}
            alt="Background"
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            quality={60}
            className="object-cover blur-sm"
          />
        </div>

        <div className="relative min-h-screen md:mt-12 gap-8 flex flex-col items-center justify-center z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Heading */}
          <MotionWrapper
            className="font-bold text-black mt-20 md:mt-0 text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="pt-10 text-white leading-[1.3]">
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
            className="md:text-2xl max-w-3xl mx-auto leading-relaxed text-white font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Write blogs, craft FAQs, and build internal knowledgebase — faster,
            smarter, together.
          </MotionWrapper>

          {/* Badge */}
          <MotionWrapper
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.4em] text-white/85"
          >
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-transparent via-white/70 to-transparent" aria-hidden />
            <Sparkles className="h-3.5 w-3.5 text-amber-200 drop-shadow" />
            <span className="pl-3">AI-Powered Documentation Platform</span>
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
              className="text-lg rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border border-white/40 font-bold px-6 py-3 text-white flex items-center"
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
              className="px-6 py-3 rounded-2xl font-semibold text-lg text-white bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:bg-white/20 hover:shadow-xl transition-all duration-300 flex items-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
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
