"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

import { GalleryCard } from "@/src/features/gallery/components/gallery-card";
import { GalleryLightbox } from "@/src/features/gallery/components/gallery-lightbox";
import type { GalleryImage } from "@/src/features/gallery/types/gallery";

interface GalleryGridProps {
  images: GalleryImage[];
}

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(
    null
  );
  const [visibleCount, setVisibleCount] = useState(8);
  const t = useTranslations("GalleryPage");

  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  const handleExpand = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    if (currentIndex < images.length - 1) {
      setSelectedImage(images[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    if (currentIndex > 0) {
      setSelectedImage(images[currentIndex - 1]);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, images.length));
  };

  return (
    <>
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="mx-auto w-full px-5 md:px-8 lg:max-w-[1400px] lg:px-10">
          {/* Gallery grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
            {visibleImages.map((image) => (
              <motion.div
                key={image.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
              >
                <GalleryCard
                  image={image}
                  onExpand={handleExpand}
                />
              </motion.div>
            ))}
          </div>

          {/* See More button */}
          {hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="rounded-full border-2 border-[#003A5A] px-12 py-3 font-semibold text-[#003A5A] transition-colors hover:bg-[#003A5A] hover:text-white"
              >
                {t("seeMore")}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <GalleryLightbox
        image={selectedImage}
        images={images}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}
