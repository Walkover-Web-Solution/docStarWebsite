export type FeatureItem = {
  id: number
  text: string
  image: { src: string; alt: string }
  link: string
  description: string
}

export const features: FeatureItem[] = [
  {
    id: 1,
    text: "SSO Authentication",
    image: {
      src: "https://images.unsplash.com/photo-1614064746579-4918e0ef6e9c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NzYxNTZ8MHwxfHNlYXJjaHw0fHx2ZXJpZnl8ZW58MHwwfHx8MTc1ODI3NjU5NHww&ixlib=rb-4.1.0&q=85",
      alt: "Automated reminders dashboard",
    },
    link: "/sso-authentication",
    description:
      "SSO Authentication (Single Sign-On) allows users to securely access multiple applications and services with a single set of login credentials.",
  },
  {
    id: 2,
    text: "Custom Domain",
    image: {
      src: "https://images.unsplash.com/photo-1687524690542-2659f268cde8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NzYxNTZ8MHwxfHNlYXJjaHwyfHxjdXN0b20lMjBkb21haW58ZW58MHwwfHx8MTc1ODI3NjQxOXww&ixlib=rb-4.1.0&q=85",
      alt: "Knowledge base with tags",
    },
    link: "/custom-domain",
    description:
      "Custom Domain lets you use your own branded domain instead of a default URL, giving your workspace a professional and personalized identity.",
  },
  {
    id: 3,
    text: "Editor Integration",
    image: {
      src: "https://images.unsplash.com/photo-1663662426323-7ba7aeb4f831?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NzYxNTZ8MHwxfHNlYXJjaHw1fHxlZGl0b3IlMjBpbnRlZ3JhdGlvbnxlbnwwfDB8fHwxNzU4Mjc2MTgwfDA&ixlib=rb-4.1.0&q=85",
      alt: "AI suggestions panel",
    },
    link: "/embed-editor",
    description:
      "Hassle-Free Editor Integration lets you quickly add a powerful, customizable editor without complicated setup.",
  },
  {
    id: 4,
    text: "Multi Language support",
    image: {
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
      alt: "Ownership transfer flow",
    },
    link: "/multi-language",
    description:
      "Allows your platform to be used in different languages, making it accessible and user-friendly for a global audience.",
  },
  {
    id: 5,
    text: "AI-Powered Search",
    image: {
      src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop",
      alt: "AI Search Interface",
    },
    link: "/ai-powered-search",
    description:
      "Delivers faster, smarter, and more accurate results by understanding user intent and context, making it easier to find exactly what you need.",
  },
  {
    id: 6,
    text: "Collaborate in Real Time",
    image: {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
      alt: "Team Collaboration",
    },
    link: "/collaborate-in-real-time",
    description:
      "Enables multiple users to work together simultaneously, ensuring instant updates, seamless teamwork, and improved productivity.",
  },
  {
    id: 7,
    text: "Layouts & Themes",
    image: {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1600&auto=format&fit=crop",
      alt: "Design Customization",
    },
    link: "/themes",
    description:
      "Let you personalize the look and structure of your workspace, ensuring it matches your brand style and fits your unique needs.",
  },
  {
    id: 8,
    text: "Turn Ideas Easily with AI",
    image: {
      src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600&auto=format&fit=crop",
      alt: "AI Document Creation",
    },
    link: "/ideas-with-ai",
    description:
      "Helps you generate well-structured, professional documents in seconds, transforming your thoughts into polished content with minimal effort.",
  },
]
