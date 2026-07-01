"use client";

import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { Faq } from "@/types/data-types";
import MotionWrapper from "./motion/MotionDivWrapper";

type FAQSectionProps = {
  faqs: Faq[];
};

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[var(--theme-bg)] border-y theme-border">
      {/* Subtle Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--theme-color)]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Header Content */}
          <div className="lg:col-span-5 py-4">
            <MotionWrapper
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border theme-border shadow-sm text-sm font-medium bg-[var(--theme-bg-secondary)]">
                <MessageCircleQuestion className="w-4 h-4 text-[var(--theme-color)]" />
                <span>Support & Answers</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                Frequently Asked Questions
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
                Find quick answers to the most asked questions about DocStar and how it can supercharge your documentation workflow.
              </p>
            </MotionWrapper>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {faqs?.map((faq, index) => (
              <MotionWrapper
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div 
                  className={`rounded-2xl border transition-all duration-300 ${
                    openIndex === index 
                    ? "border-[var(--theme-color)]/30 bg-white/50 dark:bg-gray-900/50 shadow-md backdrop-blur-sm" 
                    : "theme-border bg-transparent hover:bg-gray-50 dark:hover:bg-gray-900/30"
                  }`}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer group"
                    onClick={() => handleToggle(index)}
                  >
                    <span className="font-semibold text-[1.1rem] leading-relaxed text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border theme-border transition-colors duration-300 ${openIndex === index ? 'bg-[var(--theme-color)]/10 border-[var(--theme-color)]/30' : 'bg-white dark:bg-gray-800 group-hover:bg-gray-100 dark:group-hover:bg-gray-700'}`}>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${openIndex === index ? "rotate-180 text-[var(--theme-color)]" : "text-gray-500 dark:text-gray-400"}`}
                      />
                    </div>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-500 ease-in-out px-6 ${
                      openIndex === index
                        ? "grid-rows-[1fr] opacity-100 pb-5"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0">
                      <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed pr-8">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
