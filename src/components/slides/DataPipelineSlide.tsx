"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { VP_DEFAULT, staggerContainer, fadeUpItem } from "@/lib/animations";
import TypewriterText from "@/components/TypewriterText";

interface ServiceItem {
  icon: string;
  category: string;
  title: string;
  description: string;
  stat: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  BUSINESS: "#6AE4FF",
  VICTORY: "#30E7A9",
  EFFICIENCY: "#A78BFA",
  FRESHNESS: "#F5A623",
};

const CATEGORY_BG: Record<string, string> = {
  BUSINESS: "rgba(20,40,80,0.5)",
  VICTORY: "rgba(48,231,169,0.06)",
  EFFICIENCY: "rgba(167,139,250,0.06)",
  FRESHNESS: "rgba(245,166,35,0.06)",
};

const CATEGORY_BORDER: Record<string, string> = {
  BUSINESS: "rgba(106,228,255,0.18)",
  VICTORY: "rgba(48,231,169,0.18)",
  EFFICIENCY: "rgba(167,139,250,0.18)",
  FRESHNESS: "rgba(245,166,35,0.18)",
};

const CATEGORY_HOVER_SHADOW: Record<string, string> = {
  BUSINESS: "0 8px 32px rgba(106,228,255,0.18)",
  VICTORY: "0 8px 32px rgba(48,231,169,0.18)",
  EFFICIENCY: "0 8px 32px rgba(167,139,250,0.18)",
  FRESHNESS: "0 8px 32px rgba(245,166,35,0.18)",
};

const TAKEAWAY_TEXT =
  "검색에서 전략으로, 기록에서 지능으로 — 법률 대통령은 변호사의 시간을 절약하고, 승소를 설계합니다.";

/* ── Mini Dashboard Components ── */

