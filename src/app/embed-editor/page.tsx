import EmbedEditorPageClient from "./EmbedEditorPageClient"
import { fetchMeta } from "@/services/meta.api";
import { generateSEOMetadata } from "@/lib/seo";
import { type MetaItem } from "@/types/data-types";

export async function generateMetadata() {
  let meta: MetaItem | null = null;

  try {
    meta = await fetchMeta("/embed-editor");
  } catch (error) {
    console.error("[EmbedEditorPage] Unable to load meta from API:", error);
  }

  return generateSEOMetadata({
    meta,
    pathname: "/embed-editor",
  });
}

export default function Page() {
  return <EmbedEditorPageClient />
}
