export interface TripType {
  id: number;
  name: string;
  imageUrl: string;
}

export interface TripTypesResponse {
  success: boolean;
  message: string;
  data: TripType[];
}
