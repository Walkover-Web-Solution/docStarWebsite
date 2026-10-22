import { SignJWT, jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { HttpError, callerHash, sha256 } from "./http";
import { findByKey, updateRow, type Actor } from "./adminTypes";
import type { Db } from "./db";

// Sign-in for the internal team. An admin is a `user` row in the `admin` table (created with
// `npm run admin:user`). Signing in sets a JWT in an httpOnly cookie; every admin API call checks it.
// Passwords are long random strings made by that script, so a fast salted SHA-256 is enough (no slow
// hashing, which Cloudflare's free CPU limit wouldn't allow anyway).

export const COOKIE = "ds_admin";
const MAX_AGE_SECONDS = 12 * 60 * 60;
const MAX_FAILED_PER_QUARTER_HOUR = 8;

export type Session = { email: string; name: string };

function secretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) throw new HttpError(503, "JWT_SECRET must be set (at least 32 characters).");
  return new TextEncoder().encode(secret);
}

// ---------- passwords ----------

export const hashPassword = (salt: string, password: string) => sha256(`${salt}:${password}`);

function sameText(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// ---------- the cookie ----------

export async function startSession(session: Session) {
  const token = await new SignJWT({ name: session.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.email)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secretKey());
  (await cookies()).set(COOKIE, token, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: MAX_AGE_SECONDS });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function readSession(req: NextRequest): Promise<Session | null> {
  const token = req.cookies.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ["HS256"] });
    return payload.sub ? { email: payload.sub, name: String(payload.name || payload.sub) } : null;
  } catch {
    return null;
  }
}

/** Writes must come from this site: a browser always sends Origin on a cross-site POST, and it must match. */
export function requireSameOrigin(req: NextRequest) {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return;
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) throw new HttpError(403, "Cross-site request refused.");
}

/** Every admin API starts here: the caller must be signed in, and writes must come from this site. */
export async function requireAdmin(req: NextRequest): Promise<Session> {
  const session = await readSession(req);
  if (!session) throw new HttpError(401, "Sign in to continue.");
  requireSameOrigin(req);
  return session;
}

/** Who to record as the author of a change made by a signed-in team member. */
export const adminActor = (session: Session): Actor => ({ type: "human", id: session.email.slice(0, 64), name: session.name });

// ---------- signing in ----------

/** Checks email + password. Wrong attempts are counted per caller, and too many are refused for a while. */
export async function signIn(db: Db, req: NextRequest, email: string, password: string): Promise<Session> {
  const who = await callerHash(req);
  const failed = await db.one<{ n: number }>(
    "SELECT count(*)::int AS n FROM admin_events WHERE event = 'admin.login_failed' AND anon_id = $1 AND ts > now() - interval '15 minutes'",
    [who]
  );
  if ((failed?.n || 0) >= MAX_FAILED_PER_QUARTER_HOUR) throw new HttpError(429, "Too many wrong attempts. Try again in 15 minutes.");

  const user = await findByKey(db, "user", email.trim().toLowerCase());
  // hash even when the user doesn't exist, so the answer takes the same time
  const attempt = await hashPassword(user?.data.salt || "none", password);
  if (!user || !sameText(attempt, user.data.hash)) {
    await db.query("INSERT INTO admin_events (event, actor_type, anon_id) VALUES ('admin.login_failed', 'human', $1)", [who]);
    throw new HttpError(401, "Wrong email or password.");
  }
  await updateRow(db, user, { data: { lastLoginAt: new Date() } });
  return { email: user.key as string, name: user.title as string };
}
