"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { whyUsFeatures } from "@/src/features/why-us/data/why-us-features";
import { WhyUsFeature } from "@/src/features/why-us/components/why-us-feature";

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

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function WhyUsSection() {
  const t = useTranslations("WhyUs");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF9F1] via-[#FDF3E3] to-[#FFF9F1] py-16 sm:py-20 lg:py-24">
      {/* ─── Far Left Camel & Mountain Illustration ─── */}
      <div className="pointer-events-none absolute left-4 sm:left-6 lg:left-10 xl:left-14 top-6 sm:top-8 hidden select-none md:block md:w-[240px] lg:w-[320px] xl:w-[380px] z-0">
        <Image
          src="/whyUs/camel.png"
          alt=""
          width={450}
          height={200}
          unoptimized
          className="h-auto w-full object-contain opacity-95"
          priority
        />
      </div>

      {/* ─── Far Right Palm & Dunes Illustration ─── */}
      <div className="pointer-events-none absolute right-4 sm:right-6 lg:right-10 xl:right-14 top-6 sm:top-8 hidden select-none md:block md:w-[220px] lg:w-[300px] xl:w-[350px] z-0">
        <Image
          src="/whyUs/yellow.png"
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
        className="relative z-10 mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-10"
      >
        {/* Section Header */}
        <div className="mx-auto mb-12 sm:mb-16 flex max-w-[780px] flex-col items-center text-center">
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
            className="mt-3 text-sm sm:text-base text-[#64748B] max-w-[560px]"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* ─── 4 Feature Columns: 2x2 on mobile, 4-in-a-row on desktop with subtle dividers ─── */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 sm:gap-y-12 lg:gap-y-0 max-w-[1240px] mx-auto items-start"
        >
          {whyUsFeatures.map((feature, idx) => (
            <motion.div
              key={feature.id}
              variants={columnVariants}
              className="flex justify-center"
            >
              <WhyUsFeature
                feature={feature}
                title={t(feature.titleKey)}
                description={t(feature.descriptionKey)}
                hasLeftDivider={idx > 0}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

