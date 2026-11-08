export type PromoCode = {
  id: number;
  code: number;
  discountEuro: number;
  discountpercent: number;
  limited: number;
  tripId: number | null;
  tripName: string | null;
  tripType: string | null;
  priceForChild: number;
  priceForAdult: number;
  createdAt: string | null;
  createdBy: string;
};

export type PromoCodeSummary = {
  id: number;
  code: number;
  discountEuro: number;
  discountpercent: number;
  limited: number;
  isActived: boolean;
};

export type PromoCodeCreatedData = {
  id: number;
  code: number;
};

export type PromoCodeFormValues = {
  discountEuro: number | null;
  discountpercent: number | null;
  limited: number;
  tripId: number | null;
};

export type PromoCodeListParams = {
  pageNumber: number;
  pageSize: number;
};

export type ApiResponse<TData> = {
  success: boolean;
  message: string;
  data: TData;
};
