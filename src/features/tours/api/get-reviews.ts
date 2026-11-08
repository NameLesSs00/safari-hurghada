import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { getApiUrl, getLanguageHeaders } from "@/src/shared/config/api";
import type { AppLocale } from "@/src/i18n/locales";

export interface Review {
  id: number;
  comment: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rate: number;
  createdAt: string;
  tripName: string;
  description: string;
  markerID: string;
  destination: string;
  tripTypeName: string;
  adultPrice: number;
  childPrice: number;
  currencyName: string;
}

interface ReviewsResponse {
  success: boolean;
  message: string;
  data: Review[];
}

async function fetchTripReviews(
  tripId: number,
  locale: AppLocale,
): Promise<Review[]> {
  const response = await fetch(getApiUrl(`/api/Reviews?TripId=${tripId}`), {
    headers: {
      Accept: "application/json, text/plain, */*",
      ...getLanguageHeaders(locale),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  const json: ReviewsResponse = await response.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to load reviews");
  }

  return json.data;
}

export function useTripReviewsQuery(tripId: number) {
  const locale = useLocale() as AppLocale;

  return useQuery({
    queryKey: ["reviews", "trip", locale, tripId],
    queryFn: () => fetchTripReviews(tripId, locale),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!tripId,
  });
}
