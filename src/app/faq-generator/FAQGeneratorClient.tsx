"use client"

import { motion } from "framer-motion"
import {
  FileText,
  Sparkles,
  Clock,
  Eye,
  CheckCircle,
  Zap,
  Shield,
  TrendingUp,
  RefreshCw,
  XCircle,
} from "lucide-react"

export const FAQGeneratorClient = () => {
  const howItWorksSteps = [
    { icon: <FileText className="w-6 h-6" />, title: "Provide Content", desc: "Share your docs, articles, or notes" },
    { icon: <Sparkles className="w-6 h-6" />, title: "AI Generation", desc: "AI creates relevant FAQs" },
    { icon: <Clock className="w-6 h-6" />, title: "Pending Review", desc: "FAQs await your approval" },
    { icon: <Eye className="w-6 h-6" />, title: "Review & Edit", desc: "Approve, update, or reject" },
    { icon: <CheckCircle className="w-6 h-6" />, title: "Go Live", desc: "Publish the approved FAQs" },
  ]

  const contentTypes = [
    "Product documentation",
    "Feature descriptions",
    "Help articles",
    "Raw notes",
  ]

  const webhookFeatures = [
    {
      title: "How it works",
      icon: <Zap className="w-6 h-6" />,
      items: ["Provide a webhook URL", "System sends generated FAQs once ready"],
    },
    {
      title: "What you receive",
      icon: <CheckCircle className="w-6 h-6" />,
      items: ["List of pending FAQs (not live)", "A reference ID for tracking"],
    },
    {
      title: "Important",
      icon: <Shield className="w-6 h-6" />,
      items: ["You still need to review and approve FAQs", "If webhook fails, FAQs remain in dashboard"],
    },
  ]

  const reviewActions = [
    { title: "Approve as New", desc: "Adds a new FAQ and publishes it immediately", icon: <CheckCircle className="w-6 h-6" /> },
    { title: "Update Existing", desc: "Improves or replaces an existing FAQ", icon: <RefreshCw className="w-6 h-6" /> },
    { title: "Reject", desc: "Removes the suggestion", icon: <XCircle className="w-6 h-6" /> },
  ]

  const keyPoints = [
    { icon: <Clock className="w-6 h-6" />, text: "FAQ generation is not instant" },
    { icon: <Shield className="w-6 h-6" />, text: "Nothing goes live without your approval" },
    { icon: <CheckCircle className="w-6 h-6" />, text: "You stay in full control of content" },
    { icon: <TrendingUp className="w-6 h-6" />, text: "The system avoids duplicates and improves existing FAQs automatically" },
    { icon: <Sparkles className="w-6 h-6" />, text: "You can still add manual FAQs anytime" },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 theme-bg-secondary border-b theme-border">
        <div className="container mx-auto px-4 sm:px-5 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 mt-20"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md border theme-border text-xs font-medium">
              <Sparkles className="w-4 h-4 text-[var(--theme-color)]" />
              AI-Powered FAQ System
            </span>
          </motion.div>

          <motion.h1
            className="h1 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            FAQ <span className="text-gradient">Generator</span>
          </motion.h1>

          <motion.p
            className="text-sm md:text-base mb-6 max-w-3xl mx-auto leading-snug opacity-70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Automatically generate FAQs from your content using AI. Review, edit, and publish only what you
            approve—keeping your help center accurate, up-to-date, and fully under your control.
          </motion.p>

          <button
            className="btn btn-primary mx-auto"
            onClick={() => {
              window.open("https://app.docstar.io/login")
            }}
          >
            Get Started with DocStar
          </button>
        </div>
      </section>

      <div className="container mx-auto">
        {/* How It Works Section */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 leading-tight">
            How It Works
          </h2>
          <p className="text-sm md:text-base mb-8 leading-snug opacity-70">
            A simple, streamlined process from content to published FAQs
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {howItWorksSteps.map((step, index) => (
              <article
                key={index}
                className="p-5 md:p-6 rounded-md theme-bg-secondary border theme-border hover:border-[var(--theme-color)] transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-md border theme-border flex items-center justify-center mb-3">
                  {step.icon}
                </div>
                <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--theme-color)] text-white text-xs font-bold mb-3">
                  {index + 1}
                </div>
                <h3 className="text-lg font-medium mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm opacity-70 leading-snug">
                  {step.desc}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Generate FAQs Section */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-8 leading-tight">
            Generate FAQs
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <article className="p-6 md:p-8 rounded-md border theme-border bg-[var(--theme-bg)] hover:border-[var(--theme-color)] transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-md border theme-border flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium">What you need</h3>
              </div>
              <p className="text-sm opacity-70 mb-4">Provide any content such as:</p>
              <ul className="space-y-3 mb-6">
                {contentTypes.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[var(--theme-color)]" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm font-medium pt-4 border-t theme-border">
                Then trigger FAQ generation via API
              </p>
            </article>

            <article className="p-6 md:p-8 rounded-md border theme-border theme-bg-secondary hover:border-[var(--theme-color)] transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-md border theme-border flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium">Important Note</h3>
              </div>
              <p className="text-sm opacity-70 leading-relaxed">
                Generation runs in the background and may take <strong>a few hours up to a day</strong>.
                You'll be notified when your FAQs are ready for review.
              </p>
            </article>
          </div>
        </section>

        {/* Webhook Section */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md border theme-border text-xs font-medium mb-3">
              <Zap className="w-4 h-4 text-[var(--theme-color)]" />
              Optional Feature
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 leading-tight">
            Webhook Integration
          </h2>
          <p className="text-sm md:text-base mb-8 leading-snug opacity-70">
            Get notified when FAQ generation is complete
          </p>

          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {webhookFeatures.map((feature, index) => (
              <article
                key={index}
                className="p-5 md:p-6 rounded-md theme-bg-secondary border theme-border hover:border-[var(--theme-color)] transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-md border theme-border flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium">{feature.title}</h3>
                </div>
                <ul className="space-y-3">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-[var(--theme-color)] mt-2 flex-shrink-0"></div>
                      <span className="text-sm opacity-70 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Complete Control Section */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 leading-tight">
            Complete Control
          </h2>
          <p className="text-sm md:text-base mb-8 leading-snug opacity-70">
            Review, approve, and manage every FAQ before it goes live
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <article className="p-6 md:p-8 rounded-md border theme-border bg-[var(--theme-bg)] hover:border-[var(--theme-color)] transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-md border theme-border flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium">Pending FAQs</h3>
              </div>
              <p className="text-sm opacity-70 mb-4">
                Generated FAQs are <strong>not published automatically</strong>. They appear as Pending, where each item can be:
              </p>
              <ul className="space-y-3">
                {["A new FAQ", "An improvement to an existing FAQ"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[var(--theme-color)]" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="p-6 md:p-8 rounded-md border theme-border theme-bg-secondary hover:border-[var(--theme-color)] transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-md border theme-border flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium">Live FAQs</h3>
              </div>
              <p className="text-sm opacity-70 mb-4">Only approved FAQs:</p>
              <ul className="space-y-3">
                {["Are visible to users", "Appear in search results", "Are used in chatbots and public APIs"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[var(--theme-color)]" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {reviewActions.map((action, index) => (
              <article
                key={index}
                className="p-5 md:p-6 rounded-md border theme-border bg-[var(--theme-bg)] hover:border-[var(--theme-color)] transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-md border theme-border flex items-center justify-center mb-4">
                  {action.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{action.title}</h3>
                <p className="text-sm opacity-70 leading-snug">{action.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Key Points Section */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-8 leading-tight">
            Key Points
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-4.5 md:gap-5">
            {keyPoints.map((point, index) => (
              <article
                key={index}
                className="p-5 md:p-6 rounded-md theme-bg-secondary border theme-border hover:border-[var(--theme-color)] transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md border theme-border flex items-center justify-center flex-shrink-0">
                    {point.icon}
                  </div>
                  <p className="text-sm leading-relaxed pt-2">{point.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 leading-tight">
            Ready to Automate Your FAQs?
          </h2>

          <p className="text-sm md:text-base mb-6 opacity-70 leading-snug">
            Start generating intelligent FAQs from your content while maintaining complete control over what gets published.
            Transform your documentation into a self-service knowledge hub.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => {
              window.open("https://app.docstar.io/login")
            }}
          >
            Get Started with DocStar
          </button>
        </section>
      </div>
    </>
  )
}
