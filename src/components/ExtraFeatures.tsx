"use client"

import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { PenTool, Code, Zap, Globe, Database, Share2, Shield, Layout, Search, Settings, ArrowRight } from "lucide-react";

const features = [
  {
    icon: PenTool,
    title: "Turn Your Ideas into Documents Easily with AI",
    description:
      "Transform your raw thoughts into polished, well-structured documents—fast and accurately—with AI. Be your own writer, whether you're creating content for your product or for yourself.",
    path: "/documentation-with-ai",
  },
  {
    icon: Code,
    title: "Create API Documentation Easily",
    description:
      "Use DocStar's API documentation tool to generate beautiful, machine-readable documentation for your API, keep it up to date, and easily test your API—all in one place.",
    path: "/api-documentation",
  },
  {
    icon: Zap,
    title: "Publish Engaging Blogs to Grow Your Presence",
    description:
      "With DocStar's Blog View you can seamlessly format, organize, and share your content—making it engaging and accessible for your audience every time.",
    path: "/blogging",
  },
  {
    icon: Database,
    title: "Centralized Knowledge Base",
    description:
      "Unify scattered information into one searchable hub where your team and customers can access knowledge instantly.",
    path: "/knowledge-base",
  },
  {
    icon: Share2,
    title: "Collaborate in Real Time",
    description:
      "Work together with your team seamlessly—edit, review, and publish content simultaneously without conflicts.",
    path: "/editor",
  },
  {
    icon: Shield,
    title: "Secure & Reliable Documentation",
    description:
      "Keep your data safe with enterprise-grade security, backups, and access control for peace of mind.",
    path: "/security",
  },
  // {
  //   icon: Layout,
  //   title: "Customizable Layouts & Themes",
  //   description:
  //     "Match your brand with beautiful templates, themes, and layouts—no design skills required.",
  //   path: "/customization",
  // },
  {
    icon: Search,
    title: "AI-Powered Search",
    description:
      "Help your users find answers instantly with intelligent, fast, and context-aware search across all your docs.",
    path: "/search",
  },
  {
    icon: Settings,
    title: "Integrate with Your Tools",
    description:
      "Connect seamlessly with tools like Slack, GitHub, and Notion to keep your workflow smooth and automated.",
    path: "/integrations",
  },
];


export default function FeatureCards() {
  const router = useNavigate()

  return (
    <section className="bg-red-50 py-20">
      <div className="flex items-center justify-center">
        <h2 className="text-4xl font-semibold leading-tight text-slate-900 md:text-4xl bg-rose-100 p-4 rounded-xl">Replace Notion, readme, by one App.</h2>
</div>
    {/* <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto py-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-gray-400 text-left cursor-pointer"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
          onClick={() => router(feature.path)}
        >
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            {feature.title}
          </h3>
          <button className="inline-flex items-center text-rose-300 hover:text-indigo-800 font-semibold transition-colors duration-200">
            Learn more
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </motion.div>
      ))}
    </motion.div> */}

<motion.div
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto py-20"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.3 }}
>
  {features.map((feature, index) => (
    <motion.div
      key={index}
      className="bg-white/45 rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-gray-400 text-left cursor-pointer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onClick={() => router(feature.path)}
    >
      
      <h3 className="text-xl font-semibold text-slate-900 mb-4">
        {feature.title}
      </h3>
      
      <button className="inline-flex items-center text-rose-300 hover:text-indigo-800 font-semibold transition-colors duration-200">
        Learn more
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </motion.div>
  ))}
</motion.div>

    </section>
  )
}
