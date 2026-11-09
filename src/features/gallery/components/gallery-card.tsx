"use client";

import Image from "next/image";
import { AppImage } from "@/src/shared/components/app-image";
import { Camera, Maximize2 } from "lucide-react";
import type { GalleryImage } from "@/src/features/gallery/types/gallery";

interface GalleryCardProps {
  image: GalleryImage;
  onExpand: (image: GalleryImage) => void;
}

export function GalleryCard({ image, onExpand }: GalleryCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View photo moment #${image.id}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExpand(image);
        }
      }}
      onClick={() => onExpand(image)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-[0_20px_48px_rgba(15,23,42,0.12)]"
    >
      {/* Large Image Canvas */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <AppImage
          src={image.imageUrl}
          alt={`SunnySide Egypt travel photo #${image.id}`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Cinematic Gradient Scrim on Hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Floating Expand Icon Top Right */}
        <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 flex size-10 items-center justify-center rounded-full bg-white/90 text-[#1E232A] shadow-md backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#F36F21] group-hover:text-white">
          <Maximize2 size={17} strokeWidth={2.4} />
        </div>

        {/* Minimal Enlarge Pill Bottom Left (Revealed on hover) */}
        <div className="absolute bottom-4 left-4 hidden translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:block">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3.5 py-1.5 text-xs font-medium text-white shadow-md backdrop-blur-md">
            <Maximize2 size={12} strokeWidth={2.4} />
            <span>Click to view full photo</span>
          </span>
        </div>
      </div>
    </div>
  );
}
