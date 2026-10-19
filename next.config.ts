// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "phone91.com",
        pathname: "/static/msg91/**",
      },
      {
        protocol: "https",
        hostname: "stuff.thingsofbrand.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**", // allow all Unsplash paths
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**", // allow all Google image CDN paths
      },
      {
        protocol: "https",
        hostname: "cdn-1.webcatalog.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "thingsofbrand.com",
        pathname: "/**",
      }
    ],
  },
  async redirects() {
    // Pages from the previous (help-docs era) site, moved permanently to the closest new page.
    const retired: Record<string, string> = {
      "/ai-powered-search": "/api-docs",
      "/api-playground": "/api-docs",
      "/api-token": "/api-docs",
      "/changelog-generator": "/api-docs",
      "/collaborate-in-real-time": "/",
      "/custom-domain": "/white-label",
      "/documentation-with-ai": "/",
      "/edit-via-link": "/",
      "/embed-editor": "/",
      "/faq-generator": "/",
      "/features": "/",
      "/gallery-view": "/",
      "/github-actions-integration": "/api-docs",
      "/ideas-with-ai": "/",
      "/last-updated": "/api-docs",
      "/logs": "/analytics",
      "/meta-tags": "/api-docs",
      "/multi-language": "/api-docs",
      "/page-analytics": "/analytics",
      "/public-home-page": "/api-docs",
      "/revision-history": "/api-docs",
      "/search-sdk": "/api-docs",
      "/simple-website": "/",
      "/sso-authentication": "/white-label",
      "/table-of-content-in-public-view": "/api-docs",
      "/themes": "/white-label",
      "/webhook": "/api-docs",
      "/white-labelling": "/white-label",
      "/editor": "/",
    };
    return Object.entries(retired).map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

module.exports = nextConfig;
