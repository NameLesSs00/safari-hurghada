export type GalleryImage = {
  id: number;
  imageUrl: string;
  isFeatured: boolean;
};

export type AddGalleryImageValues = {
  imageFile: File;
  isFeatured: boolean;
};

export type ApiResponse<TData> = {
  success: boolean;
  message: string;
  data: TData;
};
