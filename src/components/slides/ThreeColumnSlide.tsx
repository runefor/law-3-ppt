"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";

interface Column {
  icon: string;
  title: string;
  description: string;
}

export default function ThreeColumnSlide({ slide }: { slide: Slide }) {
  const { columns } = slide.content as { columns: Column[] };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h2 className="mb-6 text-4xl font-bold text-[#f5f5f7]">
        {slide.title}
      </h2>
      <div className="grid grid-cols-3 gap-8">
        {columns.map((col, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="flex flex-col items-center rounded-2xl bg-[#1d1d1f] p-8 text-center"
          >
            <span className="mb-4 text-5xl">{col.icon}</span>
            <h3 className="mb-3 text-xl font-semibold text-[#f5f5f7]">
              {col.title}
            </h3>
            <p className="text-base leading-relaxed text-[#86868b]">
              {col.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
