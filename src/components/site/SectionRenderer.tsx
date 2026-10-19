import type { Section } from "@/content/types";
import { AgentReadable, Cards, Channels, Faq, FinalCta, Hero, Hub, Pillars, Pricing, Prose, Steps, WorksWith } from "./sections/Sections";

// Maps each content section type to its component. New section types are added here and in content/types.ts.
export default function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section) => {
        switch (section.type) {
          case "hero":
            return <Hero key={section.key} section={section} />;
          case "works-with":
            return <WorksWith key={section.key} section={section} />;
          case "steps":
            return <Steps key={section.key} section={section} />;
          case "channels":
            return <Channels key={section.key} section={section} />;
          case "pillars":
            return <Pillars key={section.key} section={section} />;
          case "hub":
            return <Hub key={section.key} section={section} />;
          case "agent-readable":
            return <AgentReadable key={section.key} section={section} />;
          case "faq":
            return <Faq key={section.key} section={section} />;
          case "cta":
            return <FinalCta key={section.key} section={section} />;
          case "cards":
            return <Cards key={section.key} section={section} />;
          case "pricing":
            return <Pricing key={section.key} section={section} />;
          case "prose":
            return <Prose key={section.key} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
