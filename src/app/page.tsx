import FAQSection from "@/components/FAQSection";
import Hero from "@/components/homeSection/Hero";
import JsonLd from "@/components/seo/JsonLd";
import { fetchFeatures } from "@/services/features.api";
import { fetchHeroImages } from "@/services/hero-images.api";
import { fetchFaqs } from "@/services/faqs.api";
import { fetchTestimonials } from "@/services/testimonials.api";
import { type FeatureItem, type MetaItem, type HeroImage, type Faq, type TestimonialItem } from "@/types/data-types";
import { fetchMeta } from "@/services/meta.api";
import { generateSEOMetadata, normalizeKeywords } from "@/lib/seo";
import { buildStructuredDataGraph, buildCanonicalUrl } from "@/lib/structuredData";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function generateMetadata() {
  let meta: MetaItem | null = null;

  try {
    meta = await fetchMeta("/");
  } catch (error) {
    console.error("[HomePage] Unable to load meta from API:", error);
  }

  return generateSEOMetadata({
    meta,
    pathname: "/",
  });
}

export default async function HomePage() {
  let features: FeatureItem[] = [];

  try {
    const apiFeatures = await fetchFeatures();
    features = apiFeatures.slice(0, 3);
  } catch (error) {
    console.error("[HomePage] Unable to load features from API:", error);
  }

  let heroImages: HeroImage[] = [];
  try {
    heroImages = await fetchHeroImages();
  } catch (error) {
    console.error("[HomePage] Unable to load hero images from API:", error);
  }

  let allFaqs: Faq[] = [];
  try {
    allFaqs = await fetchFaqs();
  } catch (error) {
    console.error("[HomePage] Unable to load faqs from API:", error);
  }

  let faqs: Faq[] = [];
  try {
    faqs = allFaqs.filter((faq: Faq) => faq.name === "/");
  } catch (error) {
    console.error("[HomePage] Unable to load faqs from API:", error);
  }

  let meta: MetaItem | null = null;
  try {
    meta = await fetchMeta("/");
  } catch (error) {
    console.error("[HomePage] Unable to load meta from API:", error);
  }

  const pageTitle = meta?.title ?? "DocStar: AI-Powered Documentation Platform";
  const pageDescription =
    meta?.description ??
    "Create, collaborate, and publish documentation, FAQs, and knowledge bases with AI-powered workflows.";
  const keywordList = normalizeKeywords(meta?.keywords);
  const pageUrl = buildCanonicalUrl("/");

  const structuredData = buildStructuredDataGraph({
    page: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      keywords: keywordList,
    },
    breadcrumbs: [
      {
        name: "Home",
        url: pageUrl,
      },
    ],
    faq: faqs.length
      ? {
          faqs,
          headline: "DocStar FAQs",
        }
      : undefined,
  });

let testimonials: TestimonialItem[] = [];
try {
  testimonials = await fetchTestimonials();
} catch (error) {
  console.error("[HomePage] Unable to load testimonials from API:", error);
}


  return (
    <>
      <JsonLd id="docstar-homepage-schema" data={structuredData} />
      <Hero heroImages={heroImages} testimonials={testimonials} />
      <FAQSection faqs={faqs} />
    </>
  );
}
