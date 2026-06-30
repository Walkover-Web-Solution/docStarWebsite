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
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import CTASection from "@/components/CTASection";

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
    <>
      {/* Hero Section */}
      <div className="relative min-h-[75vh] flex items-center border-b theme-border overflow-hidden">
        <div className="absolute inset-0 theme-bg-secondary">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] to-transparent"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--theme-color)]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center pt-20 pb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border theme-border bg-[var(--theme-bg)] shadow-sm backdrop-blur-md mb-6">
                <Palette className="w-4 h-4 text-[var(--theme-color)]" />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  Layouts & Themes
                </span>
              </div>

              <h1 className="h1 mb-6 leading-tight">
                Design Your Way: <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-bl from-[var(--theme-color)] to-purple-500">
                  Layouts & Themes.
                </span>
              </h1>

              <p className="text-base sm:text-lg opacity-70 mb-8 leading-relaxed max-w-xl">
                From themes and layouts to workflows and analytics, DocStar gives you full control over your content experience.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://app.docstar.io/login"
                  target="_blank"
                  className="btn btn-primary shadow-lg shadow-[var(--theme-color)]/20"
                >
                  Get Started with DocStar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-purple-500/20 rounded-2xl transform rotate-3 scale-105 blur-xl"></div>
              
              {/* Abstract Theme Customizer Mockup */}
              <div className="relative z-10 bg-background border theme-border rounded-xl shadow-2xl p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-500 flex gap-6">
                <div className="w-32 flex flex-col gap-4 border-r theme-border pr-6">
                  <div className="h-6 w-16 bg-black/10 dark:bg-white/10 rounded-md mb-2"></div>
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-[var(--theme-color)]/20 rounded-sm"></div>
                    <div className="h-4 w-5/6 bg-black/10 dark:bg-white/10 rounded-sm"></div>
                    <div className="h-4 w-full bg-black/10 dark:bg-white/10 rounded-sm"></div>
                    <div className="h-4 w-4/5 bg-black/10 dark:bg-white/10 rounded-sm"></div>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-[var(--theme-color)] rounded-lg"></div>
                    <div>
                      <div className="h-4 w-24 bg-black/20 dark:bg-white/20 rounded-sm mb-1"></div>
                      <div className="h-2 w-16 bg-black/10 dark:bg-white/10 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="h-16 rounded-lg bg-[var(--theme-bg)] border-2 border-[var(--theme-color)] flex items-center justify-center text-xs font-bold text-[var(--theme-color)]">Light Mode</div>
                    <div className="h-16 rounded-lg bg-[#0d1117] border theme-border flex items-center justify-center text-xs font-bold text-white">Dark Mode</div>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 p-4 rounded-xl theme-bg-secondary border theme-border shadow-xl flex items-center gap-4 z-20 animate-bounce" style={{ animationDuration: '3s'}}>
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Style</p>
                  <p className="text-sm font-medium opacity-80">Fully Custom</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
      {/* Flexible Customization Section */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-8 leading-tight">
          Flexible Customization for Your Docs
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {customizationFeatures.map((feature, index) => (
            <article
              key={index}
              className="p-5 md:p-6 rounded-md theme-bg-secondary border theme-border hover:border-[var(--theme-color)] transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-md border theme-border flex items-center justify-center mb-3">
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
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-8 leading-tight">
          Smart Publishing Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {publishingFeatures.map((feature, index) => (
            <article
              key={index}
              className="p-5 md:p-6 rounded-md border theme-border bg-[var(--theme-bg)] hover:border-[var(--theme-color)] transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-md border theme-border flex items-center justify-center mb-3">
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
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-8 leading-tight">
          Benefits for Your Organization
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-4.5 md:gap-5">
          {benefits.map((benefit, index) => (
            <article
              key={index}
              className="p-5 md:p-6 rounded-md theme-bg-secondary border theme-border hover:border-[var(--theme-color)] transition-colors duration-300"
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

        <div className="mt-8 p-6 md:p-8 rounded-md theme-bg-secondary border theme-border">
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
      <CTASection
        title="Design Documentation That Reflects Your Brand"
        description="Stop settling for generic documentation that doesn't represent your brand. With DocStar's comprehensive customization and publishing tools, create a documentation experience that's as polished and professional as your product itself."
      />
      </div>
    </>
  );
};
