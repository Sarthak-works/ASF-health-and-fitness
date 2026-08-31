"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
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
  {
    kind: "photo",
    src: "/testimonial-video-posters/Chronic back pain 16-5_frame-001.jpg",
    alt: "ASF client describing relief from chronic back pain",
    caption: "Pain-free movement",
  },
  {
    kind: "stat",
    label: "Certified coaches",
    value: "20+",
    sub: "Across strength, rehab and nutrition",
  },
  {
    kind: "photo",
    src: "/testimonial-video-posters/Mathangi.jpg",
    alt: "ASF client Mathangi sharing her results",
    caption: "Coaching that fits your life",
  },
];

/* Visible positions on the arc. The pool above is deliberately longer, so
   every rotation brings a slide that is not already on screen. */
const SLOTS = 8;

/* Dwell time per slide, in ms. */
const ROTATE_MS = 3200;

/* Arc geometry — every transform below is a pure function of the card's
   normalised position `t` in [-1, 1], so the fan stays symmetrical
   regardless of how many cards the array holds. */
function arcTransform(index: number, total: number) {
  const t = total === 1 ? 0 : (index / (total - 1)) * 2 - 1;
  const distance = Math.abs(t);

  return {
    t,
    /* The row is level — cards share one baseline rather than tracing a
       curve. Depth comes from turning each card to face the centre and
       letting the outer ones recede, not from lifting them off the line. */
    rotateY: -t * 34,
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

  /* The arc positions themselves never move — animating eight cards along a
     3D curve is expensive and reads as noise. Instead the slides advance
     through fixed slots: on each tick every slot shows the next card in the
     pool, entering from the right and leaving to the left, which is the
     direction content would travel if the whole deck were rotating. */
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    /* Pause while the tab is hidden. Exit animations are driven by rAF,
       which does not run in a background tab, so a ticking interval would
       queue up slides that can never finish leaving — the outgoing nodes
       accumulate in the DOM for as long as the tab stays hidden. */
    let id: ReturnType<typeof setInterval> | undefined;

    const stop = () => {
      if (id) clearInterval(id);
      id = undefined;
    };
    const start = () => {
      stop();
      id = setInterval(() => setTick((t) => t + 1), ROTATE_MS);
    };
    const onVisibilityChange = () => (document.hidden ? stop() : start());

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [reduceMotion]);

  return (
    /* The row is scaled down on small screens, but a CSS scale does not
       shrink the layout box — so the fan is absolutely positioned inside a
       wrapper whose height matches the *scaled* result (card height × the
       scale at that breakpoint). Otherwise the leftover height shows up as
       a large empty gap above the cards. */
    <div
      aria-hidden="true"
      className="relative mt-4 h-[105px] w-full sm:h-[128px] md:mt-8 md:h-[162px] lg:h-[180px]"
      style={{ perspective: "1600px" }}
    >
      <div
        className="absolute inset-x-0 bottom-0 flex origin-bottom items-end justify-center scale-[0.58] sm:scale-[0.7] md:scale-90 lg:scale-100"
        style={{ transformStyle: "preserve-3d" }}
      >
        {Array.from({ length: SLOTS }).map((_, i) => {
          const a = arcTransform(i, SLOTS);
          const cardIndex = (i + tick) % HERO_CARDS.length;
          const card = HERO_CARDS[cardIndex];

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
                i === 0 || i === SLOTS - 1 ? "hidden sm:block" : ""
              }`}
            >
              <div
                style={{
                  transform: `rotateY(${a.rotateY}deg) translateZ(${a.translateZ}px) scale(${a.scale})`,
                }}
                className="relative h-[178px] w-[158px] overflow-hidden rounded-2xl border border-white/60 bg-white shadow-[0_24px_50px_-16px_rgba(23,9,31,0.6)]"
              >
                {/* `initial={false}` so the first paint is not a slide-in —
                    the deck's entrance is handled by the wrapper above. */}
                <AnimatePresence initial={false}>
                  <motion.div
                    key={cardIndex}
                    initial={{ x: "108%" }}
                    animate={{ x: "0%" }}
                    exit={{ x: "-108%" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <CardFace card={card} />
                  </motion.div>
                </AnimatePresence>
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
      className="relative isolate overflow-hidden bg-[#17091f]"
    >
      {/* ---- Sky --------------------------------------------------- */}
      {/* The gradient is the container's own background: painting it on a
          child would sit behind the wrapper and never show. */}
      <div
        /* top corners only — the panel runs flush to the left, right and
           bottom edges of the viewport */
        className="relative overflow-hidden rounded-t-[2rem]"
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
