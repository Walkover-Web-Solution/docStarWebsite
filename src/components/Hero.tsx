import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Sparkles, Zap, Code, PenTool, Globe, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DocsTemplatesSection from "./FeatureMain";

const Hero = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const headlineWords = ["creators", "developers", "teams"];
  const [index, setIndex] = useState(0);

  // Change word every 2 seconds
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
        className="relative flex-col flex items-center justify-center overflow-hidden"
      >
        {/* Simple Background */}
        <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/bg2.jpg')" }}
  />
        <div className="relative min-h-screen flex flex-col items-center justify-center  z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}

          {/* Main Heading */}
          <motion.div
            className="text-5xl md:text-7xl font-bold text-black mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="mb-2 pt-10 text-white">
              One workspace
              Infinite possibilities.
            </h1>
            <h1 className="mb-4 md:gap-4 text-white grid grid-cols-1 md:grid-cols-2">
              <span className="md:text-end">  Built for{" "}</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={headlineWords[index]}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-cyan-200 md:text-start"
                >
                  {headlineWords[index]}
                </motion.span>
              </AnimatePresence>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-black mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* bg-gradient-to-r from-slate-400 to-slate-700 bg-clip-text text-transparent */}
            <p className="text-black mb-3 font-medium bg-gradient-to-b from-neutral-100 to-zinc-400 bg-clip-text text-transparent">
              Stop juggling tools, your single hub for knowledge. Write blogs, craft FAQs, and deliver API docs — faster, smarter, together.
            </p>
          </motion.p>

          <div className="flex items-center ml-auto justify-center gap-2 mb-12 px-4 py-2 rounded-full">
                <Sparkles className="w-5 h-5 text-white/60" />
                <p className="text-xl font-extrabold font-mono -mt-1 text-white md:text-start">
                    AI-Powered Documentation Platform
                </p>
            </div>

          {/* CTA Buttons */}
          {/* <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.a
              href="https://app.docstar.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-rose-200 text-grey-500 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cursor-hover
            >
              Get Started for Free
              <ArrowRight className="h-5 w-5 ml-2" />
            </motion.a>

            <motion.a
              href="https://cal.com/docstar-team"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-600 font-semibold text-lg px-8 py-4 rounded-xl hover:border-gray-600 transition-colors duration-300 bg-cyan-100"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-cursor-hover
            >
              Schedule Demo
            </motion.a>
          </motion.div> */}

{/* bg-[rgba(247,0,0,0)] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md border border-[rgba(247,0,0,0.3)]" */}

{/* <motion.div
  className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
  initial={{ opacity: 0, y: 20 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, delay: 0.6 }}
>
  
  <motion.a
    href="https://app.docstar.io/login"
    target="_blank"
    rel="noopener noreferrer"
    className="group relative px-6 py-3 rounded-2xl font-semibold text-lg text-white 
               bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg 
               hover:bg-white/20 hover:shadow-xl transition-all duration-300 flex items-center"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    data-cursor-hover
  >
    Get Started for Free
    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
  </motion.a>

  
  <motion.a
    href="https://cal.com/docstar-team"
    target="_blank"
    rel="noopener noreferrer"
    className="group relative px-6 py-3 rounded-2xl font-semibold text-lg text-white 
               bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg 
               hover:bg-white/20 hover:shadow-xl transition-all duration-300 flex items-center"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    data-cursor-hover
  >
    Schedule Demo
  </motion.a>
</motion.div> */}


<motion.div
  className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
  initial={{ opacity: 0, y: 20 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, delay: 0.6 }}
>
  {/* Liquid Glass Button 1 */}
  <motion.a
    href="https://app.docstar.io/login"
    target="_blank"
    rel="noopener noreferrer"
    className="text-lg rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border flex items-center  border-white/20 font-semibold px-6 py-3 text-rose-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    data-cursor-hover
  >
    Get Started for Free
    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
  </motion.a>

  {/* Liquid Glass Button 2 */}
  <motion.a
    href="https://cal.com/docstar-team"
    target="_blank"
    rel="noopener noreferrer"
    className="group relative px-6 py-3 rounded-2xl font-semibold text-lg text-white 
               bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg 
               hover:bg-white/20 hover:shadow-xl transition-all duration-300 flex items-center"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    data-cursor-hover
  >
    Schedule Demo
  </motion.a>
</motion.div>


        </div>
      </section>
          <DocsTemplatesSection />
    </>
  );
};

export default Hero;