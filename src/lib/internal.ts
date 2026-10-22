// The middleware runs on its own and can't open database connections, so it calls two internal routes of
// this same site (/api/internal/*). Those routes trust a key derived from JWT_SECRET, so there is no extra
// secret to set. Never sent to browsers.
export async function internalKey() {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`internal:${process.env.JWT_SECRET || ""}`));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

export const INTERNAL_HEADER = "x-internal-key";
