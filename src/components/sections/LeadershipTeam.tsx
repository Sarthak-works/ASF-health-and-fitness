// "use client";Commented out because we removed Akshay’s founder section and included him in the team.

// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import Image from "next/image";
// import { AnimatePresence, motion } from "framer-motion";
// import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

// // ─── Data ─────────────────────────────────────────────────────────────────────

// /* Specialisation groups. These become the filter pills (with live counts). */
// const GROUPS = [
//   { id: "senior", label: "Senior Coaches" },
//   { id: "corporate", label: "Corporate Wellness" },
//   { id: "expert", label: "Expert Coaches" },
//   { id: "nutrition", label: "Nutrition" },
//   { id: "mental", label: "Mental Well-being" },
// ] as const;

// type GroupId = (typeof GROUPS)[number]["id"];

// interface Member {
//   name: string;
//   role: string;
//   src: string;
//   group: GroupId;
// }

// const FOUNDER = {
//   name: "Akshay Sahu",
//   role: "Founder / CMO, ASF Coaching",
//   image: "/Akshay-suit.JPG",
//   stats: [
//     { value: "10+", label: "Years Coaching Experience" },
//     { value: "200+", label: "Clients Trained" },
//     { value: "Elite", label: "Men's Physique Athlete" },
//   ],
// };

// const TEAM: Member[] = [
//   {
//     name: "Hoyam Ahmed",
//     role: "Fitness Coach",
//     src: "/coach-hoyam.webp",
//     group: "senior",
//   },
//   {
//     name: "Mohammed Hasnain",
//     role: "Strength Coach",
//     src: "/coach-hasnain.webp",
//     group: "senior",
//   },
//   {
//     name: "Rakesh",
//     role: "Corporate Coach",
//     src: "/Rakesh.jpg",
//     group: "corporate",
//   },
//   {
//     name: "Karthik Jadhav",
//     role: "Performance Coach",
//     src: "/coach-karthik.webp",
//     group: "expert",
//   },
//   {
//     name: "Dileef Thahir",
//     role: "Elite Trainer",
//     src: "/coach-dileef.webp",
//     group: "expert",
//   },
//   { name: "Aniket", role: "Coach", src: "/coach-aniket.webp", group: "expert" },
//   { name: "Sujal", role: "Coach", src: "/coach-sujal.webp", group: "expert" },
//   {
//     name: "Harsha Nachane",
//     role: "Clinical Nutritionist",
//     src: "/harsha.jpeg",
//     group: "nutrition",
//   },
//   {
//     name: "Sangeeta",
//     role: "Psychologist",
//     src: "/sangeeta.jpeg",
//     group: "mental",
//   },
// ];

// // ─── Component ────────────────────────────────────────────────────────────────

// export default function LeadershipTeam() {
//   const [filter, setFilter] = useState<"all" | GroupId>("all");
//   const [active, setActive] = useState<number | null>(null);
//   const [canPrev, setCanPrev] = useState(false);
//   const [canNext, setCanNext] = useState(true);
//   const trackRef = useRef<HTMLDivElement>(null);

//   const visible = useMemo(
//     () => (filter === "all" ? TEAM : TEAM.filter((m) => m.group === filter)),
//     [filter],
//   );

//   const totalPeople = TEAM.length + 1; // team + founder

//   /* Enable / disable the carousel arrows based on scroll position */
//   const updateArrows = useCallback(() => {
//     const el = trackRef.current;
//     if (!el) return;
//     setCanPrev(el.scrollLeft > 4);
//     setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
//   }, []);

//   useEffect(() => {
//     updateArrows();
//     window.addEventListener("resize", updateArrows);
//     return () => window.removeEventListener("resize", updateArrows);
//   }, [filter, updateArrows]);

//   const scrollTrack = (dir: 1 | -1) => {
//     const el = trackRef.current;
//     if (!el) return;
//     const card = el.querySelector<HTMLElement>("[data-card]");
//     const gap = parseFloat(getComputedStyle(el).columnGap || "16") || 16;
//     const step = card ? card.offsetWidth + gap : el.clientWidth * 0.9;
//     el.scrollBy({ left: dir * step, behavior: "smooth" });
//   };

