"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import DonutChart from "@/components/charts/DonutChart";
import { VP_DEFAULT, staggerContainer, fadeUpItem } from "@/lib/animations";

interface CostCard {
  label: string;
  detail: string;
  amount: string;
}

interface BudgetRow {
  category: string;
  amount: string;
  note: string;
  highlight?: boolean;
}

interface Strategy {
  title: string;
  description: string;
}

export default function CostManagementSlide({ slide }: { slide: Slide }) {
  const content = slide.content as {
    donut: { saved: number; spent: number; centerLabel: string };
    costCards: CostCard[];
    budgetTable: BudgetRow[];
    strategies: Strategy[];
  };

  return (
    <div className="flex flex-col items-center py-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        className="mb-2 text-center text-2xl font-bold text-[#f5f5f7]"
      >
        {slide.title}
      </motion.h2>
      {slide.subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP_DEFAULT}
          className="mb-6 max-w-3xl text-center text-sm text-[#86868b]"
        >
          {slide.subtitle}
        </motion.p>
      )}

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VP_DEFAULT}
        className="flex flex-col gap-6 max-w-4xl w-full"
      >
        {/* Top: Donut + Cost cards */}
        <motion.div variants={fadeUpItem} className="flex items-center gap-8">
          <DonutChart
            saved={content.donut.saved}
            spent={content.donut.spent}
            centerLabel={content.donut.centerLabel}
          />
          <div className="flex-1 flex flex-col gap-3">
            {content.costCards.map((card, i) => (
              <div
                key={i}
                className="rounded-xl bg-white/5 border border-white/10 p-3 transition-all hover:bg-white/[0.08]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-[#f5f5f7]">
                      {card.label}
                    </div>
                    <div className="text-xs text-[#86868b]">{card.detail}</div>
                  </div>
                  <div className="text-lg font-bold text-[#6AE4FF]">
                    {card.amount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Budget table */}
        <motion.div
          variants={fadeUpItem}
          className="overflow-hidden rounded-xl border border-white/10"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="p-3 text-left font-semibold text-[#86868b]">구분</th>
                <th className="p-3 text-right font-semibold text-[#86868b]">금액</th>
                <th className="p-3 text-left font-semibold text-[#86868b]">비고</th>
              </tr>
            </thead>
            <tbody>
              {content.budgetTable.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-white/5 ${row.highlight ? "bg-[#30E7A9]/5" : ""}`}
                >
                  <td className={`p-3 ${row.highlight ? "font-bold text-[#f5f5f7]" : "text-[#f5f5f7]"}`}>
                    {row.category}
                  </td>
                  <td className={`p-3 text-right ${row.highlight ? "font-bold text-[#30E7A9]" : "text-[#6AE4FF]"}`}>
                    {row.amount}
                  </td>
                  <td className="p-3 text-[#86868b]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Strategies */}
        <motion.div variants={fadeUpItem} className="grid grid-cols-3 gap-3">
          {content.strategies.map((strat, i) => (
            <div
              key={i}
              className="rounded-xl bg-white/5 border border-white/10 p-3 transition-all hover:bg-white/[0.08]"
            >
              <div className="mb-1 text-xs font-bold text-[#6AE4FF]">
                {strat.title}
              </div>
              <p className="text-[10px] text-[#86868b]">{strat.description}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
