"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { GalleryImage } from "@/src/features/gallery/types/gallery";

interface GalleryLightboxProps {
  image: GalleryImage | null;
  images: GalleryImage[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function GalleryLightbox({
  image,
  images,
  onClose,
  onNext,
  onPrev,
}: GalleryLightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("50% 50%");
  const containerRef = useRef<HTMLDivElement>(null);
  // Ref so the keydown handler always reads the latest isZoomed without
  // causing the effect to re-subscribe (and accidentally reset zoom state).
  const isZoomedRef = useRef(false);

  useEffect(() => {
    isZoomedRef.current = isZoomed;
  }, [isZoomed]);

  useEffect(() => {
    if (!image) return;

    // Reset zoom when image changes
    setIsZoomed(false);
    setTransformOrigin("50% 50%");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isZoomedRef.current) {
          setIsZoomed(false);
          setTransformOrigin("50% 50%");
        } else {
          onClose();
        }
      }
      if (e.key === "ArrowRight" && !isZoomedRef.current) onNext();
      if (e.key === "ArrowLeft" && !isZoomedRef.current) onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
    // isZoomed intentionally excluded — use isZoomedRef to avoid re-running
    // this effect on every zoom toggle (which would reset the zoom state).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image?.id, onClose, onNext, onPrev]);

  if (!image) return null;

  const currentIndex = images.findIndex((img) => img.id === image.id);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === images.length - 1;

  const getRelativePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    return { x, y };
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (isZoomed) {
      setIsZoomed(false);
      setTransformOrigin("50% 50%");
    } else {
      const { x, y } = getRelativePosition(e);
      // Set origin instantly (no CSS transition on transform-origin)
      setTransformOrigin(`${x}% ${y}%`);
      setIsZoomed(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { x, y } = getRelativePosition(e);
    setTransformOrigin(`${x}% ${y}%`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:h-12 md:w-12"
        aria-label="Close"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Previous button - hide while zoomed to avoid accidental navigation */}
      {!isFirst && !isZoomed && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:h-12 md:w-12"
          aria-label="Previous image"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Next button - hide while zoomed to avoid accidental navigation */}
      {!isLast && !isZoomed && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:h-12 md:w-12"
          aria-label="Next image"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Image container — click to zoom into that exact point, move mouse to pan */}
      <div
        ref={containerRef}
        className="relative h-[80vh] w-[90vw] max-w-6xl select-none overflow-hidden"
        onClick={handleImageClick}
        onMouseMove={handleMouseMove}
        style={{ cursor: isZoomed ? "zoom-out" : "zoom-in" }}
      >
        <Image
          src={image.imageUrl}
          alt={`Gallery image ${image.id}`}
          fill
          className="select-none object-contain"
          sizes="(min-width: 1280px) 1152px, 90vw"
          style={{
            // Only transition the scale, not transform-origin, so panning feels instant
            transition: "transform 0.3s ease",
            transform: isZoomed ? "scale(2.5)" : "scale(1)",
            transformOrigin,
          }}
          priority
          draggable={false}
        />
      </div>

      {/* Zoom hint */}
      {!isZoomed && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/60 md:bottom-14">
          Click to zoom in
        </div>
      )}

      {/* Image counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
