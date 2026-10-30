"use client";

import { useState } from "react";
import type { LlmsReport } from "@/server/llmsCheck";
import s from "./tools.module.css";

const ICON = { pass: "✓", warn: "!", fail: "✕" } as const;
const WORD = { pass: "Pass", warn: "Warning", fail: "Fail" } as const;

// The llms.txt checker form. Results are announced to screen readers through the live region.
export default function LlmsChecker() {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<LlmsReport | null>(null);

  async function check(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setReport(null);
    try {
      const res = await fetch(`/api/tools/llms-check?url=${encodeURIComponent(url)}`);
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "The check failed.");
      setReport(body);
    } catch (err) {
      setError((err as Error).message || "The check failed.");
    } finally {
      setBusy(false);
    }
  }

  const failed = report?.checks.filter((c) => c.status === "fail").length ?? 0;
  const warned = report?.checks.filter((c) => c.status === "warn").length ?? 0;

  return (
    <div className={s.tool}>
      <form className={s.form} onSubmit={check}>
        <label htmlFor="llms-url" className={s.label}>
          Website or docs address
        </label>
        <div className={s.row}>
          <input id="llms-url" name="url" type="text" inputMode="url" autoComplete="url" placeholder="docs.acme.com" required value={url} onChange={(e) => setUrl(e.target.value)} className={s.input} />
          <button type="submit" className={s.button} disabled={busy} data-cta="llms-check" data-placement="tool">
            {busy ? "Checking…" : "Check llms.txt"}
          </button>
        </div>
      </form>
      <div role="status" aria-live="polite" className={s.result}>
        {error && <p className={s.error}>{error}</p>}
        {report && (
          <>
            <p className={s.summary}>
              <a href={report.llmsUrl} rel="noopener nofollow">
                {report.llmsUrl}
              </a>
              : {failed ? `${failed} problem${failed === 1 ? "" : "s"}` : "no problems"}
              {warned ? `, ${warned} suggestion${warned === 1 ? "" : "s"}` : ""}.
            </p>
            <ul className={s.checks}>
              {report.checks.map((c) => (
                <li key={c.id} data-status={c.status}>
                  <span className={s.icon} aria-hidden>
                    {ICON[c.status]}
                  </span>
                  <span>
                    <strong>
                      <span className={s.sr}>{WORD[c.status]}: </span>
                      {c.label}
                    </strong>
                    <span className={s.detail}>{c.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
