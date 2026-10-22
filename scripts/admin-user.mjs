// Creates a team member who can sign in at /admin, or resets their password.
//   npm run admin:user -- rashi@whozzat.com "Rashi"
// Prints a new random password once: it isn't stored anywhere (only a salted hash), so share it safely.
import { createHash, randomBytes } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
if (!process.env.DATABASE_URL && existsSync(join(root, ".env.local"))) {
  for (const line of readFileSync(join(root, ".env.local"), "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
}

const email = (process.argv[2] || "").trim().toLowerCase();
const name = (process.argv[3] || email.split("@")[0]).trim();
if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
  console.error('Usage: npm run admin:user -- <email> ["Name"]');
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const password = randomBytes(18).toString("base64url"); // 24 characters
const salt = randomBytes(16).toString("hex");
// must match hashPassword in src/server/auth.ts
const hash = createHash("sha256").update(`${salt}:${password}`).digest("hex");
const data = JSON.stringify({ salt, hash, lastLoginAt: null });

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
try {
  await client.connect();
  const existing = await client.query("SELECT id, data FROM admin WHERE type = 'user' AND key = $1", [email]);
  if (existing.rows.length) {
    const merged = { ...existing.rows[0].data, salt, hash };
    await client.query("UPDATE admin SET title = $2, data = $3, updated_at = now() WHERE id = $1", [existing.rows[0].id, name, JSON.stringify(merged)]);
    console.log(`Password reset for ${email}.`);
  } else {
    await client.query("INSERT INTO admin (type, key, title, actor_type, data) VALUES ('user', $1, $2, 'system', $3)", [email, name, data]);
    console.log(`Created ${email}.`);
  }
  console.log(`\n  Email:    ${email}\n  Password: ${password}\n\nSign in at /admin. This password is shown only now.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
