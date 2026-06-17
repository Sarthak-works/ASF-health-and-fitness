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
    title: "Suraj Shetty",
    role: "Transformation Specialist",
    src: "/coach-suraj.webp",
  },
  {
    title: "Akshay Sahu",
    role: "Founder & Head Coach",
    src: "/coach-akshay.webp",
  },
  { title: "Hoyam Ahmed", role: "Fitness Coach", src: "/coach-hoyam.webp" },
  {
    title: "Karthik Jadhav",
    role: "Performance Coach",
    src: "/coach-karthik.webp",
  },
  {
    title: "Mohammed Hasnain",
    role: "Strength Coach",
    src: "/coach-hasnain.webp",
  },
  { title: "Dileef Thahir", role: "Elite Trainer", src: "/coach-dileef.webp" },
  { title: "Sonali Kole", role: "Coach", src: "/sonali-kole.jpeg" },
  { title: "Aniket", role: "Coach", src: "/coach-aniket.webp" },
  { title: "Sujal", role: "Coach", src: "/coach-sujal.webp" },
];

const nutritionists: TrainerCard[] = [
  {
    title: "Harsha Nachane",
    role: "Clinical Nutritionist",
    src: "/harsha.jpeg",
  },
];

const flowTeam: TrainerCard[] = [
  {
    title: "Flow coaches",
    role: "Yoga & Mobility Experts",
    src: "/flow team.jpeg",
  },
];

const mentalWellbeingTeam: TrainerCard[] = [
  {
    title: "",
    role: "Sports Psychologist",
    src: "/mental-wellbeingteam.jpeg",
  },
];

const CARD_W = 300;
const CARD_H = 420;

function Carousel({
  cards,
  centered = false,
}: {
  cards: TrainerCard[];
  centered?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    // scroll one card width at a time for predictable feel
    scrollRef.current.scrollBy({
      left: dir === "left" ? -(CARD_W + 40) : CARD_W + 40,
      behavior: "smooth",
    });
  };

  return (
    /* Outer: adds left/right page margin and positions arrows inside that space */
    <div className="relative group px-10 md:px-20">
      {/* Left arrow — sits inside the margin, never overlaps cards */}
      {!centered && (
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10
                     w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200
                     flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     hover:bg-purple-700 hover:text-white hover:border-purple-700"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Scrollable track — no extra px padding; margin is on the outer div */}
      <div
        ref={scrollRef}
        className={`flex gap-10 overflow-x-auto pb-2
                    ${centered ? "justify-center flex-wrap" : ""}`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory",
        }}
      >
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, ease: "easeOut" }}
            style={{
              width: CARD_W,
              height: CARD_H,
              flexShrink: 0,
              scrollSnapAlign: "start",
            }}
            className="relative overflow-hidden shadow-md
                       hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <Image
              src={card.src}
              alt={card.title}
              fill
              className="object-contain object-center"
            />
            {/* Subtle gradient overlay at bottom for polish */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/30 via-transparent to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* Right arrow */}
      {!centered && (
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10
                     w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200
                     flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     hover:bg-purple-700 hover:text-white hover:border-purple-700"
        >
          <ChevronRight size={22} />
        </button>
      )}
    </div>
  );
}

// ─── Subsection ───────────────────────────────────────────────────────────────

function Subsection({
  title,
  subtitle,
  cards,
  accent = "white",
}: {
  title: string;
  subtitle: string;
  cards: TrainerCard[];
  accent?: "white" | "gray";
}) {
  // Centre when few cards (≤ 3) so they don't hug the left
  const centered = cards.length <= 3;

  return (
    <div className={`py-20 ${accent === "gray" ? "bg-gray-50" : "bg-white"}`}>
      {/* Heading */}
      <div className="text-center mb-12 px-4">
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-500 max-w-xl mx-auto text-base md:text-lg"
        >
          {subtitle}
        </motion.p>
        {/* Purple underline accent */}
        <div className="mt-5 mx-auto w-16 h-1 bg-purple-600 rounded-full" />
      </div>

      <Carousel cards={cards} centered={centered} />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OurTeam() {
  return (
    <section id="team" className="overflow-hidden">
      {/* ── Page heading ── */}
      <div className="bg-white pt-24 pb-12 text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900"
        >
          Meet Our Team
        </motion.h2>
        {/* Decorative purple bar under main title */}
        <div className="mt-4 mx-auto w-24 h-1.5 bg-purple-600 rounded-full" />
      </div>

      {/* 1. Expert Trainers — white bg */}
      <Subsection
        title="Our Expert Trainers"
        subtitle="Our certified trainers bring years of experience and a passion for helping you achieve your goals."
        cards={expertTrainers}
        accent="white"
      />

      {/* 2. Nutritionists — gray bg to distinguish */}
      <Subsection
        title="Our Nutritionists"
        subtitle="Science-backed nutrition experts who craft personalised plans to fuel your performance and transform your health from the inside out."
        cards={nutritionists}
        accent="gray"
      />

      {/* 3. Flow Team — white bg */}
      <Subsection
        title="Our Flow Team"
        subtitle="Mobility, yoga, and breathwork specialists who help you move with ease, recover faster, and find balance in every session."
        cards={flowTeam}
        accent="white"
      />

      {/* 4. Mental Well-being — gray bg */}
      <Subsection
        title="Our Mental Well-being Team"
        subtitle="Mindset coaches and sports psychologists who help you build the mental resilience to stay consistent, focused, and confident."
        cards={mentalWellbeingTeam}
        accent="gray"
      />
    </section>
  );
}
