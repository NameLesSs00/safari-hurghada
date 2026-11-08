"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";

// Hero animations
const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const heroImageVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export function ContactHero() {
  const t = useTranslations("ContactPage.hero");

  return (
    <section className="relative overflow-hidden bg-[#003A5A]">
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
          variants={heroContainerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col justify-center text-left lg:justify-start lg:pt-[62px]"
        >
          <motion.p
            variants={heroItemVariants}
            className="font-[family-name:var(--font-montez)] text-[18px] leading-[160%] text-[#69DD84] md:text-[22px] lg:text-[32px]"
          >
            {t("subtitle")}
          </motion.p>
          <motion.h1
            variants={heroItemVariants}
            className="mt-1 font-sans text-[20px] font-semibold leading-[130%] text-white md:text-[28px] lg:text-[40px]"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            variants={heroItemVariants}
            className="mt-2 hidden max-w-[560px] text-sm leading-[170%] text-white/75 lg:block lg:text-base"
          >
            {t("description")}
          </motion.p>
        </motion.div>

        {/* Phone illustration */}
        <motion.div
          variants={heroImageVariants}
          initial="hidden"
          animate="show"
          className="
            relative w-[38%] flex-shrink-0
            md:w-[34%]
            lg:mt-0 lg:h-[340px] lg:w-[420px] lg:self-start
          "
        >
          <Image
            src="/Contact/ContactImage.png"
            alt={t("imageAlt")}
            fill
            className="object-contain object-right-top lg:object-top"
            sizes="(min-width: 1024px) 420px, (min-width: 768px) 34vw, 38vw"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
