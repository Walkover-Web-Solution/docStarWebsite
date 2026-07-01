import { FileText, BarChart, List, CheckCircle } from "lucide-react";
import Link from "next/link";
import MotionWrapper from "../motion/MotionDivWrapper";

export default function DocsTemplatesSection() {
  return (
    <section
      className="w-full py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-b theme-border bg-[var(--theme-bg)] relative overflow-hidden"
      id="docs-templates-section"
    >
      {/* Vibrant Background Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-red-500 to-red-600 opacity-[0.08] dark:opacity-[0.12] blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            <MotionWrapper
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--theme-color)]/20 shadow-sm text-sm font-medium bg-[var(--theme-color)]/5">
                <FileText className="w-4 h-4 text-[var(--theme-color)]" />
                <span className="text-[var(--theme-color)]">Knowledge base / FAQ</span>
              </div>

              <div className="space-y-4">
                <h3 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]">
                  Turn information into <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-red-800">actionable knowledge.</span>
                </h3>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                  Create and publish beautiful, AI-optimized documentation and knowledge bases that stay up-to-date, accelerate onboarding, and surface instantly in search.
                </p>
              </div>

              <Link href="/features" target="_blank" className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gray-950 hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200 rounded-full transition-all shadow-sm">
                Explore Features
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </MotionWrapper>

            <div className="grid sm:grid-cols-2 gap-4 pt-6">
              <MotionWrapper
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 rounded-2xl bg-gray-50/50 dark:bg-gray-900/50 border theme-border hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center border theme-border mb-5 group-hover:scale-110 transition-transform shadow-sm">
                  <BarChart className="w-6 h-6 text-[var(--theme-color)]" />
                </div>
                <h4 className="text-lg font-bold mb-2">Page Analytics</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Understand how your documentation performs with real data about user activity, health, and feedback.
                </p>
              </MotionWrapper>

              <MotionWrapper
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-6 rounded-2xl bg-gray-50/50 dark:bg-gray-900/50 border theme-border hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center border theme-border mb-5 group-hover:scale-110 transition-transform shadow-sm">
                  <List className="w-6 h-6 text-[var(--theme-color)]" />
                </div>
                <h4 className="text-lg font-bold mb-2">Smart Navigation</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Generates structured outlines for every page, helping readers navigate complex guides effortlessly.
                </p>
              </MotionWrapper>
            </div>
          </div>

          {/* Right Content - Documentation Preview */}
          <MotionWrapper
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-full rounded-[2rem] border theme-border shadow-2xl bg-gray-100 dark:bg-gray-900 p-2 sm:p-4 group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--theme-color)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"></div>
            
            <div className="relative rounded-xl overflow-hidden border theme-border shadow-sm">
              <div className="flex items-center gap-2 px-4 py-3 border-b theme-border bg-white dark:bg-gray-950">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-gray-200 border border-gray-300 dark:bg-gray-700 dark:border-gray-600" />
                  <div className="w-3 h-3 rounded-full bg-gray-200 border border-gray-300 dark:bg-gray-700 dark:border-gray-600" />
                  <div className="w-3 h-3 rounded-full bg-gray-200 border border-gray-300 dark:bg-gray-700 dark:border-gray-600" />
                </div>
              </div>
              <img
                src="/template-section-images/docstar-docs.webp"
                alt="Documentation Interface Preview"
                className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
