"use client";

import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import {
  DISPUTE_TYPE_OPTIONS,
  EVIDENCE_CHECKLIST,
  MOCK_DOCUMENT_TEXT,
} from "@/data/mockData";

const STEP_LABELS = ["분쟁 유형", "사건 정보", "증거 체크", "서류 생성"];
const TOTAL_STEPS = 4;

const DOCUMENT_TYPES = [
  { id: "cert", label: "내용증명" },
  { id: "order", label: "지급명령" },
  { id: "trial", label: "소액심판" },
];

export default function SmallClaimsDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDispute, setSelectedDispute] = useState<string | null>(null);
  const [checkedEvidence, setCheckedEvidence] = useState<Set<string>>(new Set());
  const [selectedDocType, setSelectedDocType] = useState("cert");

  const goNext = () => {
    if (currentStep < TOTAL_STEPS - 1) setCurrentStep(currentStep + 1);
  };

  const goPrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const toggleEvidence = (id: string) => {
    setCheckedEvidence((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const requiredCount = EVIDENCE_CHECKLIST.filter((e) => e.required).length;
  const checkedRequired = EVIDENCE_CHECKLIST.filter(
    (e) => e.required && checkedEvidence.has(e.id)
  ).length;
  const evidenceProgress =
    EVIDENCE_CHECKLIST.length > 0
      ? Math.round((checkedEvidence.size / EVIDENCE_CHECKLIST.length) * 100)
      : 0;

  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1d1d1f]">
      {/* Progress Bar */}
      <div className="border-b border-white/10 px-8 py-5">
        <div className="flex items-center justify-between">
          {STEP_LABELS.map((label, i) => {
            const isCompleted = i < currentStep;
            const isCurrent = i === currentStep;
            return (
              <div key={label} className="flex items-center gap-3">
                {/* Step indicator */}
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                      isCompleted
                        ? "bg-[#30d158] text-white"
                        : isCurrent
                          ? "border-2 border-[#2997ff] text-[#2997ff]"
                          : "border border-white/20 text-[#555]"
                    }`}
                  >
                    {isCompleted ? <Check size={14} /> : i + 1}
                  </div>
                  <span
                    className={`text-xs font-medium transition-colors ${
                      isCompleted
                        ? "text-[#30d158]"
                        : isCurrent
                          ? "text-[#f5f5f7]"
                          : "text-[#555]"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {/* Connector line */}
                {i < TOTAL_STEPS - 1 && (
                  <div
                    className={`h-px w-12 transition-colors ${
                      i < currentStep ? "bg-[#30d158]" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-6 demo-scroll">
        {/* Step 1: Dispute type */}
        {currentStep === 0 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#f5f5f7]">
              분쟁 유형을 선택하세요
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {DISPUTE_TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedDispute(opt.id)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    selectedDispute === opt.id
                      ? "border-[#2997ff] bg-[#2997ff]/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <p className="mt-2 text-sm font-medium text-[#f5f5f7]">
                    {opt.name}
                  </p>
                  <p className="mt-1 text-xs text-[#86868b]">
                    {opt.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Case info (pre-filled mock) */}
        {currentStep === 1 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#f5f5f7]">
              사건 정보를 입력하세요
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs text-[#86868b]">원고명</label>
                <input
                  type="text"
                  readOnly
                  defaultValue="김철수"
                  className="w-full rounded-lg bg-white/5 px-3 py-2.5 text-sm text-[#f5f5f7] outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#86868b]">피고명</label>
                <input
                  type="text"
                  readOnly
                  defaultValue="박영희"
                  className="w-full rounded-lg bg-white/5 px-3 py-2.5 text-sm text-[#f5f5f7] outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#86868b]">청구금액</label>
                <input
                  type="text"
                  readOnly
                  defaultValue="50,000,000원"
                  className="w-full rounded-lg bg-white/5 px-3 py-2.5 text-sm text-[#f5f5f7] outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#86868b]">분쟁 내용</label>
                <textarea
                  readOnly
                  defaultValue="임대차 계약(2024.01.15 ~ 2026.01.14) 만료 후 보증금 5,000만원 미반환. 임대인이 수리비 공제를 주장하며 반환을 거부하고 있음. 내용증명 발송(2024.08.05) 후에도 미응답 상태."
                  className="h-28 w-full resize-none rounded-lg bg-white/5 px-3 py-2.5 text-sm text-[#f5f5f7] outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Evidence checklist */}
        {currentStep === 2 && (
          <div>
            <h3 className="mb-2 text-lg font-semibold text-[#f5f5f7]">
              증거 자료를 확인하세요
            </h3>
            <p className="mb-4 text-xs text-[#86868b]">
              필수 항목 {checkedRequired}/{requiredCount}개 완료
            </p>

            {/* Progress bar */}
            <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#2997ff] transition-all duration-300"
                style={{ width: `${evidenceProgress}%` }}
              />
            </div>

            <div className="space-y-2">
              {EVIDENCE_CHECKLIST.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleEvidence(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                    checkedEvidence.has(item.id)
                      ? "border-[#30d158]/30 bg-[#30d158]/5"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                      checkedEvidence.has(item.id)
                        ? "border-[#30d158] bg-[#30d158]"
                        : "border-white/20"
                    }`}
                  >
                    {checkedEvidence.has(item.id) && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                  <span className="text-sm text-[#f5f5f7]">{item.label}</span>
                  {item.required && (
                    <span className="ml-auto rounded-full bg-[#ff453a]/15 px-2 py-0.5 text-[10px] text-[#ff453a]">
                      필수
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Document preview */}
        {currentStep === 3 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#f5f5f7]">
              서류 미리보기
            </h3>

            {/* Document type selector */}
            <div className="mb-4 flex gap-2">
              {DOCUMENT_TYPES.map((dt) => (
                <button
                  key={dt.id}
                  onClick={() => setSelectedDocType(dt.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                    selectedDocType === dt.id
                      ? "bg-[#2997ff] text-white"
                      : "bg-white/5 text-[#86868b] hover:bg-white/10"
                  }`}
                >
                  <FileText size={14} />
                  {dt.label}
                </button>
              ))}
            </div>

            {/* Document preview */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[#c8c8c8]">
                {MOCK_DOCUMENT_TEXT}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Footer navigation */}
      <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
        <button
          onClick={goPrev}
          disabled={currentStep === 0}
          className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm transition-colors ${
            currentStep === 0
              ? "text-[#333] cursor-not-allowed"
              : "text-[#86868b] hover:text-[#f5f5f7]"
          }`}
        >
          <ChevronLeft size={16} />
          이전
        </button>

        <span className="text-xs text-[#555]">
          {currentStep + 1} / {TOTAL_STEPS}
        </span>

        <button
          onClick={goNext}
          disabled={currentStep === TOTAL_STEPS - 1}
          className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm transition-colors ${
            currentStep === TOTAL_STEPS - 1
              ? "text-[#333] cursor-not-allowed"
              : "bg-[#2997ff] text-white hover:bg-[#2997ff]/90"
          }`}
        >
          다음
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
