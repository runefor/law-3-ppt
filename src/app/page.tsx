import Link from "next/link";

const presentations = [
  {
    title: "중간 발표",
    date: "2026.02.04",
    description: "AI Camp 4기 중간 발표",
    href: "/midterm",
    accent: "#2997ff",
  },
  {
    title: "최종 발표",
    date: "2026.03.06",
    description: "AI Camp 4기 최종 발표",
    href: "/final",
    accent: "#bf5af2",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl md:text-7xl font-bold text-[#f5f5f7] tracking-tight mb-4">
        법률 대통령
      </h1>
      <p className="text-lg md:text-xl text-[#86868b] mb-16">
        AI 법률 플랫폼 프로젝트 발표 자료
      </p>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
        {presentations.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group flex-1 rounded-2xl border border-[#333] bg-[#1d1d1f]/60 p-8 transition-all duration-300 hover:border-transparent hover:bg-[#1d1d1f] hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            style={
              {
                "--card-accent": p.accent,
              } as React.CSSProperties
            }
          >
            <div
              className="text-sm font-medium mb-3 opacity-80"
              style={{ color: p.accent }}
            >
              {p.date}
            </div>
            <h2 className="text-2xl font-semibold text-[#f5f5f7] mb-2 group-hover:text-white transition-colors">
              {p.title}
            </h2>
            <p className="text-[#86868b] text-sm">{p.description}</p>
            <div
              className="mt-6 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: p.accent }}
            >
              시작하기 →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
