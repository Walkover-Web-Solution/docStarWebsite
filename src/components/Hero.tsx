import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import DocsTemplatesSection from "./FeatureMain";

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // headline rotation (optional, can remove if not needed)
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
        {/* Background image (lazy load + smaller size recommended) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg2.jpg')" }}
        />

        <div className="relative min-h-screen flex flex-col items-center justify-center z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Heading */}
          <motion.div
            className="font-bold text-black mb-8 mt-20 md:mt-0 text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="pt-10 text-white leading-[1.3]">
              The platform <span className="leading-[1.3]">that</span>
              <br />
              turns{" "}
              <span className="bg-black/50 text-rose-200 px-3 rounded-md">
                documentation
              </span>{" "}
              into
              <br />
              <span className="italic font-bold">team culture</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-base md:text-2xl text-black mb-12 max-w-3xl mx-auto leading-relaxed bg-gradient-to-b from-neutral-100 to-zinc-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Write blogs, craft FAQs, and build internal knowledgebase — faster, smarter, together.
          </motion.p>

          {/* Badge */}
          <div className="flex items-center bg-black/40 justify-center gap-2 mb-12 px-4 py-2 rounded-full">
            <Sparkles className="w-5 h-5 text-white/60" />
            <p className="text-sm sm:text-2xl font-extrabold font-mono -mt-1 text-white md:text-start sm:text-xs">
              AI-Powered Documentation Platform
            </p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.a
              href="https://app.docstar.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border border-white/40 font-semibold px-6 py-3 text-rose-200 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started for Free
              <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href="https://cal.com/docstar-team"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl font-semibold text-lg text-white bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:bg-white/20 hover:shadow-xl transition-all duration-300 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Demo
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Lazy load heavy section */}
      <DocsTemplatesSection />
    </>
  );
};

export default Hero;
