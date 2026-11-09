"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { useTripsQuery } from "@/src/features/tours/api/get-trips";
import { TourCard } from "@/src/features/tours/components/tour-card";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function ToursSection() {
  const locale = useLocale();
  const t = useTranslations("Tours");

  // Fetch 6 trips for the 3x2 grid
  const { data: trips, isLoading } = useTripsQuery({
    pageSize: 6,
  });

  return (
    <section className="relative overflow-hidden bg-white pt-6 pb-16 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24">
      {/* ─── Left Compass Illustration (With left padding) ─── */}
      <div className="pointer-events-none absolute left-4 sm:left-6 lg:left-10 xl:left-14 top-6 sm:top-8 hidden select-none md:block md:w-[220px] lg:w-[300px] xl:w-[350px] z-0">
        <Image
          src="/tripsHome/compas.svg"
          alt=""
          width={400}
          height={140}
          unoptimized
          className="h-auto w-full object-contain opacity-90"
          priority
        />
      </div>

      {/* ─── Right Pin Illustration (With right padding) ─── */}
      <div className="pointer-events-none absolute right-4 sm:right-6 lg:right-10 xl:right-14 top-6 sm:top-8 hidden select-none md:block md:w-[220px] lg:w-[300px] xl:w-[350px] z-0">
        <Image
          src="/tripsHome/checkmark.svg"
          alt=""
          width={400}
          height={140}
          unoptimized
          className="h-auto w-full object-contain opacity-90"
          priority
        />
      </div>

      {/* Main Content */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="relative z-10 mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-10"
      >
        {/* Section Header */}
        <div className="mx-auto mb-12 sm:mb-14 flex max-w-[760px] flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#F36F21] mb-2"
          >
            {t("eyebrow")}
          </motion.p>

          {/* Title with 3 Outward-Fanning Spark Rays */}
          <motion.h2
            variants={itemVariants}
            className="relative inline-block text-2xl sm:text-3xl lg:text-[40px] font-black tracking-tight text-[#1E232A] leading-tight"
          >
            <span>{t("titlePrefix")} </span>
            <span className="relative inline-block text-[#1E232A]">
              {t("titleHighlight")}
              {/* 3 Outward-Fanning Spark Rays */}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="absolute top-1 sm:top-1.5 -right-6 sm:-right-7 w-5 sm:w-6 h-5 sm:h-6 text-[#F36F21] stroke-current pointer-events-none"
                fill="none"
                strokeWidth="2.8"
                strokeLinecap="round"
              >
                <line x1="3" y1="12" x2="9" y2="2" />
                <line x1="6" y1="16" x2="18" y2="10" />
                <line x1="7" y1="21" x2="19" y2="20" />
              </svg>
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-3 text-sm sm:text-base text-[#64748B] max-w-[540px]"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Loading State Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[430px] rounded-[24px] bg-gray-50 border border-gray-100 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* 6-Card 3x2 Grid */}
        {!isLoading && trips && trips.length > 0 && (
          <motion.div
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
          >
            {trips.slice(0, 6).map((trip) => (
              <motion.div key={trip.id} variants={cardVariants} className="flex">
                <TourCard trip={trip} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && (!trips || trips.length === 0) && (
          <div className="py-16 text-center text-[#64748B]">
            <p className="text-base">{t("noTours")}</p>
          </div>
        )}

        {/* View All Trips CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-12 sm:mt-14 flex justify-center"
        >
          <Link
            href="/trips"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-3 text-sm font-bold text-[#1E232A] shadow-sm transition-all hover:border-[#F36F21] hover:text-[#F36F21] hover:shadow-md active:scale-95"
          >
            <span>{t("viewMore")}</span>
            <span className="text-base leading-none">→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
