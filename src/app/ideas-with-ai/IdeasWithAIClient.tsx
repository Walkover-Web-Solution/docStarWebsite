"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Users,
  BarChart3,
  Palette,
  FolderOpen,
  MousePointer,
  Globe,
  Brain,
  Sparkles,
  Target,
  CheckCircle,
  ArrowRight,
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

export const IdeasWithAIClient = () => {
  const whyChooseFeatures = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Accelerated Workflows",
      description:
        "Move from scattered notes to polished documentation in record time.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Clarity and Structure",
      description:
        "Automatically organize content into sections, pages, and subpages that make sense.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Enhanced Collaboration",
      description:
        "Share well-formatted documents across teams with consistent style and structure.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Scalability for Teams",
      description:
        "Manage multiple projects and workspaces without losing control or organization.",
    },
  ];

  const keyFeatures = [
    {
      icon: <FolderOpen className="w-6 h-6" />,
      title: "Organize Your Documentation with Ease",
      description:
        "Easily create collections to categorize your content. Break down information into structured pages and subpages, so your readers can find what they need without friction.",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Quick and Flexible Formatting",
      description:
        "Take advantage of customizable fonts, styles, Markdown, callouts, quotes, and embedded media to make your documentation both clear and visually appealing.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Manage Multiple Workspaces",
      description:
        "Set up dedicated workspaces for different teams or projects, with fine-grained control over user access, collaboration, and permissions.",
    },
    {
      icon: <MousePointer className="w-6 h-6" />,
      title: "Drag-and-Drop Organization",
      description:
        "Reorganize your documentation effortlessly. With drag-and-drop functionality, you can maintain a clear hierarchy of pages and subpages in seconds.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Instant Document Publishing",
      description:
        "Publishing is straightforward—make entire collections and all their documents accessible to your team or customers with a single click.",
    },
  ];

  const aiFeatures = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Idea-to-Document Conversion",
      description:
        "Start with notes, brainstorming outputs, or outlines, and let AI turn them into structured documents automatically.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Smart Formatting Suggestions",
      description:
        "Receive AI-driven recommendations on layout, headings, and styling for improved readability.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Consistency Across Content",
      description:
        "Ensure every document across your organization follows the same structure and visual style.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Seamless Human-AI Collaboration",
      description:
        "AI handles the heavy lifting, while your team fine-tunes the content for precision and tone.",
    },
  ];

  const benefits = [
    {
      title: "Faster documentation cycles",
      description: "Without sacrificing quality",
    },
    {
      title: "Consistently clear and easy-to-navigate documents",
      description: "For every audience",
    },
    {
      title: "Visual and structural polish",
      description: "Without relying on designers or manual formatting",
    },
    {
      title: "Scalable workspace management",
      description: "That supports teams of all sizes",
    },
    {
      title: "Quick publishing",
      description:
        "To make your documentation accessible when and where it's needed",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
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
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

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
                  AI-Powered Documentation
                </span>
              </div>

              <h1 className="h1 mb-6 leading-tight">
                Turn Your Ideas into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-bl from-[var(--theme-color)] to-indigo-500">
                  Documents Easily with AI.
                </span>
              </h1>

              <p className="text-base sm:text-lg opacity-70 mb-8 leading-relaxed max-w-xl">
                With DocStar's AI-powered documentation platform, you can transform raw ideas, notes, or outlines into professional documents in a matter of minutes.
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
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-indigo-500/20 rounded-2xl transform rotate-3 scale-105 blur-xl"></div>
              <TerminalWindow title="ai-prompt.txt" className="relative z-10 transform -rotate-2 hover:rotate-0 transition-all duration-500">
                <span className="text-gray-500"># AI Prompt Example</span>{"\n"}
                <span className="text-gray-300">Transform these notes into a structured doc:</span>{"\n\n"}
                <span className="text-gray-300">- Product launch checklist</span>{"\n"}
                <span className="text-gray-300">- User onboarding flow</span>{"\n"}
                <span className="text-gray-300">- API authentication guide</span>{"\n\n"}
                <span className="text-gray-500"># AI Response</span>{"\n"}
                <span className="text-green-400">✓ Document created with sections</span>{"\n"}
                <span className="text-green-400">✓ Formatting applied</span>{"\n"}
                <span className="text-green-400">✓ Ready to publish</span>
              </TerminalWindow>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 p-4 rounded-xl theme-bg-secondary border theme-border shadow-xl flex items-center gap-4 z-20 animate-bounce" style={{ animationDuration: '3s'}}>
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">AI</p>
                  <p className="text-sm font-medium opacity-80">Powered</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
      {/* Why Choose AI-Powered Documentation Section */}
      <div className="py-16 md:py-24 px-4 sm:px-6 relative">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
            Why Choose AI-Powered Documentation?
          </h2>
          <p className="text-base md:text-lg opacity-60 leading-relaxed">
            Accelerate your documentation workflow with intelligent automation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {whyChooseFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 leading-tight">{feature.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-border-color)]/20 to-transparent"></div>
        
        <div className="relative z-10 px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 mb-4">
              <FolderOpen className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              Key Features
            </h2>
            <p className="text-base md:text-lg opacity-60 max-w-2xl mx-auto">
              Powerful tools to organize and structure your documentation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                  <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 leading-tight">{feature.title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How DocStar's AI Works Section */}
      <div className="py-16 md:py-24 px-4 sm:px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
            How DocStar's AI Works for You
          </h2>
          <p className="text-base md:text-lg opacity-60 leading-relaxed">
            Intelligent automation that understands your content.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 leading-tight">{feature.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits Section - Premium Glowing Card */}
      <div className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)] to-indigo-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
          
          <div className="relative p-8 md:p-12 rounded-3xl bg-[var(--theme-bg)] border theme-border overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Brain className="w-48 h-48" />
            </div>
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center">
                <Brain className="w-6 h-6 text-[var(--theme-color)]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">Benefits for Your Organization</h3>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 relative z-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl theme-bg-secondary border theme-border hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 text-indigo-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium opacity-90 leading-relaxed">{benefit.title}</p>
                    <p className="text-xs opacity-60 mt-1 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CTASection
        title="Start Turning Ideas into Documents Today"
        description="With DocStar, you don't just write documents—you create a seamless knowledge experience. Transform ideas into actionable, structured documents with the power of AI."
      />
      </div>
    </>
  );
};
