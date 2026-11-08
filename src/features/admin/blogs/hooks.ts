"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createBlog,
  deleteBlog,
  deleteBlogImage,
  deleteSectionImage,
  getBlogById,
  getBlogs,
  updateBlog,
  uploadBlogImage,
  uploadSectionImage,
} from "./api";
import type { BlogFormValues, BlogListParams } from "./types";

const blogsQueryKey = ["admin", "blogs"] as const;

export function useBlogsQuery(params: BlogListParams) {
  return useQuery({
    queryKey: [...blogsQueryKey, params],
    queryFn: () => getBlogs(params),
  });
}

export function useBlogQuery(id: number | null) {
  return useQuery({
    enabled: Boolean(id),
    queryKey: [...blogsQueryKey, "detail", id],
    queryFn: () => getBlogById(id as number),
  });
}

export function useCreateBlogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: BlogFormValues) => createBlog(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogsQueryKey });
    },
  });
}

export function useUpdateBlogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: BlogFormValues }) =>
      updateBlog(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogsQueryKey });
    },
  });
}

export function useDeleteBlogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogsQueryKey });
    },
  });
}

export function useUploadBlogImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ blogId, file }: { blogId: number; file: File }) =>
      uploadBlogImage(blogId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogsQueryKey });
    },
  });
}

export function useUploadSectionImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      blogId,
      file,
      sectionId,
    }: {
      blogId: number;
      file: File;
      sectionId: number;
    }) => uploadSectionImage(blogId, sectionId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogsQueryKey });
    },
  });
}

export function useDeleteBlogImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blogId: number) => deleteBlogImage(blogId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogsQueryKey });
    },
  });
}

export function useDeleteSectionImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sectionId: number) => deleteSectionImage(sectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogsQueryKey });
    },
  });
}
