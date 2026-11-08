import { adminFetch, parseApiResponse } from "@/src/features/admin/auth/api";

import type {
  ApiResponse,
  Review,
  ReviewFormValues,
  ReviewListParams,
  TripReviewAverage,
} from "./types";

function getJsonHeaders() {
  return {
    Accept: "application/json, text/plain, */*",
  };
}

export async function getReviews(params: ReviewListParams) {
  const searchParams = new URLSearchParams();
  searchParams.set("PageNumber", String(params.pageNumber));
  searchParams.set("PageSize", String(params.pageSize));

  if (params.tripId.trim()) {
    searchParams.set("TripId", params.tripId.trim());
  }

  const response = await adminFetch(`/api/Reviews?${searchParams}`, {
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<Review[]>>(
    response,
    "Unable to load reviews.",
  );
}

export async function getReviewById(id: number) {
  const response = await adminFetch(`/api/Reviews/${id}`, {
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<Review>>(
    response,
    "Unable to load review.",
  );
}

export async function createReview(values: ReviewFormValues) {
  const response = await adminFetch("/api/Reviews", {
    method: "POST",
    headers: {
      ...getJsonHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      tripId: values.tripId,
      comment: values.comment.trim(),
      rate: values.rate,
    }),
  });

  return parseApiResponse<ApiResponse<Review>>(
    response,
    "Unable to create review.",
  );
}

export async function deleteReview(id: number) {
  const response = await adminFetch(`/api/Reviews/${id}`, {
    method: "DELETE",
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<string>>(
    response,
    "Unable to delete review.",
  );
}

export async function getTripReviewAverage(tripId: number) {
  const response = await adminFetch(`/api/Reviews/trip/${tripId}/average`, {
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<TripReviewAverage>>(
    response,
    "Unable to load trip review average.",
  );
}
