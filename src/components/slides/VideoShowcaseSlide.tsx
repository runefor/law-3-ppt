"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { useAudience } from "@/contexts/AudienceContext";
import { assetPath } from "@/lib/assetPath";
import VideoModal from "@/components/VideoModal";
import { VP_DEFAULT, staggerContainer, fadeUpItem } from "@/lib/animations";

interface VideoItem {
  title: string;
  src: string;
  icon: string;
}

interface Category {
  label: string;
  color: string;
  videos: VideoItem[];
}

export default function VideoShowcaseSlide({ slide }: { slide: Slide }) {
  const { audience } = useAudience();
  const content = slide.content as {
    categories: Category[];
    developerTitle: string;
    developerSubtitle: string;
    benchmark: {
      bruteForce: { latency: string; pct: number };
      ivfFlat: { latency: string; pct: number };
      speedup: string;
    };
    indexTable: Array<{
      type: string;
      latency: string;
      recall: string;
      verdict: string;
      ok: boolean;
    }>;
  };

  const [activeCategory, setActiveCategory] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string>("");

  const category = content.categories[activeCategory];

  return (
    <div className="flex flex-col items-center py-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        className="mb-6 text-center text-3xl font-bold text-[#f5f5f7]"
      >
        {audience === "developer" ? content.developerTitle : slide.title}
      </motion.h2>

      {audience === "investor" ? (
        <>
          {/* Category tabs */}
          <div className="mb-6 flex gap-2">
            {content.categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                className="rounded-full px-5 py-2 text-sm font-medium transition-all"
                style={{
                  background:
                    activeCategory === i ? `${cat.color}20` : "rgba(255,255,255,0.05)",
                  border: `1px solid ${activeCategory === i ? `${cat.color}50` : "rgba(255,255,255,0.1)"}`,
                  color: activeCategory === i ? cat.color : "#86868b",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Video grid */}
          <motion.div
            key={activeCategory}
            className="grid grid-cols-4 gap-3 max-w-5xl w-full"
            variants={staggerContainer(0.06)}
            initial="hidden"
            animate="visible"
          >
            {category.videos.map((video, i) => (
              <motion.button
                key={i}
                variants={fadeUpItem}
                whileHover={{ y: -3, borderColor: `${category.color}40` }}
                onClick={() => {
                  setActiveVideo(video.src);
                  setActiveTitle(video.title);
                }}
                className="flex flex-col items-center gap-2 rounded-xl bg-white/5 border border-white/10 p-4 text-center transition-colors"
              >
                <div className="h-10 w-10 overflow-hidden rounded-lg">
                  <img
                    src={assetPath(video.icon)}
                    alt={video.title}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-xs text-[#f5f5f7]">{video.title}</span>
                <span
                  className="text-[10px] font-medium"
                  style={{ color: category.color }}
                >
                  재생 ▶
                </span>
              </motion.button>
            ))}
          </motion.div>

          <VideoModal
            src={activeVideo}
            title={activeTitle}
            onClose={() => setActiveVideo(null)}
          />
        </>
      ) : (
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VP_DEFAULT}
          className="flex flex-col gap-6 max-w-3xl w-full"
        >
          <motion.p
            variants={fadeUpItem}
            className="text-center text-sm text-[#86868b]"
          >
            {content.developerSubtitle}
          </motion.p>

          {/* Benchmark bars */}
          <motion.div variants={fadeUpItem} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="w-28 text-right text-sm text-[#86868b]">
                Brute-force
              </span>
              <div className="flex-1 h-7 rounded-lg bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={VP_DEFAULT}
                  transition={{ duration: 1 }}
                  className="h-full rounded-lg bg-gradient-to-r from-[#86868b]/50 to-[#86868b]/30 flex items-center justify-end pr-3"
                >
                  <span className="text-xs font-bold text-white">
                    {content.benchmark.bruteForce.latency}
                  </span>
                </motion.div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-28 text-right text-sm font-semibold text-[#f5f5f7]">
                IVF_FLAT
              </span>
              <div className="flex-1 h-7 rounded-lg bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${content.benchmark.ivfFlat.pct}%` }}
                  viewport={VP_DEFAULT}
                  transition={{ duration: 1.4, delay: 0.3 }}
                  className="h-full rounded-lg bg-gradient-to-r from-[#0071E3] to-[#6AE4FF] flex items-center justify-end pr-3"
                  style={{ boxShadow: "0 0 20px rgba(106,228,255,0.3)" }}
                >
                  <span className="text-xs font-bold text-white">
                    {content.benchmark.ivfFlat.latency}
                  </span>
                </motion.div>
              </div>
              <span className="text-lg font-bold text-[#30E7A9]">
                {content.benchmark.speedup}
              </span>
            </div>
          </motion.div>

          {/* Index table */}
          <motion.div variants={fadeUpItem} className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-3 text-left font-semibold text-[#86868b]">Index</th>
                  <th className="p-3 text-left font-semibold text-[#86868b]">Latency</th>
                  <th className="p-3 text-left font-semibold text-[#86868b]">Recall</th>
                  <th className="p-3 text-left font-semibold text-[#86868b]">Result</th>
                </tr>
              </thead>
              <tbody>
                {content.indexTable.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-white/5 ${row.ok ? "bg-[#30E7A9]/5" : ""}`}
                  >
                    <td className="p-3 font-semibold text-[#6AE4FF]">{row.type}</td>
                    <td className="p-3 text-[#f5f5f7]">{row.latency}</td>
                    <td className={`p-3 ${row.ok ? "text-[#30E7A9] font-bold" : "text-[#86868b]"}`}>
                      {row.recall}
                    </td>
                    <td className="p-3 text-[#86868b]">
                      {row.ok ? "✓ " : "✗ "}{row.verdict}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
