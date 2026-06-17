// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';

// const testimonials = [
//   {
//     id: 1,
//     name: "Client Result",
//     video: "/testimonial1.mp4#t=0.8",
//   },
//   {
//     id: 2,
//     name: "Client Result",
//     video: "/testimonial2.mp4#t=0.5",
//   },
//   {
//     id: 3,
//     name: "Client Result",
//     video: "/testimonial3.mp4#t=0.1",
//   },
//   {
//     id: 4,
//     name: "Client Result",
//     video: "/testimonial4.mp4#t=0.1",
//   },
// ];

// function ReelPlayer({ src }: { src: string }) {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     // Seek to a specific time to ensure a thumbnail is visible
//     const handleLoadedData = () => {
//       if (video.currentTime === 0) {
//         video.currentTime = 0.1;
//       }
//     };

//     video.addEventListener('loadeddata', handleLoadedData);

//     return () => {
//       video.removeEventListener('loadeddata', handleLoadedData);
//     };
//   }, []);

//   const handleMouseEnter = () => {
//     if (videoRef.current) {
//       videoRef.current.play().catch(() => { });
//     }
//   };

//   const handleMouseLeave = () => {
//     if (videoRef.current) {
//       videoRef.current.pause();
//     }
//   };

//   return (
//     <div
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       className="relative aspect-[9/16] bg-zinc-900 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50 group transition-transform duration-500 hover:scale-[1.02]"
//     >
//       <video
//         ref={videoRef}
//         src={src}
//         controls
//         playsInline
//         muted
//         loop
//         preload="metadata"
//         className="w-full h-full object-cover"
//       />
//       {/* Overlay for hover effects, positioned so it doesn't block controls */}
//       <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
//     </div>
//   );
// }

// export default function Testimonials() {
//   const { ref } = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   return (
//     <section id="testimonials" className="relative min-h-[100dvh] flex items-center bg-white overflow-hidden py-16 md:py-20 px-4">
//       <div className="max-w-7xl mx-auto w-full z-10 text-center relative">
//         <motion.span
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="section-label mb-4 md:mb-6 block transition-all"
//         >
//           TESTIMONIALS
//         </motion.span>

//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.1 }}
//           className="text-3xl md:text-5xl lg:text-6xl font-bold text-dark mb-6 md:mb-8 leading-tight"
//         >
//           Hear Directly from Our Clients
//         </motion.h2>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.2 }}
//           className="text-gray-600 max-w-3xl mx-auto mb-12 md:mb-16 text-lg md:text-xl lg:text-2xl leading-relaxed"
//         >
//           Explore inspiring body transformation journeys from real clients who committed to change and achieved incredible results.
//         </motion.p>

//         <div ref={ref} className="w-full flex flex-col items-center gap-16 md:gap-24">
//           {testimonials.map((item, i) => (
//             <motion.div
//               key={item.id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.1 + (i % 3) * 0.1 }}
//               className="w-full max-w-[240px] md:max-w-[280px] lg:max-w-[320px] mx-auto"
//             >
//               <ReelPlayer src={item.video} />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const testimonials = [
  // New testimonials - newest first
  {
    id: 8,
    name: "Client Result",
    video: "/rupesh 12-6.mp4",
  },
  {
    id: 7,
    name: "Client Result",
    video: "/Farzan 26-5.mp4",
  },
  {
    id: 6,
    name: "Client Result",
    video: "/Satish 25-5.mp4",
  },
  {
    id: 5,
    name: "Client Result",
    video: "/Zenobia 24-5.mp4",
  },
  {
    id: 4,
    name: "Client Result",
    video: "/Chronic back pain 16-5.mp4",
  },
  {
    id: 3,
    name: "Client Result",
    video: "/kiran 15-5.mp4",
  },
  // Original testimonials - older
  {
    id: 9,
    name: "Client Result",
    video: "/testimonial1.mp4#t=0.8",
  },
  {
    id: 10,
    name: "Client Result",
    video: "/testimonial2.mp4#t=0.5",
  },
  {
    id: 11,
    name: "Client Result",
    video: "/testimonial3.mp4#t=0.1",
  },
  {
    id: 12,
    name: "Client Result",
    video: "/testimonial4.mp4#t=0.1",
  },
  {
    id: 2,
    name: "Client Result",
    video: "/workouts finally make sense 16-3.mp4",
  },
];

function ReelPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      if (video.currentTime === 0) {
        video.currentTime = 0.1;
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-[9/16] bg-zinc-900 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50 group transition-transform duration-500 hover:scale-[1.02]"
    >
      <video
        ref={videoRef}
        src={src}
        controls
        playsInline
        muted
        loop
        preload="metadata"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

export default function Testimonials() {
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="testimonials"
      className="relative min-h-[100dvh] flex items-center bg-white overflow-hidden py-16 md:py-20 px-4"
    >
      <div className="max-w-7xl mx-auto w-full z-10 text-center relative">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label mb-4 md:mb-6 block transition-all"
        >
          TESTIMONIALS
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-dark mb-6 md:mb-8 leading-tight"
        >
          Hear Directly from Our Clients
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-3xl mx-auto mb-12 md:mb-16 text-lg md:text-xl lg:text-2xl leading-relaxed"
        >
          Explore inspiring body transformation journeys from real clients who
          committed to change and achieved incredible results.
        </motion.p>

        {/* Mobile: single column | Desktop: 3-column grid */}
        <div
          ref={ref}
          className="
            w-full
            grid
            grid-cols-1
            gap-8
            md:grid-cols-3
            md:gap-6
            lg:gap-8
            px-0
            md:px-4
            lg:px-8
          "
        >
          {testimonials.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + (i % 3) * 0.1 }}
              className="
                w-full
                max-w-[240px]
                mx-auto
                md:max-w-none
                md:mx-0
              "
            >
              <ReelPlayer src={item.video} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
