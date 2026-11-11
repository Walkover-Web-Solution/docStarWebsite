import type { NoteLink as NoteLinkContent } from "@/content/types";
import s from "./ui.module.css";

// A plain text link under copy: no border, no shadow, muted, smaller than the section's CTAs, so it
// reads as an aside rather than a second button. Rendered as a plain <a href> with no rel, so the
// link carries no nofollow. `data-cta` lets analytics see it like any other link.
export default function NoteLink({ link, id, placement }: { link: NoteLinkContent; id?: string; placement?: string }) {
  return (
    <p className={s.note}>
      <a href={link.href} data-cta={id} data-placement={placement}>
        {link.label}
      </a>
    </p>
  );
}
