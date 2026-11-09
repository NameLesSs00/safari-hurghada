import Image from "next/image";
import { AppImage } from "@/src/shared/components/app-image";
import { CalendarDays, AlertCircle, ShieldCheck, Zap } from "lucide-react";
import type { Trip } from "@/src/features/tours/types/trip";
import { formatPrice } from "@/src/features/tours/utils/format-price";

interface BookingSummaryProps {
  trip: Trip;
  selectedDate: Date | null;
  adultCount: number;
  childCount: number;
}

export function BookingSummary({
  trip,
  selectedDate,
  adultCount,
  childCount,
}: BookingSummaryProps) {
  const primaryImage =
    trip.images.find((img) => img.isPrimary) ?? trip.images[0];

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  const adultSubtotal = adultCount * trip.adultPrice;
  const childSubtotal = childCount * trip.childPrice;
  const total = adultSubtotal + childSubtotal;

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-slate-50 border border-slate-100 p-5">
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
        Booking Summary
      </h3>

      {/* Trip card row */}
      <div className="flex items-start gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-200/60 bg-slate-100 shadow-xs">
          <AppImage
            src={primaryImage?.imageUrl}
            alt={trip.name}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-sm font-bold text-[#1E232A] leading-snug line-clamp-2">
            {trip.name}
          </p>
          <span className="text-xs text-slate-500 font-medium">
            {trip.destinationInfo?.name || "Hurghada"}
          </span>
        </div>
      </div>

      {/* Date banner */}
      {formattedDate ? (
        <div className="flex items-center gap-2 rounded-xl bg-orange-50 border border-orange-200/70 px-3.5 py-2 text-xs font-bold text-[#F36F21]">
          <CalendarDays size={14} className="shrink-0" />
          <span>{formattedDate}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200/70 px-3 py-2 text-xs font-semibold text-amber-700">
          <AlertCircle size={14} className="shrink-0" />
          <span>Please select a date on the calendar</span>
        </div>
      )}

      {/* Package lines */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600">
          <span>
            Adult: {adultCount} ×{" "}
            {trip.adultPrice === 0 ? "Free / Custom" : formatPrice(trip.adultPrice, trip.currencyName)}
          </span>
          <span className="font-bold text-[#1E232A]">
            {trip.adultPrice === 0 ? "Contact us" : formatPrice(adultSubtotal, trip.currencyName)}
          </span>
        </div>

        {trip.childPrice > 0 && childCount > 0 && (
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600">
            <span>
              Child: {childCount} × {formatPrice(trip.childPrice, trip.currencyName)}
            </span>
            <span className="font-bold text-[#1E232A]">
              {formatPrice(childSubtotal, trip.currencyName)}
            </span>
          </div>
        )}
      </div>

      <div className="h-px w-full bg-slate-200/70" />

      {/* Total */}
      <div className="flex items-baseline justify-between">
        <span className="font-bold text-[#1E232A]">Total Due</span>
        <div className="flex flex-col items-end">
          <span className="text-xl font-black text-emerald-600">
            {(trip.adultPrice === 0 && adultCount > 0) || (trip.childPrice === 0 && childCount > 0)
              ? total > 0
                ? `${formatPrice(total, trip.currencyName)} + Contact us`
                : "Contact us"
              : formatPrice(total, trip.currencyName)}
          </span>
          <span className="text-[10px] text-slate-400">All taxes &amp; fees included</span>
        </div>
      </div>

      {/* Trust badges */}
      <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-200/50 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Zap size={12} className="text-[#F36F21] shrink-0" />
          <span>Instant reservation confirmation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={12} className="text-emerald-600 shrink-0" />
          <span>Free cancellation up to 24h before</span>
        </div>
      </div>
    </div>
  );
}
