import RichText from "./RichText";
import s from "./ui.module.css";

export default function SectionHead({ kicker, title, sub, center }: { kicker?: string; title: string; sub?: string; center?: boolean }) {
  return (
    <header className={s.head} data-center={center || undefined}>
      {kicker && <p className={s.kicker}>{kicker}</p>}
      <h2 className={s.h2}>
        <RichText text={title} />
      </h2>
      {sub && <p className={s.sub}>{sub}</p>}
    </header>
  );
}
