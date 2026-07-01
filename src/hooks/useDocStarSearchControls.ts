"use client";

import { useEffect } from "react";

/**
 * Custom observer to inject Close and Open-in-New-Tab buttons 
 * into the Search SDK iframe container.
 */
export const useDocStarSearchControls = () => {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of Array.from(mutation.addedNodes)) {
          if (node instanceof HTMLElement) {
            const iframe = node.tagName === "IFRAME" ? (node as HTMLIFrameElement) : node.querySelector("iframe");
            if (iframe) {
              // Exclude known internal/non-search iframes (like the Cal.com scheduler)
              if (iframe.src.includes("cal.com")) continue;

              const parent = iframe.parentElement;
              if (parent && !parent.querySelector(".docstar-custom-controls")) {
                const controls = document.createElement("div");
                controls.className = "docstar-custom-controls";
                controls.style.cssText = `
                  position: absolute;
                  top: 16px;
                  left: -30px;
                  z-index: 2147483647;
                  gap: 8px;
                `;

                if (parent === document.body) {
                  controls.style.position = "fixed";
                } else if (window.getComputedStyle(parent).position === "static") {
                  parent.style.position = "relative";
                }

                // Open in New Tab Button
                const newTabBtn = document.createElement("button");
                newTabBtn.title = "Open in New Tab";
                newTabBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';
                newTabBtn.className = "flex items-center justify-center w-[30px] h-[30px] rounded-lg border-none cursor-pointer transition-all duration-200 ease-in-out backdrop-blur-sm shadow-sm mb-1 hover:scale-105 bg-[var(--theme-color)] text-[var(--theme-text)]";
                newTabBtn.onclick = () => {
                  if (iframe.src) window.open(iframe.src, "_blank");
                };

                // Close Button
                const closeBtn = document.createElement("button");
                closeBtn.title = "Close Sidebar";
                closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
                closeBtn.className = "flex items-center justify-center w-[30px] h-[30px] rounded-lg border-none cursor-pointer transition-all duration-200 ease-in-out backdrop-blur-sm shadow-sm hover:scale-105 bg-[var(--theme-color)] text-[var(--theme-text)] hover:!bg-red-500 hover:!text-white";
                closeBtn.onclick = () => {
                  try {
                    // 1. Try SDK's native close method if available
                    if (typeof window !== "undefined" && (window as any).DocStarSearch && typeof (window as any).DocStarSearch.close === "function") {
                      (window as any).DocStarSearch.close();
                    }
                    
                    // 2. Dispatch an Escape key event, which search SDKs often use to close modals
                    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", keyCode: 27, bubbles: true }));
                    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", keyCode: 27, bubbles: true }));
                    
                    // 3. Safely hide the container visually WITHOUT destroying it.
                    let topNode: HTMLElement | null = iframe;
                    while (topNode && topNode.parentElement && topNode.parentElement !== document.body) {
                      topNode = topNode.parentElement;
                    }
                    if (topNode && topNode !== document.body) {
                      topNode.style.opacity = "0";
                      topNode.style.pointerEvents = "none";
                      topNode.style.transition = "opacity 0.2s";

                      // Listen for the next Cmd+K / Ctrl+K press to restore its visibility 
                      const restoreVisibility = (e: KeyboardEvent) => {
                        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                          topNode!.style.opacity = "1";
                          topNode!.style.pointerEvents = "auto";
                          window.removeEventListener("keydown", restoreVisibility);
                        }
                      };
                      window.addEventListener("keydown", restoreVisibility);
                    }
                  } catch (e) {
                    console.error("Failed to close DocStar search sidebar", e);
                  }
                };

                controls.appendChild(newTabBtn);
                controls.appendChild(closeBtn);
                parent.appendChild(controls);
              }
            }
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
};
