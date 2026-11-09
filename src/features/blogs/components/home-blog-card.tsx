"use client";

import Image from "next/image";
import Link from "next/link";
import { AppImage } from "@/src/shared/components/app-image";
import { Calendar, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { generateSlug } from "@/src/features/tours/utils/slugify";
import type { Blog } from "@/src/features/admin/blogs/types";

interface HomeBlogCardProps {
  blog: Blog;
  fallbackDate?: string;
}

export function HomeBlogCard({ blog, fallbackDate }: HomeBlogCardProps) {
  const locale = useLocale();
  const t = useTranslations("Blogs");

  // Clean description snippet of markdown / HTML tags
  const cleanSnippet = (blog.content || "")
    .replace(/<[^>]*>?/gm, "")
    .replace(/[#*_`~>[\]]/g, "")
    .trim();

  // Simple date format or fallback
  const displayDate = fallbackDate || "Jan 15, 2025";

  return (
    <Link
      href={`/blogs/${generateSlug(blog.id, blog.title)}`}
      className="group block select-none h-full w-full"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white border border-gray-100 shadow-[0_8px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)] transition-all duration-300">
        {/* Blog Image */}
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-gray-100">
          <AppImage
            src={blog.imageUrl}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Content Body */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          {/* Published Date */}
          <div className="mb-2.5 flex items-center gap-1.5 text-xs font-bold text-[#F36F21]">
            <Calendar className="size-3.5 stroke-[2.4]" />
            <span>{displayDate}</span>
          </div>

          {/* Title */}
          <h3 className="mb-2.5 line-clamp-2 text-lg sm:text-[19px] font-black leading-snug text-[#0F2942] transition-colors duration-200 group-hover:text-[#F36F21]">
            {blog.title}
          </h3>

          {/* Description snippet */}
          <p className="mb-6 line-clamp-2 text-xs sm:text-[13.5px] leading-relaxed text-[#64748B]">
            {cleanSnippet || t("defaultDescription")}
          </p>

          {/* Read More Link */}
          <div className="mt-auto flex items-center">
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#F36F21] transition-transform duration-200 group-hover:translate-x-1">
              <span>{t("readMore")}</span>
              <ArrowRight className="size-4 stroke-[2.4]" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
