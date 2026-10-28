// /home is the homepage and nothing else. Same content, title, canonical (/) and markdown twin (/index.md).
// Route config has to live in this file; re-exports are not picked up.
export const dynamic = "force-dynamic";

export { default, generateMetadata } from "../page";