//   // Lightbox: keyboard support + page scroll lock
//   useEffect(() => {
//     if (active === null) return;
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setActive(null);
//       if (e.key === "ArrowRight")
//         setActive((i) => (i === null ? i : (i + 1) % visible.length));
//       if (e.key === "ArrowLeft")
//         setActive((i) =>
//           i === null ? i : (i - 1 + visible.length) % visible.length,
//         );
//     };
//     window.addEventListener("keydown", onKey);
//     const prevOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     return () => {
//       window.removeEventListener("keydown", onKey);
//       document.body.style.overflow = prevOverflow;
//     };
//   }, [active, visible.length]);

//   const activeMember = active !== null ? visible[active] : null;

//   return (
//     <section
//       id="team"
//       className="scroll-mt-20 py-14 md:py-20 bg-white w-full max-w-full overflow-hidden"
//     >
//       <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
//         {/* ── Heading ── */}
//         <div className="text-center mb-8 md:mb-10 min-w-0">
//           <motion.span
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="section-label mb-3 block"
//           >
//             THE ASF TEAM
//           </motion.span>
//           <motion.h2
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.05 }}
//             className="headline-medium mb-3 break-words"
//             style={{
//               fontSize: "clamp(1.6rem, 6vw, 3rem)",
//               lineHeight: 1.15,
//               textWrap: "balance",
//             }}
//           >
//             Led By Experience. Built By Specialists.
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.1 }}
//             className="text-gray-500 text-sm md:text-base max-w-xl mx-auto"
//           >
//             <span className="font-bold text-purple">{totalPeople} experts</span>{" "}
//             across{" "}
//             <span className="font-bold text-purple">
//               {GROUPS.length} specialisations
//             </span>
//             , from strength and performance to nutrition and mental well-being.
//           </motion.p>
//         </div>

//         {/* ── Founder strip (full width) ── */}
//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="flex flex-col sm:flex-row rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm mb-8 md:mb-10"
//         >
//           {/* Large portrait: 4:5 so the full photo shows, not a thin crop */}
//           <div className="relative w-full aspect-[4/5] sm:w-[300px] md:w-[360px] lg:w-[440px] xl:w-[480px] flex-shrink-0">
//             <img
//               src={FOUNDER.image}
//               alt={FOUNDER.name}
//               className="absolute inset-0 w-full h-full object-cover object-top"
//             />
//             <span className="absolute top-4 left-4 bg-purple text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full">
//               Founder
//             </span>
//           </div>
//           <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center min-w-0 flex-1">
//             <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark leading-tight">
//               {FOUNDER.name}
//             </h3>
//             <p className="text-gray-500 font-semibold text-xs md:text-sm uppercase tracking-wider mt-2">
//               {FOUNDER.role}
//             </p>
//             <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8">
//               {FOUNDER.stats.map((st) => (
//                 <div
//                   key={st.label}
//                   className="rounded-2xl bg-purple/10 px-3 py-4 md:px-5 md:py-5 text-center sm:text-left"
//                 >
//                   <p className="text-2xl md:text-4xl font-extrabold text-purple leading-none">
//                     {st.value}
//                   </p>
//                   <p className="text-[11px] md:text-sm font-medium text-gray-600 mt-2 leading-snug">
//                     {st.label}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </motion.div>

//         {/* ── Filters + arrows ── */}
//         <div className="flex items-center gap-4 mb-5 min-w-0">
//           <div
//             className="flex-1 min-w-0 flex gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap pb-1"
//             style={{ scrollbarWidth: "none" }}
//           >
//             {[{ id: "all" as const, label: "All" }, ...GROUPS].map((g) => {
//               const count =
//                 g.id === "all"
//                   ? TEAM.length
//                   : TEAM.filter((m) => m.group === g.id).length;
//               const isOn = filter === g.id;
//               return (
//                 <button
//                   key={g.id}
//                   onClick={() => {
//                     setActive(null);
//                     setFilter(g.id);
//                   }}
//                   className={`flex-shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm font-semibold transition-colors ${
//                     isOn
//                       ? "bg-purple text-white shadow"
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   {g.label}
//                   <span
//                     className={`rounded-full px-1.5 text-[10px] md:text-xs ${
//                       isOn ? "bg-white/20" : "bg-white text-gray-500"
//                     }`}
//                   >
//                     {count}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           <div className="hidden md:flex gap-2 flex-shrink-0">
//             <button
//               onClick={() => scrollTrack(-1)}
//               disabled={!canPrev}
//               aria-label="Previous coaches"
//               className="w-11 h-11 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center transition-colors hover:bg-purple hover:text-white hover:border-purple disabled:opacity-30 disabled:pointer-events-none"
//             >
//               <ChevronLeft size={20} />
//             </button>
//             <button
//               onClick={() => scrollTrack(1)}
//               disabled={!canNext}
//               aria-label="Next coaches"
//               className="w-11 h-11 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center transition-colors hover:bg-purple hover:text-white hover:border-purple disabled:opacity-30 disabled:pointer-events-none"
//             >
//               <ChevronRight size={20} />
//             </button>
//           </div>
//         </div>

