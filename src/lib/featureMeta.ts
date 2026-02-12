import { cache } from "react"
import { Metadata } from "next"
import { fetchFeatures } from "@/services/features.api"
import { FeatureItem } from "@/types/data-types"
import { generateSEOMetadata } from "@/lib/seo"
import { SITE_URL } from "@/lib/structuredData"

type FeatureFallback = {
  title: string
  description: string
  keywords?: string[]
}

type FeatureMetaOptions = {
  path: string
  fallback: FeatureFallback
}

const cachedFetchFeatures = cache(fetchFeatures)

const normalizePath = (value?: string) => {
  if (!value) return "/"
  let pathValue = value
  try {
    if (value.startsWith("http")) {
      pathValue = new URL(value).pathname
    }
  } catch {
    // ignore URL parsing errors and keep original value
  }

  if (!pathValue.startsWith("/")) {
    pathValue = `/${pathValue}`
  }

  if (pathValue !== "/" && pathValue.endsWith("/")) {
    pathValue = pathValue.slice(0, -1)
  }

  return pathValue || "/"
}

const findFeatureByPath = async (path: string): Promise<FeatureItem | undefined> => {
  try {
    const features = (await cachedFetchFeatures()) as FeatureItem[]
    const normalizedPath = normalizePath(path)
    return features.find((feature) => normalizePath(feature.link) === normalizedPath)
  } catch (error) {
    console.error("[featureMeta] Unable to fetch feature data:", error)
    return undefined
  }
}

export const resolveFeatureContent = async ({
  path,
  fallback,
}: FeatureMetaOptions): Promise<FeatureFallback> => {
  const feature = await findFeatureByPath(path)

  return {
    title: feature?.name?.trim() ? feature.name : fallback.title,
    description: feature?.description?.trim() ? feature.description : fallback.description,
    keywords: feature?.tags ? feature.tags : fallback.keywords,
  }
}

export const buildFeaturePageMetadata = async ({
  path,
  fallback,
}: FeatureMetaOptions): Promise<Metadata> => {
  const content = await resolveFeatureContent({ path, fallback })

  return generateSEOMetadata({
    meta: {
      name: content.title,
      title: content.title,
      description: content.description,
      keywords: content.keywords,
    },
    baseUrl: SITE_URL,
    pathname: normalizePath(path),
  })
}
