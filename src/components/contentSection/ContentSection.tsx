import AppsMarquee from "../AppsMarquee";
import APITemplateSection from "../templateSection/ApiTemplateSection";
import BlogTemplateSection from "../templateSection/BlogTemplateSection";
import DocsTemplatesSection from "../templateSection/DocsTemplatesSection";
import TestimonialSection from "../testimonialSection/TestimonialSection";
// import GiddhSection from "../testimonialSection/GiddhSection";
// import ViasocketSection from "../testimonialSection/ViasocketSection";
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
      {/* <GiddhSection testimonials={testimonials} index={1} /> */}
      <TestimonialSection testimonials={testimonials} index={1} />
      <APITemplateSection />
      {/* <ViasocketSection testimonials={testimonials} index={2} /> */}
      <TestimonialSection testimonials={testimonials} index={2} />
    </>
  );
};

export default ContentSection;
