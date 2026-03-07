"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";
import { assetPath } from "@/lib/assetPath";
import SlideModal from "./SlideModal";
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

interface ServiceDetail {
  name: string;
  icon: string;
  tagline: string;
  target: string;
  features: string[];
  stats: Array<{ value: string; label: string }>;
}

interface ServiceGroup {
  label: string;
  icon: string;
  services: ServiceDetail[];
}

interface RoleModalData {
  groups: ServiceGroup[];
}

export default function RolePlatformSlide({ slide }: { slide: Slide }) {
  const content = slide.content as {
    image: string;
    roles: Role[];
    roleModals?: Record<string, RoleModalData>;
  };

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const roleModalData = selectedRole ? content.roleModals?.[selectedRole] : null;

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
              {content.roleModals && (
                <button
                  onClick={() => setSelectedRole(role.name)}
                  className="ml-auto rounded-full px-3 py-1 text-xs font-medium transition-colors"
                  style={{
                    background: `${role.color}15`,
                    border: `1px solid ${role.color}30`,
                    color: role.color,
                  }}
                >
                  상세 보기 →
                </button>
              )}
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {role.features.map((feat, fi) => (
                <motion.div
                  key={fi}
                  variants={fadeUpItem}
                  whileHover={{ y: -2, borderColor: `${role.color}50` }}
                  onClick={() => setSelectedRole(role.name)}
                  className="flex cursor-pointer items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3"
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

      <SlideModal
        isOpen={!!selectedRole && !!roleModalData}
        onClose={() => setSelectedRole(null)}
        title={selectedRole ? `${selectedRole === "일반인" ? "👤" : "⚖️"} ${selectedRole} 서비스` : undefined}
      >
        {roleModalData && (
          <div className="flex flex-col gap-6">
            {roleModalData.groups.map((group, gi) => (
              <div key={gi}>
                <div className="mb-3 flex items-center gap-2">
                  <span>{group.icon}</span>
                  <h4 className="text-sm font-bold text-[#f5f5f7] uppercase tracking-wider">
                    {group.label}
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {group.services.map((svc, si) => (
                    <div
                      key={si}
                      className="rounded-xl bg-white/[0.03] border border-white/10 p-4"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-lg">{svc.icon}</span>
                        <h5 className="text-sm font-bold text-[#f5f5f7]">
                          {svc.name}
                        </h5>
                      </div>
                      <p className="mb-3 text-xs text-[#6AE4FF]">
                        {svc.tagline}
                      </p>
                      <div className="mb-3 flex flex-wrap gap-2">
                        {svc.stats.map((stat, sti) => (
                          <span
                            key={sti}
                            className="rounded-full bg-[#2997ff]/10 border border-[#2997ff]/20 px-2.5 py-1 text-[10px] font-medium text-[#6AE4FF]"
                          >
                            {stat.value} {stat.label}
                          </span>
                        ))}
                      </div>
                      <ul className="flex flex-col gap-1">
                        {svc.features.map((feat, fi) => (
                          <li
                            key={fi}
                            className="text-xs text-[#86868b] pl-3 relative before:absolute before:left-0 before:top-[6px] before:h-1 before:w-1 before:rounded-full before:bg-[#86868b]/50"
                          >
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </SlideModal>
    </div>
  );
}
