"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AppImage } from "@/src/shared/components/app-image";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

import type { TripType } from "@/src/features/categories/types/trip-type";

interface CategoryCardProps {
  tripType: TripType;
  index: number;
}

export function CategoryCard({ tripType, index }: CategoryCardProps) {
  const locale = useLocale();
  // Alternate arrow color between Brand Orange and Ocean Blue
  const arrowColor = index % 2 === 0 ? "#F36F21" : "#0284C7";

  return (
    <Link
      href={`/trips?typeId=${tripType.id}`}
      className="group block select-none h-full"
      draggable={false}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative flex h-[340px] sm:h-[370px] w-full flex-col overflow-hidden rounded-[26px] bg-white isolate transform-gpu [-webkit-mask-image:-webkit-radial-gradient(white,black)] shadow-[0_12px_32px_-8px_rgba(16,24,40,0.08)] transition-all duration-300 hover:shadow-[0_22px_44px_-10px_rgba(16,24,40,0.18)]"
      >
        {/* Card Image: bounded above bottom corners so only solid white touches bottom */}
        <div className="absolute inset-x-0 top-0 bottom-[40px] z-0 overflow-hidden bg-gray-50">
          <AppImage
            src={tripType.imageUrl}
            alt={tripType.name}
            fill
            draggable={false}
            sizes="(max-width: 768px) 280px, (max-width: 1200px) 260px, 300px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>

        {/* ─── White Bottom Drawer: Comes up cleanly from the bottom on hover ─── */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-between rounded-t-[26px] bg-white px-5 pt-6 pb-6 text-center transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-[calc(100%-80px)] group-hover:translate-y-0">
          {/* Category Title: Always visible */}
          <h3 className="line-clamp-2 min-h-[48px] text-[17px] sm:text-[18px] font-bold text-[#1E232A] transition-colors duration-200 group-hover:text-[#F36F21] flex items-center justify-center">
            {tripType.name.trim()}
          </h3>

          {/* Clean SVG Arrow: Revealed cleanly as panel slides all the way up */}
          <div
            className="mt-3 flex size-9 items-center justify-center rounded-full transition-all duration-400 ease-out opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-1"
            style={{ color: arrowColor }}
          >
            <ArrowRight size={22} strokeWidth={2.4} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}