import { ArrowRight } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/seo/JsonLd";
import { fetchFaqs } from "@/services/faqs.api";
import { fetchMeta } from "@/services/meta.api";
import { type Faq } from "@/types/data-types";
import { buildStructuredDataGraph, buildCanonicalUrl } from "@/lib/structuredData";
import { generateSEOMetadata, normalizeKeywords } from "@/lib/seo";
import { cache } from "react";

export const dynamic = "force-dynamic";
export const runtime = 'edge';

const getCachedMeta = cache(async () => {
  try {
    return await fetchMeta("/pricing");
  } catch (error) {
    console.error("[PricingPage] Unable to load meta from API:", error);
    return null;
  }
});

export async function generateMetadata() {
  const meta = await getCachedMeta();

  return generateSEOMetadata({
    meta,
    pathname: "/pricing",
  });
}

const freePlanFeatures: string[] = [
  "Block-based editor with integrations",
  "Spaces & Collection: Unlimited",
  "API playground",
  "Custom domain support",
  "Redirect management",
  "Site customization controls",
  "User feedback & site insights",
  "Built-in SEO tooling",
  "Published versions history",
  "Real-time collaboration",
  "Import / Export",
  "Members: 1 included",
  "Unlimited pages",
  "Trash & recovery",
  "Articles bulk actions",
  "Inbuilt AI assistant",
  "Full text search",
];

type PaidPlan = {
  title: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlight?: boolean;
};

const paidPlans: PaidPlan[] = [
  {
    title: "Pro",
    price: "$25",
    priceNote: "per month",
    description:
      "Perfect for growing teams that need advanced customization and additional seats.",
    features: [
      "Everything in the Free plan",
      "10 members included",
      "Add teammates for $5/user",
    ],
    ctaLabel: "Get started with Pro",
    ctaHref: "https://app.docstar.io/login",
    highlight: true,
  },
  {
    title: "Enterprise",
    price: "Let’s talk",
    priceNote: "Custom pricing",
    description:
      "Advanced governance, security, and onboarding tailored around your organization.",
    features: [
      "Everything in Pro",
      "Unlimited members & collections",
      "Dedicated success manager",
      "Priority support",
    ],
    ctaLabel: "Talk to us",
    ctaHref: "/support",
  },
];


export default async function PricingPage() {
  let allFaqs: Faq[] = [];
  try {
    allFaqs = await fetchFaqs();
  } catch (error) {
    console.error("[HomePage] Unable to load faqs from API:", error);
  }

  let faqs: Faq[] = [];
  try {
    faqs = allFaqs.filter((faq: Faq) => faq.name === "/pricing");
  } catch (error) {
    console.error("[HomePage] Unable to load faqs from API:", error);
  }

  const meta = await getCachedMeta();

  const pageTitle = meta?.title ?? "Pricing - DocStar";
  const pageDescription =
    meta?.description ??
    "Documentation without barriers. Publish knowledge bases, blogs, and API docs freely with Docstar pricing.";
  const keywordList = normalizeKeywords(meta?.keywords);
  const pageUrl = buildCanonicalUrl("/pricing");

  const structuredData = buildStructuredDataGraph({
    page: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      keywords: keywordList,
    },
    breadcrumbs: [
      { name: "Home", url: buildCanonicalUrl("/") },
      { name: "Pricing", url: buildCanonicalUrl("/pricing") },
    ],
    faq: faqs.length
      ? {
        faqs,
        headline: "DocStar Pricing FAQs",
      }
      : undefined,
  });

  return (
    <>
      <JsonLd id="docstar-pricing-schema" data={structuredData} />
      <div className="pricing-page pt-32 pb-20 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h1 className="mx-auto max-w-2xl text-3xl sm:text-4xl font-semibold">
              Build beautiful documentation for free
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base opacity-80">
              Paywalls get out of the way? Docstar keeps the essential tools open so you can publish
              knowledge bases, blogs, and API docs without friction.
            </p>
          </div>

          <div className="mt-14 rounded-md p-6 sm:p-10 border ">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-semibold">
                Everything you need in the Free plan
              </h2>
              <p className="mt-2 text-sm opacity-80">
                Unlock the full Docstar workspace with unlimited pages, collaboration, and publishing
                tools at no cost under our fair-usage policy.
              </p>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
              {freePlanFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold theme-badge">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
              <li className="group flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5" aria-hidden />
                <a
                  href="https://docstar.io/help"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold opacity-60 hover:opacity-100 transition-all duration-200"
                >
                  See all features
                  <ArrowRight className="h-4 w-4 translate-x-0 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-semibold">Do more with Docstar</h2>
            <p className="mt-3 text-base opacity-80">
              Upgrade only when you need deeper controls, security, or hands-on support from our team.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {paidPlans.map((plan) => (
              <article
                key={plan.title}
                className={`flex h-full flex-col justify-between rounded-md p-8 shadow-sm transition-shadow duration-200 hover:shadow-lg ${plan.highlight ? 'border' : 'border theme-border'}`}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-semibold">{plan.title}</h3>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.priceNote && (
                      <span className="text-sm font-medium opacity-70">{plan.priceNote}</span>
                    )}
                  </div>
                  <p className="mt-3 text-sm opacity-80">{plan.description}</p>

                  <ul className="mt-6 space-y-3 text-sm opacity-90">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold theme-bg" style={{ color: 'var(--app-bg)' }}>
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <a
                    href={plan.ctaHref}
                    className={`flex w-full items-center justify-center btn ${plan.highlight
                      ? "btn-primary"
                      : "btn-outline"
                      }`}
                  >
                    {plan.ctaLabel}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
        <FAQSection faqs={faqs} />
      </div>
    </>
  );
}
