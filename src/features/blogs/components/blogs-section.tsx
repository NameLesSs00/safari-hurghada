"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useGetBlogsQuery } from "@/src/features/blogs/api/get-blogs";
import { HomeBlogCard } from "./home-blog-card";

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
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const fallbackDates = ["Jan 15, 2025", "Jan 8, 2025", "Jan 2, 2025"];

export function BlogsSection() {
  const { data: blogs, isLoading, error } = useGetBlogsQuery({
    pageSize: 3,
    pageNumber: 1,
  });
  const locale = useLocale();
  const t = useTranslations("Blogs");
  const displayedBlogs = blogs?.slice(0, 3) || [];

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* ─── Far Left Directional Signboard Illustration ─── */}
      <div className="pointer-events-none absolute left-4 sm:left-6 lg:left-10 xl:left-14 top-6 sm:top-8 hidden select-none md:block md:w-[200px] lg:w-[260px] xl:w-[300px] z-0">
        <Image
          src="/BlogsHome/sign.svg"
          alt=""
          width={300}
          height={180}
          unoptimized
          className="h-auto w-full object-contain opacity-95"
          priority
        />
      </div>

      {/* ─── Far Right Palm & Dunes Illustration ─── */}
      <div className="pointer-events-none absolute right-4 sm:right-6 lg:right-10 xl:right-14 top-6 sm:top-8 hidden select-none md:block md:w-[220px] lg:w-[300px] xl:w-[350px] z-0">
        <Image
          src="/BlogsHome/yellow.png"
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
        className="relative z-10 mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8"
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

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-wrap justify-center gap-6 lg:gap-7">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[380px] w-full sm:w-[calc(50%-14px)] lg:w-[calc(33.333%-19px)] max-w-[420px] rounded-[24px] bg-gray-50 border border-gray-100 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && (error || displayedBlogs.length === 0) && (
          <div className="flex flex-col items-center justify-center py-14 text-center text-[#64748B]">
            <p className="text-base">{t("empty")}</p>
          </div>
        )}

        {/* ─── Centered Responsive Flex Grid: Perfect Centering for 1, 2, or 3 Blogs ─── */}
        {!isLoading && displayedBlogs.length > 0 && (
          <motion.div
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-stretch gap-6 lg:gap-7 mx-auto"
          >
            {displayedBlogs.map((blog, idx) => {
              // Dynamic width based on total displayed blogs count
              const count = displayedBlogs.length;
              let widthClass = "w-full md:w-[calc(50%-14px)] lg:w-[calc(33.333%-19px)] max-w-[420px]";

              if (count === 1) {
                widthClass = "w-full max-w-[440px]";
              } else if (count === 2) {
                widthClass = "w-full sm:w-[calc(50%-14px)] max-w-[440px]";
              }

              return (
                <motion.div
                  key={blog.id}
                  variants={cardVariants}
                  className={`${widthClass} flex shrink-0`}
                >
                  <HomeBlogCard
                    blog={blog}
                    fallbackDate={fallbackDates[idx % fallbackDates.length]}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* View All Blogs CTA Button */}
        <motion.div
          variants={itemVariants}
          className="mt-12 sm:mt-14 flex justify-center"
        >
          <Link
            href="/blogs"
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
