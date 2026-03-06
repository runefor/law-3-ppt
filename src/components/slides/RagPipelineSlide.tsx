"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { VP_DEFAULT, staggerContainer, fadeUpItem } from "@/lib/animations";

interface PipelineStep {
  icon: string;
  title: string;
  description: string;
}

interface Highlight {
  icon: string;
  title: string;
  description: string;
}

export default function RagPipelineSlide({ slide }: { slide: Slide }) {
  const content = slide.content as {
    slogan: string;
    steps: PipelineStep[];
    highlights: Highlight[];
  };

  return (
    <div className="flex flex-col items-center py-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        className="mb-2 text-center text-3xl font-bold text-[#f5f5f7]"
      >
        {slide.title}
      </motion.h2>
      {slide.subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP_DEFAULT}
          className="mb-4 text-center text-sm text-[#86868b]"
        >
          {slide.subtitle}
        </motion.p>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VP_DEFAULT}
        transition={{ delay: 0.2 }}
        className="mb-8 max-w-3xl text-center text-xs italic text-[#6AE4FF]"
      >
        {content.slogan}
      </motion.p>

      {/* 5-step pipeline */}
      <motion.div
        className="flex items-start gap-2 max-w-5xl w-full mb-8"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VP_DEFAULT}
      >
        {content.steps.map((step, i) => (
          <motion.div key={i} variants={fadeUpItem} className="flex items-start gap-2 flex-1">
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0071E3] to-[#6AE4FF] text-lg">
                {step.icon}
              </div>
              <div className="mt-2 text-center">
                <div className="text-xs font-bold text-[#f5f5f7] mb-1">
                  STEP {i + 1}
                </div>
                <div className="text-xs font-semibold text-[#6AE4FF]">
                  {step.title}
                </div>
                <p className="mt-1 text-[10px] text-[#86868b] max-w-[140px]">
                  {step.description}
                </p>
              </div>
            </div>
            {i < content.steps.length - 1 && (
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                className="mt-3 text-[#6AE4FF]/50 text-sm shrink-0"
              >
                →
              </motion.span>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Highlights */}
      <motion.div
        className="grid grid-cols-3 gap-4 max-w-3xl w-full"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VP_DEFAULT}
      >
        {content.highlights.map((hl, i) => (
          <motion.div
            key={i}
            variants={fadeUpItem}
            whileHover={{ y: -2 }}
            className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-3"
          >
            <span className="text-lg shrink-0">{hl.icon}</span>
            <div>
              <div className="text-xs font-bold text-[#f5f5f7]">{hl.title}</div>
              <p className="text-[10px] text-[#86868b]">{hl.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
