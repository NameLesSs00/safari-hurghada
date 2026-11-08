"use client";

import Image from "next/image";
import { Trash2, MapPin, CalendarDays, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import type { CartItem } from "@/src/store/use-cart-store";
import { formatPrice } from "@/src/features/tours/utils/format-price";
import type { AppLocale } from "@/src/i18n/locales";

interface CartItemCardProps {
  item: CartItem;
  onRemove: (id: string) => void;
}

const dateLocaleByLocale: Record<AppLocale, string> = {
  en: "en-GB",
  fr: "fr-FR",
  de: "de-DE",
  pl: "pl-PL",
};

export function CartItemCard({ item, onRemove }: CartItemCardProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("CartPage.item");
  const primaryImage =
    item.trip.images.find((img) => img.isPrimary) ?? item.trip.images[0];
  
  const totalTravellers = item.adultCount + item.childCount;
  
  // Format date nicely
  const [year, month, day] = item.date.split("-").map(Number);
  const localDate = new Date(year, month - 1, day);
  const formattedDate = localDate.toLocaleDateString(dateLocaleByLocale[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const adultSubtotal = item.adultCount * item.trip.adultPrice;
  const childSubtotal = item.childCount * item.trip.childPrice;
  const total = adultSubtotal + childSubtotal;

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] sm:flex-row sm:gap-6 sm:p-5">
      {/* Image */}
      {primaryImage && (
        <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-2xl sm:h-40 sm:w-48 lg:w-56">
          <Image
            src={primaryImage.imageUrl}
            alt={item.trip.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 224px"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-[#111827]">{item.trip.name}</h3>
            {/* Tag/Type (Optional if we don't have it in Trip model directly, just using durationTypeName if it acts as a tag, or omitting) */}
            <span className="inline-flex w-fit items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
              {item.trip.durationTypeName}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label={t("removeAria", { name: item.trip.name })}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
          >
            <Trash2 size={14} />
            <span className="hidden sm:inline">{t("remove")}</span>
          </button>
        </div>

        {/* Info Icons */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#6B7280]">
          {item.trip.destination && (
            <div className="flex items-center gap-1.5">
              <MapPin size={16} />
              <span>{item.trip.destination}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <CalendarDays size={16} />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={16} />
            <span>{t("travelers", { count: totalTravellers })}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-2 flex flex-col justify-end sm:items-end">
          <span className="text-sm text-[#6B7280]">
            {item.trip.adultPrice === 0 ? "Contact us for price" : `${formatPrice(item.trip.adultPrice, item.trip.currencyName)} ${t("perPerson")}`}
          </span>
          <span className="text-2xl font-bold text-[#003A5A]">
            {(item.trip.adultPrice === 0 && item.adultCount > 0) || (item.trip.childPrice === 0 && item.childCount > 0)
              ? total > 0
                ? `${formatPrice(total, item.trip.currencyName)} + Contact us for price`
                : "Contact us for price"
              : formatPrice(total, item.trip.currencyName)}
          </span>
        </div>
      </div>
    </div>
  );
}
