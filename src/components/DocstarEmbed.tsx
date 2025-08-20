import { useEffect } from "react";

declare global {
  interface Window {
    sendDataToDocstar: (data: {
      parentId: string;
      page_id: string;
      content?: string;
    }) => void;
    sendUpdateToDocstar: (data: {
      page_id: string;
      content: string;
    }) => void;
  }
}

export default function DocStarEmbed() {
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "docstar-main-script";
    script.src = "https://techdoc.walkover.in/scriptProd.js";
    script.setAttribute("embedToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdfaWQiOiIyMDcwOSIsImNvbGxlY3Rpb25faWQiOiI4MWt0bGNYTUkyZFUiLCJ1c2VyX2lkIjoiVXNlcklkIn0.kt7l7TI4BvRP76mXmW-VnJwJhPGqU9HgYcu_a1puT4g");

    script.onload = () => {
      if (window.sendDataToDocstar) {
        window.sendDataToDocstar({
          parentId: "parentId",
          page_id: "website",
          content: "<h2>Hello from DocStar</h2>",
        });
      }
    };

    document.body.appendChild(script);

    // return () => {
    //   document.getElementById("docstar-main-script")?.remove();
    // };
  }, []);

//    useEffect(() => {
//     const existingScript = document.getElementById(docstarScriptId);
//     if (existingScript) {
//       document.head.removeChild(existingScript);
//     }
//     if (doctstar_embed_token) {
//       const script = document.createElement("script");
//       script.setAttribute("embedToken", doctstar_embed_token);
//       script.id = docstarScriptId;
//       script.src = docstarScriptSrc;
//       document.head.appendChild(script);
//     }
//   }, [doctstar_embed_token]);

  return (
    <div
      id="parentId"
      style={{ height: "600px", border: "1px solid #ddd" }}
    ></div>
  );
}
