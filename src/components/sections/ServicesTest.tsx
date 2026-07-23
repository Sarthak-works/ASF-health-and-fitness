"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";

const services = [
  {
    id: 0,
    title: "C-Suite Coach",
    short: "C-Suite",
    description:
      "Executive-level coaching designed for high-performing leaders who demand peak physical and mental performance.",
    image: "/images/services/csuite.jpg",
  },
  {
    id: 1,
    title: "VIP Trainer",
    short: "VIP",
    description:
      "Elite one-on-one training with bespoke scheduling and personalized nutrition strategies for the busy professional.",
    image: "/images/services/vip.jpg",
  },
  {
    id: 2,
    title: "Personal Trainer",
    short: "Personal",
    description:
      "Tailored strength and conditioning programs built to help you master your fitness and sustain long-term success.",
    image: "/images/services/personal.jpg",
  },
  {
    id: 3,
    title: "Semi Private / Couple Training",
    short: "Semi Private",
    description:
      "Exclusive small-group sessions or partner training focused on shared goals and high-intensity performance.",
    image: "/images/services/semiprivate.jpg",
  },
  {
    id: 4,
    title: "Mental Health",
    short: "Mental Health",
    description:
      "Holistic mindset coaching to manage stress, improve focus, and build the mental resilience required for elite performance.",
    image: "/images/services/mental.jpg",
  },
  {
    id: 5,
    title: "Yoga",
    short: "Yoga",
    description:
      "Specialized recovery sessions combining flexibility, breathwork, and mobility to complement high-intensity training.",
    image: "/images/services/yoga.jpg",
  },
  {
    id: 6,
    title: "Nutrition",
    short: "Nutrition",
    description:
      "Metabolic-focused nutrition planning and meal strategies designed to fuel your ambition and optimize body composition.",
    image: "/images/services/nutrition.jpg",
  },
  {
    id: 7,
    title: "Strength",
    short: "Strength",
    description:
      "Build real-world strength through bodyweight and structural control.",
    image: "/images/services/nutrition.jpg",
  },
  {
    id: 8,
    title: "Locomotion",
    short: "Locomotion",
    description:
      "Explore crawling, rolling, and ground patterns that build awareness.",
    image: "/images/services/nutrition.jpg",
  },
  {
    id: 9,
    title: "Object Manipulation",
    short: "Object Manipulation",
    description:
      "Learn coordination and rhythm through skillful interaction with tools.",
    image: "/images/services/nutrition.jpg",
  },
  {
    id: 10,
    title: "Hand Balancing",
    short: "Hand Balancing",
    description:
      "Build balance, strength, and control by learning to move upside down.",
    image: "/images/services/nutrition.jpg",
  },
  {
    id: 11,
    title: "Mobility",
    short: "Mobility",
    description:
      "Restore and expand your range of motion through targeted joint and tissue work.",
    image: "/images/services/nutrition.jpg",
  },
] as const;

type Service = (typeof services)[number];

const PURPLE = "#552583";
const SECTOR_BG = "#F0EDF8";
const SECTOR_ACTIVE = "#552583";
const RING_STROKE = "#E5DEFF";
const TEXT_DARK = "#1A1033";

const N = services.length;
const ANGLE_STEP = (2 * Math.PI) / N;
const OUTER_R = 240;
const INNER_R = 110;
const MID_R = (OUTER_R + INNER_R) / 2;
const GAP = 0.028;

function polar(r: number, angle: number): [number, number] {
  return [r * Math.cos(angle - Math.PI / 2), r * Math.sin(angle - Math.PI / 2)];
}

function sectorPath(i: number): string {
  const s = i * ANGLE_STEP + GAP;
  const e = (i + 1) * ANGLE_STEP - GAP;
  const [x1, y1] = polar(INNER_R, s);
  const [x2, y2] = polar(OUTER_R, s);
  const [x3, y3] = polar(OUTER_R, e);
  const [x4, y4] = polar(INNER_R, e);
  const large = ANGLE_STEP > Math.PI ? 1 : 0;
  return `M${x1},${y1} L${x2},${y2} A${OUTER_R},${OUTER_R} 0 ${large},1 ${x3},${y3} L${x4},${y4} A${INNER_R},${INNER_R} 0 ${large},0 ${x1},${y1}Z`;
}

