"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { VP_DEFAULT, staggerContainer, fadeUpItem } from "@/lib/animations";

interface TreeBranch {
  name: string;
  children: string[];
}

interface Metric {
  value: string;
  unit: string;
  label: string;
}

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export default function RecursiveCteSlide({ slide }: { slide: Slide }) {
  const content = slide.content as {
    infraCompare: {
      asis: { label: string; nodes: string[]; issue: string };
      tobe: { label: string; nodes: string[]; benefit: string };
    };
    treeExample: { root: string; branches: TreeBranch[] };
    sqlSnippet: string;
    features: Feature[];
    metrics: Metric[];
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
          className="mb-6 text-center text-sm text-[#86868b]"
        >
          {slide.subtitle}
        </motion.p>
      )}

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VP_DEFAULT}
        className="grid grid-cols-2 gap-6 max-w-4xl w-full"
      >
        {/* Left: Infra compare + Tree */}
        <div className="flex flex-col gap-4">
          {/* Infra compare */}
          <motion.div variants={fadeUpItem} className="flex items-center gap-3">
            <div className="flex-1 rounded-xl bg-white/5 border border-red-500/20 p-3 text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-xs font-bold text-[#86868b]">
                {content.infraCompare.asis.label}
                <span className="rounded-full bg-red-500/15 px-1.5 py-0.5 text-[8px] text-red-400">
                  복잡
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                {content.infraCompare.asis.nodes.map((n, i) => (
                  <span key={i} className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-xs font-mono text-[#86868b]">
                    {n}
                  </span>
                ))}
              </div>
            </div>

            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[#6AE4FF] text-lg font-bold shrink-0"
            >
              →
            </motion.span>

            <div className="flex-1 rounded-xl bg-[#30E7A9]/5 border border-[#30E7A9]/25 p-3 text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-xs font-bold text-[#86868b]">
                {content.infraCompare.tobe.label}
                <span className="rounded-full bg-[#30E7A9]/15 px-1.5 py-0.5 text-[8px] text-[#30E7A9]">
                  통합
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                {content.infraCompare.tobe.nodes.map((n, i) => (
                  <span key={i} className="rounded-md bg-[#30E7A9]/10 border border-[#30E7A9]/30 px-2 py-0.5 text-xs font-mono text-[#30E7A9]">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tree visualization */}
          <motion.div
            variants={fadeUpItem}
            className="rounded-xl bg-white/5 border border-white/10 p-4"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="rounded-md bg-[#0071E3]/25 border border-[#6AE4FF]/40 px-3 py-1 text-sm font-bold text-[#6AE4FF]">
                {content.treeExample.root}
              </span>
              <div className="h-3 w-0.5 bg-[#6AE4FF]/30" />
              <div className="flex gap-8">
                {content.treeExample.branches.map((branch, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="rounded-md bg-[#6AE4FF]/12 border border-[#6AE4FF]/25 px-2 py-0.5 text-xs font-semibold text-[#6AE4FF]/80">
                      {branch.name}
                    </span>
                    <div className="h-2 w-0.5 bg-white/15" />
                    <div className="flex gap-2">
                      {branch.children.map((child, j) => (
                        <span key={j} className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] text-[#86868b]">
                          {child}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: SQL + Features */}
        <div className="flex flex-col gap-4">
          {/* SQL snippet */}
          <motion.div
            variants={fadeUpItem}
            className="overflow-hidden rounded-xl border border-white/10"
          >
            <div className="bg-white/[0.03] border-b border-white/10 px-3 py-1.5 text-[10px] font-bold text-[#86868b] uppercase tracking-wider">
              Recursive CTE
            </div>
            <pre className="p-3 font-mono text-xs leading-relaxed text-[#e0e0e0] overflow-x-auto">
              {content.sqlSnippet}
            </pre>
          </motion.div>

          {/* Features */}
          <motion.div variants={fadeUpItem} className="grid grid-cols-3 gap-2">
            {content.features.map((feat, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 rounded-xl bg-white/5 border border-white/10 p-2 text-center"
              >
                <span className="text-sm">{feat.icon}</span>
                <span className="text-[10px] font-bold text-[#f5f5f7]">{feat.title}</span>
                <span className="text-[9px] text-[#86868b]">{feat.desc}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Metrics bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        className="mt-6 flex items-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg"
      >
        {content.metrics.map((m, i) => (
          <div key={i} className="flex items-center">
            <div className="px-6 py-3 text-center">
              <div className="text-xl font-bold text-[#6AE4FF]">
                {m.value}
                <span className="ml-0.5 text-sm text-[#6AE4FF]/60">{m.unit}</span>
              </div>
              <div className="text-xs text-[#86868b]">{m.label}</div>
            </div>
            {i < content.metrics.length - 1 && (
              <div className="h-9 w-px bg-white/10" />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
