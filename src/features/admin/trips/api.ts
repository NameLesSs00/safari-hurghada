import { adminFetch, parseApiResponse } from "@/src/features/admin/auth/api";
import { getApiUrl } from "@/src/shared/config/api";

import type {
  ApiResponse,
  Trip,
  TripFormValues,
  TripLanguage,
  TripListParams,
  TripTranslations,
  UploadedTripImage,
} from "./types";
import { tripLanguages } from "./types";

function getJsonHeaders(language?: TripLanguage) {
  return {
    Accept: "application/json, text/plain, */*",
    ...(language ? { "Accept-Language": language } : {}),
  };
}

function cleanText(value: string) {
  return value.trim();
}

function cleanLocalizedText(values: TripFormValues["name"]) {
  return {
    en: cleanText(values.en),
    fr: cleanText(values.fr),
    ru: cleanText(values.ru),
    ro: cleanText(values.ro),
  };
}

function cleanLocalizedList(values: TripFormValues["highlights"]) {
  return values
    .map(cleanLocalizedText)
    .filter((item) => item.en || item.fr || item.ru || item.ro);
}

function buildTripPayload(values: TripFormValues) {
  return {
    ...(values.id ? { id: values.id } : {}),
    destinationId: values.destinationId,
    name: cleanLocalizedText(values.name),
    description: cleanLocalizedText(values.description),
    timeFrom: values.timeFrom,
    durationValue: values.durationValue,
    durationType: values.durationType,
    adultPrice: values.adultPrice,
    childPrice: values.childPrice,
    tripTypeId: values.tripTypeId,
    highlights: cleanLocalizedList(values.highlights),
    includes: cleanLocalizedList(values.includes),
    excludes: cleanLocalizedList(values.excludes),
    whatToBring: cleanLocalizedList(values.whatToBring),
    availabilityDayNo: values.availabilityDayNo,
  };
}

function mergeLocalizedList(
  responses: Array<ApiResponse<Trip>>,
  field: "highlights" | "includes" | "excludes" | "whatToBring",
) {
  const maxLength = Math.max(
    ...responses.map((response) => response.data[field]?.length ?? 0),
    0,
  );

  return Array.from({ length: maxLength }, (_, itemIndex) =>
    tripLanguages.reduce(
      (localized, language, languageIndex) => ({
        ...localized,
        [language]: responses[languageIndex].data[field]?.[itemIndex] ?? "",
      }),
      { en: "", fr: "", ru: "", ro: "" },
    ),
  );
}

