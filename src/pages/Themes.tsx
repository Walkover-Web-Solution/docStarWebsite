"use client"

import { motion } from "framer-motion"
import { Layout, Palette, Globe, Settings, BarChart3, MessageSquare, CheckCircle, Sparkles } from "lucide-react"

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
  ]

  const publishingFeatures = [
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Bulk Publishing",
      description: "Save time by publishing multiple documents at once instead of handling them individually.",
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
      description: "Keep complete visibility over changes, updates, and publishing history with detailed logs.",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "User Feedback Collection",
      description:
        "Enable readers to leave feedback directly on your docs, helping your team continuously improve clarity and usefulness.",
    },
  ]

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
//bg-gradient-to-tr from-rose-100 to-pink-500
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        className="py-20 relative overflow-hidden bg-gradient-to-tr from-rose-100 to-pink-500 text-white/80"
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
             Design Your Way: <span className="text-black/70">Layouts & Themes</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 text-white/60 max-w-4xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From themes and layouts to workflows and analytics, DocStar gives you full control over your content experience.
          </motion.p>

          <motion.button
            className="text-lg rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border border-white/40 font-semibold px-6 py-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>{window.open('https://app.doctsar.io/login')}}
          >
            Get Started with DocStar
          </motion.button>
        </div>
      </motion.section>

      {/* Flexible Customization Section */}
      <motion.section
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Flexible Customization for Your Docs
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customizationFeatures.map((feature, index) => (
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

      {/* Smart Publishing Features Section */}
      <motion.section
        className="py-20 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Smart Publishing Features
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishingFeatures.map((feature, index) => (
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
            Benefits for Your Organization
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
            <h3 className="text-2xl font-bold text-purple-900 mb-4">
              From Draft to Professional Docs—All in One Platform
            </h3>
            <p className="text-xl text-gray-800">
              With DocStar's layouts, themes, and publishing options, you can go beyond writing. Build a branded,
              interactive, and user-friendly documentation hub that's optimized for growth, SEO, and customer
              engagement.
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
            Design Documentation That Reflects Your Brand
          </motion.h2>

          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Stop settling for generic documentation that doesn't represent your brand. With DocStar's comprehensive
            customization and publishing tools, create a documentation experience that's as polished and professional as
            your product itself.
          </motion.p>

          <motion.button
            className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-black/70 hover:text-white transition-colors duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>{window.open('https://app.docstar.io/login')}}
          >
            Get Started with DocStar
          </motion.button>
        </div>
      </motion.section>
    </div>
  )
}
