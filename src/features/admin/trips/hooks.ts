"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createTrip,
  deactivateTrip,
  deleteTripImage,
  getTripByMarker,
  getTrips,
  getTripsByType,
  getTripTranslations,
  reactivateTrip,
  setPrimaryTripImage,
  updateTrip,
  uploadTripImages,
} from "./api";
import type { TripFormValues, TripLanguage, TripListParams } from "./types";

const tripsQueryKey = ["admin", "trips"] as const;

export function useTripsQuery(params: TripListParams) {
  return useQuery({
    queryKey: [...tripsQueryKey, params],
    queryFn: () => getTrips(params),
  });
}

export function useTripTranslationsQuery(id: number | null) {
  return useQuery({
    enabled: Boolean(id),
    queryKey: [...tripsQueryKey, "translations", id],
    queryFn: () => getTripTranslations(id as number),
  });
}

export function useTripsByTypeQuery({
  enabled = true,
  language,
  pageNumber,
  pageSize,
  typeId,
}: {
  enabled?: boolean;
  language: TripLanguage;
  pageNumber: number;
  pageSize: number;
  typeId: number | null;
}) {
  return useQuery({
    enabled: enabled && Boolean(typeId),
    queryKey: [...tripsQueryKey, "type", typeId, pageNumber, pageSize, language],
    queryFn: () =>
      getTripsByType(typeId as number, { language, pageNumber, pageSize }),
  });
}

export function useTripMarkerQuery(
  markerId: string,
  language: TripLanguage,
) {
  return useQuery({
    enabled: Boolean(markerId.trim()),
    queryKey: [...tripsQueryKey, "marker", markerId, language],
    queryFn: () => getTripByMarker(markerId.trim(), language),
  });
}

export function useCreateTripMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: TripFormValues) => createTrip(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tripsQueryKey });
    },
  });
}

export function useUpdateTripMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: TripFormValues) => updateTrip(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tripsQueryKey });
    },
  });
}

export function useDeactivateTripMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deactivateTrip(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tripsQueryKey });
    },
  });
}

export function useReactivateTripMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => reactivateTrip(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tripsQueryKey });
    },
  });
}

export function useUploadTripImagesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ files, id }: { files: File[]; id: number }) =>
      uploadTripImages(id, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tripsQueryKey });
    },
  });
}

export function useDeleteTripImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, imageId }: { id: number; imageId: number }) =>
      deleteTripImage(id, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tripsQueryKey });
    },
  });
}

export function useSetPrimaryTripImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, imageId }: { id: number; imageId: number }) =>
      setPrimaryTripImage(id, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tripsQueryKey });
    },
  });
}
