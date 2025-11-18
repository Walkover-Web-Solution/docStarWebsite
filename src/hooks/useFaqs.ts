"use client"

import { useEffect, useState } from "react"

export type FAQItem = {
  question: string
  answer: string
}

const TABLE_API_BASE = "https://table-api.viasocket.com/68e89f851e8b7c70f10b866a"
const AUTH_KEY = "keydU5xiLDXEbbX"

export function useFaqs(tableId: string) {
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchFaqs = async () => {
      if (!tableId) {
        setError("Missing FAQ table id")
        setFaqs([])
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${TABLE_API_BASE}/${tableId}`, {
          cache: "no-store",
          headers: {
            "auth-key": AUTH_KEY,
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch FAQs: ${response.status}`)
        }

        const json = await response.json()
        const rows = json?.data?.rows ?? []

        const normalizedFaqs: FAQItem[] = rows
          .filter(
            (row: any) =>
              typeof row?.name === "string" &&
              row.name.trim().length > 0 &&
              typeof row?.answers === "string" &&
              row.answers.trim().length > 0,
          )
          .map((row: any) => ({
            question: row.name.trim(),
            answer: row.answers.trim(),
          }))

        if (!isMounted) {
          return
        }

        setFaqs(normalizedFaqs)
      } catch (err) {
        if (!isMounted) {
          return
        }

        setFaqs([])
        setError(err instanceof Error ? err.message : "Unable to load FAQs")
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchFaqs()

    return () => {
      isMounted = false
    }
  }, [tableId])

  return { faqs, isLoading, error }
}
