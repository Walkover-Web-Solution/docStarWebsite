import { buildLlmsTxt } from "@/server/llmsTxt";

// Read from the database on every request (cached for a minute), so admin edits reach agents.
export const dynamic = "force-dynamic";

export const revalidate = 60;

// llms.txt for docstar.io, generated from the same content as the pages.
export async function GET() {
  const body = await buildLlmsTxt();
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
}