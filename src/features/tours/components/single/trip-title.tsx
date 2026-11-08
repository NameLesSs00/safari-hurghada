import { MapPin, Star, Clock, Compass } from "lucide-react";
import type { Trip } from "@/src/features/tours/types/trip";

interface TripTitleProps {
  trip: Trip;
  averageRating: number;
  totalReviews: number;
}

export function TripTitle({ trip, averageRating, totalReviews }: TripTitleProps) {
  return (
    <div className="mb-8 flex flex-col gap-6">
      {/* Title & Basic Info */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold leading-tight text-[#111827] sm:text-3xl lg:text-4xl">
          {trip.name}
        </h1>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1.5 text-[#6B7280]">
            <MapPin size={18} className="text-[#3B82F6]" />
            <span className="text-sm font-medium sm:text-base">
              {trip.destinationInfo.name}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Star size={18} className="fill-[#F59E0B] text-[#F59E0B]" />
            <span className="text-sm font-semibold text-[#374151] sm:text-base">
              {averageRating.toFixed(1)} Reviews ({totalReviews})
            </span>
          </div>
        </div>
      </div>

      {/* Badges container */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#F9FAFB] p-4 lg:px-6">

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <Clock size={20} className="text-[#003A5A]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-[#6B7280]">Duration</span>
            <span className="text-sm font-semibold text-[#111827]">
              {trip.durationValue} {trip.durationTypeName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
            <Compass size={20} className="text-[#003A5A]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-[#6B7280]">Tour Type</span>
            <span className="text-sm font-semibold text-[#111827]">
              {trip.tripTypeName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
