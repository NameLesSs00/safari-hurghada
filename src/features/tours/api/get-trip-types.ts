import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import type {
  TripType,
  TripTypesResponse,
} from "@/src/features/tours/types/trip-type";
import { getApiUrl, getLanguageHeaders } from "@/src/shared/config/api";
import type { AppLocale } from "@/src/i18n/locales";

export async function fetchTripTypes(locale: AppLocale): Promise<TripType[]> {
  const response = await fetch(getApiUrl("/api/TripTypes"), {
    headers: getLanguageHeaders(locale),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch trip types");
  }

  const json: TripTypesResponse = await response.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to load trip types");
  }

  return json.data;
}

export function useTripTypesQuery() {
  const locale = useLocale() as AppLocale;

  return useQuery({
    queryKey: ["trip-types", locale],
    queryFn: () => fetchTripTypes(locale),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
