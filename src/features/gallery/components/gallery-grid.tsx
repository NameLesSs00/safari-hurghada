"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Loader2 } from "lucide-react";

import { GalleryCard } from "@/src/features/gallery/components/gallery-card";
import { GalleryLightbox } from "@/src/features/gallery/components/gallery-lightbox";
import type { GalleryImage } from "@/src/features/gallery/types/gallery";

interface GalleryGridProps {
  images: GalleryImage[];
}

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const BATCH_SIZE = 12;

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Featured images sorted first, preserving order within each group
  const sortedImages = useMemo(() => {
    return [...images].sort((a, b) => {
      if (a.isFeatured === b.isFeatured) return 0;
      return a.isFeatured ? -1 : 1;
    });
  }, [images]);

  const visibleImages = sortedImages.slice(0, visibleCount);
  const hasMore = visibleCount < sortedImages.length;

  // Endless scroll via IntersectionObserver - automatically loads next batch without clicking
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, sortedImages.length));
        }
      },
      {
        root: null,
        rootMargin: "350px", // pre-fetch before user reaches the bottom
        threshold: 0.1,
      }
    );

    const currentSentinel = observerRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [hasMore, sortedImages.length]);

  const handleExpand = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = sortedImages.findIndex((img) => img.id === selectedImage.id);
    if (currentIndex < sortedImages.length - 1) {
      setSelectedImage(sortedImages[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = sortedImages.findIndex((img) => img.id === selectedImage.id);
    if (currentIndex > 0) {
      setSelectedImage(sortedImages[currentIndex - 1]);
    }
  };

  return (
    <>
      <div className="mb-16">
        {/* ─── Gallery Grid (3-column layout) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {visibleImages.map((image) => (
            <motion.div
              key={image.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              <GalleryCard image={image} onExpand={handleExpand} />
            </motion.div>
          ))}
        </div>

        {/* ─── Endless Scroll Sentinel ─── */}
        {hasMore && (
          <div
            ref={observerRef}
            className="mt-12 flex items-center justify-center py-6 text-slate-400"
          >
            <Loader2 className="size-6 animate-spin text-[#F36F21]" />
          </div>
        )}
      </div>

      {/* ─── Lightbox Modal ─── */}
      <GalleryLightbox
        image={selectedImage}
        images={sortedImages}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}
