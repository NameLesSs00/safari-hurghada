import { GallerySection } from "@/src/features/gallery/components/gallery-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery - Experience Egypt Through Our Lens",
  description:
    "View stunning photos from SunnySide Tours' Egypt adventures. Get inspired for your next Egyptian journey. Explore our gallery and create memories together.",
  openGraph: {
    title: "Photo Gallery | SunnySide Tours",
    description: "Experience Egypt through our lens. Browse beautiful travel moments.",
  },
};

export default function GalleryPage() {
  return <GallerySection />;
}
