import s from "./ui.module.css";

// Visible trail for pages below a section. Matches the BreadcrumbList in the page's JSON-LD (src/lib/seo.ts).
export default function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className={s.crumbs}>
      <ol>
        {items.map((c, i) => (
          <li key={c.path}>
            {i < items.length - 1 ? <a href={c.path}>{c.name}</a> : <span aria-current="page">{c.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
