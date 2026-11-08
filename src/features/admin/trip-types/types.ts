import {
  adminContentLanguages,
  type AdminContentLanguage,
} from "@/src/features/admin/shared/languages";

export const tripTypeLanguages = adminContentLanguages;

export type TripTypeLanguage = AdminContentLanguage;

export type TripType = {
  id: number;
  name: string;
  imageUrl?: string;
};

export type TripTypeNames = {
  en: string;
  fr: string;
  ru: string;
  ro: string;
};

export type TripTypeFormValues = {
  id?: number;
  name: TripTypeNames;
  image: File | null;
};

export type TripTypeListParams = {
  pageNumber: number;
  pageSize: number;
  language: TripTypeLanguage;
};

export type ApiResponse<TData> = {
  success: boolean;
  message: string;
  data: TData;
};
