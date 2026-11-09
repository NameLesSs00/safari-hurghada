"use client";

import Image from "next/image";
import Link from "next/link";
import { AppImage } from "@/src/shared/components/app-image";
import { Calendar, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { generateSlug } from "@/src/features/tours/utils/slugify";
import type { Blog } from "@/src/features/admin/blogs/types";
import type { AppLocale } from "@/src/i18n/locales";

interface RecentPostsProps {
  blogs: Blog[];
  currentBlogId: number;
}

export function RecentPosts({ blogs, currentBlogId }: RecentPostsProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("BlogDetail");

  const filteredBlogs = blogs.filter((blog) => blog.id !== currentBlogId).slice(0, 3);

  if (filteredBlogs.length === 0) {
    return null;
  }

  return (
    <div className="rounded-[24px] bg-white border border-gray-100 p-6 shadow-[0_4px_24px_rgba(15,23,42,0.04)]">
      {/* Header */}
      <div className="mb-5 flex items-center gap-2 text-[#0F2942]">
        <Sparkles size={18} className="text-[#F36F21]" />
        <h3 className="text-base font-bold tracking-tight">{t("recent.title")}</h3>
      </div>

      <div className="space-y-4">
        {filteredBlogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${generateSlug(blog.id, blog.title)}`}
            className="group flex gap-3.5 transition-all"
          >
            {/* Thumbnail */}
            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-[14px] bg-gray-100">
              <AppImage
                src={blog.imageUrl}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="80px"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="mb-1 flex items-center gap-1 text-[11px] font-bold text-[#F36F21]">
                <Calendar size={11} strokeWidth={2.4} />
                <span>Jan 15, 2025</span>
              </div>
              <h4 className="line-clamp-2 text-xs sm:text-[13px] font-bold leading-snug text-[#0F2942] transition-colors group-hover:text-[#F36F21]">
                {blog.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
