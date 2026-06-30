"use client";
import React from "react";
import { motion } from "framer-motion";
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
    Sparkles,
    Users,
    MousePointer2,
    Highlighter,
    Minus,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Type,
    Hash,
    ArrowLeftRight,
    TextCursor,
    FileDigit,
    Image as ImageIcon2,
    Navigation,
    Info,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    Link2,
    MousePointer,
    Square,
    LayoutTemplate,
} from "lucide-react";

const formatTools = [
    {
        category: "Core Text Formatting",
        icon: Type,
        tools: [
            { icon: Bold, label: "BOLD", description: "Make text stand out with bold formatting" },
            { icon: Italic, label: "ITALIC", description: "Add emphasis with italic styling" },
            { icon: Underline, label: "UNDERLINE", description: "Underline important text" },
            { icon: Highlighter, label: "HIGHLIGHT", description: "Highlight text for emphasis" },
            { icon: Code, label: "INLINE CODE", description: "Add inline code formatting" },
            { icon: Code2, label: "CODE BLOCK", description: "Insert formatted code blocks with copy" },
        ]
    },
    {
        category: "Headings & Structure",
        icon: Heading1,
        tools: [
            { icon: Heading1, label: "HEADINGS", description: "Create structured headings H1-H6" },
            { icon: Type, label: "TEXT STYLE", description: "Color, background, font, size" },
            { icon: Hash, label: "TYPOGRAPHY", description: "Smart quotes, dashes, etc." },
            { icon: Menu, label: "OUTLINE", description: "Generate document outlines" },
        ]
    },
    {
        category: "Lists & Tasks",
        icon: List,
        tools: [
            { icon: List, label: "BULLET LIST", description: "Create organized bullet point lists" },
            { icon: ListOrdered, label: "NUMBERED LIST", description: "Build sequential numbered lists" },
            { icon: CheckSquare, label: "TASK LIST", description: "Interactive to-do checklists" },
            { icon: Minus, label: "DIVIDER", description: "Horizontal rule lines" },
        ]
    },
    {
        category: "Text Alignment",
        icon: AlignLeft,
        tools: [
            { icon: AlignLeft, label: "ALIGN LEFT", description: "Left align text" },
            { icon: AlignCenter, label: "ALIGN CENTER", description: "Center align text" },
            { icon: AlignRight, label: "ALIGN RIGHT", description: "Right align text" },
            { icon: AlignJustify, label: "JUSTIFY", description: "Justify text alignment" },
        ]
    },
    {
        category: "Links & Embeds",
        icon: Link,
        tools: [
            { icon: Link, label: "LINK", description: "Insert hyperlinks" },
            { icon: Link2, label: "LINK PREVIEW", description: "Link preview cards" },
            { icon: ExternalLink, label: "EMBED", description: "URL embed/link previews" },
            { icon: Square, label: "BUTTON", description: "Create button links" },
        ]
    },
    {
        category: "Images & Media",
        icon: ImageIcon,
        tools: [
            { icon: ImageIcon, label: "IMAGE", description: "Upload and display images" },
            { icon: ImageIcon2, label: "PASTE IMAGE", description: "Handle image paste events" },
            { icon: Gallery, label: "GALLERY", description: "Create image galleries" },
            { icon: Video, label: "VIDEO", description: "Embed video content" },
        ]
    },
    {
        category: "Tables",
        icon: Table,
        tools: [
            { icon: Table, label: "TABLE", description: "Create and edit tables" },
        ]
    },
    {
        category: "Collaboration",
        icon: Users,
        tools: [
            { icon: Users, label: "COLLABORATION", description: "Real-time collaborative editing" },
            { icon: MousePointer2, label: "CARET", description: "Show other users' cursors" },
            { icon: MousePointer, label: "DROP CURSOR", description: "Visual drop position indicator" },
            { icon: TextCursor, label: "GAP CURSOR", description: "Cursor for gaps between nodes" },
        ]
    },
    {
        category: "Special Features",
        icon: Sparkles,
        tools: [
            { icon: Quote, label: "QUOTE", description: "Add blockquotes and citations" },
            { icon: Info, label: "CALLOUT", description: "Info boxes with icons" },
            { icon: ChevronDown, label: "COLLAPSIBLE", description: "Toggle/collapsible sections" },
            { icon: Navigation, label: "BREADCRUMB", description: "Breadcrumb navigation" },
            { icon: Link2, label: "LINKED PAGES", description: "Link to other pages" },
            { icon: LayoutTemplate, label: "ANCHOR", description: "Anchor links within document" },
        ]
    },
    {
        category: "Utilities",
        icon: FileDigit,
        tools: [
            { icon: FileText, label: "PLACEHOLDER", description: "Placeholder text for empty nodes" },
            { icon: ArrowLeftRight, label: "TRAILING NODE", description: "Ensure document ends with node" },
            { icon: FileDigit, label: "CHARACTER COUNT", description: "Count characters in document" },
            { icon: Smile, label: "EMOJI", description: "Express with emojis" },
            { icon: Paperclip, label: "ATTACHMENT", description: "Attach files and documents" },
        ]
    },
];

