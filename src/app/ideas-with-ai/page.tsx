import { IdeasWithAIClient } from "./IdeasWithAIClient"
import { fetchMeta } from "@/services/meta.api";
import { generateSEOMetadata } from "@/lib/seo";
import { type MetaItem } from "@/types/data-types";

export async function generateMetadata() {
  let meta: MetaItem | null = null;

  try {
    meta = await fetchMeta("/ideas-with-ai");
  } catch (error) {
    console.error("[IdeasWithAIPage] Unable to load meta from API:", error);
  }

  return generateSEOMetadata({
    meta,
    pathname: "/ideas-with-ai",
  });
}

export default function IdeasWithAIPage() {
  return <IdeasWithAIClient />
}
