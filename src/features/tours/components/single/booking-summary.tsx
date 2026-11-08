 import Image from "next/image";
import { CalendarDays } from "lucide-react";
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
    ? selectedDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
    : "—";

  const adultSubtotal = adultCount * trip.adultPrice;
  const childSubtotal = childCount * trip.childPrice;
  const total = adultSubtotal + childSubtotal;

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-[#F5F9FC] p-5">
      <h3 className="text-base font-bold text-[#111827]">Booking summary</h3>

      {/* Trip card row */}
      <div className="flex items-start gap-4">
        {primaryImage && (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
            <Image
              src={primaryImage.imageUrl}
              alt={trip.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-[#111827] leading-snug">
            {trip.name}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
            <CalendarDays size={13} />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Package lines */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">
          Package
        </p>

        <div className="flex items-center justify-between text-sm text-[#374151]">
          <span>
            Adult: {adultCount} x{" "}
            {trip.adultPrice === 0 ? "Contact us for price" : formatPrice(trip.adultPrice, trip.currencyName)}
          </span>
          <span className="font-semibold">
            {trip.adultPrice === 0 ? "Contact us for price" : formatPrice(adultSubtotal, trip.currencyName)}
          </span>
        </div>

        {trip.childPrice > 0 && childCount > 0 && (
          <div className="flex items-center justify-between text-sm text-[#374151]">
            <span>
              Child: {childCount} x{" "}
              {trip.childPrice === 0 ? "Contact us for price" : formatPrice(trip.childPrice, trip.currencyName)}
            </span>
            <span className="font-semibold">
              {trip.childPrice === 0 ? "Contact us for price" : formatPrice(childSubtotal, trip.currencyName)}
            </span>
          </div>
        )}
      </div>

      <div className="h-px w-full bg-gray-200" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="font-bold text-[#111827]">Total</span>
        <span className="text-lg font-bold text-[#10B981]">
          {(trip.adultPrice === 0 && adultCount > 0) || (trip.childPrice === 0 && childCount > 0)
            ? total > 0
              ? `${formatPrice(total, trip.currencyName)} + Contact us for price`
              : "Contact us for price"
            : formatPrice(total, trip.currencyName)}
        </span>
      </div>
    </div>
  );
}
