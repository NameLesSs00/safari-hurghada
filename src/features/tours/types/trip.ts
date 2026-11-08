export interface TripImage {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
}

export interface DestinationInfo {
  id: number;
  name: string;
  imageUrl: string;
  isFeatured: boolean;
}

export interface Trip {
  id: number;
  markerID: string;
  destinationInfo: DestinationInfo;
  destination: string;
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
}

export interface TripsResponse {
  success: boolean;
  message: string;
  data: Trip[];
}
