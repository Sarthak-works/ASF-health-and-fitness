"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import { CardContainer, CardBody, CardItem } from "./3d-card";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -5 }}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative overflow-hidden h-60 md:h-[400px] w-full transition-all duration-300 ease-out shadow-sm hover:shadow-2xl hover:shadow-purple/20",
        hovered !== null && hovered !== index && "blur-[2px] scale-[0.98] opacity-50"
      )}
    >
      <CardContainer className="inter-var py-0 h-full w-full" containerClassName="py-0 h-full w-full">
        <CardBody className="relative h-full w-full">
          <CardItem translateZ="50" className="w-full h-full">
            <Image
              src={card.src}
              alt={card.title}
              fill
              className="object-contain bg-[#F8F8F8] absolute inset-0 rounded-lg"
            />
          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  )
);

Card.displayName = "Card";

type CardData = {
  title: string;
  src: string;
};

export function FocusCards({ cards }: { cards: CardData[] }) {
  const [hovered, setHovered] = useState<number | null>(null);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}

