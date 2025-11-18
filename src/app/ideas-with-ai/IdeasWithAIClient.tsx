"use client"

import MotionWrapper from "@/components/motion/MotionDivWrapper"
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <MotionWrapper
        className="py-20 relative overflow-hidden bg-gradient-to-tr from-rose-100 to-pink-500 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <MotionWrapper
            className="text-5xl md:text-7xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Turn Your Ideas into <span className="text-black/70">Documents Easily with AI</span>
          </MotionWrapper>

          <MotionWrapper
            className="text-xl md:text-2xl mb-12 text-purple-100 max-w-4xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            With DocStar's AI-powered documentation platform, you can transform raw ideas, notes, or outlines into professional
            documents in a matter of minutes.
          </MotionWrapper>

          <MotionWrapper
          as="button"
            className="text-lg rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border border-white/40 font-semibold px-6 py-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>{window.open('https://app.docstar.io/login')}}
          >
            Get Started with DocStar
          </MotionWrapper>
        </div>
      </MotionWrapper>

      {/* Why Choose AI-Powered Documentation Section */}
      <MotionWrapper
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Why Choose AI-Powered Documentation?
          </MotionWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseFeatures.map((feature, index) => (
              <MotionWrapper
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-purple-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </MotionWrapper>

      {/* Key Features Section */}
      <MotionWrapper
        className="py-20 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Key Features
          </MotionWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature, index) => (
              <MotionWrapper
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-purple-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </MotionWrapper>

      {/* How DocStar's AI Works Section */}
      <MotionWrapper
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            How DocStar's AI Works for You
          </MotionWrapper>

          <div className="grid md:grid-cols-2 gap-8">
            {aiFeatures.map((feature, index) => (
              <MotionWrapper
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-purple-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </MotionWrapper>

      {/* Benefits Section */}
      <MotionWrapper
        className="py-20 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Benefits for Your Organization
          </MotionWrapper>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <MotionWrapper
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                </div>
                <p className="text-gray-600">{benefit.description}</p>
              </MotionWrapper>
            ))}
          </div>

          <MotionWrapper
            className="mt-16 text-center bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-purple-900 mb-4">Create a Seamless Knowledge Experience</h3>
            <p className="text-xl text-gray-800">
              With DocStar, you don't just write documents—you create a seamless knowledge experience. Transform ideas
              into actionable, structured documents with the power of AI, and give your team the clarity and speed they
              need to move faster.
            </p>
          </MotionWrapper>
        </div>
      </MotionWrapper>

      {/* Final CTA Section */}
      <MotionWrapper
        className="py-20 bg-rose-100 text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-6 text-black/70">
          <MotionWrapper
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Start Turning Ideas into Documents Today
          </MotionWrapper>

          <MotionWrapper
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            With DocStar, you don't just write documents—you create a seamless knowledge experience. Transform ideas
            into actionable, structured documents with the power of AI, and give your team the clarity and speed they
            need to move faster.
          </MotionWrapper>

          <MotionWrapper
          as="button"
            className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-black/70 hover:text-white transition-colors duration-300 shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>{window.open('https://app.docstar.io/login')}}
          >
            Get Started with DocStar
          </MotionWrapper>
        </div>
      </MotionWrapper>
    </div>
  )
}
