import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { pageByPath } from "@/content/pages";

// Cloudflare Pages runs dynamic routes on the edge runtime.
export const runtime = "edge";

// Admin preview (docstar.io/admin → "Preview"). hitman-api issues a 10-minute link:
// /api/preview?token=<base64url payload>.<base64url HMAC-SHA256>, signed with SITE_PREVIEW_SECRET.
// A valid token turns on draft mode for this browser and opens the page with its newest draft.
// /api/preview?exit=1 turns preview off again.

const fromB64url = (s: string) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4)), (c) => c.charCodeAt(0));

async function verify(token: string, secret: string): Promise<{ path: string; exp: number } | null> {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
  const ok = await crypto.subtle.verify("HMAC", key, fromB64url(sig), new TextEncoder().encode(payload));
  if (!ok) return null;
  try {
    const data = JSON.parse(new TextDecoder().decode(fromB64url(payload)));
    if (typeof data?.path !== "string" || typeof data?.exp !== "number" || data.exp * 1000 < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  if (url.searchParams.get("exit")) {
    (await draftMode()).disable();
    return NextResponse.redirect(new URL("/", url));
  }

  const secret = process.env.SITE_PREVIEW_SECRET;
  const token = url.searchParams.get("token");
  const data = secret && token ? await verify(token, secret) : null;
  // Only known page paths, so the link can't be used as an open redirect.
  if (!data || !pageByPath(data.path)) return new NextResponse("Preview link is invalid or expired.", { status: 401 });

  (await draftMode()).enable();
  return NextResponse.redirect(new URL(data.path, url));
}
