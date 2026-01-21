"use client";

import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Heading1,
  Bold,
  Italic,
  Underline,
  Link,
  List,
  ListOrdered,
  CheckSquare,
  Table,
  Calendar,
  ImageIcon,
  GalleryThumbnailsIcon as Gallery,
  Video,
  Paperclip,
  Smile,
  Code,
  Code2,
  FileText,
  Quote,
  Menu,
  ChevronLeft,
  ChevronRight,
  Star,
  Pencil, // Added Pencil icon import
} from "lucide-react";
import MotionWrapper from "@/components/motion/MotionDivWrapper";
// import DocStarEmbed from "../components/DocstarEmbed"
// import DocStarEmbed from "../components/DocstarEmbed"

const formatTools = [
  {
    icon: Heading1,
    label: "HEADINGS",
    description: "Create structured headings for better organization",
  },
  {
    icon: Bold,
    label: "BOLD",
    description: "Make text stand out with bold formatting",
  },
  {
    icon: Italic,
    label: "ITALIC",
    description: "Add emphasis with italic styling",
  },
  {
    icon: Underline,
    label: "UNDERLINE",
    description: "Underline important text",
  },
  {
    icon: Link,
    label: "LINK",
    description: "Insert hyperlinks to external resources",
  },
  {
    icon: List,
    label: "BULLET LIST",
    description: "Create organized bullet point lists",
  },
  {
    icon: ListOrdered,
    label: "NUMBERED LIST",
    description: "Build sequential numbered lists",
  },
  {
    icon: CheckSquare,
    label: "CHECKLIST",
    description: "Add interactive checkboxes",
  },
  {
    icon: Table,
    label: "TABLES",
    description: "Insert structured data tables",
  },
  { icon: Calendar, label: "DATE", description: "Add date and time stamps" },
  { icon: ImageIcon, label: "IMAGE", description: "Embed images and graphics" },
  { icon: Gallery, label: "GALLERY", description: "Create image galleries" },
  { icon: Video, label: "VIDEO", description: "Embed video content" },
  {
    icon: Paperclip,
    label: "ATTACHMENT",
    description: "Attach files and documents",
  },
  {
    icon: Smile,
    label: "EMOJI",
    description: "Express with emojis and reactions",
  },
  {
    icon: Code2,
    label: "CODE SNIPPET",
    description: "Insert formatted code blocks",
  },
  {
    icon: Code,
    label: "INLINE CODE",
    description: "Add inline code formatting",
  },
  {
    icon: FileText,
    label: "PLACEHOLDER",
    description: "Insert placeholder content",
  },
  { icon: Quote, label: "QUOTE", description: "Add blockquotes and citations" },
  { icon: Menu, label: "OUTLINE", description: "Generate document outlines" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechFlow",
    content:
      "This editor transformed how our team collaborates. The formatting tools are intuitive and powerful.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Content Creator",
    company: "Creative Studio",
    content:
      "Finally, an editor that doesn't get in my way. Clean, fast, and exactly what I need.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Technical Writer",
    company: "DevCorp",
    content:
      "The perfect balance of features and simplicity. Our documentation process is now seamless.",
    rating: 5,
  },
];

