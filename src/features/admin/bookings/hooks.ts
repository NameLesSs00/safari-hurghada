"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  confirmBooking,
  deleteBooking,
  finishBooking,
  getBookingById,
  getBookings,
} from "./api";
import type { BookingListParams } from "./types";

const bookingsQueryKey = ["admin", "bookings"] as const;

export function useBookingsQuery(params: BookingListParams) {
  return useQuery({
    queryKey: [...bookingsQueryKey, params],
    queryFn: () => getBookings(params),
  });
}

export function useBookingDetailQuery(id: number | null) {
  return useQuery({
    enabled: Boolean(id),
    queryKey: [...bookingsQueryKey, "detail", id],
    queryFn: () => getBookingById(id as number),
  });
}

export function useConfirmBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => confirmBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingsQueryKey });
    },
  });
}

export function useFinishBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => finishBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingsQueryKey });
    },
  });
}

export function useDeleteBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingsQueryKey });
    },
  });
}
