"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

import { useGetBlogsQuery } from "@/src/features/blogs/api/get-blogs";
import { BlogCard } from "./blog-card";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function BlogCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-[24px] bg-white border border-gray-100 shadow-sm animate-pulse">
      <div className="aspect-[16/10] w-full bg-gray-200" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 h-4 w-28 rounded-md bg-gray-200" />
        <div className="mb-3 h-5 w-4/5 rounded-md bg-gray-200" />
        <div className="mb-4 h-4 w-full rounded-md bg-gray-100" />
        <div className="mt-auto h-4 w-24 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

const FALLBACK_DATES = [
  "Jan 15, 2025",
  "Jan 8, 2025",
  "Jan 2, 2025",
  "Dec 26, 2024",
  "Dec 18, 2024",
  "Dec 10, 2024",
];

const INITIAL_PAGE_SIZE = 6;

export function BlogsGrid() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);
  const { data: blogs, isLoading, error } = useGetBlogsQuery({ pageSize: 50 });
  const t = useTranslations("BlogsPage.grid");

  const displayedBlogs = blogs?.slice(0, visibleCount) || [];
  const hasMore = blogs ? visibleCount < blogs.length : false;

  function handleLoadMore() {
    setVisibleCount((prev) => prev + 6);
  }

  return (
    <div className="mb-16">
      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-7 lg:gap-8">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <BlogCardSkeleton key={i} />)
          : displayedBlogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
              >
                <BlogCard
                  blog={blog}
                  fallbackDate={FALLBACK_DATES[idx % FALLBACK_DATES.length]}
                />
              </motion.div>
            ))}
      </div>

      {/* Empty State */}
      {!isLoading && (error || !blogs || blogs.length === 0) && (
        <div className="py-20 text-center text-base sm:text-lg text-slate-500">
          {t("empty")}
        </div>
      )}

      {/* View More Button */}
      {!isLoading && hasMore && (
        <div className="mt-12 sm:mt-14 flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-8 py-3.5 text-sm font-bold text-[#1E232A] shadow-sm transition-all hover:border-[#F36F21] hover:text-[#F36F21] hover:shadow-md active:scale-95 cursor-pointer"
          >
            {t("viewMore")}
          </button>
        </div>
      )}
    </div>
  );
}