function BusinessMiniDashboard() {
  return (
    <div
      className="relative overflow-hidden rounded-lg p-2"
      style={{ background: "rgba(20,40,80,0.7)", height: 88 }}
    >
      {/* Korea map silhouette SVG */}
      <svg
        viewBox="0 0 200 180"
        className="absolute left-2 top-1"
        style={{ width: 90, height: 100, opacity: 0.25 }}
      >
        <path
          d="M80,10 C90,8 110,12 120,20 L130,35 C135,45 140,60 138,75 L135,90 C130,100 125,110 120,120 L115,130 C110,140 100,155 90,160 C80,155 70,145 65,135 L60,120 C55,105 50,90 52,75 L55,60 C58,45 65,30 72,20 Z"
          fill="rgba(106,228,255,0.15)"
          stroke="rgba(106,228,255,0.3)"
          strokeWidth="1"
        />
        {/* Heatmap points */}
        <motion.circle
          cx="95" cy="55" r="12"
          fill="rgba(255,80,80,0.4)"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <circle cx="95" cy="55" r="6" fill="rgba(255,80,80,0.7)" />
        <motion.circle
          cx="75" cy="80" r="8"
          fill="rgba(106,228,255,0.5)"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.circle
          cx="110" cy="90" r="9"
          fill="rgba(106,228,255,0.5)"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
        <circle cx="85" cy="110" r="7" fill="rgba(48,231,169,0.5)" />
      </svg>

      {/* Right-side data */}
      <div className="absolute right-1.5 top-1 flex w-[54%] flex-col gap-0.5">
        <div className="flex gap-1">
          <div className="flex-1 rounded px-1.5 py-0.5" style={{ background: "rgba(255,80,80,0.12)", border: "1px solid rgba(255,80,80,0.25)" }}>
            <span className="text-[9px] font-semibold text-[#FF6B6B]">
              <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block">🔴</motion.span> 서초동 <span className="text-[#86868b]">과밀</span>
            </span>
          </div>
          <div className="flex-1 rounded px-1.5 py-0.5" style={{ background: "rgba(106,228,255,0.08)", border: "1px solid rgba(106,228,255,0.2)" }}>
            <span className="text-[9px] font-semibold text-[#6AE4FF]">
              <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block">🔵</motion.span> OO동 <span className="text-[#86868b]">기회</span>
            </span>
          </div>
        </div>
        <div className="rounded-[5px] px-1.5 py-1" style={{ background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.3)" }}>
          <div className="flex items-baseline gap-1">
            <span className="text-[9px] font-semibold text-[#F5A623]">변호사 1인당 인구수</span>
            <span className="text-lg font-extrabold tracking-tight text-[#FFB347]">
              1,200<span className="text-[9px] font-normal text-[#86868b]">명</span>
            </span>
          </div>
          <p className="m-0 text-[8px] text-[#86868b]">전국 평균 대비 150% 기회</p>
        </div>
      </div>
    </div>
  );
}

function VictoryMiniDashboard() {
  return (
    <div
      className="flex flex-col gap-0.5 rounded-lg p-1.5"
      style={{ background: "rgba(20,40,80,0.5)", height: 88 }}
    >
      {/* Mode indicator */}
      <div className="flex items-center gap-1 rounded px-1.5 py-0.5" style={{ background: "rgba(48,231,169,0.1)" }}>
        <motion.span
          className="inline-block h-[5px] w-[5px] rounded-full bg-[#30E7A9]"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-[8px] font-semibold text-[#30E7A9]">모의 재판 모드: 가동 중</span>
      </div>
      {/* Chat bubbles */}
      <div className="flex items-center gap-1">
        <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="shrink-0 text-xs">👤</motion.span>
        <div className="rounded-[5px] rounded-bl-sm bg-white/5 px-1.5 py-0.5">
          <span className="text-[9px] text-[#86868b]">검사/상대 측(AI)</span>
        </div>
        <div className="ml-auto rounded-[5px] rounded-br-sm px-1.5 py-0.5" style={{ background: "rgba(48,231,169,0.12)", border: "1px solid rgba(48,231,169,0.2)" }}>
          <span className="text-[9px] text-[#30E7A9]">나(변호사)</span>
        </div>
        <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="shrink-0 text-xs">⚖️</motion.span>
      </div>
      {/* AI analysis */}
      <div className="mt-auto rounded-[5px] px-1.5 py-1" style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.25)" }}>
        <p className="m-0 text-[9px] font-medium leading-tight text-[#FFB347]">
          🤖 &ldquo;상대 측은 <strong>대법원 202X-XX 판례</strong>를 근거로 반박할 것으로 예상됩니다&rdquo;
        </p>
      </div>
    </div>
  );
}

function EfficiencyMiniDashboard() {
  const YEARS = ["2026", "2030", "2036"];
  const TREE_CHARS = ["┣", "┣", "┗"];
  const OPACITIES = [0.3, 0.25, 0.5];

  return (
    <div
      className="flex flex-col rounded-lg p-1.5"
      style={{ background: "rgba(20,40,80,0.5)", height: 88 }}
    >
      {/* Folder header */}
      <div className="flex items-center gap-1">
        <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="text-[11px]">📂</motion.span>
        <span className="text-[10px] font-semibold text-[#A78BFA]">2026가합1234 사건</span>
      </div>
      {/* Tree structure */}
      <div className="ml-4 flex flex-1 flex-col gap-0">
        {YEARS.map((year, idx) => (
          <div key={year} className="flex items-center gap-1">
            <span className="text-[7px]" style={{ color: "rgba(167,139,250,0.4)" }}>{TREE_CHARS[idx]}</span>
            <span className={`text-[9px] ${idx === YEARS.length - 1 ? "font-semibold text-[#A78BFA]" : "text-[#86868b]"}`}>{year}</span>
            <div
              className="h-0.5 flex-1 rounded-sm"
              style={{ background: `rgba(167,139,250,${OPACITIES[idx]})` }}
            />
          </div>
        ))}
      </div>
      {/* AI memo */}
      <div className="mt-auto rounded px-1.5 py-1" style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)" }}>
        <p className="m-0 text-[8px] leading-tight text-[#A78BFA]">
          📝 <strong>AI 메모</strong>: &ldquo;10년 전 대화 요약 — 당시 의뢰인은 A라고 진술했음&rdquo;
        </p>
      </div>
    </div>
  );
}

function FreshnessMiniDashboard() {
  return (
    <div
      className="flex flex-col gap-1 rounded-lg p-1.5"
      style={{ background: "rgba(20,40,80,0.5)" }}
    >
      {/* Daily brief */}
      <div className="rounded px-1.5 py-1" style={{ background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.2)" }}>
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold text-[#F5A623]">📢 Daily Brief</span>
          <span className="text-[8px] text-[#6AE4FF]">
            <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block">🔗</motion.span> 관련 기사 3건 ›
          </span>
        </div>
        <p className="m-0 text-[9px] leading-tight text-[#f5f5f7]">오늘 오전 선고된 최신 판례 요약</p>
      </div>
      {/* News -> RAG -> Insight flow */}
      <div className="flex items-center justify-center gap-1.5 py-0.5">
        <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="text-[11px]">📰</motion.span>
        <span className="text-[8px] text-[#86868b]">뉴스</span>
        <motion.span
          initial={{ x: -8, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-[10px] text-[#F5A623]"
        >➤</motion.span>
        <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }} className="text-[11px]">🧠</motion.span>
        <span className="text-[8px] text-[#86868b]">RAG</span>
        <motion.span
          initial={{ x: -8, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-[10px] text-[#F5A623]"
        >➤</motion.span>
        <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-[11px]">💡</motion.span>
        <span className="text-[8px] font-semibold text-[#F5A623]">인사이트</span>
      </div>
      {/* RAG status */}
      <div className="flex items-center gap-1 rounded px-1.5 py-0.5" style={{ background: "rgba(48,231,169,0.08)", border: "1px solid rgba(48,231,169,0.15)" }}>
        <motion.span
          className="inline-block h-1 w-1 shrink-0 rounded-full bg-[#30E7A9]"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-[8px] font-medium text-[#30E7A9]">RAG: 최신 뉴스 반영 완료</span>
      </div>
    </div>
  );
}

const MINI_DASHBOARDS: Record<string, React.FC> = {
  BUSINESS: BusinessMiniDashboard,
  VICTORY: VictoryMiniDashboard,
  EFFICIENCY: EfficiencyMiniDashboard,
  FRESHNESS: FreshnessMiniDashboard,
};

export default function DataPipelineSlide({ slide }: { slide: Slide }) {
  const content = slide.content as {
    pivot: { before: string; transition: string; after: string };
    services: ServiceItem[];
  };

  return (
    <div className="flex flex-col items-center py-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        className="mb-4 max-w-4xl text-center text-2xl font-bold text-[#f5f5f7]"
      >
        {slide.title}
      </motion.h2>

      {/* Pivot Banner: Before → Transition → After */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        className="mb-4 grid max-w-[920px] w-full items-stretch"
        style={{ gridTemplateColumns: "1fr auto 1fr" }}
      >
        {/* Before */}
        <div className="rounded-l-xl bg-white/[0.03] border border-white/10 px-3 py-2">
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#86868b] mb-0.5">BEFORE</p>
          <p className="text-[13px] text-[#86868b] leading-snug">
            &ldquo;{content.pivot.before}&rdquo;
          </p>
        </div>

        {/* Transition */}
        <div
          className="flex flex-col items-center justify-center px-3 py-2 min-w-[180px] border-y border-white/10"
          style={{ background: "linear-gradient(180deg, rgba(106,228,255,0.08), rgba(245,166,35,0.08))" }}
        >
          <p className="text-[9px] font-bold uppercase tracking-wider text-[#F5A623] mb-0.5">TRANSITION</p>
          <p className="text-[11px] text-center font-medium leading-snug text-[#f5f5f7]">
            {content.pivot.transition}
          </p>
          <div className="mt-1 flex items-center gap-1">
            <span className="text-[9px] text-[#86868b]">범용</span>
            <motion.span
              initial={{ x: -8, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-[#F5A623]"
            >➤</motion.span>
            <span className="text-[9px] font-bold text-[#F5A623]">전문</span>
          </div>
        </div>

        {/* After */}
        <div
          className="rounded-r-xl px-3 py-2"
          style={{
            background: "linear-gradient(135deg, rgba(20,40,80,0.6), rgba(245,166,35,0.08))",
            border: "1px solid rgba(245,166,35,0.3)",
          }}
        >
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#F5A623] mb-0.5">AFTER</p>
          <p className="text-[13px] font-semibold leading-snug text-[#f5f5f7]">
            &ldquo;{content.pivot.after}&rdquo;
          </p>
        </div>
      </motion.div>

      {/* 4 Service Cards with Mini Dashboards */}
      <motion.div
        className="grid grid-cols-2 gap-2 max-w-[960px] w-full mb-4"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VP_DEFAULT}
      >
        {content.services.map((svc, i) => {
          const color = CATEGORY_COLORS[svc.category] || "#6AE4FF";
          const MiniDash = MINI_DASHBOARDS[svc.category];
          return (
            <motion.div
              key={i}
              variants={fadeUpItem}
              whileHover={{
                y: -5,
                scale: 1.015,
                boxShadow: CATEGORY_HOVER_SHADOW[svc.category],
              }}
              className="rounded-[14px] p-2.5"
              style={{
                background: CATEGORY_BG[svc.category],
                border: `1px solid ${CATEGORY_BORDER[svc.category]}`,
              }}
            >
              {/* Card header */}
              <div className="flex items-center gap-1.5 mb-1.5">
                <motion.span
                  className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full text-[13px]"
                  style={{ background: `${color}25` }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
                >
                  {svc.icon}
                </motion.span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color }}>
                    {svc.category}
                  </p>
                  <p className="text-[13px] font-semibold text-[#f5f5f7]">{svc.title}</p>
                </div>
              </div>

              {/* Mini Dashboard */}
              {MiniDash && <MiniDash />}

              {/* Description */}
              <p className="mt-1 text-[10px] leading-snug text-[#86868b]">
                {svc.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Takeaway with typing effect */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        transition={{ delay: 0.55 }}
        className="max-w-[880px] w-full rounded-xl px-4 py-3 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(20,40,80,0.4), rgba(245,166,35,0.06))",
          border: "1px solid rgba(245,166,35,0.15)",
        }}
      >
        <TypewriterText
          text={TAKEAWAY_TEXT}
          speed={35}
          delay={800}
          className="text-[13px] font-medium leading-relaxed text-[#f5f5f7]"
        />
      </motion.div>
    </div>
  );
}
