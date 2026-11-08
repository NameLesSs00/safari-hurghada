"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/src/i18n/locales";

import { BlogsGrid } from "./blogs-grid";
import { BlogsHero } from "./blogs-hero";

export function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const locale = useLocale() as AppLocale;
  const t = useTranslations("BlogsPage");

  const popularTags = [
    { key: "all", label: t("tags.all") },
    { key: "sea", label: t("tags.sea") },
    { key: "safari", label: t("tags.safari") },
    { key: "history", label: t("tags.history") },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <BlogsHero />

      <main className="mx-auto w-full max-w-[1280px] px-5 py-8 sm:px-8 lg:px-0 lg:py-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center justify-center text-[14px] leading-[160%] text-[#6d7280] lg:text-base"
        >
          <Link href={`/${locale}`} className="transition-colors hover:text-[var(--color-ocean)]">
            {t("breadcrumb.home")}
          </Link>
          <span className="mx-2"> &gt; </span>
          <span className="font-medium text-[var(--color-ocean)]">{t("breadcrumb.blogs")}</span>
        </nav>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative mx-auto max-w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t("search.placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-4 outline-none transition-colors focus:border-[var(--color-ocean)]"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <span className="text-base font-medium text-[var(--color-deep-ocean)]">
            {t("tags.label")}
          </span>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {popularTags.map((tag) => (
              <button
                key={tag.key}
                type="button"
                onClick={() => setActiveTag(tag.key)}
                className={`rounded-full px-5 py-1.5 text-sm transition-colors sm:px-6 sm:py-2 sm:text-base ${
                  activeTag === tag.key
                    ? "bg-[var(--color-deep-ocean)] text-white"
                    : "bg-[#e5e7eb] text-[#4b5563] hover:bg-gray-300"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <BlogsGrid searchQuery={searchQuery} />
      </main>
    </div>
  );
}
