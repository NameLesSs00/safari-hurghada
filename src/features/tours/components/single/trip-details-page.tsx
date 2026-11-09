"use client";

import { useTripQuery } from "@/src/features/tours/api/get-trip";
import { useTripReviewsQuery } from "@/src/features/tours/api/get-reviews";
import { extractIdFromSlug, generateSlug } from "@/src/features/tours/utils/slugify";
import { useEffect } from "react";

import { TripHeader } from "./trip-header";
import { TripGallery } from "./trip-gallery";
import { TripTitle } from "./trip-title";
import { TripDescription } from "./trip-description";
import { TripInclusions } from "./trip-inclusions";
import { TripQuickInfo } from "./trip-quick-info";
import { TripHighlights } from "./trip-highlights";
import { TripBookingCard } from "./trip-booking-card";
import { TripReviews } from "./trip-reviews";

interface TripDetailsPageProps {
  slug: string;
}

export function TripDetailsPage({ slug }: TripDetailsPageProps) {
  const tripId = extractIdFromSlug(slug);

  const { data: trip, isLoading: isTripLoading, error: tripError } = useTripQuery(
    tripId as number
  );
  
  const { data: reviews = [], isLoading: isReviewsLoading } = useTripReviewsQuery(
    tripId as number
  );

  useEffect(() => {
    if (trip && trip.name && tripId) {
      const expectedSlug = generateSlug(trip.id, trip.name);
      if (slug !== expectedSlug) {
        // Rewrite URL without reloading the page
        const newUrl = window.location.pathname.replace(slug, expectedSlug) + window.location.search;
        window.history.replaceState(null, "", newUrl);
      }
    }
  }, [trip, slug, tripId]);

  if (!tripId) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#FAFAFA]">
        <p className="text-xl font-semibold text-rose-500">Invalid trip URL</p>
      </div>
    );
  }

  if (isTripLoading || isReviewsLoading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 bg-[#FAFAFA]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#F36F21] border-t-transparent" />
        <p className="text-sm font-medium text-slate-500">Loading tour details...</p>
      </div>
    );
  }

  if (tripError || !trip) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-[#FAFAFA] px-4 text-center">
        <p className="text-xl font-bold text-slate-800">Unable to load tour details</p>
        <p className="text-sm text-slate-500">Please check your internet connection or try again.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="rounded-full bg-[#F36F21] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-[#d95c12] cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  const averageRating = reviews.length
    ? reviews.reduce((acc, r) => acc + r.rate, 0) / reviews.length
    : 0;

  const destinationName = trip.destinationInfo?.name || "Hurghada";

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <TripHeader tripName={trip.name} destinationName={destinationName} />

      <main className="mx-auto w-full max-w-[1440px] px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        {/* Top: Interactive Photo Showcase */}
        <TripGallery images={trip.images} />

        {/* 2-Column Layout: Content (Left) + Sticky Booking Sidebar (Right) */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          {/* Left Column: Full Tour Details */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">
            <TripTitle 
              trip={trip} 
              averageRating={averageRating} 
              totalReviews={reviews.length} 
            />

            <TripQuickInfo trip={trip} />

            <TripDescription description={trip.description} />

            <TripHighlights highlights={trip.highlights} />

            <TripInclusions 
              includes={trip.includes} 
              excludes={trip.excludes} 
            />

            <TripReviews tripId={trip.id} reviews={reviews} />
          </div>

          {/* Right Column: Sticky Booking Card */}
          <aside className="w-full lg:w-[380px] xl:w-[420px] shrink-0 lg:sticky lg:top-24">
            <TripBookingCard trip={trip} />
          </aside>
        </div>
      </main>
    </div>
  );
}
