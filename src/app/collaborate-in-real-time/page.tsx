import CollaborateContent from "./CollaborateContent";
import { fetchMeta } from "@/services/meta.api";
import { generateSEOMetadata } from "@/lib/seo";
import { type MetaItem } from "@/types/data-types";

export async function generateMetadata() {
  let meta: MetaItem | null = null;

  try {
    meta = await fetchMeta("/collaborate-in-real-time");
  } catch (error) {
    console.error("[CollaboratePage] Unable to load meta from API:", error);
  }

  return generateSEOMetadata({
    meta,
    pathname: "/collaborate-in-real-time",
  });
}

export default function CollaboratePage() {
  return <CollaborateContent />;
}
