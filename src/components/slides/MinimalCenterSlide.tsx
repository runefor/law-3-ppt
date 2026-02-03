"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";

export default function MinimalCenterSlide({ slide }: { slide: Slide }) {
  const { team, event, contact } = slide.content as {
    team: string;
    event: string;
    contact: string;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="mb-4 text-7xl font-bold text-[#f5f5f7]"
      >
        {slide.title}
      </motion.h2>
      {slide.subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 text-2xl text-[#86868b]"
        >
          {slide.subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col items-center gap-1 text-sm text-[#86868b]"
      >
        <span className="font-medium text-[#f5f5f7]">{team}</span>
        <span>{event}</span>
        <span>{contact}</span>
      </motion.div>
    </div>
  );
}
