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

  const DESTINATION_NAMES: Record<number, string> = {
    2: "Hurghada",
    3: "Giza",
    4: "Aswan",
    5: "Cairo",
    6: "Luxor",
    7: "El Gouna",
  };

  const destId = trip.destinationInfo?.id;
  const resolvedName =
    trip.destinationInfo?.name ||
    (destId ? DESTINATION_NAMES[destId] : undefined) ||
    trip.destination ||
    "Hurghada";

  // Prepend base URL to all image URLs and fill in destination name fallback
  return {
    ...trip,
    destinationInfo: {
      ...trip.destinationInfo,
      id: destId ?? 2,
      name: resolvedName,
      imageUrl: trip.destinationInfo?.imageUrl ?? "",
      isFeatured: trip.destinationInfo?.isFeatured ?? false,
    },
    images: (trip.images || []).map((img) => ({
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
