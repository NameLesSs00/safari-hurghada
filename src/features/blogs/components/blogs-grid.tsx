"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

import { useGetBlogsQuery } from "@/src/features/blogs/api/get-blogs";
import { BlogCard } from "./blog-card";

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

function BlogCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-[20px] bg-white shadow-sm ring-1 ring-black/5">
      <div className="aspect-[398/304] w-full animate-pulse bg-gray-200" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 h-6 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="mb-6 h-6 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="mt-auto flex justify-center">
          <div className="h-10 w-32 animate-pulse rounded-full bg-gray-200 sm:w-40" />
        </div>
      </div>
    </div>
  );
}

interface BlogsGridProps {
  searchQuery: string;
}

export function BlogsGrid({ searchQuery }: BlogsGridProps) {
  // Currently loading a large fixed size since we aren't doing infinite scroll
  // You can adjust pageSize or implement load more if needed
  const { data: blogs, isLoading, error } = useGetBlogsQuery({ pageSize: 50 });
  const t = useTranslations("BlogsPage.grid");

  // Client-side filter
  const filteredBlogs = blogs?.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="mb-16">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <BlogCardSkeleton key={i} />)
          : filteredBlogs?.map((blog) => (
              <motion.div
                key={blog.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
      </div>

      {!isLoading && (error || !filteredBlogs || filteredBlogs.length === 0) && (
        <div className="py-20 text-center text-lg text-gray-500">
          {t("empty")}
        </div>
      )}

      {/* Static 'See More' button matching design */}
      {!isLoading && filteredBlogs && filteredBlogs.length > 0 && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            className="w-full max-w-[400px] rounded-full border-2 border-[var(--color-deep-ocean)] px-8 py-3 text-lg font-semibold text-[var(--color-deep-ocean)] transition-colors hover:bg-[var(--color-deep-ocean)] hover:text-white"
          >
            {t("seeMore")}
          </button>
        </div>
      )}
    </div>
  );
}
