import { CustomizeLayoutsPage } from "./CustomizeLayoutsPage"
import { fetchMeta } from "@/services/meta.api";
import { generateSEOMetadata } from "@/lib/seo";
import { type MetaItem } from "@/types/data-types";

export async function generateMetadata() {
  let meta: MetaItem | null = null;

  try {
    meta = await fetchMeta("/themes");
  } catch (error) {
    console.error("[ThemesPage] Unable to load meta from API:", error);
  }

  return generateSEOMetadata({
    meta,
    pathname: "/themes",
  });
}

export default function Page() {
  return <CustomizeLayoutsPage />
}
