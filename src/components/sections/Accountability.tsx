"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

const SCREENSHOTS = [
  "/dailyacc1.jpg",
  "/dailyacc2.jpg",
  "/dailyacc3.jpg",
  "/dailyacc4.jpg",
  "/dailyacc5.jpg",
];

const pillars = [
  "Daily check-ins, every single day",
  "Nutrition tracked & reviewed in real time",
  "Coach feedback within hours",
  "Zero room for silent slip-ups",
];

const CARD_W = 370;

function Carousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -(CARD_W + 16) : CARD_W + 16,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group px-10 md:px-16">
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10
                   w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200
                   flex items-center justify-center
                   opacity-0 group-hover:opacity-100 transition-opacity duration-200
                   hover:bg-purple hover:text-white hover:border-purple"
      >
        <ChevronLeft size={22} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory",
        }}
      >
        {SCREENSHOTS.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, ease: "easeOut" }}
            style={{
              width: CARD_W,
              flexShrink: 0,
              scrollSnapAlign: "start",
              aspectRatio: "9/16",
            }}
            className="relative overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={src}
              alt={`Accountability screenshot ${i + 1}`}
              className="w-full h-full object-contain bg-black"
            />
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10
                   w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200
                   flex items-center justify-center
                   opacity-0 group-hover:opacity-100 transition-opacity duration-200
                   hover:bg-purple hover:text-white hover:border-purple"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}

export default function Accountability() {
  return (
    <section
      id="accountability"
      className="relative bg-white overflow-hidden py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_110%,rgba(109,40,217,0.08),transparent)]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="headline-medium text-center"
          >
            We Show Up{" "}
            <span className="relative inline-block">
              Every Day
              <svg
                aria-hidden
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6 Q100 0 198 5"
                  stroke="#F1FF03"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            For You.
          </motion.h2>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="section-label !text-black mt-5 block font-black"
          >
            DAILY ACCOUNTABILITY
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto mt-4"
          >
            Transformation doesn't happen in the gym alone - it's built in the
            quiet moments between sessions. Our coaches follow up daily on
            nutrition, sleep, steps, and habits so nothing falls through the
            cracks.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16"
        >
          <Carousel />
        </motion.div>

        <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
          <ul className="space-y-5 w-full">
            {pillars.map((text, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="flex items-start gap-4"
              >
                <CheckCircle2 className="w-6 h-6 text-purple flex-shrink-0 mt-0.5" />
                <span className="text-dark font-semibold text-lg leading-snug">
                  {text}
                </span>
              </motion.li>
            ))}
          </ul>

          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.65 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex h-14 items-center justify-center rounded-full bg-purple px-8 font-black text-white border-[3px] border-purple hover:bg-yellow hover:text-black hover:border-yellow hover:shadow-[0_0_30px_-5px_#F1FF03] transition-all duration-300 text-[15px] tracking-widest uppercase"
          >
            Start Your Journey
          </motion.a>
        </div>
      </div>
    </section>
  );
}
