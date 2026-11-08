"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addGalleryImage,
  deleteGalleryImage,
  getGalleryImageById,
  getGalleryImages,
} from "./api";
import type { AddGalleryImageValues } from "./types";

const galleryQueryKey = ["admin", "gallery"] as const;

export function useGalleryImagesQuery() {
  return useQuery({
    queryKey: galleryQueryKey,
    queryFn: () => getGalleryImages(),
  });
}

export function useGalleryImageQuery(id: number | null) {
  return useQuery({
    enabled: Boolean(id),
    queryKey: [...galleryQueryKey, "detail", id],
    queryFn: () => getGalleryImageById(id as number),
  });
}

export function useAddGalleryImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: AddGalleryImageValues) => addGalleryImage(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: galleryQueryKey });
    },
  });
}

export function useDeleteGalleryImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteGalleryImage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: galleryQueryKey });
    },
  });
}
