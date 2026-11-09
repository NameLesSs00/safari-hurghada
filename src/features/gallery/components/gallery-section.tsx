"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/src/i18n/locales";

import { useGalleryImagesQuery } from "@/src/features/gallery/api/get-gallery-images";
import { GalleryGrid } from "@/src/features/gallery/components/gallery-grid";
import { GalleryHero } from "@/src/features/gallery/components/gallery-hero";

function GallerySkeleton() {
  return (
    <div className="mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/3] sm:aspect-[4/3] animate-pulse rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-slate-200/70"
          />
        ))}
      </div>
    </div>
  );
}

export function GallerySection() {
  const locale = useLocale() as AppLocale;
  const { data: images, isLoading, isError } = useGalleryImagesQuery();
  const t = useTranslations("GalleryPage");

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <GalleryHero />

      <main className="mx-auto w-full max-w-[1360px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* Breadcrumb Navigation - matching Blogs */}
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
          <span className="font-semibold text-[#F36F21]">{t("breadcrumb.gallery")}</span>
        </nav>

        {isLoading && <GallerySkeleton />}

        {isError && (
          <div className="rounded-3xl border border-red-100 bg-white p-12 text-center shadow-xs">
            <p className="text-base font-bold text-red-600">{t("states.error")}</p>
          </div>
        )}

        {images && images.length > 0 && <GalleryGrid images={images} />}

        {images && images.length === 0 && !isLoading && !isError && (
          <div className="rounded-3xl border border-gray-200/80 bg-white p-12 text-center shadow-xs">
            <p className="text-base font-bold text-slate-600">{t("states.empty")}</p>
          </div>
        )}
      </main>
    </div>
  );
}
