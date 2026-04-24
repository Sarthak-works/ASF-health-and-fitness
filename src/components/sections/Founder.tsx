"use client";

import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function Founder() {
  const founders = [
    {
      name: "Suraj Shetty",
      role: "CEO Asf Dubai",
      image: "/Suraj.jpg",
      bio: "12+ yrs. Coaching Experience | Indian National basketball player | 300+ Clients Trained",
      objectPosition: "center 15%",
    },
    {
      name: "Akshay Sahu",
      role: " Founder / CMO Asf Dubai",
      image: "/Akshay-suit.JPG",
      bio: "10+ yrs. Coaching Experience | Elite Men's Physique Athlete | 200+ Clients Trained",
      objectPosition: "",
    },
  ];

  return (
    <section id="founder" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label mb-4 md:mb-6 block transition-all"
        >
          MEET THE FOUNDERS
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="headline-medium mb-16"
        >
          Leadership At ASF
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <CardContainer className="inter-var">
                <CardBody className="bg-white relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] border-black/[0.1] w-full h-auto rounded-3xl p-6 border transition-all">
                  <CardItem
                    translateZ="100"
                    className="w-full h-[450px] mb-6 overflow-hidden rounded-2xl"
                  >
                    <img
                      src={founder.image}
                      alt={founder.name}
                      style={{ objectPosition: founder.objectPosition }}
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                    />
                  </CardItem>
                  <CardItem translateZ="50" className="text-left">
                    <h3 className="text-2xl font-bold text-dark">
                      {founder.name}
                    </h3>
                    <p className="text-gray-500 font-semibold text-sm uppercase tracking-wider mt-1">
                      {founder.role}
                    </p>
                    <p className="text-gray-500 mt-4 leading-relaxed font-sans text-lg">
                      {founder.bio}
                    </p>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
