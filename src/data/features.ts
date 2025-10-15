export type FeatureImage = {
  src: string
  alt: string
  blurDataURL?: string
}

export type FeatureItem = {
  id: number
  text: string
  image: FeatureImage
  link: string
  description: string
}

export const defaultFeatureBlurDataURL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAQIAAxEhkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyEkisfqNYVWjqrA7zNZiSnnnoJvhus6/8AQBOGUYtTgb4A6lfzZRldJiuNDYt7Wh9W6JHwZYOXr/p/DYH3Kq+c2w8Z2grtLYBU4z5hG8MbY4sW2dRD8Oa0FEQgMJhvEhO0VhpBLOr0wjtMBrWMFuI4wQQcjqpxz9fW6zWnUyNaobh3oiCJsYfSe3eFJMX8v8oqjwh0JVtOaMI6gKRfkrRdOMmAZwpv7gv7jqV9qhSowPzIOfD8u43vq2VYFfO/gE/Ek/v2v2VlUZgpONXLM5xV5EhmVtF8pOWeFwk8SBhKhRZQqrwYQiOJ3bMBgR1t6UQRJZpqhQUPFhXvkTLkWvxP9V8WEH8wI5PfkWwSBsW5Ak9M7W3FGWZRJHJkgK8IUWjPbC+3rtXMFYvFUPa3XfHQlsHRWR/0TgS//9k="

export const features: FeatureItem[] = [
  {
    id: 1,
    text: "SSO Authentication",
    image: {
      src: "https://images.unsplash.com/photo-1614064746579-4918e0ef6e9c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NzYxNTZ8MHwxfHNlYXJjaHw0fHx2ZXJpZnl8ZW58MHwwfHx8MTc1ODI3NjU5NHww&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=70",
      alt: "Automated reminders dashboard",
      blurDataURL: defaultFeatureBlurDataURL,
    },
    link: "/sso-authentication",
    description:
      "SSO Authentication (Single Sign-On) allows users to securely access multiple applications and services with a single set of login credentials.",
  },
  {
    id: 2,
    text: "Custom Domain",
    image: {
      src: "https://images.unsplash.com/photo-1687524690542-2659f268cde8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NzYxNTZ8MHwxfHNlYXJjaHwyfHxjdXN0b20lMjBkb21haW58ZW58MHwwfHx8MTc1ODI3NjQxOXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=70",
      alt: "Knowledge base with tags",
      blurDataURL: defaultFeatureBlurDataURL,
    },
    link: "/custom-domain",
    description:
      "Custom Domain lets you use your own branded domain instead of a default URL, giving your workspace a professional and personalized identity.",
  },
  {
    id: 3,
    text: "Editor Integration",
    image: {
      src: "https://images.unsplash.com/photo-1663662426323-7ba7aeb4f831?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NzYxNTZ8MHwxfHNlYXJjaHw1fHxlZGl0b3IlMjBpbnRlZ3JhdGlvbnxlbnwwfDB8fHwxNzU4Mjc2MTgwfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=70",
      alt: "AI suggestions panel",
      blurDataURL: defaultFeatureBlurDataURL,
    },
    link: "/embed-editor",
    description:
      "Hassle-Free Editor Integration lets you quickly add a powerful, customizable editor without complicated setup.",
  },
  {
    id: 4,
    text: "Multi Language support",
    image: {
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=70",
      alt: "Ownership transfer flow",
      blurDataURL: defaultFeatureBlurDataURL,
    },
    link: "/multi-language",
    description:
      "Allows your platform to be used in different languages, making it accessible and user-friendly for a global audience.",
  },
  {
    id: 5,
    text: "AI-Powered Search",
    image: {
      src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=70",
      alt: "AI Search Interface",
      blurDataURL: defaultFeatureBlurDataURL,
    },
    link: "/ai-powered-search",
    description:
      "Delivers faster, smarter, and more accurate results by understanding user intent and context, making it easier to find exactly what you need.",
  },
  {
    id: 6,
    text: "Collaborate in Real Time",
    image: {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=70",
      alt: "Team Collaboration",
      blurDataURL: defaultFeatureBlurDataURL,
    },
    link: "/collaborate-in-real-time",
    description:
      "Enables multiple users to work together simultaneously, ensuring instant updates, seamless teamwork, and improved productivity.",
  },
  {
    id: 7,
    text: "Layouts & Themes",
    image: {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=70",
      alt: "Design Customization",
      blurDataURL: defaultFeatureBlurDataURL,
    },
    link: "/themes",
    description:
      "Let you personalize the look and structure of your workspace, ensuring it matches your brand style and fits your unique needs.",
  },
  {
    id: 8,
    text: "Turn Ideas Easily with AI",
    image: {
      src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=70",
      alt: "AI Document Creation",
      blurDataURL: defaultFeatureBlurDataURL,
    },
    link: "/ideas-with-ai",
    description:
      "Helps you generate well-structured, professional documents in seconds, transforming your thoughts into polished content with minimal effort.",
  },
]
