import Link from "next/link";
import s from "./sections/sections.module.css";
import ui from "./ui/ui.module.css";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/mcp", label: "MCP server" },
  { href: "/api-docs", label: "API docs" },
  { href: "/agents", label: "For agents" },
];

// 404 content, shared by the site's not-found pages (inside and outside the (site) layout).
export default function NotFoundBody() {
  return (
    <section className={s.wrap}>
      <p className={s.kicker}>404</p>
      <h1 className={s.h1}>
        This page <mark className={ui.mark}>doesn&apos;t exist</mark>.
      </h1>
      <p className={s.heroSub}>It may have moved when we rebuilt the site. Try one of these, or ask your agent: every page has a markdown twin listed in /llms.txt.</p>
      <div className={s.ctas}>
        {LINKS.map((l, i) => (
          <Link key={l.href} href={l.href} className={i === 0 ? ui.primary : ui.link}>
            {l.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
