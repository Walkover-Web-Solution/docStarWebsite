import { Metadata } from "next";
import { MetaItem } from "@/types/data-types";

interface SEOConfig {
  meta?: MetaItem | null;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultKeywords?: string[];
  siteName?: string;
  baseUrl?: string;
  ogImageUrl?: string;
  pathname?: string;
}

export function generateSEOMetadata({
  meta,
  defaultTitle = "DocStar",
  defaultDescription = "",
  defaultKeywords = [],
  siteName = "DocStar",
  baseUrl = "https://docstar.ai",
 // ogImageUrl = "",
  pathname = "",
}: SEOConfig): Metadata {
  const title = meta?.title ?? defaultTitle;
  const description = meta?.description ?? defaultDescription;
  const keywords = meta?.keywords ?? defaultKeywords;
  const fullUrl = `${baseUrl}${pathname}`;

  return {
    title,
    description,
    keywords,

    openGraph: {
      title,
      description,
      siteName: meta?.name ?? siteName,
      type: "website",
      url: fullUrl,
    //   images: [
    //     {
    //       url: ogImageUrl,
    //       width: 1200,
    //       height: 630,
    //       alt: title,
    //     },
    //   ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    //   images: [ogImageUrl],
    },
  };
}