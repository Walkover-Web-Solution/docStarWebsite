import { NextResponse, type NextRequest } from "next/server";
import { ZodError, type ZodType } from "zod";
import { AdminError } from "./adminTypes";
import { DbNotConfigured, DbUnavailable } from "./db";
import { describeIssues } from "./siteSchema";

// Small helpers shared by every API route: JSON answers, errors with a status, body parsing.

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export const json = (data: unknown, status = 200, headers?: Record<string, string>) => NextResponse.json(data, { status, headers: { "Cache-Control": "no-store", ...headers } });

/** Wraps a route handler: turns thrown errors into JSON answers with the right status. */
export function handle<A extends unknown[]>(fn: (...args: A) => Promise<Response>) {
  return async (...args: A): Promise<Response> => {
    try {
      return await fn(...args);
    } catch (error: any) {
      if (error instanceof HttpError || error instanceof AdminError) return json({ message: error.message }, error.status);
      if (error instanceof ZodError) return json({ message: describeIssues(error) }, 400);
      if (error instanceof DbNotConfigured) return json({ message: "The database isn't set up on this server: DATABASE_URL is missing.", code: "db_not_configured" }, 503);
      if (error instanceof DbUnavailable) {
        console.error("[api] database connection failed:", error.reason, error.original);
        return json({ message: error.message, code: "db_unavailable" }, 503);
      }
      // Postgres "undefined_table": the migration hasn't been run on this database.
      if (error?.code === "42P01") {
        console.error("[api]", error?.stack || error);
        return json({ message: "The database tables are missing: run the migration (npm run migrate).", code: "db_not_migrated" }, 503);
      }
      console.error("[api]", error?.stack || error);
      return json({ message: "Something went wrong on the server." }, 500);
    }
  };
}

/** Reads a JSON body (at most maxBytes) and checks it against a schema. */
export async function readJson<T>(req: NextRequest, schema: ZodType<T>, maxBytes = 1_000_000): Promise<T> {
  const raw = await req.text();
  if (raw.length > maxBytes) throw new HttpError(413, "Request too large");
  let body: unknown;
  try {
    body = raw ? JSON.parse(raw) : {};
  } catch {
    throw new HttpError(400, "Body must be JSON");
  }
  return schema.parse(body);
}

export const intParam = (value: string, name = "id") => {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1) throw new HttpError(400, `Invalid ${name}`);
  return n;
};

/** The caller's IP as Cloudflare saw it. Without Cloudflare (local dev) everyone shares one bucket. */
export const clientIp = (req: Request) => req.headers.get("cf-connecting-ip") || "unknown";

const hex = (buf: ArrayBuffer) => Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");

export const sha256 = async (value: string) => hex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));

/** A salted hash of the caller's IP, so limits can count callers without storing addresses. */
export async function callerHash(req: Request) {
  return (await sha256(`ip:${clientIp(req)}:${process.env.JWT_SECRET || "ds"}`)).slice(0, 32);
}
