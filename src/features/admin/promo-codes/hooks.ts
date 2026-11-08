"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createPromoCode,
  getPromoCodes,
  getRelatedTripPromoCodes,
  getNonRelatedTripPromoCodes,
} from "./api";
import type { PromoCodeFormValues, PromoCodeListParams } from "./types";

const promoCodesQueryKey = ["admin", "promo-codes"] as const;

export function usePromoCodesQuery(params: PromoCodeListParams) {
  return useQuery({
    queryKey: [...promoCodesQueryKey, "all", params],
    queryFn: () => getPromoCodes(params),
  });
}

export function useRelatedTripPromoCodesQuery(params: PromoCodeListParams) {
  return useQuery({
    queryKey: [...promoCodesQueryKey, "related", params],
    queryFn: () => getRelatedTripPromoCodes(params),
  });
}

export function useNonRelatedTripPromoCodesQuery(params: PromoCodeListParams) {
  return useQuery({
    queryKey: [...promoCodesQueryKey, "nonrelated", params],
    queryFn: () => getNonRelatedTripPromoCodes(params),
  });
}

export function useCreatePromoCodeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: PromoCodeFormValues) => createPromoCode(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: promoCodesQueryKey });
    },
  });
}
