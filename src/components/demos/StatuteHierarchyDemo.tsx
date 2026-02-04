"use client";

import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import ForceGraph2D from "./ForceGraphWrapper";
import { GRAPH_NODES, GRAPH_LINKS } from "@/data/mockData";
import { GRAPH_COLORS } from "@/data/constants";
import { assetPath } from "@/lib/assetPath";

interface NodeObj {
  id: string;
  name: string;
  type: string;
  orbit: number;
  color: string;
  size: number;
  logo?: string;
  x?: number;
  y?: number;
}

const ORBIT_RADII = [0, 160, 280];

// Image cache for logos
const imageCache = new Map<string, HTMLImageElement>();

function getLogoImage(src: string): HTMLImageElement | null {
  if (imageCache.has(src)) {
    const img = imageCache.get(src)!;
    return img.complete && img.naturalWidth > 0 ? img : null;
  }
  const img = new Image();
  img.src = assetPath(src);
  imageCache.set(src, img);
  return null;
}

const legendItems = [
  { label: "헌법 (태양)", color: GRAPH_COLORS.constitution, logo: "" },
  { label: "법률 (국회)", color: GRAPH_COLORS.law, logo: "/data/logo/National_Assembly.png" },
  { label: "대통령령", color: GRAPH_COLORS.decree, logo: "/data/logo/president.svg" },
  { label: "대법원규칙", color: GRAPH_COLORS.regulation, logo: "/data/logo/sck.svg" },
];

export default function StatuteHierarchyDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fgRef = useRef<any>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const graphData = useMemo(() => {
    // 궤도별 노드를 균등 각도로 고정 배치
    const orbitCounts: Record<number, number> = {};
    const orbitIndices: Record<number, number> = {};
    for (const n of GRAPH_NODES) {
      orbitCounts[n.orbit] = (orbitCounts[n.orbit] || 0) + 1;
      orbitIndices[n.orbit] = 0;
    }

    const nodes = GRAPH_NODES.map((n) => {
      const radius = ORBIT_RADII[n.orbit] || 0;
      const count = orbitCounts[n.orbit] || 1;
      const idx = orbitIndices[n.orbit]++;
      const angle = (2 * Math.PI * idx) / count - Math.PI / 2;
      // 모든 노드를 fx/fy로 고정하여 항상 동일한 레이아웃 보장
      return {
        ...n,
        fx: radius * Math.cos(angle),
        fy: radius * Math.sin(angle),
      };
    });

    return {
      nodes,
      links: GRAPH_LINKS.map((l) => ({ ...l })),
    };
  }, []);

  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;
    // 고정 배치이므로 불필요한 force 제거
    fg.d3Force("charge", null);
    fg.d3Force("center", null);
    fg.d3Force("link", null);
  }, []);

  const paintNode = useCallback(
    (node: NodeObj, ctx: CanvasRenderingContext2D) => {
      const { x = 0, y = 0, color, size, name, type, id, logo } = node;
      const isHovered = hoveredNode === id;
      const r = size * (isHovered ? 1.3 : 1);

      // Glow for constitution (sun effect)
      if (type === "constitution") {
        ctx.beginPath();
        const outerGlow = ctx.createRadialGradient(x, y, r, x, y, r * 3.5);
        outerGlow.addColorStop(0, "rgba(255, 107, 53, 0.3)");
        outerGlow.addColorStop(0.5, "rgba(255, 165, 0, 0.1)");
        outerGlow.addColorStop(1, "transparent");
        ctx.fillStyle = outerGlow;
        ctx.arc(x, y, r * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Sun body gradient
        ctx.beginPath();
        const sunGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
        sunGrad.addColorStop(0, "#ffdd00");
        sunGrad.addColorStop(0.6, "#ff8c00");
        sunGrad.addColorStop(1, "#ff4500");
        ctx.fillStyle = sunGrad;
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.shadowColor = "#ff6b35";
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        // White background circle
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Colored border
        ctx.strokeStyle = isHovered ? "#ffffff" : color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw logo if available
        const logoImg = logo ? getLogoImage(logo) : null;
        if (logoImg) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, r - 1, 0, Math.PI * 2);
          ctx.clip();
          const imgSize = r * 1.5;
          ctx.drawImage(logoImg, x - imgSize / 2, y - imgSize / 2, imgSize, imgSize);
          ctx.restore();
        } else {
          // Fallback: colored inner circle
          ctx.beginPath();
          ctx.arc(x, y, r * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `${color}60`;
          ctx.fill();
        }
      }

      // Label
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const fontSize = type === "constitution" ? 7 : type === "law" ? 5.5 : 4.5;
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = isHovered ? color : "#f5f5f7";
      ctx.fillText(name, x, y + r + fontSize + 2);
    },
    [hoveredNode]
  );

  const paintBefore = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const cx = dimensions.width / 2;
      const cy = dimensions.height / 2;

      // Draw orbit rings
      for (let i = 1; i < ORBIT_RADII.length; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, ORBIT_RADII[i], 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    },
    [dimensions]
  );

  return (
    <div
      ref={containerRef}
      className="relative h-[600px] overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117]"
    >
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        nodeCanvasObject={paintNode as never}
        nodePointerAreaPaint={((node: NodeObj, color: string, ctx: CanvasRenderingContext2D) => {
          ctx.beginPath();
          ctx.arc(node.x || 0, node.y || 0, node.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }) as never}
        onNodeHover={((node: NodeObj | null) =>
          setHoveredNode(node?.id || null)
        ) as never}
        linkColor={() => "rgba(255,255,255,0.08)"}
        linkWidth={1}
        onRenderFramePre={paintBefore}
        cooldownTicks={100}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
        enableZoomInteraction={false}
        backgroundColor="transparent"
      />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-2 backdrop-blur-sm">
        <p className="mb-2 text-[10px] font-medium text-[#86868b]">
          법령 유형
        </p>
        <div className="flex flex-col gap-1.5">
          {legendItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              {item.logo ? (
                <span
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full border"
                  style={{ borderColor: item.color }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={assetPath(item.logo)} alt="" className="h-2.5 w-2.5 object-contain" />
                </span>
              ) : (
                <span
                  className="inline-block h-4 w-4 rounded-full"
                  style={{
                    background: `radial-gradient(circle, #ffdd00, #ff8c00, #ff4500)`,
                    boxShadow: `0 0 4px ${item.color}80`,
                  }}
                />
              )}
              <span className="text-[10px] text-[#a1a1a6]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Title overlay */}
      <div className="absolute right-4 top-4 rounded-lg bg-black/60 px-3 py-2 backdrop-blur-sm">
        <p className="text-[10px] text-[#86868b]">
          노드를 드래그하거나 호버하세요
        </p>
      </div>
    </div>
  );
}
