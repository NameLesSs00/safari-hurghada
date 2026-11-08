import {
  adminContentLanguages,
  type AdminContentLanguage,
} from "@/src/features/admin/shared/languages";

export const destinationLanguages = adminContentLanguages;

export type DestinationLanguage = AdminContentLanguage;

export type Destination = {
  id: number;
  name: string;
  imageUrl: string;
  isFeatured: boolean;
  tripsCount: number;
};

export type DestinationNames = {
  en: string;
  fr: string;
  ru: string;
  ro: string;
};

export type DestinationListParams = {
  pageNumber: number;
  pageSize: number;
  searchTerm: string;
  language: DestinationLanguage;
};

export type DestinationFormValues = {
  id?: number;
  names: DestinationNames;
  isFeatured: boolean;
  imageFile?: File | null;
};

export type ApiResponse<TData> = {
  success: boolean;
  message: string;
  data: TData;
};