//         {/* ── Large poster carousel ──
//             Mobile: 1 card + a peek of the next. Tablet: 2. Desktop: 3 across
//             the full width. Swipe on touch, arrows on desktop. */}
//         <div
//           key={filter}
//           ref={trackRef}
//           onScroll={updateArrows}
//           className="grid grid-flow-col gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scroll-pl-4 sm:mx-0 sm:px-0 sm:scroll-pl-0 auto-cols-[80%] sm:auto-cols-[calc((100%_-_1rem)/2)] lg:auto-cols-[calc((100%_-_3rem)/3)] [&::-webkit-scrollbar]:hidden"
//           style={{ scrollbarWidth: "none", justifyContent: "safe center" }}
//         >
//           {visible.map((m, i) => (
//             <motion.div
//               key={m.name}
//               data-card
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.05, duration: 0.35 }}
//               className="snap-start min-w-0"
//             >
//               <button
//                 onClick={() => setActive(i)}
//                 aria-label={`View ${m.name}, ${m.role}`}
//                 className="group relative block w-full aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
//               >
//                 <Image
//                   src={m.src}
//                   alt={`${m.name} – ${m.role}`}
//                   fill
//                   sizes="(max-width: 640px) 80vw, (max-width: 1024px) 46vw, 420px"
//                   className="object-cover object-top"
//                 />
//                 <span className="absolute top-3 right-3 bg-white/90 text-gray-800 rounded-full p-2 shadow opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
//                   <Maximize2 size={14} />
//                 </span>
//               </button>
//               <div className="mt-3 px-1 min-w-0">
//                 <p className="font-bold text-dark text-base md:text-lg leading-tight truncate">
//                   {m.name}
//                 </p>
//                 <p className="text-purple text-sm font-semibold truncate">
//                   {m.role}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <p className="text-xs text-gray-400 text-center mt-1">
//           <span className="md:hidden">Swipe to browse · </span>
//           Tap any coach to enlarge their specialisations and certifications.
//         </p>
//       </div>

//       {/* ── Lightbox with the full poster ── */}
//       <AnimatePresence>
//         {activeMember && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setActive(null)}
//             className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
//             role="dialog"
//             aria-modal="true"
//             aria-label={`${activeMember.name} profile`}
//           >
//             <button
//               onClick={() => setActive(null)}
//               aria-label="Close"
//               className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-white/15 hover:bg-white/25 text-white rounded-full p-2.5 transition-colors"
//             >
//               <X size={22} />
//             </button>

