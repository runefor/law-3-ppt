"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";

interface Persona {
  icon: string;
  name: string;
  description: string;
  needs: string;
}

export default function CardsRowSlide({ slide }: { slide: Slide }) {
  const { personas } = slide.content as { personas: Persona[] };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h2 className="mb-6 text-4xl font-bold text-[#f5f5f7]">
        {slide.title}
      </h2>
      <div className="flex gap-8">
        {personas.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="flex w-96 flex-col rounded-2xl bg-[#1d1d1f] p-8"
          >
            <span className="mb-4 text-4xl">{p.icon}</span>
            <h3 className="mb-3 text-xl font-semibold text-[#f5f5f7]">
              {p.name}
            </h3>
            <p className="mb-4 text-base text-[#86868b]">{p.description}</p>
            <div className="mt-auto rounded-xl bg-white/5 p-4">
              <p className="text-sm font-medium text-[#2997ff]">니즈</p>
              <p className="mt-1 text-sm text-[#f5f5f7]">{p.needs}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
