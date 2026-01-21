"use client"

import MotionWrapper from "@/components/motion/MotionDivWrapper"
import { motion } from "framer-motion"
import { Search, Users, FileText, Shield, Zap, Edit3, Clock, Lock } from "lucide-react"

export default function FaqClient() {
  const benefits = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Easy to Find",
      description: "AI-powered search makes every answer instantly accessible.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Easy to Contribute",
      description: "Your whole team can add FAQs or articles without training.",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Easy to Organize",
      description: "Group by product, category, or workflow — no clutter.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Easy to Share",
      description: "Public FAQs for customers, private knowledge bases for teams.",
    },
  ]

  const teams = [
    { team: "Support Teams", benefit: "Reduce repetitive tickets, give customers self-service answers." },
    { team: "Marketing", benefit: "Publish product guides, tutorials, and how-to blogs." },
    { team: "Engineering", benefit: "Document processes, APIs, and onboarding guides." },
    { team: "Everyone", benefit: "One trusted place where knowledge lives." },
  ]

  const features = [
    { icon: <Zap className="w-6 h-6" />, title: "AI-Powered Search", description: "Answers in seconds." },
    { icon: <Edit3 className="w-6 h-6" />, title: "Rich Editor", description: "Write in plain text, markdown, or embed media." },
    { icon: <Clock className="w-6 h-6" />, title: "Version History", description: "Always up to date, never lose context." },
    { icon: <Lock className="w-6 h-6" />, title: "Access Control", description: "Choose what's public and what's internal." },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen">
      {/* ✅ Hero Section */}
      <MotionWrapper
        className="py-20 relative overflow-hidden theme-bg-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <MotionWrapper
            className="text-5xl md:text-7xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The smarter way to{" "}
            <span className="opacity-70">Manage FAQs</span> and team knowledge with AI.
          </MotionWrapper>

          <MotionWrapper
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-pretty opacity-80"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From customer FAQs to internal guides, organize answers once and let AI make them easy to find for everyone.
          </MotionWrapper>

          <MotionWrapper
            as="button"
            className="btn btn-primary mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-hover
            onClick={() => window.open("https://faq.docstar.io")}
          >
            Get Started with AI-powered Knowledge Base
          </MotionWrapper>
        </div>
      </MotionWrapper>

      {/* ✅ Why You Need This */}
      <MotionWrapper
        className="py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            variants={itemVariants}
          >
            Why You Need This
          </MotionWrapper>

          <div className="grid md:grid-cols-3 gap-8">
            <MotionWrapper className="text-center p-6 rounded-2xl theme-bg-secondary theme-border" variants={itemVariants}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 theme-bg-secondary">
                <Users className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-lg opacity-80">Support teams keep answering the same questions.</p>
            </MotionWrapper>

            <MotionWrapper className="text-center p-6 rounded-2xl theme-bg-secondary theme-border" variants={itemVariants}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 theme-bg-secondary">
                <FileText className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-lg opacity-80">Internal knowledge is scattered across chats and docs.</p>
            </MotionWrapper>

            <MotionWrapper className="text-center p-6 rounded-2xl theme-bg-secondary theme-border" variants={itemVariants}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 theme-bg-secondary">
                <Search className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-lg opacity-80">Employees and customers waste time searching for answers.</p>
            </MotionWrapper>
          </div>

          <MotionWrapper
            className="mt-16 text-center p-8 rounded-2xl theme-bg-secondary theme-border"
            variants={itemVariants}
          >
            <p className="text-xl font-medium opacity-80">
              <strong>Your solution:</strong> A single AI-powered knowledge base that serves both your customers (FAQs,
              help articles) and your team (internal documentation).
            </p>
          </MotionWrapper>
        </div>
      </MotionWrapper>

      {/* ✅ Key Benefits */}
      <MotionWrapper
        className="py-20 theme-bg-secondary"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            variants={itemVariants}
          >
            Key Benefits
          </MotionWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <MotionWrapper
                key={index}
                className="p-6 rounded-2xl shadow-sm theme-bg theme-border hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 theme-bg-secondary opacity-80">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="opacity-80">{benefit.description}</p>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </MotionWrapper>

      {/* ✅ For Different Teams */}
      <MotionWrapper
        className="py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            variants={itemVariants}
          >
            For Different Teams
          </MotionWrapper>

          <div className="grid md:grid-cols-2 gap-8">
            {teams.map((team, index) => (
              <MotionWrapper
                key={index}
                className="flex items-start space-x-4 p-6 rounded-2xl theme-bg-secondary theme-border"
                variants={itemVariants}
              >
                <div className="w-2 h-2 rounded-full mt-3 flex-shrink-0 opacity-80" style={{ backgroundColor: 'var(--app-text)' }}></div>
                <div>
                  <h3 className="text-normal font-semibold mb-2 opacity-80">For {team.team}</h3>
                  <p className="text-sm opacity-80">{team.benefit}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </MotionWrapper>

      {/* ✅ Feature Highlights */}
      <MotionWrapper
        className="py-20 theme-bg-secondary"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            variants={itemVariants}
          >
            Feature Highlights
          </MotionWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <MotionWrapper
                key={index}
                className="text-center p-6 rounded-2xl shadow-sm theme-bg theme-border"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 theme-bg-secondary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="opacity-80">{feature.description}</p>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </MotionWrapper>

      {/* ✅ Final CTA */}
      <MotionWrapper
        className="py-20 theme-bg-secondary text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-6 opacity-80">
          <MotionWrapper
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let AI handle the busywork of FAQs and Knowledgebase
          </MotionWrapper>

          <MotionWrapper
            className="text-xl mb-8 opacity-70"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            — so your team can focus on what matters.
          </MotionWrapper>
        </div>
      </MotionWrapper>
    </div>
  )
}
