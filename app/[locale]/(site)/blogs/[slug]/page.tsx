import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogDetailPage } from "@/src/features/blogs/components/blog-detail-page";
import { fetchBlog } from "@/src/features/blogs/api/get-blog";
import { fetchBlogs } from "@/src/features/blogs/api/get-blogs";
import { extractIdFromSlug } from "@/src/features/tours/utils/slugify";
import type { AppLocale } from "@/src/i18n/locales";
import type { Blog } from "@/src/features/admin/blogs/types";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { locale, slug } = await params;
    const id = extractIdFromSlug(slug);
    if (!id) throw new Error("Invalid Blog ID");

    const blog = await fetchBlog(Number(id), locale as AppLocale);
    const snippet = blog.content.substring(0, 160).replace(/[#*`~]/g, "") + "...";

    return {
      title: `${blog.title} | SunnySide Tours`,
      description: snippet,
      openGraph: {
        title: `${blog.title} | SunnySide Tours`,
        description: snippet,
        images: blog.imageUrl ? [{ url: blog.imageUrl }] : undefined,
      },
    };
  } catch {
    return {
      title: "Blog Post | SunnySide Tours",
      description: "Read our latest travel stories and guides about Egypt.",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;
  const id = extractIdFromSlug(slug);

  if (!id) {
    notFound();
  }

  let blog: Blog | null = null;
  try {
    blog = await fetchBlog(Number(id), locale as AppLocale);
  } catch {
    notFound();
  }

  if (!blog) {
    notFound();
  }

  let recentBlogs: Blog[] = [];
  try {
    const recents = await fetchBlogs({ pageSize: 4, pageNumber: 1 }, locale as AppLocale);
    recentBlogs = recents.filter((b) => b.id !== blog.id).slice(0, 3);
  } catch {
    recentBlogs = [];
  }

  return (
    <BlogDetailPage
      slug={slug}
      initialBlog={blog}
      initialRecentBlogs={recentBlogs}
    />
  );
}
