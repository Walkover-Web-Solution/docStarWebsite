"use client";

import MotionWrapper from "@/components/motion/MotionDivWrapper";
import Link from "next/link";
import { Globe, CheckCircle, Sparkles, ArrowRight } from "lucide-react";

const MultiLanguageClient = () => {
  const languages = [
    {
      flag: "🇮🇳",
      name: "Hindi",
      description:
        "Engage with one of the largest and fastest-growing user bases in India.",
    },
    {
      flag: "🇪🇸",
      name: "Spanish",
      description:
        "Connect with audiences across Spain, Latin America, and beyond.",
    },
    {
      flag: "🇫🇷",
      name: "French",
      description: "Deliver content for users in France, Canada, and Africa.",
    },
    {
      flag: "🇩🇪",
      name: "German",
      description:
        "Provide localized experiences for German-speaking regions in Europe.",
    },
    {
      flag: "🇨🇳",
      name: "Chinese",
      description:
        "Reach the world's largest online population with Simplified Chinese support.",
    },
    {
      flag: "🇯🇵",
      name: "Japanese",
      description:
        "Cater to Japanese businesses and developer communities with precision.",
    },
    {
      flag: "🇸🇦",
      name: "Arabic",
      description:
        "Share content with users across the Middle East in right-to-left (RTL) format.",
    },
    {
      flag: "🇵🇹",
      name: "Portuguese",
      description:
        "Support audiences in Portugal and Brazil with localized content.",
    },
    {
      flag: "🇷🇺",
      name: "Russian",
      description:
        "Make your documentation accessible to Russian-speaking communities worldwide.",
    },
  ];

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Centralized Management",
      description:
        "Manage all your language versions in one platform—no need for scattered files or manual syncing.",
    },
    {
      icon: <ArrowRight className="w-6 h-6" />,
      title: "Seamless Switching",
      description:
        "Readers can easily switch between languages, ensuring a smooth and consistent user experience.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Translations",
      description:
        "Use AI-assisted tools to quickly translate and fine-tune documentation, reducing manual effort.",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Consistent Formatting",
      description:
        "Maintain the same style, structure, and formatting across all language versions for brand consistency.",
    },
  ];

  const benefits = [
    {
      title: "Expand global reach",
      description:
        "Making your content accessible to millions more users worldwide.",
    },
    {
      title: "Reduce friction for international teams",
      description: "Offering documentation in their preferred language.",
    },
    {
      title: "Boost SEO rankings",
      description: "In multiple regions with localized content.",
    },
    {
      title: "Enhance customer satisfaction",
      description: "By providing native-language support.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      {/* Hero Section */}
      <MotionWrapper
        className="py-12 sm:py-16 md:py-20 relative overflow-hidden theme-bg-secondary pt-12 sm:pt-16 md:pt-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 sm:px-5 md:px-6">
        <h1 className="h1 pt-12">
          Multi-Language <span className="text-gradient">Support for </span>
          Global Teams
        </h1>

        <p className="text-sm md:text-base mb-6 leading-snug opacity-70">
          Deliver clear and accessible documentation in every language your
          audience speaks. Your docs, any language, everywhere.
        </p>

        <Link
          href="https://app.docstar.io/login"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mx-auto w-fit"
        >
          Get Started with DocStar
        </Link>
        </div>
      </MotionWrapper>

      <div className="container mx-auto">
      {/* Why Multi-Language Matters */}
      <MotionWrapper
        className="py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-medium text-center mb-2 leading-tight">
          Why Multi-Language Support Matters
        </h2>

        <p className="text-sm md:text-base text-center mb-10 opacity-70 leading-snug">
          As businesses expand globally, clear communication becomes critical.
          With DocStar, you can:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {benefits.map((benefit, index) => (
            <MotionWrapper
              key={index}
              className="group relative p-4 sm:p-4.5 md:p-5 lg:p-6 rounded-lg border theme-border theme-bg-secondary"
              variants={itemVariants}
            >
              <div className="flex items-start space-x-4">
                <div className="w-7 h-7 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:border-opacity-50 transition-all duration-300">
                  <CheckCircle className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="opacity-70 text-sm leading-snug">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>

        <MotionWrapper
          className="mt-8 text-center p-6 md:p-8 rounded-md border theme-border theme-bg-secondary"
          variants={itemVariants}
        >
          <p className="text-sm md:text-base font-medium opacity-80 leading-snug">
            <strong>Build trust and engagement</strong> with customers in their
            native language while strengthening your brand's global presence and
            visibility.
          </p>
        </MotionWrapper>
      </MotionWrapper>

      {/* Languages Supported */}
      <MotionWrapper
        className="py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-6 theme-bg-secondary"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-medium text-center mb-2 leading-tight">
          Languages Supported by DocStar
        </h2>

        <MotionWrapper
          className="text-sm sm:text-[15px] md:text-base text-center mb-10 opacity-70 leading-snug"
          variants={itemVariants}
        >
          DocStar provides full support for some of the world's most widely
          spoken languages, allowing you to serve global audiences without
          additional complexity:
        </MotionWrapper>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {languages.map((language, index) => (
            <MotionWrapper
              key={index}
              className="group relative p-4 md:p-5 rounded-md border theme-border"
              variants={itemVariants}
            >
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 rounded-md theme-bg-secondary flex items-center justify-center mr-3 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300">
                  <span className="text-2xl">{language.flag}</span>
                </div>
                <h3 className="text-lg font-medium group-hover:opacity-80 transition-opacity">
                  {language.name}
                </h3>
              </div>
              <p className="opacity-70 text-xs md:text-sm leading-snug">
                {language.description}
              </p>
            </MotionWrapper>
          ))}
        </div>
      </MotionWrapper>

      {/* Key Features */}
      <MotionWrapper
        className="py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <MotionWrapper
          className="text-xl sm:text-2xl md:text-3xl font-medium text-center mb-10 leading-tight"
          variants={itemVariants}
        >
          Key Features of DocStar's Multi-Language Support
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {features.map((feature, index) => (
            <MotionWrapper
              key={index}
              className="group relative p-4 sm:p-4.5 md:p-5 lg:p-6 rounded-lg border theme-border"
              variants={itemVariants}
            >
              <div className="w-12 h-12 rounded-md theme-bg-secondary flex items-center justify-center mb-4 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-medium mb-2 leading-tight">
                {feature.title}
              </h3>
              <p className="opacity-70 text-sm leading-snug">
                {feature.description}
              </p>
            </MotionWrapper>
          ))}
        </div>

        <MotionWrapper
          className="mt-8 text-center p-6 md:p-8 rounded-md border theme-border theme-bg-secondary"
          variants={itemVariants}
        >
          <h3 className="text-xl font-medium mb-3 leading-tight">
            Scalable for Global Growth
          </h3>
          <p className="text-sm md:text-base opacity-80 leading-snug">
            As your business expands, add new languages effortlessly without
            disrupting your workflow.
          </p>
        </MotionWrapper>
      </MotionWrapper>

      {/* Final CTA */}
      <MotionWrapper
        className="py-12 px-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <MotionWrapper
          className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4 text-balance leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Deliver Documentation Without Borders
        </MotionWrapper>

        <MotionWrapper
          className="text-sm sm:text-[15px] md:text-base mb-6 opacity-70 leading-snug"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          With DocStar's multi-language support, your documentation isn't
          limited by geography.
        </MotionWrapper>

        <MotionWrapper
          href="https://app.docstar.io/login"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary w-fit mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started with DocStar
        </MotionWrapper>
      </MotionWrapper>
      </div>
    </>
  );
};

export default MultiLanguageClient;
