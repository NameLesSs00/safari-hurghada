import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import type {
  Destination,
  DestinationsResponse,
} from "@/src/features/categories/types/destination";
import {
  getApiUrl,
  getImageUrl,
  getLanguageHeaders,
} from "@/src/shared/config/api";
import type { AppLocale } from "@/src/i18n/locales";

async function fetchDestinations(
  locale: AppLocale,
  featuredOnly: boolean = true,
): Promise<Destination[]> {
  const response = await fetch(getApiUrl("/api/Destinations"), {
    headers: getLanguageHeaders(locale),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch destinations");
  }

  const json: DestinationsResponse = await response.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to load destinations");
  }

  // Prepend base URL to image paths and optionally filter by featured
  const processed = json.data.map((dest) => ({
    ...dest,
    imageUrl: getImageUrl(dest.imageUrl),
  }));

  return featuredOnly ? processed.filter((dest) => dest.isFeatured) : processed;
}

export function useDestinationsQuery(featuredOnly: boolean = true) {
  const locale = useLocale() as AppLocale;

  return useQuery({
    queryKey: ["destinations", locale, featuredOnly ? "featured" : "all"],
    queryFn: () => fetchDestinations(locale, featuredOnly),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
