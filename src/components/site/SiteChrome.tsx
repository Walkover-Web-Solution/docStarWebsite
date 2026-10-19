import Link from "next/link";
import { SITE } from "@/content/site";
import s from "./chrome.module.css";

export function Wordmark() {
  return (
    <Link href="/" className={s.logo} aria-label="DocStar home">
      docstar<span className={s.caret}>_</span>
    </Link>
  );
}

export function SiteNav() {
  return (
    <header className={s.nav}>
      <div className={s.navInner}>
        <Wordmark />
        <nav className={s.links} aria-label="Main">
          {SITE.nav.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className={s.navCta}>
          <a href={SITE.signIn.href} className={s.signin} data-cta="nav-signin">
            {SITE.signIn.label}
          </a>
          <a href={SITE.start.href} className={s.start} data-cta="nav-start">
            {SITE.start.label}
          </a>
          <details className={s.menu}>
            <summary aria-label="Menu">
              <span />
              <span />
            </summary>
            <nav className={s.menuPanel} aria-label="Mobile">
              {SITE.nav.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
              <a href={SITE.signIn.href}>{SITE.signIn.label}</a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className={s.footerInner}>
        <div className={s.footerBrand}>
          <Wordmark />
          <p>{SITE.tagline}</p>
        </div>
        {SITE.footer.map((col) => (
          <div key={col.title} className={s.footerCol}>
            <p className={s.footerTitle}>{col.title}</p>
            <ul>
              {col.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className={s.copy}>© {new Date().getFullYear()} DocStar</p>
    </footer>
  );
}
