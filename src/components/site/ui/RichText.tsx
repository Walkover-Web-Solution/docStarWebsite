import { Fragment } from "react";
import s from "./ui.module.css";

// Renders ==highlighted== spans from content strings as lime marks.
export default function RichText({ text }: { text: string }) {
  const parts = text.split(/==(.+?)==/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className={s.mark}>
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

export const plainText = (text: string) => text.replace(/==(.+?)==/g, "$1");
