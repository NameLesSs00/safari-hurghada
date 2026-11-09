"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";

import { useDestinationsQuery } from "@/src/features/categories/api/get-destinations";
import { DestinationCard } from "@/src/features/destinations/components/destination-card";
import { DestinationsHero } from "@/src/features/destinations/components/destinations-hero";
import type { AppLocale } from "@/src/i18n/locales";

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const FALLBACK_DESTINATIONS = [
  {
    id: 2,
    name: "Hurghada",
    imageUrl: "https://sunnytour.premiumasp.net/images/destinations/71a9e90e-d2a5-486b-9520-9013c7bba806.webp",
    tripsCount: 0,
    isFeatured: true,
  },
  {
    id: 5,
    name: "Cairo",
    imageUrl: "https://sunnytour.premiumasp.net/images/destinations/f038fe06-62a9-44ec-a73c-f890adce752b.webp",
    tripsCount: 0,
    isFeatured: true,
  },
  {
    id: 6,
    name: "Luxor",
    imageUrl: "https://sunnytour.premiumasp.net/images/destinations/a7fa59fd-78a4-4568-b804-39b8039cc9cb.webp",
    tripsCount: 0,
    isFeatured: true,
  },
  {
    id: 4,
    name: "Aswan",
    imageUrl: "https://sunnytour.premiumasp.net/images/destinations/c74ac07e-7c06-455d-95bf-513738b41ee5.webp",
    tripsCount: 0,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Giza",
    imageUrl: "https://sunnytour.premiumasp.net/images/destinations/760463d9-4275-49e5-af44-fd37f0a94f70.webp",
    tripsCount: 0,
    isFeatured: false,
  },
  {
    id: 7,
    name: "El Gouna",
    imageUrl: "https://sunnytour.premiumasp.net/images/destinations/ab9c8da6-98c5-41c5-90a7-837c13aa2f62.webp",
    tripsCount: 0,
    isFeatured: true,
  },
];

function DestinationCardSkeleton() {
  return (
    <div className="h-[300px] sm:h-[340px] lg:h-[380px] w-full animate-pulse rounded-[26px] bg-slate-200/70 border border-slate-200/80" />
  );
}

export function DestinationsPage() {
  const { data: destinations, isLoading } = useDestinationsQuery(false);
  const locale = useLocale() as AppLocale;
  const t = useTranslations("DestinationsPage");

  const rawDestinations =
    destinations && destinations.length > 0 ? destinations : FALLBACK_DESTINATIONS;

  // Sort Hurghada first, then other featured, then remaining
  const sortedDestinations = [...rawDestinations].sort((a, b) => {
    if (a.id === 2 || /hurghada/i.test(a.name)) return -1;
    if (b.id === 2 || /hurghada/i.test(b.name)) return 1;
    if (a.isFeatured === b.isFeatured) return a.name.localeCompare(b.name);
    return a.isFeatured ? -1 : 1;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Unified Hero Section */}
      <DestinationsHero />

      {/* Main Grid Content */}
      <main className="mx-auto w-full max-w-[1360px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* Centered Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 sm:mb-12 flex items-center justify-center text-xs sm:text-sm font-medium text-slate-500"
        >
          <Link
            href="/"
            className="transition-colors hover:text-[#F36F21]"
          >
            {t("breadcrumb.home")}
          </Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="font-semibold text-[#F36F21]">
            {t("breadcrumb.destinations")}
          </span>
        </nav>

        {/* 3-Column Destinations Grid */}
        <motion.div
          key={isLoading ? "loading" : "loaded"}
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          {isLoading && !destinations
            ? Array.from({ length: 6 }).map((_, i) => (
                <DestinationCardSkeleton key={i} />
              ))
            : sortedDestinations.map((destination) => (
                <motion.div key={destination.id} variants={cardItemVariants}>
                  <DestinationCard
                    destination={destination}
                    variant="page"
                  />
                </motion.div>
              ))}
        </motion.div>
      </main>
    </div>
  );
}
