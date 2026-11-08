"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";

import { useDestinationsQuery } from "@/src/features/categories/api/get-destinations";
import type { AppLocale } from "@/src/i18n/locales";

// Animation Variants
const heroTextVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const heroImageVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.3 } },
};

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

function DestinationCardSkeleton() {
  return (
    <div className="aspect-[156/120] animate-pulse rounded-[10px] bg-gray-200 sm:aspect-[398/304] sm:rounded-[18px]" />
  );
}

export function DestinationsPage() {
  const { data: destinations, isLoading } = useDestinationsQuery(false);
  const locale = useLocale() as AppLocale;
  const t = useTranslations("DestinationsPage");

  return (
    <>
      {/* Hero Section */}
      <section className="overflow-hidden bg-[var(--color-deep-ocean)]">
        <div className="relative mx-auto flex h-[120px] w-full max-w-[1440px] items-center justify-between px-5 sm:h-[210px] sm:px-10 lg:h-[300px] lg:px-[100px]">
          {/* Title — animates on page load */}
          <motion.div
            variants={heroTextVariants}
            initial="hidden"
            animate="show"
            className="relative z-10 max-w-[230px] sm:max-w-[520px]"
          >
            <motion.p
              variants={heroItemVariants}
              className="font-montez text-[18px] font-normal leading-[150%] text-[var(--color-faq-accent)] sm:text-[30px] lg:text-[36px]"
            >
              {t("hero.subtitle")}
            </motion.p>
            <motion.h1
              variants={heroItemVariants}
              className="mt-1 max-w-[220px] text-[18px] font-bold leading-[130%] text-white sm:max-w-[520px] sm:text-[30px] lg:mt-6 lg:text-[34px]"
            >
              {t("hero.title")}
            </motion.h1>
          </motion.div>

          {/* Word art image — flies in from the right */}
          <motion.div
            variants={heroImageVariants}
            initial="hidden"
            animate="show"
            className="absolute right-2 top-1/2 -translate-y-1/2 sm:right-12 lg:right-[164px]"
          >
            <Image
              src="/Distinations/DisImage.png"
              alt={t("hero.imageAlt")}
              width={474}
              height={252}
              priority
              className="h-auto w-[170px] sm:w-[330px] lg:w-[474px]"
            />
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="overflow-hidden bg-white px-5 pb-8 pt-5 sm:px-8 lg:px-0 lg:pb-[60px] lg:pt-10">
        <div className="mx-auto w-full max-w-[1240px]">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 text-center text-[14px] leading-[160%] text-[#6d7280] sm:mb-10 lg:mb-[62px] lg:text-base"
          >
            <Link href={`/${locale}`} className="transition-colors hover:text-[var(--color-ocean)]">
              {t("breadcrumb.home")}
            </Link>
            <span> &gt; </span>
            <span className="font-medium text-[var(--color-ocean)]">
              {t("breadcrumb.destinations")}
            </span>
          </nav>

          <motion.div
            key={isLoading ? "loading" : "loaded"}
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid min-w-0 grid-cols-2 gap-x-4 gap-y-5 sm:gap-6 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-11"
          >
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <DestinationCardSkeleton key={i} />
                ))
              : destinations?.map((destination) => (
                  <motion.div key={destination.id} variants={cardVariants}>
                    <Link
                      href={`/${locale}/trips?destinationId=${destination.id}`}
                      className="group relative isolate block aspect-[156/120] min-w-0 overflow-hidden rounded-[10px] bg-[#d9e3ea] shadow-sm sm:aspect-[398/304] sm:rounded-[18px]"
                    >
                      <Image
                        src={destination.imageUrl}
                        alt={t("card.destinationAlt", { name: destination.name })}
                        fill
                        sizes="(min-width: 1024px) 398px, 50vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                      {destination.tripsCount > 0 && (
                        <span className="absolute right-2 top-2 rounded-full bg-white px-3 py-1 text-[10px] font-medium leading-none text-[#4ed873] shadow-sm sm:right-3 sm:top-5 sm:px-5 sm:py-2 sm:text-sm">
                          {destination.tripsCount === 1
                            ? t("card.tripsSingular", { count: destination.tripsCount })
                            : t("card.trips", { count: destination.tripsCount })}
                        </span>
                      )}
                      <h2 className="absolute inset-x-2 bottom-3 break-words text-center text-[18px] font-bold leading-[120%] text-white drop-shadow-sm sm:bottom-8 sm:text-[36px] lg:text-[40px]">
                        {destination.name}
                      </h2>
                    </Link>
                  </motion.div>
                ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
