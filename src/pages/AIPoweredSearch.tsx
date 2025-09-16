"use client"

import { motion } from "framer-motion"
import { Search, Brain, Globe, TrendingUp, CheckCircle, Sparkles } from "lucide-react"

export const AIPoweredSearchPage = () => {
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
  ]

  const whyMatters = [
    {
      title: "Understanding natural language queries",
      description: "No need for exact keyword matching—users can search naturally.",
    },
    {
      title: "Prioritizing contextually relevant results",
      description: "Get the most relevant content based on context, not just keywords.",
    },
    {
      title: "Learning from user behavior to improve accuracy over time",
      description: "The system continuously improves based on user interactions.",
    },
    {
      title: "Reducing the time spent searching and increasing productivity",
      description: "Find information in seconds, not minutes.",
    },
  ]

  const benefits = [
    {
      title: "Instant access to the right information",
      description: "Without frustration or endless scrolling through irrelevant results.",
    },
    {
      title: "Higher user satisfaction",
      description: "With fast, accurate results that match user intent.",
    },
    {
      title: "Increased adoption of your docs and knowledge base",
      description: "Users will rely more on self-service when search actually works.",
    },
    {
      title: "Reduced support requests",
      description: "As users find answers on their own through intelligent search.",
    },
    {
      title: "Better productivity for internal teams",
      description: "Working across projects with quick access to information.",
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
            AI-Powered <span className="text-black/70">Search</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 text-purple-100 max-w-4xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AI-powered search helps your users quickly discover the most relevant content across documentation and knowledge bases.
          </motion.p>

          <motion.button
            className="text-lg rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border border-white/40 font-semibold px-6 py-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>{window.open('https://app.docstar.io/login')}}
          >
            Get Started with DocStar
          </motion.button>
        </div>
      </motion.section>

      {/* Why AI-Powered Search Matters Section */}
      <motion.section
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Why AI-Powered Search Matters
          </motion.h2>

          <motion.p className="text-xl text-center mb-12 text-gray-700 max-w-4xl mx-auto" variants={itemVariants}>
            Traditional search tools often overwhelm users with irrelevant results. DocStar's AI-driven search solves
            this problem by:
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {whyMatters.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100"
                variants={itemVariants}
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Key Features Section */}
      <motion.section
        className="py-20 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Key Features of DocStar's AI Search
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
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
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Benefits for Your Users and Teams
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
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
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 text-center bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-purple-900 mb-4">Transform Search Into a Competitive Advantage</h3>
            <p className="text-xl text-gray-800">
              With AI-powered search, DocStar turns documentation into a true knowledge hub—where answers are always
              within reach. Whether you're supporting global customers, onboarding developers, or streamlining internal
              workflows, DocStar ensures your users never waste time hunting for information.
            </p>
          </motion.div>
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
            Make Every Search Count
          </motion.h2>

          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Stop letting your users waste time with irrelevant search results. With DocStar's AI-powered search, every
            query delivers exactly what they need, when they need it. Transform your documentation from a static
            resource into an intelligent, responsive knowledge hub.
          </motion.p>

          <motion.button
            className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-black/70 hover:text-white transition-colors duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started with DocStar
          </motion.button>
        </div>
      </motion.section>
    </div>
  )
}
