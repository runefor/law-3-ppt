"use client";

import { motion } from "framer-motion";
import type { Slide } from "@/data/slides";

interface FlowPath {
  role: string;
  steps: string[];
}

interface Layer {
  name: string;
  tech: string;
  logos?: string[];
}

interface Agent {
  name: string;
  description: string;
  color: string;
}

const vp = { once: true, amount: 0.2 } as const;

export default function DiagramFullscreenSlide({ slide }: { slide: Slide }) {
  const content = slide.content as Record<string, unknown>;
  const note = content.note as string | undefined;

  // Slide 6: Service flow
  if (content.flow && typeof content.flow === "object" && "entry" in (content.flow as Record<string, unknown>)) {
    const flow = content.flow as { entry: string; paths: FlowPath[]; convergence?: string };
    return (
      <div className="flex flex-col items-center justify-center py-4">
        <h2 className="mb-6 text-4xl font-bold text-[#f5f5f7]">{slide.title}</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="mb-8 rounded-2xl bg-[#2997ff]/20 px-8 py-4 text-center text-lg font-semibold text-[#2997ff]"
        >
          {flow.entry}
        </motion.div>
        {/* Arrow from entry to branches */}
        <svg width="12" height="28" viewBox="0 0 12 28" className="mb-4">
          <line x1="6" y1="0" x2="6" y2="22" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
          <polygon points="1,20 6,27 11,20" fill="white" fillOpacity="0.4" />
        </svg>
        <div className="flex gap-16">
          {(() => {
            const maxSteps = Math.max(...flow.paths.map((p) => p.steps.length));
            return flow.paths.map((path, pi) => {
              const extra = (maxSteps - path.steps.length) * 68;
              const arrowH = 28 + extra;
              return (
                <motion.div
                  key={pi}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.5, delay: 0.2 + pi * 0.15 }}
                  className="flex flex-col items-center gap-3"
                >
                  <span className={`rounded-full px-5 py-2 text-sm font-semibold ${pi === 0 ? "bg-[#30d158]/20 text-[#30d158]" : "bg-[#bf5af2]/20 text-[#bf5af2]"}`}>
                    {path.role}
                  </span>
                  {path.steps.map((step, si) => (
                    <div key={si} className="flex flex-col items-center">
                      {si > 0 && (
                        <svg width="12" height="24" viewBox="0 0 12 24" className="mb-1 mt-1">
                          <line x1="6" y1="0" x2="6" y2="18" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
                          <polygon points="1,16 6,23 11,16" fill="white" fillOpacity="0.4" />
                        </svg>
                      )}
                      <div className="rounded-xl bg-[#1d1d1f] px-6 py-3 text-center text-sm text-[#f5f5f7]">
                        {step}
                      </div>
                    </div>
                  ))}
                  {/* Arrow down to convergence — longer for shorter paths */}
                  {flow.convergence && (
                    <svg width="12" height={arrowH} viewBox={`0 0 12 ${arrowH}`} className="mt-2">
                      <line x1="6" y1="0" x2="6" y2={arrowH - 7} stroke="white" strokeOpacity="0.4" strokeWidth="2" />
                      <polygon points={`1,${arrowH - 8} 6,${arrowH - 1} 11,${arrowH - 8}`} fill="white" fillOpacity="0.4" />
                    </svg>
                  )}
                </motion.div>
              );
            });
          })()}
        </div>
        {/* Convergence point */}
        {flow.convergence && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={vp}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-2 rounded-2xl border border-[#ff9f0a]/30 bg-[#ff9f0a]/10 px-10 py-4 text-center text-base font-semibold text-[#ff9f0a]"
          >
            {flow.convergence}
          </motion.div>
        )}
        {note && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            transition={{ delay: 0.6 }}
            className="mt-8 text-sm text-[#86868b]"
          >
            {note}
          </motion.p>
        )}
      </div>
    );
  }

  // Slide 10: System architecture (layers)
  if (content.layers) {
    const layers = content.layers as Layer[];
    return (
      <div className="flex flex-col items-center justify-center py-4">
        <h2 className="mb-6 text-4xl font-bold text-[#f5f5f7]">{slide.title}</h2>
        <div className="flex w-full max-w-3xl flex-col gap-3">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="flex items-center justify-between rounded-2xl bg-[#1d1d1f] px-8 py-5"
            >
              <span className="text-lg font-semibold text-[#f5f5f7]">{layer.name}</span>
              <div className="flex items-center gap-3">
                {layer.logos?.map((url, li) => (
                  <img
                    key={li}
                    src={url}
                    alt=""
                    className="h-5 w-5 object-contain"
                    loading="lazy"
                  />
                ))}
                <span className="text-sm text-[#86868b]">{layer.tech}</span>
              </div>
            </motion.div>
          ))}
        </div>
        {note && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            transition={{ delay: 0.6 }}
            className="mt-6 text-sm text-[#86868b]"
          >
            {note}
          </motion.p>
        )}
      </div>
    );
  }

  // Slide 12: Multi-agent architecture
  if (content.architecture) {
    const arch = content.architecture as {
      orchestrator: string;
      router: string;
      executor: string;
      agents: Agent[];
    };
    return (
      <div className="flex flex-col items-center justify-center py-4">
        <h2 className="mb-6 text-4xl font-bold text-[#f5f5f7]">{slide.title}</h2>
        <div className="flex flex-col items-center gap-3">
          {[arch.orchestrator, arch.router, arch.executor].map((label, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="rounded-xl bg-[#1d1d1f] px-8 py-3 text-center text-sm font-medium text-[#f5f5f7]">
                {label}
              </div>
              {i < 2 && <div className="mt-2 h-4 w-px bg-white/20" />}
            </motion.div>
          ))}
          <div className="mt-2 h-4 w-px bg-white/20" />
          <div className="flex gap-4">
            {arch.agents.map((agent, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                className="flex flex-col items-center rounded-2xl bg-[#1d1d1f] p-5"
                style={{ borderTop: `3px solid ${agent.color}` }}
              >
                <span className="text-sm font-semibold text-[#f5f5f7]">{agent.name}</span>
                <span className="mt-1 text-xs text-[#86868b]">{agent.description}</span>
              </motion.div>
            ))}
          </div>
        </div>
        {note && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            transition={{ delay: 0.7 }}
            className="mt-6 text-sm text-[#86868b]"
          >
            {note}
          </motion.p>
        )}
      </div>
    );
  }

  // Fallback
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h2 className="mb-8 text-4xl font-bold text-[#f5f5f7]">{slide.title}</h2>
      <div className="rounded-2xl bg-[#1d1d1f] px-12 py-8 text-[#86868b]">
        {(content.placeholder as string) || "Diagram placeholder"}
      </div>
      {note && <p className="mt-8 text-sm text-[#86868b]">{note}</p>}
    </div>
  );
}
