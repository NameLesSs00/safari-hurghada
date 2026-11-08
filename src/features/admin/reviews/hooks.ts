"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createReview,
  deleteReview,
  getReviewById,
  getReviews,
  getTripReviewAverage,
} from "./api";
import type { ReviewFormValues, ReviewListParams } from "./types";

const reviewsQueryKey = ["admin", "reviews"] as const;

export function useReviewsQuery(params: ReviewListParams) {
  return useQuery({
    queryKey: [...reviewsQueryKey, params],
    queryFn: () => getReviews(params),
  });
}

export function useReviewQuery(id: number | null) {
  return useQuery({
    enabled: Boolean(id),
    queryKey: [...reviewsQueryKey, "detail", id],
    queryFn: () => getReviewById(id as number),
  });
}

export function useTripReviewAverageQuery(tripId: number | null) {
  return useQuery({
    enabled: Boolean(tripId),
    queryKey: [...reviewsQueryKey, "average", tripId],
    queryFn: () => getTripReviewAverage(tripId as number),
  });
}

export function useCreateReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: ReviewFormValues) => createReview(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewsQueryKey });
    },
  });
}

export function useDeleteReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewsQueryKey });
    },
  });
}
