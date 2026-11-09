"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export function GalleryHero() {
  const t = useTranslations("GalleryPage.hero");

  return (
    <section className="relative h-[380px] w-full overflow-hidden sm:h-[460px] lg:h-[520px]">
      <Image
        src="/Gallary/Gallery.png"
        alt={t("imageAlt")}
        fill
        priority
        className="object-cover"
        style={{ objectPosition: "center 52%" }}
        sizes="100vw"
      />
      {/* Directional gradient overlay to guarantee text contrast while showcasing the hero photography */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25 sm:from-black/75 sm:via-black/45 sm:to-transparent" />

      <div className="absolute inset-0 mx-auto flex w-full max-w-[1360px] flex-col justify-center px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-[760px] text-left"
        >
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-4xl lg:text-[50px] font-black leading-[1.15] text-white tracking-tight drop-shadow-sm"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-3.5 text-sm sm:text-base lg:text-lg font-normal leading-relaxed text-slate-200/90 max-w-[620px]"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
