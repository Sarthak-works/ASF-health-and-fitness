'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const stats = [
  { label: "Years of Experience", value: 10, suffix: "+" },
  { label: "Expert Trainers", value: 20, suffix: "+" },
  { label: "Transformations", value: 450, suffix: "+" },
  { label: "Accessible Locations", value: 10, suffix: "+" },
];

export default function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="stats" ref={ref} className="bg-primary py-24 relative z-10 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-12 md:gap-x-24 md:gap-y-16 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="text-accent text-5xl md:text-7xl font-black mb-4 flex items-baseline">
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={3}
                    suffix={stat.suffix}
                  />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              <p className="text-white font-bold uppercase tracking-widest text-sm max-w-[180px] mx-auto opacity-80">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
