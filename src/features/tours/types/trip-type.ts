export interface TripType {
  id: number;
  name: string;
}

export interface TripTypesResponse {
  success: boolean;
  message: string;
  data: TripType[];
}
