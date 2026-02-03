"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Slide } from "@/data/slides";

interface ServiceInfo {
  name: string;
  image: string;
  description: string;
}

const positions = [
  { top: "6%", left: "8%", rotate: -6, scale: 1.0 },
  { top: "4%", right: "10%", rotate: 4, scale: 1.1 },
  { top: "40%", left: "3%", rotate: 3, scale: 0.95 },
  { top: "38%", right: "5%", rotate: -5, scale: 1.05 },
  { bottom: "12%", left: "12%", rotate: 5, scale: 1.0 },
  { bottom: "10%", right: "8%", rotate: -3, scale: 0.9 },
];

const floatVariants = [
  {
    y: [0, -8, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
  },
  {
    y: [0, 10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 0.5,
    },
  },
  {
    y: [0, -6, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 1,
    },
  },
  {
    y: [0, 8, 0],
    transition: {
      duration: 4.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 0.3,
    },
  },
  {
    y: [0, -10, 0],
    transition: {
      duration: 5.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 0.8,
    },
  },
  {
    y: [0, 7, 0],
    transition: {
      duration: 4.2,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 1.2,
    },
  },
];

const opacities = [0.8, 0.85, 0.75, 0.9, 0.7, 0.8];

export default function ServiceLandscapeSlide({ slide }: { slide: Slide }) {
  const { services } = slide.content as { services: ServiceInfo[] };

  return (
    <div className="relative flex items-center justify-center overflow-hidden py-4">
      {/* Scattered service logos */}
      {services.map((service, i) => {
        const pos = positions[i % positions.length];
        const float = floatVariants[i % floatVariants.length];
        const opacity = opacities[i % opacities.length];

        return (
          <motion.div
            key={service.name}
            className="absolute z-20"
            style={{
              ...pos,
              opacity: 0,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity, scale: pos.scale ?? 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 * i, ease: "easeOut" }}
          >
            <motion.div
              animate={float}
              style={{ rotate: pos.rotate ?? 0 }}
              className="group relative"
            >
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                <Image
                  src={service.image}
                  alt={service.name}
                  width={200}
                  height={120}
                  className="rounded-lg object-contain"
                />
                <p className="mt-2 text-center text-xs font-medium text-[#86868b]">
                  {service.name}
                </p>
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Center screenshot */}
      <motion.div
        className="relative z-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Image
          src="/images/services/landscape-bg.png"
          alt="법률 서비스 시장"
          width={700}
          height={420}
          className="rounded-2xl object-cover"
        />
      </motion.div>
    </div>
  );
}
