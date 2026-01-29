"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Users,
  BarChart3,
  Palette,
  FolderOpen,
  MousePointer,
  Globe,
  Brain,
  Sparkles,
  Target,
  CheckCircle,
} from "lucide-react";

export const IdeasWithAIClient = () => {
  const whyChooseFeatures = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Accelerated Workflows",
      description:
        "Move from scattered notes to polished documentation in record time.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Clarity and Structure",
      description:
        "Automatically organize content into sections, pages, and subpages that make sense.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Enhanced Collaboration",
      description:
        "Share well-formatted documents across teams with consistent style and structure.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Scalability for Teams",
      description:
        "Manage multiple projects and workspaces without losing control or organization.",
    },
  ];

  const keyFeatures = [
    {
      icon: <FolderOpen className="w-6 h-6" />,
      title: "Organize Your Documentation with Ease",
      description:
        "Easily create collections to categorize your content. Break down information into structured pages and subpages, so your readers can find what they need without friction.",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Quick and Flexible Formatting",
      description:
        "Take advantage of customizable fonts, styles, Markdown, callouts, quotes, and embedded media to make your documentation both clear and visually appealing.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Manage Multiple Workspaces",
      description:
        "Set up dedicated workspaces for different teams or projects, with fine-grained control over user access, collaboration, and permissions.",
    },
    {
      icon: <MousePointer className="w-6 h-6" />,
      title: "Drag-and-Drop Organization",
      description:
        "Reorganize your documentation effortlessly. With drag-and-drop functionality, you can maintain a clear hierarchy of pages and subpages in seconds.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Instant Document Publishing",
      description:
        "Publishing is straightforward—make entire collections and all their documents accessible to your team or customers with a single click.",
    },
  ];

  const aiFeatures = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Idea-to-Document Conversion",
      description:
        "Start with notes, brainstorming outputs, or outlines, and let AI turn them into structured documents automatically.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Smart Formatting Suggestions",
      description:
        "Receive AI-driven recommendations on layout, headings, and styling for improved readability.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Consistency Across Content",
      description:
        "Ensure every document across your organization follows the same structure and visual style.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Seamless Human-AI Collaboration",
      description:
        "AI handles the heavy lifting, while your team fine-tunes the content for precision and tone.",
    },
  ];

  const benefits = [
    {
      title: "Faster documentation cycles",
      description: "Without sacrificing quality",
    },
    {
      title: "Consistently clear and easy-to-navigate documents",
      description: "For every audience",
    },
    {
      title: "Visual and structural polish",
      description: "Without relying on designers or manual formatting",
    },
    {
      title: "Scalable workspace management",
      description: "That supports teams of all sizes",
    },
    {
      title: "Quick publishing",
      description:
        "To make your documentation accessible when and where it's needed",
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
      <section className="py-12 theme-bg-secondary border-b theme-border">
        <div className="px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 mt-20"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded border theme-border text-xs font-medium">
              <Brain className="w-4 h-4 text-[var(--theme-color)]" />
              AI-Powered Documentation
            </span>
          </motion.div>

          <motion.h1
            className="h1 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Turn Your Ideas into{" "}
            <span className="text-gradient">Documents Easily with AI</span>
          </motion.h1>

          <motion.p
            className="text-sm md:text-base mb-6 max-w-3xl mx-auto leading-snug opacity-70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            With DocStar's AI-powered documentation platform, you can transform
            raw ideas, notes, or outlines into professional documents in a
            matter of minutes.
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

      {/* Why Choose AI-Powered Documentation Section */}
      <section className="py-12 px-6">
        <h2 className="text-2xl md:text-3xl font-medium mb-8 leading-tight">
          Why Choose AI-Powered Documentation?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {whyChooseFeatures.map((feature, index) => (
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

      {/* Key Features Section */}
      <section className="theme-bg-secondary py-12">
        <div className="px-6">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 leading-tight">
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {keyFeatures.map((feature, index) => (
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
        </div>
      </section>

      {/* How DocStar's AI Works Section */}
      <section className="py-12 px-6">
        <h2 className="text-2xl md:text-3xl font-medium mb-8 leading-tight">
          How DocStar's AI Works for You
        </h2>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {aiFeatures.map((feature, index) => (
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

      {/* Benefits Section */}
      <section className="theme-bg-secondary py-12">
        <div className="px-6">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 leading-tight">
            Benefits for Your Organization
          </h2>

          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            {benefits.map((benefit, index) => (
              <article
                key={index}
                className="p-5 md:p-6 rounded border theme-border bg-[var(--theme-bg)] hover:border-[var(--theme-color)] transition-colors duration-300"
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

          <div className="mt-8 p-6 md:p-8 rounded border theme-border bg-[var(--theme-bg)]">
            <h3 className="text-xl md:text-2xl font-medium mb-3 leading-tight">
              Create a Seamless Knowledge Experience
            </h3>
            <p className="text-sm md:text-base opacity-70 leading-snug">
              With DocStar, you don't just write documents—you create a seamless
              knowledge experience. Transform ideas into actionable, structured
              documents with the power of AI, and give your team the clarity and
              speed they need to move faster.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 px-6">
        <h2 className="text-2xl md:text-3xl font-medium mb-4 leading-tight">
          Start Turning Ideas into Documents Today
        </h2>

        <p className="text-sm md:text-base mb-6 opacity-70 leading-snug max-w-3xl">
          With DocStar, you don't just write documents—you create a seamless
          knowledge experience. Transform ideas into actionable, structured
          documents with the power of AI, and give your team the clarity and
          speed they need to move faster.
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
