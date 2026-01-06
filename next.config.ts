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
};

module.exports = nextConfig;
