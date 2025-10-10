"use client"

import { motion, LazyMotion, domAnimation } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import React from "react"
import MotionWrapper from "./motion/MotionDivWrapper"

type FeatureItem = {
  id: number
  text: string
  image: { src: string; alt: string }
  link: string
  description: string
}

const features: FeatureItem[] = [
  {
    id: 1,
    text: "SSO Authentication",
    image: {
      src: "https://images.unsplash.com/photo-1614064746579-4918e0ef6e9c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NzYxNTZ8MHwxfHNlYXJjaHw0fHx2ZXJpZnl8ZW58MHwwfHx8MTc1ODI3NjU5NHww&ixlib=rb-4.1.0&q=85",
      alt: "Automated reminders dashboard",
    },
    link: "/sso-authentication",
    description: "SSO Authentication (Single Sign-On) allows users to securely access multiple applications and services with a single set of login credentials.",
  },
  {
    id: 2,
    text: "Custom Domain",
    image: {
      src: "https://images.unsplash.com/photo-1687524690542-2659f268cde8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NzYxNTZ8MHwxfHNlYXJjaHwyfHxjdXN0b20lMjBkb21haW58ZW58MHwwfHx8MTc1ODI3NjQxOXww&ixlib=rb-4.1.0&q=85",
      alt: "Knowledge base with tags",
    },
    link: "/custom-domain",
    description: "Custom Domain lets you use your own branded domain instead of a default URL, giving your workspace a professional and personalized identity.",
  },
  {
    id: 3,
    text: "Editor Integration",
    image: {
      src: "https://images.unsplash.com/photo-1663662426323-7ba7aeb4f831?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NzYxNTZ8MHwxfHNlYXJjaHw1fHxlZGl0b3IlMjBpbnRlZ3JhdGlvbnxlbnwwfDB8fHwxNzU4Mjc2MTgwfDA&ixlib=rb-4.1.0&q=85",
      alt: "AI suggestions panel",
    },
    link: "/embed-editor",
    description: "Hassle-Free Editor Integration lets you quickly add a powerful, customizable editor without complicated setup.",
  },
  {
    id: 4,
    text: "Multi Language support",
    image: {
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
      alt: "Ownership transfer flow",
    },
    link: "/multi-language",
    description: "Allows your platform to be used in different languages, making it accessible and user-friendly for a global audience.",
  },
  {
    id: 5,
    text: "AI-Powered Search",
    image: {
      src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop",
      alt: "AI Search Interface"
    },
    link: "/ai-powered-search",
    description: "Delivers faster, smarter, and more accurate results by understanding user intent and context, making it easier to find exactly what you need.",
  },
  {
    id: 6,
    text: "Collaborate in Real Time",
    image: {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
      alt: "Team Collaboration"
    },
    link: "/collaborate-in-real-time",
    description: "Enables multiple users to work together simultaneously, ensuring instant updates, seamless teamwork, and improved productivity.",
  },
  {
    id: 7,
    text: "Layouts & Themes",
    image: {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1600&auto=format&fit=crop",
      alt: "Design Customization"
    },
    link: "/themes",
    description: "Let you personalize the look and structure of your workspace, ensuring it matches your brand style and fits your unique needs.",
  },
  {
    id: 8,
    text: "Turn Ideas Easily with AI",
    image: {
      src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600&auto=format&fit=crop",
      alt: "AI Document Creation"
    },
    link: "/ideas-with-ai",
    description: "Helps you generate well-structured, professional documents in seconds, transforming your thoughts into polished content with minimal effort.",
  },
]

const FeatureCard = React.memo(({ feature }: { feature: FeatureItem }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(feature.link)
  }

  return (
    <MotionWrapper
      className="group relative border border-gray-300 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-600 cursor-pointer"
      onClick={handleClick}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        {feature.image.src && (
          <Image
            src={feature.image.src}
            alt={feature.image.alt || feature.text}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAQIAAxEhkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyEkisfqNYVWjqrA7zNZiSnnnoJvhus6/8AQBOGUYtTgb4A6lfzZRldJiuNDYt7Wh9W6JHwZYOXr/p/DYH3Kq+c2w8Z2grtLYBU4z5hG8MbY4sW2dRD8Oa0FEQgMJhvEhO0VhpBLOr0wjtMBrWMFuI4wQQcjqpxz9fW6zWnUyNaobh3oiCJsYfSe3eFJMX8v8oqjwh0JVtOaMI6gKRfkrRdOMmAZwpv7gv7jqV9qhSowPzIOfD8u43vq2VYFfO/gE/Ek/v2v2VlUZgpONXLM5xV5EhmVtF8pOWeFwk8SBhKhRZQqrwYQiOJ3bMBgR1t6UQRJZpqhQUPFhXvkTLkWvxP9V8WEH8wI5PfkWwSBsW5Ak9M7W3FGWZRJHJkgK8IUWjPbC+3rtXMFYvFUPa3XfHQlsHRWR/0TgS//9k="
          />
        )}
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
          {feature.text}
        </h3>
        
        {/* <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {feature.description}
        </p> */}

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
            Learn More
          </span>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-black/70 transition-colors duration-200">
            <ArrowRight className="h-4 w-4 text-gray-600 group-hover:text-white transition-colors duration-200" />
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </MotionWrapper>
  )
})

FeatureCard.displayName = 'FeatureCard'

export default function ExtraFeatures() {
  return (
    <section id="features" className="bg-gray-50 py-20 scroll-mt-32">
      <LazyMotion features={domAnimation}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <MotionWrapper
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <FeatureCard feature={feature} />
              </MotionWrapper>
            ))}
          </div>
        </div>
      </LazyMotion>
    </section>
  )
}
