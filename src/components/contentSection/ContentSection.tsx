import AppsMarquee from "../AppsMarquee";
import APITemplateSection from "../templateSection/ApiTemplateSection";
import BlogTemplateSection from "../templateSection/BlogTemplateSection";
import DocsTemplatesSection from "../templateSection/DocsTemplatesSection";
import TestimonialSection from "../testimonialSection/TestimonialSection";
import { TestimonialItem } from "@/types/data-types";

const ContentSection = ({
  testimonials,
}: {
  testimonials: TestimonialItem[];
}) => {
  return (
    <>
      <AppsMarquee />
      <DocsTemplatesSection />
      <TestimonialSection testimonials={testimonials} index={0} />
      <BlogTemplateSection />
      <TestimonialSection testimonials={testimonials} index={1} />
      <APITemplateSection />
      <TestimonialSection testimonials={testimonials} index={2} />
    </>
  );
};

export default ContentSection;
