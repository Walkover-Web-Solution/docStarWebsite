// app/ai-powered-search/page.tsx
import React from "react"
import { AIPoweredSearchClient } from "./AIPoweredSearchClient"

export const metadata = {
  title: "AI-Powered Search | DocStar",
  description:
    "Discover the most relevant content across documentation and knowledge bases",
}
const AIPoweredSearchPage = () => {
  return <AIPoweredSearchClient />
}

export default AIPoweredSearchPage
