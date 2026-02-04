// app/ai-powered-search/page.tsx
import React from "react"
import { AIPoweredSearchClient } from "./AIPoweredSearchClient"
import { fetchMeta } from "@/services/meta.api";
import { generateSEOMetadata } from "@/lib/seo";
import { type MetaItem } from "@/types/data-types";

export async function generateMetadata() {
  let meta: MetaItem | null = null;

  try {
    meta = await fetchMeta("/ai-powered-search");
  } catch (error) {
    console.error("[AIPoweredSearchPage] Unable to load meta from API:", error);
  }

  return generateSEOMetadata({
    meta,
    pathname: "/ai-powered-search",
  });
}

const AIPoweredSearchPage = () => {
  return <AIPoweredSearchClient />
}

export default AIPoweredSearchPage
