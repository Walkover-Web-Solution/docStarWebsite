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
  ArrowRight,
  Terminal,
} from "lucide-react"
import Link from "next/link"
import CTASection from "@/components/CTASection"

const TerminalWindow = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={`rounded-xl overflow-hidden border theme-border shadow-2xl bg-[#0d1117] ${className}`}>
    <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-gray-800">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
      </div>
      <div className="mx-auto text-xs font-mono text-gray-500 flex items-center gap-2">
        <Terminal className="w-3 h-3" />
        {title}
      </div>
    </div>
    <div className="p-5 font-mono text-sm text-gray-300 overflow-x-auto leading-relaxed">
      {children}
    </div>
  </div>
);

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
      <div className="relative min-h-[75vh] flex items-center border-b theme-border overflow-hidden">
        <div className="absolute inset-0 theme-bg-secondary">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] to-transparent"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--theme-color)]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center pt-20 pb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border theme-border mb-6 bg-[var(--theme-bg)] shadow-sm backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[var(--theme-color)]" />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  AI-Powered FAQ System
                </span>
              </div>

              <h1 className="h1 mb-6 leading-tight">
                FAQ <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-bl from-[var(--theme-color)] to-pink-500">
                  Generator.
                </span>
              </h1>

              <p className="text-base sm:text-lg opacity-70 mb-8 leading-relaxed max-w-xl">
                Automatically generate FAQs from your content using AI. Review, edit, and publish only what you approve—keeping your help center accurate, up-to-date, and fully under your control.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://app.docstar.io/login"
                  target="_blank"
                  className="btn btn-primary shadow-lg shadow-[var(--theme-color)]/20"
                >
                  Get Started with DocStar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-pink-500/20 rounded-2xl transform rotate-3 scale-105 blur-xl"></div>
              <TerminalWindow title="faq-prompt.md" className="relative z-10 transform -rotate-2 hover:rotate-0 transition-all duration-500">
                <span className="text-gray-500"># FAQ Generation Request</span>{"\n"}
                <span className="text-pink-400">source</span>: <span className="text-blue-300">"product-docs.md"</span>{"\n"}
                <span className="text-pink-400">count</span>: <span className="text-amber-300">10</span>{"\n"}
                <span className="text-pink-400">language</span>: <span className="text-green-300">"en"</span>{"\n\n"}
                <span className="text-gray-500"># Generation Status</span>{"\n"}
                <span className="text-amber-400">⏳</span> <span className="text-gray-300">Processing...</span>{"\n"}
                <span className="text-gray-500">ETA: 2-4 hours</span>{"\n\n"}
                <span className="text-gray-500"># Output</span>{"\n"}
                <span className="text-gray-300">FAQs will appear in</span>{"\n"}
                <span className="text-blue-300">Pending Review</span> <span className="text-gray-300">section</span>
              </TerminalWindow>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 p-4 rounded-xl theme-bg-secondary border theme-border shadow-xl flex items-center gap-4 z-20 animate-bounce" style={{ animationDuration: '3s'}}>
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Status</p>
                  <p className="text-sm font-medium opacity-80">Processing</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        {/* How It Works Section */}
        <div className="py-16 md:py-24 px-4 sm:px-6 relative">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              How It Works
            </h2>
            <p className="text-base md:text-lg opacity-60 leading-relaxed">
              A simple, streamlined process from content to published FAQs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="h-full p-6 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm text-center">
                  <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--theme-color)] text-white text-sm font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-3 leading-tight">{step.title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Generate FAQs Section */}
        <div className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-border-color)]/20 to-transparent"></div>
          
          <div className="relative z-10 px-4 sm:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-500 mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                Generate FAQs
              </h2>
              <p className="text-base md:text-lg opacity-60 max-w-2xl mx-auto">
                Start with your content and let AI do the heavy lifting
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-[var(--theme-color)]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="h-full p-8 rounded-2xl border theme-border bg-[var(--theme-bg)] relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">What you need</h3>
                  </div>
                  <p className="text-sm opacity-70 mb-6 leading-relaxed">Provide any content such as:</p>
                  <ul className="space-y-4 mb-8">
                    {contentTypes.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[var(--theme-color)]" />
                        <span className="text-sm opacity-90">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-medium pt-4 border-t theme-border">
                    Then trigger FAQ generation via API
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-amber-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="h-full p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-bold">Important Note</h3>
                  </div>
                  <p className="text-sm opacity-70 leading-relaxed">
                    Generation runs in the background and may take <strong>a few hours up to a day</strong>.
                    You'll be notified when your FAQs are ready for review.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Webhook Section */}
        <div className="py-16 md:py-24 px-4 sm:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border theme-border mb-6 bg-[var(--theme-bg)] shadow-sm backdrop-blur-md">
              <Zap className="w-4 h-4 text-[var(--theme-color)]" />
              <span className="text-xs font-semibold tracking-wide uppercase">
                Optional Feature
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              Webhook Integration
            </h2>
            <p className="text-base md:text-lg opacity-60 leading-relaxed">
              Get notified when FAQ generation is complete
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {webhookFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                  </div>
                  <ul className="space-y-4">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-color)] mt-2 flex-shrink-0"></div>
                        <span className="text-sm opacity-70 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Complete Control Section */}
        <div className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-border-color)]/20 to-transparent"></div>
          
          <div className="relative z-10 px-4 sm:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-500 mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                Complete Control
              </h2>
              <p className="text-base md:text-lg opacity-60 max-w-2xl mx-auto">
                Review, approve, and manage every FAQ before it goes live
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-amber-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="h-full p-8 rounded-2xl border theme-border bg-[var(--theme-bg)] relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-bold">Pending FAQs</h3>
                  </div>
                  <p className="text-sm opacity-70 mb-6 leading-relaxed">
                    Generated FAQs are <strong>not published automatically</strong>. They appear as Pending, where each item can be:
                  </p>
                  <ul className="space-y-4">
                    {["A new FAQ", "An improvement to an existing FAQ"].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[var(--theme-color)]" />
                        <span className="text-sm opacity-90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="h-full p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold">Live FAQs</h3>
                  </div>
                  <p className="text-sm opacity-70 mb-6 leading-relaxed">Only approved FAQs:</p>
                  <ul className="space-y-4">
                    {["Are visible to users", "Appear in search results", "Are used in chatbots and public APIs"].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[var(--theme-color)]" />
                        <span className="text-sm opacity-90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {reviewActions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="h-full p-8 rounded-2xl border theme-border bg-[var(--theme-bg)] relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm text-center">
                    <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                      {action.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{action.title}</h3>
                    <p className="text-sm opacity-70 leading-relaxed">{action.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Points Section */}
        <div className="py-16 md:py-24 px-4 sm:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              Key Points
            </h2>
            <p className="text-base md:text-lg opacity-60 leading-relaxed">
              Important things to remember about the FAQ generation system
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {keyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center flex-shrink-0">
                      {point.icon}
                    </div>
                    <p className="text-sm leading-relaxed pt-2 opacity-90">{point.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <CTASection
          title="Ready to Automate Your FAQs?"
          description="Start generating intelligent FAQs from your content while maintaining complete control over what gets published. Transform your documentation into a self-service knowledge hub."
        />
      </div>
    </>
  )
}
