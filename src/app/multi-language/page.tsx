import MultiLanguageClient from "./MultiLanguageClient"
import { fetchMeta } from "@/services/meta.api";
import { generateSEOMetadata } from "@/lib/seo";
import { type MetaItem } from "@/types/data-types";

export async function generateMetadata() {
  let meta: MetaItem | null = null;

  try {
    meta = await fetchMeta("/multi-language");
  } catch (error) {
    console.error("[MultiLanguagePage] Unable to load meta from API:", error);
  }

  return generateSEOMetadata({
    meta,
    pathname: "/multi-language",
  });
}

export default function MultiLanguagePage() {
  return <MultiLanguageClient />
}
