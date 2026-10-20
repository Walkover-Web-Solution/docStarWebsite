"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_URL, clearToken, getToken, signIn } from "@/lib/admin/auth";
import { ApiError, getAdminMe, getIdeaStats, setSignedOutHandler } from "@/lib/admin/api";
import { Toaster } from "./toast";

// DocStar admin, on the website: ideas & feedback, website content and website analytics.
// Access is decided by hitman-api (DocStar admin emails, or owners/admins of the DocStar team workspace).
const TABS = [
  { href: "/admin", label: "Ideas & feedback", match: (p: string) => p === "/admin" },
  { href: "/admin/website", label: "Website", match: (p: string) => p.startsWith("/admin/website") },
  { href: "/admin/analytics", label: "Analytics", match: (p: string) => p.startsWith("/admin/analytics") },
];

type State = "checking" | "signed-out" | "ready" | "denied" | "error";
type SignedInAs = { email?: string; workspaceName?: string; workspaceId?: string | number; roleName?: string; roleId?: number };

function Logo() {
  return (
    <Link href="/" className="font-mono text-lg font-semibold no-underline">
      docstar<span className="bg-[var(--lime)]">_</span>
      <span className="ml-2 rounded bg-[var(--ink)] px-1.5 py-0.5 align-middle font-sans text-[11px] uppercase tracking-wide text-[var(--card)]">admin</span>
    </Link>
  );
}

function Gate({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4">
      <div className="a-card mx-auto mt-24 grid max-w-md gap-3 p-6">
        <Logo />
        {children}
      </div>
    </div>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [state, setState] = useState<State>("checking");
  const [who, setWho] = useState<SignedInAs | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [signInError, setSignInError] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  const check = useCallback(() => {
    if (!getToken()) return setState("signed-out");
    setState("checking");
    getIdeaStats()
      .then(() => {
        setState("ready");
        getAdminMe()
          .then((me) => setEmail(me.email))
          .catch(() => {});
      })
      .catch((e) => {
        const signedInAs = e instanceof ApiError ? e.data?.signedInAs : null;
        // A 403 without signedInAs means the token itself wasn't accepted: sign in again.
        if (e?.status === 403 && !signedInAs) {
          clearToken();
          setSignInError("Your DocStar sign-in didn't work here. Sign in again.");
          return setState("signed-out");
        }
        setWho(signedInAs);
        setState(!getToken() ? "signed-out" : e?.status === 403 ? "denied" : "error");
      });
  }, []);

  useEffect(() => {
    setSignedOutHandler(() => setState("signed-out"));
    check();
  }, [check]);

  const startSignIn = async () => {
    setSignInError("");
    setSigningIn(true);
    try {
      await signIn();
      check();
    } catch (e: any) {
      setSignInError(e.message);
    } finally {
      setSigningIn(false);
    }
  };

  const signOut = () => {
    clearToken();
    setEmail(null);
    setState("signed-out");
  };

  let body: React.ReactNode;
  if (state === "checking") {
    body = <p className="p-10 text-sm text-[var(--a-muted)]">Checking access…</p>;
  } else if (state === "signed-out") {
    body = (
      <Gate>
        <h1 className="text-xl font-bold">Sign in</h1>
        <p className="text-sm text-[var(--a-muted)]">Use your DocStar account. A small window opens on app.docstar.io and closes once you're signed in.</p>
        <div>
          <button type="button" className="btn btn-primary" disabled={signingIn} onClick={startSignIn}>
            {signingIn ? "Waiting for sign-in…" : "Sign in with DocStar"}
          </button>
        </div>
        {signInError && <p className="text-sm text-red-700">{signInError}</p>}
      </Gate>
    );
  } else if (state === "denied" || state === "error") {
    body = (
      <Gate>
        {state === "denied" ? (
          <>
            <p className="text-sm">This account isn't a DocStar admin yet.</p>
            {who && (
              <p className="text-sm text-[var(--a-muted)]">
                Signed in as {who.email || "unknown"}, workspace {who.workspaceName || "—"} (id {who.workspaceId ?? "—"}), {who.roleName || `role ${who.roleId ?? "—"}`}.
              </p>
            )}
            <p className="text-sm text-[var(--a-muted)]">
              Admins are owners or admins of the DocStar team workspace, or emails on the admin list. Switch workspace in{" "}
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="underline">
                the app
              </a>
              , then sign in again.
            </p>
          </>
        ) : (
          <p className="text-sm text-red-700">Couldn't reach the admin API. Try again.</p>
        )}
        <div className="flex gap-2">
          <button type="button" className="btn btn-sm" onClick={check}>
            Try again
          </button>
          <button type="button" className="btn btn-sm" onClick={signOut}>
            Sign out
          </button>
        </div>
      </Gate>
    );
  } else {
    body = (
      <>
        <header className="sticky top-0 z-20 border-b-[1.5px] border-[var(--ink)] bg-[var(--bg)]">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
            <Logo />
            <nav className="flex flex-wrap gap-4 text-sm">
              {TABS.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className={`no-underline ${t.match(pathname) ? "bg-[var(--lime)] px-1 font-semibold" : "text-[var(--a-muted)] hover:text-[var(--ink)]"}`}
                >
                  {t.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-3 text-xs text-[var(--a-muted)]">
              {email && <span className="hidden sm:inline">{email}</span>}
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
