// Sign-in for docstar.io/admin. The website has no login of its own: it borrows the DocStar app's.
// "Sign in" opens app.docstar.io/admin-bridge in a popup; if you're signed in to the app it posts
// your token back here (only to this origin) and closes. The token is kept for this tab only.
// hitman-api decides whether the account is a DocStar admin.

export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://app.docstar.io").replace(/\/$/, "");
const KEY = "ds_admin_token";

export function getToken(): string | null {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function clearToken() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {}
}

export function signIn(): Promise<string> {
  return new Promise((resolve, reject) => {
    const appOrigin = new URL(APP_URL).origin;
    const url = `${APP_URL}/admin-bridge?origin=${encodeURIComponent(window.location.origin)}`;
    const popup = window.open(url, "docstar-admin-sign-in", "width=520,height=680");
    if (!popup) return reject(new Error("Allow pop-ups for this site to sign in."));

    const done = (fn: () => void) => {
      window.removeEventListener("message", onMessage);
      clearInterval(closed);
      fn();
    };
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== appOrigin || e.data?.type !== "docstar-admin-token" || typeof e.data.token !== "string") return;
      try {
        sessionStorage.setItem(KEY, e.data.token);
      } catch {}
      done(() => resolve(e.data.token));
    };
    // The popup closed without sending a token (cancelled, or the login flow lost the opener).
    const closed = setInterval(() => {
      if (popup.closed) done(() => reject(new Error("Sign-in window closed. If you just signed in to DocStar, click Sign in again.")));
    }, 500);
    window.addEventListener("message", onMessage);
  });
}
