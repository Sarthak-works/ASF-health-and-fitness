"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  MOCK ASSET — replace when the client supplies the hero shot.       */
/*  Wants a portrait-orientation photo; it is cropped to the right     */
/*  half of the panel and anchored to the top.                         */
/* ------------------------------------------------------------------ */
const HERO_PORTRAIT = "/hero-slides/hero-banner1.jpg";

/* ------------------------------------------------------------------ */
/*  Hero slides                                                        */
/*                                                                     */
/*  The client's Instagram carousel, exported at 1024x1280 (4:5). Each */
/*  slide is a finished creative — name, headline, sub-line and CTA    */
/*  are baked into the artwork — so a card is just the image, shown    */
/*  uncropped at its native ratio.                                     */
/* ------------------------------------------------------------------ */

type HeroSlide = { src: string; alt: string };

const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/hero-slides/diantha-knee-pain.jpg",
    alt: "Diantha, a Dubai professional, lost weight without aggravating her knee pain with ASF Coaching",
  },
  {
    src: "/hero-slides/farzan-40kg-weight-loss.jpg",
    alt: "Farzan, a Dubai professional, achieved a 40 kg weight loss transformation with ASF Coaching",
  },
  {
    src: "/hero-slides/esther-scoliosis-mobility.jpg",
    alt: "Esther, a Dubai teenager, improved her mobility while managing scoliosis and lost 10 kg with ASF Coaching",
  },
  {
    src: "/hero-slides/sharda-postpartum-strength.jpg",
    alt: "Sharda Gulani, a new mom, regained her strength after pregnancy with ASF Coaching",
  },
  {
    src: "/hero-slides/kiran-back-pain.jpg",
    alt: "Kiran Luthra, a Dubai professional, overcame serious back pain and moved pain-free again with ASF Coaching",
  },
  {
    src: "/hero-slides/bethya-motherhood.jpg",
    alt: "Bethya, a Dubai mom, built a stronger foundation for motherhood with ASF Coaching",
  },
  {
    src: "/hero-slides/satish-shoulder-mobility.jpg",
    alt: "Satish, a Dubai professional, regained shoulder strength and mobility with ASF Coaching",
  },
  {
    src: "/hero-slides/Umme Salma, Dubai Resident.jpeg",
    alt: "Umme Salma, Dubai Resident",
  },
  {
    src: "/hero-slides/Dan, Dubai Resident.jpeg",
    alt: "Dan, Dubai Resident",
  },
  {
    src: "/hero-slides/Hannah, Dubai Resident.jpeg",
    alt: "Hannah, Dubai Resident",
  },
];

/* Continuous drift speed (px per second) and how long the strip stays still
   after the visitor last touched, dragged or scrolled it. */
const SPEED = 45;
const IDLE_MS = 2500;

/* The slide list is rendered several times back to back. The scroll position
   is kept inside the second copy and silently jumped by exactly one copy's
   width whenever it leaves it — the copies are identical, so the jump is
   invisible and the strip never runs out in either direction. Four copies
   cover viewports up to roughly twice the width of one set. */
const COPIES = 4;

