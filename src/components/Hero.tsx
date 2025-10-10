"use client";

import { useInView } from "react-intersection-observer";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import DocsTemplatesSection from "./FeatureMain";

import bg3 from '../../public/bg4.jpg'
import MotionWrapper from "./motion/MotionDivWrapper";

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const headlineWords = ["creators", "developers", "teams"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlineWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section
        ref={ref}
        className="relative flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Optimized background image */}
        <div className="absolute inset-0">
          <Image
            src={bg3}
            alt="Background"
            fill
            priority
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
            className="flex items-center border border-white/40 bg-black/60 justify-center gap-2 px-4 py-2 rounded-full"
          >
            <Sparkles className="w-5 h-5 text-white font-black" />
            <p className="text-sm sm:text-2xl font-black -mt-1 text-white md:text-start sm:text-xs">
              AI-Powered Documentation Platform
            </p>
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
              as="a"
              href="https://cal.com/docstar-team"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl font-semibold text-lg text-white bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:bg-white/20 hover:shadow-xl transition-all duration-300 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Demo
            </MotionWrapper>
          </MotionWrapper>
        </div>
      </section>

      {/* Lazy load heavy section */}
      <DocsTemplatesSection />
    </>
  );
};

export default Hero;
