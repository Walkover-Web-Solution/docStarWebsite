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

type FeatureAsset = {
  key: string
  id: number
  link: string
  image: FeatureImage
  fallbackDescription: string
  fallbackName: string
}

const FEATURE_ASSETS: FeatureAsset[] = [
  {
    key: "ssoauthentication",
    id: 1,
    link: "/sso-authentication",
    fallbackName: "SSO Authentication",
    image: {
      src: "https://images.unsplash.com/photo-1614064746579-4918e0ef6e9c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NzYxNTZ8MHwxfHNlYXJjaHw0fHx2ZXJpZnl8ZW58MHwwfHx8MTc1ODI3NjU5NHww&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=70",
      alt: "Automated reminders dashboard",
      blurDataURL: defaultFeatureBlurDataURL,
    },
    fallbackDescription:
      "SSO Authentication (Single Sign-On) allows users to securely access multiple applications and services with a single set of login credentials.",
  },
  {
    key: "customdomain",
    id: 2,
    link: "/custom-domain",
    fallbackName: "Custom Domain",
    image: {
      src: "https://images.unsplash.com/photo-1687524690542-2659f268cde8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NzYxNTZ8MHwxfHNlYXJjaHwyfHxjdXN0b20lMjBkb21haW58ZW58MHwwfHx8MTc1ODI3NjQxOXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=70",
      alt: "Knowledge base with tags",
      blurDataURL: defaultFeatureBlurDataURL,
    },
    fallbackDescription:
      "Custom Domain lets you use your own branded domain instead of a default URL, giving your workspace a professional and personalized identity.",
  },
  {
    key: "editorintegration",
    id: 3,
    link: "/embed-editor",
    fallbackName: "Editor Integration",
    image: {
      src: "https://images.unsplash.com/photo-1663662426323-7ba7aeb4f831?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NzYxNTZ8MHwxfHNlYXJjaHw1fHxlZGl0b3IlMjBpbnRlZ3JhdGlvbnxlbnwwfDB8fHwxNzU4Mjc2MTgwfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=70",
      alt: "AI suggestions panel",
      blurDataURL: defaultFeatureBlurDataURL,
    },
    fallbackDescription:
      "Hassle-free editor integration lets you quickly add a powerful, customizable editor without complicated setup.",
  },
  {
    key: "multilanguagesupport",
    id: 4,
    link: "/multi-language",
    fallbackName: "Multi-Language Support",
    image: {
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=70",
      alt: "Ownership transfer flow",
      blurDataURL: defaultFeatureBlurDataURL,
    },
    fallbackDescription:
      "Allows your platform to be used in different languages, making it accessible and user friendly for a global audience.",
  },
  {
    key: "aipoweredsearch",
    id: 5,
    link: "/ai-powered-search",
    fallbackName: "AI-Powered Search",
    image: {
      src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=70",
      alt: "AI Search Interface",
      blurDataURL: defaultFeatureBlurDataURL,
    },
    fallbackDescription:
      "AI-powered search helps you quickly discover the most relevant content across documentation and knowledge bases.",
  },
  {
    key: "collaborateinrealtime",
    id: 6,
    link: "/collaborate-in-real-time",
    fallbackName: "Collaborate in Real Time",
    image: {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=70",
      alt: "Team Collaboration",
      blurDataURL: defaultFeatureBlurDataURL,
    },
    fallbackDescription:
      "Enables multiple users to work together simultaneously, ensuring instant updates, seamless teamwork, and improved productivity.",
  },
  {
    key: "layoutsthemes",
    id: 7,
    link: "/themes",
    fallbackName: "Layouts & Themes",
    image: {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=70",
      alt: "Design Customization",
      blurDataURL: defaultFeatureBlurDataURL,
    },
    fallbackDescription:
      "Lets you personalize the look and structure of your workspace, ensuring it matches your brand style and fits your unique needs.",
  },
  {
    key: "turnideaseasilywithai",
    id: 8,
    link: "/ideas-with-ai",
    fallbackName: "Turn Ideas Easily with AI",
    image: {
      src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=70",
      alt: "AI Document Creation",
      blurDataURL: defaultFeatureBlurDataURL,
    },
    fallbackDescription:
      "Helps you generate well-structured, professional documents in seconds, transforming your thoughts into polished content with minimal effort.",
  },
]

const FEATURE_ASSET_MAP = new Map(FEATURE_ASSETS.map((asset) => [asset.key, asset]))

const TABLE_BASE_URL = "https://table-api.viasocket.com/68e89f851e8b7c70f10b866a"
const FEATURE_TABLE_ID = "tbl6txdq1"

const normalizeKey = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "")

const getAuthKey = () => process.env.TABLE_AUTH_KEY ?? process.env.NEXT_PUBLIC_TABLE_AUTH_KEY ?? ""

type TableRow = {
  autonumber?: number
  name?: string
  content?: string | null
}

type TableResponse = {
  success?: boolean
  data?: {
    rows?: TableRow[]
  }
}

export async function fetchFeatures(): Promise<FeatureItem[]> {
  try {
    const authKey = getAuthKey()
    if (!authKey) {
      console.warn("[features] Missing TABLE_AUTH_KEY/NEXT_PUBLIC_TABLE_AUTH_KEY environment variable.")
  }

  const response = await fetch(`${TABLE_BASE_URL}/${FEATURE_TABLE_ID}`, {
    headers: { "auth-key": authKey },
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch features: ${response.status} ${response.statusText}`)
  }

  const payload = (await response.json()) as TableResponse
  const rows = payload?.data?.rows ?? []

  const features = rows
    .map((row): FeatureItem | null => {
      const name = row.name?.trim()
      if (!name) return null

      const asset = FEATURE_ASSET_MAP.get(normalizeKey(name))
      if (!asset) {
        console.warn(`[features] No asset mapping found for feature "${name}"`)
        return null
      }

      return {
        id: row.autonumber ?? asset.id,
        text: name || asset.fallbackName,
        description: row.content?.trim() || asset.fallbackDescription,
        link: asset.link,
        image: asset.image,
      }
    })
    .filter((item): item is FeatureItem => Boolean(item))
    .sort((a, b) => a.id - b.id || a.text.localeCompare(b.text))

    return features
  } catch (error) {
    console.error("[features] Unable to fetch data from API:", error)
    return []
  }
}
