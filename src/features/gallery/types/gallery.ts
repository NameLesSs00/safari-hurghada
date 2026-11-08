export interface GalleryImage {
  id: number;
  imageUrl: string;
  isFeatured: boolean;
}

export interface GalleryResponse {
  success: boolean;
  message: string;
  data: GalleryImage[];
}
