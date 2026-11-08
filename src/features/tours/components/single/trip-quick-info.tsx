import {
  MapPin,
  Clock,
  Calendar,
} from "lucide-react";
import type { Trip } from "@/src/features/tours/types/trip";

interface TripQuickInfoProps {
  trip: Trip;
}

export function TripQuickInfo({ trip }: TripQuickInfoProps) {
  return (
    <div className="relative rounded-2xl bg-white p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] sm:p-8">
      {/* Absolute badge */}
      <div className="absolute -top-4 left-6 rounded-lg bg-[#003A5A] px-6 py-2 text-sm font-semibold text-white shadow-md">
        Trip Info
      </div>

      <div className="mt-4 grid grid-cols-2 gap-y-6 sm:grid-cols-3 gap-x-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[#6B7280]">
            <MapPin size={18} className="text-[#3B82F6]" />
            <span className="text-xs font-medium sm:text-sm">Location</span>
          </div>
          <span className="text-sm font-semibold text-[#111827] sm:text-base">
            {trip.destinationInfo.name}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[#6B7280]">
            <Clock size={18} className="text-[#3B82F6]" />
            <span className="text-xs font-medium sm:text-sm">Duration</span>
          </div>
          <span className="text-sm font-semibold text-[#111827] sm:text-base">
            {trip.durationValue} {trip.durationTypeName}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[#6B7280]">
            <Calendar size={18} className="text-[#3B82F6]" />
            <span className="text-xs font-medium sm:text-sm">Availability</span>
          </div>
          <span className="text-sm font-semibold text-[#111827] sm:text-base">
            {trip.availableDays.length === 7 ? "Daily" : trip.availableDays.join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
}
