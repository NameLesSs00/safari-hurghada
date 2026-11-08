"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createTripType,
  deleteTripType,
  getTripTypeById,
  getTripTypes,
  updateTripType,
} from "./api";
import type { TripTypeFormValues, TripTypeListParams } from "./types";
import { tripTypeLanguages } from "./types";

const tripTypesQueryKey = ["admin", "trip-types"] as const;

export function useTripTypesQuery(params: TripTypeListParams) {
  return useQuery({
    queryKey: [...tripTypesQueryKey, params],
    queryFn: () => getTripTypes(params),
  });
}

export function useTripTypeTranslationsQuery(id: number | null) {
  return useQuery({
    enabled: Boolean(id),
    queryKey: [...tripTypesQueryKey, "translations", id],
    queryFn: async () => {
      const responses = await Promise.all(
        tripTypeLanguages.map((language) =>
          getTripTypeById(id as number, language),
        ),
      );

      return tripTypeLanguages.reduce(
        (names, language, index) => ({
          ...names,
          [language]: responses[index].data.name,
        }),
        {
          en: "",
          fr: "",
          ru: "",
          ro: "",
        },
      );
    },
  });
}

export function useCreateTripTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: TripTypeFormValues) => createTripType(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tripTypesQueryKey });
    },
  });
}

export function useUpdateTripTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: TripTypeFormValues) => updateTripType(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tripTypesQueryKey });
    },
  });
}

export function useDeleteTripTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTripType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tripTypesQueryKey });
    },
  });
}
