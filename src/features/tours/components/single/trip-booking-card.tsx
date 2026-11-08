"use client";

import { useState } from "react";
import { Clock, User, Users } from "lucide-react";
import type { Trip } from "@/src/features/tours/types/trip";
import { formatPrice } from "@/src/features/tours/utils/format-price";
import { AvailabilityModal } from "./availability-modal";

interface TripBookingCardProps {
  trip: Trip;
}

export function TripBookingCard({ trip }: TripBookingCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl bg-[#F8FBFC] p-6 shadow-sm">
        <div className="flex flex-col gap-6">
          {/* Duration Row */}
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
              <Clock size={20} className="text-[#003A5A]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-[#6B7280]">Duration</span>
              <span className="font-semibold text-[#111827]">
                {trip.durationValue} {trip.durationTypeName}
              </span>
            </div>
          </div>

          <div className="h-px w-full bg-gray-200" />

          {/* Adult Price Row */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                <User size={20} className="text-[#003A5A]" />
              </div>
              <span className="text-sm font-medium text-[#4B5563]">Adult</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-[#6B7280]">From</span>
              <span className="font-semibold text-[#10B981]">
                {trip.adultPrice === 0 ? "Contact us for price" : `${formatPrice(trip.adultPrice, trip.currencyName)} / Person`}
              </span>
            </div>
          </div>

          {/* Child Price Row */}
          {trip.childPrice > 0 && (
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                  <Users size={20} className="text-[#003A5A]" />
                </div>
                <span className="text-sm font-medium text-[#4B5563]">
                  Children 3-11 Years
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-[#6B7280]">From</span>
                <span className="font-semibold text-[#10B981]">
                  {trip.childPrice === 0 ? "Contact us for price" : `${formatPrice(trip.childPrice, trip.currencyName)} / Person`}
                </span>
              </div>
            </div>
          )}

          <div className="h-px w-full bg-gray-200" />

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full rounded-full bg-[#003A5A] py-3.5 font-semibold text-white transition-colors hover:bg-[#002a42]"
          >
            Check Availability
          </button>
        </div>
      </div>

      <AvailabilityModal
        trip={trip}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

