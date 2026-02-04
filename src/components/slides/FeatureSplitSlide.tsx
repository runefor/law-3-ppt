"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { VP_DEFAULT, SPRING_SOFT, staggerContainer } from "@/lib/animations";
import ImageLightbox from "@/components/ImageLightbox";

export default function FeatureSplitSlide({ slide }: { slide: Slide }) {
  const content = slide.content as {
    features?: string[];
    pipeline?: string[];
    screenshot?: string;
    screenshots?: string[];
  };

  const items = content.features || content.pipeline || [];
  const screenshots = content.screenshots;
  const screenshot = content.screenshot;
  const firstImage = screenshots?.[0] ?? screenshot;
  const isImagePath = firstImage?.startsWith("/");

  return (
    <div className="flex flex-col justify-center py-4">
      <h2 className="mb-2 text-4xl font-bold text-[#f5f5f7]">
        {slide.title}
      </h2>
      {slide.subtitle && (
        <p className="mb-6 text-lg text-[#86868b]">{slide.subtitle}</p>
      )}
      <div className="grid grid-cols-2 gap-6">
        {/* Feature list with stagger + sequential badge fill */}
        <motion.div
          className="flex flex-col gap-4"
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VP_DEFAULT}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.4 },
                },
              }}
              whileHover={{ x: 4, transition: SPRING_SOFT }}
              className="flex items-start gap-4 rounded-xl bg-[#1d1d1f] p-5"
            >
              {/* Number badge: outline → solid fill */}
              <motion.span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                initial={{
                  backgroundColor: "transparent",
                  borderWidth: 2,
                  borderColor: "#2997ff",
                  color: "#2997ff",
                }}
                whileInView={{
                  backgroundColor: "rgba(41,151,255,0.2)",
                  color: "#2997ff",
                }}
                viewport={VP_DEFAULT}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                style={{ borderStyle: "solid" }}
              >
                {i + 1}
              </motion.span>
              <span className="text-base text-[#f5f5f7]">{item}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Screenshot with 3D perspective entry + border shimmer */}
        <motion.div
          initial={{ opacity: 0, rotateY: -15 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          viewport={VP_DEFAULT}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ perspective: 1200 }}
          className="flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#1d1d1f]"
        >
          <motion.div
            className="h-full w-full"
            animate={{
              boxShadow: [
                "inset 0 0 0 1px rgba(41,151,255,0.15)",
                "inset 0 0 0 1px rgba(191,90,242,0.15)",
                "inset 0 0 0 1px rgba(41,151,255,0.15)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {isImagePath && firstImage ? (
              <ImageLightbox
                src={firstImage}
                alt={slide.title}
                width={600}
                height={400}
                className="h-full w-full object-cover"
                images={screenshots}
              />
            ) : (
              <span className="flex h-full items-center justify-center p-12 text-center text-sm text-[#86868b]">
                {screenshot || "Screenshot placeholder"}
              </span>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
