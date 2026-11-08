import Image from "next/image";
import type { TripImage } from "@/src/features/tours/types/trip";

interface TripGalleryProps {
  images: TripImage[];
}

export function TripGallery({ images }: TripGalleryProps) {
  const primaryImage = images.find((img) => img.isPrimary) || images[0];
  const otherImages = images.filter((img) => img.id !== primaryImage?.id);

  if (!primaryImage) {
    return <div className="h-[400px] w-full rounded-2xl bg-gray-200" />;
  }

  const displayedThumbnails = otherImages.slice(0, 4);

  if (displayedThumbnails.length === 0) {
    return (
      <div className="mb-8 relative h-[300px] w-full overflow-hidden rounded-[20px] sm:h-[450px] lg:mb-12 lg:h-[500px]">
        <Image
          src={primaryImage.imageUrl}
          alt="Main trip image"
          fill
          priority
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="100vw"
        />
      </div>
    );
  }

  const containerGridClass =
    displayedThumbnails.length === 1
      ? "grid-cols-1"
      : displayedThumbnails.length === 2
        ? "grid-cols-2 lg:grid-cols-1 lg:grid-rows-2"
        : displayedThumbnails.length === 3
          ? "grid-cols-3 lg:grid-cols-2 lg:grid-rows-2"
          : "grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 lg:grid-rows-2";

  return (
    <div className="mb-8 flex flex-col gap-4 lg:mb-12 lg:h-[480px] lg:flex-row lg:gap-5">
      {/* Main Image (Large) */}
      <div className="relative h-[250px] w-full overflow-hidden rounded-[20px] sm:h-[350px] lg:h-full lg:flex-[2]">
        <Image
          src={primaryImage.imageUrl}
          alt="Main trip image"
          fill
          priority
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </div>

      {/* Thumbnails */}
      <div className={`grid gap-4 lg:flex-1 lg:gap-5 ${containerGridClass}`}>
        {displayedThumbnails.map((img, index) => (
          <div
            key={img.id}
            className={`relative w-full min-h-[100px] overflow-hidden rounded-[16px] sm:min-h-[140px] lg:min-h-0 lg:h-full lg:rounded-[20px] ${
              displayedThumbnails.length === 3 && index === 0
                ? "lg:col-span-2 lg:row-span-1"
                : ""
            }`}
          >
            <Image
              src={img.imageUrl}
              alt="Trip gallery image"
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
              sizes="(max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
