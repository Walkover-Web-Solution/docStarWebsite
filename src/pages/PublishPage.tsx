"use client"

import { motion } from "framer-motion"
import { PenTool, TrendingUp, Search, Users, Zap, BarChart3, Palette, Clock } from "lucide-react"

const PublishPage = () => {
  const benefits = [
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Easy Blog Publishing",
      description: "Write and format blogs with a clean, intuitive editor.",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "SEO Optimization",
      description: "Boost your blog's reach with built-in SEO tools.",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Custom Branding",
      description: "Personalize your blog's header and footer to match your brand.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Hassle-Free Setup",
      description: "Set up your blogging platform in just a few clicks.",
    },
  ]

  const growthReasons = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Boost Search Rankings",
      description: "Keyword-rich content improves your SEO performance.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Build Trust & Authority",
      description: "Establish thought leadership in your niche.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Drive Organic Traffic",
      description: "Attract the right audience through SEO optimization.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Generate Quality Leads",
      description: "Engage readers with useful, shareable insights.",
    },
  ]

  const features = [
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Rich Content Editor",
      description: "Add images, code snippets, and rich media effortlessly.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics & Insights",
      description: "Track performance with detailed traffic reports.",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "SEO Tools",
      description: "Identify top-performing keywords automatically.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast & Scalable",
      description: "Built for developers and businesses that care about performance.",
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
            Publish{" "}
            <span className="text-black/70">
              Engaging Blogs
            </span>{" "}
            to Grow Your Presence
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 text-purple-100 max-w-4xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Publishing high-quality, SEO-friendly blogs is one of the most effective ways to grow your online presence,
            attract organic traffic, and establish thought leadership.
          </motion.p>

          <motion.button
            className="text-lg rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border border border-white/40 font-semibold px-6 py-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-hover
            onClick={()=>{window.open('https://docstar.io/blogs')}}
          >
            Start Publishing with DocStar
          </motion.button>
        </div>
      </motion.section>

      {/* Why Blogging is Essential Section */}
      <motion.section
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900" variants={itemVariants}>
            Why Blogging is Essential for Growth
          </motion.h2>

          <motion.p className="text-xl text-center mb-12 text-gray-700 max-w-3xl mx-auto" variants={itemVariants}>
            A consistent blogging strategy helps you build authority and drive growth:
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {growthReasons.map((reason, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm text-black">
                  {reason.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">{reason.title}</h3>
                <p className="text-gray-600 text-sm">{reason.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 text-center bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100"
            variants={itemVariants}
          >
            <p className="text-lg text-purple-800 font-bold">
              Whether you're a <strong>startup</strong>, <strong>SaaS company</strong>, or <strong>enterprise</strong>,
              blogs are a proven growth engine.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Publish Blogs with DocStar Section */}
      <motion.section
        className="py-20 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Publish Blogs with DocStar
          </motion.h2>

          <motion.p className="text-xl text-center mb-12 text-gray-700 max-w-3xl mx-auto" variants={itemVariants}>
            Get a powerful blogging and documentation platform that makes content creation seamless:
          </motion.p>

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

      {/* Benefits Section */}
      <motion.section
        className="py-20 bg-red-100"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
        <motion.h2
  className="text-3xl md:text-5xl font-extrabold text-center mb-16 tracking-wide uppercase text-gray-900"
  variants={itemVariants}
>
  How DocStar Elevates Your Blogging Experience
</motion.h2>
                                                                                                                                                                                                               
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="flex items-start space-x-4 p-6 rounded-xl  border border-black"
              variants={itemVariants}
            >
              <div className="w-2 h-2 bg-black/80 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">Grow Online Visibility</h3>
                <p className="text-gray-700">SEO-powered blogging increases your search rankings and organic reach.</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start space-x-4 p-6 rounded-xl border border-black"
              variants={itemVariants}
            >
              <div className="w-2 h-2 bg-black/80 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">Simplify Content Management</h3>
                <p className="text-gray-700">
                  All-in-one platform combines blogging with documentation and knowledge base.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start space-x-4 p-6 rounded-xl border border-black"
              variants={itemVariants}
            >
              <div className="w-2 h-2 bg-black/80 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">Reach Target Audience</h3>
                <p className="text-gray-700">Engage and attract the right audience with optimized, valuable content.</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start space-x-4 p-6 rounded-xl border border-black"
              variants={itemVariants}
            >
              <div className="w-2 h-2 bg-black/80 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">Support Growth</h3>
                <p className="text-gray-700">High-quality content drives marketing and product growth initiatives.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Why Choose DocStar Section */}
      <motion.section
        className="py-20 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Why Choose DocStar for Blogging?
          </motion.h2>

          <motion.p className="text-xl text-center mb-12 text-gray-700 max-w-3xl mx-auto" variants={itemVariants}>
            Unlike generic CMS platforms, DocStar is built for developers, startups, and businesses that care about both
            content and functionality.
          </motion.p>

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
{/* 
          <motion.div
            className="mt-16 text-center bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100"
            variants={itemVariants}
          >
            <div className="space-y-4 flex gap-1 font-semibold">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <p className="text-gray-800">A fast, scalable, and secure blogging solution</p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <p className="text-gray-800">Seamless integration with your API docs and knowledge base</p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <p className="text-gray-800">Tools to combine documentation + blogs in one place</p>
              </div>
            </div>
          </motion.div> */}

<motion.div
  className="mt-16 grid md:grid-cols-3 gap-8 text-left"
  variants={itemVariants}
>
  <div className="flex items-start gap-3">
  <div className="w-2 h-2 bg-black/60 rounded-full mt-3 flex-shrink-0"></div>
    <p className="text-gray-800 font-semibold">
      Fast, scalable, and secure blogging solution
    </p>
  </div>

  <div className="flex items-start gap-3">
  <div className="w-2 h-2 bg-black/60 rounded-full mt-3 flex-shrink-0"></div>
    <p className="text-gray-800 font-semibold">
      Seamless integration with your API docs and knowledge base
    </p>
  </div>

  <div className="flex items-start gap-3">
  <div className="w-2 h-2 bg-black/60 rounded-full mt-3 flex-shrink-0"></div>
    <p className="text-gray-800 font-semibold">
      Tools to combine documentation + blogs in one place
    </p>
  </div>
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
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-balance text-black/70"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Start Growing Your Presence with Blogs
          </motion.h2>

          <motion.p
            className="text-xl mb-8 text-black/50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Publishing blogs shouldn't be complicated. Focus on creating valuable, engaging content while we handle the
            SEO optimization, formatting, and publishing workflow.
          </motion.p>

          <motion.button
            className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-50 transition-colors duration-300 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>{window.open("https://app.docstar.io/login")}}
          >
            Start Publishing with DocStar
          </motion.button>
        </div>
      </motion.section>
    </div>
  )
}

export default PublishPage
