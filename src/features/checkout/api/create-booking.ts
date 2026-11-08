import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { getApiUrl, getLanguageHeaders } from "@/src/shared/config/api";
import type { AppLocale } from "@/src/i18n/locales";

export interface TripBookingInput {
  tripId: number;
  noAdult: number;
  noChild: number;
  leaveDate: string; // YYYY-MM-DD
}

export interface CreateBookingPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  code: string | null;
  nationality: string;
  hotelName?: string;
  roomNo?: string;
  tripsBookings: TripBookingInput[];
}

export interface BookingResponseData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  bookingDate: string;
  hotelName: string;
  roomNo: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  tripsBookings: {
    id: number;
    tripId: number;
    title: string;
    priceForChild: number;
    priceForAdult: number;
    noAdult: number;
    noChild: number;
    leaveDate: string;
    subTotal: number;
  }[];
}

async function createBooking(
  payload: CreateBookingPayload,
  locale: AppLocale,
): Promise<BookingResponseData> {
  const response = await fetch(getApiUrl("/api/Bookings"), {
    method: "POST",
    headers: {
      "Accept": "text/plain",
      "Content-Type": "application/json",
      ...getLanguageHeaders(locale),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create booking");
  }

  const json = await response.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to create booking");
  }

  return json.data;
}

export function useCreateBookingMutation() {
  const locale = useLocale() as AppLocale;

  return useMutation({
    mutationFn: (payload: CreateBookingPayload) =>
      createBooking(payload, locale),
  });
}
