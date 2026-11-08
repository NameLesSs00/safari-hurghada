"use client";

import Image from "next/image";
import Link from "next/link";
import { X, CalendarDays } from "lucide-react";
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
      delayChildren: 0.2,
    },
  },
};

const summaryCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

// Summary sections
const packageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.4 } },
};

const dividerVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.4, ease: "easeOut", delay: 0.6 } },
};

const totalVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.7 } },
};

const checkoutButtonVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut", delay: 0.85 } },
};

const dateLocaleByLocale: Record<AppLocale, string> = {
  en: "en-GB",
  fr: "fr-FR",
  de: "de-DE",
  pl: "pl-PL",
};

export function CartSummary() {
  const { items, removeItem, getCartTotal } = useCartStore();
  const locale = useLocale() as AppLocale;
  const t = useTranslations("CartPage.summary");
  const total = getCartTotal();

  if (items.length === 0) {
    return (
      <div className="flex w-full flex-col gap-6 rounded-3xl bg-[#F9FAFB] p-6 lg:w-[380px] lg:p-8">
        <h2 className="text-xl font-medium text-[#111827]">{t("title")}</h2>
        <p className="text-sm text-gray-500">{t("empty")}</p>
      </div>
    );
  }

  // Assuming all items share the same currency for simplicity in this display
  const currencyName = items[0]?.trip.currencyName || "EUR";

  return (
    <div className="flex w-full flex-col gap-6 rounded-3xl bg-[#F8FBFC] p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] lg:w-[420px] lg:p-8">
      <h2 className="text-xl font-medium text-[#111827]">{t("title")}</h2>

      <motion.div
        variants={summaryCardContainerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4"
      >
        {items.map((item) => {
          const primaryImage =
            item.trip.images.find((img) => img.isPrimary) ?? item.trip.images[0];
          
          const formattedDate = new Date(item.date).toLocaleDateString(
            dateLocaleByLocale[locale],
            {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            },
          );

          return (
            <motion.div
              key={item.id}
              variants={summaryCardVariants}
              className="flex items-start justify-between gap-3 rounded-2xl bg-white p-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                {primaryImage && (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={primaryImage.imageUrl}
                      alt={item.trip.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <span className="line-clamp-1 text-sm font-medium text-[#111827]">
                    {item.trip.name}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                    <CalendarDays size={13} />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label={t("removeAria", { name: item.trip.name })}
                className="mt-1 shrink-0 text-gray-400 transition-colors hover:text-red-500"
              >
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        variants={packageVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-3 pt-2"
      >
        <h4 className="text-sm font-semibold text-[#111827]">{t("package")}</h4>
        
        {items.map((item) => (
          <div key={`breakdown-${item.id}`} className="flex flex-col gap-1">
            {item.adultCount > 0 && (
              <div className="flex items-center justify-between text-sm text-[#374151]">
                <span>
                  {t("adult")}: {item.adultCount} x{" "}
                  {item.trip.adultPrice === 0 ? "Contact us for price" : formatPrice(item.trip.adultPrice, item.trip.currencyName)}
                </span>
                <span className="font-medium text-[#003A5A]">
                  {item.trip.adultPrice === 0 ? "Contact us for price" : formatPrice(item.adultCount * item.trip.adultPrice, item.trip.currencyName)}
                </span>
              </div>
            )}
            {item.childCount > 0 && item.trip.childPrice > 0 && (
              <div className="flex items-center justify-between text-sm text-[#374151]">
                <span>
                  {t("child")}: {item.childCount} x{" "}
                  {item.trip.childPrice === 0 ? "Contact us for price" : formatPrice(item.trip.childPrice, item.trip.currencyName)}
                </span>
                <span className="font-medium text-[#003A5A]">
                  {item.trip.childPrice === 0 ? "Contact us for price" : formatPrice(item.childCount * item.trip.childPrice, item.trip.currencyName)}
                </span>
              </div>
            )}
          </div>
        ))}
      </motion.div>

      <motion.div
        variants={dividerVariants}
        initial="hidden"
        animate="show"
        className="h-px w-full bg-gray-200"
        style={{ originX: 0 }}
      />

      <motion.div
        variants={totalVariants}
        initial="hidden"
        animate="show"
        className="flex items-center justify-between"
      >
        <span className="text-lg font-bold text-[#111827]">{t("total")}</span>
        <span className="text-xl font-bold text-[#10B981]">
          {items.some(item => (item.trip.adultPrice === 0 && item.adultCount > 0) || (item.trip.childPrice === 0 && item.childCount > 0))
            ? total > 0 
              ? `${formatPrice(total, currencyName)} + Contact us for price`
              : "Contact us for price"
            : formatPrice(total, currencyName)}
        </span>
      </motion.div>
      
      <motion.div
        variants={checkoutButtonVariants}
        initial="hidden"
        animate="show"
      >
        <Link
          href={`/${locale}/checkout`}
          className="mt-2 block w-full rounded-full border border-[#003A5A] py-3.5 text-center font-semibold text-[#003A5A] transition-colors hover:bg-[#003A5A] hover:text-white"
        >
          {t("checkout")}
        </Link>
      </motion.div>
    </div>
  );
}
