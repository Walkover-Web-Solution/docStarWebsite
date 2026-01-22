"use client"

import MotionWrapper from "@/components/motion/MotionDivWrapper"
import { motion } from "framer-motion"
import { Globe, CheckCircle, Sparkles, ArrowRight } from "lucide-react"

const MultiLanguageClient = () => {
  const languages = [
    { flag: "🇮🇳", name: "Hindi", description: "Engage with one of the largest and fastest-growing user bases in India." },
    { flag: "🇪🇸", name: "Spanish", description: "Connect with audiences across Spain, Latin America, and beyond." },
    { flag: "🇫🇷", name: "French", description: "Deliver content for users in France, Canada, and Africa." },
    { flag: "🇩🇪", name: "German", description: "Provide localized experiences for German-speaking regions in Europe." },
    { flag: "🇨🇳", name: "Chinese", description: "Reach the world's largest online population with Simplified Chinese support." },
    { flag: "🇯🇵", name: "Japanese", description: "Cater to Japanese businesses and developer communities with precision." },
    { flag: "🇸🇦", name: "Arabic", description: "Share content with users across the Middle East in right-to-left (RTL) format." },
    { flag: "🇵🇹", name: "Portuguese", description: "Support audiences in Portugal and Brazil with localized content." },
    { flag: "🇷🇺", name: "Russian", description: "Make your documentation accessible to Russian-speaking communities worldwide." },
  ]

  const features = [
    { icon: <Globe className="w-6 h-6" />, title: "Centralized Management", description: "Manage all your language versions in one platform—no need for scattered files or manual syncing." },
    { icon: <ArrowRight className="w-6 h-6" />, title: "Seamless Switching", description: "Readers can easily switch between languages, ensuring a smooth and consistent user experience." },
    { icon: <Sparkles className="w-6 h-6" />, title: "AI-Powered Translations", description: "Use AI-assisted tools to quickly translate and fine-tune documentation, reducing manual effort." },
    { icon: <CheckCircle className="w-6 h-6" />, title: "Consistent Formatting", description: "Maintain the same style, structure, and formatting across all language versions for brand consistency." },
  ]

  const benefits = [
    { title: "Expand global reach", description: "Making your content accessible to millions more users worldwide." },
    { title: "Reduce friction for international teams", description: "Offering documentation in their preferred language." },
    { title: "Boost SEO rankings", description: "In multiple regions with localized content." },
    { title: "Enhance customer satisfaction", description: "By providing native-language support." },
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
      {/* Hero Section */}
      <MotionWrapper
        className="py-20 relative overflow-hidden theme-bg-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <MotionWrapper
            className="text-5xl md:text-7xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Multi-Language <span className="opacity-70">Support for </span>
            Global Teams
          </MotionWrapper>

          <MotionWrapper
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-pretty opacity-80"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Deliver clear and accessible documentation in every language your audience speaks. Your docs, any language,
            everywhere.
          </MotionWrapper>

          <MotionWrapper
            href="https://app.docstar.io/login"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mx-auto w-fit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started with DocStar
          </MotionWrapper>
        </div>
      </MotionWrapper>

      {/* Why Multi-Language Matters */}
      <MotionWrapper
        className="py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16" variants={itemVariants}>
            Why Multi-Language Support Matters
          </MotionWrapper>

          <MotionWrapper className="text-xl text-center mb-12 max-w-4xl mx-auto opacity-80" variants={itemVariants}>
            As businesses expand globally, clear communication becomes critical. With DocStar, you can:
          </MotionWrapper>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <MotionWrapper
                key={index}
                className="flex items-start space-x-4 p-6 rounded-2xl theme-bg-secondary border"
                variants={itemVariants}
              >
                <div className="w-2 h-2 rounded-full mt-3 flex-shrink-0 opacity-80" style={{ backgroundColor: 'var(--app-text)' }} />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="opacity-80">{benefit.description}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>

          <MotionWrapper
            className="mt-16 text-center p-8 rounded-2xl theme-bg-secondary border"
            variants={itemVariants}
          >
            <p className="text-xl font-medium opacity-90">
              <strong>Build trust and engagement</strong> with customers in their native language while strengthening
              your brand's global presence and visibility.
            </p>
          </MotionWrapper>
        </div>
      </MotionWrapper>

      {/* Languages Supported */}
      <MotionWrapper
        className="py-20 theme-bg-secondary"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16" variants={itemVariants}>
            Languages Supported by DocStar
          </MotionWrapper>

          <MotionWrapper className="text-xl text-center mb-12 max-w-4xl mx-auto opacity-80" variants={itemVariants}>
            DocStar provides full support for some of the world's most widely spoken languages, allowing you to serve
            global audiences without additional complexity:
          </MotionWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languages.map((language, index) => (
              <MotionWrapper
                key={index}
                className="p-6 rounded-2xl shadow-sm theme-bg border hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{language.flag}</span>
                  <h3 className="text-xl font-semibold">{language.name}</h3>
                </div>
                <p className="opacity-80">{language.description}</p>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </MotionWrapper>

      {/* Key Features */}
      <MotionWrapper
        className="py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16" variants={itemVariants}>
            Key Features of DocStar's Multi-Language Support
          </MotionWrapper>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <MotionWrapper
                key={index}
                className="p-6 rounded-2xl shadow-sm theme-bg border hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 theme-bg-secondary opacity-80">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="opacity-80">{feature.description}</p>
              </MotionWrapper>
            ))}
          </div>

          <MotionWrapper
            className="mt-16 text-center p-8 rounded-2xl theme-bg-secondary border"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold mb-4">Scalable for Global Growth</h3>
            <p className="text-xl opacity-90">
              As your business expands, add new languages effortlessly without disrupting your workflow.
            </p>
          </MotionWrapper>
        </div>
      </MotionWrapper>

      {/* Final CTA */}
      <MotionWrapper
        className="py-20 theme-bg-secondary text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6 opacity-80">
          <MotionWrapper
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Deliver Documentation Without Borders
          </MotionWrapper>

          <MotionWrapper
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            With DocStar's multi-language support, your documentation isn't limited by geography.
          </MotionWrapper>

          <MotionWrapper
            href="https://app.docstar.io/login"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-fit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started with DocStar
          </MotionWrapper>
        </div>
      </MotionWrapper>
    </div>
  )
}

export default MultiLanguageClient
