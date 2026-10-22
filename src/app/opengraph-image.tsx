import { ImageResponse } from "next/og";

// Share image for every page (link previews in Slack, X, LinkedIn…), in the site's style.
export const alt = "DocStar: your agent writes the docs. Every agent can use them.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#f7f7f2", color: "#0e0e0c", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
          docstar<span style={{ background: "#d8f347" }}>_</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>
          <span>Your agent writes the docs.</span>
          <span style={{ display: "flex" }}>
            <span style={{ background: "#d8f347", padding: "0 10px", marginLeft: -10 }}>Every agent</span>
            <span style={{ marginLeft: 22 }}>can use them.</span>
          </span>
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
