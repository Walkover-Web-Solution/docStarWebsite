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
    <main className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="container mx-auto py-20 md:py-32 px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-sm font-medium text-[var(--theme-color)] mb-4 block">
            Real-Time Collaboration
          </span>
        </motion.div>

        <motion.h1
          className="h1 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-gradient">Collaborate</span> in Real Time
        </motion.h1>

        <motion.p
          className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed opacity-70"
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
        className="theme-bg-secondary py-20 md:py-32"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded border theme-border text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded theme-bg"></span>
                The Impact
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-5xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Why Real-Time Collaboration Matters
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-70"
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

        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-4">
            {whyMatters.map((point, index) => (
              <motion.article
                key={index}
                className="relative p-6 rounded border theme-border bg-[var(--theme-bg)] hover:border-[var(--theme-color)] transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-[var(--theme-color)]" />
                  </div>
                  <p className="text-base leading-relaxed opacity-80 flex-1">
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
        className="container mx-auto py-20 md:py-32 px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded theme-bg-secondary text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded theme-bg"></span>
            Features
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-5xl mb-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Key Features of Real-Time Collaboration
        </motion.h2>

        <div className="space-y-6">
          {features.map((feature, index) => (
            <article
              key={index}
              className="group p-6 md:p-8 rounded theme-bg-secondary border-l-4 border-l-transparent hover:border-l-[var(--theme-color)] transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed opacity-70">
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
        className="container mx-auto py-20 md:py-32 px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded theme-bg-secondary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded theme-bg"></span>
              Benefits
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Benefits for Your Team
          </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {benefits.map((benefit, index) => (
            <article
              key={index}
              className="group p-6 rounded theme-bg-secondary hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded bg-opacity-10 flex items-center justify-center border theme-border mb-5 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-lg mb-2">{benefit.title}</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="relative py-20 md:py-32 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-color)] to-transparent opacity-5"></div>
        <div className="container mx-auto px-6 relative max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded theme-bg-secondary border theme-border mb-8">
              <Sparkles className="w-4 h-4 text-[var(--theme-color)]" />
              <span className="text-sm font-semibold">
                Ready to Get Started?
              </span>
            </div>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl mb-6 text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Transform Collaboration into Productivity
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl mb-10 leading-relaxed opacity-70"
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
    </main>
  );
};

export default CollaborateContent;
