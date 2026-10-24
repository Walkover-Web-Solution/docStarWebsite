import { createRow, mapRow, updateRow, type Actor } from "./adminTypes";
import type { Db } from "./db";

// Named admin settings, stored as `setting` rows (key = name, data.value = JSON). Settings hold
// configuration only; secrets stay in environment variables.

export async function getSetting<T>(db: Db, key: string, fallback: T): Promise<T> {
  const row = await db.one("SELECT data FROM admin WHERE type = 'setting' AND key = $1", [key]);
  return row ? { ...fallback, ...(row.data.value as object) } as T : fallback;
}

export async function setSetting<T extends object>(db: Db, key: string, value: T, actor: Actor) {
  const existing = await db.one("SELECT * FROM admin WHERE type = 'setting' AND key = $1", [key]);
  const stamped = { ...value, changedBy: actor.name, changedAt: new Date().toISOString() };
  if (existing) await updateRow(db, mapRow(existing), { data: { value: stamped } });
  else await createRow(db, "setting", { key, actor, data: { value: stamped } });
  return stamped;
}
