import { Suspense } from "react";
import Blog from "@/components/admin/website/Blog";

export default function AdminBlogPage() {
  return (
    <Suspense>
      <Blog />
    </Suspense>
  );
}
