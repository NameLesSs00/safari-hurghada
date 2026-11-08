import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { getBlogImageUrl } from "@/src/features/admin/blogs/api";
import type { Blog } from "@/src/features/admin/blogs/types";
import { getApiUrl, getLanguageHeaders } from "@/src/shared/config/api";
import type { AppLocale } from "@/src/i18n/locales";

interface BlogResponse {
  success: boolean;
  message: string;
  data: Blog;
}

async function fetchBlog(id: number, locale: AppLocale): Promise<Blog> {
  const response = await fetch(getApiUrl(`/api/Blogs/${id}`), {
    headers: getLanguageHeaders(locale),
  });

  if (!response.ok) throw new Error("Failed to fetch blog");

  const json: BlogResponse = await response.json();
  if (!json.success) throw new Error(json.message || "Failed to load blog");

  return {
    ...json.data,
    imageUrl: getBlogImageUrl(json.data.imageUrl),
    blogSections: json.data.blogSections
      .map((section) => ({
        ...section,
        imageUrl: getBlogImageUrl(section.imageUrl),
      }))
      .sort((a, b) => a.sectionNumber - b.sectionNumber),
  };
}

export function useGetBlogQuery(id: number) {
  const locale = useLocale() as AppLocale;

  return useQuery({
    queryKey: ["blog", locale, id],
    queryFn: () => fetchBlog(id, locale),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
}
