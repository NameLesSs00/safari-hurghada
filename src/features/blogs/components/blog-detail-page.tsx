"use client";

import { useGetBlogQuery } from "@/src/features/blogs/api/get-blog";
import { useGetBlogsQuery } from "@/src/features/blogs/api/get-blogs";
import { BlogDetailHero } from "./blog-detail/blog-detail-hero";
import { BlogDetailContent } from "./blog-detail/blog-detail-content";
import { BlogDetailSidebar } from "./blog-detail/blog-detail-sidebar";
import Link from "next/link";
import { useEffect } from "react";
import { extractIdFromSlug, generateSlug } from "@/src/features/tours/utils/slugify";

interface BlogDetailPageProps {
  slug: string;
}

export function BlogDetailPage({ slug }: BlogDetailPageProps) {
  const id = extractIdFromSlug(slug) ?? 0;
  const { data: blog, isLoading, error } = useGetBlogQuery(id);
  const { data: recentBlogs } = useGetBlogsQuery({ pageSize: 3, pageNumber: 1 });

  useEffect(() => {
    if (blog && blog.title && id) {
      const expectedSlug = generateSlug(blog.id, blog.title);
      if (slug !== expectedSlug) {
        const newUrl = window.location.pathname.replace(slug, expectedSlug) + window.location.search;
        window.history.replaceState(null, "", newUrl);
      }
    }
  }, [blog, slug, id]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--color-ocean)] border-t-transparent" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC]">
        <p className="mb-4 text-xl text-red-500">Failed to load blog post.</p>
        <Link href="/blogs" className="text-[var(--color-ocean)] hover:underline">
          &larr; Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <BlogDetailHero title={blog.title} />

      <div className="mx-auto w-full max-w-[1280px] px-5 py-8 sm:px-8 lg:grid lg:grid-cols-[1fr_320px] lg:gap-8 lg:px-0 lg:py-12 xl:gap-12">
        <BlogDetailContent blog={blog} />
        <BlogDetailSidebar blog={blog} recentBlogs={recentBlogs || []} />
      </div>
    </div>
  );
}
