"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  MOCK ASSET — replace when the client supplies the hero shot.       */
/*  Wants a portrait-orientation photo; it is cropped to the right     */
/*  half of the panel and anchored to the top.                         */
/* ------------------------------------------------------------------ */
const HERO_PORTRAIT = "/Akshay-suit.JPG";

/* ------------------------------------------------------------------ */
/*  Hero card deck                                                     */
/*                                                                     */
/*  Placeholders built from assets already in /public. To swap in the  */
/*  real Instagram slides: drop the exports into /public/hero-slides/  */
/*  and replace `src` below. The strip derives everything from array   */
/*  position, so nothing else needs to change.                         */
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

/* Visible positions in the strip. The pool above is deliberately longer, so
   every rotation brings on a slide that is not already on screen. */
const SLOTS = 8;

/* Dwell time per slide, in ms. */
const ROTATE_MS = 3200;

function CardFace({ card }: { card: HeroCard }) {
  switch (card.kind) {
    case "photo":
      return (
        <div className="relative h-full w-full">
          <Image
            src={card.src}
            alt={card.alt}
            fill
            sizes="220px"
            /* posters are 9:16 video stills — bias the crop to the face */
            className="object-cover object-[center_25%]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
            <p className="text-[11px] font-semibold leading-tight text-white">
              {card.caption}
            </p>
          </div>
        </div>
      );

    case "stat":
      return (
        <div className="flex h-full w-full flex-col justify-between bg-white p-4">
          <p className="text-[11px] font-medium text-gray-500">{card.label}</p>
          <div>
            <p className="font-heading text-4xl font-black leading-none text-purple">
              {card.value}
            </p>
            {card.sub && (
              <p className="mt-2 text-[11px] leading-snug text-gray-500">
                {card.sub}
              </p>
            )}
          </div>
        </div>
      );

    case "accent":
      return (
        <div className="flex h-full w-full flex-col justify-between bg-accent p-4">
          <p className="text-[11px] font-semibold text-black/60">
            {card.label}
          </p>
          <div>
            <p className="font-heading text-4xl font-black leading-none text-black">
              {card.value}
            </p>
            {card.sub && (
              <p className="mt-2 text-[11px] leading-snug text-black/70">
                {card.sub}
              </p>
            )}
          </div>
        </div>
      );

    case "dark":
      return (
        <div className="flex h-full w-full flex-col justify-center bg-[#17091f] p-4">
          <p className="text-[13px] leading-relaxed text-white/45">
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

function CardStrip() {
  const reduceMotion = useReducedMotion();

  /* The slots never move — the slides advance through them: on each tick
     every slot shows the next card in the pool, entering from the right and
     leaving to the left, the direction content would travel if the whole
     strip were scrolling. */
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
    /* Flat, level row that runs wider than the viewport and is clipped at
       both edges by the panel, so the outermost cards read as continuing
       past the frame. Card size is set per breakpoint rather than by a CSS
       scale, so the layout box always matches what is drawn. */
    <div
      aria-hidden="true"
      className="mt-10 flex w-full shrink-0 justify-center gap-2 md:mt-14 md:gap-3"
    >
      {Array.from({ length: SLOTS }).map((_, i) => {
        const cardIndex = (i + tick) % HERO_CARDS.length;
        const card = HERO_CARDS[cardIndex];

        return (
          <motion.div
            key={i}
            initial={reduceMotion ? false : { opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: reduceMotion ? 0 : 0.7 + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            /* Clipping window only. The border, fill and radius live on the
               sliding card below so the whole card travels rather than just
               its contents. The shadow has to stay here — a box-shadow on
               the moving card would be clipped off by this overflow. */
            className="relative h-[150px] w-[124px] shrink-0 overflow-hidden rounded-2xl shadow-[0_24px_50px_-16px_rgba(23,9,31,0.6)] sm:h-[170px] sm:w-[150px] md:h-[190px] md:w-[178px] lg:h-[200px] lg:w-[196px]"
          >
            {/* `initial={false}` so the first paint is not a slide-in — the
                strip's entrance is handled by the wrapper above. Exactly
                100%, not more: the outgoing card's right edge then stays
                flush against the incoming card's left edge for the whole
                move, so no gap opens up between them. */}
            <AnimatePresence initial={false}>
              <motion.div
                key={cardIndex}
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 overflow-hidden rounded-2xl border border-white/60 bg-white"
              >
                <CardFace card={card} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

function StarRating() {
  return (
    <div className="flex items-center gap-1">
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
        className="relative flex flex-col overflow-hidden rounded-t-[2rem]"
        style={{
          background:
            "linear-gradient(180deg, #1B0A2E 0%, #3B1668 26%, #552583 52%, #7B2CBF 78%, #9D4EDD 100%)",
        }}
      >
        {/* Portrait, bled into the right half of the panel. */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[54%]">
          <Image
            src={HERO_PORTRAIT}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 54vw"
            className="object-cover object-top"
            /* Fade the photo itself rather than laying a colour over it. The
               panel behind is a vertical gradient, so no single overlay
               colour can match it at every height — one always leaves a hard
               seam down the photo's left edge. Masking lets the panel's own
               gradient show through instead. */
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, #000 58%), linear-gradient(to top, transparent 0%, #000 34%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, #000 58%), linear-gradient(to top, transparent 0%, #000 34%)",
              WebkitMaskComposite: "source-in",
              maskComposite: "intersect",
            }}
          />
          {/* On mobile there is no room for the text to sit beside the photo,
              so it sits on top of it. Weighted towards the top, where the
              headline lands on the brightest part of the shot and would
              otherwise be white-on-white. */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B0A2E] via-[#1B0A2E]/88 to-[#3B1668]/45 md:hidden" />
        </div>

        {/* Soft cloud banks — layered radial gradients rather than photos,
            so the hero stays asset-free and sharp at every viewport. */}
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background: [
              "radial-gradient(58% 30% at 10% 82%, rgba(255,255,255,0.30), transparent 68%)",
              "radial-gradient(64% 34% at 50% 108%, rgba(241,255,3,0.20), transparent 66%)",
              "radial-gradient(44% 24% at 28% 100%, rgba(255,255,255,0.34), transparent 70%)",
            ].join(","),
          }}
        />

        {/* ---- Content --------------------------------------------- */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-20 sm:px-6 md:pt-28">
          <div className="max-w-xl md:max-w-[54%]">
            <motion.h1
              {...rise(0.05)}
              className="font-sans text-[clamp(2rem,5.4vw,3.9rem)] font-bold leading-[1.06] tracking-[-0.03em] text-white"
            >
              Adaptive. Sustainable.
              <br />
              <span className="text-white/55">Fitness.</span>
            </motion.h1>

            <motion.p
              {...rise(0.25)}
              className="mt-5 max-w-md text-sm leading-relaxed text-white/70 md:text-base"
            >
              Specialized personal training on-demand. Expert coaches come to
              you — at home, in your gym, or anywhere you prefer.
            </motion.p>

            <motion.div {...rise(0.45)} className="mt-7">
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

            <motion.div {...rise(0.6)} className="mt-6 space-y-2">
              <p className="text-xs text-white/70">
                Rated 4.9/5 by 500+ clients in Dubai
              </p>
              <StarRating />
            </motion.div>
          </div>
        </div>

        {/* ---- Card strip ------------------------------------------ */}
        <div className="relative z-10 w-full overflow-hidden pb-10 md:pb-14">
          <CardStrip />
        </div>
      </div>
    </section>
  );
}
