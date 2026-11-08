import { adminFetch, parseApiResponse } from "@/src/features/admin/auth/api";
import { getApiUrl } from "@/src/shared/config/api";

import type {
  ApiResponse,
  Destination,
  DestinationFormValues,
  DestinationLanguage,
  DestinationListParams,
} from "./types";

function buildDestinationFormData(values: DestinationFormValues) {
  const formData = new FormData();

  if (values.id) {
    formData.append("Id", String(values.id));
  }

  formData.append("Name.En", values.names.en.trim());
  formData.append("Name.Fr", values.names.fr.trim());
  formData.append("Name.Ru", values.names.ru.trim());
  formData.append("Name.Ro", values.names.ro.trim());
  formData.append("IsFeatured", String(values.isFeatured));

  if (values.imageFile) {
    formData.append("imageFile", values.imageFile);
  }

  return formData;
}

export function getDestinationImageUrl(imageUrl: string) {
  if (!imageUrl) {
    return "";
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  return getApiUrl(imageUrl);
}

export async function getDestinations(params: DestinationListParams) {
  const searchParams = new URLSearchParams();
  searchParams.set("PageNumber", String(params.pageNumber));
  searchParams.set("PageSize", String(params.pageSize));

  if (params.searchTerm.trim()) {
    searchParams.set("searchTerm", params.searchTerm.trim());
  }

  const response = await adminFetch(`/api/Destinations?${searchParams}`, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Language": params.language,
    },
  });

  return parseApiResponse<ApiResponse<Destination[]>>(
    response,
    "Unable to load destinations.",
  );
}

export async function getDestinationById(
  id: number,
  language: DestinationLanguage,
) {
  const response = await adminFetch(`/api/Destinations/${id}`, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Language": language,
    },
  });

  return parseApiResponse<ApiResponse<Destination>>(
    response,
    "Unable to load destination.",
  );
}

export async function createDestination(values: DestinationFormValues) {
  const response = await adminFetch("/api/Destinations", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
    },
    body: buildDestinationFormData(values),
  });

  return parseApiResponse<ApiResponse<Destination>>(
    response,
    "Unable to create destination.",
  );
}

export async function updateDestination(values: DestinationFormValues) {
  const response = await adminFetch("/api/Destinations", {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
    },
    body: buildDestinationFormData(values),
  });

  return parseApiResponse<ApiResponse<Destination>>(
    response,
    "Unable to update destination.",
  );
}

export async function deleteDestination(id: number) {
  const response = await adminFetch(`/api/Destinations/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
    },
  });

  return parseApiResponse<ApiResponse<string>>(
    response,
    "Unable to delete destination.",
  );
}

export async function updateDestinationImage(id: number, imageFile: File) {
  const formData = new FormData();
  formData.append("imageFile", imageFile);

  const response = await adminFetch(`/api/Destinations/${id}/image`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
    },
    body: formData,
  });

  return parseApiResponse<ApiResponse<Destination>>(
    response,
    "Unable to update destination image.",
  );
}

export async function deleteDestinationImage(id: number) {
  const response = await adminFetch(`/api/Destinations/${id}/image`, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
    },
  });

  return parseApiResponse<ApiResponse<string>>(
    response,
    "Unable to delete destination image.",
  );
}