const EmbedEditorPageClient = () => {
  const [currentTool, setCurrentTool] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const toolsPerPage = 4;
  const totalPages = Math.ceil(formatTools.length / toolsPerPage);

  const nextTool = () => {
    setCurrentTool((prev) => (prev + toolsPerPage) % formatTools.length);
  };

  const prevTool = () => {
    setCurrentTool(
      (prev) => (prev - toolsPerPage + formatTools.length) % formatTools.length,
    );
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const getCurrentTools = () => {
    const tools = [];
    for (let i = 0; i < toolsPerPage; i++) {
      const index = (currentTool + i) % formatTools.length;
      tools.push({ ...formatTools[index], index });
    }
    return tools;
  };

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden theme-bg-secondary py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <MotionWrapper
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl font-bold my-8 mb-6">The Smart Editor</h1>
            <div className="flex items-center justify-center gap-2 mb-8">
              <Pencil className="w-5 h-5 opacity-80" />
              <p className="text-xl font-['Dancing_Script',_cursive] -mt-1 opacity-90">
                Your space for every idea and policy.
              </p>
            </div>
            <p className="text-xl max-w-3xl mx-auto mb-8 leading-relaxed opacity-80">
              A platform that helps you say it all—your thoughts, your rules,
              everything. It's simple, fast, and always works the way you need
              it to.
            </p>
          </MotionWrapper>
        </div>
      </section>

      <section className="py-12 px-8">
        <div className="max-w-6xl mx-auto">
          <MotionWrapper
            className="rounded-3xl p-8 shadow-xl theme-bg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Transform any text area into a{" "}
                  <span className="opacity-80">powerful editor</span>
                </h2>
                <p className="text-lg mb-8 leading-relaxed opacity-80">
                  With just one line of code, give your users the editing
                  experience they love, without the complexity.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full opacity-80"
                      style={{ backgroundColor: "var(--app-text)" }}
                    ></div>
                    <span>Real-time collaboration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full opacity-80"
                      style={{ backgroundColor: "var(--app-text)" }}
                    ></div>
                    <span>Rich formatting tools</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full opacity-80"
                      style={{ backgroundColor: "var(--app-text)" }}
                    ></div>
                    <span>Lightning fast performance</span>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl p-6 shadow-lg theme-bg-secondary">
                <div
                  className="rounded-lg p-4 mb-4 theme-bg-secondary"
                  style={{ opacity: 0.6 }}
                >
                  <code className="text-sm font-mono opacity-80">
                    {"<EmbedEditor />"}
                  </code>
                </div>
                <div className="space-y-3">
                  <div
                    className="h-4 rounded w-full theme-bg-secondary"
                    style={{ opacity: 0.6 }}
                  ></div>
                  <div
                    className="h-4 rounded w-3/4 theme-bg-secondary"
                    style={{ opacity: 0.6 }}
                  ></div>
                  <div
                    className="h-4 rounded w-5/6 theme-bg-secondary"
                    style={{ opacity: 0.6 }}
                  ></div>
                  <div className="flex gap-2 mt-4">
                    <div className="w-8 h-8 rounded flex items-center justify-center theme-bg-secondary">
                      <Bold className="w-4 h-4 opacity-80" />
                    </div>
                    <div className="w-8 h-8 rounded flex items-center justify-center theme-bg-secondary">
                      <Italic className="w-4 h-4 opacity-80" />
                    </div>
                    <div className="w-8 h-8 rounded flex items-center justify-center theme-bg-secondary">
                      <Link className="w-4 h-4 opacity-80" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <MotionWrapper
              className="text-5xl font-bold leading-tight"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Just the right amount of formatting.
            </MotionWrapper>

            <div className="flex items-center gap-4">
              <button
                onClick={prevTool}
                className="p-3 rounded-full theme-bg hover:opacity-80 transition-colors shadow-md cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6 opacity-80" />
              </button>
              <button
                onClick={nextTool}
                className="p-3 rounded-full theme-bg hover:opacity-80 transition-colors shadow-md cursor-pointer"
              >
                <ChevronRight className="w-6 h-6 opacity-80" />
              </button>
            </div>
          </div>
          <MotionWrapper
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            key={currentTool}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {getCurrentTools().map((tool, index) => (
              <MotionWrapper
                key={tool.index}
                className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow theme-bg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-4 rounded-xl theme-badge">
                    {React.createElement(tool.icon, {
                      className: "w-8 h-8",
                      strokeWidth: 1.5,
                    })}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{tool.label}</h3>
                    <p className="text-sm opacity-80">{tool.description}</p>
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </MotionWrapper>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => setCurrentTool(pageIndex * toolsPerPage)}
                className={`w-3 h-3 rounded-full transition-colors theme-bg-secondary ${
                  Math.floor(currentTool / toolsPerPage) === pageIndex
                    ? "opacity-100"
                    : "opacity-30"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* <DocStarEmbed />  */}

      <section className="py-20 px-8 theme-bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <MotionWrapper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6">
              Ready to transform your writing?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who've already discovered the perfect
              balance of power and simplicity.
            </p>
            <MotionWrapper
              as="button"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.open("https://app.docstar.io/login", "_blank")
              }
            >
              Get Started Now
            </MotionWrapper>
          </MotionWrapper>
        </div>
      </section>
    </div>
  );
};

export default EmbedEditorPageClient;
