"use client";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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

/* Cards kept in the DOM. Enough to fill the widest viewport plus a couple
   spilling past each edge, so there is always something to slide in. */
const RENDERED = 10;

/* Dwell time between steps, in ms, and how long one step takes. */
const ROTATE_MS = 3200;
const STEP_MS = 850;

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

type StripItem = { id: number; cardIndex: number };

function CardStrip() {
  const reduceMotion = useReducedMotion();
  const rowRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  /* The whole row travels as one piece. Swapping each card in place — which
     is what this did before — changes all of them at the same instant and
     reads as a flicker rather than a carousel. Here the strip slides left by
     exactly one card, then the card that has gone off the left edge is
     recycled to the tail and the row snaps back to zero. Because the row is
     already one card further along at that point, the snap is invisible. */
  const [items, setItems] = useState<StripItem[]>(() =>
    Array.from({ length: RENDERED }, (_, i) => ({
      id: i,
      cardIndex: i % HERO_CARDS.length,
    })),
  );

  const nextId = useRef(RENDERED);
  const nextCard = useRef(RENDERED % HERO_CARDS.length);

  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;
    let id: ReturnType<typeof setInterval> | undefined;

    const step = async () => {
      const row = rowRef.current;
      if (!row || row.children.length < 2) return;

      /* Measure rather than hard-code: card width is set per breakpoint, so
         the distance to advance changes with the viewport. The gap between
         the first two children is exactly that distance. */
      const first = row.children[0] as HTMLElement;
      const second = row.children[1] as HTMLElement;
      const pitch = second.offsetLeft - first.offsetLeft;
      if (!pitch) return;

      await controls.start({
        x: -pitch,
        transition: { duration: STEP_MS / 1000, ease: [0.65, 0, 0.35, 1] },
      });
      if (cancelled) return;

      setItems((prev) => [
        ...prev.slice(1),
        { id: nextId.current++, cardIndex: nextCard.current },
      ]);
      nextCard.current = (nextCard.current + 1) % HERO_CARDS.length;
      controls.set({ x: 0 });
    };

    /* Pause while the tab is hidden: the step animation is driven by rAF,
       which does not run in a background tab, so the interval would stack up
       steps that never resolve. */
    const stop = () => {
      if (id) clearInterval(id);
      id = undefined;
    };
    const start = () => {
      stop();
      id = setInterval(step, ROTATE_MS);
    };
    const onVisibilityChange = () => (document.hidden ? stop() : start());

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelled = true;
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [reduceMotion, controls]);

  return (
    /* Flat, level row that runs wider than the viewport and is clipped at
       both edges by the panel, so the outermost cards read as continuing
       past the frame. Card size is set per breakpoint rather than by a CSS
       scale, so the layout box always matches what is drawn. */
    <motion.div
      aria-hidden="true"
      initial={reduceMotion ? false : { opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.7 }}
      className="mt-8 w-full md:mt-10"
    >
      <motion.div
        ref={rowRef}
        animate={controls}
        className="flex justify-center gap-2 md:gap-3"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="h-[170px] w-[150px] shrink-0 overflow-hidden rounded-2xl border border-white/60 bg-white shadow-[0_24px_50px_-16px_rgba(23,9,31,0.6)] sm:h-[200px] sm:w-[180px] md:h-[230px] md:w-[210px] lg:h-[252px] lg:w-[240px]"
          >
            <CardFace card={HERO_CARDS[item.cardIndex]} />
          </div>
        ))}
      </motion.div>
    </motion.div>
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
        className="relative flex min-h-svh flex-col justify-between overflow-hidden rounded-t-[2rem]"
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
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-28 sm:px-6 md:pt-36">
          <div className="max-w-xl md:max-w-[70%]">
            <motion.h1
              {...rise(0.05)}
              className="font-sans text-[clamp(2.1rem,5.2vw,4rem)] font-bold leading-[1.06] tracking-[-0.03em] text-white"
            >
              Adaptive. Sustainable.
              <br />
              <span className="text-white/55">Fitness.</span>
            </motion.h1>

            <motion.p
              {...rise(0.25)}
              className="mt-7 max-w-md text-sm leading-relaxed text-white/70 md:mt-9 md:text-base"
            >
              Specialized personal training on-demand. Expert coaches come to
              you — at home, in your gym, or anywhere you prefer.
            </motion.p>

            <motion.div {...rise(0.45)} className="mt-9 md:mt-10">
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

            <motion.div {...rise(0.6)} className="mt-8 space-y-2">
              <p className="text-xs text-white/70">
                Rated 4.9/5 by 500+ clients in Dubai
              </p>
              <StarRating />
            </motion.div>
          </div>
        </div>

        {/* ---- Card strip ------------------------------------------ */}
        <div className="relative z-10 w-full overflow-hidden pb-8 md:pb-10">
          <CardStrip />
        </div>
      </div>
    </section>
  );
}
