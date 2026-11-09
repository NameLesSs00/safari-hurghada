"use client";

import Image from "next/image";
import Link from "next/link";
import { AppImage } from "@/src/shared/components/app-image";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Maximize2 } from "lucide-react";
import { useGalleryImagesQuery } from "@/src/features/gallery/api/get-gallery-images";
import { GalleryLightbox } from "@/src/features/gallery/components/gallery-lightbox";
import type { GalleryImage } from "@/src/features/gallery/types/gallery";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

export function HomeGallerySection() {
  const { data: images, isLoading, error } = useGalleryImagesQuery(undefined, 15);
  const locale = useLocale();
  const t = useTranslations("Gallery");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="flex min-h-[360px] items-center justify-center py-20 text-gray-400">
        <p className="text-sm">{t("loading")}</p>
      </div>
    );
  }

  if (error || !images || images.length === 0) {
    return null;
  }

  const openLightbox = (img: GalleryImage) => {
    const idx = images.findIndex((i) => i.id === img.id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = () => {
    if (lightboxIndex !== null && lightboxIndex < images.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  // Up to 7 images for the primary Bento collage
  const displayImages = images.slice(0, 7);
  const isFullBento = displayImages.length >= 7;

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <div className="mx-auto mb-10 sm:mb-14 flex max-w-[760px] flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#F36F21] mb-2"
          >
            {t("eyebrow")}
          </motion.p>

          {/* Title with 3 Outward-Fanning Spark Rays */}
          <motion.h2
            variants={itemVariants}
            className="relative inline-block text-2xl sm:text-3xl lg:text-[40px] font-black tracking-tight text-[#1E232A] leading-tight"
          >
            <span>{t("titlePrefix")} </span>
            <span className="relative inline-block text-[#1E232A]">
              {t("titleHighlight")}
              {/* 3 Outward-Fanning Spark Rays */}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="absolute top-1 sm:top-1.5 -right-6 sm:-right-7 w-5 sm:w-6 h-5 sm:h-6 text-[#F36F21] stroke-current pointer-events-none"
                fill="none"
                strokeWidth="2.8"
                strokeLinecap="round"
              >
                <line x1="3" y1="12" x2="9" y2="2" />
                <line x1="6" y1="16" x2="18" y2="10" />
                <line x1="7" y1="21" x2="19" y2="20" />
              </svg>
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-3 text-sm sm:text-base text-[#64748B] max-w-[540px]"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* ─── DESKTOP BENTO COLLAGE (lg and above, exactly matching reference image) ─── */}
        {isFullBento ? (
          <div className="hidden lg:grid lg:grid-cols-12 gap-4 xl:gap-5 h-[480px] xl:h-[520px]">
            {/* Left tall portrait card (1 image) */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              onClick={() => openLightbox(displayImages[0])}
              className="group relative lg:col-span-3 h-full cursor-pointer overflow-hidden rounded-[24px] bg-gray-100 shadow-[0_8px_24px_-6px_rgba(16,24,40,0.08)] transition-all hover:shadow-[0_18px_36px_-8px_rgba(16,24,40,0.18)]"
            >
              <AppImage
                src={displayImages[0].imageUrl}
                alt=""
                fill
                sizes="(max-width: 1400px) 25vw, 350px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25 flex items-center justify-center">
                <span className="size-11 rounded-full bg-white/90 text-[#1E232A] flex items-center justify-center opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 shadow-md">
                  <Maximize2 className="size-5 text-[#F36F21]" />
                </span>
              </div>
            </motion.div>

            {/* Center 2-row mosaic (5 images total: 2 top, 3 bottom) */}
            <div className="lg:col-span-6 grid grid-rows-2 gap-4 xl:gap-5 h-full">
              {/* Top row: 2 panoramic images */}
              <div className="grid grid-cols-2 gap-4 xl:gap-5 h-full">
                {[displayImages[1], displayImages[2]].map((img, i) => (
                  <motion.div
                    key={img.id}
                    variants={cardVariants}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => openLightbox(img)}
                    className="group relative h-full cursor-pointer overflow-hidden rounded-[24px] bg-gray-100 shadow-[0_8px_24px_-6px_rgba(16,24,40,0.08)] transition-all hover:shadow-[0_18px_36px_-8px_rgba(16,24,40,0.18)]"
                  >
                    <AppImage
                      src={img.imageUrl}
                      alt=""
                      fill
                      sizes="(max-width: 1400px) 25vw, 350px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25 flex items-center justify-center">
                      <span className="size-10 rounded-full bg-white/90 text-[#1E232A] flex items-center justify-center opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 shadow-md">
                        <Maximize2 className="size-4 text-[#F36F21]" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom row: 3 compact images */}
              <div className="grid grid-cols-3 gap-4 xl:gap-5 h-full">
                {[displayImages[3], displayImages[4], displayImages[5]].map((img) => (
                  <motion.div
                    key={img.id}
                    variants={cardVariants}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => openLightbox(img)}
                    className="group relative h-full cursor-pointer overflow-hidden rounded-[24px] bg-gray-100 shadow-[0_8px_24px_-6px_rgba(16,24,40,0.08)] transition-all hover:shadow-[0_18px_36px_-8px_rgba(16,24,40,0.18)]"
                  >
                    <AppImage
                      src={img.imageUrl}
                      alt=""
                      fill
                      sizes="(max-width: 1400px) 16vw, 240px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25 flex items-center justify-center">
                      <span className="size-9 rounded-full bg-white/90 text-[#1E232A] flex items-center justify-center opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 shadow-md">
                        <Maximize2 className="size-4 text-[#F36F21]" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right tall portrait card (1 image) */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              onClick={() => openLightbox(displayImages[6])}
              className="group relative lg:col-span-3 h-full cursor-pointer overflow-hidden rounded-[24px] bg-gray-100 shadow-[0_8px_24px_-6px_rgba(16,24,40,0.08)] transition-all hover:shadow-[0_18px_36px_-8px_rgba(16,24,40,0.18)]"
            >
              <AppImage
                src={displayImages[6].imageUrl}
                alt=""
                fill
                sizes="(max-width: 1400px) 25vw, 350px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25 flex items-center justify-center">
                <span className="size-11 rounded-full bg-white/90 text-[#1E232A] flex items-center justify-center opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 shadow-md">
                  <Maximize2 className="size-5 text-[#F36F21]" />
                </span>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Fallback balanced grid for desktop if fewer than 7 images */
          <div className="hidden lg:grid lg:grid-cols-3 gap-4 xl:gap-5">
            {displayImages.map((img) => (
              <motion.div
                key={img.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                onClick={() => openLightbox(img)}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[24px] bg-gray-100 shadow-[0_8px_24px_-6px_rgba(16,24,40,0.08)] transition-all hover:shadow-[0_18px_36px_-8px_rgba(16,24,40,0.18)]"
              >
                <AppImage
                  src={img.imageUrl}
                  alt=""
                  fill
                  sizes="33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* ─── MOBILE & TABLET RESPONSIVE GRID (< lg) ─── */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
          {displayImages.slice(0, 6).map((img, i, arr) => {
            const isFullWidth = i === 0 || i === arr.length - 1;
            return (
              <motion.div
                key={img.id}
                variants={cardVariants}
                whileHover={{ y: -3 }}
                onClick={() => openLightbox(img)}
                className={`group relative cursor-pointer overflow-hidden rounded-[20px] bg-gray-100 shadow-sm ${
                  isFullWidth
                    ? "col-span-2 aspect-[16/9] sm:aspect-[21/9]"
                    : "aspect-[4/3]"
                }`}
              >
                <AppImage
                  src={img.imageUrl}
                  alt=""
                  fill
                  sizes={isFullWidth ? "100vw" : "(max-width: 768px) 50vw, 33vw"}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20 flex items-center justify-center">
                  <span className="size-9 rounded-full bg-white/90 text-[#1E232A] flex items-center justify-center opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 shadow-md">
                    <Maximize2 className="size-4 text-[#F36F21]" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View Full Gallery CTA Button */}
        <motion.div
          variants={itemVariants}
          className="mt-12 sm:mt-14 flex justify-center"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-3 text-sm font-bold text-[#1E232A] shadow-sm transition-all hover:border-[#F36F21] hover:text-[#F36F21] hover:shadow-md active:scale-95"
          >
            <span>{t("viewMore")}</span>
            <span className="text-base leading-none">→</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          image={images[lightboxIndex]}
          images={images}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </section>
  );
}
