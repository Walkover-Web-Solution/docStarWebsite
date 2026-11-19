// Google Fonts sometimes serves extensionless /l/font?kit=… URLs; Next 15.5.x crashes on them
// (vercel/next.js#99114). Patch the compiled loader after npm ci so CI builds stay deterministic.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const loader = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "node_modules/next/dist/compiled/@next/font/dist/google/loader.js",
);

if (!fs.existsSync(loader)) process.exit(0);

const before = 'const ext = /\\.(woff|woff2|eot|ttf|otf)$/.exec(googleFontFileUrl)[1];';
const after = 'const ext = /\\.(woff|woff2|eot|ttf|otf)$/.exec(googleFontFileUrl)?.[1] ?? "woff2";';

let src = fs.readFileSync(loader, "utf8");
if (src.includes(before)) {
  fs.writeFileSync(loader, src.replace(before, after));
} else if (!src.includes(after)) {
  console.warn("patch-next-google-font: loader pattern not found; skipping");
}