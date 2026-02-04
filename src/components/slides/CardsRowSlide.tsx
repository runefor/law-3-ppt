"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import {
  VP_DEFAULT,
  SPRING_BOUNCE,
  HOVER_3D,
  staggerContainer,
} from "@/lib/animations";

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
      <motion.div
        className="flex gap-8"
        style={{ perspective: 1000 }}
        variants={staggerContainer(0.15, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VP_DEFAULT}
      >
        {personas.map((p, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: SPRING_BOUNCE,
              },
            }}
            whileHover={HOVER_3D}
            className="flex w-96 flex-col rounded-2xl bg-[#1d1d1f] p-8"
          >
            {/* Emoji pop-in with spring overshoot */}
            <motion.span
              className="mb-4 text-4xl"
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={VP_DEFAULT}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
                delay: 0.3 + i * 0.1,
              }}
            >
              {p.icon}
            </motion.span>
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
      </motion.div>
    </div>
  );
}
