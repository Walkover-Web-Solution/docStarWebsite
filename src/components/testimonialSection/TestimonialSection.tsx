import { TestimonialItem } from "@/types/data-types";
import Image from "next/image";
import Link from "next/link";
import MotionWrapper from "../motion/MotionDivWrapper";
import { Quote } from "lucide-react";

const TestimonialSection = ({
  testimonials,
  index,
}: {
  testimonials: TestimonialItem[];
  index: number;
}) => {
  const t = testimonials?.[index];
  const imageSrc =
    t?.client_img?.[0] ??
    t?.client_img?.[index] ??
    "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%3E%3Crect%20width='100%25'%20height='100%25'%20fill='%23e5e7eb'/%3E%3Ctext%20x='50%25'%20y='50%25'%20dominant-baseline='middle'%20text-anchor='middle'%20fill='%236b7280'%20font-family='Arial'%20font-size='16'%3ENo%20Image%3C/text%3E%3C/svg%3E";

  const productLogoSrc = t?.product_logo?.[0] ?? t?.product_logo?.[index] ?? "";

  return (
    <section className="w-full py-18 md:py-16 px-6 relative overflow-hidden dark:bg-black/20">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--theme-color)]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <MotionWrapper
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-3xl p-8 md:p-12 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border theme-border shadow-xl"
        >
          {/* Quote Icon */}
          <div className="absolute -top-3 left-10 w-12 h-12 rounded-2xl bg-[var(--theme-bg)] border theme-border shadow-lg flex items-center justify-center">
            <Quote className="w-6 h-6 text-[var(--theme-color)]" />
          </div>

          <div className="flex flex-col space-y-8 mt-4">
            <blockquote className="text-xl md:text-2xl font-semibold leading-relaxed tracking-tight text-gray-900 dark:text-white">
              "{t?.testimonial}"
            </blockquote>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t theme-border">
              <div className="flex items-center gap-4">
                <figure className="w-12 h-12 overflow-hidden rounded-full border-2 border-white dark:border-gray-800 shadow-md flex-shrink-0">
                  <img
                    src={imageSrc}
                    alt={t?.given_by ?? "Testimonial author"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </figure>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm dark:text-white">{t?.given_by}</p>
                  <p className="text-sm font-medium text-[var(--theme-color)]">{t?.giver_title}</p>
                </div>
              </div>

              {productLogoSrc && (
                <div className="flex gap-3 items-center px-4 py-2 rounded-full bg-white dark:bg-gray-950 border theme-border shadow-sm hover:shadow-md transition-shadow">
                  <Image
                    src={productLogoSrc}
                    alt={t?.product ?? "Product logo"}
                    className="rounded-md object-contain"
                    loading="lazy"
                    width={24}
                    height={24}
                  />
                  <Link
                    href={t?.link || "/"}
                    target="_blank"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-[var(--theme-color)] transition-colors"
                  >
                    {t?.product}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default TestimonialSection;
