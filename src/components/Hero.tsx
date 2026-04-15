"use client";

import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  CheckCircle2,
  Layers3,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import DocsTemplatesSection from "./FeatureMain";
import MotionWrapper from "./motion/MotionDivWrapper";
import { HeroImage } from "@/types/data-types";
import AppsMarquee from "./AppsMarquee";

interface HeroProps {
  heroImages: HeroImage[];
}

const Hero = ({ heroImages }: HeroProps) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const headlineWords = ["teams", "creators", "developers"];
  const [index, setIndex] = useState(0);
  const [showScheduler, setShowScheduler] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlineWords.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showScheduler) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [showScheduler]);

  const openScheduler = () => setShowScheduler(true);
  const closeScheduler = () => setShowScheduler(false);

  const heroCards = useMemo(
    () =>
      heroImages
        ?.flatMap((hero) =>
          hero.images?.map((url) => ({
            url,
            alt: hero.name,
          })) ?? []
        )
        .slice(0, 3) ?? [],
    [heroImages]
  );

  const fallbackCards = [
    {
      title: "Knowledge base",
      desc: "Ship a polished internal wiki with reusable layouts.",
    },
    {
      title: "Public docs",
      desc: "Publish product docs, changelogs, and release notes faster.",
    },
    {
      title: "AI answers",
      desc: "Turn scattered content into instant, searchable knowledge.",
    },
  ];

  const proofPoints = [
    "Docs, blogs, and FAQs in one workspace",
    "Built for collaboration and publishing",
    "AI-powered organization for growing teams",
  ];

  const stats = [
    { value: "10x", label: "faster publishing" },
    { value: "1 hub", label: "for docs, blogs & FAQs" },
    { value: "24/7", label: "knowledge availability" },
  ];

  return (
    <>
      <section
        ref={ref}
        className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(152,201,255,0.28),_transparent_32%),radial-gradient(circle_at_85%_15%,_rgba(187,247,208,0.35),_transparent_28%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_56%,_#f7f8fa_100%)]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60" />
        <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute right-[-6rem] top-16 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl" />

        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-14 px-4 pb-12 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-20">
          <div className="space-y-8">
            <MotionWrapper
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45 }}
            >
              <Sparkles className="h-4 w-4 text-sky-600" />
              Modern documentation, publishing, and AI search in one platform
            </MotionWrapper>

            <div className="space-y-5 text-slate-950">
              <MotionWrapper
                className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl"
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h1>
                  Build a living knowledge hub for
                  <span className="mx-2 inline-block min-w-[10rem] bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent sm:min-w-[12rem] lg:min-w-[16rem]">
                    {headlineWords[index]}
                  </span>
                  that ships as fast as your product.
                </h1>
              </MotionWrapper>

              <MotionWrapper
                className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.2 }}
              >
                Create beautiful docs, publish blogs, organize FAQs, and give
                your team AI-ready knowledge from a single collaborative
                workspace.
              </MotionWrapper>
            </div>

            <MotionWrapper
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              <MotionWrapper
                as="a"
                href="https://app.docstar.io/login"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-3.5 text-base font-semibold text-white shadow-[0_16px_40px_rgba(15,23,42,0.18)] transition hover:bg-slate-800"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get started for free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </MotionWrapper>

              <MotionWrapper
                as="button"
                type="button"
                onClick={openScheduler}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white/85 px-6 py-3.5 text-base font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:border-slate-950 hover:bg-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="h-4 w-4 fill-current" />
                Schedule demo
              </MotionWrapper>
            </MotionWrapper>

            <MotionWrapper
              className="grid gap-3 sm:grid-cols-3"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur"
                >
                  <p className="text-2xl font-semibold text-slate-950">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </MotionWrapper>

            <MotionWrapper
              className="flex flex-wrap gap-3 text-sm text-slate-700"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {proofPoints.map((point) => (
                <div
                  key={point}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/75 px-4 py-2 backdrop-blur"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {point}
                </div>
              ))}
            </MotionWrapper>
          </div>

          <MotionWrapper
            className="relative"
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-[0_24px_90px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:p-5">
              <div className="absolute -left-6 top-10 hidden rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-xl md:block">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-sky-100 p-2 text-sky-700">
                    <Layers3 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      From draft to published
                    </p>
                    <p className="mt-1 max-w-[11rem] text-xs leading-5 text-slate-600">
                      Collaborate on content and launch polished docs without
                      juggling tools.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-5 bottom-16 hidden rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 text-white shadow-xl md:block">
                <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                  AI-ready content
                </p>
                <p className="mt-1 text-sm font-medium">
                  Structured knowledge your team can actually use.
                </p>
              </div>

              <div className="flex items-center justify-between rounded-[1.5rem] border border-slate-200 bg-slate-950 px-5 py-4 text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/60">
                    DocStar workspace
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    One home for documentation systems
                  </p>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-300" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
                <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100">
                  {heroCards[0] ? (
                    <div className="relative aspect-[16/11] w-full">
                      <Image
                        src={heroCards[0].url}
                        alt={heroCards[0].alt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/11] items-end bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_55%,#34d399_100%)] p-6 text-white">
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-white/70">
                          Ship with confidence
                        </p>
                        <p className="mt-2 max-w-md text-2xl font-semibold leading-tight">
                          Publish beautiful product docs and internal knowledge
                          faster.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid gap-4">
                  {(heroCards.length ? heroCards.slice(1) : fallbackCards).map(
                    (card, idx) => (
                      <div
                        key={"url" in card ? card.url : card.title}
                        className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-sm"
                      >
                        {"url" in card ? (
                          <>
                            <div className="relative aspect-[16/10] w-full bg-slate-100">
                              <Image
                                src={card.url}
                                alt={card.alt}
                                fill
                                sizes="(max-width: 1024px) 100vw, 22vw"
                                className="object-cover object-top"
                              />
                            </div>
                            <div className="px-4 py-3">
                              <p className="text-sm font-semibold text-slate-900">
                                {card.alt}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                Built for teams that want cleaner publishing
                                workflows.
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="flex h-full flex-col justify-between p-4">
                            <div className="rounded-xl bg-slate-100 p-2 text-slate-700 w-fit">
                              <Layers3 className="h-4 w-4" />
                            </div>
                            <div className="mt-8">
                              <p className="text-sm font-semibold text-slate-900">
                                {card.title}
                              </p>
                              <p className="mt-1 text-xs leading-5 text-slate-500">
                                {card.desc}
                              </p>
                              <p className="mt-4 text-xs font-medium text-sky-700">
                                Section {idx + 1}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {showScheduler && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onClick={closeScheduler}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeScheduler}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close scheduler"
            >
              <X className="h-5 w-5" />
            </button>
            <iframe
              src="https://cal.com/docstar-team/30min?embed=1&hide_event_type_details=1"
              className="h-[75vh] w-full"
              loading="lazy"
              allow="camera; microphone; autoplay; encrypted-media"
            />
          </div>
        </div>
      )}

      <AppsMarquee />
      <DocsTemplatesSection />
    </>
  );
};

export default Hero;
