"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TrainerCard {
  title: string;
  role: string;
  src: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const expertTrainers: TrainerCard[] = [
  {
    title: "Karthik Jadhav",
    role: "Performance Coach",
    src: "/coach-karthik.webp",
  },
  { title: "Dileef Thahir", role: "Elite Trainer", src: "/coach-dileef.webp" },
  // Removed after instructed on whatsapp on 3/8/26
  //  { title: "Sonali Kole", role: "Coach", src: "/sonali-kole.jpeg" },
  { title: "Aniket", role: "Coach", src: "/coach-aniket.webp" },
  { title: "Sujal", role: "Coach", src: "/coach-sujal.webp" },
];

const seniorCoaches: TrainerCard[] = [
  { title: "Hoyam Ahmed", role: "Fitness Coach", src: "/coach-hoyam.webp" },
  {
    title: "Mohammed Hasnain",
    role: "Strength Coach",
    src: "/coach-hasnain.webp",
  },
];

const nutritionists: TrainerCard[] = [
  {
    title: "Harsha Nachane",
    role: "Clinical Nutritionist",
    src: "/harsha.jpeg",
  },
];

const flowTeam: TrainerCard[] = [
  { title: "Leo", role: "Flow coach", src: "/leo.jpeg" },
  { title: "Isha", role: "Flow coach", src: "/isha.jpeg" },
  { title: "Gokul", role: "Flow coach", src: "/gokul.jpeg" },
];

const mentalWellbeingTeam: TrainerCard[] = [
  { title: "", role: " Psychologist", src: "/sangeeta.jpeg" },
];

// ─── Layout type ──────────────────────────────────────────────────────────────

type CarouselLayout = "scroll-peek" | "scroll-fit" | "single";

// ─── Carousel ─────────────────────────────────────────────────────────────────

