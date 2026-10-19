import type { RunLine } from "@/content/types";
import s from "./ui.module.css";

// A printed agent run: the hero visual and the integrator example.
export default function RunLog({ title, time, lines, summary, animate = true }: { title: string; time?: string; lines: RunLine[]; summary?: string; animate?: boolean }) {
  const step = 0.32;
  return (
    <figure className={s.log} data-animate={animate || undefined} aria-label="What the agent does">
      <figcaption className={s.logHead}>
        <span>{title}</span>
        {time && <span>{time}</span>}
      </figcaption>
      <ol className={s.lines}>
        {lines.map((l, i) => (
          <li key={i} className={s.line} style={{ animationDelay: `${0.25 + i * step}s` }} data-who={l.who}>
            <span className={s.who}>{l.who}</span>
            <span className={s.text}>{l.text}</span>
            {l.done && (
              <span className={s.done} aria-label="done">
                ✓
              </span>
            )}
          </li>
        ))}
      </ol>
      {summary && (
        <p className={s.summary} style={{ animationDelay: `${0.35 + lines.length * step}s` }}>
          {summary}
        </p>
      )}
    </figure>
  );
}
