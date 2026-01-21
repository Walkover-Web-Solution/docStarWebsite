import AppsMarquee from "../AppsMarquee";
import APITemplateSection from "../templateSection/ApiTemplateSection";
import BlogTemplateSection from "../templateSection/BlogTemplateSection";
import DocsTemplatesSection from "../templateSection/DocsTemplatesSection";
import MSG91Section from "../testimonialSection/MSG91Section";
import GiddhSection from "../testimonialSection/GiddhSection";
import ViasocketSection from "../testimonialSection/ViasocketSection";

const ContentSection = () => {
  return (
    <>
      <AppsMarquee />
      <DocsTemplatesSection />
      <MSG91Section />
      <BlogTemplateSection />
      <GiddhSection />
      <APITemplateSection />
      <ViasocketSection />
    </>
  );
};

export default ContentSection;
