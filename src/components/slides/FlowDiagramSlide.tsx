"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";

interface FlowStep {
  stage: string;
  detail: string;
}

const stageColors = ["#2997ff", "#bf5af2", "#30d158", "#ff9f0a", "#ff453a"];
const vp = { once: true, amount: 0.2 } as const;

export default function FlowDiagramSlide({ slide }: { slide: Slide }) {
  const { flow } = slide.content as { flow: FlowStep[] };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h2 className="mb-6 text-4xl font-bold text-[#f5f5f7]">{slide.title}</h2>
      <div className="flex w-full max-w-4xl items-start justify-between">
        {flow.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className="flex flex-1 flex-col items-center text-center"
          >
            <div
              className="mb-3 flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-black"
              style={{ backgroundColor: stageColors[i % stageColors.length] }}
            >
              {i + 1}
            </div>
            <h4 className="mb-2 text-sm font-semibold text-[#f5f5f7]">
              {step.stage}
            </h4>
            <p className="max-w-[180px] text-xs leading-relaxed text-[#86868b]">
              {step.detail}
            </p>
          </motion.div>
        ))}
      </div>
      {/* Connector line */}
      <div className="mt-[-70px] mb-[40px] h-px w-full max-w-3xl bg-gradient-to-r from-[#2997ff]/40 via-[#bf5af2]/40 to-[#30d158]/40" />
    </div>
  );
}
