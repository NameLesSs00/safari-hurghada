export type Review = {
  id: number;
  comment: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  rate: number | null;
  createdAt: string | null;
  tripName: string | null;
  description: string | null;
  markerID: string | null;
  destination: string | null;
  tripTypeName: string | null;
  adultPrice: number;
  childPrice: number;
  currencyName: string | null;
};

export type ReviewListParams = {
  pageNumber: number;
  pageSize: number;
  tripId: string;
};

export type ReviewFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tripId: number;
  comment: string;
  rate: number;
};

export type TripReviewAverage = {
  averageRate: number;
  totalReviews: number;
};

export type ApiResponse<TData> = {
  success: boolean;
  message: string | null;
  data: TData;
};
