"use client";

import { useEffect, useState } from "react";

// Minimal toasts for the admin: toast.success("…") / toast.error("…") and one <Toaster /> in the shell.
type Toast = { id: number; kind: "success" | "error"; text: string };

let listeners: ((t: Toast) => void)[] = [];
let next = 1;
const push = (kind: Toast["kind"], text: string) => listeners.forEach((l) => l({ id: next++, kind, text }));

export const toast = {
  success: (text: string) => push("success", text),
  error: (text: string) => push("error", text),
};

export function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => {
    const add = (t: Toast) => {
      setItems((list) => [...list, t]);
      setTimeout(() => setItems((list) => list.filter((x) => x.id !== t.id)), t.kind === "error" ? 6000 : 3500);
    };
    listeners.push(add);
    return () => {
      listeners = listeners.filter((l) => l !== add);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 grid max-w-[calc(100vw-32px)] gap-2" role="status" aria-live="polite">
      {items.map((t) => (
        <p key={t.id} className={`pointer-events-auto rounded-lg border-[1.5px] border-[var(--ink)] px-3 py-2 text-sm shadow-[2px_2px_0_var(--ink)] ${t.kind === "error" ? "bg-[#ffe1dc]" : "bg-[var(--lime)]"}`}>
          {t.text}
        </p>
      ))}
    </div>
  );
}
