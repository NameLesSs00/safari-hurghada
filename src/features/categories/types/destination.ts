export interface Destination {
  id: number;
  name: string;
  imageUrl: string;
  isFeatured: boolean;
  tripsCount: number;
}

export interface DestinationsResponse {
  success: boolean;
  message: string;
  data: Destination[];
}