export function getTripImageUrl(imageUrl: string) {
  if (!imageUrl) {
    return "";
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  return getApiUrl(imageUrl);
}

export async function getTrips(params: TripListParams) {
  const searchParams = new URLSearchParams();
  searchParams.set("PageNumber", String(params.pageNumber));
  searchParams.set("PageSize", String(params.pageSize));
  searchParams.set("includeInactive", String(params.includeInactive));

  if (params.minPrice) {
    searchParams.set("MinPrice", params.minPrice);
  }

  if (params.maxPrice) {
    searchParams.set("MaxPrice", params.maxPrice);
  }

  if (params.typeId) {
    searchParams.set("TypeId", params.typeId);
  }

  if (params.destinationId) {
    searchParams.set("DestinationId", params.destinationId);
  }

  if (params.destination?.trim()) {
    searchParams.set("Destination", params.destination.trim());
  }

  if (params.searchItem?.trim()) {
    searchParams.set("SearchItem", params.searchItem.trim());
  }

  const response = await adminFetch(`/api/Trips?${searchParams}`, {
    headers: getJsonHeaders(params.language),
  });

  return parseApiResponse<ApiResponse<Trip[]>>(
    response,
    "Unable to load trips.",
  );
}

export async function getTripById(id: number, language: TripLanguage) {
  const response = await adminFetch(`/api/Trips/${id}`, {
    headers: getJsonHeaders(language),
  });

  return parseApiResponse<ApiResponse<Trip>>(
    response,
    "Unable to load trip.",
  );
}

export async function getTripTranslations(id: number): Promise<{
  trip: Trip;
  translations: TripTranslations;
}> {
  const responses = await Promise.all(
    tripLanguages.map((language) => getTripById(id, language)),
  );

  return {
    trip: responses[0].data,
    translations: {
      name: tripLanguages.reduce(
        (names, language, index) => ({
          ...names,
          [language]: responses[index].data.name ?? "",
        }),
        { en: "", fr: "", ru: "", ro: "" },
      ),
      description: tripLanguages.reduce(
        (descriptions, language, index) => ({
          ...descriptions,
          [language]: responses[index].data.description ?? "",
        }),
        { en: "", fr: "", ru: "", ro: "" },
      ),
      highlights: mergeLocalizedList(responses, "highlights"),
      includes: mergeLocalizedList(responses, "includes"),
      excludes: mergeLocalizedList(responses, "excludes"),
      whatToBring: mergeLocalizedList(responses, "whatToBring"),
    },
  };
}

export async function getTripsByType(
  typeId: number,
  params: Pick<TripListParams, "pageNumber" | "pageSize" | "language">,
) {
  const searchParams = new URLSearchParams();
  searchParams.set("PageNumber", String(params.pageNumber));
  searchParams.set("PageSize", String(params.pageSize));

  const response = await adminFetch(`/api/Trips/type/${typeId}?${searchParams}`, {
    headers: getJsonHeaders(params.language),
  });

  return parseApiResponse<ApiResponse<Trip[]>>(
    response,
    "Unable to load trips for this type.",
  );
}

export async function getTripByMarker(
  markerId: string,
  language: TripLanguage,
) {
  const response = await adminFetch(`/api/Trips/marker/${markerId}`, {
    headers: getJsonHeaders(language),
  });

  return parseApiResponse<ApiResponse<Trip>>(
    response,
    "Unable to load trip marker.",
  );
}

export async function createTrip(values: TripFormValues) {
  const response = await adminFetch("/api/Trips", {
    method: "POST",
    headers: {
      ...getJsonHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildTripPayload(values)),
  });

  return parseApiResponse<ApiResponse<Trip>>(
    response,
    "Unable to create trip.",
  );
}

export async function updateTrip(values: TripFormValues) {
  const response = await adminFetch("/api/Trips", {
    method: "PUT",
    headers: {
      ...getJsonHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildTripPayload(values)),
  });

  return parseApiResponse<ApiResponse<Trip>>(
    response,
    "Unable to update trip.",
  );
}

export async function deactivateTrip(id: number) {
  const response = await adminFetch(`/api/Trips/${id}/deactivate`, {
    method: "DELETE",
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<string>>(
    response,
    "Unable to deactivate trip.",
  );
}

export async function reactivateTrip(id: number) {
  const response = await adminFetch(`/api/Trips/${id}/reactivate`, {
    method: "PUT",
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<string>>(
    response,
    "Unable to reactivate trip.",
  );
}

export async function uploadTripImages(id: number, files: File[]) {
  const formData = new FormData();
  files.forEach((file) => formData.append("Images", file));

  const response = await adminFetch(`/api/Trips/${id}/image`, {
    method: "POST",
    headers: getJsonHeaders(),
    body: formData,
  });

  return parseApiResponse<ApiResponse<UploadedTripImage[]>>(
    response,
    "Unable to upload trip images.",
  );
}

export async function deleteTripImage(id: number, imageId: number) {
  const response = await adminFetch(`/api/Trips/${id}/image/${imageId}`, {
    method: "DELETE",
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<string>>(
    response,
    "Unable to delete trip image.",
  );
}

export async function setPrimaryTripImage(id: number, imageId: number) {
  const response = await adminFetch(
    `/api/Trips/${id}/image/${imageId}/set-primary`,
    {
      method: "PUT",
      headers: getJsonHeaders(),
    },
  );

  return parseApiResponse<ApiResponse<string>>(
    response,
    "Unable to set primary image.",
  );
}
