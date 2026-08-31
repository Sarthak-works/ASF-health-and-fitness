"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Hero card deck                                                     */
/*                                                                     */
/*  These are placeholders built from assets already in /public.       */
/*  To swap in the real Instagram slides: drop the exports into        */
/*  /public/hero-slides/ and replace `src` below — the arc maths,      */
/*  z-order and animation all derive from array position, so nothing   */
/*  else needs to change. Keep the count odd-or-even agnostic; 6–10    */
/*  cards all lay out correctly.                                       */
/* ------------------------------------------------------------------ */

type HeroCard =
  | { kind: "photo"; src: string; alt: string; caption: string }
  | { kind: "stat"; label: string; value: string; sub?: string }
  | { kind: "accent"; label: string; value: string; sub?: string }
  | { kind: "dark"; lead: string; highlight: string[] };

const HERO_CARDS: HeroCard[] = [
  {
    kind: "photo",
    src: "/testimonial-video-posters/kiran 15-5_frame-001.jpg",
    alt: "ASF client Kiran sharing her coaching experience",
    caption: "Real client stories",
  },
  {
    kind: "stat",
    label: "Coached to date",
    value: "500+",
    sub: "Clients across Dubai",
  },
  {
    kind: "dark",
    lead: "Coaching that combines",
    highlight: ["Training", "Nutrition", "Mindset"],
  },
  {
    kind: "photo",
    src: "/testimonial-video-posters/Farzan 26-5_frame-001.jpg",
    alt: "ASF client Farzan after a personal training programme",
    caption: "1-on-1 with expert coaches",
  },
  {
    kind: "accent",
    label: "Sessions delivered",
    value: "25k+",
    sub: "At home, in the gym, anywhere you train.",
  },
  {
    kind: "photo",
    src: "/testimonial-video-posters/rupesh 12-6_frame-001.jpg",
    alt: "ASF client Rupesh describing his transformation",
    caption: "12-week transformations",
  },
  {
    kind: "stat",
    label: "Average rating",
    value: "4.9",
    sub: "From verified Google reviews",
  },
  {
    kind: "photo",
    src: "/testimonial-video-posters/Satish 25-5_frame-001.jpg",
    alt: "ASF client Satish training with a coach",
    caption: "Train anywhere you like",
  },
];

/* Arc geometry — every transform below is a pure function of the card's
   normalised position `t` in [-1, 1], so the fan stays symmetrical
   regardless of how many cards the array holds. */
function arcTransform(index: number, total: number) {
  const t = total === 1 ? 0 : (index / (total - 1)) * 2 - 1;
  const distance = Math.abs(t);

  return {
    t,
    /* outer cards sit lower, tracing the rainbow curve; the -34 lift
       centres the fan in its box instead of hanging it off the baseline */
    translateY: Math.pow(distance, 1.5) * 68 - 34,
    /* cards turn to face the centre of the fan */
    rotateY: -t * 34,
    rotateZ: t * 9,
    /* and recede slightly as they go */
    translateZ: -distance * 90,
    scale: 1 - distance * 0.08,
    /* centre cards render in front */
    zIndex: 20 - Math.round(distance * 10),
  };
}

