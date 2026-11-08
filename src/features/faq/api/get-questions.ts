import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

import { getApiUrl, getLanguageHeaders } from "@/src/shared/config/api";
import type { AppLocale } from "@/src/i18n/locales";

export interface Question {
  id: number;
  text: string;
  answer: string;
}

interface QuestionsResponse {
  success: boolean;
  message: string;
  data: Question[];
}

interface UseQuestionsQueryOptions {
  pageSize?: number;
  pageNumber?: number;
}

async function fetchQuestions({
  options,
  locale,
}: {
  options: UseQuestionsQueryOptions;
  locale: AppLocale;
}): Promise<Question[]> {
  const { pageSize, pageNumber } = options;
  const params = new URLSearchParams();
  if (pageSize) params.append("PageSize", pageSize.toString());
  if (pageNumber) params.append("PageNumber", pageNumber.toString());

  const url = getApiUrl(`/api/Questions${params.toString() ? `?${params}` : ""}`);

  const response = await fetch(url, {
    headers: getLanguageHeaders(locale),
  });

  if (!response.ok) throw new Error("Failed to fetch questions");

  const json: QuestionsResponse = await response.json();
  if (!json.success) throw new Error(json.message || "Failed to load questions");

  return json.data;
}

export function useQuestionsQuery(options: UseQuestionsQueryOptions = {}) {
  const locale = useLocale() as AppLocale;

  return useQuery({
    queryKey: ["questions", locale, options.pageSize, options.pageNumber],
    queryFn: () => fetchQuestions({ options, locale }),
    staleTime: 1000 * 60 * 5,
  });
}
