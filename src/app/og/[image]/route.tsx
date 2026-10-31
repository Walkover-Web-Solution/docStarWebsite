import { ImageResponse } from "next/og";
import { PAGES, pageBySlug } from "@/content/pages";

// Share image per page (/og/<slug>.png, 1200×630), in the site's style, with the page's own headline.
// Prerendered at build from the bundled pages; src/lib/seo.ts points og:image and twitter:image here.
export const dynamic = "force-static";
export const dynamicParams = false;

export const generateStaticParams = () => PAGES.map((p) => ({ image: `${p.slug}.png` }));

const size = { width: 1200, height: 630 };

// "Your API, as an ==MCP server==." → [["Your API, as an ", false], ["MCP server", true], [".", false]]
const parts = (text: string) => text.split(/(==.+?==)/g).filter(Boolean).map((t) => [t.replace(/^==|==$/g, ""), t.startsWith("==")] as const);

export async function GET(_request: Request, { params }: { params: Promise<{ image: string }> }) {
  const slug = (await params).image.replace(/\.png$/, "");
  const page = pageBySlug(slug);
  if (!page) return new Response("Not found", { status: 404 });
  const first = page.sections[0];
  const headline = first && "title" in first ? first.title : page.meta.title.replace(/\s*\|\s*DocStar$/, "");
  const kicker = first?.type === "hero" ? first.kicker : page.label;
  const long = headline.replace(/==/g, "").length > 48;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#f7f7f2", color: "#0e0e0c", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
            docstar<span style={{ background: "#d8f347" }}>_</span>
          </div>
          {kicker && <div style={{ display: "flex", fontSize: 24, textTransform: "uppercase", letterSpacing: 2, color: "#5c5c55" }}>{kicker}</div>}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", fontSize: long ? 64 : 80, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2 }}>
          {parts(headline).map(([t, mark], i) => (
            <span key={i} style={mark ? { background: "#d8f347", padding: "0 8px" } : { whiteSpace: "pre-wrap" }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 18, fontSize: 26 }}>
          {["API docs", "llms.txt", "MCP server", "CLI"].map((t) => (
            <span key={t} style={{ padding: "8px 18px", border: "2px solid #0e0e0c", borderRadius: 12, background: "#fff", boxShadow: "4px 4px 0 #0e0e0c" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
    size
  );
}
