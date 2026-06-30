// components/AIPoweredSearchClient.tsx
"use client";

import { motion } from "framer-motion";
import {
  Search,
  Brain,
  Globe,
  TrendingUp,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";
import Link from "next/link";
import CTASection from "@/components/CTASection";

const TerminalWindow = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={`rounded-xl overflow-hidden border theme-border shadow-2xl bg-[#0d1117] ${className}`}>
    <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-gray-800">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
      </div>
      <div className="mx-auto text-xs font-mono text-gray-500 flex items-center gap-2">
        <Search className="w-3 h-3" />
        {title}
      </div>
    </div>
    <div className="p-5 font-mono text-sm text-gray-300 overflow-x-auto leading-relaxed">
      {children}
    </div>
  </div>
);

export const AIPoweredSearchClient = () => {
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
  ];

  const whyMatters = [
    {
      title: "Understanding natural language queries",
      description:
        "No need for exact keyword matching—users can search naturally.",
    },
    {
      title: "Prioritizing contextually relevant results",
      description:
        "Get the most relevant content based on context, not just keywords.",
    },
    {
      title: "Learning from user behavior to improve accuracy over time",
      description:
        "The system continuously improves based on user interactions.",
    },
    {
      title: "Reducing the time spent searching and increasing productivity",
      description: "Find information in seconds, not minutes.",
    },
  ];

  const benefits = [
    {
      title: "Instant access to the right information",
      description:
        "Without frustration or endless scrolling through irrelevant results.",
    },
    {
      title: "Higher user satisfaction",
      description: "With fast, accurate results that match user intent.",
    },
    {
      title: "Increased adoption of your docs and knowledge base",
      description:
        "Users will rely more on self-service when search actually works.",
    },
    {
      title: "Reduced support requests",
      description:
        "As users find answers on their own through intelligent search.",
    },
    {
      title: "Better productivity for internal teams",
      description: "Working across projects with quick access to information.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

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
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center pt-20 pb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border theme-border mb-6 bg-[var(--theme-bg)] shadow-sm backdrop-blur-md">
                <Brain className="w-4 h-4 text-[var(--theme-color)]" />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  Intelligent Search Technology
                </span>
              </div>

              <h1 className="h1 mb-6 leading-tight">
                AI-Powered <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-bl from-[var(--theme-color)] to-purple-500">
                  Search.
                </span>
              </h1>

              <p className="text-base sm:text-lg opacity-70 mb-8 leading-relaxed max-w-xl">
                AI-powered search helps your users quickly discover the most relevant content across documentation and knowledge bases using natural language understanding.
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
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-purple-500/20 rounded-2xl transform rotate-3 scale-105 blur-xl"></div>
              <TerminalWindow title="search-query.json" className="relative z-10 transform -rotate-2 hover:rotate-0 transition-all duration-500">
                <span className="text-pink-400">{"{"}</span>{"\n"}
                {"  "}<span className="text-pink-400">"query"</span>: <span className="text-green-300">"how do I authenticate users?"</span>{"\n"}
                {"  "}<span className="text-pink-400">"intent"</span>: <span className="text-blue-300">"authentication"</span>{"\n"}
                {"  "}<span className="text-pink-400">"context"</span>: <span className="text-blue-300">"API documentation"</span>{"\n"}
                {"  "}<span className="text-pink-400">"results"</span>: <span className="text-amber-300">[</span>{"\n"}
                {"    "}<span className="text-gray-300">"/api/auth/login.md"</span>{"\n"}
                {"    "}<span className="text-gray-300">"/guides/security.md"</span>{"\n"}
                {"    "}<span className="text-gray-300">"/api/users/create.md"</span>{"\n"}
                {"  "}<span className="text-amber-300">]</span>{"\n"}
                <span className="text-pink-400">{"}"}</span>
              </TerminalWindow>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 p-4 rounded-xl theme-bg-secondary border theme-border shadow-xl flex items-center gap-4 z-20 animate-bounce" style={{ animationDuration: '3s'}}>
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">AI Match</p>
                  <p className="text-sm font-medium opacity-80">98% Relevance</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        {/* Why AI-Powered Search Matters Section */}
        <div className="py-16 md:py-24 px-4 sm:px-6 relative">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              Why AI-Powered Search Matters
            </h2>
            <p className="text-base md:text-lg opacity-60 leading-relaxed">
              Traditional search tools often overwhelm users with irrelevant results. DocStar's AI-driven search solves this problem by:
            </p>
          </div>

          <div className="space-y-12 md:space-y-24 relative">
            {/* Vertical connector line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--theme-border-color)] to-transparent -translate-x-1/2"></div>

            {whyMatters.map((item, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
                <div className={`${index % 2 === 0 ? 'md:text-right order-2 md:order-1' : 'order-2'}`}>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--theme-color)]/10 text-[var(--theme-color)] mb-6 shadow-[0_0_30px_rgba(var(--theme-color-rgb),0.2)]">
                    <span className="text-xl font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="opacity-70 text-base leading-relaxed max-w-md ml-auto">
                    {item.description}
                  </p>
                </div>
                <div className={`${index % 2 === 0 ? 'order-1 md:order-2' : 'order-1'} relative group`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-[var(--theme-color)]" />
                      </div>
                      <span className="text-sm font-medium opacity-60">Key Insight</span>
                    </div>
                    <p className="text-sm leading-relaxed opacity-80">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features Section */}
        <div className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-border-color)]/20 to-transparent"></div>
          
          <div className="relative z-10 px-4 sm:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                Key Features of DocStar's AI Search
              </h2>
              <p className="text-base md:text-lg opacity-60 max-w-2xl mx-auto">
                Advanced AI capabilities that transform how users discover and interact with your documentation.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                    <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm opacity-70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section - Premium Glowing Card */}
        <div className="py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)] to-purple-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
            
            <div className="relative p-8 md:p-12 rounded-3xl bg-[var(--theme-bg)] border theme-border overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Zap className="w-48 h-48" />
              </div>
              
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[var(--theme-color)]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">Benefits for Your Users and Teams</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl theme-bg-secondary border theme-border hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                    <CheckCircle className="w-6 h-6 flex-shrink-0 text-emerald-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium opacity-90 leading-relaxed">{benefit.title}</p>
                      <p className="text-xs opacity-60 mt-1 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-xl theme-bg-secondary border theme-border relative z-10">
                <h4 className="text-lg font-bold mb-3">Transform Search Into a Competitive Advantage</h4>
                <p className="text-sm opacity-70 leading-relaxed">
                  With AI-powered search, DocStar turns documentation into a true knowledge hub—where answers are always within reach. Whether you're supporting global customers, onboarding developers, or streamlining internal workflows, DocStar ensures your users never waste time hunting for information.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <CTASection
          title="Make Every Search Count"
          description="Stop letting your users waste time with irrelevant search results. With DocStar's AI-powered search, every query delivers exactly what they need, when they need it."
        />
      </div>
    </>
  );
};
