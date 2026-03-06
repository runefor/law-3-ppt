"use client";

import { useEffect, useState, useCallback } from "react";
import { useAudience } from "@/contexts/AudienceContext";

interface NavSection {
  label: string;
  slideId: number;
}

interface StickyNavProps {
  sections?: NavSection[];
}

const DEFAULT_SECTIONS: NavSection[] = [
  { label: "배경", slideId: 3 },
  { label: "솔루션", slideId: 6 },
  { label: "아키텍처", slideId: 10 },
  { label: "데이터", slideId: 14 },
  { label: "진행", slideId: 16 },
  { label: "데모", slideId: 18 },
  { label: "계획", slideId: 23 },
];

export default function StickyNav({ sections }: StickyNavProps) {
  const navSections = sections || DEFAULT_SECTIONS;
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { audience, setAudience } = useAudience();

  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > window.innerHeight * 0.5);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const sectionEls = navSections
      .map(({ slideId }) => document.getElementById(`slide-${slideId}`))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const slideNum = parseInt(id.replace("slide-", ""), 10);
            const matched = [...navSections]
              .reverse()
              .find((s) => slideNum >= s.slideId);
            if (matched) setActiveSection(matched.label);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navSections]);

  const scrollTo = (slideId: number) => {
    const el = document.getElementById(`slide-${slideId}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }`}
    >
      <div className="border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-semibold text-[#f5f5f7] transition-opacity hover:opacity-70"
          >
            Law-3
          </button>
          <div className="flex items-center gap-6">
            {navSections.map((section) => (
              <button
                key={section.label}
                onClick={() => scrollTo(section.slideId)}
                className={`text-sm transition-colors ${
                  activeSection === section.label
                    ? "font-medium text-[#2997ff]"
                    : "text-[#86868b] hover:text-[#f5f5f7]"
                }`}
              >
                {section.label}
              </button>
            ))}

            {/* Audience toggle */}
            <div className="ml-4 flex rounded-full bg-white/10 p-1 backdrop-blur-lg border border-white/15">
              <button
                onClick={() => setAudience("investor")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  audience === "investor"
                    ? "bg-[#0071E3] text-white"
                    : "text-[#86868b]"
                }`}
              >
                투자자
              </button>
              <button
                onClick={() => setAudience("developer")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  audience === "developer"
                    ? "bg-[#0071E3] text-white"
                    : "text-[#86868b]"
                }`}
              >
                개발자
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
