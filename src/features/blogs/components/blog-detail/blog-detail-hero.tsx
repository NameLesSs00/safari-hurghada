"use client";

import Image from "next/image";
import Link from "next/link";
import { AppImage } from "@/src/shared/components/app-image";
import { Clock, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/src/i18n/locales";

interface BlogDetailHeroProps {
  title: string;
  imageUrl?: string | null;
  readingTimeMinutes?: number;
}

export function BlogDetailHero({
  title,
  imageUrl,
  readingTimeMinutes = 5,
}: BlogDetailHeroProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("BlogDetail");

  const heroImageSrc = imageUrl || "/Blogs/Blogs.png";

  return (
    <header className="w-full pt-6 sm:pt-8 lg:pt-10">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 sm:mb-5 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-500"
        >
          <Link
            href="/"
            className="transition-colors hover:text-[#F36F21]"
          >
            {t("breadcrumb.home")}
          </Link>
          <ChevronRight size={14} className="text-slate-300" />
          <Link
            href="/blogs"
            className="transition-colors hover:text-[#F36F21]"
          >
            {t("breadcrumb.blogs")}
          </Link>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="line-clamp-1 max-w-[260px] sm:max-w-[420px] text-slate-800 font-semibold">
            {title}
          </span>
        </nav>

        {/* Article Headline */}
        <h1 className="max-w-[980px] text-2xl sm:text-4xl lg:text-[44px] font-black leading-[1.2] tracking-tight text-[#0F2942]">
          {title}
        </h1>

        {/* Meta Line: Real Reading Time */}
        <div className="mt-4 mb-6 sm:mb-8 flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500">
          <Clock size={15} className="text-[#F36F21]" />
          <span>
            {readingTimeMinutes} {t("meta.minRead")}
          </span>
        </div>

        {/* Centerpiece Hero Photography Card */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-100 border border-gray-100 shadow-sm">
          <AppImage
            src={heroImageSrc}
            alt={title}
            fill
            priority
            sizes="(min-width: 1320px) 1280px, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </header>
  );
}
