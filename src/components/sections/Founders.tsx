'use client';

import { motion } from 'framer-motion';
import { FocusCards } from "@/components/ui/focus-cards";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const teamCards = [
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
  {
    title: "Hoyam Ahmed",
    role: "Fitness Coach",
    src: "/coach-hoyam.webp",
  },

  {
    title: "Dileef Thahir",
    role: "Elite Trainer",
    src: "/coach-dileef.webp",
  },
  {
    title: "Aniket",
    role: "Coach",
    src: "/coach-aniket.webp",
  },
  {
    title: "Sujal",
    role: "Coach",
    src: "/coach-sujal.webp",
  },
  {
    title: "Tharushi",
    role: "Coach",
    src: "/coach-tharushi.webp",
  }
];

// Custom Card UI to be used by FocusCards if we wanted a custom render, 
// but Aceternity's FocusCards has its own Card component.
// However, the user wants 3D tilt perspective ON trainer cards ON hover (Aceternity 3D Card Effect)
// And Focus Cards (hover focus with blur for team grid).
// To combine them, we need to modify FocusCards to use 3D Card internally or vice versa.
// Let's modify FocusCards.tsx to include the 3D tilt effect on the focused card.

export default function OurTeam() {
  return (
    <section id="team" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="headline-medium mb-4"
        >
          Meet Our Expert Trainers
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg"
        >
          Our certified trainers bring years of experience and a passion for helping you achieve your goals.
        </motion.p>

        <div>
          <FocusCards cards={teamCards} />
        </div>
      </div>
    </section>
  );
}
