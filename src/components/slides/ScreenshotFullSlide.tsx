"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { VP_DEFAULT, SPRING_SOFT } from "@/lib/animations";

export default function ScreenshotFullSlide({ slide }: { slide: Slide }) {
  const { screenshot, description, video } = slide.content as {
    screenshot: string;
    description: string;
    video?: string;
  };

  return (
    <div
      className="flex flex-col items-center justify-center py-4"
      style={{ perspective: 1200 }}
    >
      <h2 className="mb-6 text-4xl font-bold text-[#f5f5f7]">
        {slide.title}
      </h2>

      {/* macOS window chrome + 3D lift entry */}
      <motion.div
        initial={{ opacity: 0, rotateX: 8, y: 30 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={VP_DEFAULT}
        transition={{ ...SPRING_SOFT, delay: 0.1 }}
        className="w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#1d1d1f]"
      >
        {/* Title bar with traffic lights */}
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs text-[#86868b]">
            Law-3 AI Platform
          </span>
        </div>

        {/* Screenshot / Video content area */}
        <div className="flex h-[360px] items-center justify-center">
          {video ? (
            <video
              src={video}
              controls
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-lg text-[#86868b]">{screenshot}</span>
          )}
        </div>
      </motion.div>

      {/* Reflection effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VP_DEFAULT}
        transition={{ delay: 0.5 }}
        className="mt-0 w-full max-w-4xl overflow-hidden"
        style={{
          transform: "scaleY(-1)",
          height: 60,
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)",
        }}
      >
        <div className="rounded-2xl border border-white/5 bg-[#1d1d1f]">
          <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]/30" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]/30" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]/30" />
          </div>
          <div className="h-[60px]" />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VP_DEFAULT}
        transition={{ delay: 0.4 }}
        className="mt-4 text-base text-[#86868b]"
      >
        {description}
      </motion.p>
    </div>
  );
}
