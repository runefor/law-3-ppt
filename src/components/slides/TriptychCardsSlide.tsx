"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { useAudience } from "@/contexts/AudienceContext";
import { assetPath } from "@/lib/assetPath";
import SlideModal from "./SlideModal";
import {
  VP_DEFAULT,
  SPRING_BOUNCE,
  staggerContainer,
} from "@/lib/animations";

interface ProblemCard {
  image: string;
  title: string;
  description: string;
  modalTitle?: string;
  modalSubtitle?: string;
  modalStats?: Array<{ value: string; label: string }>;
  modalSources?: Array<{ name: string; count: string; desc: string }>;
  modalTopSources?: Array<{ name: string; count: string }>;
  modalImages?: string[];
}

interface AgentInfo {
  name: string;
  desc: string;
  badge: string;
}

export default function TriptychCardsSlide({ slide }: { slide: Slide }) {
  const { audience } = useAudience();
  const content = slide.content as {
    investorCards: ProblemCard[];
    developerTitle: string;
    developerSubtitle: string;
    agents: AgentInfo[];
  };

  const [selectedCard, setSelectedCard] = useState<ProblemCard | null>(null);

  return (
    <div className="flex flex-col items-center py-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        className="mb-8 max-w-4xl text-center text-3xl font-bold text-[#f5f5f7]"
      >
        {audience === "developer" ? content.developerTitle : slide.title}
      </motion.h2>

      {audience === "developer" && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP_DEFAULT}
          className="mb-6 text-center text-base text-[#86868b]"
        >
          {content.developerSubtitle}
        </motion.p>
      )}

      {audience === "investor" ? (
        <>
          <motion.div
            className="grid grid-cols-3 gap-6"
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={VP_DEFAULT}
          >
            {content.investorCards.map((card, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: SPRING_BOUNCE },
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => setSelectedCard(card)}
                className="cursor-pointer overflow-hidden rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 transition-colors hover:border-[#2997ff]/30"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={assetPath(card.image)}
                    alt={card.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-bold text-[#f5f5f7]">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#86868b]">{card.description}</p>
                  <span className="mt-3 inline-block text-xs text-[#2997ff]">
                    자세히 보기 →
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <SlideModal
            isOpen={!!selectedCard}
            onClose={() => setSelectedCard(null)}
            title={selectedCard?.modalTitle}
          >
            {selectedCard && (
              <div className="flex flex-col gap-5">
                {selectedCard.modalSubtitle && (
                  <p className="text-sm text-[#86868b]">
                    {selectedCard.modalSubtitle}
                  </p>
                )}

                {selectedCard.modalStats && (
                  <div className="grid grid-cols-3 gap-3">
                    {selectedCard.modalStats.map((stat, i) => (
                      <div
                        key={i}
                        className="rounded-xl bg-white/5 border border-white/10 p-4 text-center"
                      >
                        <div className="text-xl font-bold text-[#2997ff]">
                          {stat.value}
                        </div>
                        <div className="mt-1 text-xs text-[#86868b]">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedCard.modalSources && (
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold text-[#f5f5f7]">
                      출처별 현황
                    </h4>
                    {selectedCard.modalSources.map((src, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg bg-white/[0.03] border border-white/5 px-4 py-3"
                      >
                        <div>
                          <span className="text-sm font-medium text-[#f5f5f7]">
                            {src.name}
                          </span>
                          <span className="ml-2 text-xs text-[#86868b]">
                            {src.desc}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-[#6AE4FF]">
                          {src.count}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {selectedCard.modalTopSources && (
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold text-[#f5f5f7]">
                      데이터 소스 TOP 10
                    </h4>
                    {selectedCard.modalTopSources.map((src, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg bg-white/[0.03] border border-white/5 px-4 py-2"
                      >
                        <span className="text-sm text-[#f5f5f7]">
                          {i + 1}. {src.name}
                        </span>
                        <span className="text-sm font-bold text-[#6AE4FF]">
                          {src.count}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {selectedCard.modalImages && (
                  <div className="grid grid-cols-3 gap-3">
                    {selectedCard.modalImages.map((img, i) => (
                      <div
                        key={i}
                        className="overflow-hidden rounded-xl border border-white/10"
                      >
                        <img
                          src={assetPath(img)}
                          alt={`기능 ${i + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </SlideModal>
        </>
      ) : (
        <div className="flex flex-col items-center w-full max-w-5xl gap-0">
          {/* 사용자 질의 입력 박스 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP_DEFAULT}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 rounded-xl bg-[#0071E3]/20 border border-[#2997ff]/40 px-5 py-2.5"
          >
            <span className="text-base">💬</span>
            <span className="text-sm font-medium text-[#f5f5f7]">
              사용자 질의 입력
            </span>
            <span className="ml-2 rounded-full bg-[#2997ff]/30 px-2 py-0.5 text-xs text-[#6AE4FF]">
              Input
            </span>
          </motion.div>

          {/* 입력 → Router 화살표 */}
          <motion.svg
            width="2"
            height="32"
            className="my-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VP_DEFAULT}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <line
              x1="1" y1="0" x2="1" y2="32"
              stroke="#6AE4FF" strokeWidth="2" strokeDasharray="4 3"
            />
          </motion.svg>

          {/* LLM Router 원형 노드 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VP_DEFAULT}
            transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
            className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#6AE4FF]/60 bg-[#0a2a3a]"
            style={{
              boxShadow: "0 0 24px 6px rgba(106,228,255,0.25), 0 0 48px 12px rgba(106,228,255,0.10)",
            }}
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl leading-none">🧠</span>
              <span className="mt-0.5 text-[10px] font-bold text-[#6AE4FF]">
                Router
              </span>
            </div>
          </motion.div>

          {/* Analyze 라벨 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VP_DEFAULT}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="mt-1 mb-0"
          >
            <span className="rounded-full bg-[#bf5af2]/20 px-2.5 py-0.5 text-xs font-medium text-[#bf5af2]">
              Analyze
            </span>
          </motion.div>

          {/* Fan-out SVG 연결선 (Router → 8 agents) */}
          <motion.svg
            width="800"
            height="48"
            viewBox="0 0 800 48"
            className="w-full max-w-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VP_DEFAULT}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {content.agents.map((_, i) => {
              const agentCount = content.agents.length;
              const startX = 400;
              const endX = (800 / agentCount) * (i + 0.5);
              return (
                <line
                  key={i}
                  x1={startX} y1="0"
                  x2={endX} y2="48"
                  stroke="#6AE4FF"
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                  strokeDasharray="4 3"
                />
              );
            })}
          </motion.svg>

          {/* 8개 Agent 카드 (4x2 grid) */}
          <motion.div
            className="grid grid-cols-4 gap-3 w-full max-w-4xl"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={VP_DEFAULT}
          >
            {content.agents.map((agent, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 16 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { ...SPRING_BOUNCE, delay: 0.8 + i * 0.06 },
                  },
                }}
                whileHover={{ y: -3, borderColor: "rgba(106,228,255,0.4)" }}
                className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-4"
              >
                <div className="mb-1 text-sm font-bold text-[#6AE4FF]">
                  {agent.name}
                </div>
                <div className="mb-2 text-xs text-[#86868b]">{agent.desc}</div>
                <span className="inline-block rounded-full bg-[#0071E3]/20 px-2 py-0.5 text-xs font-medium text-[#6AE4FF]">
                  {agent.badge}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* 하단 Flow 라벨: Input → Analyze → Execute */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP_DEFAULT}
            transition={{ delay: 1.2, duration: 0.4 }}
            className="mt-5 flex items-center gap-3"
          >
            <span className="rounded-full bg-[#2997ff]/20 border border-[#2997ff]/30 px-3 py-1 text-xs font-semibold text-[#2997ff]">
              Input
            </span>
            <span className="text-[#86868b] text-xs">→</span>
            <span className="rounded-full bg-[#bf5af2]/20 border border-[#bf5af2]/30 px-3 py-1 text-xs font-semibold text-[#bf5af2]">
              Analyze
            </span>
            <span className="text-[#86868b] text-xs">→</span>
            <span className="rounded-full bg-[#30d158]/20 border border-[#30d158]/30 px-3 py-1 text-xs font-semibold text-[#30d158]">
              Execute
            </span>
          </motion.div>
        </div>
      )}
    </div>
  );
}