export default function FormattingTools() {
    const [openCategory, setOpenCategory] = React.useState(0);

    const toggleCategory = (index) => {
        setOpenCategory(openCategory === index ? -1 : index);
    };

    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 theme-bg-secondary">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--theme-bg)]"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--theme-color)]/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-500 mb-6">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                        Powerful Formatting at Your Fingertips
                    </h2>
                    <p className="text-base md:text-lg max-w-2xl mx-auto opacity-60 leading-relaxed">
                        From basic text styling to advanced media embeds—everything you need to create rich, professional content
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {formatTools.map((category, categoryIndex) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: categoryIndex * 0.05 }}
                        >
                            <button
                                onClick={() => toggleCategory(categoryIndex)}
                                className="w-full flex items-center justify-between p-5 rounded-2xl border theme-border theme-bg-secondary hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[var(--theme-color)]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        {React.createElement(category.icon, {
                                            className: "w-6 h-6 text-[var(--theme-color)]",
                                            strokeWidth: 1.5,
                                        })}
                                    </div>
                                    <h3 className="text-lg font-semibold">{category.category}</h3>
                                    <span className="text-xs opacity-50 px-2 py-1 rounded-full border theme-border">
                                        {category.tools.length} tools
                                    </span>
                                </div>
                                {openCategory === categoryIndex ? (
                                    <ChevronUp className="w-5 h-5 opacity-70 transition-transform duration-300" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 opacity-70 transition-transform duration-300" />
                                )}
                            </button>

                            <motion.div
                                initial={false}
                                animate={{
                                    height: openCategory === categoryIndex ? 'auto' : 0,
                                    opacity: openCategory === categoryIndex ? 1 : 0,
                                }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                            >
                                <div className="pt-4 pb-2">
                                    <div className="grid grid-cols-4 gap-4">
                                        {category.tools.map((tool, toolIndex) => (
                                            <motion.div
                                                key={tool.label}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{
                                                    opacity: openCategory === categoryIndex ? 1 : 0,
                                                    scale: openCategory === categoryIndex ? 1 : 0.9,
                                                }}
                                                transition={{ duration: 0.3, delay: toolIndex * 0.05 }}
                                                className="group"
                                            >
                                                <div className="relative h-full">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-color)]/20 to-violet-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                    <div className="h-full p-4 rounded-xl border theme-border theme-bg-secondary relative z-10 hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-lg">
                                                        <div className="flex flex-col items-center text-center gap-3">
                                                            <div className="w-10 h-10 rounded-lg bg-[var(--theme-color)]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                                {React.createElement(tool.icon, {
                                                                    className: "w-5 h-5 text-[var(--theme-color)]",
                                                                    strokeWidth: 1.5,
                                                                })}
                                                            </div>
                                                            <div>
                                                                <h4 className="text-xs font-bold leading-tight opacity-90">
                                                                    {tool.label}
                                                                </h4>
                                                                <p className="text-[10px] opacity-60 leading-relaxed mt-1">
                                                                    {tool.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}