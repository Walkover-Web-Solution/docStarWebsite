import assert from "node:assert/strict";
import test from "node:test";
import { compact, diffLines } from "../src/lib/admin/diff";
import { safeUrl } from "../src/server/research";
import { parseFrontmatter } from "../src/server/knowledge";

test("frontmatter is parsed and the body is left alone", () => {
  const { meta, body } = parseFrontmatter("---\ncovers: [src/a.ts, src/b/**]\nverified_on: 2026-10-24\nowner: Rashi\n---\n# Title\ntext");
  assert.deepEqual(meta.covers, ["src/a.ts", "src/b/**"]);
  assert.equal(meta.verified_on, "2026-10-24");
  assert.equal(meta.owner, "Rashi");
  assert.equal(body, "# Title\ntext");
  assert.equal(parseFrontmatter("# No header").meta.verified_on, null);
});

test("diff marks added and removed lines and collapses unchanged stretches", () => {
  const before = Array.from({ length: 30 }, (_, i) => `line ${i}`).join("\n");
  const after = before.replace("line 15", "line fifteen");
  const d = diffLines(before, after);
  assert.deepEqual(d.filter((l) => l.kind !== "same").map((l) => [l.kind, l.text]), [["del", "line 15"], ["add", "line fifteen"]]);
  assert.ok(compact(d).some((r) => r.kind === "gap"));
  assert.deepEqual(diffLines("a", "a").filter((l) => l.kind !== "same"), []);
});

test("research sources must be public https hosts", () => {
  assert.equal(safeUrl("https://www.mintlify.com/pricing").hostname, "www.mintlify.com");
  for (const bad of ["http://example.com", "https://localhost/x", "https://10.0.0.1/", "https://user:pw@example.com", "https://[::1]/", "https://db.internal/"]) assert.throws(() => safeUrl(bad), Error, bad);
});
