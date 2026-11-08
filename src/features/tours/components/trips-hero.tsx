"use client";

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

export function TripsHero() {
  const t = useTranslations("TripsPage.hero");
  
  return (
    <section
      className="relative flex w-full flex-col justify-center overflow-hidden bg-cover bg-center min-h-[200px] md:min-h-[280px] lg:min-h-[340px] py-12 md:py-16"
      style={{
        backgroundImage: `
          linear-gradient(270deg, #C0C0C0 0%, #5A5A5A 100%),
          url('/Trips/HeroTrips.webp')
        `,
        backgroundBlendMode: "multiply",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="z-10 mx-auto flex w-full flex-col items-start px-5 md:px-8 lg:max-w-[1400px] lg:px-10"
      >
        <motion.p
          variants={itemVariants}
          className="font-[family-name:var(--font-montez)] text-[22px] leading-[160%] text-[#69DD84] md:text-[28px] lg:text-[36px]"
        >
          {t("subtitle")}
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="mt-2 font-sans text-[28px] font-semibold leading-[130%] text-white md:text-[40px] lg:text-[56px]"
        >
          {t("title")}
        </motion.h1>
      </motion.div>
    </section>
  );
}
