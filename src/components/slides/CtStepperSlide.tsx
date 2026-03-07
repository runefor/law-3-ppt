"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { useAudience } from "@/contexts/AudienceContext";
import { assetPath } from "@/lib/assetPath";
import SlideModal from "./SlideModal";
import { VP_DEFAULT, staggerContainer, fadeUpItem } from "@/lib/animations";

interface CtStep {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  modalImage?: string;
}

export default function CtStepperSlide({ slide }: { slide: Slide }) {
  const { audience } = useAudience();
  const content = slide.content as {
    backgroundImage?: string;
    steps: CtStep[];
    developerTitle: string;
    developerSubtitle: string;
    tokenizing: {
      asis: { label: string; input: string; output: string; tokens: number; result: string };
      tobe: { label: string; input: string; output: string; tokens: number; result: string; dictEntries: string };
      architecture: string;
    };
  };

  const [selectedStep, setSelectedStep] = useState<CtStep | null>(null);

  return (
    <div className="relative flex flex-col items-center py-4">
      {content.backgroundImage && audience === "investor" && (
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: `url(${assetPath(content.backgroundImage)})` }}
        />
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        className="relative mb-8 max-w-4xl text-center text-3xl font-bold text-[#f5f5f7]"
      >
        {audience === "developer" ? content.developerTitle : slide.title}
      </motion.h2>

      {audience === "investor" ? (
        <>
          <motion.div
            className="relative grid grid-cols-4 gap-5 max-w-5xl"
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={VP_DEFAULT}
          >
            {content.steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUpItem}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedStep(step)}
                className="flex cursor-pointer flex-col items-center rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-5 text-center transition-colors hover:border-[#6AE4FF]/30"
              >
                <div className="mb-3 h-14 w-14 overflow-hidden rounded-xl">
                  <img
                    src={assetPath(step.icon)}
                    alt={step.title}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="mb-1 text-xs font-bold text-[#6AE4FF] uppercase tracking-wider">
                  {step.subtitle}
                </div>
                <h3 className="mb-2 text-base font-bold text-[#f5f5f7]">
                  {step.title}
                </h3>
                <p className="text-xs text-[#86868b]">{step.description}</p>
                <span className="mt-3 text-[10px] text-[#6AE4FF]">
                  자세히 보기 →
                </span>
              </motion.div>
            ))}
          </motion.div>

          <SlideModal
            isOpen={!!selectedStep}
            onClose={() => setSelectedStep(null)}
            title={selectedStep ? `${selectedStep.title} (${selectedStep.subtitle})` : undefined}
          >
            {selectedStep && (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-[#86868b]">
                  {selectedStep.description}
                </p>
                {selectedStep.modalImage && (
                  <div className="overflow-hidden rounded-xl border border-white/10">
                    <img
                      src={assetPath(selectedStep.modalImage)}
                      alt={selectedStep.title}
                      className="w-full object-contain"
                    />
                  </div>
                )}
              </div>
            )}
          </SlideModal>
        </>
      ) : (
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VP_DEFAULT}
          className="relative flex flex-col gap-6 max-w-4xl w-full"
        >
          <motion.p
            variants={fadeUpItem}
            className="text-center text-sm text-[#86868b]"
          >
            {content.developerSubtitle}
          </motion.p>

          <div className="grid grid-cols-2 gap-6">
            {/* AS-IS */}
            <motion.div
              variants={fadeUpItem}
              className="rounded-2xl bg-white/5 border border-red-500/20 p-5"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-xs font-bold text-red-400">
                  AS-IS
                </span>
                <span className="text-sm font-semibold text-[#86868b]">
                  {content.tokenizing.asis.label}
                </span>
              </div>
              <div className="mb-2 rounded-lg bg-black/40 p-3 font-mono text-sm">
                <div className="text-[#86868b]">&quot;{content.tokenizing.asis.input}&quot;</div>
                <div className="mt-1 text-red-400">→ {content.tokenizing.asis.output}</div>
                <div className="mt-1 text-xs text-[#86868b]">
                  ({content.tokenizing.asis.tokens} tokens)
                </div>
              </div>
              <p className="text-xs text-red-400/80">{content.tokenizing.asis.result}</p>
            </motion.div>

            {/* TO-BE */}
            <motion.div
              variants={fadeUpItem}
              className="rounded-2xl bg-white/5 border border-[#30E7A9]/25 p-5"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-[#30E7A9]/15 px-2 py-0.5 text-xs font-bold text-[#30E7A9]">
                  TO-BE
                </span>
                <span className="text-sm font-semibold text-[#86868b]">
                  {content.tokenizing.tobe.label}
                </span>
              </div>
              <div className="mb-2 rounded-lg bg-black/40 p-3 font-mono text-sm">
                <div className="text-[#86868b]">&quot;{content.tokenizing.tobe.input}&quot;</div>
                <div className="mt-1 text-[#30E7A9]">→ {content.tokenizing.tobe.output}</div>
                <div className="mt-1 text-xs text-[#86868b]">
                  ({content.tokenizing.tobe.tokens} token · {content.tokenizing.tobe.dictEntries} entries)
                </div>
              </div>
              <p className="text-xs text-[#30E7A9]/80">{content.tokenizing.tobe.result}</p>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUpItem}
            className="mx-auto rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs text-[#86868b] font-mono"
          >
            {content.tokenizing.architecture}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
