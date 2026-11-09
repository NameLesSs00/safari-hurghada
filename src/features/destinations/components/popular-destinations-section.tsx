"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { usePopularDestinationsQuery } from "@/src/features/destinations/api/get-popular-destinations";
import { DestinationCard } from "@/src/features/destinations/components/destination-card";

// Animation Variants
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

export function PopularDestinationsSection() {
  const { data: destinations, isLoading, error } = usePopularDestinationsQuery();
  const locale = useLocale();
  const t = useTranslations("PopularDestinations");

  if (error || (!isLoading && (!destinations || destinations.length === 0))) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
      {/* ─── Far Left Desert Palm & Dunes Illustration ─── */}
      <div className="pointer-events-none absolute left-4 sm:left-6 lg:left-10 xl:left-14 top-6 sm:top-8 hidden select-none md:block md:w-[220px] lg:w-[300px] xl:w-[350px] z-0">
        <Image
          src="/distintionsHome/yellow.png"
          alt=""
          width={420}
          height={160}
          unoptimized
          className="h-auto w-full object-contain opacity-95"
          priority
        />
      </div>

      {/* ─── Far Right Waves, Cloud & Coral Illustration ─── */}
      <div className="pointer-events-none absolute right-4 sm:right-6 lg:right-10 xl:right-14 top-6 sm:top-8 hidden select-none md:block md:w-[220px] lg:w-[300px] xl:w-[350px] z-0">
        <Image
          src="/distintionsHome/coral.png"
          alt=""
          width={420}
          height={160}
          unoptimized
          className="h-auto w-full object-contain opacity-95"
          priority
        />
      </div>

      {/* Main Content */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="relative z-10 mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10"
      >
        {/* Section Header */}
        <div className="mx-auto mb-10 sm:mb-14 flex max-w-[760px] flex-col items-center text-center">
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

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4 md:gap-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[240px] sm:h-[260px] lg:h-[280px] w-[calc(50%-8px)] sm:w-[calc(50%-10px)] md:w-[calc(33.333%-14px)] xl:w-[calc(16.666%-17px)] rounded-[24px] bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* ─── Non-Scrollable Centered Flex Grid: Perfectly Centered on Any Count ─── */}
        {!isLoading && destinations && destinations.length > 0 && (
          <motion.div
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-3.5 sm:gap-4 lg:gap-5 mx-auto"
          >
            {destinations.map((destination) => {
              // Dynamic width based on destination count:
              // If fewer than 6, each card expands with an optimal width and remains perfectly centered.
              // If 6, they sit neatly across desktop (w-[calc(16.666%-17px)]).
              const count = destinations.length;
              let widthClass = "w-[calc(50%-8px)] sm:w-[calc(50%-10px)] md:w-[calc(33.333%-14px)] xl:w-[calc(16.666%-17px)]";
              
              if (count === 1) {
                widthClass = "w-full max-w-[360px]";
              } else if (count === 2) {
                widthClass = "w-[calc(50%-8px)] sm:w-[calc(50%-10px)] max-w-[320px]";
              } else if (count === 3) {
                widthClass = "w-[calc(50%-8px)] sm:w-[calc(50%-10px)] md:w-[calc(33.333%-14px)] max-w-[320px]";
              } else if (count === 4) {
                widthClass = "w-[calc(50%-8px)] sm:w-[calc(50%-10px)] md:w-[calc(25%-15px)] max-w-[300px]";
              } else if (count === 5) {
                widthClass = "w-[calc(50%-8px)] sm:w-[calc(50%-10px)] md:w-[calc(33.333%-14px)] lg:w-[calc(20%-16px)] max-w-[280px]";
              }

              return (
                <motion.div
                  key={destination.id}
                  variants={cardVariants}
                  className={`${widthClass} flex shrink-0 justify-center`}
                >
                  <DestinationCard destination={destination} />
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* View All Destinations CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-12 sm:mt-14 flex justify-center"
        >
          <Link
            href="/destinations"
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
