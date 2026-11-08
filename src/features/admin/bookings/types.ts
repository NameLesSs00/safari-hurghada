export const bookingStatuses = [0, 1, 2, 3] as const;

export type BookingStatusValue = (typeof bookingStatuses)[number];

export const bookingStatusLabels: Record<BookingStatusValue, string> = {
  0: "Pending",
  1: "Confirmed",
  2: "Finished",
  3: "Cancelled",
};

export type TripBookingItem = {
  id: number;
  tripId: number;
  title: string;
  priceForChild: number;
  priceForAdult: number;
  noAdult: number;
  noChild: number;
  leaveDate: string;
  subTotal: number;
};

export type Booking = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  hotelName: string;
  roomNo: string;
  bookingDate: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  tripsBookings: TripBookingItem[];
};

export type BookingFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  code: number | null;
  nationality: string;
  tripsBookings: {
    tripId: number;
    noAdult: number;
    noChild: number;
    leaveDate: string;
  }[];
};

export type BookingListParams = {
  pageNumber: number;
  pageSize: number;
  status?: BookingStatusValue;
  nationality?: string;
  phone?: string;
  searchItem?: string;
  date?: string;
  tripId?: number;
};

export type ApiResponse<TData> = {
  success: boolean;
  message: string;
  data: TData;
};
