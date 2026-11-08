"use client";

import { MapPin, Clock, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";

import type { Trip } from "@/src/features/tours/types/trip";
import { generateTripSlug } from "@/src/features/tours/utils/slugify";
import { useSavedTripsStore } from "@/src/store/use-saved-trips-store";
import type { AppLocale } from "@/src/i18n/locales";

interface TourCardProps {
  trip: Trip;
}

export function TourCard({ trip }: TourCardProps) {
  const router = useRouter();
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Tours");

  const [mounted, setMounted] = useState(false);
  const isSaved = useSavedTripsStore((state) => state.isTripSaved(trip.id));
  const toggleSaveTrip = useSavedTripsStore((state) => state.toggleSaveTrip);

  useEffect(() => {
    setMounted(true);
  }, []);

  const primaryImage =
    trip.images.find((img) => img.isPrimary) || trip.images[0];

  const tripUrl = `/${locale}/trips/${generateTripSlug(trip.id, trip.name)}`;

  // Clean description of markdown characters for a clean 2-line snippet
  const cleanDescription = (trip.description || "")
    .replace(/[#*_`~>[\]]/g, "")
    .trim();

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveTrip(trip);
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(tripUrl);
  };

  const formattedPrice =
    trip.adultPrice > 0 ? `$${trip.adultPrice}` : null;

  return (
    <div
      onClick={() => router.push(tripUrl)}
      className="group flex flex-col h-full w-full cursor-pointer overflow-hidden rounded-[24px] bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300"
    >
      {/* Top Image Container */}
      <div className="relative h-[220px] sm:h-[230px] w-full shrink-0 overflow-hidden bg-gray-100">
        {primaryImage ? (
          <Image
            src={primaryImage.imageUrl}
            alt={trip.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
        )}

        {/* Featured Trip Pill Ribbon */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold text-white bg-[#F36F21] shadow-sm tracking-wide">
            {t("featuredTrip")}
          </span>
        </div>

        {/* Heart / Saved Toggle Button */}
        <button
          type="button"
          onClick={handleHeartClick}
          aria-label={
            mounted && isSaved ? t("unsaveTrip") : t("saveTrip")
          }
          className="absolute top-3.5 right-3.5 z-10 size-9 rounded-full bg-black/25 backdrop-blur-[2px] flex items-center justify-center text-white transition-all hover:bg-black/40 hover:scale-110 active:scale-95"
        >
          <Heart
            className={`size-5 transition-colors ${
              mounted && isSaved
                ? "fill-[#F36F21] text-[#F36F21]"
                : "text-white fill-none stroke-[2.2]"
            }`}
          />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Trip Title */}
        <h3 className="text-lg sm:text-[19px] font-extrabold text-[#0F2942] line-clamp-1 group-hover:text-[#F36F21] transition-colors mb-2.5">
          {trip.name}
        </h3>

        {/* Metadata Row: Location + Duration ONLY (No age displayed per design) */}
        <div className="flex items-center gap-4 text-xs sm:text-[13px] text-[#64748B] mb-3">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="size-3.5 shrink-0 text-[#64748B]" />
            <span className="truncate">{trip.destinationInfo.name}</span>
          </div>
          {trip.durationValue > 0 && (
            <div className="flex items-center gap-1.5 shrink-0">
              <Clock className="size-3.5 shrink-0 text-[#64748B]" />
              <span>
                {trip.durationValue} {trip.durationTypeName}
              </span>
            </div>
          )}
        </div>

        {/* Description snippet */}
        <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#64748B] line-clamp-2 mb-5">
          {cleanDescription || "Experience an unforgettable adventure with guided excursions in Hurghada."}
        </p>

        {/* Bottom Row: Price & Book Now */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-[#94A3B8] leading-none mb-1">
              {t("from")}
            </span>
            <div className="flex items-baseline gap-1">
              {formattedPrice ? (
                <>
                  <span className="text-xl sm:text-2xl font-black text-[#0D9488]">
                    {formattedPrice}
                  </span>
                  <span className="text-[11px] font-medium text-[#94A3B8]">
                    {t("perPerson")}
                  </span>
                </>
              ) : (
                <span className="text-base sm:text-lg font-bold text-[#0D9488] leading-tight">
                  Contact for price
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleBookNow}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#F36F21] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#df5d10] hover:shadow-md active:scale-95"
          >
            <span>{t("bookNow")}</span>
            <span className="text-base leading-none">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