function CardFace({ card }: { card: HeroCard }) {
  switch (card.kind) {
    case "photo":
      return (
        <div className="relative h-full w-full">
          <Image
            src={card.src}
            alt={card.alt}
            fill
            sizes="200px"
            /* posters are 9:16 video stills — bias the crop to the face */
            className="object-cover object-[center_28%]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
            <p className="text-[10px] font-semibold leading-tight text-white">
              {card.caption}
            </p>
          </div>
        </div>
      );

    case "stat":
      return (
        <div className="flex h-full w-full flex-col justify-between bg-white p-4">
          <p className="text-[10px] font-medium text-gray-500">{card.label}</p>
          <div>
            <p className="font-heading text-3xl font-black leading-none text-purple">
              {card.value}
            </p>
            {card.sub && (
              <p className="mt-2 text-[10px] leading-snug text-gray-500">
                {card.sub}
              </p>
            )}
          </div>
        </div>
      );

    case "accent":
      return (
        <div className="flex h-full w-full flex-col justify-between bg-accent p-4">
          <p className="text-[10px] font-semibold text-black/60">
            {card.label}
          </p>
          <div>
            <p className="font-heading text-3xl font-black leading-none text-black">
              {card.value}
            </p>
            {card.sub && (
              <p className="mt-2 text-[10px] leading-snug text-black/70">
                {card.sub}
              </p>
            )}
          </div>
        </div>
      );

    case "dark":
      return (
        <div className="flex h-full w-full flex-col justify-center bg-[#17091f] p-4">
          <p className="text-[11px] leading-relaxed text-white/45">
            {card.lead}{" "}
            {card.highlight.map((word, i) => (
              <span key={word}>
                <span className="font-bold text-white">{word}</span>
                {i < card.highlight.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </div>
      );
  }
}

function CardArc() {
  const reduceMotion = useReducedMotion();

  return (
    /* The row is scaled down on small screens, but a CSS scale does not
       shrink the layout box — so the fan is absolutely positioned inside a
       wrapper whose height matches the *scaled* result. Otherwise the
       leftover height shows up as a large empty gap above the cards. */
    <div
      aria-hidden="true"
      className="relative mt-4 h-[120px] w-full sm:h-[155px] md:mt-8 md:h-[200px] lg:h-[222px]"
      style={{ perspective: "1600px" }}
    >
      <div
        className="absolute inset-x-0 bottom-0 flex origin-bottom items-end justify-center scale-[0.58] sm:scale-[0.7] md:scale-90 lg:scale-100"
        style={{ transformStyle: "preserve-3d" }}
      >
        {HERO_CARDS.map((card, i) => {
          const a = arcTransform(i, HERO_CARDS.length);

          return (
            /* Two elements on purpose: framer-motion animates `transform`
               on the outer wrapper, so the static 3D fan transform has to
               live on a separate inner node or it gets overwritten. */
            <motion.div
              key={i}
              initial={reduceMotion ? false : { opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: reduceMotion ? 0 : 0.75 + Math.abs(a.t) * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ zIndex: a.zIndex, transformStyle: "preserve-3d" }}
              /* the outermost pair would be clipped mid-content on phones,
                 so they only join the fan from `sm` up */
              className={`-mx-4 shrink-0 ${
                i === 0 || i === HERO_CARDS.length - 1 ? "hidden sm:block" : ""
              }`}
            >
              <div
                style={{
                  transform: `translateY(${a.translateY}px) rotateY(${a.rotateY}deg) rotateZ(${a.rotateZ}deg) translateZ(${a.translateZ}px) scale(${a.scale})`,
                }}
                className="h-[178px] w-[158px] overflow-hidden rounded-2xl border border-white/60 bg-white shadow-[0_24px_50px_-16px_rgba(23,9,31,0.6)]"
              >
                <CardFace card={card} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function StarRating() {
  return (
    <div className="flex items-center justify-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4 text-accent"
          aria-hidden="true"
        >
          <path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.1 6.1 20.2l1.2-6.6L2.5 9l6.6-.9L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: reduceMotion ? 0 : delay },
  });

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-[#17091f] px-2 pb-2 sm:px-3 sm:pb-3"
    >
      {/* ---- Sky --------------------------------------------------- */}
      {/* The gradient is the container's own background: painting it on a
          child would sit behind the wrapper and never show. */}
      <div
        className="relative overflow-hidden rounded-b-[2rem] sm:rounded-[2rem]"
        style={{
          background:
            "linear-gradient(180deg, #1B0A2E 0%, #3B1668 26%, #552583 52%, #7B2CBF 78%, #9D4EDD 100%)",
        }}
      >
        {/* Soft cloud banks — layered radial gradients rather than photos,
            so the hero stays asset-free and sharp at every viewport. */}
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background: [
              "radial-gradient(58% 30% at 10% 82%, rgba(255,255,255,0.34), transparent 68%)",
              "radial-gradient(50% 26% at 90% 76%, rgba(255,255,255,0.28), transparent 68%)",
              "radial-gradient(64% 34% at 50% 108%, rgba(241,255,3,0.22), transparent 66%)",
              "radial-gradient(44% 24% at 28% 100%, rgba(255,255,255,0.40), transparent 70%)",
              "radial-gradient(44% 24% at 74% 102%, rgba(255,255,255,0.34), transparent 70%)",
              "radial-gradient(80% 50% at 50% 0%, rgba(157,78,221,0.35), transparent 70%)",
            ].join(","),
          }}
        />
        {/* Warm accent glow behind the headline */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-[130px]" />

        {/* ---- Content --------------------------------------------- */}
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pb-16 pt-20 text-center sm:px-6 md:pb-20 md:pt-28">
          <motion.h1
            {...rise(0.05)}
            className="max-w-4xl font-sans text-[clamp(2.1rem,6.2vw,4.4rem)] font-bold leading-[1.06] tracking-[-0.03em] text-white"
          >
            Adaptive. Sustainable.
            <br />
            <span className="text-white/55">Fitness.</span>
          </motion.h1>

          <motion.p
            {...rise(0.25)}
            className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 md:text-base"
          >
            Specialized personal training on-demand. Expert coaches come to you
            — at home, in your gym, or anywhere you prefer.
          </motion.p>

          <motion.div
            {...rise(0.45)}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            <a
              href="#services"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white/10 px-7 text-xs font-semibold uppercase tracking-[0.18em] text-white ring-1 ring-inset ring-white/25 backdrop-blur-sm transition hover:bg-white/20"
            >
              Our Programs
            </a>

            <a
              href="#contact"
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-accent pl-7 pr-2 text-xs font-bold uppercase tracking-[0.18em] text-black transition hover:shadow-[0_16px_40px_-10px_rgba(241,255,3,0.6)]"
            >
              Book Free Assessment
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4 text-accent" />
              </span>
            </a>
          </motion.div>

          <CardArc />

          <motion.div {...rise(1.5)} className="mt-8 space-y-2">
            <p className="text-xs text-white/70">
              Rated 4.9/5 by 500+ clients in Dubai
            </p>
            <StarRating />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
