/**
 * Fetches and renders an accordion-style FAQ section with optional theming and loading skeletons.
 * Uses client-side interactions to animate expand/collapse behavior and skeleton states.
 */
"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { useFaqs } from "@/hooks/useFaqs"

type FAQSectionProps = {
  /** Identifies which FAQ table to fetch from the backend. */
  tableId: string
  /** Optional heading text displayed above the accordion. */
  heading?: string
  eyebrow?: string
  eyebrowClassName?: string
  /** Supporting copy that appears below the heading. */
  description?: string
  /** Switches between light and dark presentation variants. */
  variant?: "light" | "dark"
  /** HTML id used for skip links or in-page anchors. */
  id?: string
}

/**
 * Renders a themed FAQ list that retrieves questions via the `useFaqs` hook and supports dark/light variants.
 */
export default function FAQSection({
  tableId,
  heading,
  eyebrow = "FAQs",
  eyebrowClassName,
  description,
  variant = "light",
  id,
}: FAQSectionProps) {
  // Fetch the FAQs for this section and expose request state for skeletons or fallbacks.
  const { faqs, isLoading, error } = useFaqs(tableId)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    // Reset the open panel when the FAQ data changes to avoid stale selections.
    setOpenIndex(null)
  }, [faqs])

  const isDark = variant === "dark"

  const sectionClass = [
    "relative py-10 transition-colors duration-300",
    isDark ? "bg-neutral-950 text-neutral-50" : "bg-white text-neutral-900",
  ].join(" ")

  const containerClass = "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"

  const faqGridClass = "mt-8 flex flex-col gap-3 sm:gap-4"

  const cardClass = [
    "flex h-full flex-col overflow-hidden rounded-lg border transition-all duration-200",
    isDark
      ? "border-white/10 bg-transparent hover:border-amber-400"
      : "border-neutral-200 bg-white hover:border-amber-300 hover:bg-amber-50",
  ].join(" ")

  const buttonClass = [
    "group flex w-full items-center justify-between text-left cursor-pointer px-5 py-5 min-h-[4.25rem]",
    isDark ? "text-neutral-50" : "text-neutral-900",
  ].join(" ")

  const questionClass = [
    "text-sm sm:text-base font-semibold leading-snug transition-colors duration-200",
    isDark ? "group-hover:text-amber-300" : "group-hover:text-amber-600",
  ].join(" ")

  const answerWrapperClass = [
    "grid transition-all duration-300 ease-out",
    isDark ? "text-neutral-300" : "text-neutral-600",
  ].join(" ")

  return (
    <section id={id} className={sectionClass}>
      <div className={containerClass}>
        <div className="mx-auto max-w-3xl text-center">
          <p
            className={[
              "text-sm font-semibold uppercase tracking-wider",
              eyebrowClassName ? eyebrowClassName : isDark ? "text-amber-300" : "text-neutral-500",
            ].join(" ")}
          >
            {eyebrow}
          </p>
          {heading && (
            <h2
              className={[
                "mt-3 text-3xl font-semibold sm:text-4xl",
                isDark ? "text-neutral-50" : "text-neutral-900",
              ].join(" ")}
            >
              {heading}
            </h2>
          )}
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

        <div className={faqGridClass}>
          {isLoading ? (
            // Show a four-card skeleton grid while the FAQs load to maintain layout stability.
            [0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={[
                  "flex h-full flex-col justify-center gap-3 rounded-lg border px-4 py-6 animate-pulse",
                  isDark ? "border-white/10 bg-neutral-900/20" : "border-neutral-200 bg-neutral-50",
                ].join(" ")}
              >
                <div className={isDark ? "h-5 w-3/4 rounded bg-neutral-800" : "h-5 w-3/4 rounded bg-neutral-200"} />
                <div className={isDark ? "h-4 w-full rounded bg-neutral-800" : "h-4 w-full rounded bg-neutral-200"} />
                <div className={isDark ? "h-4 w-1/2 rounded bg-neutral-800" : "h-4 w-1/2 rounded bg-neutral-200"} />
              </div>
            ))
          ) : faqs.length === 0 ? (
            // Provide an informative fallback when there is no FAQ data or the fetch failed.
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
              const isOpen = openIndex === index
              const openStyles = isOpen
                ? isDark
                  ? "border-amber-400/60 bg-neutral-900/40"
                  : "border-amber-300 bg-amber-50/60"
                : ""

              return (
                <div key={faq.question} className={`${cardClass} ${openStyles}`}>
                  <button
                    type="button"
                    className={buttonClass}
                    // Toggle the accordion item, closing it if it was already open.
                    onClick={() => setOpenIndex((current) => (current === index ? null : index))}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                  >
                    <span className={questionClass}>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${
                        isDark
                          ? "text-neutral-200 group-hover:text-amber-300"
                          : "text-neutral-500 group-hover:text-amber-600"
                      }`}
                    />
                  </button>
                  <div
                    id={`faq-panel-${index}`}
                    className={`${answerWrapperClass} ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className={`${isOpen ? "px-4 pb-3 pt-1" : "px-4 pb-0"} overflow-hidden`}>
                      <p className="text-sm leading-relaxed">{faq.answer}</p>
                    </div>
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
