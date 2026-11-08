import { adminFetch, parseApiResponse } from "@/src/features/admin/auth/api";
import { getApiUrl } from "@/src/shared/config/api";

import type {
  ApiResponse,
  Blog,
  BlogFormValues,
  BlogListParams,
} from "./types";

function getJsonHeaders() {
  return {
    Accept: "application/json, text/plain, */*",
  };
}

function getBlogPayload(values: BlogFormValues) {
  return {
    id: values.id,
    title: values.title.trim(),
    content: values.content.trim(),
    blogSections: values.blogSections
      .map((section) => ({
        id: section.id,
        sectionNumber: section.sectionNumber,
        title: section.title.trim(),
        content: section.content.trim(),
      }))
      .sort((a, b) => a.sectionNumber - b.sectionNumber),
  };
}

function getImageFormData(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return formData;
}

export function getBlogImageUrl(imageUrl: string | null) {
  if (!imageUrl) {
    return "";
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  return getApiUrl(imageUrl);
}

export async function getBlogs(params: BlogListParams) {
  const searchParams = new URLSearchParams();
  searchParams.set("PageNumber", String(params.pageNumber));
  searchParams.set("PageSize", String(params.pageSize));

  const response = await adminFetch(`/api/Blogs?${searchParams}`, {
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<Blog[]>>(
    response,
    "Unable to load blogs.",
  );
}

export async function getBlogById(id: number) {
  const response = await adminFetch(`/api/Blogs/${id}`, {
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<Blog>>(
    response,
    "Unable to load blog.",
  );
}

export async function createBlog(values: BlogFormValues) {
  const response = await adminFetch("/api/Blogs", {
    method: "POST",
    headers: {
      ...getJsonHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getBlogPayload(values)),
  });

  return parseApiResponse<ApiResponse<Blog>>(
    response,
    "Unable to create blog.",
  );
}

export async function updateBlog(id: number, values: BlogFormValues) {
  const response = await adminFetch(`/api/Blogs/${id}`, {
    method: "PUT",
    headers: {
      ...getJsonHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getBlogPayload({ ...values, id })),
  });

  return parseApiResponse<ApiResponse<Blog>>(
    response,
    "Unable to update blog.",
  );
}

export async function deleteBlog(id: number) {
  const response = await adminFetch(`/api/Blogs/${id}`, {
    method: "DELETE",
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<string>>(
    response,
    "Unable to delete blog.",
  );
}

export async function uploadBlogImage(blogId: number, file: File) {
  const response = await adminFetch(`/api/Blogs/image?blogid=${blogId}`, {
    method: "POST",
    headers: getJsonHeaders(),
    body: getImageFormData(file),
  });

  return parseApiResponse<ApiResponse<string>>(
    response,
    "Unable to upload blog image.",
  );
}

export async function uploadSectionImage(
  blogId: number,
  sectionId: number,
  file: File,
) {
  const response = await adminFetch(
    `/api/Blogs/section/image?blogid=${blogId}&sectionid=${sectionId}`,
    {
      method: "POST",
      headers: getJsonHeaders(),
      body: getImageFormData(file),
    },
  );

  return parseApiResponse<ApiResponse<string>>(
    response,
    "Unable to upload section image.",
  );
}

export async function deleteBlogImage(blogId: number) {
  const response = await adminFetch(`/api/Blogs/${blogId}/image`, {
    method: "DELETE",
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<string>>(
    response,
    "Unable to delete blog image.",
  );
}

export async function deleteSectionImage(sectionId: number) {
  const response = await adminFetch(`/api/Blogs/section/${sectionId}/image`, {
    method: "DELETE",
    headers: getJsonHeaders(),
  });

  return parseApiResponse<ApiResponse<string>>(
    response,
    "Unable to delete section image.",
  );
}
