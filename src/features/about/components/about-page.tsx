"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";

import type { AppLocale } from "@/src/i18n/locales";

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

// Section animations
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

// Card animations
const cardSlideLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardSlideRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Offer cards
const offerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const offerCardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const offerItems = [
  {
    key: "seaTrips",
    image: "/AboutUs/vist.png",
  },
  {
    key: "desertSafari",
    image: "/AboutUs/camel.png",
  },
  {
    key: "historicalTours",
    image: "/AboutUs/temp.png",
  },
] as const;

export function AboutPage() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("AboutPage");

  return (
    <>
      <section className="relative overflow-hidden bg-[#004b61]">
        <div className="relative mx-auto flex h-[135px] w-full max-w-[1440px] items-center justify-between overflow-hidden px-4 sm:h-[210px] sm:px-10 lg:h-[292px] lg:px-[100px]">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="show"
            className="relative z-10 min-w-0 max-w-[220px] sm:max-w-[520px] lg:max-w-[560px]"
          >
            <motion.p
              variants={heroItemVariants}
              className="font-montez text-[14px] font-normal leading-[150%] text-[var(--color-faq-accent)] sm:text-[28px] lg:text-[36px]"
            >
              {t("hero.subtitle")}
            </motion.p>
            <motion.h1
              variants={heroItemVariants}
              className="mt-1 max-w-[210px] text-[17px] font-bold leading-[130%] text-white sm:max-w-[470px] sm:text-[28px] lg:mt-5 lg:max-w-[560px] lg:text-[34px]"
            >
              {t("hero.title")}
            </motion.h1>
          </motion.div>

          <Image
            src="/AboutUs/Vector.png"
            alt=""
            width={993}
            height={481}
            aria-hidden="true"
            unoptimized
            className="pointer-events-none absolute left-[38%] top-[6px] hidden w-[330px] opacity-95 sm:block sm:left-[36%] sm:top-[10px] sm:w-[520px] lg:left-[34%] lg:top-[68px] lg:w-[620px]"
          />

          <motion.img
            src="/AboutUs/HeroAboutUs.png"
            alt={t("hero.imageAlt")}
            variants={heroImageVariants}
            initial="hidden"
            animate="show"
            className="absolute bottom-0 right-0 h-[135px] w-auto sm:right-12 sm:h-[210px] lg:right-[165px] lg:h-[292px]"
          />
        </div>
      </section>

      <section className="bg-white px-4 pb-12 pt-4 sm:px-8 sm:pb-16 lg:px-0 lg:pb-[42px] lg:pt-[58px]">
        <div className="mx-auto w-full max-w-[1240px]">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 text-center text-[12px] leading-[160%] text-[#8d929b] lg:mb-[58px] lg:text-sm"
          >
            <Link href={`/${locale}`} className="transition-colors hover:text-[var(--color-ocean)]">
              {t("breadcrumb.home")}
            </Link>
            <span> &gt; </span>
            <span className="font-medium text-[var(--color-ocean)]">
              {t("breadcrumb.about")}
            </span>
          </nav>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="min-w-0 space-y-4 lg:space-y-[26px]"
          >
            <h2 className="break-words text-[24px] font-bold leading-[130%] text-[#16181e] sm:text-[30px] lg:text-[34px]">
              {t("intro.title")}
            </h2>
            <p className="max-w-[1240px] break-words text-[16px] font-normal leading-[160%] text-[var(--color-muted)] lg:text-[18px]">
              {t("intro.description")}
            </p>
          </motion.div>

          <div className="mt-10 grid items-start gap-9 lg:mt-[30px] lg:grid-cols-[455px_1fr] lg:gap-[74px]">
            <motion.div
              variants={imageVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="flex justify-center lg:justify-start"
            >
              <Image
                src="/AboutUs/ImageAboutus.png"
                alt={t("company.imageAlt")}
                width={520}
                height={520}
                className="h-auto w-[270px] sm:w-[390px] lg:w-[455px]"
              />
            </motion.div>

            <div className="min-w-0 space-y-7 lg:max-w-[705px]">
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-4"
              >
                <h2 className="break-words text-[24px] font-bold leading-[130%] text-[#16181e] sm:text-[30px] lg:text-[34px]">
                  {t("company.title")}
                </h2>
                <p className="break-words text-[16px] font-normal leading-[160%] text-[var(--color-muted)] lg:text-[19px]">
                  {t("company.description.part1")}
                  <br />
                  {t("company.description.part2")}
                </p>
              </motion.div>

              <motion.div
                variants={cardSlideLeft}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="min-w-0 rounded-[14px] bg-[#f5fbff] px-5 py-5 sm:px-6 lg:px-8 lg:py-6"
              >
                <h3 className="break-words text-[22px] font-bold leading-[130%] text-[var(--color-deep-ocean)] sm:text-[28px] lg:text-[34px]">
                  {t("mission.title")}
                </h3>
                <div className="mt-2 h-[5px] w-[94px] bg-[#d9d9d9]" />
                <p className="mt-7 break-words text-[16px] font-normal leading-[160%] text-[var(--color-muted)] sm:text-[19px] lg:text-[25px]">
                  {t("mission.description")}
                </p>
              </motion.div>

              <motion.div
                variants={cardSlideRight}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="min-w-0 rounded-[14px] bg-[#f5fbff] px-5 py-5 sm:px-6 lg:px-8 lg:py-6"
              >
                <h3 className="break-words text-[22px] font-bold leading-[130%] text-[var(--color-deep-ocean)] sm:text-[28px] lg:text-[34px]">
                  {t("vision.title")}
                </h3>
                <div className="mt-2 h-[5px] w-[94px] bg-[#d9d9d9]" />
                <p className="mt-7 break-words text-[16px] font-normal leading-[160%] text-[var(--color-muted)] sm:text-[19px] lg:text-[25px]">
                  {t("vision.description")}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[376px] overflow-hidden bg-white px-4 pt-[34px] sm:min-h-[430px] sm:px-8 sm:pt-[58px] lg:min-h-[470px] lg:px-0 lg:pt-[76px]">
        <Image
          src="/AboutUs/worldAboutus.png"
          alt=""
          width={1920}
          height={470}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-8 h-auto w-[640px] max-w-none -translate-x-1/2 opacity-95 sm:inset-x-0 sm:top-0 sm:h-full sm:w-full sm:translate-x-0 sm:object-cover sm:object-center"
        />
        <div className="relative mx-auto w-full max-w-[1240px]">
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center text-[24px] font-bold leading-[130%] text-[#2b2d31] sm:text-[30px] lg:text-[34px]"
          >
            {t("offers.title")}
          </motion.h2>

          <motion.div
            variants={offerContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-[38px] grid grid-cols-3 gap-2 sm:mt-[62px] sm:gap-8 lg:mt-[78px]"
          >
            {offerItems.map((item) => (
              <motion.article
                key={item.key}
                variants={offerCardVariants}
                className="mx-auto flex min-w-0 max-w-[255px] flex-col items-center text-center"
              >
                <Image
                  src={item.image}
                  alt=""
                  width={125}
                  height={128}
                  aria-hidden="true"
                  unoptimized
                  className="h-auto w-[68px] sm:w-[100px] lg:w-[125px]"
                />
                <h3 className="mt-3 min-h-[34px] break-words text-[13px] font-bold leading-[130%] text-[#2d2f34] sm:min-h-0 sm:text-base lg:text-lg">
                  {t(`offers.items.${item.key}.title`)}
                </h3>
                <p className="mt-2 max-w-[96px] break-words text-[10px] font-normal leading-[135%] text-[#3e424a] sm:mt-3 sm:max-w-[170px] sm:text-sm lg:max-w-[210px] lg:text-base lg:leading-[130%]">
                  {t(`offers.items.${item.key}.description`)}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
