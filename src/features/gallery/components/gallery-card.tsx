"use client";

import Image from "next/image";
import { useState } from "react";

import type { GalleryImage } from "@/src/features/gallery/types/gallery";

interface GalleryCardProps {
  image: GalleryImage;
  onExpand: (image: GalleryImage) => void;
}

export function GalleryCard({ image, onExpand }: GalleryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-[16px] md:rounded-[20px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onExpand(image)}
    >
      {/* Image */}
      <div className="relative aspect-square w-full">
        <Image
          src={image.imageUrl}
          alt={`Gallery image ${image.id}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Expand icon overlay */}
      <div
        className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 transition-opacity duration-200 ${
          isHovered ? "opacity-100" : "opacity-0 md:opacity-100"
        }`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#003A5A]"
        >
          <path
            d="M21 9V3H15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 15V21H9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 3L14 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 21L10 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
