"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useGetBlogQuery } from "@/src/features/blogs/api/get-blog";
import { useGetBlogsQuery } from "@/src/features/blogs/api/get-blogs";
import { BlogDetailHero } from "./blog-detail/blog-detail-hero";
import { BlogDetailContent } from "./blog-detail/blog-detail-content";
import { BlogDetailSidebar } from "./blog-detail/blog-detail-sidebar";
import { ReadingProgressBar } from "./blog-detail/reading-progress-bar";
import { BlogCard } from "./blog-card";
import { extractIdFromSlug, generateSlug } from "@/src/features/tours/utils/slugify";
import type { AppLocale } from "@/src/i18n/locales";
import type { Blog } from "@/src/features/admin/blogs/types";

interface BlogDetailPageProps {
  slug: string;
  initialBlog?: Blog | null;
  initialRecentBlogs?: Blog[];
}

export function BlogDetailPage({
  slug,
  initialBlog,
  initialRecentBlogs,
}: BlogDetailPageProps) {
  const locale = useLocale() as AppLocale;
  const id = extractIdFromSlug(slug) ?? 0;
  const t = useTranslations("BlogDetail");

  const { data: blog, isLoading, error } = useGetBlogQuery(id);
  const { data: recentBlogs } = useGetBlogsQuery({ pageSize: 4, pageNumber: 1 });

  // Use pre-fetched server blog immediately for zero flicker
  const currentBlog = blog || initialBlog;
  const currentRecent = (recentBlogs || initialRecentBlogs || []).filter(
    (b) => b.id !== currentBlog?.id,
  );

  // Compute real reading time from word count (average reading speed: 200 wpm)
  const readingTimeMinutes = (() => {
    if (!currentBlog) return 3;
    const allText = `${currentBlog.content || ""} ${
      currentBlog.blogSections?.map((s) => `${s.title} ${s.content}`).join(" ") || ""
    }`;
    const wordCount = allText.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  })();

  useEffect(() => {
    if (currentBlog && currentBlog.title && id) {
      const expectedSlug = generateSlug(currentBlog.id, currentBlog.title);
      if (slug !== expectedSlug) {
        const newUrl =
          window.location.pathname.replace(slug, expectedSlug) +
          window.location.search;
        window.history.replaceState(null, "", newUrl);
      }
    }
  }, [currentBlog, slug, id]);

  if (isLoading && !currentBlog) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white">
        <div className="h-9 w-9 animate-spin rounded-full border-3 border-[#F36F21] border-t-transparent" />
      </div>
    );
  }

  if ((error || !currentBlog) && !isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-4 text-center">
        <p className="mb-4 text-lg font-bold text-slate-800">
          {t("error.title")}
        </p>
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 rounded-full bg-[#F36F21] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition-transform hover:scale-105"
        >
          &larr; {t("error.back")}
        </Link>
      </div>
    );
  }

  if (!currentBlog) return null;

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased selection:bg-[#F36F21] selection:text-white">
      {/* Scroll Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Clean Editorial Header */}
      <BlogDetailHero
        title={currentBlog.title}
        imageUrl={currentBlog.imageUrl}
        readingTimeMinutes={readingTimeMinutes}
      />

      {/* Main 2-Column Content Layout */}
      <main className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 xl:gap-16">
          <BlogDetailContent blog={currentBlog} />
          <BlogDetailSidebar blog={currentBlog} />
        </div>
      </main>

      {/* Bottom Related Stories (Up to 3 cards) */}
      {currentRecent.length > 0 && (
        <section className="border-t border-gray-100 bg-[#FAFAFA] py-12 sm:py-16">
          <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#0F2942] tracking-tight">
                {t("related.title")}
              </h2>

              <Link
                href="/blogs"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#F36F21] hover:underline"
              >
                <span>{t("related.viewAll")}</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentRecent.slice(0, 3).map((item) => (
                <BlogCard key={item.id} blog={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
