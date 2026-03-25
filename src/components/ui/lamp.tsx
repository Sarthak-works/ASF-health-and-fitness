"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[250px] md:min-h-[40vh] flex-col items-center justify-center overflow-hidden bg-white w-full rounded-md z-0 pt-12 md:pt-24 pb-8",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* Left conic gradient */}
        <motion.div
          initial={{ opacity: 0.5, width: "10rem" }}
          whileInView={{ opacity: 1, width: "20rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[15rem] md:w-[30rem] bg-gradient-conic from-accent/60 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-white h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-20 md:w-40 h-[100%] left-0 bg-white bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right conic gradient */}
        <motion.div
          initial={{ opacity: 0.5, width: "10rem" }}
          whileInView={{ opacity: 1, width: "20rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[15rem] md:w-[30rem] bg-gradient-conic from-transparent via-transparent to-accent/60 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-20 md:w-40 h-[100%] right-0 bg-white bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-white h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Centre blur glow */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-white blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>

        {/* Horizontal beam */}
        <div className="absolute inset-auto z-50 h-36 w-[15rem] md:w-[28rem] -translate-y-1/2 rounded-full bg-accent/30 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "4rem" }}
          whileInView={{ width: "10rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 w-32 md:w-64 -translate-y-[6rem] rounded-full bg-accent/50 blur-2xl"
        ></motion.div>

        {/* Lamp line */}
        <motion.div
          initial={{ width: "10rem" }}
          whileInView={{ width: "20rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 w-[15rem] md:w-[30rem] -translate-y-[7rem] bg-accent"
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-white"></div>
      </div>

      <div className="relative z-50 flex flex-col items-center px-5 text-center mt-8 md:-mt-24 pt-4">
        {children}
      </div>
    </div>
  );
};
