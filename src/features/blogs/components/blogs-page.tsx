"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/src/i18n/locales";

import { BlogsGrid } from "./blogs-grid";
import { BlogsHero } from "./blogs-hero";

export function BlogsPage() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("BlogsPage");

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <BlogsHero />

      <main className="mx-auto w-full max-w-[1360px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 sm:mb-12 flex items-center justify-center text-xs sm:text-sm font-medium text-slate-500"
        >
          <Link
            href="/"
            className="transition-colors hover:text-[#F36F21]"
          >
            {t("breadcrumb.home")}
          </Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="font-semibold text-[#F36F21]">{t("breadcrumb.blogs")}</span>
        </nav>

        {/* Blog Cards Grid */}
        <BlogsGrid />
      </main>
    </div>
  );
}
