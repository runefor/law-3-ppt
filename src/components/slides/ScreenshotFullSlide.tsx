"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";

const vp = { once: true, amount: 0.2 } as const;

export default function ScreenshotFullSlide({ slide }: { slide: Slide }) {
  const { screenshot, description } = slide.content as {
    screenshot: string;
    description: string;
  };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h2 className="mb-6 text-4xl font-bold text-[#f5f5f7]">{slide.title}</h2>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={vp}
        transition={{ duration: 0.5 }}
        className="flex h-[400px] w-full max-w-4xl items-center justify-center rounded-2xl border border-white/10 bg-[#1d1d1f]"
      >
        <span className="text-lg text-[#86868b]">{screenshot}</span>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={vp}
        transition={{ delay: 0.3 }}
        className="mt-6 text-base text-[#86868b]"
      >
        {description}
      </motion.p>
    </div>
  );
}
