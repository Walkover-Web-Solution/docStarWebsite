"use client"

import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { PenTool, Code, Zap, Globe, Database, Share2, Shield, Layout, Search, Settings, ArrowRight } from "lucide-react";

// const features = [
//   {
//     icon: PenTool,
//     title: "Turn Your Ideas into Documents Easily with AI",
//     description:
//       "Transform your raw thoughts into polished, well-structured documents—fast and accurately—with AI. Be your own writer, whether you're creating content for your product or for yourself.",
//     path: "/documentation-with-ai",
//   },
//   {
//     icon: Code,
//     title: "Create API Documentation Easily",
//     description:
//       "Use DocStar's API documentation tool to generate beautiful, machine-readable documentation for your API, keep it up to date, and easily test your API—all in one place.",
//     path: "/api-documentation",
//   },
//   {
//     icon: Zap,
//     title: "Publish Engaging Blogs to Grow Your Presence",
//     description:
//       "With DocStar's Blog View you can seamlessly format, organize, and share your content—making it engaging and accessible for your audience every time.",
//     path: "/blogging",
//   },
//   {
//     icon: Database,
//     title: "Centralized Knowledge Base",
//     description:
//       "Unify scattered information into one searchable hub where your team and customers can access knowledge instantly.",
//     path: "/knowledge-base",
//   },
//   {
//     icon: Share2,
//     title: "Collaborate in Real Time",
//     description:
//       "Work together with your team seamlessly—edit, review, and publish content simultaneously without conflicts.",
//     path: "/editor",
//   },
//   // {
//   //   icon: Layout,
//   //   title: "Customizable Layouts & Themes",
//   //   description:
//   //     "Match your brand with beautiful templates, themes, and layouts—no design skills required.",
//   //   path: "/customization",
//   // },
//   {
//     icon: Search,
//     title: "AI-Powered Search",
//     description:
//       "Help your users find answers instantly with intelligent, fast, and context-aware search across all your docs.",
//     path: "/search",
//   },
// ];

type FeatureItem = {
  id: number
  text: string
  image: { src: string; alt: string }
  link: string
  description : string
}
const features : FeatureItem[]= [
  {
    id: 1,
    text: "SSO Authentication",
    image: {
      src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/3nuyRKlog-IP/89fbb090-74db-4221-bcc4-02b8197d2592_ChatGPT Image Sep 3, 2025, 03_32_07 PM_compressed.png",
      alt: "Automated reminders dashboard",
    },
    link: "/sso-authentication",
    description:"SSO Authentication (Single Sign-On) allows users to securely access multiple applications and services with a single set of login credentials.",
  },
  {
    id: 2,
    text: "Custom Domain",
    image: {
      src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/3nuyRKlog-IP/a184d852-4271-4a48-bd0e-9cc9cc1213a1_ChatGPT%20Image%20Sep%203,%202025,%2003_36_00%20PM_compressed.png",
      alt: "Knowledge base with tags",
    },
    link: "/custom-domain",
    description:"Custom Domain lets you use your own branded domain instead of a default URL, giving your workspace a professional and personalized identity.",
    
  },
  {
    id: 3,
    text: "Hassle-Free Editor Integration",
    image: {
      src: "https://storage.googleapis.com/techdoc.walkover.in/JnRXY3eKEu4Y/3nuyRKlog-IP/c88036a6-4b09-439d-8fe4-41bb81e3645c_ChatGPT Image Sep 3, 2025, 03_38_51 PM_compressed.png",
      alt: "AI suggestions panel",
    },
    link: "/embed-editor",
    description:"Hassle-Free Editor Integration lets you quickly add a powerful, customizable editor without complicated setup.",
    
  },
  {
    id: 4,
    text: "Multi Language support",
    image: {
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
      alt: "Ownership transfer flow",
    },
    link: "/multi-language",
    description:"Allows your platform to be used in different languages, making it accessible and user-friendly for a global audience.",
    
  },
    {
      id: 5,
      text: "AI-Powered Search",
      image:  {
      src: '',
      alt: ''
    },
    link: "/ai-powered-search",
    description:"Delivers faster, smarter, and more accurate results by understanding user intent and context, making it easier to find exactly what you need.",
    
  },
  {
    id: 5,
    text: "Collaborate in Real Time",
    image:  {
    src: '',
    alt: ''
  },
  link: "/collaborate-in-real-time",
  description:"Enables multiple users to work together simultaneously, ensuring instant updates, seamless teamwork, and improved productivity.",
    
},
{
  id: 5,
  text: "Customizable Layouts & Themes",
  image:  {
  src: '',
  alt: ''
},
link: "/themes",
description:"Let you personalize the look and structure of your workspace, ensuring it matches your brand style and fits your unique needs.",
    
},
{
  id: 5,
  text: "Turn Your Ideas into Documents Easily with AI",
  image:  {
  src: '',
  alt: ''
},
link: "/ideas-with-ai",
description:"Helps you generate well-structured, professional documents in seconds, transforming your thoughts into polished content with minimal effort.",
    
},
]

export default function FeatureCards() {
  const router = useNavigate()

  return (
    <section className="bg-red-50 py-20">
      {/* <div className="flex items-center justify-center">
        <h2 className="text-4xl font-semibold leading-tight text-slate-900 md:text-4xl bg-rose-100 p-4 rounded-xl">Replace Notion, readme, by one App.</h2>
</div> */}
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
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto py-10"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.3 }}
>
  {features.map((feature, index) => (
    <motion.div
      key={index}
      className="bg-white/45 p-8 shadow-lg border border-black hover:border-gray-400 text-left cursor-pointer"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onClick={() => router(feature.link)}
    >
      
      <h3 className="text-xl font-semibold text-slate-900 mb-4">
        {feature.text}
      </h3>
      <p className="text-sm text-slate-900 mb-4">{feature?.description}</p>
      
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
