"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import MotionWrapper from "@/components/motion/MotionDivWrapper"

// Simple icon components since we can't import Heroicons directly
const DocumentTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5-3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
    />
  </svg>
)

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
    />
  </svg>
)

const CursorArrowRaysIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
    />
  </svg>
)

const CodeBracketIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
    />
  </svg>
)

const BoltIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
    />
  </svg>
)

const EmbedEditorPageClient: React.FC = () => {
  const router = useRouter()
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const features = [
    {
      icon: BoltIcon,
      title: "One-Line Integration",
      description: "Add our script tag and you're ready to go. No complex setup, no lengthy configurations.",
    },
    {
      icon: DocumentTextIcon,
      title: "Google Docs Experience",
      description: "Rich text editing, real-time collaboration, and familiar shortcuts your users already know.",
    },
    {
      icon: SparklesIcon,
      title: "Seamless Embedding",
      description: "Feels native to your product. Customizable themes and styling to match your brand perfectly.",
    },
    {
      icon: CursorArrowRaysIcon,
      title: "Real-time Collaboration",
      description: "Multiple users can edit simultaneously with live cursors and instant synchronization.",
    },
  ]

  const steps = [
    { step: "1", title: "Copy the embed code", description: "Just one line of JavaScript" },
    { step: "2", title: "Paste into your app", description: "Add it anywhere in your product" },
    { step: "3", title: "Start editing", description: "Your users get Google Docs instantly" },
  ]

  const [isCollaborationHovered, setIsCollaborationHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [animatedText, setAnimatedText] = useState("Let's brainstorm ideas for our new product launch...")
  const [showComment, setShowComment] = useState(false)

  const collaborators = [
    { name: "Alex", color: "theme-badge", position: { x: 120, y: 80 } },
    { name: "Sarah", color: "theme-badge", position: { x: 280, y: 120 } },
    { name: "Mike", color: "theme-badge", position: { x: 200, y: 160 } },
  ]

  useEffect(() => {
    if (isCollaborationHovered) {
      const texts = [
        "Let's brainstorm ideas for our new product launch...",
        "What about a mobile-first approach?",
        "Great idea! We should also consider accessibility features.",
        "I'll add some mockups to visualize this better.",
      ]
      let textIndex = 0
      let charIndex = 0

      const typeText = () => {
        if (charIndex < texts[textIndex].length) {
          setAnimatedText(texts[textIndex].substring(0, charIndex + 1))
          charIndex++
          setTimeout(typeText, 50)
        } else {
          setTimeout(() => {
            textIndex = (textIndex + 1) % texts.length
            charIndex = 0
            setAnimatedText("")
            setTimeout(typeText, 500)
          }, 2000)
        }
      }

      const timer = setTimeout(typeText, 1000)
      const commentTimer = setTimeout(() => setShowComment(true), 3000)

      return () => {
        clearTimeout(timer)
        clearTimeout(commentTimer)
      }
    } else {
      setAnimatedText("Let's brainstorm ideas for our new product launch...")
      setShowComment(false)
    }
  }, [isCollaborationHovered])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const newX = Math.max(20, Math.min(rect.width - 120, e.clientX - rect.left))
    const newY = Math.max(20, Math.min(rect.height - 60, e.clientY - rect.top))

    setMousePosition({ x: newX, y: newY })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <MotionWrapper
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center max-w-4xl mx-auto"
        >
          <MotionWrapper
            variants={fadeInUp}
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8 theme-bg-secondary opacity-80"
          >
            <SparklesIcon className="h-4 w-4 mr-2" />
            Minimal Setup, Maximum Impact
          </MotionWrapper>

          <MotionWrapper variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Google Docs{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-600">Inside</span>{" "}
            Your Product
          </MotionWrapper>

          <MotionWrapper variants={fadeInUp} className="text-xl md:text-2xl mb-12 leading-relaxed opacity-80">
            Transform any text area into a powerful, collaborative editor with just{" "}
            <span className="font-semibold">one line of code</span>. Give your users the editing
            experience they love, without the complexity.
          </MotionWrapper>

          <MotionWrapper variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MotionWrapper
             as="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
              onClick={() => router.push("/editor")}
            >
              Try Live Demo
            </MotionWrapper>
            <MotionWrapper
              as="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline"
              onClick={() => window.open("https://app.docstar.io/p/embed-docstar-editor?collectionId=fLMgydvRdvN7", "_blank")}
            >
              View Documentation
            </MotionWrapper>
          </MotionWrapper>
        </MotionWrapper>
      </section>

      {/* Code Preview */}
      <MotionWrapper
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-6 py-16 max-w-4xl mx-auto"
      >
        <div className="rounded-2xl p-8 shadow-2xl theme-bg border">
          <div className="flex items-center mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full opacity-40" style={{ backgroundColor: 'var(--app-text)' }}></div>
              <div className="w-3 h-3 rounded-full opacity-40" style={{ backgroundColor: 'var(--app-text)' }}></div>
              <div className="w-3 h-3 rounded-full opacity-40" style={{ backgroundColor: 'var(--app-text)' }}></div>
            </div>
            <span className="ml-4 text-sm opacity-70">embed-editor.js</span>
          </div>
          <MotionWrapper
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-mono text-sm md:text-base overflow-x-auto opacity-90"
          >
            {`<script
  id="docstar-main-script"
  defaultOpen="true"
  page_id="your page id"
  embedToken="Enter Embed Token here"
  src="https://techdoc.walkover.in/scriptProd.js">
</script>`}
          </MotionWrapper>
        </div>
      </MotionWrapper>

      {/* Features Grid */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <MotionWrapper
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Everything You Need, Nothing You Don't</h2>
          <p className="text-xl max-w-3xl mx-auto opacity-80">
            Powerful editing capabilities that integrate seamlessly into your existing workflow
          </p>
        </MotionWrapper>

        <MotionWrapper
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <MotionWrapper
              key={index}
              variants={fadeInUp}
              className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow theme-bg border"
            >
              <feature.icon className="h-12 w-12 mb-6 opacity-80" />
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="leading-relaxed opacity-80">{feature.description}</p>
            </MotionWrapper>
          ))}
        </MotionWrapper>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 theme-bg-secondary">
        <div className="max-w-6xl mx-auto">
          <MotionWrapper
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Setup in Under 60 Seconds</h2>
            <p className="text-xl opacity-80">Seriously. It's that simple.</p>
          </MotionWrapper>

          <MotionWrapper
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {steps.map((step, index) => (
              <MotionWrapper key={index} variants={fadeInUp} className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 theme-badge">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="opacity-80">{step.description}</p>
              </MotionWrapper>
            ))}
          </MotionWrapper>
        </div>
      </section>

      {/* Collaboration Section */}
      <MotionWrapper
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        onMouseEnter={() => setIsCollaborationHovered(true)}
        onMouseLeave={() => setIsCollaborationHovered(false)}
        onMouseMove={handleMouseMove}
        className="px-6 py-20 theme-bg-secondary relative overflow-hidden"
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
            className="absolute pointer-events-none z-10 flex items-center space-x-2 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg theme-bg border"
            style={{ left: 0, top: 0 }}
          >
            <div className="w-3 h-3 rounded-full animate-pulse opacity-80" style={{ backgroundColor: 'var(--app-text)' }}></div>
            <span className="text-sm font-medium">You</span>
          </MotionWrapper>
        )}

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <MotionWrapper
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Mock Document */}
              <div className="rounded-lg shadow-xl p-6 relative overflow-hidden theme-bg border">
                {/* Document Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b opacity-20" style={{ borderColor: 'var(--app-border)' }}>
                  <div className="flex items-center space-x-2">
                    <DocumentTextIcon className="h-5 w-5 opacity-70" />
                    <span className="text-sm font-medium opacity-80">Product Strategy Doc</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {/* {collaborators.map((collaborator, index) => (
                      <MotionWrapper
                        key={collaborator.name}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className={`w-6 h-6 ${collaborator.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}
                      >
                        {collaborator.name[0]}
                      </MotionWrapper>
                    ))} */}
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
                          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                          className="inline-block w-0.5 h-5 ml-1 opacity-80" style={{ backgroundColor: 'var(--app-text)' }}
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
                        x: [collaborator.position.x, collaborator.position.x + 20, collaborator.position.x],
                        y: [collaborator.position.y, collaborator.position.y - 10, collaborator.position.y],
                      }}
                      transition={{
                        opacity: { delay: index * 0.3 },
                        scale: { delay: index * 0.3 },
                        x: { duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 },
                        y: { duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 },
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
                        <div className={`${collaborator.color} text-white px-2 py-1 rounded text-xs font-medium`}>
                          {collaborator.name}
                        </div>
                      </div>
                    </MotionWrapper>
                  ))}
              </div>
            </MotionWrapper>

            {/* Content */}
            <MotionWrapper
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <p className="text-xl mb-8 leading-relaxed opacity-80">
                Real-time collaboration that feels natural. See who's editing, share ideas instantly, and work together
                seamlessly.
              </p>
              <MotionWrapper
              as="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
                onClick={() => window.open("https://app.docstar.io/login", "_blank")}
              >
                Get started
              </MotionWrapper>
            </MotionWrapper>
          </div>
        </div>
      </MotionWrapper>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <CodeBracketIcon className="h-8 w-8 opacity-80" />
            <span className="text-xl font-bold">EmbedEditor</span>
          </div>
          <p className="opacity-70">Making rich text editing accessible to every product.</p>
        </div>
      </footer>
    </div>
  )
}

export default EmbedEditorPageClient
