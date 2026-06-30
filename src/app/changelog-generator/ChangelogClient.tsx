"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  Clock,
  CheckCircle,
  Zap,
  Shield,
  ArrowRight,
  History,
  Edit3,
  Globe,
  BellRing,
  XCircle,
  Terminal,
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
        <Terminal className="w-3 h-3" />
        {title}
      </div>
    </div>
    <div className="p-5 font-mono text-sm text-gray-300 overflow-x-auto leading-relaxed">
      {children}
    </div>
  </div>
);

export const ChangelogClient = () => {
  const benefits = [
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "AI-Powered Summaries",
      description:
        "DocStar automatically analyzes your documentation edits and generates a polished, user-friendly release note draft. Save hours of writing.",
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Complete Control",
      description:
        "AI generates the draft, but you have the final say. Review, edit, or discard any generated changelog before it reaches your users.",
    },
    {
      icon: <History className="w-7 h-7" />,
      title: "Centralized Update Hub",
      description:
        "Keep a unified timeline of all product and documentation changes. Help users easily track what's new and what's improved.",
    },
    {
      icon: <BellRing className="w-7 h-7" />,
      title: "Engagement & Visibility",
      description:
        "Don't let your hard work go unnoticed. Highlighting new features directly in your docs increases user adoption and engagement.",
    },
  ];

  const problems = [
    {
      text: "Writing release notes is tedious and often forgotten",
      icon: <XCircle className="w-5 h-5" />,
    },
    {
      text: "Users miss out on valuable new features and improvements",
      icon: <XCircle className="w-5 h-5" />,
    },
    {
      text: "Disconnect between documentation updates and product announcements",
      icon: <XCircle className="w-5 h-5" />,
    },
  ];

  const solutions = [
    {
      text: "AI drafts notes automatically based on your page edits",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      text: "A dedicated feed keeps users informed of your latest ships",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      text: "Documentation and release notes live in perfect sync",
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  const whyChoose = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Automatic Diff Tracking",
      description: "We monitor changes across your collections, new pages, and content revisions in the background.",
    },
    {
      icon: <Edit3 className="w-6 h-6" />,
      title: "Manual Entries Supported",
      description: "Want to announce something not in the docs? Easily write and publish manual changelog entries.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "SEO Optimized",
      description: "Changelog pages are fully indexed, helping you capture search traffic for new feature releases.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Pending Reviews Queue",
      description:
        "Generated notes sit in a pending queue. Nothing goes live until your team explicitly approves it.",
    },
  ];

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
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center pt-20 pb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border theme-border bg-[var(--theme-bg)] shadow-sm backdrop-blur-md mb-6">
                <History className="w-4 h-4 text-[var(--theme-color)]" />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  AI-Powered Changelog
                </span>
              </div>

              <h1 className="h1 mb-6 leading-tight">
                Ship Faster. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-bl from-[var(--theme-color)] to-orange-500">
                  Let AI Write the Release Notes.
                </span>
              </h1>

              <p className="text-base sm:text-lg opacity-70 mb-8 leading-relaxed max-w-xl">
                Keep your users informed effortlessly. DocStar tracks your documentation updates and automatically drafts polished release notes, giving you a centralized hub for all product announcements.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://app.docstar.io/login"
                  target="_blank"
                  className="btn btn-primary shadow-lg shadow-[var(--theme-color)]/20"
                >
                  Start Tracking Updates
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
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-orange-500/20 rounded-2xl transform rotate-3 scale-105 blur-xl"></div>
              
              <TerminalWindow title="ai-changelog-generator.ts" className="relative z-10 transform -rotate-2 hover:rotate-0 transition-all duration-500">
                <span className="text-pink-400">const</span> <span className="text-blue-300">generateReleaseNotes</span> <span className="text-pink-400">=</span> <span className="text-pink-400">async</span> (<span className="text-orange-300">diff</span>) <span className="text-pink-400">{`=>`}</span> {"{\n"}
                <span className="text-gray-500">  // DocStar AI analyzes documentation changes</span>{"\n"}
                <span className="text-pink-400">  const</span> summary <span className="text-pink-400">=</span> <span className="text-pink-400">await</span> ai.<span className="text-blue-300">summarize</span>(diff);{"\n\n"}
                <span className="text-gray-500">  // Drafts a beautifully formatted changelog</span>{"\n"}
                <span className="text-pink-400">  return</span> {"{\n"}
                <span className="text-gray-300">    title: </span><span className="text-green-300">"New Authentication API & Webhooks"</span>,{"\n"}
                <span className="text-gray-300">    type: </span><span className="text-green-300">"feature"</span>,{"\n"}
                <span className="text-gray-300">    content: summary.markdown,</span>{"\n"}
                <span className="text-gray-300">    status: </span><span className="text-green-300">"pending_review"</span>{"\n"}
                <span className="text-gray-300">  </span>{"}\n"}
                {"}"};
              </TerminalWindow>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 p-4 rounded-xl theme-bg-secondary border theme-border shadow-xl flex items-center gap-4 z-20 animate-bounce" style={{ animationDuration: '3s'}}>
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">AI Task</p>
                  <p className="text-sm font-medium opacity-80">Draft Generated</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        {/* Problem vs Solution - Side by Side */}
        <div className="py-16 md:py-24 px-4 sm:px-6 relative">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              Why Use an Automated Changelog?
            </h2>
            <p className="text-base md:text-lg opacity-60 leading-relaxed">
              Stop letting your hard work go unnoticed because writing release notes takes too much time.
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
              <div className="absolute inset-0 bg-rose-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="h-full p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center">
                    <Edit3 className="w-6 h-6 text-rose-500" />
                  </div>
                  <h3 className="text-xl font-bold opacity-60">Manual Updates</h3>
                </div>

                <div className="space-y-4">
                  {problems.map((problem, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-[var(--theme-bg)] border theme-border">
                      <div className="opacity-60 flex-shrink-0 mt-0.5 text-rose-500">{problem.icon}</div>
                      <p className="opacity-70 text-sm leading-relaxed">{problem.text}</p>
                    </div>
                  ))}
                </div>
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
              <div className="h-full p-8 rounded-2xl border theme-border bg-[var(--theme-bg)] relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold">DocStar AI Changelog</h3>
                </div>

                <div className="space-y-4">
                  {solutions.map((solution, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl theme-bg-secondary border theme-border">
                      <div className="flex-shrink-0 mt-0.5 text-[var(--theme-color)]">{solution.icon}</div>
                      <p className="opacity-70 text-sm leading-relaxed">{solution.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-border-color)]/20 to-transparent"></div>
          
          <div className="relative z-10 px-4 sm:px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                A Complete Update Engine
              </h2>
              <p className="text-base md:text-lg opacity-60 max-w-2xl mx-auto">
                Everything you need to maintain a beautiful, engaging timeline of your product's evolution.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {whyChoose.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                    <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 leading-tight">{item.title}</h3>
                    <p className="text-sm opacity-70 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Benefits Section */}
        <div className="py-16 md:py-24 px-4 sm:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              Features Built for Velocity
            </h2>
            <p className="text-base md:text-lg opacity-60 leading-relaxed">
              Designed to help you ship faster and communicate better
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                  <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 leading-tight">{benefit.title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How It Works - Horizontal Flow */}
        <div className="py-16 md:py-24 theme-bg-secondary px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              How the Automation Works
            </h2>
            <p className="text-base md:text-lg opacity-60 max-w-2xl mx-auto">
              A frictionless flow from editing docs to publishing updates
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                num: "01",
                title: "Edit Content",
                desc: "Update your documentation pages as you normally would.",
                icon: <FileText className="w-6 h-6" />,
              },
              {
                num: "02",
                title: "AI Drafts Notes",
                desc: "DocStar detects the changes and generates a drafted release note.",
                icon: <Sparkles className="w-6 h-6" />,
              },
              {
                num: "03",
                title: "Review & Publish",
                desc: "Approve the draft in your dashboard to push it live to your audience.",
                icon: <CheckCircle className="w-6 h-6" />,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="h-full p-8 rounded-2xl border theme-border bg-[var(--theme-bg)] relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm text-center">
                  <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="text-xs font-mono opacity-40 mb-3">{step.num}</div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="opacity-70 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <CTASection
          title="Ready to Keep Your Users in the Loop?"
          description="Launch your integrated changelog today. Let AI handle the heavy lifting while you focus on building and documenting great products."
          buttonText="Create Your Changelog"
        />
      </div>
    </>
  );
};
