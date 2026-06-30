"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FormattingTools from "./FormattingTools";
import MotionWrapper from "@/components/motion/MotionDivWrapper";
import {
  FileText,
  Sparkles,
  MousePointerClick,
  Code2,
  Zap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import CTASection from "@/components/CTASection";

const EmbedEditorPageClient: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: "One-Line Integration",
      description:
        "Add our script tag and you're ready to go. No complex setup, no lengthy configurations.",
    },
    {
      icon: FileText,
      title: "Google Docs Experience",
      description:
        "Rich text editing, real-time collaboration, and familiar shortcuts your users already know.",
    },
    {
      icon: Sparkles,
      title: "Seamless Embedding",
      description:
        "Feels native to your product. Customizable themes and styling to match your brand perfectly.",
    },
    {
      icon: MousePointerClick,
      title: "Real-time Collaboration",
      description:
        "Multiple users can edit simultaneously with live cursors and instant synchronization.",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Copy the embed code",
      description: "Just one line of JavaScript",
    },
    {
      step: "2",
      title: "Paste into your app",
      description: "Add it anywhere in your product",
    },
    {
      step: "3",
      title: "Start editing",
      description: "Your users get Google Docs instantly",
    },
  ];

  const [isCollaborationHovered, setIsCollaborationHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animatedText, setAnimatedText] = useState(
    "Let's brainstorm ideas for our new product launch...",
  );
  const [showComment, setShowComment] = useState(false);

  const collaborators = [
    { name: "Alex", color: "theme-badge", position: { x: 120, y: 80 } },
    { name: "Sarah", color: "theme-badge", position: { x: 280, y: 120 } },
    { name: "Mike", color: "theme-badge", position: { x: 200, y: 160 } },
  ];

  useEffect(() => {
    if (isCollaborationHovered) {
      const texts = [
        "Let's brainstorm ideas for our new product launch...",
        "What about a mobile-first approach?",
        "Great idea! We should also consider accessibility features.",
        "I'll add some mockups to visualize this better.",
      ];
      let textIndex = 0;
      let charIndex = 0;

      const typeText = () => {
        if (charIndex < texts[textIndex].length) {
          setAnimatedText(texts[textIndex].substring(0, charIndex + 1));
          charIndex++;
          setTimeout(typeText, 50);
        } else {
          setTimeout(() => {
            textIndex = (textIndex + 1) % texts.length;
            charIndex = 0;
            setAnimatedText("");
            setTimeout(typeText, 500);
          }, 2000);
        }
      };

      const timer = setTimeout(typeText, 1000);
      const commentTimer = setTimeout(() => setShowComment(true), 3000);

      return () => {
        clearTimeout(timer);
        clearTimeout(commentTimer);
      };
    } else {
      setAnimatedText("Let's brainstorm ideas for our new product launch...");
      setShowComment(false);
    }
  }, [isCollaborationHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = Math.max(
      20,
      Math.min(rect.width - 120, e.clientX - rect.left),
    );
    const newY = Math.max(20, Math.min(rect.height - 60, e.clientY - rect.top));

    setMousePosition({ x: newX, y: newY });
  };

  return (
    <div className="w-full">
      {/* Hero Section with Floating Code Preview */}
      <div className="relative min-h-[75vh] flex items-center border-b theme-border overflow-hidden">
        <div className="absolute inset-0 theme-bg-secondary">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] to-transparent"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[var(--theme-color)]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center pt-20 pb-16">
            {/* Left: Hero Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border theme-border mb-6 bg-[var(--theme-bg)] shadow-sm backdrop-blur-md">
                <Zap className="w-4 h-4 text-[var(--theme-color)]" />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  Minimal Setup, Maximum Impact
                </span>
              </div>

              <h1 className="h1 mb-6 leading-tight">
                Google Docs <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-bl from-[var(--theme-color)] to-violet-500">
                  Inside Your Product.
                </span>
              </h1>

              <p className="text-base sm:text-lg opacity-70 mb-8 leading-relaxed max-w-xl">
                Transform any text area into a powerful, collaborative editor with just <span className="font-semibold">one line of code</span>. Give your users the editing experience they love, without the complexity.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://app.docstar.io/p/embed-docstar-editor?collectionId=fLMgydvRdvN7"
                  target="_blank"
                  className="btn btn-primary shadow-lg shadow-[var(--theme-color)]/20"
                >
                  View Documentation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.div>

            {/* Right: Code Preview */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-violet-500/20 rounded-2xl transform rotate-3 scale-105 blur-xl"></div>
              <div className="rounded-xl border theme-border theme-bg-secondary p-4 md:p-6 relative z-10 transform -rotate-2 hover:rotate-0 transition-all duration-500">
                <div className="flex items-center mb-3 pb-2 border-b theme-border">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <span className="ml-3 text-xs font-mono opacity-70">
                    embed-editor.js
                  </span>
                </div>
                <pre className="font-mono text-xs overflow-x-auto opacity-90 leading-relaxed">
                  {`<script
  id="docstar-main-script"
  defaultOpen="true"
  page_id="your page id"
  embedToken="Enter Embed Token here"
  src="https://techdoc.walkover.in/scriptProd.js">
</script>`}
                </pre>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 p-4 rounded-xl theme-bg-secondary border theme-border shadow-xl flex items-center gap-4 z-20 animate-bounce" style={{ animationDuration: '3s'}}>
                <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-violet-500" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Setup</p>
                  <p className="text-sm font-medium opacity-80">One Line</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <FormattingTools />

      {/* Features Grid */}
      <div className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-500 mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              Everything You Need, Nothing You Don't
            </h2>
            <p className="text-base md:text-lg opacity-60 max-w-2xl mx-auto">
              Powerful editing capabilities that integrate seamlessly into your existing workflow
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-violet-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="h-full p-6 md:p-8 rounded-2xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                  <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 leading-tight">{feature.title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 md:py-24 theme-bg-secondary px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              Setup in Under 60 Seconds
            </h2>
            <p className="text-base md:text-lg opacity-60">
              Seriously. It's that simple.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-violet-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="h-full p-8 rounded-2xl border theme-border bg-[var(--theme-bg)] relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm text-center">
                  <div className="w-14 h-14 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 text-xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="opacity-70 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Collaboration Section */}
      <div
        onMouseEnter={() => setIsCollaborationHovered(true)}
        onMouseLeave={() => setIsCollaborationHovered(false)}
        onMouseMove={handleMouseMove}
        className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          {/* Your cursor indicator */}
          {isCollaborationHovered && (
            <MotionWrapper
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: mousePosition.x,
                y: mousePosition.y,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
                x: { type: "spring", stiffness: 150, damping: 30 },
                y: { type: "spring", stiffness: 150, damping: 30 },
              }}
              className="absolute pointer-events-none z-10 flex items-center space-x-2 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border"
              style={{ left: 0, top: 0 }}
            >
              <div className="w-3 h-3 rounded-full theme-bg animate-pulse opacity-80"></div>
              <span className="text-sm font-medium">You</span>
            </MotionWrapper>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              {/* Mock Document */}
              <div className="rounded-2xl border theme-border p-6 md:p-8 relative overflow-hidden min-h-[300px]">
                {/* Document Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b theme-border opacity-30">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      Product Strategy Doc
                    </span>
                  </div>
                </div>

                {/* Document Content */}
                <div className="space-y-3">
                  <h3 className="text-base font-semibold">Q1 Planning Session</h3>
                  <div className="relative">
                    <p className="leading-relaxed text-sm min-h-[80px] opacity-90">
                      {animatedText}
                      {isCollaborationHovered && (
                        <MotionWrapper
                          animate={{ opacity: [1, 0] }}
                          transition={{
                            duration: 0.8,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                          className="inline-block w-0.5 h-5 ml-1 theme-bg opacity-80"
                        />
                      )}
                    </p>
                  </div>
                </div>

                {/* Animated Collaborator Cursors */}
                {isCollaborationHovered &&
                  collaborators.map((collaborator, index) => (
                    <MotionWrapper
                      key={collaborator.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: [
                          collaborator.position.x,
                          collaborator.position.x + 20,
                          collaborator.position.x,
                        ],
                        y: [
                          collaborator.position.y,
                          collaborator.position.y - 10,
                          collaborator.position.y,
                        ],
                      }}
                      transition={{
                        opacity: { delay: index * 0.3 },
                        scale: { delay: index * 0.3 },
                        x: {
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.5,
                        },
                        y: {
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.5,
                        },
                      }}
                      className="absolute pointer-events-none"
                      style={{ left: 0, top: 0 }}
                    >
                      <div className="flex items-center space-x-2 pointer-events-none">
                        <svg
                          width="12"
                          height="16"
                          viewBox="0 0 12 16"
                          className={`${collaborator.color.replace("bg-", "text-")}`}
                        >
                          <path fill="currentColor" d="M0 0l12 8-4 1-2 7z" />
                        </svg>
                        <div
                          className={`${collaborator.color} text-white px-2 py-1 rounded-md text-xs font-medium`}
                        >
                          {collaborator.name}
                        </div>
                      </div>
                    </MotionWrapper>
                  ))}
              </div>
            </div>

            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-500 mb-6">
                <MousePointerClick className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                Real-time Collaboration
              </h2>
              <p className="text-base md:text-lg mb-8 leading-relaxed opacity-70">
                Real-time collaboration that feels natural. See who's editing, share ideas instantly, and work together seamlessly.
              </p>
              <button
                className="btn btn-primary shadow-lg shadow-[var(--theme-color)]/20"
                onClick={() =>
                  window.open("https://app.docstar.io/login", "_blank")
                }
              >
                Get started
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <CTASection
        title="Ready to Embed Rich Text Editing?"
        description="Making rich text editing accessible to every product. Get started in under 60 seconds."
        buttonText="Get Started"
      />
    </div>
  );
};

export default EmbedEditorPageClient;
