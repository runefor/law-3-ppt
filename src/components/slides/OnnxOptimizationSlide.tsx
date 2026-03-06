"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { VP_DEFAULT, staggerContainer, fadeUpItem } from "@/lib/animations";

interface Benchmark {
  label: string;
  value: number;
  color: string;
}

export default function OnnxOptimizationSlide({ slide }: { slide: Slide }) {
  const content = slide.content as {
    embedding: {
      model: string;
      benchmarks: Benchmark[];
      kpi: { speedup: string; similarity: string };
    };
    reranker: {
      model: string;
      benchmarks: Benchmark[];
      kpi: { speedup: string };
    };
    layerGrid: {
      total: number;
      fp32Layers: number[];
      description: string;
    };
  };

  const maxEmbedding = Math.max(...content.embedding.benchmarks.map((b) => b.value));
  const maxReranker = Math.max(...content.reranker.benchmarks.map((b) => b.value));

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
          className="mb-6 text-center text-sm text-[#86868b]"
        >
          {slide.subtitle}
        </motion.p>
      )}

      <div className="grid grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Embedding */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VP_DEFAULT}
          className="rounded-2xl bg-white/5 border border-white/10 p-5"
        >
          <motion.div variants={fadeUpItem}>
            <div className="text-xs font-bold text-[#6AE4FF] uppercase tracking-wider mb-1">
              Embedding
            </div>
            <div className="text-sm font-semibold text-[#f5f5f7] mb-4">
              {content.embedding.model}
            </div>
          </motion.div>

          {content.embedding.benchmarks.map((bm, i) => (
            <motion.div key={i} variants={fadeUpItem} className="mb-2 flex items-center gap-2">
              <span className="w-24 text-right text-xs text-[#86868b] shrink-0">
                {bm.label}
              </span>
              <div className="flex-1 h-5 rounded bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(bm.value / maxEmbedding) * 100}%` }}
                  viewport={VP_DEFAULT}
                  transition={{ duration: 1, delay: i * 0.15 }}
                  className="h-full rounded flex items-center justify-end pr-2"
                  style={{
                    background: `linear-gradient(90deg, ${bm.color}80, ${bm.color}50)`,
                    boxShadow: bm.color !== "#86868b" ? `0 0 12px ${bm.color}30` : "none",
                  }}
                >
                  <span className="text-[10px] font-bold text-white">{bm.value}ms</span>
                </motion.div>
              </div>
            </motion.div>
          ))}

          <motion.div variants={fadeUpItem} className="mt-3 flex gap-3">
            <span className="rounded-full bg-[#30E7A9]/10 border border-[#30E7A9]/30 px-3 py-1 text-xs font-bold text-[#30E7A9]">
              {content.embedding.kpi.speedup} Speedup
            </span>
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-[#86868b]">
              Cosine: {content.embedding.kpi.similarity}
            </span>
          </motion.div>
        </motion.div>

        {/* Reranker */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VP_DEFAULT}
          className="rounded-2xl bg-white/5 border border-white/10 p-5"
        >
          <motion.div variants={fadeUpItem}>
            <div className="text-xs font-bold text-[#6AE4FF] uppercase tracking-wider mb-1">
              Reranker
            </div>
            <div className="text-sm font-semibold text-[#f5f5f7] mb-4">
              {content.reranker.model}
            </div>
          </motion.div>

          {content.reranker.benchmarks.map((bm, i) => (
            <motion.div key={i} variants={fadeUpItem} className="mb-2 flex items-center gap-2">
              <span className="w-24 text-right text-xs text-[#86868b] shrink-0">
                {bm.label}
              </span>
              <div className="flex-1 h-5 rounded bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(bm.value / maxReranker) * 100}%` }}
                  viewport={VP_DEFAULT}
                  transition={{ duration: 1, delay: i * 0.15 }}
                  className="h-full rounded flex items-center justify-end pr-2"
                  style={{
                    background: `linear-gradient(90deg, ${bm.color}80, ${bm.color}50)`,
                    boxShadow: bm.color !== "#86868b" ? `0 0 12px ${bm.color}30` : "none",
                  }}
                >
                  <span className="text-[10px] font-bold text-white">{bm.value}ms</span>
                </motion.div>
              </div>
            </motion.div>
          ))}

          <motion.div variants={fadeUpItem} className="mt-3">
            <span className="rounded-full bg-[#30E7A9]/10 border border-[#30E7A9]/30 px-3 py-1 text-xs font-bold text-[#30E7A9]">
              {content.reranker.kpi.speedup} Speedup
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Layer sensitivity grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        className="mt-6 max-w-4xl w-full rounded-xl bg-white/5 border border-white/10 p-4"
      >
        <div className="text-xs font-bold text-[#6AE4FF] mb-2">Layer Sensitivity Grid</div>
        <div className="grid grid-cols-12 gap-1 mb-2">
          {Array.from({ length: content.layerGrid.total }, (_, i) => {
            const isFP32 = content.layerGrid.fp32Layers.includes(i);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VP_DEFAULT}
                transition={{ delay: i * 0.03 }}
                className={`aspect-[1.4] rounded flex items-center justify-center text-[10px] font-semibold ${
                  isFP32
                    ? "bg-[#0071E3]/35 border border-[#6AE4FF]/50 text-[#6AE4FF]"
                    : "bg-[#86868b]/25 border border-[#86868b]/30 text-white/40"
                }`}
              >
                {i}
              </motion.div>
            );
          })}
        </div>
        <div className="flex gap-4 text-xs text-[#86868b]">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded bg-[#86868b]/40" /> INT8
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded bg-[#0071E3]/60" style={{ boxShadow: "0 0 6px rgba(106,228,255,0.3)" }} /> FP32
          </span>
        </div>
        <p className="mt-2 text-xs text-[#86868b]">{content.layerGrid.description}</p>
      </motion.div>
    </div>
  );
}
