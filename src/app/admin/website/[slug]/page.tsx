import PageEditor from "@/components/admin/website/PageEditor";

export default async function AdminWebsiteEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PageEditor slug={slug} />;
}
