import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import type { Trip } from "@/src/features/tours/types/trip";
import { normalizeTrip } from "@/src/features/tours/utils/normalize-trip";
import { getApiUrl, getLanguageHeaders } from "@/src/shared/config/api";
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

  return normalizeTrip(json.data as Trip);
}

export function useTripQuery(id: number, initialData?: Trip) {
  const locale = useLocale() as AppLocale;

  return useQuery({
    queryKey: ["trip", locale, id],
    queryFn: () => fetchTripById(id, locale),
    initialData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id,
  });
}
