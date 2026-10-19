import type {
  AgentReadableSection,
  CardsSection,
  PricingSection,
  ProseSection,
  ChannelsSection,
  CtaSection,
  FaqSection,
  HeroSection,
  HubSection,
  PillarsSection,
  StepsSection,
  WorksWithSection,
} from "@/content/types";
import CtaButton from "../ui/CtaButton";
import Markdown from "../ui/Markdown";
import RichText from "../ui/RichText";
import RunLog from "../ui/RunLog";
import SectionHead from "../ui/SectionHead";
import s from "./sections.module.css";

export function Hero({ section: x }: { section: HeroSection }) {
  return (
    <section className={`${s.wrap} ${s.hero}`} data-section={x.key} data-visual={x.run || x.code ? undefined : "none"}>
      <div className={s.heroCopy}>
        <p className={s.kicker}>{x.kicker}</p>
        <h1 className={s.h1}>
          <RichText text={x.title} />
        </h1>
        <p className={s.heroSub}>{x.sub}</p>
        <div className={s.ctas}>
          <CtaButton cta={x.primary} id="hero-primary" placement={x.key} />
          {x.secondary && <CtaButton cta={x.secondary} variant="link" id="hero-secondary" placement={x.key} />}
        </div>
        {x.works && <p className={s.works}>{x.works}</p>}
      </div>
      {x.run && <RunLog {...x.run} />}
      {!x.run && x.code && (
        <figure className={s.codePanel}>
          <figcaption className={s.codePanelHead}>{x.code.title}</figcaption>
          <pre>{x.code.body}</pre>
        </figure>
      )}
    </section>
  );
}

