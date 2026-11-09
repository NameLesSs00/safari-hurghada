"use client";

import type { Trip } from "@/src/features/tours/types/trip";
import { TourCard } from "@/src/features/tours/components/tour-card";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Compass, RotateCcw } from "lucide-react";

interface TripsGridProps {
  trips: Trip[];
  isLoading: boolean;
  error: Error | null;
  onResetFilters?: () => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function TripsGrid({ trips, isLoading, error, onResetFilters }: TripsGridProps) {
  const t = useTranslations("TripsPage.grid");
  
  if (error) {
    return (
      <div className="flex w-full items-center justify-center rounded-3xl border border-red-100 bg-white p-12 text-center shadow-xs">
        <p className="text-base font-bold text-red-600">{t("error")}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-[460px] w-full animate-pulse rounded-[24px] bg-slate-200/70 border border-slate-200/80 md:h-[480px]"
          />
        ))}
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center rounded-3xl border border-gray-200/80 bg-white p-12 sm:p-16 text-center shadow-xs">
        <div className="flex size-14 items-center justify-center rounded-full bg-orange-50 text-[#F36F21] mb-4">
          <Compass size={28} strokeWidth={1.8} />
        </div>
        <p className="text-lg font-extrabold text-[#1E232A]">{t("noTripsTitle")}</p>
        <p className="mt-1.5 text-sm text-slate-500 max-w-sm">
          {t("noTripsDescription")}
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F36F21] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#df5d10] hover:shadow-md active:scale-95 cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {trips.map((trip) => (
        <motion.div
          key={trip.id}
          variants={cardVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          <TourCard trip={trip} />
        </motion.div>
      ))}
    </div>
  );
}
