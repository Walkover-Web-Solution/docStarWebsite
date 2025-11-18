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
    ],
  },
};

module.exports = nextConfig;
