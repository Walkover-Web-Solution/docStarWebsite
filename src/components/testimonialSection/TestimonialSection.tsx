import { TestimonialItem } from "@/types/data-types";
import Image from "next/image";
import Link from "next/link";

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
    <section className="w-full theme-bg-secondary py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col space-y-8">
          {/* <div className="flex justify-center"> */}
          <svg
            className="w-12 h-12 opacity-30"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          {/* </div> */}

          <blockquote className="text-xl font-normal leading-relaxed">
            {t?.testimonial}
          </blockquote>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t theme-border">
            <div className="flex items-center gap-4">
              <figure className="w-16 h-16 overflow-hidden rounded-full border theme-border flex-shrink-0">
                <img
                  src={imageSrc}
                  alt={t?.given_by ?? "Testimonial author"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </figure>
              <div className="text-left">
                <p className="font-semibold text-base">{t?.given_by}</p>
                <p className="text-sm opacity-70">{t?.giver_title}</p>
              </div>
            </div>

            {productLogoSrc && (
              <div className="flex gap-2 items-center">
                <Image
                  src={productLogoSrc}
                  alt={t?.product ?? "Product logo"}
                  className="rounded object-cover"
                  loading="lazy"
                  width={40}
                  height={40}
                />
                <Link
                  href={t?.link || "/"}
                  target="_blank"
                  className="text-sm opacity-70"
                >
                  {t?.product}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
