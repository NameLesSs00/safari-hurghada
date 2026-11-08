"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createDestination,
  deleteDestination,
  deleteDestinationImage,
  getDestinationById,
  getDestinations,
  updateDestination,
  updateDestinationImage,
} from "./api";
import type {
  DestinationFormValues,
  DestinationLanguage,
  DestinationListParams,
} from "./types";
import { destinationLanguages } from "./types";

const destinationsQueryKey = ["admin", "destinations"] as const;

export function useDestinationsQuery(params: DestinationListParams) {
  return useQuery({
    queryKey: [...destinationsQueryKey, params],
    queryFn: () => getDestinations(params),
  });
}

export function useDestinationQuery(
  id: number | null,
  language: DestinationLanguage,
) {
  return useQuery({
    enabled: Boolean(id),
    queryKey: [...destinationsQueryKey, "detail", id, language],
    queryFn: () => getDestinationById(id as number, language),
  });
}

export function useDestinationTranslationsQuery(id: number | null) {
  return useQuery({
    enabled: Boolean(id),
    queryKey: [...destinationsQueryKey, "translations", id],
    queryFn: async () => {
      const responses = await Promise.all(
        destinationLanguages.map((language) =>
          getDestinationById(id as number, language),
        ),
      );

      return destinationLanguages.reduce(
        (translations, language, index) => ({
          ...translations,
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

export function useCreateDestinationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: DestinationFormValues) => createDestination(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: destinationsQueryKey });
    },
  });
}

export function useUpdateDestinationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: DestinationFormValues) => updateDestination(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: destinationsQueryKey });
    },
  });
}

export function useDeleteDestinationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteDestination(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: destinationsQueryKey });
    },
  });
}

export function useUpdateDestinationImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, imageFile }: { id: number; imageFile: File }) =>
      updateDestinationImage(id, imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: destinationsQueryKey });
    },
  });
}

export function useDeleteDestinationImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteDestinationImage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: destinationsQueryKey });
    },
  });
}
