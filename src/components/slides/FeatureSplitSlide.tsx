"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";

const vp = { once: true, amount: 0.2 } as const;

export default function FeatureSplitSlide({ slide }: { slide: Slide }) {
  const content = slide.content as {
    features?: string[];
    pipeline?: string[];
    screenshot?: string;
  };

  const items = content.features || content.pipeline || [];
  const screenshot = content.screenshot;

  return (
    <div className="flex flex-col justify-center py-4">
      <h2 className="mb-2 text-4xl font-bold text-[#f5f5f7]">{slide.title}</h2>
      {slide.subtitle && (
        <p className="mb-6 text-lg text-[#86868b]">{slide.subtitle}</p>
      )}
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-4 rounded-xl bg-[#1d1d1f] p-5"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2997ff]/20 text-xs font-bold text-[#2997ff]">
                {i + 1}
              </span>
              <span className="text-base text-[#f5f5f7]">{item}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center rounded-2xl border border-white/10 bg-[#1d1d1f]"
        >
          <span className="p-12 text-center text-sm text-[#86868b]">
            {screenshot || "Screenshot placeholder"}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
