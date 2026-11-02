"use client";

import { useEffect, useState } from "react";
import { toast } from "../toast";
import { listSignups } from "@/lib/admin/api";
import { StatTile } from "../analytics/charts";

// People who signed up to DocStar and finished onboarding (sent by hitman-api, which also emails them a welcome).
const when = (iso: string) => new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

export default function Signups() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setData(null);
    listSignups(page)
      .then(setData)
      .catch((e) => toast.error(e.message));
  }, [page]);

  const pages = data ? Math.max(1, Math.ceil(data.total / 50)) : 1;

  return (
    <div className="grid max-w-6xl gap-4">
      <div>
        <h1 className="text-2xl font-bold">New users</h1>
        <p className="text-sm text-[var(--a-muted)]">Everyone who signed up and created their workspace. Each one gets the welcome email.</p>
      </div>

      {!data && <p className="text-sm text-[var(--a-muted)]">Loading…</p>}

      {data && (
        <>
          <div className="grid grid-cols-3 gap-3 md:max-w-xl">
            <StatTile label="Last 7 days" value={data.last7} />
            <StatTile label="Last 30 days" value={data.last30} />
            <StatTile label="All time" value={data.total} />
          </div>

          <section className="a-card min-w-0 p-4">
            {data.items.length === 0 ? (
              <p className="text-sm text-[var(--a-muted)]">No new users yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase text-[var(--a-muted)]">
                      <th className="py-1">Joined</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Workspace</th>
                      <th>MCP URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((s: any) => (
                      <tr key={s.id} className="border-t border-[var(--a-border)]">
                        <td className="whitespace-nowrap py-1.5 pr-3 text-xs text-[var(--a-muted)]">{when(s.createdAt)}</td>
                        <td className="pr-3">{s.name}</td>
                        <td className="pr-3">
                          <a href={`mailto:${s.email}`}>{s.email}</a>
                        </td>
                        <td className="pr-3">{s.orgName || "—"}</td>
                        <td className="font-mono text-xs">
                          {s.mcpUrl ? (
                            <a href={s.mcpUrl} target="_blank" rel="noreferrer">
                              {s.slug || s.mcpUrl}
                            </a>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {pages > 1 && (
            <div className="flex items-center gap-3 text-sm">
              <button type="button" className="underline disabled:opacity-40" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                Newer
              </button>
              <span className="text-[var(--a-muted)]">
                Page {page} of {pages}
              </span>
              <button type="button" className="underline disabled:opacity-40" disabled={page >= pages} onClick={() => setPage(page + 1)}>
                Older
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
