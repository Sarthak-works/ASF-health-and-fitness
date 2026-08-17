"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const testimonials = [
  // New testimonials - newest first
  {
    id: 8,
    name: "Client Result",
    video: "/testimonial videos/rupesh 12-6.mp4",
    poster: "/testimonial-video-posters/rupesh 12-6_frame-001.jpg",
  },
  {
    id: 7,
    name: "Client Result",
    video: "/testimonial videos/Farzan 26-5.mp4",
    poster: "/testimonial-video-posters/Farzan 26-5_frame-001.jpg",
  },
  {
    id: 6,
    name: "Client Result",
    video: "/testimonial videos/Satish 25-5.mp4",
    poster: "/testimonial-video-posters/Satish 25-5_frame-001.jpg",
  },
  {
    id: 5,
    name: "Client Result",
    video: "/testimonial videos/Zenobia 24-5.mp4",
  },
  {
    id: 4,
    name: "Client Result",
    video: "/testimonial videos/Chronic back pain 16-5.mp4",
    poster: "/testimonial-video-posters/Chronic back pain 16-5_frame-001.jpg",
  },
  {
    id: 3,
    name: "Client Result",
    video: "/testimonial videos/kiran 15-5.mp4",
    poster: "/testimonial-video-posters/kiran 15-5_frame-001.jpg",
  },
  // Original testimonials - older
  {
    id: 9,
    name: "Client Result",
    video: "/testimonial videos/testimonial1.mp4",
    poster: "/testimonial-video-posters/testimonial1_frame-001.jpg",
  },
  {
    id: 10,
    name: "Client Result",
    video: "/testimonial videos/testimonial2.mp4",
    poster: "/testimonial-video-posters/testimonial2_frame-001.jpg",
  },
  {
    id: 11,
    name: "Client Result",
    video: "/testimonial videos/testimonial3.mp4",
    poster: "/testimonial-video-posters/testimonial3_frame-001.jpg",
  },
  {
    id: 12,
    name: "Client Result",
    video: "/testimonial videos/testimonial4.mp4",
    poster: "/testimonial-video-posters/testimonial4_frame-001.jpg",
  },
  {
    id: 13,
    name: "Client Result",
    video: "/testimonial videos/Sanjay.mp4",
    poster: "/testimonial-video-posters/Sanjay.jpg",
  },
  {
    id: 14,
    name: "Client Result",
    video: "/testimonial videos/Nishith.mp4",
    poster: "/testimonial-video-posters/nitishit.jpg",
  },
  {
    id: 15,
    name: "Client Result",
    video: "/testimonial videos/Mathangi.mp4",
    poster: "/testimonial-video-posters/Mathangi.jpg",
  },
  {
    id: 2,
    name: "Client Result",
    video: "/testimonial videos/workouts finally make sense 16-3.mp4",
    poster:
      "/testimonial-video-posters/workouts finally make sense 16-3_frame-001.jpg",
  },
];

function ReelPlayer({
  src,
  poster,
  priority,
}: {
  src: string;
  poster: string;
  priority?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative aspect-[9/16] bg-zinc-900 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50 group transition-transform duration-500 hover:scale-[1.02]">
      {!isPlaying ? (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Play client testimonial video"
          className="absolute inset-0 w-full h-full cursor-pointer"
        >
          {/* Poster image only — no video is fetched until the user clicks */}
          <img
            src={poster}
            alt="Client transformation testimonial thumbnail"
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 md:w-8 md:h-8 text-purple-700 ml-1"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </button>
      ) : (
        <video
          ref={videoRef}
          src={src}
          controls
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      )}
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
              <ReelPlayer
                src={item.video}
                poster={item.poster}
                priority={i < 3}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
