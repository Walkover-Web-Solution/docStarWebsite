// Runs the SQL files in db/migrations once each, in name order, and records them in schema_migrations.
//   npm run migrate            (DATABASE_URL from the environment, or from .env.local)
// The GitHub workflow .github/workflows/migrate.yml runs this on every push to prod that changes
// db/migrations, so the tables exist before the new code needs them. Safe to run again: applied files
// are skipped, and a Postgres advisory lock stops two runs from overlapping.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// .env.local is only a convenience for local runs; real environments set DATABASE_URL themselves.
if (!process.env.DATABASE_URL && existsSync(join(root, ".env.local"))) {
  for (const line of readFileSync(join(root, ".env.local"), "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const dir = join(root, "db", "migrations");
const files = readdirSync(dir).filter((f) => f.endsWith(".sql")).sort();
const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

try {
  await client.connect();
  await client.query("SELECT pg_advisory_lock(7420001)");
  await client.query("CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())");
  const done = new Set((await client.query("SELECT name FROM schema_migrations")).rows.map((r) => r.name));
  let ran = 0;
  for (const file of files) {
    if (done.has(file)) continue;
    process.stdout.write(`applying ${file} … `);
    try {
      await client.query("BEGIN");
      await client.query(readFileSync(join(dir, file), "utf8"));
      await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [file]);
      await client.query("COMMIT");
      console.log("done");
      ran++;
    } catch (error) {
      await client.query("ROLLBACK");
      console.log("FAILED");
      throw error;
    }
  }
  console.log(ran ? `${ran} migration(s) applied.` : "Database is up to date.");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
