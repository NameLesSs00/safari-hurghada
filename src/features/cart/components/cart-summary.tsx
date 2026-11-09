"use client";

import Image from "next/image";
import Link from "next/link";
import { AppImage } from "@/src/shared/components/app-image";
import { X, CalendarDays, ArrowRight, ShieldCheck, Zap, Lock, ShoppingBag } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { useCartStore } from "@/src/store/use-cart-store";
import { formatPrice } from "@/src/features/tours/utils/format-price";
import type { AppLocale } from "@/src/i18n/locales";

// Summary mini cards
const summaryCardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const summaryCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

const dateLocaleByLocale: Record<AppLocale, string> = {
  en: "en-GB",
};

export function CartSummary() {
  const { items, removeItem, getCartTotal } = useCartStore();
  const locale = useLocale() as AppLocale;
  const t = useTranslations("CartPage.summary");
  const total = getCartTotal();

  if (items.length === 0) {
    return (
      <div className="flex w-full flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-6 lg:w-[380px] lg:p-7 shadow-xs">
        <h2 className="text-lg font-bold text-[#1E232A]">{t("title")}</h2>
        <p className="text-sm text-slate-500">{t("empty")}</p>
      </div>
    );
  }

  const currencyName = items[0]?.trip.currencyName || "EUR";

  return (
    <div className="flex w-full flex-col gap-6 rounded-3xl border border-slate-100 bg-white p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] lg:w-[420px]">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-[#F36F21]">
            <ShoppingBag size={17} />
          </div>
          <h2 className="text-lg font-extrabold text-[#1E232A]">{t("title")}</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
          {items.length} {items.length === 1 ? "tour" : "tours"}
        </span>
      </div>

      {/* Mini tour cards in summary */}
      <motion.div
        variants={summaryCardContainerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-3"
      >
        {items.map((item) => {
          const primaryImage =
            item.trip.images.find((img) => img.isPrimary) ?? item.trip.images[0];
          
          const formattedDate = new Date(item.date).toLocaleDateString(
            dateLocaleByLocale[locale] || "en-GB",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            },
          );

          return (
            <motion.div
              key={item.id}
              variants={summaryCardVariants}
              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 transition-colors hover:bg-slate-50"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-200/60 bg-slate-100">
                  <AppImage
                    src={primaryImage?.imageUrl}
                    alt={item.trip.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="truncate text-xs sm:text-sm font-bold text-[#1E232A]">
                    {item.trip.name}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                    <CalendarDays size={12} className="text-[#F36F21]" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label={t("removeAria", { name: item.trip.name })}
                className="shrink-0 p-1 text-slate-400 transition-colors hover:text-rose-600 cursor-pointer"
              >
                <X size={15} />
              </button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Pricing Breakdown */}
      <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-100 text-xs sm:text-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {t("package")}
        </span>
        
        {items.map((item) => (
          <div key={`breakdown-${item.id}`} className="flex flex-col gap-1 text-slate-600">
            {item.adultCount > 0 && (
              <div className="flex items-center justify-between">
                <span>
                  {t("adult")}: {item.adultCount} ×{" "}
                  {item.trip.adultPrice === 0 ? "Custom" : formatPrice(item.trip.adultPrice, item.trip.currencyName)}
                </span>
                <span className="font-semibold text-[#1E232A]">
                  {item.trip.adultPrice === 0 ? "Custom" : formatPrice(item.adultCount * item.trip.adultPrice, item.trip.currencyName)}
                </span>
              </div>
            )}
            {item.childCount > 0 && item.trip.childPrice > 0 && (
              <div className="flex items-center justify-between">
                <span>
                  {t("child")}: {item.childCount} ×{" "}
                  {formatPrice(item.trip.childPrice, item.trip.currencyName)}
                </span>
                <span className="font-semibold text-[#1E232A]">
                  {formatPrice(item.childCount * item.trip.childPrice, item.trip.currencyName)}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="h-px w-full bg-slate-100" />

      {/* Grand Total */}
      <div className="flex items-baseline justify-between">
        <div className="flex flex-col">
          <span className="text-base font-bold text-[#1E232A]">{t("total")}</span>
          <span className="text-[11px] text-slate-400">All local taxes included</span>
        </div>
        <span className="text-2xl font-black text-emerald-600">
          {items.some(item => (item.trip.adultPrice === 0 && item.adultCount > 0) || (item.trip.childPrice === 0 && item.childCount > 0))
            ? total > 0 
              ? `${formatPrice(total, currencyName)} + Custom`
              : "Contact us"
            : formatPrice(total, currencyName)}
        </span>
      </div>
      
      {/* Checkout Actions */}
      <div className="flex flex-col gap-3 pt-2">
        <Link
          href="/checkout"
          className="w-full rounded-2xl bg-[#F36F21] py-4 text-center text-sm sm:text-base font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-[#d95c12] active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <span>{t("checkout")}</span>
          <ArrowRight size={17} />
        </Link>

        <Link
          href="/trips"
          className="text-center text-xs font-semibold text-slate-500 hover:text-[#F36F21] transition-colors"
        >
          ← Continue exploring tours
        </Link>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-col gap-2 rounded-2xl bg-slate-50 p-4 text-xs text-slate-600 border border-slate-100">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-[#F36F21] shrink-0" />
          <span>Instant reservation confirmation</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
          <span>Free cancellation up to 24h prior</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock size={14} className="text-[#00A3C4] shrink-0" />
          <span>Safe &amp; encrypted checkout</span>
        </div>
      </div>
    </div>
  );
}
