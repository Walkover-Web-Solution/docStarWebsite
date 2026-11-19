import { SITE_URL } from "@/lib/site";

const PROFILE = "https://www.rfc-editor.org/info/rfc9727";

// RFC 9727: agents discover public APIs on this host via /.well-known/api-catalog.
export async function GET() {
  const body = {
    linkset: [
      {
        anchor: `${SITE_URL}/api/`,
        "service-desc": [{ href: `${SITE_URL}/openapi.json`, type: "application/vnd.oai.openapi+json" }],
        "service-doc": [
          { href: `${SITE_URL}/llms.txt`, type: "text/plain; charset=utf-8" },
          { href: `${SITE_URL}/agents.md`, type: "text/markdown" },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": `application/linkset+json; profile="${PROFILE}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}