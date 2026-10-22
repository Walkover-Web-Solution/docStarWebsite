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

export const hasDb = () => !!process.env.DATABASE_URL;

export async function withDb<T>(fn: (db: Db) => Promise<T>): Promise<T> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new DbNotConfigured();
  const client = new Client({ connectionString, connectionTimeoutMillis: 10_000, statement_timeout: 20_000 });
  await client.connect();
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
