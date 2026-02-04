"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { assetPath } from "@/lib/assetPath";

interface ImageLightboxProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  images?: string[];
}

const CHEVRON_SIZE = 40;

/**
 * 클릭 시 풀스크린 라이트박스로 확대되는 이미지 컴포넌트.
 *
 * - `images` 배열이 있으면 멀티 이미지 캐러셀 모드로 동작
 * - 없으면 기존 단일 이미지 모드 그대로 유지 (하위 호환)
 */
export default function ImageLightbox({
  src,
  alt,
  width,
  height,
  className = "",
  images,
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageList = (images && images.length > 0 ? images : [src]).map(assetPath);
  const isMulti = imageList.length > 1;

  const open = useCallback(() => {
    setCurrentIndex(0);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % imageList.length);
  }, [imageList.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + imageList.length) % imageList.length,
    );
  }, [imageList.length]);

  useEffect(() => {
    if (!isOpen || !isMulti) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isMulti, goNext, goPrev, close]);

  return (
    <>
      {/* 인라인 이미지 */}
      <div className="relative">
        <Image
          src={imageList[0]}
          alt={alt}
          width={width}
          height={height}
          className={`cursor-zoom-in ${className}`}
          onClick={open}
        />
        {isMulti && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {imageList.map((_, i) => (
              <span
                key={i}
                className={`block h-1.5 w-1.5 rounded-full transition-colors ${
                  i === 0 ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 라이트박스 오버레이 */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={close}
              >
                <motion.div
                  className="relative max-h-[90vh] max-w-[90vw]"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={imageList[currentIndex]}
                    alt={`${alt} (${currentIndex + 1}/${imageList.length})`}
                    width={width * 2}
                    height={height * 2}
                    className="max-h-[90vh] w-auto rounded-xl object-contain"
                  />

                  {/* 닫기 버튼 */}
                  <button
                    onClick={close}
                    className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#1d1d1f] text-sm text-[#f5f5f7] shadow-lg transition-colors hover:bg-[#333]"
                    aria-label="Close"
                  >
                    &times;
                  </button>

                  {/* 캐러셀 내비게이션 */}
                  {isMulti && (
                    <>
                      {/* 이전 버튼 */}
                      <button
                        onClick={goPrev}
                        className="absolute left-0 top-1/2 flex -translate-x-14 -translate-y-1/2 items-center justify-center rounded-full bg-[#1d1d1f]/80 text-[#f5f5f7] shadow-lg transition-colors hover:bg-[#333]"
                        style={{
                          width: CHEVRON_SIZE,
                          height: CHEVRON_SIZE,
                        }}
                        aria-label="Previous image"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M12.5 15L7.5 10L12.5 5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      {/* 다음 버튼 */}
                      <button
                        onClick={goNext}
                        className="absolute right-0 top-1/2 flex -translate-y-1/2 translate-x-14 items-center justify-center rounded-full bg-[#1d1d1f]/80 text-[#f5f5f7] shadow-lg transition-colors hover:bg-[#333]"
                        style={{
                          width: CHEVRON_SIZE,
                          height: CHEVRON_SIZE,
                        }}
                        aria-label="Next image"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M7.5 15L12.5 10L7.5 5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      {/* 도트 인디케이터 */}
                      <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
                        {imageList.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`block h-2 w-2 rounded-full transition-colors ${
                              i === currentIndex
                                ? "bg-white"
                                : "bg-white/40 hover:bg-white/60"
                            }`}
                            aria-label={`Go to image ${i + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
