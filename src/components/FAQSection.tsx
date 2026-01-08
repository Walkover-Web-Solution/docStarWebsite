"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Faq } from "@/types/data-types"

type FAQSectionProps = {
  faqs: Faq[]
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className="py-20 text-black">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="h2 mt-3 text-3xl font-semibold sm:text-4xl">Frequently Asked Questions</h2>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:gap-4">
          {faqs?.map((faq, index) => (
            <div key={index} className="hover:bg-neutral-50 flex h-full flex-col overflow-hidden rounded border border-neutral-200 transition-all duration-200">
              <button type="button" className="flex w-full items-center justify-between cursor-pointer px-4 py-4 min-h-[4.25rem]" onClick={() => handleToggle(index)}>
                <span className="font-semibold leading-snug transition-colors duration-200">{faq.question}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`} />
              </button>
              <div className="px-4 transition-all duration-300 ease-out" style={{ height: openIndex === index ? "auto" : "0", paddingBottom: openIndex === index ? "1rem" : "0" }}>
                <p className="leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
