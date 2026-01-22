"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Faq } from "@/types/data-types"
import Link from "next/link"

type FAQSectionProps = {
  faqs: Faq[]
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="lg:pr-8 py-4">
            <h2 className="text-4xl md:text-5xl font-medium mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg">
              Find quick answers to the most asked questions about <Link className="underline" target="_blank" href="https://docstar.io">DocStar.io</Link>
            </p>
          </div>
          
          <div className="flex flex-col">
            {faqs?.map((faq, index) => (
              <div key={index} className="border-b border-color">
                <button 
                  type="button" 
                  className="flex w-full items-start justify-between gap-4 py-4 text-left cursor-pointer group" 
                  onClick={() => handleToggle(index)}
                >
                  <span className="font-medium leading-relaxed pr-4">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-200 mt-1 opacity-60 ${openIndex === index ? "rotate-180" : "rotate-0"}`} />
                </button>
                <div 
                  className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index 
                      ? "grid-rows-[1fr] opacity-100" 
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <p className="leading-relaxed pb-6 opacity-80">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
