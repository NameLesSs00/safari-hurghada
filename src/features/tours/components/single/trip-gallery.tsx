"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Sparkles, Maximize2 } from "lucide-react";
import type { TripImage } from "@/src/features/tours/types/trip";
import { GalleryLightbox } from "@/src/features/gallery/components/gallery-lightbox";
import { AppImage, LogoPlaceholder } from "@/src/shared/components/app-image";

interface TripGalleryProps {
  images: TripImage[];
}

export function TripGallery({ images }: TripGalleryProps) {
  const initialPrimary = images.find((img) => img.isPrimary) || images[0];
  const [activeImage, setActiveImage] = useState<TripImage | undefined>(initialPrimary);
  const [lightboxImage, setLightboxImage] = useState<TripImage | null>(null);

  if (!images || images.length === 0 || !activeImage) {
    return (
      <div className="mb-8 flex h-[350px] w-full items-center justify-center overflow-hidden rounded-3xl border border-slate-100 shadow-sm sm:h-[450px]">
        <LogoPlaceholder fill={false} className="size-full" />
      </div>
    );
  }

  const handleOpenLightbox = (img?: TripImage) => {
    setLightboxImage(img || activeImage);
  };

  const handleNextLightbox = () => {
    if (!lightboxImage) return;
    const currentIndex = images.findIndex((img) => img.id === lightboxImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setLightboxImage(images[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!lightboxImage) return;
    const currentIndex = images.findIndex((img) => img.id === lightboxImage.id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setLightboxImage(images[prevIndex]);
  };

  // If only 1 image exists
  if (images.length === 1) {
    return (
      <>
        <div
          onClick={() => handleOpenLightbox(activeImage)}
          className="group relative mb-8 h-[320px] w-full cursor-zoom-in overflow-hidden rounded-3xl border border-slate-100 shadow-sm sm:h-[450px] lg:h-[520px]"
        >
          <AppImage
            src={activeImage.imageUrl}
            alt="Trip photo"
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/60 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-all group-hover:bg-[#F36F21]">
            <Maximize2 size={13} />
            <span>View Fullscreen</span>
          </div>
        </div>

        {lightboxImage && (
          <GalleryLightbox
            image={lightboxImage}
            images={images}
            onClose={() => setLightboxImage(null)}
            onNext={handleNextLightbox}
            onPrev={handlePrevLightbox}
          />
        )}
      </>
    );
  }

  // Up to 4 thumbnails to show alongside the main view
  const thumbnails = images.slice(0, 4);
  const remainingCount = images.length - 4;

  return (
    <>
      <div className="mb-8 flex flex-col gap-3 sm:gap-4 lg:h-[500px] lg:flex-row">
        {/* Main Active Image Showcase (Click to zoom/view lightbox) */}
        <div
          onClick={() => handleOpenLightbox(activeImage)}
          className="group relative h-[320px] w-full cursor-zoom-in overflow-hidden rounded-3xl border border-slate-100 shadow-sm sm:h-[420px] lg:h-full lg:flex-[2.2]"
          title="Click to view full image in lightbox"
        >
          <AppImage
            src={activeImage.imageUrl}
            alt="Featured trip experience"
            fill
            priority
            className="object-cover transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 68vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

          {/* Top Feature Pill */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-md backdrop-blur-md">
            <Sparkles size={14} className="text-[#F36F21]" />
            <span>Verified Experience</span>
          </div>

          {/* Bottom Controls: Photo Count + Click to Zoom Pill */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-black/60 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-all group-hover:bg-[#F36F21]">
              <Maximize2 size={13} />
              <span className="hidden sm:inline">Click to Zoom</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-black/60 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              <Camera size={13} />
              <span>{images.length} Photos</span>
            </div>
          </div>
        </div>

        {/* Thumbnails Grid (click to switch active view; double click or "+N more" to open lightbox) */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 lg:w-[320px] lg:grid-cols-2 lg:grid-rows-2 lg:gap-3 shrink-0">
          {thumbnails.map((img, index) => {
            const isSelected = activeImage.id === img.id;
            const isLastThumbnail = index === 3 && remainingCount > 0;

            return (
              <div
                key={img.id}
                className={`group relative h-20 sm:h-24 lg:h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl border transition-all cursor-pointer focus:outline-none ${
                  isSelected
                    ? "ring-2 ring-[#F36F21] ring-offset-2 border-transparent shadow-md"
                    : "border-slate-100 opacity-85 hover:opacity-100 hover:shadow-sm"
                }`}
                onClick={() => {
                  setActiveImage(img);
                  if (isLastThumbnail) {
                    handleOpenLightbox(img);
                  }
                }}
                onDoubleClick={() => handleOpenLightbox(img)}
                aria-label="View photo"
              >
                <AppImage
                  src={img.imageUrl}
                  alt="Trip thumbnail"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 1024px) 25vw, 15vw"
                />
                <div
                  className={`absolute inset-0 transition-opacity ${
                    isSelected ? "bg-transparent" : "bg-black/10 group-hover:bg-transparent"
                  }`}
                />

                {/* Show +N more overlay on the 4th thumbnail if there are more than 4 images */}
                {isLastThumbnail && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white font-bold backdrop-blur-[1px] transition-all group-hover:bg-black/70">
                    <span className="text-base sm:text-lg">+{remainingCount}</span>
                    <span className="text-[10px] sm:text-xs font-medium tracking-wide">more</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <GalleryLightbox
          image={lightboxImage}
          images={images}
          onClose={() => setLightboxImage(null)}
          onNext={handleNextLightbox}
          onPrev={handlePrevLightbox}
        />
      )}
    </>
  );
}
