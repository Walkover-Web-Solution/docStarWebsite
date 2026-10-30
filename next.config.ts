// next.config.js

// Sent with every response the Worker renders; public/_headers sends the same for static files.
// HSTS has no includeSubDomains: not every *.docstar.io host is confirmed HTTPS-only. The CSP only sets
// directives that can't break Google Tag Manager; a script-src policy needs the GTM container's tag list.
const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'; object-src 'none'; base-uri 'self'; upgrade-insecure-requests" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Put <title>, meta and link tags in the initial <head> for every client, not streamed into <body>.
  // Crawlers and agents that don't run JavaScript would otherwise miss or ignore them.
  htmlLimitedBots: /.*/,
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
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
