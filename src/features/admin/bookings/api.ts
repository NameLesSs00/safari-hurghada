import { adminFetch, parseApiResponse } from "@/src/features/admin/auth/api";

import type {
  ApiResponse,
  Booking,
  BookingFormValues,
  BookingListParams,
  BookingStatusValue,
} from "./types";

const jsonHeaders = {
  Accept: "application/json, text/plain, */*",
};

export async function getBookings(params: BookingListParams) {
  const searchParams = new URLSearchParams();
  searchParams.set("PageNumber", String(params.pageNumber));
  searchParams.set("PageSize", String(params.pageSize));

  if (params.status !== undefined) {
    searchParams.set("Status", String(params.status));
  }

  if (params.nationality?.trim()) {
    searchParams.set("Nationality", params.nationality.trim());
  }

  if (params.phone?.trim()) {
    searchParams.set("Phone", params.phone.trim());
  }

  if (params.searchItem?.trim()) {
    searchParams.set("SearchItem", params.searchItem.trim());
  }

  if (params.date) {
    searchParams.set("Date", params.date);
  }

  if (params.tripId !== undefined) {
    searchParams.set("TripId", String(params.tripId));
  }

  const response = await adminFetch(`/api/Bookings?${searchParams}`, {
    headers: jsonHeaders,
  });

  return parseApiResponse<ApiResponse<Booking[]>>(
    response,
    "Unable to load bookings.",
  );
}

export async function getBookingById(id: number) {
  const response = await adminFetch(`/api/Bookings/${id}`, {
    headers: jsonHeaders,
  });

  return parseApiResponse<ApiResponse<Booking>>(
    response,
    "Unable to load booking.",
  );
}

export async function createBooking(values: BookingFormValues) {
  const response = await adminFetch("/api/Bookings", {
    method: "POST",
    headers: {
      ...jsonHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return parseApiResponse<ApiResponse<Booking>>(
    response,
    "Unable to create booking.",
  );
}

export async function deleteBooking(id: number) {
  const response = await adminFetch(`/api/Bookings/${id}`, {
    method: "DELETE",
    headers: jsonHeaders,
  });

  return parseApiResponse<ApiResponse<string>>(
    response,
    "Unable to delete booking.",
  );
}

export async function confirmBooking(id: number) {
  const response = await adminFetch(`/api/Bookings/confirm?id=${id}`, {
    method: "PUT",
    headers: jsonHeaders,
  });

  return parseApiResponse<ApiResponse<Booking>>(
    response,
    "Unable to confirm booking.",
  );
}

export async function finishBooking(id: number) {
  const response = await adminFetch(`/api/Bookings/finish?id=${id}`, {
    method: "PUT",
    headers: jsonHeaders,
  });

  return parseApiResponse<ApiResponse<Booking>>(
    response,
    "Unable to finish booking.",
  );
}
