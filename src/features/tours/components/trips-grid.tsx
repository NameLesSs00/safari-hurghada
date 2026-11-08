"use client";

import type { Trip } from "@/src/features/tours/types/trip";
import { TourCard } from "@/src/features/tours/components/tour-card";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

interface TripsGridProps {
  trips: Trip[];
  isLoading: boolean;
  error: Error | null;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export function TripsGrid({ trips, isLoading, error }: TripsGridProps) {
  const t = useTranslations("TripsPage.grid");
  
  if (error) {
    return (
      <div className="flex w-full items-center justify-center rounded-2xl bg-red-50 py-12 text-center text-red-500">
        <p>{t("error")}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-[460px] w-full animate-pulse rounded-[24px] bg-gray-100 md:h-[480px]"
          />
        ))}
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
        <p className="text-lg font-medium text-gray-500">{t("noTripsTitle")}</p>
        <p className="mt-1 text-sm text-gray-400">
          {t("noTripsDescription")}
        </p>
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
          viewport={{ once: true, margin: "-50px" }}
        >
          <TourCard trip={trip} />
        </motion.div>
      ))}
    </div>
  );
}
