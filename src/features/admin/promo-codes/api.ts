import { adminFetch, parseApiResponse } from "@/src/features/admin/auth/api";

import type {
  ApiResponse,
  PromoCode,
  PromoCodeCreatedData,
  PromoCodeFormValues,
  PromoCodeListParams,
  PromoCodeSummary,
} from "./types";

const jsonHeaders = {
  Accept: "application/json, text/plain, */*",
};

export async function getPromoCodes(params: PromoCodeListParams) {
  const searchParams = new URLSearchParams();
  searchParams.set("PageNumber", String(params.pageNumber));
  searchParams.set("PageSize", String(params.pageSize));

  const response = await adminFetch(`/api/PromoCodes?${searchParams}`, {
    headers: jsonHeaders,
  });

  return parseApiResponse<ApiResponse<PromoCode[]>>(
    response,
    "Unable to load promo codes.",
  );
}

export async function getNonRelatedTripPromoCodes(
  params: PromoCodeListParams,
) {
  const searchParams = new URLSearchParams();
  searchParams.set("PageNumber", String(params.pageNumber));
  searchParams.set("PageSize", String(params.pageSize));

  const response = await adminFetch(
    `/api/PromoCodes/nonrelatedtrip?${searchParams}`,
    { headers: jsonHeaders },
  );

  return parseApiResponse<ApiResponse<PromoCodeSummary[]>>(
    response,
    "Unable to load non-trip promo codes.",
  );
}

export async function getRelatedTripPromoCodes(params: PromoCodeListParams) {
  const searchParams = new URLSearchParams();
  searchParams.set("PageNumber", String(params.pageNumber));
  searchParams.set("PageSize", String(params.pageSize));

  const response = await adminFetch(
    `/api/PromoCodes/relatedtrip?${searchParams}`,
    { headers: jsonHeaders },
  );

  return parseApiResponse<ApiResponse<PromoCode[]>>(
    response,
    "Unable to load trip-specific promo codes.",
  );
}

export async function getPromoCodeById(id: number) {
  const response = await adminFetch(`/api/PromoCodes/${id}`, {
    headers: jsonHeaders,
  });

  return parseApiResponse<ApiResponse<PromoCode>>(
    response,
    "Unable to load promo code.",
  );
}

export async function getPromoCodeByCode(code: number) {
  const response = await adminFetch(`/api/PromoCodes/code/${code}`, {
    headers: jsonHeaders,
  });

  return parseApiResponse<ApiResponse<PromoCode>>(
    response,
    "Unable to load promo code.",
  );
}

export async function createPromoCode(values: PromoCodeFormValues) {
  const response = await adminFetch("/api/PromoCodes", {
    method: "POST",
    headers: {
      ...jsonHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return parseApiResponse<ApiResponse<PromoCodeCreatedData>>(
    response,
    "Unable to create promo code.",
  );
}
