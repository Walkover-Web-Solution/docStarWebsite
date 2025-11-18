/**
 * Injects the DocStar Knowledge Base widget into the page by loading the remote embed script
 * and seeding it with default content. The component is intentionally client-only due to DOM usage.
 */
import { useEffect } from "react";

declare global {
  // Extend the window interface with helpers exposed by the DocStar embed script.
  interface Window {
    sendDataToDocstar: (data: {
      parentId: string;
      page_id: string;
      defaultOpen:boolean;
      content?: string;
    }) => void;
    sendUpdateToDocstar: (data: {
      page_id: string;
      content: string;
    }) => void;
  }
}

/**
 * Mounts the DocStar embed script and configures the widget to open with sample content.
 * Returns the container element that the script hydrates after it loads.
 */
export default function DocStarEmbed() {
  useEffect(() => {
    // Dynamically create the embed script so it only loads in browsers and avoids double-injection.
    const script = document.createElement("script");
    script.id = "docstar-main-script";
    script.setAttribute("defaultOpen", "true");
    script.src = "https://techdoc.walkover.in/scriptProd.js";
    script.setAttribute("embedToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdfaWQiOiIyMDcwOSIsImNvbGxlY3Rpb25faWQiOiI4MWt0bGNYTUkyZFUiLCJ1c2VyX2lkIjoiVXNlcklkIn0.kt7l7TI4BvRP76mXmW-VnJwJhPGqU9HgYcu_a1puT4g");

    script.onload = () => {
      if (window.sendDataToDocstar) {
        // Seed the widget with a default welcome message once the script is ready.
        window.sendDataToDocstar({
          parentId: "parentId",
          page_id: "website",
          defaultOpen: true,
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
      // The embed script targets this element by ID and fills it with the hosted documentation UI.
    ></div>
  );
}
