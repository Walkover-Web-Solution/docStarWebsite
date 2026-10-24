import assert from "node:assert/strict";
import test from "node:test";
import { assign, readArms, variantPath } from "../src/lib/experiments";
import { launchGaps } from "../src/server/experiments";

const experiment = { key: "t-1", slug: "home", path: "/", variants: [{ key: "A", revisionId: 1, weight: 40 }, { key: "B", revisionId: 2, weight: 30 }, { key: "C", revisionId: 3, weight: 30 }] };

test("assignment is stable for a visitor and test", async () => {
  const first = await assign("visitor-1", experiment);
  for (let i = 0; i < 5; i++) assert.equal((await assign("visitor-1", experiment)).key, first.key);
});

test("assignment follows the weights within sampling noise", async () => {
  const counts: Record<string, number> = { A: 0, B: 0, C: 0 };
  const n = 6000;
  for (let i = 0; i < n; i++) counts[(await assign(`v-${i}`, experiment)).key]++;
  for (const v of experiment.variants) assert.ok(Math.abs(counts[v.key] / n - v.weight / 100) < 0.03, `${v.key}: ${counts[v.key] / n}`);
});

test("a different test key reshuffles the same visitors", async () => {
  let same = 0;
  for (let i = 0; i < 500; i++) if ((await assign(`v-${i}`, experiment)).key === (await assign(`v-${i}`, { ...experiment, key: "t-2" })).key) same++;
  assert.ok(same < 400, "assignments should be independent between tests");
});

test("cookie parsing never throws and variant paths keep the real path", () => {
  assert.deepEqual(readArms("not json"), {});
  assert.deepEqual(readArms(undefined), {});
  assert.equal(variantPath(7, "/"), "/xv/7");
  assert.equal(variantPath(7, "/mcp"), "/xv/7/mcp");
});

const draft = (data: Record<string, unknown>) => ({ data }) as any;

test("launch needs a hypothesis, a rollback plan and a future review date", () => {
  assert.equal(launchGaps(draft({})).length, 3);
  const ok = { hypothesis: "Naming the outcome raises prompt copies.", rollbackPlan: "Stop the test.", reviewBy: new Date(Date.now() + 864e5).toISOString().slice(0, 10) };
  assert.deepEqual(launchGaps(draft(ok)), []);
  assert.equal(launchGaps(draft({ ...ok, reviewBy: "2020-01-01" })).length, 1);
  assert.equal(launchGaps(draft({ ...ok, hypothesis: "short" })).length, 1);
});
