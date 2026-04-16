"use client"

import MotionWrapper from "@/components/motion/MotionDivWrapper"
import { ArrowRight, FileText, Sparkles, Clock, Eye, CheckCircle, Zap, Shield, TrendingUp } from "lucide-react"

export const FAQGeneratorClient = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-amber-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,207,232,0.3),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(254,215,170,0.3),transparent_50%)]"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <MotionWrapper 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span className="text-sm font-medium text-rose-700">AI-Powered FAQ System</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              FAQ Generator
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Automatically generate FAQs from your content using AI. Review, edit, and publish only what you
              approve—keeping your help center accurate, up-to-date, and fully under your control.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <MotionWrapper
                as="a"
                href="https://app.docstar.io/login"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary inline-flex items-center text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started for Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </MotionWrapper>
              
              <MotionWrapper
                as="a"
                href="#how-it-works"
                className="btn btn-outline inline-flex items-center text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </MotionWrapper>
            </div>
          </MotionWrapper>
        </div>
      </section>

      <section id="how-it-works" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A simple, streamlined process from content to published FAQs
            </p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-200 via-rose-300 to-rose-200 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {[
                { icon: FileText, title: "Provide Content", desc: "Share your docs, articles, or notes" },
                { icon: Sparkles, title: "AI Generation", desc: "AI creates relevant FAQs" },
                { icon: Clock, title: "Pending Review", desc: "FAQs await your approval" },
                { icon: Eye, title: "Review & Edit", desc: "Approve, update, or reject" },
                { icon: CheckCircle, title: "Go Live", desc: "Publish the approved FAQs" },
              ].map((step, index) => (
                <MotionWrapper
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-rose-200 hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <step.icon className="w-8 h-8 text-white" strokeWidth={2} />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                          {index + 1}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Generate FAQs</h2>
            <p className="text-xl text-gray-600">Simple input, powerful output</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <MotionWrapper
              className="bg-white border border-gray-200 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">What you need</h3>
              </div>
              
              <p className="text-gray-600 mb-6">Provide any content such as:</p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Product documentation",
                  "Feature descriptions",
                  "Help articles",
                  "Raw notes"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 group">
                    <div className="w-6 h-6 bg-rose-50 rounded-lg flex items-center justify-center group-hover:bg-rose-100 transition-colors">
                      <CheckCircle className="w-4 h-4 text-rose-600" />
                    </div>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-6 border-t border-gray-100">
                <p className="text-gray-700 font-medium">Then trigger FAQ generation via API</p>
              </div>
            </MotionWrapper>

            <MotionWrapper
              className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-10 shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="text-2xl font-bold text-amber-900">Important Note</h3>
              </div>
              
              <p className="text-gray-800 text-lg leading-relaxed">
                Generation runs in the background and may take <strong>a few hours up to a day</strong>. 
                You'll be notified when your FAQs are ready for review.
              </p>
            </MotionWrapper>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
              <Zap className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Optional Feature</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Webhook Integration</h2>
            <p className="text-xl text-gray-600">Get notified when FAQ generation is complete</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "How it works",
                icon: Zap,
                color: "purple",
                items: ["Provide a webhook URL", "System sends generated FAQs once ready"]
              },
              {
                title: "What you receive",
                icon: CheckCircle,
                color: "blue",
                items: ["List of pending FAQs (not live)", "A reference ID for tracking"]
              },
              {
                title: "Important",
                icon: Shield,
                color: "rose",
                items: ["You still need to review and approve FAQs", "If webhook fails, FAQs remain in dashboard"]
              }
            ].map((card, idx) => (
              <MotionWrapper
                key={idx}
                className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 rounded-2xl p-8 hover:border-rose-200 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 bg-${card.color}-100 rounded-xl flex items-center justify-center`}>
                    <card.icon className={`w-6 h-6 text-${card.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
                </div>
                <ul className="space-y-3">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-rose-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Complete Control</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Review, approve, and manage every FAQ before it goes live
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <MotionWrapper
              className="bg-white border-2 border-amber-200 rounded-3xl p-10 shadow-xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Pending FAQs</h3>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Generated FAQs are <strong>not published automatically</strong>. They appear as Pending, where each item can be:
              </p>
              <ul className="space-y-4">
                {["A new FAQ", "An improvement to an existing FAQ"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </MotionWrapper>

            <MotionWrapper
              className="bg-white border-2 border-green-200 rounded-3xl p-10 shadow-xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Live FAQs</h3>
              </div>
              <p className="text-lg text-gray-700 mb-6">Only approved FAQs:</p>
              <ul className="space-y-4">
                {["Are visible to users", "Appear in search results", "Are used in chatbots and public APIs"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </MotionWrapper>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Approve as New", desc: "Adds a new FAQ and publishes it immediately", color: "green" },
              { title: "Update Existing", desc: "Improves or replaces an existing FAQ", color: "blue" },
              { title: "Reject", desc: "Removes the suggestion", color: "red" }
            ].map((action, idx) => (
              <MotionWrapper
                key={idx}
                className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-rose-200 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className={`w-14 h-14 bg-${action.color}-100 rounded-2xl flex items-center justify-center mb-4`}>
                  <CheckCircle className={`w-8 h-8 text-${action.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{action.title}</h3>
                <p className="text-gray-600 leading-relaxed">{action.desc}</p>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Key Points</h2>
            <p className="text-xl text-gray-600">Everything you need to know</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Clock, text: "FAQ generation is not instant" },
              { icon: Shield, text: "Nothing goes live without your approval" },
              { icon: CheckCircle, text: "You stay in full control of content" },
              { icon: TrendingUp, text: "The system avoids duplicates and improves existing FAQs automatically" },
              { icon: Sparkles, text: "You can still add manual FAQs anytime" },
            ].map((point, idx) => (
              <MotionWrapper
                key={idx}
                className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 rounded-2xl p-6 hover:border-rose-200 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-6 h-6 text-rose-600" />
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed pt-2">{point.text}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <MotionWrapper
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6">Ready to automate your FAQs?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Start generating intelligent FAQs from your content while maintaining complete control over what gets published.
            </p>
            <MotionWrapper
              as="a"
              href="https://app.docstar.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-10 py-5 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </MotionWrapper>
          </MotionWrapper>
        </div>
      </section>
    </div>
  )
}
