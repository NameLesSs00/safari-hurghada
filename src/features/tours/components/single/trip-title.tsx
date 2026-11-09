"use client";

import { useEffect, useState } from "react";
import { MapPin, Star, Clock, Compass, Heart, ShieldCheck, Zap } from "lucide-react";
import type { Trip } from "@/src/features/tours/types/trip";
import { useSavedTripsStore } from "@/src/store/use-saved-trips-store";

interface TripTitleProps {
  trip: Trip;
  averageRating: number;
  totalReviews: number;
}

export function TripTitle({ trip, averageRating, totalReviews }: TripTitleProps) {
  const [mounted, setMounted] = useState(false);
  const isSaved = useSavedTripsStore((state) => state.isTripSaved(trip.id));
  const toggleSaveTrip = useSavedTripsStore((state) => state.toggleSaveTrip);

  useEffect(() => {
    setMounted(true);
  }, []);

  const destinationName = trip.destinationInfo?.name || "Hurghada";

  return (
    <div className="flex flex-col gap-6">
      {/* Top Meta Badges + Save Button */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Destination Pill */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3.5 py-1.5 text-xs font-semibold text-[#F36F21] border border-orange-200/60">
            <MapPin size={13} className="text-[#F36F21]" />
            <span>{destinationName}, Egypt</span>
          </div>

          {/* Tour Type Pill */}
          {trip.tripTypeName && (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-3.5 py-1.5 text-xs font-semibold text-[#00A3C4] border border-cyan-200/60">
              <Compass size={13} className="text-[#00A3C4]" />
              <span>{trip.tripTypeName}</span>
            </div>
          )}

          {/* Instant Confirmation Pill */}
          <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
            <Zap size={12} className="text-emerald-600" />
            <span>Instant Confirmation</span>
          </div>
        </div>

        {/* Wishlist / Save Button */}
        <button
          type="button"
          onClick={() => toggleSaveTrip(trip)}
          aria-label={mounted && isSaved ? "Remove from saved trips" : "Save trip"}
          className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm ${
            mounted && isSaved
              ? "border-orange-200 bg-orange-50/90 text-[#F36F21]"
              : "border-slate-200 bg-white text-slate-700 hover:border-orange-200 hover:text-[#F36F21] hover:bg-orange-50/40"
          }`}
        >
          <Heart
            size={16}
            className={`transition-colors ${
              mounted && isSaved
                ? "fill-[#F36F21] text-[#F36F21]"
                : "text-slate-400 group-hover:text-[#F36F21] fill-none"
            }`}
          />
          <span>{mounted && isSaved ? "Saved" : "Save"}</span>
        </button>
      </div>

      {/* Main Title Heading */}
      <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-[#1E232A] sm:text-3xl lg:text-4xl">
        {trip.name}
      </h1>

      {/* Rating & Fast Info Line */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <Star size={17} className="fill-[#F59E0B] text-[#F59E0B]" />
          <span className="font-bold text-[#1E232A]">
            {averageRating > 0 ? averageRating.toFixed(1) : "5.0"}
          </span>
          <span className="text-slate-400">
            ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
          </span>
        </div>

        <span className="text-slate-300">•</span>

        <div className="flex items-center gap-1.5 font-medium text-slate-700">
          <Clock size={16} className="text-[#F36F21]" />
          <span>{trip.durationValue} {trip.durationTypeName}</span>
        </div>

        <span className="text-slate-300">•</span>

        <div className="flex items-center gap-1.5 font-medium text-slate-700">
          <ShieldCheck size={16} className="text-emerald-600" />
          <span>Free Cancellation</span>
        </div>
      </div>
    </div>
  );
}
