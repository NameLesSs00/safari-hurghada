import {
  adminContentLanguages,
  type AdminContentLanguage,
} from "@/src/features/admin/shared/languages";

export const faqLanguages = adminContentLanguages;

export type FaqLanguage = AdminContentLanguage;

export type FaqQuestion = {
  id: number;
  text: string;
  answer: string;
};

export type FaqTranslations = {
  en: string;
  fr: string;
  ru: string;
  ro: string;
};

export type FaqFormValues = {
  id?: number;
  text: FaqTranslations;
  answer: FaqTranslations;
};

export type FaqListParams = {
  pageNumber: number;
  pageSize: number;
  language: FaqLanguage;
};

export type ApiResponse<TData> = {
  success: boolean;
  message: string;
  data: TData;
};
