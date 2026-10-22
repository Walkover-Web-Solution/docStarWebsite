import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { pageByPath } from "@/content/pages";
import { readSession } from "@/server/auth";

export const dynamic = "force-dynamic";

// Admin preview (docstar.io/admin → "Preview"): a signed-in admin opens /api/preview?path=/mcp and sees the
// newest draft of that page. Draft mode lasts for this browser session; /api/preview?exit=1 turns it off.
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  if (url.searchParams.get("exit")) {
    (await draftMode()).disable();
    return NextResponse.redirect(new URL("/", url));
  }
  if (!(await readSession(request))) return new NextResponse("Sign in at /admin first.", { status: 401 });
  const path = url.searchParams.get("path") || "/";
  // Only known page paths, so this can't be used as an open redirect.
  if (!pageByPath(path)) return new NextResponse("Unknown page.", { status: 404 });
  (await draftMode()).enable();
  return NextResponse.redirect(new URL(path, url));
}
