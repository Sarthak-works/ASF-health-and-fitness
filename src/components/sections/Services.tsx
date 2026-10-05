"use client";

import { motion } from "framer-motion";
import {
  Dumbbell,
  Activity,
  Users,
  Zap,
  HeartPulse,
  Brain,
  Salad,
  Shield,
  Stethoscope,
  PersonStanding,
  Waves,
} from "lucide-react";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";

const services = [
  {
    title: "C - Suite Coach",
    icon: <Users size={32} />,
    description:
      "Executive-level coaching designed for high-performing leaders who demand peak physical and mental performance.",
  },
  {
    title: "VIP Trainer",
    icon: <Zap size={32} />,
    description:
      "Elite one-on-one training with bespoke scheduling and personalized nutrition strategies for the busy professional.",
  },
  {
    title: "Personal Trainer",
    icon: <Dumbbell size={32} />,
    description:
      "Tailored strength and conditioning programs built to help you master your fitness and sustain long-term success.",
  },
  {
    title: "Semi Private / Couple Training",
    icon: <Activity size={32} />,
    description:
      "Exclusive small-group sessions or partner training focused on shared goals and high-intensity performance.",
  },
  {
    title: "Mental Health",
    icon: <Brain size={32} />,
    description:
      "Holistic mindset coaching to manage stress, improve focus, and build the mental resilience required for elite performance.",
  },
  {
    // Replaces "Yoga"
    title: "Pain Management",
    icon: <Waves size={32} />,
    description:
      "Movement-based techniques and guided recovery work to ease chronic and recurring pain, reduce stiffness, and help you move comfortably in training and daily life.",
  },
  {
    title: "Nutrition",
    icon: <Salad size={32} />,
    description:
      "Metabolic-focused nutrition planning and meal strategies designed to fuel your ambition and optimize body composition.",
  },
  {
    title: "Strength Development",
    icon: <Dumbbell size={32} />,
    description:
      "Build real-world strength through bodyweight and structural control.",
  },
  {
    // Replaces "Locomotion"
    title: "Injury Rehabilitation",
    icon: <Stethoscope size={32} />,
    description:
      "Targeted recovery protocols designed to bridge the gap between clinical healing and high-performance training, helping you overcome setbacks safely.",
  },
  {
    // Replaces "Object Manipulation"
    title: "Posture Correction",
    icon: <PersonStanding size={32} />,
    description:
      "Specialized movement assessments and corrective exercises to realign structural imbalances, relieve chronic tension, and restore optimal daily mechanics.",
  },
  {
    // Replaces "Hand Balancing"
    title: "Clinical Conditioning",
    icon: <Shield size={32} />,
    description:
      "Customized conditioning programs tailored around specific medical considerations or chronic conditions to safely enhance physical capacity, strength, and overall vitality.",
  },
  {
    title: "Mobility",
    icon: <HeartPulse size={32} />,
    description:
      "Restore and expand your range of motion through targeted joint and tissue work.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="min-h-[100dvh] flex items-center bg-white overflow-hidden py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-purple/5 transition-all text-left flex flex-col items-start group"
            >
              <div className="w-10 h-10 bg-purple/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple transition-colors duration-300">
                <div className="scale-75 text-purple group-hover:text-white transition-colors">
                  {service.icon}
                </div>
              </div>

              <h3 className="text-lg lg:text-xl font-bold text-dark mb-2">
                {service.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-xs lg:text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
