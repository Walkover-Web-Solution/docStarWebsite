import { TestimonialItem } from "@/types/data-types";

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

  return (
    <section className="w-full py-20 px-6 container mx-auto max-w-6xl">
      <div className="mx-auto grid max-w-5xl items-stretch gap-10 lg:grid-cols-[360px_1fr]">
        <div className="rounded border border-slate-200 p-6">
          <div className="flex items-center gap-4">
            <figure className="relative h-20 w-20 overflow-hidden rounded ring-1 ring-slate-200">
              <img
                src={imageSrc}
                alt={t?.given_by ?? "Testimonial author"}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </figure>

            <div className="min-w-0">
              <div className="truncate text-base font-semibold text-slate-900">
                {t?.given_by}
              </div>
              <div className="mt-0.5 truncate text-sm text-slate-600">
                {t?.giver_title}
              </div>
            </div>
          </div>

          {t?.product ? (
            <div className="mt-5">
              <span className="inline-flex items-center rounded border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                {t.product}
              </span>
            </div>
          ) : null}

          <div className="mt-6 border-t border-slate-200 pt-5 text-xs text-slate-500">
            Customer story
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-white p-8 lg:p-10">
          <p className="text-base leading-relaxed text-slate-900 lg:text-lg">
            {t?.testimonial}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{t?.given_by}</span>
            {t?.giver_title ? <span aria-hidden="true">•</span> : null}
            {t?.giver_title ? <span>{t.giver_title}</span> : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
