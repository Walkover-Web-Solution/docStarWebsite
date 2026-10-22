import { Client, type QueryResultRow } from "pg";

// Postgres access for the website's own backend. One connection per request (`withDb`): that works
// on Node and on Cloudflare Workers, where connections can't be shared between requests. With
// Cloudflare Hyperdrive, point DATABASE_URL at the Hyperdrive connection string and nothing else changes.

export type Db = {
  /** Runs a query and returns its rows. Use $1, $2… for values, never string concatenation. */
  query<T extends QueryResultRow = any>(text: string, params?: unknown[]): Promise<T[]>;
  /** First row, or null. */
  one<T extends QueryResultRow = any>(text: string, params?: unknown[]): Promise<T | null>;
};

export class DbNotConfigured extends Error {
  constructor() {
    super("DATABASE_URL is not set");
  }
}

/** The database couldn't be reached or refused the connection. `reason` is safe to show: no host, user or password in it. */
export class DbUnavailable extends Error {
  constructor(public reason: string, public original: unknown) {
    super(`Can't connect to the database: ${reason}`);
  }
}

function connectionReason(error: any): string {
  const text = `${error?.code || ""} ${error?.message || ""}`;
  if (/28P01|password authentication failed/i.test(text)) return "the database user or password is wrong (check DATABASE_URL).";
  if (/28000|pg_hba|no encryption|SSL (is )?required|ssl.*not supported/i.test(text)) return "the server refused this connection: it has no access rule for this server, or requires SSL (try ?sslmode=require).";
  if (/3D000|does not exist/i.test(text)) return "that database name doesn't exist on the server.";
  if (/ENOTFOUND|getaddrinfo/i.test(text)) return "the database host name can't be found.";
  if (/ECONNREFUSED/i.test(text)) return "the server refused the connection (wrong port, or Postgres isn't listening).";
  if (/ETIMEDOUT|timeout|timed out/i.test(text)) return "no answer from the server (a firewall is blocking it, or it isn't reachable from the internet).";
  if (/SSL|TLS|certificate/i.test(text)) return "SSL/TLS problem (try ?sslmode=require, or check the server's certificate).";
  // Hosts, IPs and anything that looks like a connection string are removed before the text leaves the server.
  const detail = String(error?.message || error || "")
    .replace(/\b[a-z][a-z0-9+.-]*:\/\/\S+/gi, "<url>")
    .replace(/\b\d{1,3}(\.\d{1,3}){3}(:\d+)?\b/g, "<host>")
    .replace(/\s+/g, " ")
    .slice(0, 160);
  return `unexpected error${error?.code ? ` (${error.code})` : ""}${detail ? `: ${detail}` : ""}. The full details are in the Worker logs.`;
}

export const hasDb = () => !!process.env.DATABASE_URL;

export async function withDb<T>(fn: (db: Db) => Promise<T>): Promise<T> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new DbNotConfigured();
  const client = new Client({ connectionString, connectionTimeoutMillis: 10_000, statement_timeout: 20_000 });
  try {
    await client.connect();
  } catch (error) {
    await client.end().catch(() => {});
    throw new DbUnavailable(connectionReason(error), error);
  }
  const db: Db = {
    query: async (text, params) => (await client.query(text, params as any[])).rows,
    one: async (text, params) => (await client.query(text, params as any[])).rows[0] ?? null,
  };
  try {
    return await fn(db);
  } finally {
    await client.end().catch(() => {});
  }
}

/** Runs fn in a transaction on the same connection: commits if it returns, rolls back if it throws. */
export async function withTx<T>(db: Db, fn: () => Promise<T>): Promise<T> {
  await db.query("BEGIN");
  try {
    const result = await fn();
    await db.query("COMMIT");
    return result;
  } catch (error) {
    await db.query("ROLLBACK").catch(() => {});
    throw error;
  }
}
