import { adminFetch, parseApiResponse } from "@/src/features/admin/auth/api";

import type {
  ApiResponse,
  TripType,
  TripTypeFormValues,
  TripTypeLanguage,
  TripTypeListParams,
} from "./types";

function getJsonHeaders(language?: TripTypeLanguage) {
  return {
    Accept: "application/json, text/plain, */*",
    ...(language ? { "Accept-Language": language } : {}),
  };
}

export async function getTripTypes(params: TripTypeListParams) {
  const searchParams = new URLSearchParams();
  searchParams.set("PageNumber", String(params.pageNumber));
  searchParams.set("PageSize", String(params.pageSize));

  const response = await adminFetch(`/api/TripTypes?${searchParams}`, {
    headers: getJsonHeaders(params.language),
  });

  return parseApiResponse<ApiResponse<TripType[]>>(
    response,
    "Unable to load trip types.",
  );
}

export async function getTripTypeById(
  id: number,
  language: TripTypeLanguage,
) {
  const response = await adminFetch(`/api/TripTypes/${id}`, {
    headers: getJsonHeaders(language),
  });

  return parseApiResponse<ApiResponse<TripType>>(
    response,
    "Unable to load trip type.",
  );
}

export async function createTripType(values: TripTypeFormValues) {
  const formData = new FormData();
  const englishName = (typeof values.name === "string" ? values.name : values.name.en).trim();
  formData.append("Name.En", englishName);
  formData.append("Name.Fr", englishName);
  formData.append("Name.Ru", englishName);
  formData.append("Name.Ro", englishName);
  if (values.image) {
    formData.append("Image", values.image);
  }

  const response = await adminFetch("/api/TripTypes", {
    method: "POST",
    headers: getJsonHeaders(),
    body: formData,
  });

  return parseApiResponse<ApiResponse<TripType>>(
    response,
    "Unable to create trip type.",
  );
}

export async function updateTripType(values: TripTypeFormValues) {
  const formData = new FormData();
  if (values.id) formData.append("Id", String(values.id));
  const englishName = (typeof values.name === "string" ? values.name : values.name.en).trim();
  formData.append("Name.En", englishName);
  formData.append("Name.Fr", englishName);
  formData.append("Name.Ru", englishName);
  formData.append("Name.Ro", englishName);
  if (values.image) {
    formData.append("Image", values.image);
  }

  const response = await adminFetch("/api/TripTypes", {
    method: "PUT",
    headers: getJsonHeaders(),
    body: formData,
  });

  return parseApiResponse<ApiResponse<TripType>>(
    response,
    "Unable to update trip type.",
  );
}

export async function deleteTripType(id: number) {
  const response = await adminFetch(`/api/TripTypes/${id}`, {
    method: "DELETE",
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<string>>(
    response,
    "Unable to delete trip type.",
  );
}
