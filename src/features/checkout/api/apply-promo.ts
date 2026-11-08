import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { getApiUrl, getLanguageHeaders } from "@/src/shared/config/api";
import type { AppLocale } from "@/src/i18n/locales";

export interface PromoCodeResponse {
  id: number;
  code: number;
  discountEuro: number;
  discountpercent: number;
  limited: number;
  tripId: number;
  tripName: string | null;
  tripType: string | null;
  priceForChild: number;
  priceForAdult: number;
  createdAt: string | null;
  createdBy: string;
}

async function fetchPromoCode(
  code: string,
  locale: AppLocale,
): Promise<PromoCodeResponse> {
  const response = await fetch(getApiUrl(`/api/PromoCodes/code/${code}`), {
    headers: getLanguageHeaders(locale),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Invalid promo code");
    }
    throw new Error("Failed to apply promo code");
  }

  const json = await response.json();

  if (!json.success) {
    throw new Error(json.message || "Invalid promo code");
  }

  return json.data;
}

export function useApplyPromoMutation() {
  const locale = useLocale() as AppLocale;

  return useMutation({
    mutationFn: (code: string) => fetchPromoCode(code, locale),
  });
}
