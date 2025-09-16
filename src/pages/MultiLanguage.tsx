"use client"

import { motion } from "framer-motion"
import { Globe, CheckCircle, Sparkles, ArrowRight } from "lucide-react"

export const MultiLanguage = () => {
  const languages = [
    {
      flag: "🇮🇳",
      name: "Hindi",
      description: "Engage with one of the largest and fastest-growing user bases in India.",
    },
    { flag: "🇪🇸", name: "Spanish", description: "Connect with audiences across Spain, Latin America, and beyond." },
    { flag: "🇫🇷", name: "French", description: "Deliver content for users in France, Canada, and Africa." },
    { flag: "🇩🇪", name: "German", description: "Provide localized experiences for German-speaking regions in Europe." },
    {
      flag: "🇨🇳",
      name: "Chinese",
      description: "Reach the world's largest online population with Simplified Chinese support.",
    },
    {
      flag: "🇯🇵",
      name: "Japanese",
      description: "Cater to Japanese businesses and developer communities with precision.",
    },
    {
      flag: "🇸🇦",
      name: "Arabic",
      description: "Share content with users across the Middle East in right-to-left (RTL) format.",
    },
    { flag: "🇵🇹", name: "Portuguese", description: "Support audiences in Portugal and Brazil with localized content." },
    {
      flag: "🇷🇺",
      name: "Russian",
      description: "Make your documentation accessible to Russian-speaking communities worldwide.",
    },
  ]

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Centralized Management",
      description: "Manage all your language versions in one platform—no need for scattered files or manual syncing.",
    },
    {
      icon: <ArrowRight className="w-6 h-6" />,
      title: "Seamless Switching",
      description: "Readers can easily switch between languages, ensuring a smooth and consistent user experience.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Translations",
      description: "Use AI-assisted tools to quickly translate and fine-tune documentation, reducing manual effort.",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Consistent Formatting",
      description:
        "Maintain the same style, structure, and formatting across all language versions for brand consistency.",
    },
  ]

  const benefits = [
    {
      title: "Expand global reach",
      description: "Making your content accessible to millions more users worldwide.",
    },
    {
      title: "Reduce friction for international teams",
      description: "Offering documentation in their preferred language.",
    },
    {
      title: "Boost SEO rankings",
      description: "In multiple regions with localized content.",
    },
    {
      title: "Enhance customer satisfaction",
      description: "By providing native-language support.",
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
            Multi-Language <span className="text-black/70">Support for </span>
            Global Teams
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 text-purple-100 max-w-4xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Deliver clear and accessible documentation in every language your audience speaks. Your docs, any language, everywhere.
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

      {/* Why Multi-Language Matters Section */}
      <motion.section
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Why Multi-Language Support Matters
          </motion.h2>

          <motion.p className="text-xl text-center mb-12 text-gray-700 max-w-4xl mx-auto" variants={itemVariants}>
            As businesses expand globally, clear communication becomes critical. With DocStar, you can:
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100"
                variants={itemVariants}
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 text-center bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100"
            variants={itemVariants}
          >
            <p className="text-xl text-gray-800 font-medium">
              <strong>Build trust and engagement</strong> with customers in their native language while strengthening
              your brand's global presence and visibility.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Languages Supported Section */}
      <motion.section
        className="py-20 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Languages Supported by DocStar
          </motion.h2>

          <motion.p className="text-xl text-center mb-12 text-gray-700 max-w-4xl mx-auto" variants={itemVariants}>
            DocStar provides full support for some of the world's most widely spoken languages, allowing you to serve
            global audiences without additional complexity:
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languages.map((language, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{language.flag}</span>
                  <h3 className="text-xl font-semibold text-gray-900">{language.name}</h3>
                </div>
                <p className="text-gray-600">{language.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Key Features Section */}
      <motion.section
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Key Features of DocStar's Multi-Language Support
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
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

          <motion.div
            className="mt-16 text-center bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-purple-900 mb-4">Scalable for Global Growth</h3>
            <p className="text-xl text-gray-800">
              As your business expands, add new languages effortlessly without disrupting your workflow.
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
        <div className="max-w-6xl mx-auto px-6 text-black/70">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Deliver Documentation Without Borders
          </motion.h2>

          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            With DocStar's multi-language support, your documentation isn't limited by geography.
          </motion.p>

          <motion.button
            className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-black/70 hover:text-white transition-colors duration-300 shadow-lg"
            viewport={{ once: true }}
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
