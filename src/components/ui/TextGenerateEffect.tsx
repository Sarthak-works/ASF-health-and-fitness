"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const wordsArray = words.split(" ");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const wordAnim = {
    hidden: { opacity: 0, y: 30, filter: filter ? "blur(10px)" : "none" },
    visible: {
      opacity: 1,
      y: 0,
      filter: filter ? "blur(0px)" : "none",
      transition: { duration: duration ? duration : 1, ease: "easeOut" as const }
    }
  };

  return (
    <div className={cn("font-bold", className)} ref={ref}>
      <div>
        <div className="leading-[1.1]">
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {wordsArray.map((word, idx) => {
              return (
                <motion.span
                  key={word + idx}
                  variants={wordAnim}
                  className="opacity-0"
                >
                  {word}{" "}
                </motion.span>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