export function WorksWith({ section: x }: { section: WorksWithSection }) {
  return (
    <section className={s.strip} data-section={x.key} aria-label={x.label}>
      <div className={s.stripInner}>
        <span className={s.stripLabel}>{x.label}</span>
        <ul className={s.stripList}>
          {x.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Steps({ section: x }: { section: StepsSection }) {
  return (
    <section id={x.key} className={s.wrap} data-section={x.key}>
      <SectionHead kicker={x.kicker} title={x.title} sub={x.sub} />
      <ol className={s.steps}>
        {x.steps.map((step, i) => (
          <li key={step.title} className={s.card}>
            <span className={s.stepNo}>{i + 1}</span>
            <h3 className={s.h3}>{step.title}</h3>
            <p className={s.body}>{step.body}</p>
            {step.code && <pre className={s.code}>{step.code}</pre>}
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Channels({ section: x }: { section: ChannelsSection }) {
  return (
    <section id={x.key} className={s.wrap} data-section={x.key}>
      <SectionHead kicker={x.kicker} title={x.title} sub={x.sub} />
      <ul className={s.channels}>
        {x.items.map((c) => (
          <li key={c.name} className={s.card}>
            <p className={s.reader}>{c.reader}</p>
            <h3 className={s.h3}>{c.name}</h3>
            <p className={s.body}>{c.body}</p>
            <code className={s.sample}>{c.sample}</code>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Pillars({ section: x }: { section: PillarsSection }) {
  return (
    <section id={x.key} className={s.band} data-section={x.key}>
      <div className={s.wrapInner}>
        <SectionHead kicker={x.kicker} title={x.title} sub={x.sub} />
        <ul className={s.pillars}>
          {x.items.map((p) => (
            <li key={p.feature} className={s.pillar} data-feature={p.feature}>
              <span className={s.glyph} aria-hidden>
                {p.glyph}
              </span>
              <div>
                <h3 className={s.h3}>{p.title}</h3>
                <p className={s.body}>{p.body}</p>
                {p.points && (
                  <ul className={s.points}>
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Hub({ section: x }: { section: HubSection }) {
  return (
    <section id={x.key} className={`${s.wrap} ${s.split}`} data-section={x.key}>
      <div>
        <SectionHead kicker={x.kicker} title={x.title} sub={x.sub} />
        <div className={s.ctas}>
          <CtaButton cta={x.primary} variant="ink" id="hub-primary" placement={x.key} />
          {x.secondary && <CtaButton cta={x.secondary} variant="link" id="hub-secondary" placement={x.key} />}
        </div>
      </div>
      <RunLog title={x.run.title} lines={x.run.lines} animate={false} />
    </section>
  );
}

export function AgentReadable({ section: x }: { section: AgentReadableSection }) {
  return (
    <section id={x.key} className={`${s.wrap} ${s.split}`} data-section={x.key}>
      <SectionHead kicker={x.kicker} title={x.title} sub={x.sub} />
      <div className={s.terms}>
        {x.commands.map((c) => (
          <div key={c.cmd} className={s.term}>
            <p className={s.cmd}>
              <span aria-hidden>$ </span>
              {c.cmd}
            </p>
            <pre className={s.output}>{c.output}</pre>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Faq({ section: x }: { section: FaqSection }) {
  return (
    <section id={x.key} className={`${s.wrap} ${s.faqWrap}`} data-section={x.key}>
      <SectionHead kicker={x.kicker} title={x.title} />
      <div className={s.faq}>
        {x.items.map((item) => (
          <details key={item.q} className={s.qa}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function FinalCta({ section: x }: { section: CtaSection }) {
  return (
    <section className={s.wrap} data-section={x.key}>
      <div className={s.finalCta}>
        <h2 className={s.finalTitle}>
          <RichText text={x.title} />
        </h2>
        {x.sub && <p className={s.finalSub}>{x.sub}</p>}
        <div className={s.ctas}>
          <CtaButton cta={x.primary} variant="ink" id="final-primary" placement={x.key} />
          {x.secondary && <CtaButton cta={x.secondary} variant="link" id="final-secondary" placement={x.key} />}
        </div>
      </div>
    </section>
  );
}

export function Cards({ section: x }: { section: CardsSection }) {
  return (
    <section id={x.key} className={s.wrap} data-section={x.key}>
      <SectionHead kicker={x.kicker} title={x.title} sub={x.sub} />
      <ul className={s.cards} data-columns={x.columns || 3}>
        {x.items.map((item, i) => (
          <li key={item.title} className={`${s.card} ${s.cardFlex}`}>
            {item.label && <p className={s.reader}>{item.label}</p>}
            <h3 className={s.h3}>{item.title}</h3>
            <p className={s.body}>{item.body}</p>
            {item.code && <pre className={s.code}>{item.code}</pre>}
            {item.cta && (
              <div className={s.cardCta}>
                <CtaButton cta={item.cta} variant={item.cta.kind === "link" ? "link" : "ink"} id={`${x.key}-${i + 1}`} placement={x.key} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Pricing({ section: x }: { section: PricingSection }) {
  return (
    <section id={x.key} className={s.wrap} data-section={x.key}>
      <header className={s.pricingHead}>
        <h1 className={s.h1}>
          <RichText text={x.title} />
        </h1>
        {x.sub && <p className={s.heroSub}>{x.sub}</p>}
      </header>
      <div className={s.freePlan}>
        <div>
          <h2 className={s.h3}>{x.free.title}</h2>
          <p className={s.body}>{x.free.sub}</p>
          {x.free.link && (
            <div className={s.cardCta}>
              <CtaButton cta={x.free.link} variant="link" id="pricing-free-link" placement={x.key} />
            </div>
          )}
        </div>
        <ul className={s.checks}>
          {x.free.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
      <ul className={s.plans}>
        {x.plans.map((plan) => (
          <li key={plan.title} className={`${s.card} ${s.cardFlex}`} data-highlight={plan.highlight || undefined}>
            <h3 className={s.h3}>{plan.title}</h3>
            <p className={s.price}>
              {plan.price} {plan.priceNote && <span>{plan.priceNote}</span>}
            </p>
            <p className={s.body}>{plan.description}</p>
            <ul className={s.checks}>
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className={s.cardCta}>
              <CtaButton cta={plan.cta} variant={plan.highlight ? "primary" : "ink"} id={`pricing-${plan.title.toLowerCase()}`} placement={x.key} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Prose({ section: x }: { section: ProseSection }) {
  return (
    <section className={`${s.wrap} ${s.prose}`} data-section={x.key}>
      <Markdown body={x.body} />
    </section>
  );
}
