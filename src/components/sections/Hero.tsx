"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { FlipWords } from "@/components/ui/flip-words";

function ThickRibbon() {
  const colors = [
    "#552583", // Deep Purple
    "#7B2CBF", // Purple Heart
    "#9D4EDD", // Medium Purple
    "#F1FF03", // Primary Accent Yellow
    "#FFD700", // Gold/Darker Yellow
    "#240046", // Dark Russian Violet
    "#3C096C", // Persian Indigo
    "#facc15", // Yellow-400
  ];

  return (
    <div className="absolute top-[85%] sm:top-[88%] md:top-[80%] left-0 w-full h-[70vh] md:h-[80vh] -translate-y-1/2 overflow-visible pointer-events-none z-0">
      <svg
        viewBox="0 0 1440 400"
        className="w-full h-full preserve-3d overflow-visible"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="20%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="80%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          <filter id="ribbonGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Backbone ribbon for a solid "surface" feel */}
        <motion.path
          d="M-200 200 C200 100 600 300 1000 200 C1400 100 1800 300 2200 200"
          stroke="#552583"
          strokeWidth="60"
          fill="transparent"
          strokeOpacity="0.15"
          animate={{
            x: [-200, 0, -200],
            y: [5, 15, 5],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Generate 40 layered paths for the texture and thickness */}
        {[...Array(40)].map((_, i) => {
          const color = colors[i % colors.length];
          const offset = (i - 20) * 1.5;
          const delay = i * 0.08;
          const duration = 12 + (i % 8) * 2;

          return (
            <motion.path
              key={`ribbon-path-${i}`}
              d="M-200 200 C200 100 600 300 1000 200 C1400 100 1800 300 2200 200"
              stroke={color}
              strokeWidth={i % 8 === 0 ? "4" : "1.5"}
              fill="transparent"
              initial={{ pathLength: 0.1, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: [0.4, 0.8, 0.4],
                x: [-200, 0, -200],
                y: [offset, offset + 10, offset],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
              }}
              style={{
                filter: i % 10 === 0 ? "url(#ribbonGlow)" : "none",
              }}
            />
          );
        })}

        {/* Specular highlights for 3D effect */}
        {[...Array(3)].map((_, i) => (
          <motion.path
            key={`highlight-${i}`}
            d="M-200 200 C200 100 600 300 1000 200 C1400 100 1800 300 2200 200"
            stroke={i === 0 ? "#FFFFFF" : "#F1FF03"}
            strokeWidth="1.5"
            fill="transparent"
            animate={{
              opacity: [0.3, 1, 0.3],
              x: [-200, 0, -200],
              y: [i * 5 - 10, i * 5, i * 5 - 10],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            filter="url(#ribbonGlow)"
          />
        ))}
      </svg>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const headingRef = useRef(null);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-white pt-32 pb-8 md:pb-12"
    >
      {/* Visual background accents */}
      <Spotlight
        className="absolute -top-40 left-1/2 -translate-x-1/2 z-0"
        fill="#F1FF03"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col items-center text-center">
        {/* Centered Text Content */}
        <motion.div
          style={{ y: yTranslate, opacity }}
          className="relative z-30 w-full flex flex-col items-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-purple font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs mb-8"
          >
            Performance Reinvented
          </motion.span>

          <div ref={headingRef} className="w-full flex justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-black text-purple tracking-tight font-heading leading-tight mb-8 text-center whitespace-nowrap overflow-visible"
              style={{ fontSize: "clamp(32px, 8vw, 72px)" }}
            >
              <FlipWords
                words={[
                  "ADAPTIVE. SUSTAINABLE. FITNESS.",
                  "ADAPTIVE. SUSTAINABLE. FITNESS.",
                ]}
                duration={4000}
                className="text-purple max-md:flex max-md:flex-col max-md:items-center"
              />
            </motion.h1>
          </div>

          <div className="mb-12 md:mb-16 max-w-3xl px-4 md:px-0 relative z-50">
            <TextGenerateEffect
              words="Master your fitness, master your life."
              className="text-base md:text-2xl text-black font-bold tracking-tight"
            />
          </div>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full bg-purple px-8 md:px-14 font-bold text-white transition-all duration-300 hover:bg-yellow hover:text-black hover:shadow-[0_20px_60px_-10px_rgba(241,255,3,0.5)] z-50 border border-purple shadow-sm w-full max-w-[320px] md:w-auto"
          >
            <span className="relative z-10 text-sm tracking-[0.2em] uppercase text-center">
              Book your free assessment
            </span>
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-zinc-100/0 via-zinc-100/20 to-zinc-100/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </motion.a>
        </motion.div>
      </div>

      {/* Custom Thick Ribbon Visual */}
      <ThickRibbon />

      {/* Additional decorative blurs for depth */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10" />
    </section>
  );
}
