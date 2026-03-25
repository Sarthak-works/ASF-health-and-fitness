'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { AnimatedTooltip } from "@/components/ui/AnimatedTooltip";
import { CardSpotlight } from "@/components/ui/CardSpotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const checklist = [
  "C - Suite Coach",
  "VIP Trainer",
  "Personal Trainer",
  "Semi Private Training / Couple Training",
];

const teamTooltip = [
  {
    id: 1,
    name: "ASF Team",
    designation: "Dubai's Finest Coaches",
    image: '/asfTeam.webp',
  }
];

export default function About() {
  return (
    <section id="about" className="min-h-[85vh] flex items-center bg-white overflow-hidden pt-10 pb-20 lg:pt-12 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left: Global Wellness Imagery with 3D Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-full"
          >
            <CardContainer className="inter-var w-full h-full">
              <CardBody className="relative group/card bg-gray-50 dark:bg-black border-black/[0.1] w-full h-full rounded-3xl border overflow-hidden shadow-2xl">
                <CardItem
                  translateZ="100"
                  className="w-full h-[300px] md:h-[500px] lg:h-[650px]"
                >
                  <Image
                    src='/asfTeam.webp'
                    alt="ASF Wellness-First Influence"
                    fill
                    className="object-cover transition-all duration-700 rounded-2xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple/20 to-transparent rounded-2xl" />
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Floating Badge (Hover effect removed) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
              className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-8 z-20 scale-75 md:scale-100"
            >
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl flex items-center gap-3 md:gap-4 border border-gray-100">
                <div className="mr-1 md:mr-2">
                  <AnimatedTooltip items={teamTooltip} />
                </div>
                <div>
                  <p className="text-lg md:text-xl font-bold text-black leading-none whitespace-nowrap">10+ Years Experience</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mt-8 lg:mt-0"
          >
            <span className="section-label mb-4">ABOUT US</span>

            <div className="relative">
              <h2 className="headline-medium mb-4 no-underline">
                Elevate Your Well-being.
              </h2>
            </div>

            <div className="space-y-4 text-black text-base leading-relaxed mb-6">
              <TextGenerateEffect
                words="ASF Health & Fitness is a dedicated fitness and wellness team based in Dubai, specialising in helping entrepreneurs and busy professionals elevate their physical and mental well-being. With over a decade of experience, we focus on tailored fitness strategies that enhance energy, mental clarity, resilience, and overall vitality all designed to help you perform at your peak in every area of life."
                className="text-black font-normal"
              />
              <TextGenerateEffect
                words="At ASF, we believe that a strong body and a sharp mind are the true foundations of leadership, creativity, and personal success. By combining personalised coaching with functional training methods, we empower our clients to unlock new levels of performance, confidence, and well-being."
                className="text-black font-normal"
              />
            </div>

            <div className="flex flex-col gap-y-3 mb-8">
              {checklist.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ y: 15, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="bg-purple/10 p-1 rounded-full group-hover:bg-purple transition-colors duration-300">
                    <CheckCircle2 className="text-purple group-hover:text-white transition-colors duration-300" size={18} />
                  </div>
                  <span className="text-dark font-semibold leading-tight">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block w-full sm:w-auto bg-purple text-white px-12 py-5 rounded-full font-bold tracking-wide transition-all border border-transparent shadow-xl hover:bg-yellow hover:text-black text-center"
            >
              Book your free assessment
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

