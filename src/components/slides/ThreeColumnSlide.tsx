"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import {
  VP_DEFAULT,
  SPRING_SOFT,
  staggerContainer,
  breatheAnimation,
} from "@/lib/animations";

interface Column {
  icon: string;
  title: string;
  description: string;
}

const ACCENT_COLORS = ["#2997ff", "#bf5af2", "#30d158"];

export default function ThreeColumnSlide({ slide }: { slide: Slide }) {
  const { columns } = slide.content as { columns: Column[] };

  return (
    <div
      className="flex flex-col items-center justify-center py-4"
      style={{ perspective: 1200 }}
    >
      <h2 className="mb-6 text-4xl font-bold text-[#f5f5f7]">
        {slide.title}
      </h2>
      <motion.div
        className="grid grid-cols-3 gap-8"
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VP_DEFAULT}
      >
        {columns.map((col, i) => {
          const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
          return (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, rotateX: 15, y: 30 },
                visible: {
                  opacity: 1,
                  rotateX: 0,
                  y: 0,
                  transition: { duration: 0.5 },
                },
              }}
              whileHover={{
                scale: 1.04,
                y: -4,
                boxShadow: `0 8px 30px ${accent}20`,
                transition: SPRING_SOFT,
              }}
              className="flex flex-col items-center rounded-2xl bg-[#1d1d1f] p-8 text-center"
            >
              {/* Breathing icon */}
              <motion.span
                className="mb-4 text-5xl"
                animate={breatheAnimation}
              >
                {col.icon}
              </motion.span>
              <h3 className="mb-3 text-xl font-semibold text-[#f5f5f7]">
                {col.title}
              </h3>
              <p className="text-base leading-relaxed text-[#86868b]">
                {col.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
