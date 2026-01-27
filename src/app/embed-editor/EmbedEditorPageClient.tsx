"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MotionWrapper from "@/components/motion/MotionDivWrapper";
import {
  FileText,
  Sparkles,
  MousePointerClick,
  Code2,
  Zap,
} from "lucide-react";

const EmbedEditorPageClient: React.FC = () => {
  const router = useRouter();
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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
    <div className="min-h-screen">
      {/* Hero Section with Floating Code Preview */}
      <section className="relative px-6 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 theme-bg-secondary"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-black/5 dark:bg-white/5"></div>
        
        <div className="container mx-auto relative">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left: Hero Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border theme-border mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wider opacity-70">
                  Minimal Setup, Maximum Impact
                </span>
              </div>

              <h1 className="h1 mb-2">
                Google Docs{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-600">
                  Inside
                </span>{" "}
                Your Product
              </h1>

              <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-70 max-w-2xl">
                Transform any text area into a powerful, collaborative editor with
                just <span className="font-semibold">one line of code</span>. Give
                your users the editing experience they love, without the complexity.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="btn btn-primary"
                  onClick={() => router.push("/editor")}
                >
                  Try Live Demo
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() =>
                    window.open(
                      "https://app.docstar.io/p/embed-docstar-editor?collectionId=fLMgydvRdvN7",
                      "_blank",
                    )
                  }
                >
                  View Documentation
                </button>
              </div>
            </div>

            {/* Right: Code Preview */}
            <div className="lg:col-span-5">
              <div className="rounded border theme-border theme-bg-secondary p-6">
                <div className="flex items-center mb-4 pb-3 border-b theme-border">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-600"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-600"></div>
                  </div>
                  <span className="ml-3 text-xs font-medium opacity-70">
                    embed-editor.js
                  </span>
                </div>
                <pre className="font-mono text-xs md:text-sm overflow-x-auto opacity-90">
                  {`<script
  id="docstar-main-script"
  defaultOpen="true"
  page_id="your page id"
  embedToken="Enter Embed Token here"
  src="https://techdoc.walkover.in/scriptProd.js">
</script>`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need, Nothing You Don't
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-70">
            Powerful editing capabilities that integrate seamlessly into your
            existing workflow
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded border theme-border"
            >
              <feature.icon className="h-12 w-12 mb-6 opacity-70" />
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                {feature.title}
              </h3>
              <p className="leading-relaxed opacity-70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 theme-bg-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Setup in Under 60 Seconds
            </h2>
            <p className="text-lg md:text-xl opacity-70">
              Seriously. It's that simple.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 container mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full border-2 theme-border flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="opacity-70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section
        onMouseEnter={() => setIsCollaborationHovered(true)}
        onMouseLeave={() => setIsCollaborationHovered(false)}
        onMouseMove={handleMouseMove}
        className="px-6 py-20 relative overflow-hidden"
      >
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

        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {/* Mock Document */}
              <div className="rounded border theme-border p-6 relative overflow-hidden">
                {/* Document Header */}
                <div
                  className="flex items-center justify-between mb-4 pb-3 border-b opacity-20 theme-border"
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      Product Strategy Doc
                    </span>
                  </div>
                </div>

                {/* Document Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Q1 Planning Session</h3>
                  <div className="relative">
                    <p className="leading-relaxed min-h-[60px] opacity-90">
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
                          className={`${collaborator.color} text-white px-2 py-1 rounded text-xs font-medium`}
                        >
                          {collaborator.name}
                        </div>
                      </div>
                    </MotionWrapper>
                  ))}
              </div>
            </div>

            {/* Content */}
            <div className="real-time-collaboration">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Real-time Collaboration
              </h2>
              <p className="text-lg md:text-xl mb-2 leading-relaxed opacity-70">
                Real-time collaboration that feels natural. See who's editing,
                share ideas instantly, and work together seamlessly.
              </p>
              <button
                className="btn btn-primary"
                onClick={() =>
                  window.open("https://app.docstar.io/login", "_blank")
                }
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t theme-border">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code2 className="h-8 w-8 opacity-80" />
            <span className="text-xl font-bold">EmbedEditor</span>
          </div>
          <p className="opacity-70">
            Making rich text editing accessible to every product.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EmbedEditorPageClient;
