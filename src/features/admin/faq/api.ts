import { adminFetch, parseApiResponse } from "@/src/features/admin/auth/api";

import type {
  ApiResponse,
  FaqFormValues,
  FaqLanguage,
  FaqListParams,
  FaqQuestion,
} from "./types";

function getJsonHeaders(language?: FaqLanguage) {
  return {
    Accept: "application/json, text/plain, */*",
    ...(language ? { "Accept-Language": language } : {}),
  };
}

export async function getFaqQuestions(params: FaqListParams) {
  const searchParams = new URLSearchParams();
  searchParams.set("PageNumber", String(params.pageNumber));
  searchParams.set("PageSize", String(params.pageSize));

  const response = await adminFetch(`/api/Questions?${searchParams}`, {
    headers: getJsonHeaders(params.language),
  });

  return parseApiResponse<ApiResponse<FaqQuestion[]>>(
    response,
    "Unable to load FAQ.",
  );
}

export async function getFaqQuestionById(id: number, language: FaqLanguage) {
  const response = await adminFetch(`/api/Questions/${id}`, {
    headers: getJsonHeaders(language),
  });

  return parseApiResponse<ApiResponse<FaqQuestion>>(
    response,
    "Unable to load FAQ item.",
  );
}

export async function createFaqQuestion(values: FaqFormValues) {
  const response = await adminFetch("/api/Questions", {
    method: "POST",
    headers: {
      ...getJsonHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: values.text,
      answer: values.answer,
    }),
  });

  return parseApiResponse<ApiResponse<FaqQuestion>>(
    response,
    "Unable to create FAQ item.",
  );
}

export async function updateFaqQuestion(values: FaqFormValues) {
  const response = await adminFetch("/api/Questions", {
    method: "PUT",
    headers: {
      ...getJsonHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: values.id,
      text: values.text,
      answer: values.answer,
    }),
  });

  return parseApiResponse<ApiResponse<FaqQuestion>>(
    response,
    "Unable to update FAQ item.",
  );
}

export async function deleteFaqQuestion(id: number) {
  const response = await adminFetch(`/api/Questions/${id}`, {
    method: "DELETE",
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<string>>(
    response,
    "Unable to delete FAQ item.",
  );
}