function CardStrip() {
  const reduceMotion = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let setW = 0; // pixel width of one full set of slides (cards + gaps)
    let raf = 0;
    let last = performance.now();
    let pos = 0; // float scroll position, so slow drift isn't lost to rounding
    let lastSet = 0; // scrollLeft as of our last write, to spot user scrolls
    let pressed = false;
    let wasAuto = false;
    let lastInteract = performance.now() - IDLE_MS; // drift from first paint

    const measure = () => {
      const a = el.children[0] as HTMLElement | undefined;
      const b = el.children[HERO_SLIDES.length] as HTMLElement | undefined;
      if (a && b) setW = b.offsetLeft - a.offsetLeft;
    };

    /* Keep scrollLeft inside [setW, 2*setW). */
    const wrap = () => {
      if (!setW) return;
      if (el.scrollLeft >= setW * 2) el.scrollLeft -= setW;
      else if (el.scrollLeft < setW) el.scrollLeft += setW;
    };

    const touch = () => {
      lastInteract = performance.now();
    };

    /* ---- Mouse drag-to-scroll (touch/trackpad scroll natively) ---- */
    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    const onDown = (e: PointerEvent) => {
      pressed = true;
      touch();
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      touch();
      el.scrollLeft = startScroll - (e.clientX - startX);
    };
    const onUp = () => {
      pressed = false;
      touch();
      if (!dragging) return;
      dragging = false;
      el.style.cursor = "";
    };

    /* A scroll we didn't cause is the visitor's: hold the drift, then wrap. */
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - lastSet) > 2) touch();
      wrap();
      lastSet = el.scrollLeft;
    };

    const loop = (t: number) => {
      const dt = Math.min(t - last, 64);
      last = t;

      const auto =
        !reduceMotion && !pressed && setW > 0 && t - lastInteract > IDLE_MS;

      if (auto) {
        if (!wasAuto) pos = el.scrollLeft;
        pos += (SPEED * dt) / 1000;
        if (pos >= setW * 2) pos -= setW;
        el.scrollLeft = pos;
      }
      wasAuto = auto;
      lastSet = el.scrollLeft;
      raf = requestAnimationFrame(loop);
    };

    measure();
    el.scrollLeft = setW; // start on the second copy
    pos = lastSet = el.scrollLeft;

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", touch, { passive: true });
    el.addEventListener("keydown", touch);
    window.addEventListener("resize", measure);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", touch);
      el.removeEventListener("keydown", touch);
      window.removeEventListener("resize", measure);
    };
  }, [reduceMotion]);

  const items = Array.from({ length: COPIES }, (_, copy) =>
    HERO_SLIDES.map((slide, i) => ({ slide, copy, i })),
  ).flat();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.7 }}
      className="mt-6 w-full md:mt-8"
    >
      {/* Endless horizontal strip. It drifts on its own from first load and
          can be swiped, dragged, trackpad-scrolled or arrow-keyed at any time;
          it pauses while the visitor is interacting and drifts on again
          after a short idle. */}
      <div
        ref={scrollerRef}
        role="region"
        aria-label="Client transformation stories"
        tabIndex={0}
        className="flex cursor-grab select-none gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6 md:gap-4 lg:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        {items.map(({ slide, copy, i }) => (
          <div
            key={`${copy}-${i}`}
            aria-hidden={copy !== 1}
            className="relative aspect-[4/5] w-[68vw] max-w-[260px] shrink-0 overflow-hidden rounded-2xl border border-white/60 bg-[#3B1668] shadow-[0_24px_50px_-16px_rgba(23,9,31,0.6)] sm:w-[210px] md:w-[224px] lg:w-[250px]"
          >
            <Image
              src={slide.src}
              alt={copy === 1 ? slide.alt : ""}
              fill
              draggable={false}
              sizes="(max-width: 640px) 68vw, 250px"
              /* Only the copy that is on screen at load needs to be eager. */
              loading={copy === 1 && i < 5 ? "eager" : "lazy"}
              className="pointer-events-none object-cover"
            />
          </div>
        ))}
      </div>
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
    /* The section itself is the full-bleed panel: it fills the viewport
       width and at least the full viewport height (svh keeps it correct
       behind mobile browser toolbars), with no rounded corners or dark
       gutters. The gradient lives on this element. */
    <section
      id="hero"
      className="relative isolate flex min-h-svh w-full flex-col justify-between overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #1B0A2E 0%, #3B1668 26%, #552583 52%, #7B2CBF 78%, #9D4EDD 100%)",
      }}
    >
      {/* Portrait, bled into the right of the panel (full width on mobile). */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[54%]">
        <Image
          src={HERO_PORTRAIT}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 54vw"
          className="object-cover object-top"
          /* Fade the photo itself rather than laying a colour over it, so
             the panel's own gradient shows through with no hard seam. */
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, #000 58%), linear-gradient(to top, transparent 0%, #000 34%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, #000 58%), linear-gradient(to top, transparent 0%, #000 34%)",
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
        />
        {/* On mobile the text sits on top of the photo, so darken it,
            weighted towards the top where the headline lands. */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B0A2E] via-[#1B0A2E]/88 to-[#3B1668]/45 md:hidden" />
      </div>

      {/* Soft cloud banks */}
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

      {/* ---- Content ------------------------------------------------ */}
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
            className="mt-6 max-w-md text-sm leading-relaxed text-white/80 md:mt-9 md:text-base md:text-white/70"
          >
            Specialized personal training on-demand. Expert coaches come to you
            — at home, in your gym, or anywhere you prefer.
          </motion.p>

          <motion.div {...rise(0.45)} className="mt-8 md:mt-10">
            <a
              href="#contact"
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-accent pl-6 pr-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-black transition hover:shadow-[0_16px_40px_-10px_rgba(241,255,3,0.6)] sm:pl-7 sm:text-xs sm:tracking-[0.18em]"
            >
              Book Free Assessment
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4 text-accent" />
              </span>
            </a>
          </motion.div>

          <motion.div {...rise(0.6)} className="mt-6 space-y-2 md:mt-8">
            <p className="text-xs text-white/70">
              Rated 4.9/5 by 500+ clients in Dubai
            </p>
            <StarRating />
          </motion.div>
        </div>
      </div>

      {/* ---- Card strip (full width, scrollable) -------------------- */}
      <div className="relative z-10 w-full pb-6 pt-8 md:pb-8">
        <CardStrip />
      </div>
    </section>
  );
}
