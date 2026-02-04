"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, animate, useInView } from "framer-motion";
import type { Slide } from "@/data/slides";
import { AMBIENT_ORBS, generateParticles, type ParticleConfig } from "@/lib/animations";

interface BarData {
  label: string;
  value: number;
}

interface ReflectedStat {
  value: number;
  label: string;
  suffix: string;
  status: "완료" | "예정";
}

interface BarChartContent {
  reflectedStats?: ReflectedStat[];
  bars: BarData[];
  suffix: string;
  total: number;
}

const STATUS_COLORS: Record<string, string> = {
  "완료": "#30d158",
  "예정": "#ff9f0a",
};
const CARD_STAGGER_DELAY = 0.1;

const BAR_COLORS = ["#2997ff", "#bf5af2", "#30d158", "#ff9f0a"];
const LABEL_WIDTH = 180;
const BAR_HEIGHT = 20;
const ROW_HEIGHT = 28;
const CHART_RIGHT_PADDING = 90;
const SEQUENTIAL_DELAY = 0.05;
const PARTICLE_COUNT = 4;

function CountupTotal({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const controls = animate(motionValue, value, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(Math.round(latest).toLocaleString());
      },
    });
    return () => controls.stop();
  }, [motionValue, value, inView]);

  return (
    <span className="text-3xl font-bold text-[#2997ff]">
      {display}
      <span className="ml-1 text-lg font-normal text-[#86868b]">{suffix}</span>
    </span>
  );
}

/**
 * SVG <text> 내부에서 사용하는 카운트업.
 * SVG에서는 <span>이 렌더링되지 않으므로 <tspan>을 반환합니다.
 */
function SvgCountupValue({
  value,
  suffix,
  inView,
  delay,
}: {
  value: number;
  suffix: string;
  inView: boolean;
  delay: number;
}) {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const timeout = setTimeout(() => {
      const controls = animate(motionValue, value, {
        duration: 1.2,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplay(Math.round(latest).toLocaleString());
        },
      });
      return () => controls.stop();
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [motionValue, value, inView, delay]);

  return (
    <tspan>
      {display}
      {suffix}
    </tspan>
  );
}

function CountupStat({
  value,
  suffix,
  inView,
  delay,
}: {
  value: number;
  suffix: string;
  inView: boolean;
  delay: number;
}) {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const timeout = setTimeout(() => {
      const controls = animate(motionValue, value, {
        duration: 1.8,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplay(Math.round(latest).toLocaleString());
        },
      });
      return () => controls.stop();
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [motionValue, value, inView, delay]);

  return (
    <span className="text-xl font-bold text-[#f5f5f7]">
      {display}
      <span className="ml-0.5 text-xs font-normal text-[#86868b]">{suffix}</span>
    </span>
  );
}

