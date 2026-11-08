import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { getApiUrl, getLanguageHeaders } from "@/src/shared/config/api";
import type { AppLocale } from "@/src/i18n/locales";

export interface CreateReviewPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tripId: number;
  comment: string;
  rate: number;
}

async function submitReview(payload: CreateReviewPayload, locale: AppLocale) {
  const response = await fetch(getApiUrl("/api/Reviews"), {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      ...getLanguageHeaders(locale),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to submit review");
  }

  const json = await response.json();

  if (!json.success) {
    throw new Error(json.message || "Failed to submit review");
  }

  return json;
}

export function useCreateReviewMutation() {
  const queryClient = useQueryClient();
  const locale = useLocale() as AppLocale;

  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => submitReview(payload, locale),
    onSuccess: (_, variables) => {
      // Invalidate the reviews query for this trip so it refetches
      queryClient.invalidateQueries({
        queryKey: ["reviews", "trip", locale, variables.tripId],
      });
    },
  });
}
