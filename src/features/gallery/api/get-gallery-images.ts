import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import type {
  GalleryImage,
  GalleryResponse,
} from "@/src/features/gallery/types/gallery";
import {
  getApiUrl,
  getImageUrl,
  getLanguageHeaders,
} from "@/src/shared/config/api";
import type { AppLocale } from "@/src/i18n/locales";

async function fetchGalleryImages(
  locale: AppLocale,
  featured?: boolean,
  limit?: number,
): Promise<GalleryImage[]> {
  const url = new URL(getApiUrl("/api/Gallery/GetAllImages"));
  if (limit) {
    url.searchParams.set("pageSize", limit.toString());
  }

  const response = await fetch(url.toString(), {
    headers: getLanguageHeaders(locale),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch gallery images");
  }

  const result: GalleryResponse = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch gallery images");
  }

  // Prepend base URL to image paths
  let imagesWithFullUrl = (result.data || []).map((image) => ({
    ...image,
    imageUrl: getImageUrl(image.imageUrl),
  }));

  // Filter by featured if specified
  if (featured !== undefined) {
    imagesWithFullUrl = imagesWithFullUrl.filter((image) => image.isFeatured === featured);
  }

  // Cap at limit if client-side slicing needed
  if (limit && limit > 0) {
    return imagesWithFullUrl.slice(0, limit);
  }

  return imagesWithFullUrl;
}

export function useGalleryImagesQuery(featured?: boolean, limit?: number) {
  const locale = useLocale() as AppLocale;

  return useQuery({
    queryKey: ["gallery-images", locale, featured, limit],
    queryFn: () => fetchGalleryImages(locale, featured, limit),
  });
}
