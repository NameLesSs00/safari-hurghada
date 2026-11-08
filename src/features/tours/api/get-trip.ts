import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import type { Trip } from "@/src/features/tours/types/trip";
import {
  getApiUrl,
  getImageUrl,
  getLanguageHeaders,
} from "@/src/shared/config/api";
import type { AppLocale } from "@/src/i18n/locales";

async function fetchTripById(id: number, locale: AppLocale): Promise<Trip> {
  const response = await fetch(getApiUrl(`/api/Trips/${id}`), {
    headers: getLanguageHeaders(locale),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Trip not found");
    }
    throw new Error("Failed to fetch trip details");
  }

  const json = await response.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to load trip details");
  }

  const trip = json.data as Trip;

  // Prepend base URL to all image URLs
  return {
    ...trip,
    images: trip.images.map((img) => ({
      ...img,
      imageUrl: getImageUrl(img.imageUrl),
    })),
  };
}

export function useTripQuery(id: number) {
  const locale = useLocale() as AppLocale;

  return useQuery({
    queryKey: ["trip", locale, id],
    queryFn: () => fetchTripById(id, locale),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id,
  });
}
