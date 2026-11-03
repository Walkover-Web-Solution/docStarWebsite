import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DocStar",
    short_name: "DocStar",
    description: "API documentation for people and agents.",
    start_url: "/",
    display: "browser",
    background_color: "#f7f7f2",
    theme_color: "#f7f7f2",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/logo.png", sizes: "256x256", type: "image/png" },
    ],
  };
}
