"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function GalleryHero() {
  const t = useTranslations("GalleryPage.hero");
  
  return (
    <section className="relative overflow-hidden bg-[#003A5A]">
      {/*
        Mobile:  h-[190px], text vertically centered, image fills full height on right
        Tablet:  h-[240px]
        Desktop: h-[335px], text top pt-[62px], image mt-[48px] h-[326px] w-[610px]
      */}
      <div
        className="
          relative mx-auto flex w-full items-stretch
          h-[190px] px-4
          md:h-[240px] md:px-8
          lg:h-[335px] lg:max-w-[1400px] lg:px-10
        "
      >
        {/* Text — vertically centered on mobile, top-anchored on desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="
            flex flex-1 flex-col justify-center text-left
            lg:justify-start lg:pt-[62px]
          "
        >
          <motion.p
            variants={itemVariants}
            className="font-[family-name:var(--font-montez)] text-[18px] leading-[160%] text-[#69DD84] md:text-[22px] lg:text-[32px]"
          >
            {t("subtitle")}
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="mt-1 font-sans text-[20px] font-semibold leading-[130%] text-white md:text-[28px] lg:text-[40px]"
          >
            {t("title")}
          </motion.h1>
        </motion.div>

        {/* Camera collage
            Mobile/tablet: no explicit height → stretches to fill section via items-stretch
            Desktop:       fixed 326px tall, pushed down 48px, 610px wide
        */}
        <div
          className="
            relative w-[52%] flex-shrink-0
            md:w-[46%]
            lg:mt-[48px] lg:h-[326px] lg:w-[610px] lg:self-start
          "
        >
          <Image
            src="/Gallary/heroGallary.png"
            alt={t("imageAlt")}
            fill
            className="object-contain lg:object-left-top"
            sizes="(min-width: 1024px) 610px, (min-width: 768px) 46vw, 52vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
