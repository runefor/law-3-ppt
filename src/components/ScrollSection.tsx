"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollSectionProps {
  children: ReactNode;
  id?: string;
  fullHeight?: boolean;
}

export default function ScrollSection({
  children,
  id,
  fullHeight = false,
}: ScrollSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full h-screen snap-start snap-always flex items-center overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-8">
        {children}
      </div>
    </motion.section>
  );
}
