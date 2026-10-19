import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Same runtime as the pages (root layout is edge), so it clears the cache they read from.
export const runtime = "edge";

// Called by hitman-api when website content is published, so cached pages refresh at once.
export async function POST(request: NextRequest) {
  const secret = process.env.SITE_REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const tags: string[] = Array.isArray(body?.tags) ? body.tags.filter((t: unknown) => typeof t === "string" && t.startsWith("site:")) : [];
  tags.forEach((tag) => revalidateTag(tag));
  return NextResponse.json({ revalidated: tags });
}
