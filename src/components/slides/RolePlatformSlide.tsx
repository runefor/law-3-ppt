"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { assetPath } from "@/lib/assetPath";
import { VP_DEFAULT, staggerContainer, fadeUpItem } from "@/lib/animations";

interface FeatureIcon {
  icon: string;
  name: string;
}

interface Role {
  icon: string;
  name: string;
  color: string;
  features: FeatureIcon[];
}

export default function RolePlatformSlide({ slide }: { slide: Slide }) {
  const content = slide.content as {
    image: string;
    roles: Role[];
  };

  return (
    <div className="flex flex-col items-center py-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VP_DEFAULT}
        className="mb-8 text-center text-3xl font-bold text-[#f5f5f7]"
      >
        {slide.title}
      </motion.h2>

      <div className="grid grid-cols-2 gap-8 max-w-5xl w-full">
        {content.roles.map((role, ri) => (
          <motion.div
            key={ri}
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={VP_DEFAULT}
            className="flex flex-col"
          >
            <motion.div
              variants={fadeUpItem}
              className="mb-4 flex items-center gap-3"
            >
              <span className="text-2xl">{role.icon}</span>
              <h3
                className="text-xl font-bold"
                style={{ color: role.color }}
              >
                {role.name}
              </h3>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {role.features.map((feat, fi) => (
                <motion.div
                  key={fi}
                  variants={fadeUpItem}
                  whileHover={{ y: -2, borderColor: `${role.color}50` }}
                  className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3"
                >
                  <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={assetPath(feat.icon)}
                      alt={feat.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="text-sm text-[#f5f5f7]">{feat.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
