import type { Variants, Transition } from "framer-motion";

/** 공용 viewport 옵션 */
export const VP_DEFAULT = { once: true, amount: 0.2 } as const;
export const VP_CENTER = { once: true, amount: 0.5 } as const;

/** Stagger 컨테이너 variant */
export const staggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0,
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});

/** Fade-up 아이템 variant */
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/** 좌측 진입 variant */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/** 우측 진입 variant */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/** Spring preset — 카드 바운스 */
export const SPRING_BOUNCE: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
  mass: 1,
};

/** Spring preset — 부드러운 착지 */
export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 14,
};

/** 3D hover preset */
export const HOVER_LIFT = {
  scale: 1.05,
  y: -4,
  transition: SPRING_SOFT,
} as const;

/** 3D 카드 hover (perspective 필요) */
export const HOVER_3D = {
  rotateY: 5,
  rotateX: -3,
  scale: 1.03,
  transition: SPRING_SOFT,
} as const;

/** 호흡 애니메이션 (무한 루프) */
export const breatheAnimation = {
  scale: [1, 1.08, 1],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

/** 플로팅 파티클 포지션 + 애니메이션 생성 */
export const PARTICLE_COLORS = ["#2997ff", "#bf5af2", "#30d158", "#ff9f0a"];

export interface ParticleConfig {
  x: string;
  y: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

export function generateParticles(count: number): ParticleConfig[] {
  return Array.from({ length: count }, (_, i) => ({
    x: `${15 + Math.random() * 70}%`,
    y: `${10 + Math.random() * 80}%`,
    size: 3 + Math.random() * 4,
    color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    duration: 4 + Math.random() * 3,
    delay: i * 0.8,
  }));
}

/** 앰비언트 배경 그라디언트 설정 */
export interface AmbientOrb {
  color: string;
  size: string;
  x: number[];
  y: number[];
  duration: number;
}

export const AMBIENT_ORBS: AmbientOrb[] = [
  {
    color: "rgba(41,151,255,0.07)",
    size: "40%",
    x: [20, 80, 20],
    y: [20, 60, 20],
    duration: 20,
  },
  {
    color: "rgba(191,90,242,0.06)",
    size: "35%",
    x: [70, 30, 70],
    y: [70, 30, 70],
    duration: 25,
  },
  {
    color: "rgba(48,209,88,0.05)",
    size: "30%",
    x: [50, 20, 80, 50],
    y: [40, 80, 20, 40],
    duration: 30,
  },
];
