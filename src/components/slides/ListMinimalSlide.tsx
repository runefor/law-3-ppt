"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";

export default function ListMinimalSlide({ slide }: { slide: Slide }) {
  const { items } = slide.content as {
    items: { number: string; label: string }[];
  };

  return (
    <div className="flex flex-col justify-center py-4">
      <h2 className="mb-6 text-4xl font-bold text-[#f5f5f7]">
        {slide.title}
      </h2>
      <div className="flex flex-col gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.number}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex items-baseline gap-6"
          >
            <span className="text-2xl font-bold text-[#2997ff]">
              {item.number}
            </span>
            <span className="text-xl text-[#f5f5f7]">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
