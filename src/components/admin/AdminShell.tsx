"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMe, login, logout, setSignedOutHandler, type Me } from "@/lib/admin/api";
import { Toaster } from "./toast";

// DocStar admin, on the website: overview, knowledge, research, analyses, website content and experiments,
// analytics, ideas & feedback, settings.
// Team members sign in with the email and password made by `npm run admin:user`.
const TABS = [
  { href: "/admin", label: "Overview", match: (p: string) => p === "/admin" },
  { href: "/admin/knowledge", label: "Knowledge", match: (p: string) => p.startsWith("/admin/knowledge") },
  { href: "/admin/research", label: "Research", match: (p: string) => p.startsWith("/admin/research") },
  { href: "/admin/analyses", label: "Analyses", match: (p: string) => p.startsWith("/admin/analyses") },
  { href: "/admin/website", label: "Website & experiments", match: (p: string) => p.startsWith("/admin/website") },
  { href: "/admin/analytics", label: "Analytics", match: (p: string) => p.startsWith("/admin/analytics") },
  { href: "/admin/ideas", label: "Ideas & feedback", match: (p: string) => p.startsWith("/admin/ideas") },
  { href: "/admin/settings", label: "Settings", match: (p: string) => p.startsWith("/admin/settings") },
];

type State = "checking" | "signed-out" | "ready";

function Logo() {
  return (
    <Link href="/" className="font-mono text-lg font-semibold no-underline">
      docstar<span className="bg-[var(--lime)]">_</span>
      <span className="ml-2 rounded bg-[var(--ink)] px-1.5 py-0.5 align-middle font-sans text-[11px] uppercase tracking-wide text-[var(--card)]">admin</span>
    </Link>
  );
}

function SignIn({ onSignedIn }: { onSignedIn: (me: Me) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      onSignedIn(await login(email, password));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const input = "box-border w-full rounded-lg border border-[var(--a-border)] px-3 py-2 text-sm";
  return (
    <div className="px-4">
      <form onSubmit={submit} className="a-card mx-auto mt-24 grid max-w-sm gap-3 p-6">
        <Logo />
        <h1 className="text-xl font-bold">Sign in</h1>
        <label className="grid gap-1 text-xs font-medium text-[var(--a-muted)]">
          Email
          <input id="admin-email" className={input} type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="grid gap-1 text-xs font-medium text-[var(--a-muted)]">
          Password
          <input id="admin-password" className={input} type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <p className="text-sm text-red-700">{error}</p>}
        <div>
          <button type="submit" className="btn btn-primary" disabled={busy || !email || !password}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </div>
        <p className="text-xs text-[var(--a-muted)]">No account? Ask a teammate to run <code>npm run admin:user</code> for you.</p>
      </form>
    </div>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [state, setState] = useState<State>("checking");
  const [me, setMe] = useState<Me | null>(null);

  const check = useCallback(() => {
    getMe()
      .then((m) => (setMe(m), setState("ready")))
      .catch(() => setState("signed-out"));
  }, []);

  useEffect(() => {
    setSignedOutHandler(() => setState("signed-out"));
    check();
  }, [check]);

  const signOut = async () => {
    await logout().catch(() => {});
    setMe(null);
    setState("signed-out");
  };

  let body: React.ReactNode;
  if (state === "checking") {
    body = <p className="p-10 text-sm text-[var(--a-muted)]">Checking sign-in…</p>;
  } else if (state === "signed-out") {
    body = (
      <SignIn
        onSignedIn={(m) => {
          setMe(m);
          setState("ready");
        }}
      />
    );
  } else {
    body = (
      <>
        <header className="sticky top-0 z-20 border-b-[1.5px] border-[var(--ink)] bg-[var(--bg)]">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
            <Logo />
            <nav className="flex flex-wrap gap-4 text-sm">
              {TABS.map((t) => (
                <Link key={t.href} href={t.href} className={`no-underline ${t.match(pathname) ? "bg-[var(--lime)] px-1 font-semibold" : "text-[var(--a-muted)] hover:text-[var(--ink)]"}`}>
                  {t.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-3 text-xs text-[var(--a-muted)]">
              {me && <span className="hidden sm:inline">{me.email}</span>}
              <button type="button" className="underline" onClick={signOut}>
                Sign out
              </button>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-[1400px] px-4 py-6">{children}</main>
      </>
    );
  }

  return (
    <>
      {body}
      <Toaster />
    </>
  );
}
