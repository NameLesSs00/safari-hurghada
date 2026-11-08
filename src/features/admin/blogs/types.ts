export type BlogSection = {
  id: number;
  sectionNumber: number;
  title: string;
  content: string;
  imageUrl: string | null;
  blogId: number;
};

export type Blog = {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  blogSections: BlogSection[];
};

export type BlogSectionFormValues = {
  id?: number;
  sectionNumber: number;
  title: string;
  content: string;
  imageFile?: File | null;
  imagePreviewUrl?: string;
};

export type BlogFormValues = {
  id?: number;
  title: string;
  content: string;
  imageFile?: File | null;
  blogSections: BlogSectionFormValues[];
};

export type BlogListParams = {
  pageNumber: number;
  pageSize: number;
};

export type ApiResponse<TData> = {
  success: boolean;
  message: string;
  data: TData;
};
