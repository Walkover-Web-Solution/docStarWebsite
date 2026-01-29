"use client";

import { motion } from "framer-motion";
import {
  Layout,
  Palette,
  Globe,
  Settings,
  BarChart3,
  MessageSquare,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export const CustomizeLayoutsPage = () => {
  const customizationFeatures = [
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Publish Collections",
      description:
        "Organize and release entire sets of documentation with one click. Whether you're publishing API references, blogs, or product manuals, DocStar ensures everything goes live seamlessly.",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Add Title & Branding",
      description:
        "Give each collection a clear title and identity, making it easy for users to recognize and navigate.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Logo and Theme",
      description:
        "Upload your brand logo and apply custom themes to ensure your documentation is a natural extension of your product or company website.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Domain Mapping",
      description:
        "Host your documentation on a custom domain or subdomain to maintain brand consistency and authority.",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Header and Footer Customization",
      description:
        "Easily personalize your documentation with custom headers and footers, adding navigation menus, company links, or CTAs.",
    },
  ];

  const publishingFeatures = [
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Bulk Publishing",
      description:
        "Save time by publishing multiple documents at once instead of handling them individually.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Redirections",
      description:
        "Manage outdated or moved content with automatic redirections, ensuring users always find the right page without broken links.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Google Tag Manager Integration",
      description:
        "Track user behavior and engagement with ease by integrating Google Tag Manager (GTM) directly into your documentation.",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Logs and Activity Tracking",
      description:
        "Keep complete visibility over changes, updates, and publishing history with detailed logs.",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "User Feedback Collection",
      description:
        "Enable readers to leave feedback directly on your docs, helping your team continuously improve clarity and usefulness.",
    },
  ];

  const benefits = [
    {
      title: "Faster publishing workflows",
      description: "With bulk and automated tools",
    },
    {
      title: "Stronger branding",
      description: "With custom logos, themes, and domains",
    },
    {
      title: "Data-driven insights",
      description: "With GTM and activity logs",
    },
    {
      title: "Higher user satisfaction",
      description: "Through feedback and redirections",
    },
    {
      title: "Seamless scaling",
      description: "For growing teams and global audiences",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <section className="py-12 md:py-16 theme-bg-secondary border-b theme-border">
        <div className="px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 mt-20"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded border theme-border text-xs font-medium">
              <Sparkles className="w-4 h-4 text-[var(--theme-color)]" />
              Layouts & Themes
            </span>
          </motion.div>

          <motion.h1
            className="h1 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Design Your Way:{" "}
            <span className="text-gradient">Layouts & Themes</span>
          </motion.h1>

          <motion.p
            className="text-sm md:text-base mb-6 max-w-3xl mx-auto leading-snug opacity-70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            From themes and layouts to workflows and analytics, DocStar gives
            you full control over your content experience.
          </motion.p>

          <button
            className="btn btn-primary mx-auto"
            onClick={() => {
              window.open("https://app.docstar.io/login");
            }}
          >
            Get Started with DocStar
          </button>
        </div>
      </section>

      {/* Flexible Customization Section */}
      <section className="py-12 md:py-16 px-6">
        <h2 className="text-2xl md:text-3xl font-medium mb-8 leading-tight">
          Flexible Customization for Your Docs
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {customizationFeatures.map((feature, index) => (
            <article
              key={index}
              className="p-5 md:p-6 rounded theme-bg-secondary border theme-border hover:border-[var(--theme-color)] transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded border theme-border flex items-center justify-center mb-3">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium mb-2 leading-tight">
                {feature.title}
              </h3>
              <p className="text-sm opacity-70 leading-snug">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Smart Publishing Features Section */}
      <section className="py-12 md:py-16 px-6">
        <h2 className="text-2xl md:text-3xl font-medium mb-8 leading-tight">
          Smart Publishing Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {publishingFeatures.map((feature, index) => (
            <article
              key={index}
              className="p-5 md:p-6 rounded border theme-border bg-[var(--theme-bg)] hover:border-[var(--theme-color)] transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded border theme-border flex items-center justify-center mb-3">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium mb-2 leading-tight">
                {feature.title}
              </h3>
              <p className="text-sm opacity-70 leading-snug">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16 px-6">
        <h2 className="text-2xl md:text-3xl font-medium mb-8 leading-tight">
          Benefits for Your Organization
        </h2>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {benefits.map((benefit, index) => (
            <article
              key={index}
              className="p-5 md:p-6 rounded theme-bg-secondary border theme-border hover:border-[var(--theme-color)] transition-colors duration-300"
            >
              <div className="flex items-center mb-2">
                <CheckCircle className="w-4 h-4 mr-2 text-[var(--theme-color)]" />
                <h3 className="text-lg font-medium">{benefit.title}</h3>
              </div>
              <p className="text-sm opacity-70 leading-snug">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 p-6 md:p-8 rounded theme-bg-secondary border theme-border">
          <h3 className="text-xl md:text-2xl font-medium mb-3 leading-tight">
            From Draft to Professional Docs—All in One Platform
          </h3>
          <p className="text-sm md:text-base opacity-70 leading-snug">
            With DocStar's layouts, themes, and publishing options, you can go
            beyond writing. Build a branded, interactive, and user-friendly
            documentation hub that's optimized for growth, SEO, and customer
            engagement.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 md:py-16 px-6">
        <h2 className="text-2xl md:text-3xl font-medium mb-4 leading-tight">
          Design Documentation That Reflects Your Brand
        </h2>

        <p className="text-sm md:text-base mb-6 opacity-70 leading-snug">
          Stop settling for generic documentation that doesn't represent your
          brand. With DocStar's comprehensive customization and publishing
          tools, create a documentation experience that's as polished and
          professional as your product itself.
        </p>

        <button
          className="btn btn-primary"
          onClick={() => {
            window.open("https://app.docstar.io/login");
          }}
        >
          Get Started with DocStar
        </button>
      </section>
    </div>
  );
};
