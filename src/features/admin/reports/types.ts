export type ReportPeriod = "daily" | "monthly" | "yearly";

export type TripReport = {
  tripTitle: string | null;
  bookingCount: number;
};

export type ReportData = {
  totalBookings: number;
  totalRevenue: number;
  newCustomers: number;
  topTrips: TripReport[] | null;
};

export type ApiResponse<TData> = {
  success: boolean;
  message: string;
  data: TData;
};
