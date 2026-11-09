"use client";

import Image from "next/image";
import Link from "next/link";
import { AppImage } from "@/src/shared/components/app-image";
import { Trash2, MapPin, CalendarDays, Users, Clock } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import type { CartItem } from "@/src/store/use-cart-store";
import { formatPrice } from "@/src/features/tours/utils/format-price";
import { generateTripSlug } from "@/src/features/tours/utils/slugify";
import type { AppLocale } from "@/src/i18n/locales";

interface CartItemCardProps {
  item: CartItem;
  onRemove: (id: string) => void;
}

const dateLocaleByLocale: Record<AppLocale, string> = {
  en: "en-GB",
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
  const formattedDate = localDate.toLocaleDateString(dateLocaleByLocale[locale] || "en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const adultSubtotal = item.adultCount * item.trip.adultPrice;
  const childSubtotal = item.childCount * item.trip.childPrice;
  const total = adultSubtotal + childSubtotal;

  const tripUrl = `/trips/${generateTripSlug(item.trip.id, item.trip.name)}`;
  const destinationName = item.trip.destinationInfo?.name || item.trip.destination || "Hurghada";

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-5 sm:p-6 shadow-[0px_4px_25px_rgba(0,0,0,0.03)] sm:flex-row sm:gap-6 transition-all hover:shadow-[0px_8px_30px_rgba(0,0,0,0.05)]">
      {/* Thumbnail Image */}
      <Link
        href={tripUrl}
        className="group relative h-48 w-full shrink-0 overflow-hidden rounded-2xl sm:h-44 sm:w-48 lg:w-56 border border-slate-100 bg-slate-50"
      >
        <AppImage
          src={primaryImage?.imageUrl}
          alt={item.trip.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 224px"
        />
      </Link>

      {/* Content Area */}
      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5 min-w-0">
            <Link
              href={tripUrl}
              className="text-lg sm:text-xl font-bold text-[#1E232A] hover:text-[#F36F21] transition-colors line-clamp-2 leading-snug"
            >
              {item.trip.name}
            </Link>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              {/* Destination Pill */}
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 font-semibold text-[#F36F21] border border-orange-200/60">
                <MapPin size={11} />
                <span>{destinationName}</span>
              </span>

              {/* Duration Pill */}
              {item.trip.durationValue > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2.5 py-1 font-semibold text-[#00A3C4] border border-cyan-200/60">
                  <Clock size={11} />
                  <span>{item.trip.durationValue} {item.trip.durationTypeName}</span>
                </span>
              )}
            </div>
          </div>

          {/* Remove Button */}
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label={t("removeAria", { name: item.trip.name })}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 transition-all hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 cursor-pointer shadow-2xs"
          >
            <Trash2 size={13} />
            <span className="hidden sm:inline">{t("remove")}</span>
          </button>
        </div>

        {/* Departure Date & Guest Breakdown */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-600 py-2 border-y border-slate-100/80">
          <div className="flex items-center gap-1.5 font-medium">
            <CalendarDays size={15} className="text-[#F36F21]" />
            <span>{formattedDate}</span>
          </div>

          <span className="text-slate-300">•</span>

          <div className="flex items-center gap-1.5 font-medium">
            <Users size={15} className="text-[#00A3C4]" />
            <span>
              {item.adultCount} Adult{item.adultCount !== 1 ? "s" : ""}
              {item.childCount > 0 ? `, ${item.childCount} Child${item.childCount !== 1 ? "ren" : ""}` : ""}
            </span>
          </div>
        </div>

        {/* Pricing & Subtotal */}
        <div className="flex items-baseline justify-between sm:justify-end gap-3 pt-1">
          <span className="text-xs text-slate-400">
            {item.trip.adultPrice === 0
              ? "Custom pricing"
              : `${formatPrice(item.trip.adultPrice, item.trip.currencyName)} ${t("perPerson")}`}
          </span>

          <span className="text-2xl font-black text-emerald-600">
            {(item.trip.adultPrice === 0 && item.adultCount > 0) || (item.trip.childPrice === 0 && item.childCount > 0)
              ? total > 0
                ? `${formatPrice(total, item.trip.currencyName)} + Custom`
                : "Contact us"
              : formatPrice(total, item.trip.currencyName)}
          </span>
        </div>
      </div>
    </div>
  );
}