function labelPos(i: number): [number, number] {
  const ang = (i + 0.5) * ANGLE_STEP;
  return polar(MID_R, ang);
}

function PlaceholderIllustration({ title }: { title: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 select-none">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{ background: `${PURPLE}22`, border: `2px solid ${PURPLE}` }}
      >
        <span style={{ color: PURPLE, fontSize: 36 }}>✦</span>
      </div>
      <p
        className="text-center font-semibold text-lg leading-tight px-8"
        style={{ color: TEXT_DARK }}
      >
        {title}
      </p>
    </div>
  );
}

export default function ServicesTest() {
  const [selected, setSelected] = useState(0);
  const [displayed, setDisplayed] = useState<Service>(services[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const wheelRotRef = useRef(0);
  const wheelElRef = useRef<SVGGElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const animatingRef = useRef(false);

  const handleSelect = useCallback(
    (idx: number) => {
      if (animatingRef.current || idx === selected) return;
      animatingRef.current = true;
      setIsAnimating(true);

      let diff = idx - selected;
      if (diff > N / 2) diff -= N;
      if (diff < -N / 2) diff += N;

      const startRot = wheelRotRef.current;
      const endRot = startRot - diff * ANGLE_STEP;
      const DURATION = 480;
      const startTime = performance.now();

      function tick(now: number) {
        const raw = Math.min((now - startTime) / DURATION, 1);
        const t =
          raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
        const rot = startRot + (endRot - startRot) * t;
        wheelRotRef.current = rot;

        if (wheelElRef.current) {
          wheelElRef.current.setAttribute(
            "transform",
            `rotate(${(rot * 180) / Math.PI})`,
          );
        }

        if (raw < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          wheelRotRef.current = endRot;
          animatingRef.current = false;
          setIsAnimating(false);
          setSelected(idx);
          setDisplayed(services[idx]);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    },
    [selected],
  );

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const currentService = displayed;

  // Shared wheel SVG used in both layouts
  const WheelSVG = (
    <svg
      viewBox="-260 -260 520 520"
      width="580"
      height="580"
      aria-label="Service selection wheel"
      style={{ maxWidth: "92vw", maxHeight: "92vw" }}
    >
      <g ref={wheelElRef} id="wheel-sectors">
        {services.map((svc, i) => {
          const isActive = i === selected;
          const [lx, ly] = labelPos(i);

          return (
            <g
              key={svc.id}
              style={{ cursor: isAnimating ? "default" : "pointer" }}
              onClick={() => handleSelect(i)}
              role="button"
              aria-label={svc.title}
              aria-pressed={isActive}
            >
              <path
                d={sectorPath(i)}
                fill={isActive ? SECTOR_ACTIVE : SECTOR_BG}
                stroke="white"
                strokeWidth={3}
                style={{ transition: "fill 0.3s ease" }}
              />
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={12}
                fontWeight={isActive ? 700 : 500}
                fontFamily="var(--font-sans, system-ui, sans-serif)"
                fill={isActive ? "#FFFFFF" : "#7C6FAE"}
                letterSpacing="0.04em"
                style={{ transition: "fill 0.3s ease", userSelect: "none" }}
              >
                {svc.short}
              </text>
            </g>
          );
        })}
      </g>

      <circle
        cx={0}
        cy={0}
        r={INNER_R - 2}
        fill="white"
        stroke={PURPLE}
        strokeWidth={2}
      />
      <circle
        cx={0}
        cy={0}
        r={INNER_R - 10}
        fill="white"
        stroke={`${PURPLE}33`}
        strokeWidth={1}
      />

      <AnimatedCenterText service={currentService} />
    </svg>
  );

  // Shared info card used in both layouts
  const InfoCard = (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentService.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.38, ease: "easeInOut" }}
        className="flex flex-col items-start gap-6 w-full max-w-xl px-6 lg:px-16"
      >
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
          style={{
            border: `1.5px solid ${PURPLE}`,
            color: PURPLE,
            background: `${PURPLE}0D`,
          }}
        >
          {currentService.title}
        </span>

        <div
          className="w-full rounded-2xl overflow-hidden flex items-center justify-center"
          style={{
            height: 340,
            border: `2px solid ${PURPLE}`,
            background: "#F0EDF8",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentService.image}
            alt={currentService.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              (e.currentTarget.nextSibling as HTMLElement).style.display =
                "flex";
            }}
          />
          <div
            className="w-full h-full items-center justify-center"
            style={{ display: "none" }}
          >
            <PlaceholderIllustration title={currentService.title} />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: TEXT_DARK }}>
            {currentService.title}
          </h3>
          <p className="text-gray-500 text-xl leading-relaxed max-w-sm">
            {currentService.description}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section
      id="services"
      className="w-full bg-white overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p
            className="text-xs font-semibold tracking-[0.18em] uppercase mb-3"
            style={{ color: PURPLE }}
          >
            What We Offer
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-2">
              Our Featured Services
            </h2>
            <TextGenerateEffect
              words="Tailored fitness programs built around your lifestyle, goals, and schedule."
              className="text-gray-600 max-w-xl mx-auto text-sm lg:text-base font-normal text-center"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile: card on top, wheel below */}
      <div className="flex flex-col lg:hidden w-full">
        <div
          className="relative flex items-center justify-center w-full py-8"
          style={{ background: "#FAFAFA" }}
        >
          <div
            className="absolute top-0 left-0 w-40 h-40 pointer-events-none"
            style={{
              background: `radial-gradient(circle at top left, ${PURPLE}18, transparent 70%)`,
            }}
          />
          {InfoCard}
        </div>

        <div className="relative flex items-center justify-center w-full bg-white py-10">
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden
          >
            <div
              className="rounded-full"
              style={{
                width: 420,
                height: 420,
                border: `1px solid ${RING_STROKE}`,
                opacity: 0.6,
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: 280,
                height: 280,
                border: `1px solid ${RING_STROKE}`,
                opacity: 0.4,
              }}
            />
          </div>
          {WheelSVG}
        </div>
      </div>

      {/* Desktop: side by side, vertically aligned at their natural midpoints */}
      <div
        className="hidden lg:flex w-full items-stretch"
        style={{ minHeight: "74vh" }}
      >
        {/* Left — info card, vertically centered within the row */}
        <div
          className="relative flex items-center justify-center w-1/2 overflow-hidden py-12"
          style={{ background: "#FAFAFA" }}
        >
          <div
            className="absolute top-0 left-0 w-40 h-40 pointer-events-none"
            style={{
              background: `radial-gradient(circle at top left, ${PURPLE}18, transparent 70%)`,
            }}
          />
          {InfoCard}
        </div>

        {/* Right — wheel, vertically centered */}
        <div className="relative flex items-center justify-center w-1/2 bg-white">
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden
          >
            <div
              className="rounded-full"
              style={{
                width: 620,
                height: 620,
                border: `1px solid ${RING_STROKE}`,
                opacity: 0.6,
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: 420,
                height: 420,
                border: `1px solid ${RING_STROKE}`,
                opacity: 0.4,
              }}
            />
          </div>
          {WheelSVG}
        </div>
      </div>
    </section>
  );
}

function AnimatedCenterText({ service }: { service: Service }) {
  const words = service.title.split(" ");
  const line1 = words.slice(0, Math.ceil(words.length / 2)).join(" ");
  const line2 = words.slice(Math.ceil(words.length / 2)).join(" ");

  return (
    <AnimatePresence mode="wait">
      <motion.g
        key={service.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
      >
        <foreignObject x={-78} y={-52} width={156} height={104}>
          <div
            // @ts-ignore
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-sans, system-ui, sans-serif)",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: TEXT_DARK,
                lineHeight: 1.25,
              }}
            >
              {line1}
            </span>
            {line2 && (
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: TEXT_DARK,
                  lineHeight: 1.25,
                }}
              >
                {line2}
              </span>
            )}
            <span
              style={{
                fontSize: 9,
                fontWeight: 500,
                color: PURPLE,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: 6,
              }}
            >
              Selected
            </span>
          </div>
        </foreignObject>
      </motion.g>
    </AnimatePresence>
  );
}
