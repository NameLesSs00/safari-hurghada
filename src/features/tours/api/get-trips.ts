import { useQuery, keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import type { Trip, TripsResponse } from "@/src/features/tours/types/trip";
import {
  getApiUrl,
  getImageUrl,
  getLanguageHeaders,
} from "@/src/shared/config/api";
import type { AppLocale } from "@/src/i18n/locales";

export interface UseTripsQueryOptions {
  typeId?: number;
  pageSize?: number;
  pageNumber?: number;
  minPrice?: number;
  maxPrice?: number;
  destinationId?: number;
  searchItem?: string;
}

export async function fetchTrips({
  options,
  locale,
}: {
  options: UseTripsQueryOptions;
  locale: AppLocale;
}): Promise<Trip[]> {
  const {
    typeId,
    pageSize = 6,
    pageNumber = 1,
    minPrice,
    maxPrice,
    destinationId,
    searchItem,
  } = options;
  const params = new URLSearchParams({
    PageSize: pageSize.toString(),
    PageNumber: pageNumber.toString(),
  });

  if (typeId) params.append("TypeId", typeId.toString());
  if (minPrice !== undefined) params.append("MinPrice", minPrice.toString());
  if (maxPrice !== undefined) params.append("MaxPrice", maxPrice.toString());
  if (destinationId) params.append("DestinationId", destinationId.toString());
  if (searchItem) params.append("SearchItem", searchItem);

  const response = await fetch(getApiUrl(`/api/Trips?${params}`), {
    headers: getLanguageHeaders(locale),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch trips");
  }

  const json: TripsResponse = await response.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to load trips");
  }

  // Prepend base URL to all image URLs
  return json.data.map((trip) => ({
    ...trip,
    images: trip.images.map((img) => ({
      ...img,
      imageUrl: getImageUrl(img.imageUrl),
    })),
  }));
}

export function useTripsInfiniteQuery(options: UseTripsQueryOptions = {}) {
  const locale = useLocale() as AppLocale;

  return useInfiniteQuery({
    queryKey: [
      "trips",
      "infinite",
      locale,
      options.typeId,
      options.minPrice,
      options.maxPrice,
      options.destinationId,
      options.searchItem,
    ],
    queryFn: ({ pageParam = 1 }) => fetchTrips({ options: { ...options, pageNumber: pageParam, pageSize: 6 }, locale }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 6 ? allPages.length + 1 : undefined;
    },
  });
}

export function useTripsQuery(options: UseTripsQueryOptions = {}) {
  const locale = useLocale() as AppLocale;

  return useQuery({
    queryKey: [
      "trips",
      locale,
      options.typeId,
      options.pageSize,
      options.pageNumber,
      options.minPrice,
      options.maxPrice,
      options.destinationId,
      options.searchItem,
    ],
    queryFn: () => fetchTrips({ options, locale }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
