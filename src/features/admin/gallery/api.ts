import { adminFetch, parseApiResponse } from "@/src/features/admin/auth/api";
import { getApiUrl } from "@/src/shared/config/api";

import type { AddGalleryImageValues, ApiResponse, GalleryImage } from "./types";

function getJsonHeaders() {
  return {
    Accept: "application/json, text/plain, */*",
  };
}

function getGalleryFormData(values: AddGalleryImageValues) {
  const formData = new FormData();
  formData.append("ImageFile", values.imageFile);
  formData.append("IsFeatured", String(values.isFeatured));

  return formData;
}

export function getGalleryImageUrl(imageUrl: string) {
  if (!imageUrl) {
    return "";
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  return getApiUrl(imageUrl);
}

export async function getGalleryImages() {
  const response = await adminFetch("/api/Gallery/GetAllImages", {
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<GalleryImage[]>>(
    response,
    "Unable to load gallery images.",
  );
}

export async function getGalleryImageById(id: number) {
  const response = await adminFetch(`/api/Gallery/GetImageById/${id}`, {
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<GalleryImage>>(
    response,
    "Unable to load gallery image.",
  );
}

export async function addGalleryImage(values: AddGalleryImageValues) {
  const response = await adminFetch("/api/Gallery/AddImage", {
    method: "POST",
    headers: getJsonHeaders(),
    body: getGalleryFormData(values),
  });

  return parseApiResponse<ApiResponse<GalleryImage>>(
    response,
    "Unable to add gallery image.",
  );
}

export async function deleteGalleryImage(id: number) {
  const response = await adminFetch(`/api/Gallery/DeleteImage/${id}`, {
    method: "DELETE",
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<string>>(
    response,
    "Unable to delete gallery image.",
  );
}
