"use client";

import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

export default function CTASection({
  title = "Ready to supercharge your documentation?",
  description = "Join thousands of global teams using DocStar to deliver world-class documentation.",
  buttonText = "Get Started for Free"
}: CTASectionProps) {
  return (
    <div className="py-32 relative overflow-hidden w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="absolute inset-0 bg-zinc-950"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      
      {/* Animated Background Rays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl animate-pulse"></div>

      <div className="container mx-auto relative px-4 sm:px-6 text-center z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <Shield className="w-16 h-16 text-white mb-8 opacity-90" />
          
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
            {title}
          </h2>

          <p className="text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
            {description}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-white text-zinc-900 text-lg font-bold rounded-2xl shadow-2xl flex items-center gap-3 hover:bg-zinc-100 transition-colors"
            onClick={() => window.open("https://app.docstar.io/login", "_blank")}
          >
            {buttonText}
            <ArrowRight className="w-6 h-6" />
          </motion.button>
          <p className="text-white/60 text-sm mt-6">No credit card required. Setup in minutes.</p>
        </motion.div>
      </div>
    </div>
  );
}
