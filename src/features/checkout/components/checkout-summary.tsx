"use client";

import { CalendarDays, Users, ShieldCheck, Zap, Lock, ShoppingBag } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { formatPrice } from "@/src/features/tours/utils/format-price";
import { useCartStore } from "@/src/store/use-cart-store";
import Image from "next/image";
import { AppImage } from "@/src/shared/components/app-image";
import type { AppLocale } from "@/src/i18n/locales";

interface CheckoutSummaryProps {
  discountEuro: number;
}

const dateLocaleByLocale: Record<AppLocale, string> = {
  en: "en-GB",
};

export function CheckoutSummary({
  discountEuro,
}: CheckoutSummaryProps) {
  const { items, getCartTotal } = useCartStore();
  const locale = useLocale() as AppLocale;
  const t = useTranslations("CheckoutPage.summary");

  if (items.length === 0) {
    return (
      <div className="flex w-full flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-6 lg:w-[380px] lg:p-7 shadow-xs">
        <p className="text-sm text-slate-500">{t("empty")}</p>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const finalTotal = Math.max(0, subtotal - discountEuro);
  const currencyName = items[0]?.trip.currencyName || "EUR";

  return (
    <div className="flex w-full flex-col gap-6 rounded-3xl border border-slate-100 bg-white p-6 sm:p-7 shadow-[0px_8px_30px_rgba(0,0,0,0.06)] lg:w-[400px] xl:w-[420px]">
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

      {/* Tour Items Preview */}
      <div className="flex flex-col gap-3.5">
        {items.map((item) => {
          const primaryImage =
            item.trip.images.find((img) => img.isPrimary) ?? item.trip.images[0];
          
          const [year, month, day] = item.date.split("-").map(Number);
          const localDate = new Date(year, month - 1, day);
          const formattedDate = localDate.toLocaleDateString(
            dateLocaleByLocale[locale] || "en-GB",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            },
          );

          const totalTravellers = item.adultCount + item.childCount;

          return (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-200/60 bg-slate-100">
                <AppImage
                  src={primaryImage?.imageUrl}
                  alt={item.trip.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <h3 className="font-bold text-xs sm:text-sm text-[#1E232A] line-clamp-1">
                  {item.trip.name}
                </h3>
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={12} className="text-[#F36F21]" />
                    <span>{formattedDate}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Users size={12} className="text-[#00A3C4]" />
                    <span>{totalTravellers} {totalTravellers === 1 ? "guest" : "guests"}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Item Price Calculation */}
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

      {/* Subtotal, Discount & Grand Total */}
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between text-slate-600">
          <span>{t("subtotal")}</span>
          <span className="font-bold text-[#1E232A]">
            {items.some(item => (item.trip.adultPrice === 0 && item.adultCount > 0) || (item.trip.childPrice === 0 && item.childCount > 0))
              ? subtotal > 0
                ? `${formatPrice(subtotal, currencyName)} + Custom`
                : "Contact us"
              : formatPrice(subtotal, currencyName)}
          </span>
        </div>

        {discountEuro > 0 && (
          <div className="flex items-center justify-between font-semibold text-rose-500">
            <span>{t("discount")}</span>
            <span>- {formatPrice(discountEuro, currencyName)}</span>
          </div>
        )}

        <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-base font-extrabold text-[#1E232A]">{t("total")}</span>
            <span className="text-[11px] text-slate-400">All local fees included</span>
          </div>
          <span className="text-2xl font-black text-emerald-600">
            {items.some(item => (item.trip.adultPrice === 0 && item.adultCount > 0) || (item.trip.childPrice === 0 && item.childCount > 0))
              ? finalTotal > 0
                ? `${formatPrice(finalTotal, currencyName)} + Custom`
                : "Contact us"
              : formatPrice(finalTotal, currencyName)}
          </span>
        </div>
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
          <span>Pay later upon hotel pickup</span>
        </div>
      </div>
    </div>
  );
}
