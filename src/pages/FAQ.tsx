"use client"

import { motion } from "framer-motion"
import { Search, Users, FileText, Shield, Zap, Edit3, Clock, Lock } from "lucide-react"

const FAQLandingPage = () => {
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
    {
      team: "Support Teams",
      benefit: "Reduce repetitive tickets, give customers self-service answers.",
    },
    {
      team: "Marketing",
      benefit: "Publish product guides, tutorials, and how-to blogs.",
    },
    {
      team: "Engineering",
      benefit: "Document processes, APIs, and onboarding guides.",
    },
    {
      team: "Everyone",
      benefit: "One trusted place where knowledge lives.",
    },
  ]

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Search",
      description: "Answers in seconds.",
    },
    {
      icon: <Edit3 className="w-6 h-6" />,
      title: "Rich Editor",
      description: "Write in plain text, markdown, or embed media.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Version History",
      description: "Always up to date, never lose context.",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Access Control",
      description: "Choose what's public and what's internal.",
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
      <motion.section
        className="py-20 relative overflow-hidden bg-gradient-to-tr from-rose-100 to-pink-500 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The smarter way to{" "}
            <span className="text-black/70">
              Manage FAQs
            </span>{" "}
            and team knowledge with AI.
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 text-purple-100 max-w-4xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From customer FAQs to internal guides, organize answers once and let AI make them easy to find for everyone.
          </motion.p>

          <motion.button
            className="text-lg rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border border border-white/40 font-semibold px-6 py-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-hover
            onClick={()=>{window.open('https://faq.docstar.io')}}
          >
            Get Started with AI-powered Knowledge Base
          </motion.button>
        </div>
      </motion.section>

      {/* Why You Need This Section */}
      <motion.section
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Why You Need This
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div className="text-center p-6 rounded-2xl bg-red-50 border border-red-100" variants={itemVariants}>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-black/80" />
              </div>
              <p className="text-gray-700 text-lg">Support teams keep answering the same questions.</p>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-2xl bg-orange-50 border border-orange-100"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-black/80" />
              </div>
              <p className="text-gray-700 text-lg">Internal knowledge is scattered across chats and docs.</p>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-2xl bg-yellow-50 border border-yellow-100"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-black/80" />
              </div>
              <p className="text-gray-700 text-lg">Employees and customers waste time searching for answers.</p>
            </motion.div>
          </div>

          <motion.div
            className="mt-16 text-center bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100"
            variants={itemVariants}
          >
            <p className="text-xl text-gray-800 font-medium text-black/60">
              <strong>Your solution:</strong> A single AI-powered knowledge base that serves both your customers (FAQs,
              help articles) and your team (internal documentation).
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Key Benefits Section */}
      <motion.section
        className="py-20 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Key Benefits
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-purple-600">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* For Different Teams Section */}
      <motion.section
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            For Different Teams
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {teams.map((team, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100"
                variants={itemVariants}
              >
                <div className="w-2 h-2 bg-black/80 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="text-normal font-semibold text-black/70 mb-2">For {team.team}</h3>
                  <p className="text-gray-700 text-sm">{team.benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Feature Highlights Section */}
      <motion.section
        className="py-20 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Feature Highlights
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-gradient-to-tr from-rose-100 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="py-20 bg-rose-100 text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-6 text-black/70">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let AI handle the busywork of FAQs and Knowledgebase
          </motion.h2>

          <motion.p
            className="text-xl mb-8 text-black/40"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            — so your team can focus on what matters.
          </motion.p>

          {/* <motion.button
            className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-50 transition-colors duration-300 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started with AI-powered Knowledge Base
          </motion.button> */}
        </div>
      </motion.section>
    </div>
  )
}

export default FAQLandingPage
