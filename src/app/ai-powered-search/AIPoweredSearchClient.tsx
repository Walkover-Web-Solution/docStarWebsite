// components/AIPoweredSearchClient.tsx
"use client";

import MotionWrapper from "@/components/motion/MotionDivWrapper";
import {
  Search,
  Brain,
  Globe,
  TrendingUp,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export const AIPoweredSearchClient = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Natural Language Understanding",
      description:
        "Users can type queries in plain language, and DocStar interprets the intent to deliver meaningful results—no exact keywords required.",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Contextual Search Across All Docs",
      description:
        "Search seamlessly across API docs, blogs, FAQs, knowledge bases, and guides in a single unified platform.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Intelligent Ranking",
      description:
        "AI ensures the most relevant pages appear at the top, saving users from scrolling through endless results.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-Language Search",
      description:
        "Combine AI with DocStar's multi-language support to deliver accurate search results in Hindi, Spanish, French, German, Chinese, Japanese, Arabic, Portuguese, and Russian.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Continuous Learning",
      description:
        "The search engine gets smarter over time, adapting to user queries and preferences for even more precise results.",
    },
  ];

  const whyMatters = [
    {
      title: "Understanding natural language queries",
      description:
        "No need for exact keyword matching—users can search naturally.",
    },
    {
      title: "Prioritizing contextually relevant results",
      description:
        "Get the most relevant content based on context, not just keywords.",
    },
    {
      title: "Learning from user behavior to improve accuracy over time",
      description:
        "The system continuously improves based on user interactions.",
    },
    {
      title: "Reducing the time spent searching and increasing productivity",
      description: "Find information in seconds, not minutes.",
    },
  ];

  const benefits = [
    {
      title: "Instant access to the right information",
      description:
        "Without frustration or endless scrolling through irrelevant results.",
    },
    {
      title: "Higher user satisfaction",
      description: "With fast, accurate results that match user intent.",
    },
    {
      title: "Increased adoption of your docs and knowledge base",
      description:
        "Users will rely more on self-service when search actually works.",
    },
    {
      title: "Reduced support requests",
      description:
        "As users find answers on their own through intelligent search.",
    },
    {
      title: "Better productivity for internal teams",
      description: "Working across projects with quick access to information.",
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
    <div className="container mx-auto">
      {/* Hero Section */}
      <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-6">
        <MotionWrapper
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block px-3 py-2 mt-20 theme-bg-secondary border-l-4 border-l-[var(--theme-color)] mb-4">
            <span className="text-xs font-semibold">
              Intelligent Search Technology
            </span>
          </div>
        </MotionWrapper>

        <MotionWrapper
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h1 className="h1">
            AI-Powered <span className="text-gradient">Search</span>
          </h1>
        </MotionWrapper>

        <MotionWrapper
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-sm md:text-base opacity-70 mb-6 leading-snug">
            AI-powered search helps your users quickly discover the most
            relevant content across documentation and knowledge bases.
          </p>
        </MotionWrapper>

        <MotionWrapper
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <button
            className="btn btn-primary"
            onClick={() => window.open("https://app.docstar.io/login")}
          >
            Get Started with DocStar
          </button>
        </MotionWrapper>
      </section>

      {/* Why AI-Powered Search Matters Section */}
      <section className="py-8 sm:py-10 md:py-12 border-y theme-border px-4 sm:px-5 md:px-6">
        <MotionWrapper
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block px-3 py-1.5 theme-bg-secondary border-l-4 border-l-[var(--theme-color)] mb-4">
            <span className="text-xs font-semibold">The Problem</span>
          </div>
        </MotionWrapper>

        <MotionWrapper
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 leading-tight">
            Why AI-Powered Search Matters
          </h2>
        </MotionWrapper>

        <MotionWrapper
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-sm md:text-base opacity-70 mb-10 leading-snug">
            Traditional search tools often overwhelm users with irrelevant
            results. DocStar's AI-driven search solves this problem by:
          </p>
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-4.5 md:gap-5">
          {whyMatters.map((item, index) => (
            <MotionWrapper
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex gap-4 p-5 md:p-6 theme-bg-secondary"
            >
              <div className="flex-shrink-0 w-10 h-10 border theme-border flex items-center justify-center">
                <span className="text-lg font-bold">{index + 1}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm opacity-70 leading-snug">
                  {item.description}
                </p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-6">
        <MotionWrapper
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block px-3 py-1.5 theme-bg-secondary border-l-4 border-l-[var(--theme-color)] mb-4">
            <span className="text-xs font-semibold">Features</span>
          </div>
        </MotionWrapper>

        <MotionWrapper
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-6 leading-tight">
            Key Features of DocStar's AI Search
          </h2>
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-4.5 md:gap-5">
          {features.map((feature, index) => (
            <MotionWrapper
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="h-full p-5 md:p-6 theme-bg-secondary border theme-border">
                <div className="w-12 h-12 theme-border border flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium mb-2 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-sm opacity-70 leading-snug">
                  {feature.description}
                </p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="theme-bg-secondary py-8 sm:py-10 md:py-12 border-y theme-border px-4 sm:px-5 md:px-6">
        <MotionWrapper
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block px-3 py-1.5 border-l-4 border-l-[var(--theme-color)] mb-4">
            <span className="text-xs font-semibold">Benefits</span>
          </div>
        </MotionWrapper>

        <MotionWrapper
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-10 leading-tight">
            Benefits for Your Users and Teams
          </h2>
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-4.5 md:gap-5 mb-10">
          {benefits.map((benefit, index) => (
            <MotionWrapper
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex gap-4 p-5 md:p-6 theme-bg-secondary"
            >
              <div className="flex-shrink-0 w-10 h-10 theme-border border flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-sm opacity-70 leading-snug">
                  {benefit.description}
                </p>
              </div>
            </MotionWrapper>
          ))}
        </div>

        <MotionWrapper
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-6 md:p-8"
        >
          <h3 className="text-xl md:text-2xl font-medium mb-4 leading-tight">
            Transform Search Into a Competitive Advantage
          </h3>
          <p className="text-sm md:text-base opacity-70 leading-snug">
            With AI-powered search, DocStar turns documentation into a true
            knowledge hub—where answers are always within reach. Whether you're
            supporting global customers, onboarding developers, or streamlining
            internal workflows, DocStar ensures your users never waste time
            hunting for information.
          </p>
        </MotionWrapper>
      </section>

      {/* Final CTA Section */}
      <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-6">
        <MotionWrapper
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block px-3 py-1.5 theme-bg-secondary border-l-4 border-l-[var(--theme-color)] mb-4">
            <span className="text-xs font-semibold">Ready to Get Started?</span>
          </div>
        </MotionWrapper>

        <MotionWrapper
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-6 leading-tight">
            Make Every Search Count
          </h2>
        </MotionWrapper>

        <MotionWrapper
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-sm md:text-base opacity-70 mb-6 leading-snug">
            Stop letting your users waste time with irrelevant search results.
            With DocStar's AI-powered search, every query delivers exactly what
            they need, when they need it. Transform your documentation from a
            static resource into an intelligent, responsive knowledge hub.
          </p>
        </MotionWrapper>

        <MotionWrapper
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <button
            className="btn btn-outline"
            onClick={() => window.open("https://app.docstar.io/login")}
          >
            Get Started with DocStar
          </button>
        </MotionWrapper>
      </section>
    </div>
  );
};
