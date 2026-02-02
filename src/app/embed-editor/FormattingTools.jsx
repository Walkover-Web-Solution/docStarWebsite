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

export default function FormattingTools() {
    const scrollContainerRef = React.useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="px-4 py-8 sm:px-6 sm:py-12 md:py-16 theme-bg-secondary">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-2 sm:mb-3 leading-tight">
                        Powerful Formatting at Your Fingertips
                    </h2>
                    <p className="text-sm sm:text-base max-w-2xl mx-auto opacity-70 leading-relaxed px-4">
                        From basic text styling to advanced media embeds—everything you need to create rich, professional content
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => scroll('left')}
                        className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border theme-border flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 opacity-70" />
                    </button>

                    <div
                        ref={scrollContainerRef}
                        className="flex-1 flex gap-3 sm:gap-4 overflow-x-auto scrollbar-width-none py-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {formatTools.map((tool, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 px-4 py-2 sm:px-8 sm:py-4 rounded-lg border theme-border hover:shadow-lg transition-all duration-200 hover:scale-105"
                            >
                                <div className="flex flex-col items-center text-center gap-2 sm:gap-2.5">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg theme-bg-overlay flex items-center justify-center">
                                        {React.createElement(tool.icon, {
                                            className: "w-5 h-5 sm:w-6 sm:h-6 opacity-70",
                                            strokeWidth: 1.5,
                                        })}
                                    </div>
                                    <h3 className="text-[9px] sm:text-[10px] font-medium leading-tight opacity-90">
                                        {tool.label}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => scroll('right')}
                        className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border theme-border flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-70" />
                    </button>
                </div>
            </div>
        </section>
    )
}