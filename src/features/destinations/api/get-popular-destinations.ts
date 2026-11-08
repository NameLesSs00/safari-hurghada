import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import {
  getApiUrl,
  getImageUrl,
  getLanguageHeaders,
} from "@/src/shared/config/api";
import type { AppLocale } from "@/src/i18n/locales";

export type ApiDestination = {
  id: number;
  name: string;
  imageUrl: string;
  isFeatured: boolean;
  tripsCount: number;
};

export type ApiDestinationsResponse = {
  success: boolean;
  message: string;
  data: ApiDestination[];
};

async function fetchPopularDestinations(
  locale: AppLocale,
): Promise<ApiDestination[]> {
  const response = await fetch(getApiUrl("/api/Destinations"), {
    headers: getLanguageHeaders(locale),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch popular destinations");
  }

  const result: ApiDestinationsResponse = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch popular destinations");
  }

  const allDestinations = (result.data || []).map((destination) => ({
    ...destination,
    imageUrl: getImageUrl(destination.imageUrl),
  }));

  // Sort Hurghada first if present, then other featured, then remaining
  const hurghada = allDestinations.filter((d) => d.id === 2 || /hurghada/i.test(d.name));
  const otherFeatured = allDestinations.filter(
    (d) => d.isFeatured && d.id !== 2 && !/hurghada/i.test(d.name)
  );
  const nonFeatured = allDestinations.filter((d) => !d.isFeatured);

  // Combine to ensure 6 destinations
  const combined = [...hurghada, ...otherFeatured, ...nonFeatured];

  // Return exactly top 6 destinations
  return combined.slice(0, 6);
}

export function usePopularDestinationsQuery() {
  const locale = useLocale() as AppLocale;

  return useQuery({
    queryKey: ["popular-destinations", locale],
    queryFn: () => fetchPopularDestinations(locale),
  });
}
