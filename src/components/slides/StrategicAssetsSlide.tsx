"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { useAudience } from "@/contexts/AudienceContext";
import SlideModal from "./SlideModal";
import { VP_DEFAULT, staggerContainer, fadeUpItem, SPRING_BOUNCE } from "@/lib/animations";
import TypewriterText from "@/components/TypewriterText";

interface Asset {
  icon: string;
  title: string;
  subtitle: string;
  modalService?: string;
  modalFeature?: string;
  modalDesc?: string;
  modalHighlight?: string;
}

interface CostRow {
  area: string;
  general: string;
  ours: string;
  effect: string;
}

const ACCENT_COLORS = ["#2997ff", "#30E7A9", "#bf5af2", "#fbbf24"];

export default function StrategicAssetsSlide({ slide }: { slide: Slide }) {
  const { audience } = useAudience();
  const content = slide.content as {
    slogan: string;
    assets: Asset[];
    costOptimization: CostRow[];
  };

  const [selectedAsset, setSelectedAsset] = useState<{ asset: Asset; colorIndex: number } | null>(null);

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
          className="mb-6 max-w-3xl text-center text-sm text-[#86868b]"
        >
          {slide.subtitle}
        </motion.p>
      )}

      {audience === "investor" ? (
        <>
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={VP_DEFAULT}
            className="flex flex-col items-center gap-6 max-w-4xl"
          >
            <motion.p
              variants={fadeUpItem}
              className="text-center text-base italic text-[#6AE4FF]"
            >
              <TypewriterText text={content.slogan} speed={40} delay={400} />
            </motion.p>

            <div className="grid grid-cols-4 gap-4 w-full">
              {content.assets.map((asset, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: SPRING_BOUNCE },
                  }}
                  whileHover={{ y: -4, borderColor: `${ACCENT_COLORS[i]}50` }}
                  onClick={() => setSelectedAsset({ asset, colorIndex: i })}
                  className="flex cursor-pointer flex-col items-center rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-6 text-center transition-colors hover:border-white/20"
                >
                  <motion.span
                    className="mb-3 text-4xl"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  >
                    {asset.icon}
                  </motion.span>
                  <h3
                    className="mb-1 text-lg font-bold"
                    style={{ color: ACCENT_COLORS[i] }}
                  >
                    {asset.title}
                  </h3>
                  <p className="text-xs text-[#86868b]">{asset.subtitle}</p>
                  <span className="mt-3 text-[10px] text-[#6AE4FF]">
                    자세히 보기 →
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <SlideModal
            isOpen={!!selectedAsset}
            onClose={() => setSelectedAsset(null)}
            title={selectedAsset ? `${selectedAsset.asset.icon} ${selectedAsset.asset.title}` : undefined}
          >
            {selectedAsset && (
              <div className="flex flex-col gap-5">
                <p className="text-base font-semibold text-[#f5f5f7]">
                  {selectedAsset.asset.subtitle}
                </p>

                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                      style={{
                        background: `${ACCENT_COLORS[selectedAsset.colorIndex]}20`,
                        color: ACCENT_COLORS[selectedAsset.colorIndex],
                      }}
                    >
                      {selectedAsset.asset.modalFeature}
                    </span>
                    <span className="text-xs text-[#86868b]">
                      → {selectedAsset.asset.modalService}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#f5f5f7]/80">
                    {selectedAsset.asset.modalDesc}
                  </p>
                </div>

                {selectedAsset.asset.modalHighlight && (
                  <div
                    className="rounded-xl border p-4 text-center"
                    style={{
                      borderColor: `${ACCENT_COLORS[selectedAsset.colorIndex]}30`,
                      background: `${ACCENT_COLORS[selectedAsset.colorIndex]}08`,
                    }}
                  >
                    <p
                      className="text-sm font-semibold"
                      style={{ color: ACCENT_COLORS[selectedAsset.colorIndex] }}
                    >
                      {selectedAsset.asset.modalHighlight}
                    </p>
                  </div>
                )}
              </div>
            )}
          </SlideModal>
        </>
      ) : (
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VP_DEFAULT}
          className="flex flex-col gap-4 max-w-4xl w-full"
        >
          <motion.div
            variants={fadeUpItem}
            className="text-center text-xs font-bold text-[#6AE4FF] uppercase tracking-wider mb-2"
          >
            Cost Optimization -- Strategic Shift
          </motion.div>

          <motion.div
            variants={fadeUpItem}
            className="overflow-hidden rounded-xl border border-white/10"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-3 text-left font-semibold text-[#86868b]">기술 영역</th>
                  <th className="p-3 text-left font-semibold text-[#86868b]">일반적 선택</th>
                  <th className="p-3 text-left font-semibold text-[#6AE4FF]">우리의 선택</th>
                  <th className="p-3 text-left font-semibold text-[#30E7A9]">기대 효과</th>
                </tr>
              </thead>
              <tbody>
                {content.costOptimization.map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="p-3 font-semibold text-[#f5f5f7]">{row.area}</td>
                    <td className="p-3 text-[#86868b] line-through opacity-60">{row.general}</td>
                    <td className="p-3 text-[#6AE4FF] font-medium">↓ {row.ours}</td>
                    <td className="p-3 text-[#30E7A9]">{row.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div
            variants={fadeUpItem}
            className="mx-auto flex items-center gap-2 rounded-full bg-[#30E7A9]/10 border border-[#30E7A9]/30 px-4 py-2"
          >
            <span className="text-sm">⚡</span>
            <span className="text-xs font-semibold text-[#30E7A9]">
              Scale-out Ready -- 300만 건 이하 데이터: 통합형 인프라로 관리 효율 극대화
            </span>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
