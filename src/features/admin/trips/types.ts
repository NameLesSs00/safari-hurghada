import {
  adminContentLanguages,
  type AdminContentLanguage,
} from "@/src/features/admin/shared/languages";

export const tripLanguages = adminContentLanguages;

export type TripLanguage = AdminContentLanguage;

export type LocalizedText = {
  en: string;
  fr: string;
  ru: string;
  ro: string;
};

export type DestinationInfo = {
  id: number;
  name: string;
  imageUrl: string;
  isFeatured: boolean;
};

export type TripImage = {
  id: number;
  imageUrl: string;
  isPrimary?: boolean;
};

export type UploadedTripImage = {
  id: number;
  imageUrl: string;
};

export type Trip = {
  id: number;
  markerID: string;
  destinationInfo: DestinationInfo | null;
  destination: string | null;
  name: string;
  description: string;
  timeFrom: string;
  durationValue: number;
  durationTypeName: string;
  adultPrice: number;
  childPrice: number;
  currencyName: string;
  isActive: boolean;
  tripTypeName: string;
  createdBy: string;
  createdAt: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  whatToBring: string[];
  availableDays: string[];
  images: TripImage[];
};

export type TripTranslations = {
  name: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedText[];
  includes: LocalizedText[];
  excludes: LocalizedText[];
  whatToBring: LocalizedText[];
};

export type TripFormValues = TripTranslations & {
  id?: number;
  destinationId: number;
  timeFrom: string;
  durationValue: number;
  durationType: number;
  adultPrice: number;
  childPrice: number;
  tripTypeId: number;
  availabilityDayNo: number[];
};

export type TripListParams = {
  pageNumber: number;
  pageSize: number;
  language: TripLanguage;
  minPrice?: string;
  maxPrice?: string;
  typeId?: string;
  destinationId?: string;
  destination?: string;
  searchItem?: string;
  includeInactive: boolean;
};

export type ApiResponse<TData> = {
  success: boolean;
  message: string;
  data: TData;
};
