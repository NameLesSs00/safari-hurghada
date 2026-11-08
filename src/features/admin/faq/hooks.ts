"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createFaqQuestion,
  deleteFaqQuestion,
  getFaqQuestionById,
  getFaqQuestions,
  updateFaqQuestion,
} from "./api";
import type { FaqFormValues, FaqListParams } from "./types";
import { faqLanguages } from "./types";

const faqQueryKey = ["admin", "faq"] as const;

export function useFaqQuestionsQuery(params: FaqListParams) {
  return useQuery({
    queryKey: [...faqQueryKey, params],
    queryFn: () => getFaqQuestions(params),
  });
}

export function useFaqQuestionTranslationsQuery(id: number | null) {
  return useQuery({
    enabled: Boolean(id),
    queryKey: [...faqQueryKey, "translations", id],
    queryFn: async () => {
      const responses = await Promise.all(
        faqLanguages.map((language) => getFaqQuestionById(id as number, language)),
      );

      return faqLanguages.reduce(
        (translations, language, index) => ({
          text: {
            ...translations.text,
            [language]: responses[index].data.text,
          },
          answer: {
            ...translations.answer,
            [language]: responses[index].data.answer,
          },
        }),
        {
          text: {
            en: "",
            fr: "",
            ru: "",
            ro: "",
          },
          answer: {
            en: "",
            fr: "",
            ru: "",
            ro: "",
          },
        },
      );
    },
  });
}

export function useCreateFaqQuestionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: FaqFormValues) => createFaqQuestion(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: faqQueryKey });
    },
  });
}

export function useUpdateFaqQuestionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: FaqFormValues) => updateFaqQuestion(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: faqQueryKey });
    },
  });
}

export function useDeleteFaqQuestionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteFaqQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: faqQueryKey });
    },
  });
}
