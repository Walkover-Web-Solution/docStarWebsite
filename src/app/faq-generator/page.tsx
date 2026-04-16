// app/faq-generator/page.tsx
import React from "react"
import { FAQGeneratorClient } from "./FAQGeneratorClient"

export const metadata = {
  title: "FAQ Generator | DocStar",
  description:
    "Automatically generate FAQs from your content using AI. Review, edit, and publish only what you approve.",
}

const FAQGeneratorPage = () => {
  return <FAQGeneratorClient />
}

export default FAQGeneratorPage
