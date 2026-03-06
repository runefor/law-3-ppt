"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { useAudience } from "@/contexts/AudienceContext";
import {
  VP_DEFAULT,
  staggerContainer,
  fadeUpItem,
} from "@/lib/animations";

interface FlowSide {
  label: string;
  description: string;
}

interface PipelineStep {
  step: string;
  detail: string;
}

export default function VisionFlowSlide({ slide }: { slide: Slide }) {
  const { audience } = useAudience();
  const content = slide.content as {
    investorMessage: string;
    flow: { left: FlowSide; center: string; right: FlowSide };
    developerTitle: string;
    developerSubtitle: string;
    pipeline: PipelineStep[];
    focusStrategy: { main: string; supp: string };
  };

  return (
    <div className="flex flex-col items-center py-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        className="mb-6 max-w-4xl text-center text-3xl font-bold text-[#f5f5f7]"
      >
        {audience === "developer" ? content.developerTitle : slide.title}
      </motion.h2>

      {audience === "investor" ? (
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={VP_DEFAULT}
          className="flex flex-col items-center gap-8 max-w-4xl"
        >
          <motion.p
            variants={fadeUpItem}
            className="text-center text-xl font-semibold text-[#6AE4FF]"
          >
            {content.investorMessage}
          </motion.p>

          <motion.div
            variants={fadeUpItem}
            className="flex items-center gap-6 w-full"
          >
            {/* Left - User */}
            <div className="flex-1 rounded-2xl bg-white/5 backdrop-blur-lg border border-[#30E7A9]/30 p-6 text-center">
              <div className="mb-2 text-2xl">👤</div>
              <h3 className="text-lg font-bold text-[#30E7A9]">
                {content.flow.left.label}
              </h3>
              <p className="mt-2 text-sm text-[#86868b]">
                {content.flow.left.description}
              </p>
            </div>

            {/* Center arrow */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl text-[#6AE4FF]"
              >
                →
              </motion.div>
              <span className="text-xs text-[#86868b] max-w-[120px] text-center">
                {content.flow.center}
              </span>
              <motion.div
                animate={{ x: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="text-2xl text-[#6AE4FF]"
              >
                ←
              </motion.div>
            </div>

            {/* Right - Lawyer */}
            <div className="flex-1 rounded-2xl bg-white/5 backdrop-blur-lg border border-[#2997ff]/30 p-6 text-center">
              <div className="mb-2 text-2xl">⚖️</div>
              <h3 className="text-lg font-bold text-[#6AE4FF]">
                {content.flow.right.label}
              </h3>
              <p className="mt-2 text-sm text-[#86868b]">
                {content.flow.right.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VP_DEFAULT}
          className="flex flex-col items-center gap-6 max-w-4xl w-full"
        >
          <motion.p
            variants={fadeUpItem}
            className="text-center text-sm text-[#86868b]"
          >
            {content.developerSubtitle}
          </motion.p>

          <div className="flex items-center gap-2 w-full">
            {content.pipeline.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUpItem}
                className="flex-1 flex flex-col items-center"
              >
                <div className="w-full rounded-xl bg-white/5 border border-white/10 p-3 text-center">
                  <div className="text-xs font-bold text-[#6AE4FF] mb-1">
                    {step.step}
                  </div>
                  <div className="text-xs text-[#86868b]">{step.detail}</div>
                </div>
                {i < content.pipeline.length - 1 && (
                  <div className="mt-2 text-[#6AE4FF] text-sm">→</div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUpItem}
            className="flex gap-4"
          >
            <div className="rounded-xl bg-[#0071E3]/10 border border-[#0071E3]/30 px-4 py-2 text-xs text-[#6AE4FF]">
              {content.focusStrategy.main}
            </div>
            <div className="rounded-xl bg-[#30E7A9]/10 border border-[#30E7A9]/30 px-4 py-2 text-xs text-[#30E7A9]">
              {content.focusStrategy.supp}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
