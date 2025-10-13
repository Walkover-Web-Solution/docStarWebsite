"use client"

import { useEffect, useState } from "react"
import { useFaqs } from "@/hooks/useFaqs"

type FAQSectionProps = {
  tableId: string
  heading: string
  eyebrow?: string
  description?: string
  variant?: "light" | "dark"
  id?: string
}

export default function FAQSection({
  tableId,
  heading,
  eyebrow = "FAQs",
  description,
  variant = "light",
  id,
}: FAQSectionProps) {
  const { faqs, isLoading, error } = useFaqs(tableId)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!isLoading && faqs.length > 0) {
      setActiveIndex(0)
    } else if (!isLoading && faqs.length === 0) {
      setActiveIndex(null)
    }
  }, [faqs, isLoading])

  const isDark = variant === "dark"

  const sectionClass = [
    "relative py-20 transition-colors duration-300",
    isDark ? "bg-neutral-950 text-neutral-50" : "bg-white text-neutral-900",
  ].join(" ")

  const containerClass = "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"

  const cardClass = [
    "rounded-2xl border px-6 py-5 shadow-sm transition-all duration-200",
    isDark
      ? "border-white/10 bg-neutral-900/80 hover:border-amber-400 hover:bg-amber-400/10"
      : "border-neutral-200 bg-white hover:border-amber-300 hover:bg-amber-50",
  ].join(" ")

  const buttonClass = "group flex w-full items-center justify-between gap-4 text-left cursor-pointer"

  const questionClass = [
    "text-base sm:text-lg font-semibold transition-colors duration-200",
    isDark ? "text-neutral-50 group-hover:text-amber-300" : "text-neutral-900 group-hover:text-amber-600",
  ].join(" ")

  const iconClass = [
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm transition-all duration-200",
    isDark
      ? "border-white/10 bg-neutral-900 text-neutral-300 group-hover:border-amber-400 group-hover:bg-amber-500/10 group-hover:text-amber-300"
      : "border-neutral-200 bg-neutral-50 text-neutral-500 group-hover:border-amber-300 group-hover:bg-amber-100 group-hover:text-amber-600",
  ].join(" ")

  const answerWrapperClass = [
    "grid overflow-hidden transition-all duration-300 ease-out",
    isDark ? "text-neutral-300" : "text-neutral-600",
  ].join(" ")

  return (
    <section id={id} className={sectionClass}>
      <div className={containerClass}>
        <div className="text-center max-w-3xl mx-auto">
          <p
            className={[
              "text-sm font-semibold uppercase tracking-wider",
              isDark ? "text-amber-300" : "text-neutral-500",
            ].join(" ")}
          >
            {eyebrow}
          </p>
          <h2
            className={[
              "mt-3 text-3xl sm:text-4xl font-semibold",
              isDark ? "text-neutral-50" : "text-neutral-900",
            ].join(" ")}
          >
            {heading}
          </h2>
          {description && (
            <p
              className={[
                "mt-4 text-base",
                isDark ? "text-neutral-300" : "text-neutral-600",
              ].join(" ")}
            >
              {description}
            </p>
          )}
        </div>

        <div className="mt-12 space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={[
                    "animate-pulse rounded-2xl border px-6 py-5",
                    isDark ? "border-white/5 bg-neutral-900/60" : "border-neutral-200 bg-neutral-50",
                  ].join(" ")}
                >
                  <div className={isDark ? "h-5 w-3/4 rounded bg-neutral-800" : "h-5 w-3/4 rounded bg-neutral-200"} />
                  <div className={isDark ? "mt-3 h-4 w-full rounded bg-neutral-800" : "mt-3 h-4 w-full rounded bg-neutral-200"} />
                  <div className={isDark ? "mt-2 h-4 w-1/2 rounded bg-neutral-800" : "mt-2 h-4 w-1/2 rounded bg-neutral-200"} />
                </div>
              ))}
            </div>
          ) : faqs.length === 0 ? (
            <div
              className={[
                "rounded-2xl border px-6 py-8 text-center text-sm",
                isDark
                  ? "border-white/10 bg-neutral-900/60 text-neutral-300"
                  : "border-neutral-200 bg-neutral-50 text-neutral-500",
              ].join(" ")}
            >
              {error ? "We couldn't load the FAQs right now. Please try again soon." : "FAQ content is on its way. Check back soon."}
            </div>
          ) : (
            faqs.map((faq, index) => {
              const isOpen = activeIndex === index

              return (
                <div key={faq.question} className={cardClass}>
                  <button
                    type="button"
                    className={buttonClass}
                    onClick={() => setActiveIndex((current) => (current === index ? null : index))}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                  >
                    <span className={questionClass}>{faq.question}</span>
                    <span className={iconClass}>
                      {isOpen ? "-" : "+"}
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${index}`}
                    className={`${answerWrapperClass} ${isOpen ? "grid-rows-[1fr] pt-4 opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
