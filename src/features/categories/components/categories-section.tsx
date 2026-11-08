"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useTripTypesQuery } from "@/src/features/categories/api/get-trip-types";
import { CategoryCard } from "@/src/features/categories/components/category-card";

export function CategoriesSection() {
  const { data: rawTripTypes, isLoading, error } = useTripTypesQuery();

  const tripTypes = useMemo(() => {
    if (!rawTripTypes) return null;
    return rawTripTypes;
  }, [rawTripTypes]);

  const t = useTranslations("Categories");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setDragDistance(0);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
    setDragDistance(Math.abs(x - startX));
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (dragDistance > 10) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  if (isLoading) {
    return (
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-5 text-center">
          <p className="text-[#6B7280]">{t("loading")}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-5 text-center">
          <p className="text-red-500">{t("error")}</p>
        </div>
      </section>
    );
  }

  if (!tripTypes || tripTypes.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-white pt-14 pb-10 md:pt-20 md:pb-14">
      {/* ─── Far Left Camel Illustration (With left padding) ─── */}
      <div className="pointer-events-none absolute left-4 sm:left-6 lg:left-10 xl:left-14 top-12 sm:top-14 hidden select-none md:block md:w-[280px] lg:w-[380px] xl:w-[440px] z-0">
        <Image
          src="/catagory/camel.png"
          alt=""
          width={540}
          height={270}
          priority
          unoptimized
          className="h-auto w-full object-contain opacity-95"
        />
      </div>

      {/* ─── Far Right Diver Illustration (With right padding) ─── */}
      <div className="pointer-events-none absolute right-4 sm:right-6 lg:right-10 xl:right-14 top-12 sm:top-14 hidden select-none md:block md:w-[280px] lg:w-[380px] xl:w-[440px] z-0">
        <Image
          src="/catagory/dive.png"
          alt=""
          width={540}
          height={270}
          priority
          unoptimized
          className="h-auto w-full object-contain opacity-95"
        />
      </div>

      <div className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:max-w-[1420px] lg:px-8">
        {/* ─── Center Header Block ─── */}
        <div className="relative mb-14 sm:mb-20 flex items-center justify-center">
          <div className="mx-auto flex max-w-[720px] flex-col items-center text-center px-4">
            {/* Eyebrow */}
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-[#F36F21]">
              {t("subtitle")}
            </span>

            {/* Title with Clean Outward-Fanning Sparks on "Adventure" */}
            <h2 className="relative mt-2.5 inline-block text-3xl font-extrabold tracking-tight text-[#1E232A] sm:text-4xl lg:text-[46px] leading-tight">
              <span>Find Your Next </span>
              <span className="relative inline-block">
                Adventure
                {/* 3 Sparks fanning outward to the right */}
                <svg
                  className="absolute top-0 sm:top-1 -right-7 sm:-right-8 size-6 sm:size-7 text-[#F36F21]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                >
                  <line x1="3" y1="12" x2="9" y2="2" />
                  <line x1="6" y1="16" x2="18" y2="10" />
                  <line x1="7" y1="21" x2="19" y2="20" />
                </svg>
              </span>
            </h2>

            {/* Subtitle flanked by clean flourish lines */}
            <div className="mt-4 flex items-center justify-center gap-3.5 max-w-[580px]">
              <span className="hidden sm:inline-block h-px w-12 bg-amber-200" />
              <p className="text-sm sm:text-base leading-relaxed text-[#535764]">
                {t("description")}
              </p>
              <span className="hidden sm:inline-block h-px w-12 bg-amber-200" />
            </div>
          </div>
        </div>

        {/* ─── Category Cards Carousel with Slide-Up White Panels ─── */}
        <div className="relative">
          {/* Scroll Navigation Buttons (Desktop & Mobile) */}
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
            className="absolute -left-2 sm:-left-3 lg:-left-5 top-1/2 z-20 flex size-10 sm:size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1E232A] shadow-xl border border-gray-100 transition hover:scale-105 active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} strokeWidth={2.2} />
          </button>
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
            className="absolute -right-2 sm:-right-3 lg:-right-5 top-1/2 z-20 flex size-10 sm:size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1E232A] shadow-xl border border-gray-100 transition hover:scale-105 active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} strokeWidth={2.2} />
          </button>

          {/* Cards Track with generous padding so shadows are never clipped */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onClickCapture={handleClickCapture}
            className={`flex gap-5 sm:gap-6 overflow-x-auto select-none py-8 px-4 -mx-4 snap-x snap-mandatory touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            {tripTypes.map((tripType, index) => (
              <div
                key={tripType.id}
                className="w-[250px] sm:w-[280px] lg:w-[300px] shrink-0 snap-center"
              >
                <CategoryCard tripType={tripType} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}