import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { getBlogImageUrl } from "@/src/features/admin/blogs/api";
import type { Blog } from "@/src/features/admin/blogs/types";
import { getApiUrl, getLanguageHeaders } from "@/src/shared/config/api";
import type { AppLocale } from "@/src/i18n/locales";

interface BlogsResponse {
  success: boolean;
  message: string;
  data: Blog[];
}

interface UseGetBlogsQueryOptions {
  pageSize?: number;
  pageNumber?: number;
}

async function fetchBlogs(
  { pageSize = 6, pageNumber = 1 }: UseGetBlogsQueryOptions,
  locale: AppLocale,
): Promise<Blog[]> {
  const params = new URLSearchParams({
    PageNumber: pageNumber.toString(),
    PageSize: pageSize.toString(),
  });

  const response = await fetch(getApiUrl(`/api/Blogs?${params}`), {
    headers: getLanguageHeaders(locale),
  });

  if (!response.ok) throw new Error("Failed to fetch blogs");

  const json: BlogsResponse = await response.json();
  if (!json.success) throw new Error(json.message || "Failed to load blogs");

  return json.data.map((blog) => ({
    ...blog,
    imageUrl: getBlogImageUrl(blog.imageUrl),
    blogSections: blog.blogSections.map((section) => ({
      ...section,
      imageUrl: getBlogImageUrl(section.imageUrl),
    })),
  }));
}

export function useGetBlogsQuery(options: UseGetBlogsQueryOptions = {}) {
  const locale = useLocale() as AppLocale;

  return useQuery({
    queryKey: ["blogs", locale, options.pageSize, options.pageNumber],
    queryFn: () => fetchBlogs(options, locale),
    staleTime: 1000 * 60 * 5,
  });
}
