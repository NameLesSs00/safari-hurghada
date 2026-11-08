"use client";

import { Breadcrumb } from "@/src/features/gallery/components/breadcrumb";
import { GalleryGrid } from "@/src/features/gallery/components/gallery-grid";
import { GalleryHero } from "@/src/features/gallery/components/gallery-hero";
import { useGalleryImagesQuery } from "@/src/features/gallery/api/get-gallery-images";
import { useTranslations } from "next-intl";

export function GallerySection() {
  const { data: images, isLoading, isError } = useGalleryImagesQuery();
  const t = useTranslations("GalleryPage.states");

  return (
    <>
      <GalleryHero />
      <Breadcrumb />

      {isLoading && (
        <section className="bg-white py-20">
          <div className="mx-auto w-full px-5 text-center md:px-8 lg:max-w-[1400px] lg:px-10">
            <p className="text-[#6B7280]">{t("loading")}</p>
          </div>
        </section>
      )}

      {isError && (
        <section className="bg-white py-20">
          <div className="mx-auto w-full px-5 text-center md:px-8 lg:max-w-[1400px] lg:px-10">
            <p className="text-red-600">{t("error")}</p>
          </div>
        </section>
      )}

      {images && images.length > 0 && <GalleryGrid images={images} />}

      {images && images.length === 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto w-full px-5 text-center md:px-8 lg:max-w-[1400px] lg:px-10">
            <p className="text-[#6B7280]">{t("empty")}</p>
          </div>
        </section>
      )}
    </>
  );
}
