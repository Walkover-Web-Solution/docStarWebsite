import FAQSection from "@/components/FAQSection";
import Hero from "@/components/homeSection/Hero";
import { fetchFeatures } from "@/services/features.api";
import { fetchHeroImages } from "@/services/hero-images.api";
import { fetchFaqs } from "@/services/faqs.api";
import { fetchTestimonials } from "@/services/testimonials.api";
import { fetchAppsMarquee } from "@/services/apps-marquee.api";
import { type FeatureItem, type MetaItem, type HeroImage, type Faq, type TestimonialItem, type AppsMarqueeItem } from "@/types/data-types";
import { fetchMeta } from "@/services/meta.api";
import { generateSEOMetadata } from "@/lib/seo";

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

  let appsMarquee: AppsMarqueeItem[] = [];
  try {
    appsMarquee = await fetchAppsMarquee();
  } catch (error) {
    console.error("[HomePage] Unable to load apps marquee from API:", error);
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

let testimonials: TestimonialItem[] = [];
try {
  testimonials = await fetchTestimonials();
} catch (error) {
  console.error("[HomePage] Unable to load testimonials from API:", error);
}


  return (
    <>
      <Hero heroImages={heroImages} testimonials={testimonials} appsMarquee={appsMarquee} />
      <FAQSection faqs={faqs} />
    </>
  );
}
