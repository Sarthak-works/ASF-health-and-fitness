'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { TextGenerateEffect } from '@/components/ui/TextGenerateEffect';

const transformations = [
  {
    id: 1,
    name: "Akshay Sharma",
    before: "/user1before.jpeg",
    after: "/user1after.jpeg"
  },
  {
    id: 2,
    name: "Client Result",
    before: "/user2befor.jpeg",
    after: "/user2after.jpeg"
  },
  {
    id: 3,
    name: "Client Result",
    before: "/user3before.jpeg",
    after: "/user3after.jpeg"
  },
];

export default function Transformations() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="transformations" className="min-h-[100dvh] flex items-center bg-white overflow-hidden py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label mb-4 block"
        >
          TRANSFORMATIONS
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="headline-medium mb-6"
        >
          Real Results. Real People.
        </motion.h2>

        <TextGenerateEffect
          words="See how our clients committed to change and achieved incredible results. These stories showcase the power of dedication, personalised training, and continuous support."
          className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg font-normal text-center"
        />

        <div ref={ref} className="max-w-4xl mx-auto space-y-12">
          {transformations.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-purple/5 transition-all"
            >
              <div className="flex bg-gray-50 aspect-video relative">
                {/* Before Image */}
                <div className="w-1/2 h-full border-r border-white relative overflow-hidden text-left">
                  <Image
                    src={item.before}
                    alt="Before"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded font-bold backdrop-blur-md z-10">
                    Before
                  </div>
                </div>
                {/* After Image */}
                <div className="w-1/2 h-full relative overflow-hidden text-left">
                  <Image
                    src={item.after}
                    alt="After"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-accent text-purple text-[10px] uppercase tracking-widest px-2 py-1 rounded font-bold z-10">
                    After
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


        {/* View More Removed */}
      </div>
    </section>
  );
}
