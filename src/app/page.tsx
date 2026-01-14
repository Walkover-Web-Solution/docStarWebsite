import CTA from "@/components/CTA";
import FAQSection from "@/components/FAQSection";
import Hero from "@/components/homeSection/Hero";
import { fetchFeatures } from "@/services/features.api";
import { fetchHeroImages } from "@/services/hero-images.api";
import { fetchFaqs } from "@/services/faqs.api";
import { type Faq } from "@/types/data-types";
import { type FeatureItem } from "@/types/data-types";
import { type HeroImage } from "@/types/data-types";

export const dynamic = "force-dynamic";
export const runtime = "edge";

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

  return (
    <>
      <Hero heroImages={heroImages} />
      <FAQSection faqs={faqs} />
    </>
  );
}