export default function BarChartSlide({ slide }: { slide: Slide }) {
  const { bars, suffix, total, reflectedStats } =
    slide.content as unknown as BarChartContent;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const maxValue = Math.max(...bars.map((b) => b.value));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [particles, setParticles] = useState<ParticleConfig[]>([]);

  useEffect(() => {
    setParticles(generateParticles(PARTICLE_COUNT));
  }, []);

  const svgWidth = 900;
  const barAreaWidth = svgWidth - LABEL_WIDTH - CHART_RIGHT_PADDING;
  const svgHeight = bars.length * ROW_HEIGHT + 24;

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center justify-center overflow-hidden py-2"
    >
      {/* 앰비언트 배경 오브 */}
      {AMBIENT_ORBS.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="pointer-events-none absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
          }}
          animate={{
            left: orb.x.map((v) => `${v}%`),
            top: orb.y.map((v) => `${v}%`),
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 플로팅 파티클 */}
      {particles.map((p, i) => (
        <motion.div
          key={`particle-${i}`}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 그라디언트 애니메이션 타이틀 */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mb-1 text-3xl font-bold text-[#f5f5f7]"
      >
        {slide.title}
      </motion.h2>

      {/* 반영 현황 카드 그리드 */}
      {reflectedStats && reflectedStats.length > 0 && (
        <div className="relative z-10 mb-2 grid w-full max-w-3xl grid-cols-4 gap-2 px-4">
          {reflectedStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * CARD_STAGGER_DELAY,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.03,
                y: -4,
                transition: { type: "spring", stiffness: 120, damping: 14 },
              }}
              className="flex flex-col items-center gap-0.5 rounded-xl bg-[#1d1d1f] p-3"
            >
              <CountupStat
                value={stat.value}
                suffix={stat.suffix}
                inView={inView}
                delay={0.3 + i * CARD_STAGGER_DELAY}
              />
              <span className="text-xs text-[#86868b]">{stat.label}</span>
              <span
                className="mt-0.5 flex items-center gap-1 text-[10px] font-medium"
                style={{ color: STATUS_COLORS[stat.status] }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: STATUS_COLORS[stat.status] }}
                />
                {stat.status}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {/* 총합 카운트업 (스케일 바운스) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        className="relative z-10 mb-3 flex items-baseline gap-2"
      >
        <span className="text-sm text-[#86868b]">총</span>
        <CountupTotal value={total} suffix={suffix} inView={inView} />
      </motion.div>

      {/* 막대 그래프 영역 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 w-full max-w-5xl"
      >
        <svg
          width="100%"
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* 그라디언트 정의 */}
          <defs>
            {BAR_COLORS.map((color, i) => (
              <linearGradient
                key={`grad-${i}`}
                id={`bar-gradient-${i}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                <stop offset="100%" stopColor={color} stopOpacity={0.5} />
              </linearGradient>
            ))}
            {/* 글로우 필터 */}
            <filter id="bar-glow" x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* 호버 글로우 */}
            <filter id="bar-glow-hover" x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {bars.map((bar, i) => {
            const barWidth = (bar.value / maxValue) * barAreaWidth;
            const y = i * ROW_HEIGHT + 12;
            const colorIndex = i % BAR_COLORS.length;
            const color = BAR_COLORS[colorIndex];
            const isHovered = hoveredIndex === i;

            return (
              <g
                key={bar.label}
                transform={`translate(0, ${y})`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: "default" }}
              >
                {/* 순위 뱃지 */}
                <motion.text
                  x={12}
                  y={BAR_HEIGHT / 2 + 4}
                  fill={color}
                  fontSize="10"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="700"
                  textAnchor="middle"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    inView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + i * SEQUENTIAL_DELAY,
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                >
                  {i + 1}
                </motion.text>

                {/* 라벨 (좌측에서 슬라이드인) */}
                <motion.text
                  x={LABEL_WIDTH - 12}
                  y={BAR_HEIGHT / 2 + 4}
                  fill={isHovered ? "#f5f5f7" : "#86868b"}
                  fontSize="11"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  textAnchor="end"
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * SEQUENTIAL_DELAY,
                    ease: "easeOut",
                  }}
                >
                  {bar.label}
                </motion.text>

                {/* 배경 바 */}
                <motion.rect
                  x={LABEL_WIDTH}
                  y={0}
                  width={barAreaWidth}
                  height={BAR_HEIGHT}
                  rx={6}
                  fill="rgba(255,255,255,0.03)"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * SEQUENTIAL_DELAY }}
                />

                {/* 글로우 바 (뒤쪽 발광 레이어) */}
                <motion.rect
                  x={LABEL_WIDTH}
                  y={0}
                  height={BAR_HEIGHT}
                  rx={6}
                  fill={color}
                  opacity={isHovered ? 0.4 : 0.15}
                  filter={isHovered ? "url(#bar-glow-hover)" : "url(#bar-glow)"}
                  initial={{ width: 0 }}
                  animate={inView ? { width: barWidth } : { width: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.4 + i * SEQUENTIAL_DELAY,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />

                {/* 메인 그라디언트 바 */}
                <motion.rect
                  x={LABEL_WIDTH}
                  y={0}
                  height={BAR_HEIGHT}
                  rx={6}
                  fill={`url(#bar-gradient-${colorIndex})`}
                  initial={{ width: 0 }}
                  animate={
                    inView
                      ? {
                          width: barWidth,
                          opacity: isHovered ? 1 : 0.85,
                        }
                      : { width: 0 }
                  }
                  transition={{
                    width: {
                      duration: 1.2,
                      delay: 0.4 + i * SEQUENTIAL_DELAY,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                    opacity: { duration: 0.2 },
                  }}
                />

                {/* 호버 시 좌측 엣지 인디케이터 */}
                {isHovered && (
                  <motion.rect
                    x={LABEL_WIDTH}
                    y={0}
                    width={3}
                    height={BAR_HEIGHT}
                    rx={1.5}
                    fill={color}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                  />
                )}

                {/* 값 텍스트 (카운트업) */}
                <motion.text
                  x={LABEL_WIDTH + barWidth + 8}
                  y={BAR_HEIGHT / 2 + 4}
                  fill={isHovered ? color : "#f5f5f7"}
                  fontSize="10"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="600"
                  initial={{ opacity: 0, x: -8 }}
                  animate={
                    inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }
                  }
                  transition={{
                    duration: 0.4,
                    delay: 1.2 + i * SEQUENTIAL_DELAY,
                  }}
                >
                  <SvgCountupValue
                    value={bar.value}
                    suffix={suffix}
                    inView={inView}
                    delay={1.0 + i * SEQUENTIAL_DELAY}
                  />
                </motion.text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* 하단 보충 텍스트 */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 2.0 }}
        className="relative z-10 mt-2 text-xs text-[#86868b]"
      >
        법제처 국가법령정보센터 65종 데이터 기준
      </motion.p>
    </div>
  );
}
