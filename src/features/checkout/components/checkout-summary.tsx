"use client";

import { CalendarDays } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { formatPrice } from "@/src/features/tours/utils/format-price";
import { useCartStore } from "@/src/store/use-cart-store";
import Image from "next/image";
import type { AppLocale } from "@/src/i18n/locales";

interface CheckoutSummaryProps {
  discountEuro: number;
}

const dateLocaleByLocale: Record<AppLocale, string> = {
  en: "en-GB",
  fr: "fr-FR",
  de: "de-DE",
  pl: "pl-PL",
};

export function CheckoutSummary({
  discountEuro,
}: CheckoutSummaryProps) {
  const { items, getCartTotal } = useCartStore();
  const locale = useLocale() as AppLocale;
  const t = useTranslations("CheckoutPage.summary");

  if (items.length === 0) {
    return (
      <div className="flex w-full flex-col gap-6 rounded-3xl bg-[#F8FBFC] p-6 lg:w-[380px] lg:p-8">
        <p className="text-sm text-gray-500">{t("empty")}</p>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const finalTotal = Math.max(0, subtotal - discountEuro);
  const currencyName = items[0]?.trip.currencyName || "EUR";

  return (
    <div className="flex w-full flex-col gap-6 rounded-3xl bg-[#F8FBFC] p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] lg:w-[380px] lg:p-8">
      <h2 className="text-xl font-medium text-[#111827]">{t("title")}</h2>

      <div className="flex flex-col gap-6">
        {items.map((item) => {
          const primaryImage =
            item.trip.images.find((img) => img.isPrimary) ?? item.trip.images[0];
          
          const [year, month, day] = item.date.split("-").map(Number);
          const localDate = new Date(year, month - 1, day);
          const formattedDate = localDate.toLocaleDateString(
            dateLocaleByLocale[locale],
            {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            },
          );

          const totalTravellers = item.adultCount + item.childCount;

          return (
            <div key={item.id} className="flex flex-col gap-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center gap-4">
                {primaryImage && (
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={primaryImage.imageUrl}
                      alt={item.trip.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <h3 className="font-medium text-[#003A5A] line-clamp-1">{item.trip.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-[#374151]">
                    <CalendarDays size={16} className="text-[#003A5A]" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-[#111827]">
                <span>{t("travelerCount")}</span>
                <span className="font-medium">{totalTravellers}</span>
              </div>
            </div>
          );
        })}
      </div>

      <h4 className="text-lg font-medium text-[#111827]">{t("package")}</h4>

      {/* Breakdowns */}
      <div className="flex flex-col gap-4 text-sm text-[#374151]">
        <p>{t("travelers")}</p>
        
        {items.map((item) => (
          <div key={`breakdown-${item.id}`} className="flex flex-col gap-1">
            {item.adultCount > 0 && (
              <div className="flex items-center justify-between">
                <span>
                  {t("adult")}: {item.adultCount} x{" "}
                  {item.trip.adultPrice === 0 ? "Contact us for price" : formatPrice(item.trip.adultPrice, item.trip.currencyName)}
                </span>
                <span className="text-base font-medium text-[#111827]">
                  {item.trip.adultPrice === 0 ? "Contact us for price" : formatPrice(item.adultCount * item.trip.adultPrice, item.trip.currencyName)}
                </span>
              </div>
            )}

            {item.childCount > 0 && item.trip.childPrice > 0 && (
              <div className="flex items-center justify-between">
                <span>
                  {t("child")}: {item.childCount} x{" "}
                  {item.trip.childPrice === 0 ? "Contact us for price" : formatPrice(item.trip.childPrice, item.trip.currencyName)}
                </span>
                <span className="text-base font-medium text-[#111827]">
                  {item.trip.childPrice === 0 ? "Contact us for price" : formatPrice(item.childCount * item.trip.childPrice, item.trip.currencyName)}
                </span>
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center justify-between pt-2">
          <span className="text-base font-medium text-[#111827]">
            {t("subtotal")}
          </span>
          <span className="text-base font-medium text-[#111827]">
            {items.some(item => (item.trip.adultPrice === 0 && item.adultCount > 0) || (item.trip.childPrice === 0 && item.childCount > 0))
              ? subtotal > 0
                ? `${formatPrice(subtotal, currencyName)} + Contact us for price`
                : "Contact us for price"
              : formatPrice(subtotal, currencyName)}
          </span>
        </div>

        {discountEuro > 0 && (
          <div className="flex items-center justify-between text-[#EF4444]">
            <span className="text-base font-medium">{t("discount")}</span>
            <span className="text-base font-medium">
              - {formatPrice(discountEuro, currencyName)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-semibold text-[#003A5A]">
            {t("total")}
          </span>
          <span className="text-lg font-bold text-[#10B981]">
            {items.some(item => (item.trip.adultPrice === 0 && item.adultCount > 0) || (item.trip.childPrice === 0 && item.childCount > 0))
              ? finalTotal > 0
                ? `${formatPrice(finalTotal, currencyName)} + Contact us for price`
                : "Contact us for price"
              : formatPrice(finalTotal, currencyName)}
          </span>
        </div>
      </div>
    </div>
  );
}
