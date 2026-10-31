import Link from "next/link";
import { PATH_TO_SLUG } from "@/content/pages";
import { SITE } from "@/content/site";
import s from "./chrome.module.css";

// A link to a website page that isn't live yet (src/content/pages.ts DRAFT_PAGES) is left out, so the
// footer never points at a 404. Files (.md, .txt) and other sites are always shown.
const isLive = (href: string) => !href.startsWith("/") || /\.(md|txt)$/.test(href) || href in PATH_TO_SLUG;

export function SkipLink() {
  return (
    <a href="#main" className={s.skip}>
      Skip to content
    </a>
  );
}

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
          <nav key={col.title} className={s.footerCol} aria-labelledby={`footer-${col.title.toLowerCase()}`}>
            <h2 id={`footer-${col.title.toLowerCase()}`} className={s.footerTitle}>
              {col.title}
            </h2>
            <ul>
              {col.links.filter((l) => isLive(l.href)).map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className={s.copy}>
        <p>© {new Date().getFullYear()} DocStar</p>
        <ul className={s.social} aria-label="DocStar elsewhere">
          <li>
            <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>
          </li>
          {SITE.social.map((l) => (
            <li key={l.href}>
              <a href={l.href} rel="me noopener">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
