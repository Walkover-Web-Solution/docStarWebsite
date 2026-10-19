import type { Metadata } from "next";
import NotFoundBody from "@/components/site/NotFoundBody";

export const metadata: Metadata = {
  title: "Page not found | DocStar",
  robots: { index: false, follow: true },
};

// 404 inside the (site) layout, which already has the nav and footer.
export default function NotFound() {
  return <NotFoundBody />;
}
