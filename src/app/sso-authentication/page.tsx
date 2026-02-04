import { SsoAuthentication } from "./SsoAuthentication"
import { fetchMeta } from "@/services/meta.api";
import { generateSEOMetadata } from "@/lib/seo";
import { type MetaItem } from "@/types/data-types";

export async function generateMetadata() {
  let meta: MetaItem | null = null;

  try {
    meta = await fetchMeta("/sso-authentication");
  } catch (error) {
    console.error("[SsoAuthenticationPage] Unable to load meta from API:", error);
  }

  return generateSEOMetadata({
    meta,
    pathname: "/sso-authentication",
  });
}

export default function Page() {
  return <SsoAuthentication />
}