//             {visible.length > 1 && (
//               <>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setActive((i) =>
//                       i === null
//                         ? i
//                         : (i - 1 + visible.length) % visible.length,
//                     );
//                   }}
//                   aria-label="Previous"
//                   className="absolute left-1 sm:left-6 top-1/2 -translate-y-1/2 z-10 bg-white/15 hover:bg-white/30 text-white rounded-full p-2 sm:p-2.5 transition-colors"
//                 >
//                   <ChevronLeft size={24} />
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setActive((i) =>
//                       i === null ? i : (i + 1) % visible.length,
//                     );
//                   }}
//                   aria-label="Next"
//                   className="absolute right-1 sm:right-6 top-1/2 -translate-y-1/2 z-10 bg-white/15 hover:bg-white/30 text-white rounded-full p-2 sm:p-2.5 transition-colors"
//                 >
//                   <ChevronRight size={24} />
//                 </button>
//               </>
//             )}

//             <motion.div
//               key={activeMember.name}
//               initial={{ opacity: 0, scale: 0.96 }}
//               animate={{ opacity: 1, scale: 1 }}
//               onClick={(e) => e.stopPropagation()}
//               className="flex flex-col items-center gap-3 max-w-full"
//             >
//               <img
//                 src={activeMember.src}
//                 alt={activeMember.name}
//                 className="max-h-[78vh] max-w-[86vw] sm:max-w-[90vw] w-auto h-auto rounded-2xl shadow-2xl bg-white"
//               />
//               <p className="text-white text-sm font-semibold text-center">
//                 {activeMember.name}{" "}
//                 <span className="text-accent font-medium">
//                   · {activeMember.role}
//                 </span>
//               </p>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

/* Specialisation groups. These become the filter pills (with live counts). */
const GROUPS = [
  { id: "senior", label: "Senior Coaches" },
  { id: "corporate", label: "Corporate Wellness" },
  { id: "expert", label: "Expert Coaches" },
  { id: "nutrition", label: "Nutrition" },
  { id: "mental", label: "Mental Well-being" },
] as const;

type GroupId = (typeof GROUPS)[number]["id"];

interface Member {
  name: string;
  role: string;
  src: string;
  group?: GroupId; // optional: the founder card only shows under "All"
}

/* Flow Team (Leo, Isha, Gokul) has been removed. The founder is now the first
   card in the team list and appears only under the "All" filter. */
const TEAM: Member[] = [
  {
    name: "Akshay Sahu",
    role: "Founder / CMO, ASF Coaching",
    src: "/Akshay.jpeg",
    // no group, so he appears first under "All" and in no other filter
  },
  {
    name: "Hoyam Ahmed",
    role: "Fitness Coach",
    src: "/coach-hoyam.webp",
    group: "senior",
  },
  {
    name: "Mohammed Hasnain",
    role: "Strength Coach",
    src: "/coach-hasnain.webp",
    group: "senior",
  },
  {
    name: "Rakesh",
    role: "Corporate Coach",
    src: "/Rakesh.jpg",
    group: "corporate",
  },
  {
    name: "Karthik Jadhav",
    role: "Performance Coach",
    src: "/coach-karthik.webp",
    group: "expert",
  },
  {
    name: "Dileef Thahir",
    role: "Elite Trainer",
    src: "/coach-dileef.webp",
    group: "expert",
  },
  { name: "Aniket", role: "Coach", src: "/coach-aniket.webp", group: "expert" },
  { name: "Sujal", role: "Coach", src: "/coach-sujal.webp", group: "expert" },
  {
    name: "Harsha Nachane",
    role: "Clinical Nutritionist",
    src: "/harsha.jpeg",
    group: "nutrition",
  },
  {
    name: "Sangeeta",
    role: "Psychologist",
    src: "/sangeeta.jpeg",
    group: "mental",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function LeadershipTeam() {
  const [filter, setFilter] = useState<"all" | GroupId>("all");
  const [active, setActive] = useState<number | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () => (filter === "all" ? TEAM : TEAM.filter((m) => m.group === filter)),
    [filter],
  );

  const totalPeople = TEAM.length; // founder is already included in TEAM

  /* Enable / disable the carousel arrows based on scroll position */
  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [filter, updateArrows]);

  const scrollTrack = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = parseFloat(getComputedStyle(el).columnGap || "16") || 16;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // Lightbox: keyboard support + page scroll lock
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight")
        setActive((i) => (i === null ? i : (i + 1) % visible.length));
      if (e.key === "ArrowLeft")
        setActive((i) =>
          i === null ? i : (i - 1 + visible.length) % visible.length,
        );
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, visible.length]);

  const activeMember = active !== null ? visible[active] : null;

  return (
    <section
      id="team"
      className="scroll-mt-20 py-14 md:py-20 bg-white w-full max-w-full overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        {/* ── Heading ── */}
        <div className="text-center mb-8 md:mb-10 min-w-0">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label mb-3 block"
          >
            THE ASF TEAM
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="headline-medium mb-3 break-words"
            style={{
              fontSize: "clamp(1.6rem, 6vw, 3rem)",
              lineHeight: 1.15,
              textWrap: "balance",
            }}
          >
            Led By Experience. Built By Specialists.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-sm md:text-base max-w-xl mx-auto"
          >
            <span className="font-bold text-purple">{totalPeople} experts</span>{" "}
            across{" "}
            <span className="font-bold text-purple">
              {GROUPS.length} specialisations
            </span>
            , from strength and performance to nutrition and mental well-being.
          </motion.p>
        </div>

        {/* ── Filters + arrows ── */}
        <div className="flex items-center gap-4 mb-5 min-w-0">
          <div
            className="flex-1 min-w-0 flex gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {[{ id: "all" as const, label: "All" }, ...GROUPS].map((g) => {
              const count =
                g.id === "all"
                  ? TEAM.length
                  : TEAM.filter((m) => m.group === g.id).length;
              const isOn = filter === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => {
                    setActive(null);
                    setFilter(g.id);
                  }}
                  className={`flex-shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs md:text-sm font-semibold transition-colors ${
                    isOn
                      ? "bg-purple text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {g.label}
                  <span
                    className={`rounded-full px-1.5 text-[10px] md:text-xs ${
                      isOn ? "bg-white/20" : "bg-white text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex gap-2 flex-shrink-0">
            <button
              onClick={() => scrollTrack(-1)}
              disabled={!canPrev}
              aria-label="Previous coaches"
              className="w-11 h-11 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center transition-colors hover:bg-purple hover:text-white hover:border-purple disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollTrack(1)}
              disabled={!canNext}
              aria-label="Next coaches"
              className="w-11 h-11 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center transition-colors hover:bg-purple hover:text-white hover:border-purple disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ── Large poster carousel ──
            Mobile: 1 card + a peek of the next. Tablet: 2. Desktop: 3 across
            the full width. Swipe on touch, arrows on desktop. */}
        <div
          key={filter}
          ref={trackRef}
          onScroll={updateArrows}
          className="grid grid-flow-col gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scroll-pl-4 sm:mx-0 sm:px-0 sm:scroll-pl-0 auto-cols-[80%] sm:auto-cols-[calc((100%_-_1rem)/2)] lg:auto-cols-[calc((100%_-_3rem)/3)] [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", justifyContent: "safe center" }}
        >
          {visible.map((m, i) => (
            <motion.div
              key={m.name}
              data-card
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="snap-start min-w-0"
            >
              <button
                onClick={() => setActive(i)}
                aria-label={`View ${m.name}, ${m.role}`}
                className="group relative block w-full aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <Image
                  src={m.src}
                  alt={`${m.name} – ${m.role}`}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 46vw, 420px"
                  className="object-cover object-top"
                />
                <span className="absolute top-3 right-3 bg-white/90 text-gray-800 rounded-full p-2 shadow opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={14} />
                </span>
              </button>
              <div className="mt-3 px-1 min-w-0">
                <p className="font-bold text-dark text-base md:text-lg leading-tight truncate">
                  {m.name}
                </p>
                <p className="text-purple text-sm font-semibold truncate">
                  {m.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center mt-1">
          <span className="md:hidden">Swipe to browse · </span>
          Tap any coach to enlarge their specialisations and certifications.
        </p>
      </div>

      {/* ── Lightbox with the full poster ── */}
      <AnimatePresence>
        {activeMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeMember.name} profile`}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-white/15 hover:bg-white/25 text-white rounded-full p-2.5 transition-colors"
            >
              <X size={22} />
            </button>

            {visible.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive((i) =>
                      i === null
                        ? i
                        : (i - 1 + visible.length) % visible.length,
                    );
                  }}
                  aria-label="Previous"
                  className="absolute left-1 sm:left-6 top-1/2 -translate-y-1/2 z-10 bg-white/15 hover:bg-white/30 text-white rounded-full p-2 sm:p-2.5 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive((i) =>
                      i === null ? i : (i + 1) % visible.length,
                    );
                  }}
                  aria-label="Next"
                  className="absolute right-1 sm:right-6 top-1/2 -translate-y-1/2 z-10 bg-white/15 hover:bg-white/30 text-white rounded-full p-2 sm:p-2.5 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <motion.div
              key={activeMember.name}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center gap-3 max-w-full"
            >
              <img
                src={activeMember.src}
                alt={activeMember.name}
                className="max-h-[78vh] max-w-[86vw] sm:max-w-[90vw] w-auto h-auto rounded-2xl shadow-2xl bg-white"
              />
              <p className="text-white text-sm font-semibold text-center">
                {activeMember.name}{" "}
                <span className="text-accent font-medium">
                  · {activeMember.role}
                </span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
