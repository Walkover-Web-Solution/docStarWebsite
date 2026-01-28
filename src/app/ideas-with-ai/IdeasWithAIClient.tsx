"use client"

import { motion } from "framer-motion"
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
} from "lucide-react"

export const IdeasWithAIClient = () => {
  const whyChooseFeatures = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Accelerated Workflows",
      description: "Move from scattered notes to polished documentation in record time.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Clarity and Structure",
      description: "Automatically organize content into sections, pages, and subpages that make sense.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Enhanced Collaboration",
      description: "Share well-formatted documents across teams with consistent style and structure.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Scalability for Teams",
      description: "Manage multiple projects and workspaces without losing control or organization.",
    },
  ]

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
  ]

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
      description: "Receive AI-driven recommendations on layout, headings, and styling for improved readability.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Consistency Across Content",
      description: "Ensure every document across your organization follows the same structure and visual style.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Seamless Human-AI Collaboration",
      description: "AI handles the heavy lifting, while your team fine-tunes the content for precision and tone.",
    },
  ]

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
      description: "To make your documentation accessible when and where it's needed",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 theme-bg-secondary border-b theme-border">
        <div className="container mx-auto px-6">
          <div className="mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded border theme-border text-sm font-medium">
                <Brain className="w-4 h-4 text-[var(--theme-color)]" />
                AI-Powered Documentation
              </span>
            </motion.div>

            <motion.h1
              className="h1 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Turn Your Ideas into <span className="text-gradient">Documents Easily with AI</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed opacity-70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              With DocStar's AI-powered documentation platform, you can transform raw ideas, notes, or outlines into professional
              documents in a matter of minutes.
            </motion.p>

            <button
              className="btn btn-primary mx-auto"
              onClick={() => { window.open('https://app.docstar.io/login') }}
            >
              Get Started with DocStar
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose AI-Powered Documentation Section */}
      <section className="container mx-auto py-20 md:py-32 px-6">
        <h2 className="h2 mb-12">
          Why Choose AI-Powered Documentation?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseFeatures.map((feature, index) => (
            <article
              key={index}
              className="p-6 rounded theme-bg-secondary border theme-border hover:border-[var(--theme-color)] transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded border theme-border flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="opacity-70 leading-relaxed">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Key Features Section */}
      <section className="theme-bg-secondary py-20 md:py-32">
        <div className="container mx-auto px-6">
          <h2 className="h2 mb-12">
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature, index) => (
              <article
                key={index}
                className="p-6 rounded border theme-border bg-[var(--theme-bg)] hover:border-[var(--theme-color)] transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded border theme-border flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="opacity-70 leading-relaxed">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How DocStar's AI Works Section */}
      <section className="container mx-auto py-20 md:py-32 px-6">
        <h2 className="h2 mb-12">
          How DocStar's AI Works for You
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {aiFeatures.map((feature, index) => (
            <article
              key={index}
              className="p-6 rounded theme-bg-secondary border theme-border hover:border-[var(--theme-color)] transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded border theme-border flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="opacity-70 leading-relaxed">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="theme-bg-secondary py-20 md:py-32">
        <div className="container mx-auto px-6">
          <h2 className="h2 mb-12">
            Benefits for Your Organization
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <article
                key={index}
                className="p-6 rounded border theme-border bg-[var(--theme-bg)] hover:border-[var(--theme-color)] transition-colors duration-300"
              >
                <div className="flex items-center mb-3">
                  <CheckCircle className="w-5 h-5 mr-3 text-[var(--theme-color)]" />
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                </div>
                <p className="opacity-70 leading-relaxed">{benefit.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 p-8 rounded border theme-border bg-[var(--theme-bg)]">
            <h3 className="text-2xl font-semibold mb-4">Create a Seamless Knowledge Experience</h3>
            <p className="text-lg opacity-70 leading-relaxed">
              With DocStar, you don't just write documents—you create a seamless knowledge experience. Transform ideas
              into actionable, structured documents with the power of AI, and give your team the clarity and speed they
              need to move faster.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto py-20 md:py-32 px-6">
        <h2 className="h2 mb-6">
          Start Turning Ideas into Documents Today
        </h2>

        <p className="text-xl mb-8 opacity-70 leading-relaxed max-w-3xl">
          With DocStar, you don't just write documents—you create a seamless knowledge experience. Transform ideas
          into actionable, structured documents with the power of AI, and give your team the clarity and speed they
          need to move faster.
        </p>

        <button
          className="btn btn-primary"
          onClick={() => { window.open('https://app.docstar.io/login') }}
        >
          Get Started with DocStar
        </button>
      </section>
    </main>
  )
}