function Carousel({
  cards,
  layout,
}: {
  cards: TrainerCard[];
  layout: CarouselLayout;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardEl = el.querySelector<HTMLElement>("[data-card]");
    const gap = window.innerWidth >= 768 ? 24 : 16;
    const cardW = cardEl ? cardEl.offsetWidth + gap : 320;
    el.scrollBy({ left: dir === "left" ? -cardW : cardW, behavior: "smooth" });
  };

  // ── Single card ───────────────────────────────────────────────────────────
  if (layout === "single") {
    return (
      <div className="flex justify-center px-8 md:px-16">
        <div
          className="relative overflow-hidden shadow-md"
          style={{
            width: "clamp(200px, 68vw, 490px)",
            height: "clamp(250px, 85vw, 610px)",
          }}
        >
          <Image
            src={cards[0].src}
            alt={cards[0].title}
            fill
            sizes="(max-width: 768px) 68vw, 490px"
            className="object-contain object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/30 via-transparent to-transparent" />
        </div>
      </div>
    );
  }

  // ── scroll-fit: centered row on desktop, both-cards-visible on mobile ─────
  if (layout === "scroll-fit") {
    return (
      <>
        {/* Desktop: static centered row */}
        <div className="hidden md:flex justify-center gap-6 px-16">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, ease: "easeOut" }}
              className="relative overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex-shrink-0"
              style={{ width: 490, height: 610 }}
            >
              <Image
                src={card.src}
                alt={card.title}
                fill
                sizes="490px"
                className="object-contain object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/30 via-transparent to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Mobile: both cards visible side by side, centered */}
        <div className="md:hidden px-4">
          <div
            className="flex gap-4 overflow-x-auto pb-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              scrollSnapType: "x mandatory",
              flexWrap: "nowrap",
              justifyContent: "center",
            }}
          >
            {cards.map((card, i) => (
              <motion.div
                key={i}
                data-card
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, ease: "easeOut" }}
                className="relative overflow-hidden shadow-md flex-shrink-0 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                style={{
                  width: "44vw",
                  height: "55vw",
                  scrollSnapAlign: "center",
                }}
              >
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  sizes="44vw"
                  className="object-contain object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/30 via-transparent to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </>
    );
  }

  // ── scroll-peek: center card + side cards peeking ─────────────────────────
  return (
    <div className="relative group">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="absolute left-1 md:left-3 top-1/2 -translate-y-1/2 z-10
                   w-9 h-9 md:w-11 md:h-11 rounded-full bg-white shadow-lg border border-gray-200
                   flex items-center justify-center
                   opacity-0 group-hover:opacity-100 transition-opacity duration-200
                   hover:bg-purple-700 hover:text-white hover:border-purple-700"
      >
        <ChevronLeft size={18} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto pb-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          flexWrap: "nowrap",
          scrollSnapType: "x mandatory",
          scrollPaddingInline: "14vw",
          paddingInline: "14vw",
        }}
      >
        {cards.map((card, i) => (
          <motion.div
            key={i}
            data-card
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, ease: "easeOut" }}
            className="relative overflow-hidden shadow-md flex-shrink-0
                       hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            style={{
              width: "clamp(200px, 72vw, 490px)",
              height: "clamp(250px, 90vw, 610px)",
              scrollSnapAlign: "center",
            }}
          >
            <Image
              src={card.src}
              alt={card.title}
              fill
              sizes="(max-width: 768px) 72vw, 490px"
              className="object-contain object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/30 via-transparent to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="absolute right-1 md:right-3 top-1/2 -translate-y-1/2 z-10
                   w-9 h-9 md:w-11 md:h-11 rounded-full bg-white shadow-lg border border-gray-200
                   flex items-center justify-center
                   opacity-0 group-hover:opacity-100 transition-opacity duration-200
                   hover:bg-purple-700 hover:text-white hover:border-purple-700"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

// ─── Subsection ───────────────────────────────────────────────────────────────

function Subsection({
  title,
  subtitle,
  cards,
  accent = "white",
  layout,
}: {
  title: string;
  subtitle: string;
  cards: TrainerCard[];
  accent?: "white" | "gray";
  layout: CarouselLayout;
}) {
  return (
    <div
      className={`py-14 md:py-20 ${accent === "gray" ? "bg-gray-50" : "bg-white"}`}
    >
      <div className="text-center mb-8 md:mb-12 px-4">
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-bold text-gray-900 mb-3"
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-500 max-w-xl mx-auto text-sm md:text-lg"
        >
          {subtitle}
        </motion.p>
        <div className="mt-4 md:mt-5 mx-auto w-16 h-1 bg-purple-600 rounded-full" />
      </div>
      <Carousel cards={cards} layout={layout} />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OurTeam() {
  return (
    <section id="team" className="overflow-hidden">
      <div className="bg-white pt-16 md:pt-24 pb-8 md:pb-12 text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold text-gray-900"
        >
          Meet Our Team
        </motion.h2>
        <div className="mt-4 mx-auto w-20 md:w-24 h-1.5 bg-purple-600 rounded-full" />
      </div>

      <Subsection
        title="Our Senior Coaches"
        subtitle="Highly qualified, experienced fitness specialists dedicated to crafting tailored programs that deliver lasting results."
        cards={seniorCoaches}
        accent="white"
        layout="scroll-fit"
      />
      <Subsection
        title="Our Expert Coaches"
        subtitle="Certified technical specialists focused on elevating your form, maximizing performance, and unlocking your true physical potential."
        cards={expertTrainers}
        accent="white"
        layout="scroll-peek"
      />
      <Subsection
        title="Our Nutritionist"
        subtitle="Science-backed nutrition experts who craft personalised plans to fuel your performance and transform your health from the inside out."
        cards={nutritionists}
        accent="gray"
        layout="single"
      />
      <Subsection
        title="Our Flow Team"
        subtitle="Mobility, yoga, and breathwork specialists who help you move with ease, recover faster, and find balance in every session."
        cards={flowTeam}
        accent="white"
        layout="scroll-peek"
      />

      <Subsection
        title="Our Mental Well-being Team"
        subtitle="Mindset coaches and sports psychologists who help you build the mental resilience to stay consistent, focused, and confident."
        cards={mentalWellbeingTeam}
        accent="gray"
        layout="single"
      />
    </section>
  );
}
