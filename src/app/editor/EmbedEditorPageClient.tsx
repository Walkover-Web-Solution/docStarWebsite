"use client";
import React from "react";
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
  Pencil,
} from "lucide-react";

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
      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32">
        <div className="container mx-auto text-center">
          <h1 className="h1 mb-4">The Smart Editor</h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Pencil className="w-5 h-5 opacity-70" />
            <p className="text-lg md:text-xl font-['Dancing_Script',_cursive] opacity-80">
              Your space for every idea and policy.
            </p>
          </div>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-70">
            A platform that helps you say it all—your thoughts, your rules,
            everything. It's simple, fast, and always works the way you need it
            to.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Transform any text area into a{" "}
              <span className="text-gradient">
                powerful editor
              </span>
            </h2>
            <p className="text-lg mb-8 leading-relaxed opacity-70">
              With just one line of code, give your users the editing experience
              they love, without the complexity.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-black/40 dark:bg-white/40"></div>
                <span className="opacity-80">Real-time collaboration</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-black/40 dark:bg-white/40"></div>
                <span className="opacity-80">Rich formatting tools</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-black/40 dark:bg-white/40"></div>
                <span className="opacity-80">Lightning fast performance</span>
              </div>
            </div>
          </div>
          <div className="rounded border theme-border p-6">
            <div className="rounded border theme-border p-4 mb-4 bg-black/5 dark:bg-white/5">
              <code className="text-sm font-mono opacity-80">
                {"<EmbedEditor />"}
              </code>
            </div>
            <div className="space-y-3">
              <div className="h-4 rounded theme-bg opacity-20 w-full"></div>
              <div className="h-4 rounded theme-bg opacity-20 w-3/4"></div>
              <div className="h-4 rounded theme-bg opacity-20 w-5/6"></div>
              <div className="flex gap-2 mt-4">
                <div className="w-8 h-8 rounded border theme-border flex items-center justify-center">
                  <Bold className="w-4 h-4 opacity-70" />
                </div>
                <div className="w-8 h-8 rounded border theme-border flex items-center justify-center">
                  <Italic className="w-4 h-4 opacity-70" />
                </div>
                <div className="w-8 h-8 rounded border theme-border flex items-center justify-center">
                  <Link className="w-4 h-4 opacity-70" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formatting Tools Section */}
      <section className="px-6 py-20 container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Just the right amount of formatting.
          </h2>
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={prevTool}
              className="w-10 h-10 cursor-pointer rounded-full border theme-border flex items-center justify-center transition-opacity hover:opacity-70"
            >
              <ChevronLeft className="w-5 h-5 opacity-70" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => setCurrentTool(pageIndex * toolsPerPage)}
                  className={`h-2 rounded-full transition-all border-2 ${
                    Math.floor(currentTool / toolsPerPage) === pageIndex
                      ? "w-8 theme-bg"
                      : "w-2 theme-bg opacity-40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextTool}
              className="w-10 h-10 cursor-pointer rounded-full border theme-border flex items-center justify-center transition-opacity hover:opacity-70"
            >
              <ChevronRight className="w-5 h-5 opacity-70" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {getCurrentTools().map((tool) => (
            <div
              key={tool.index}
              className="p-6 rounded-lg border theme-border"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 flex items-center justify-center">
                  {React.createElement(tool.icon, {
                    className: "w-7 h-7 opacity-70",
                    strokeWidth: 1.5,
                  })}
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-1">{tool.label}</h3>
                  <p className="text-xs opacity-60 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Ready to transform your writing?
        </h2>
        <p className="text-lg md:text-xl opacity-70 mb-8 max-w-2xl mx-auto">
          Join thousands of creators who've already discovered the perfect
          balance of power and simplicity.
        </p>
        <button
          className="btn btn-primary mx-auto"
          onClick={() => window.open("https://app.docstar.io/login", "_blank")}
        >
          Get Started Now
        </button>
      </section>
    </div>
  );
};

export default EmbedEditorPageClient;
