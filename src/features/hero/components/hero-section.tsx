"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Compass, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/src/shared/components/icons";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const featureBarVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.4 },
  },
};

export function HeroSection() {
  const locale = useLocale();
  const t = useTranslations("Hero");

  return (
    <section
      aria-label={t("ariaLabel")}
      className="relative w-full overflow-visible bg-white"
    >
      {/* ─── Hero Main Visual Block ─── */}
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] w-full overflow-hidden">
        {/* Background Single Hero Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Hero/Hero.png"
            alt="Safari Hurghada"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_right] sm:object-center"
          />
        </div>

        {/* ─── Gradients ─── */}
        {/* 1. Top White Gradient: Seamless blend from header */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 sm:h-32 bg-gradient-to-b from-white via-white/50 to-transparent" />

        {/* 2. Bottom White Gradient: Seamless transition into white background below */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 sm:h-52 bg-gradient-to-t from-white via-white/80 to-transparent" />

        {/* ─── Hero Content (Left Block) ─── */}
        <div className="relative z-20 mx-auto flex h-full w-full max-w-[1340px] flex-col justify-center px-5 pt-12 pb-28 sm:px-8 sm:pt-16 sm:pb-36 lg:px-8 lg:pt-20 lg:pb-40">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative max-w-[560px]"
          >
            {/* Soft, clean circular white halo placed perfectly behind the headline & text */}
            <div
              className="pointer-events-none absolute -left-20 -top-20 sm:-left-28 sm:-top-28 size-[520px] sm:size-[680px] lg:size-[740px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.52) 48%, rgba(255,255,255,0) 72%)",
              }}
            />

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="relative text-[32px] sm:text-5xl lg:text-[62px] font-extrabold tracking-tight text-[#1E232A] leading-[1.18] sm:leading-[1.12]"
            >
              <span>{t("titlePart1")}</span>
              <br />
              <span>{t("titlePart2")} </span>
              <span className="relative inline-block text-[#F36F21]">
                {t("titleHighlight")}
                {/* 3 Sparks fanning outward to the right (beside Hurghada) */}
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

                {/* Curved Underline Arc */}
                <svg
                  className="absolute -bottom-2.5 left-0 w-full text-[#F36F21]"
                  height="12"
                  viewBox="0 0 220 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 8.5C65 2.5 155 2.5 217 8.5"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Description Subtitle */}
            <motion.p
              variants={itemVariants}
              className="relative mt-6 text-sm font-normal leading-relaxed text-[#2D333A] sm:text-base lg:text-[17px] sm:max-w-[490px]"
            >
              {t("description")}
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              variants={itemVariants}
              className="relative mt-7 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 w-full sm:w-auto"
            >
              {/* Primary: Explore Trips */}
              <Link
                href={`/${locale}/trips`}
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#F36F21] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-[#df5d10] hover:shadow-orange-500/35 hover:-translate-y-0.5 active:scale-95"
              >
                <Compass size={19} className="transition-transform group-hover:rotate-45" />
                <span>{t("ctaExplore")}</span>
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Secondary: WhatsApp */}
              <a
                href="https://wa.me/201093943595"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border border-gray-200 bg-white/95 px-6 py-3.5 text-base font-semibold text-[#1E232A] shadow-sm backdrop-blur-xs transition-all hover:bg-white hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
              >
                <WhatsAppIcon className="size-5.5 text-[#25D366]" />
                <span>{t("ctaWhatsapp")}</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ─── Bottom Floating Feature Bar (Straddles the Boundary Between Hero & Next Section) ─── */}
      <div className="relative z-30 mx-auto -mt-14 sm:-mt-16 lg:-mt-20 px-4 sm:px-6 lg:px-8 max-w-[1380px]">
        <motion.div
          variants={featureBarVariants}
          initial="hidden"
          animate="show"
          className="w-full rounded-[24px] sm:rounded-[36px] border border-gray-100 bg-white px-6 py-6 sm:px-10 sm:py-7 lg:px-16 lg:py-8 shadow-[0_16px_50px_rgba(0,0,0,0.08)]"
        >
          <div className="grid grid-cols-1 gap-6 divide-y divide-gray-100 sm:grid-cols-3 sm:gap-6 sm:divide-y-0 sm:divide-x sm:divide-gray-200">
            {/* Pillar 1: Top-rated */}
            <div className="flex items-center gap-4 lg:gap-6 pt-1 sm:pt-0 sm:pl-2 sm:pr-8">
              <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center">
                <Image
                  src="/Hero/star.svg"
                  alt=""
                  width={54}
                  height={54}
                  unoptimized
                  className="h-11 w-11 sm:h-12 sm:w-12 lg:h-[52px] lg:w-[52px] object-contain"
                />
              </div>
              <div>
                <h2 className="text-base sm:text-lg lg:text-[20px] font-bold text-[#1E232A] leading-tight">
                  {t("highlights.rating.title")}
                </h2>
                <p className="mt-1 text-xs sm:text-sm lg:text-[14px] text-[#535764]">
                  {t("highlights.rating.description")}
                </p>
              </div>
            </div>

            {/* Pillar 2: Best local prices */}
            <div className="flex items-center gap-4 lg:gap-6 pt-4 sm:pt-0 sm:px-8">
              <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center">
                <Image
                  src="/Hero/money.svg"
                  alt=""
                  width={52}
                  height={52}
                  unoptimized
                  className="h-10 w-10 sm:h-11 sm:w-11 lg:h-[48px] lg:w-[48px] object-contain"
                />
              </div>
              <div>
                <h2 className="text-base sm:text-lg lg:text-[20px] font-bold text-[#1E232A] leading-tight">
                  {t("highlights.price.title")}
                </h2>
                <p className="mt-1 text-xs sm:text-sm lg:text-[14px] text-[#535764]">
                  {t("highlights.price.description")}
                </p>
              </div>
            </div>

            {/* Pillar 3: Instant support */}
            <div className="flex items-center gap-4 lg:gap-6 pt-4 sm:pt-0 sm:pl-8 sm:pr-2">
              <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center">
                <Image
                  src="/Hero/support.svg"
                  alt=""
                  width={52}
                  height={52}
                  unoptimized
                  className="h-10 w-10 sm:h-11 sm:w-11 lg:h-[48px] lg:w-[48px] object-contain"
                />
              </div>
              <div>
                <h2 className="text-base sm:text-lg lg:text-[20px] font-bold text-[#1E232A] leading-tight">
                  {t("highlights.support.title")}
                </h2>
                <p className="mt-1 text-xs sm:text-sm lg:text-[14px] text-[#535764]">
                  {t("highlights.support.description")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}