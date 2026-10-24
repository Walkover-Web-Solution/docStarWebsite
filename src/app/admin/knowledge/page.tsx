import { Suspense } from "react";
import Knowledge from "@/components/admin/sections/Knowledge";

export default function AdminKnowledgePage() {
  return (
    <Suspense>
      <Knowledge />
    </Suspense>
  );
}
