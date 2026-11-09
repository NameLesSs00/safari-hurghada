"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Compass, Trash2, ArrowRight } from "lucide-react";

import { useSavedTripsStore } from "@/src/store/use-saved-trips-store";
import { TourCard } from "@/src/features/tours/components/tour-card";
import type { AppLocale } from "@/src/i18n/locales";

const subscribeToSavedTripsHydration = (onStoreChange: () => void) =>
  useSavedTripsStore.persist.onFinishHydration(onStoreChange);

const getSavedTripsHydrationSnapshot = () =>
  useSavedTripsStore.persist.hasHydrated();

const getServerSavedTripsHydrationSnapshot = () => false;

function SavedTripsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col h-[420px] rounded-[24px] bg-white border border-gray-100 p-5 shadow-xs animate-pulse"
        >
          <div className="h-[230px] w-full rounded-2xl bg-gray-200" />
          <div className="mt-5 h-5 w-3/4 rounded-md bg-gray-200" />
          <div className="mt-3 h-4 w-1/2 rounded-md bg-gray-200" />
          <div className="mt-auto h-10 w-full rounded-full bg-gray-100" />
        </div>
      ))}
    </div>
  );
}

export function SavedTripsPage() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("SavedTripsPage");
  const { savedTrips, clearSavedTrips } = useSavedTripsStore();

  const isHydrated = useSyncExternalStore(
    subscribeToSavedTripsHydration,
    getSavedTripsHydrationSnapshot,
    getServerSavedTripsHydrationSnapshot
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const ready = isHydrated && mounted;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* ─── Hero Header Section ─── */}
      <section
        style={{ backgroundColor: "#F9FAF4" }}
        className="relative pt-8 pb-10 sm:pt-10 sm:pb-14 border-b border-gray-100/90 overflow-hidden"
      >
        <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center justify-center text-xs sm:text-sm font-medium text-slate-500"
          >
            <Link
              href="/"
              className="transition-colors hover:text-[#F36F21]"
            >
              {t("breadcrumb.home")}
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="font-semibold text-[#F36F21]">
              {t("breadcrumb.savedTrips")}
            </span>
          </nav>

          <div className="mx-auto max-w-[780px] text-center">
            {/* Eyebrow Tag */}
            <p className="text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#F36F21] mb-2.5">
              {t("hero.eyebrow")}
            </p>

            {/* Headline with 3-Spark Orange Ray */}
            <h1 className="relative inline-block text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight text-[#1E232A] leading-tight">
              <span className="relative inline-block">
                {t("hero.title")}
                {/* 3 Outward-Fanning Spark Rays */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="absolute top-0 sm:top-0.5 -right-6 sm:-right-8 w-5 sm:w-6 h-5 sm:h-6 text-[#F36F21] stroke-current pointer-events-none"
                  fill="none"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                >
                  <line x1="3" y1="12" x2="9" y2="2" />
                  <line x1="6" y1="16" x2="18" y2="10" />
                  <line x1="7" y1="21" x2="19" y2="20" />
                </svg>
              </span>
            </h1>

            <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-[#64748B] max-w-[620px] mx-auto">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Main Content Section ─── */}
      <main className="mx-auto w-full max-w-[1360px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {!ready ? (
          <SavedTripsSkeleton />
        ) : savedTrips.length === 0 ? (
          /* Empty Wishlist State */
          <div className="mx-auto max-w-xl text-center rounded-3xl border border-gray-200/80 bg-white p-8 sm:p-14 shadow-xs">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-[#F36F21]">
              <Heart size={32} className="stroke-[2.2]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1E232A]">
              {t("empty.title")}
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#64748B]">
              {t("empty.description")}
            </p>
            <div className="mt-8">
              <Link
                href="/trips"
                className="inline-flex items-center gap-2 rounded-full bg-[#F36F21] px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-[#df5d10] hover:shadow-lg active:scale-95"
              >
                <Compass size={17} />
                <span>{t("empty.button")}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ) : (
          /* Populated State with Action Bar & Cards Grid */
          <div>
            {/* Toolbar */}
            <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-[#F36F21]">
                  <Heart size={16} className="fill-[#F36F21]" />
                </div>
                <span className="text-base sm:text-lg font-bold text-[#1E232A]">
                  {t("actions.savedCount", { count: savedTrips.length })}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/trips"
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  {t("actions.exploreMore")}
                </Link>

                <button
                  type="button"
                  onClick={clearSavedTrips}
                  className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-red-600 shadow-2xs hover:bg-red-50 hover:border-red-300 transition-colors cursor-pointer"
                >
                  <Trash2 size={14} />
                  <span>{t("actions.clearAll")}</span>
                </button>
              </div>
            </div>

            {/* Saved Trips Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <AnimatePresence>
                {savedTrips.map((trip) => (
                  <motion.div
                    key={trip.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3 }}
                  >
                    <TourCard trip={trip} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

