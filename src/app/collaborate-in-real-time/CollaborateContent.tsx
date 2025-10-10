"use client"

import MotionWrapper from "@/components/motion/MotionDivWrapper"
import { motion } from "framer-motion"
import { Users, MessageSquare, GitBranch, Shield, Space as Workspace, Edit3, Clock, CheckCircle } from "lucide-react"

const CollaborateContent = () => {
  const features = [
    {
      icon: <Edit3 className="w-6 h-6" />,
      title: "Simultaneous Editing",
      description:
        "Multiple contributors can edit the same document at once. Changes appear instantly, allowing teams to co-create without duplicating efforts or waiting for updates.",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "In-Context Comments and Suggestions",
      description:
        "Leave feedback directly on the relevant section of a document. Comments, notes, and suggestions remain tied to the content, so nothing gets lost in chat threads or emails.",
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: "Version Control and History",
      description:
        "Stay confident with automatic version tracking. Easily review previous edits, compare changes, and restore earlier versions if needed.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Role-Based Permissions",
      description:
        "Control who can view, edit, or comment on documents. Assign roles to team members for secure and structured collaboration across projects.",
    },
    {
      icon: <Workspace className="w-6 h-6" />,
      title: "Seamless Workspace Collaboration",
      description:
        "Whether you're documenting APIs, building a knowledge base, or publishing blogs, your team can collaborate in a single shared workspace designed for efficiency.",
    },
  ]

  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Faster Documentation Cycles",
      description: "Reduce back-and-forth and ship polished docs sooner.",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Improved Accuracy",
      description: "Catch mistakes early with multiple eyes reviewing content in real time.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Stronger Team Alignment",
      description: "Keep everyone on the same page, literally and figuratively.",
    },
    {
      icon: <Edit3 className="w-6 h-6" />,
      title: "Streamlined Workflows",
      description: "No need for external editing tools or endless email chains.",
    },
  ]

  const whyMatters = [
    "Every contributor works on the most up-to-date version.",
    "Feedback is captured instantly within the document.",
    "Multiple team members can edit or suggest improvements simultaneously.",
    "Content creation and review cycles are drastically shortened.",
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <MotionWrapper
        className="py-20 relative overflow-hidden bg-gradient-to-tr from-rose-100 to-pink-500 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <MotionWrapper
            className="text-5xl md:text-7xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-black/70">
              Collaborate
            </span>{" "}
            in Real Time
          </MotionWrapper>

          <MotionWrapper
            className="text-xl md:text-2xl mb-12 text-purple-100 max-w-4xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your
            entire team can contribute, edit, and refine documentation together—no delays, no version conflicts, and no
            scattered feedback.
          </MotionWrapper>

          <MotionWrapper
            as="button"
            className="text-lg rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm border border border-white/40 font-semibold px-6 py-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>{window.open('https://app.docstar.io/login')}}
          >
            Start Collaborating Today
          </MotionWrapper>
        </div>
      </MotionWrapper>

      {/* Why Real-Time Collaboration Matters Section */}
      <MotionWrapper
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900" variants={itemVariants}>
            Why Real-Time Collaboration Matters
          </MotionWrapper>

          <MotionWrapper className="text-xl text-center mb-16 text-gray-700 max-w-4xl mx-auto" variants={itemVariants}>
            In fast-moving teams, documentation needs to keep up with product changes, customer requirements, and
            developer workflows. Real-time collaboration ensures that:
          </MotionWrapper>

          <div className="grid md:grid-cols-2 gap-8">
            {whyMatters.map((point, index) => (
              <MotionWrapper
                key={index}
                className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100"
                variants={itemVariants}
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-700 text-lg">{point}</p>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </MotionWrapper>

      {/* Key Features Section */}
      <MotionWrapper
        className="py-20 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Key Features of Real-Time Collaboration
          </MotionWrapper>

          <div className="space-y-8">
            {features.map((feature, index) => (
              <MotionWrapper
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-300 to-pink-200 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </MotionWrapper>

      {/* Benefits Section */}
      <MotionWrapper
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <MotionWrapper className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900" variants={itemVariants}>
            Benefits for Your Team
          </MotionWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <MotionWrapper
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="rounded-xl flex items-center justify-center mb-4 text-black/70">
                  {benefit.icon}
                </div>
                <h3 className="text-normal font-semibold mb-3 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </MotionWrapper>

      {/* Final CTA Section */}
      <MotionWrapper
        className="py-20 bg-rose-100 text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-6 text-black/70">
          <MotionWrapper
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform Collaboration into Productivity
          </MotionWrapper>

          <MotionWrapper
            className="text-xl mb-8 max-w-3xl mx-auto text-black/50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            With DocStar, documentation becomes a collaborative experience rather than a solo task. Empower your teams
            to create, edit, and publish in real time, ensuring your documentation is always accurate, up-to-date, and
            ready for your audience.
          </MotionWrapper>

          <MotionWrapper
            as="button"
            className="bg-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-black/70 hover:text-white transition-colors duration-300 shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>{window.open('https://app.docstar.io/login')}}
          >
            Start Collaborating Today
          </MotionWrapper>
        </div>
      </MotionWrapper>
    </div>
  )
}

export default CollaborateContent
