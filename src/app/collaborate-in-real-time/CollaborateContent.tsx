"use client";

import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  GitBranch,
  Shield,
  Space as Workspace,
  Edit3,
  Clock,
  CheckCircle,
  Sparkles,
} from "lucide-react";

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
  ];

  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Faster Documentation Cycles",
      description: "Reduce back-and-forth and ship polished docs sooner.",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Improved Accuracy",
      description:
        "Catch mistakes early with multiple eyes reviewing content in real time.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Stronger Team Alignment",
      description:
        "Keep everyone on the same page, literally and figuratively.",
    },
    {
      icon: <Edit3 className="w-6 h-6" />,
      title: "Streamlined Workflows",
      description:
        "No need for external editing tools or endless email chains.",
    },
  ];

  const whyMatters = [
    "Every contributor works on the most up-to-date version.",
    "Feedback is captured instantly within the document.",
    "Multiple team members can edit or suggest improvements simultaneously.",
    "Content creation and review cycles are drastically shortened.",
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
    <div className="container mx-auto">
      {/* Hero Section */}
      <motion.section
        className="py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.span
          className="text-xs mt-20 font-medium text-[var(--theme-color)] mb-4 block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Real-Time Collaboration
        </motion.span>

        <motion.h1
          className="h1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-gradient">Collaborate</span> in Real Time
        </motion.h1>

        <motion.p
          className="text-sm md:text-base mb-6 max-w-3xl mx-auto leading-snug opacity-70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Your entire team can contribute, edit, and refine documentation
          together—no delays, no version conflicts, and no scattered feedback.
        </motion.p>

        <button
          className="btn btn-primary mx-auto"
          onClick={() => {
            window.open("https://app.docstar.io/login");
          }}
        >
          Start Collaborating Today
        </button>
      </motion.section>

      {/* Why Real-Time Collaboration Matters Section */}
      <motion.section
        className="theme-bg-secondary py-8 sm:py-10 md:py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="px-6 text-center mb-10">
          <motion.span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md border theme-border text-xs font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="w-2 h-2 rounded-md theme-bg"></span>
            The Impact
          </motion.span>

          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Why Real-Time Collaboration Matters
          </motion.h2>

          <motion.p
            className="text-sm md:text-base max-w-3xl mx-auto leading-snug opacity-70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            In fast-moving teams, documentation needs to keep up with product
            changes, customer requirements, and developer workflows. Real-time
            collaboration ensures that:
          </motion.p>
        </div>

        <div className="px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-4.5 md:gap-5">
            {whyMatters.map((point, index) => (
              <motion.article
                key={index}
                className="relative p-5 md:p-6 rounded-md border theme-border bg-[var(--theme-bg)] hover:border-[var(--theme-color)] transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-[var(--theme-color)]" />
                  </div>
                  <p className="text-sm leading-snug opacity-80 flex-1">
                    {point}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Key Features Section */}
      <motion.section
        className="py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.span
          className="inline-flex items-center gap-2 px-3 py-1 rounded-md theme-bg-secondary text-xs font-medium mb-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="w-2 h-2 rounded-md theme-bg"></span>
          Features
        </motion.span>

        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl font-medium mb-6 leading-tight"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Key Features of Real-Time Collaboration
        </motion.h2>

        <div className="space-y-4 md:space-y-5">
          {features.map((feature, index) => (
            <article
              key={index}
              className="group p-5 md:p-6 rounded-md theme-bg-secondary border-l-4 border-l-transparent hover:border-l-[var(--theme-color)] transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-md bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-snug opacity-70">
                    {feature.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        className="py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.span
          className="inline-flex items-center gap-2 px-3 py-1 rounded-md theme-bg-secondary text-xs font-medium mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="w-2 h-2 rounded-md theme-bg"></span>
          Benefits
        </motion.span>

        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl font-medium leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Benefits for Your Team
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-6">
          {benefits.map((benefit, index) => (
            <article
              key={index}
              className="group p-5 md:p-6 rounded-md theme-bg-secondary hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-md bg-opacity-10 flex items-center justify-center border theme-border mb-4 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-base font-medium mb-1.5 leading-tight">
                {benefit.title}
              </h3>
              <p className="text-sm opacity-70 leading-snug">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="relative py-12 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-color)] to-transparent opacity-5"></div>
        <div className="px-6 relative max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md theme-bg-secondary border theme-border mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Sparkles className="w-4 h-4 text-[var(--theme-color)]" />
            <span className="text-xs font-semibold">Ready to Get Started?</span>
          </motion.div>

          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 text-balance leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Transform Collaboration into Productivity
          </motion.h2>

          <motion.p
            className="text-sm md:text-base mb-6 leading-snug opacity-70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            With DocStar, documentation becomes a collaborative experience
            rather than a solo task. Empower your teams to create, edit, and
            publish in real time, ensuring your documentation is always
            accurate, up-to-date, and ready for your audience.
          </motion.p>

          <button
            className="btn btn-primary mx-auto"
            onClick={() => {
              window.open("https://app.docstar.io/login");
            }}
          >
            Start Collaborating Today
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default CollaborateContent;
