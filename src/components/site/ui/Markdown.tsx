import { Fragment, type ReactNode } from "react";
import s from "./ui.module.css";

// Minimal, safe markdown for long-form content (legal pages, support): # headings,
// paragraphs, "- " lists, [links](url), **bold** and `code`. Never renders raw HTML.

const SAFE_HREF = /^(https?:\/\/|\/|#|mailto:)/;

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(<Fragment key={`${keyBase}-t${i}`}>{text.slice(last, m.index)}</Fragment>);
    if (m[1] !== undefined) {
      const href = SAFE_HREF.test(m[2]) ? m[2] : "#";
      out.push(
        <a key={`${keyBase}-a${i}`} href={href} className={s.mdLink} {...(href.startsWith("http") ? { rel: "noopener" } : {})}>
          {m[1]}
        </a>
      );
    } else if (m[3] !== undefined) out.push(<strong key={`${keyBase}-b${i}`}>{m[3]}</strong>);
    else out.push(<code key={`${keyBase}-c${i}`}>{m[4]}</code>);
    last = re.lastIndex;
    i++;
  }
  if (last < text.length) out.push(<Fragment key={`${keyBase}-end`}>{text.slice(last)}</Fragment>);
  return out;
}

export default function Markdown({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\s*\n/);
  const nodes: ReactNode[] = [];
  let list: string[] = [];
  const flushList = (key: string) => {
    if (!list.length) return;
    nodes.push(
      <ul key={key} className={s.mdList}>
        {list.map((item, i) => (
          <li key={i}>{inline(item, `${key}-${i}`)}</li>
        ))}
      </ul>
    );
    list = [];
  };

  blocks.forEach((block, bi) => {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.every((l) => l.startsWith("- "))) {
      list.push(...lines.map((l) => l.slice(2)));
      return;
    }
    flushList(`l${bi}`);
    const heading = /^(#{1,3})\s+(.*)$/.exec(lines[0]);
    if (heading && lines.length === 1) {
      const level = heading[1].length;
      const content = inline(heading[2], `h${bi}`);
      nodes.push(level === 1 ? <h1 key={bi} className={s.mdH1}>{content}</h1> : level === 2 ? <h2 key={bi} className={s.mdH2}>{content}</h2> : <h3 key={bi} className={s.mdH3}>{content}</h3>);
      return;
    }
    nodes.push(
      <p key={bi} className={s.mdP}>
        {inline(lines.join(" "), `p${bi}`)}
      </p>
    );
  });
  flushList("l-end");
  return <div className={s.md}>{nodes}</div>;
}
