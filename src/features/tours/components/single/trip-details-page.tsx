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
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-xl text-red-500">Invalid trip URL</p>
      </div>
    );
  }

  if (isTripLoading || isReviewsLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#003A5A] border-t-transparent" />
      </div>
    );
  }

  if (tripError || !trip) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-xl text-red-500">Failed to load trip details</p>
        <button 
          onClick={() => window.location.reload()} 
          className="rounded-full bg-[#003A5A] px-6 py-2 text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  const averageRating = reviews.length
    ? reviews.reduce((acc, r) => acc + r.rate, 0) / reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-white">
      <TripHeader tripName={trip.name} />

      <main className="mx-auto w-full px-5 pb-16 pt-6 md:px-8 lg:max-w-[1200px] lg:px-10">
        <TripGallery images={trip.images} />

        <div className="mb-12 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          {/* Left Column: Title and Description */}
          <div className="flex-1">
            <TripTitle 
              trip={trip} 
              averageRating={averageRating} 
              totalReviews={reviews.length} 
            />
            
            <div className="mt-8">
              <TripDescription description={trip.description} />
            </div>
          </div>

          {/* Right Column: Booking Card */}
          <aside className="w-full lg:w-[380px] shrink-0">
            <TripBookingCard trip={trip} />
          </aside>
        </div>

        {/* Full Width Components */}
        <div className="flex flex-col gap-10">
          <TripInclusions 
            includes={trip.includes} 
            excludes={trip.excludes} 
          />
          
          <TripQuickInfo trip={trip} />
          
          <TripHighlights highlights={trip.highlights} />

          <div className="mt-6">
            <h2 className="mb-8 text-2xl font-bold text-[#111827]">Reviews</h2>
            <TripReviews tripId={trip.id} reviews={reviews} />
          </div>
        </div>
      </main>
    </div>
  );
}
