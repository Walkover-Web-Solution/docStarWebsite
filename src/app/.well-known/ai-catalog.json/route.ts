import { aiCatalog } from "@/lib/aiCatalog";

const HEADERS = {
  "Content-Type": "application/ai-catalog+json; charset=utf-8",
  "Cache-Control": "public, max-age=300",
};

export async function GET() {
  return Response.json(aiCatalog(), { headers: HEADERS });
}