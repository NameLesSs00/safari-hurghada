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

export function BlogsHero() {
  const t = useTranslations("BlogsPage.hero");
  
  return (
    <section className="relative h-[240px] w-full overflow-hidden sm:h-[320px] lg:h-[400px]">
      <Image
        src="/Blogs/blogsHero.webp"
        alt={t("imageAlt")}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 mx-auto flex w-full max-w-[1440px] flex-col justify-center px-5 sm:px-10 lg:px-[100px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-[800px] text-left"
        >
          <motion.p
            variants={itemVariants}
            className="font-montez text-[24px] text-[#22c55e] sm:text-[32px] lg:text-[40px]"
          >
            {t("subtitle")}
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="mt-2 text-[28px] font-bold leading-[1.2] text-white sm:text-[40px] lg:text-[56px]"
          >
            {t("title")}
          </motion.h1>
        </motion.div>
      </div>
    </section>
  );
}
