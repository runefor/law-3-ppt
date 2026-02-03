"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";

export default function HeroSlide({ slide }: { slide: Slide }) {
  const { team, event, date } = slide.content as {
    team: string;
    event: string;
    date: string;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-20 text-center">
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-7xl font-bold tracking-tight text-[#f5f5f7]"
      >
        {slide.title}
      </motion.h1>
      {slide.subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 max-w-3xl text-xl leading-relaxed text-[#86868b]"
        >
          {slide.subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col items-center gap-1 text-sm text-[#86868b]"
      >
        <span className="font-medium text-[#f5f5f7]">{team}</span>
        <span>
          {event} · {date}
        </span>
      </motion.div>
    </div>
  );
}
