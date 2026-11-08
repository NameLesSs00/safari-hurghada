import { CategoriesSection } from "@/src/features/categories/components/categories-section";
import { FaqSection } from "@/src/features/faq/components/faq-section";
import { HeroSection } from "@/src/features/hero/components/hero-section";
import { ToursSection } from "@/src/features/tours/components/tours-section";
import { BlogsSection } from "@/src/features/blogs/components/blogs-section";
import { HomeGallerySection } from "@/src/features/gallery/components/home-gallery-section";
import { PopularDestinationsSection } from "@/src/features/destinations/components/popular-destinations-section";
import { WhyUsSection } from "@/src/features/why-us/components/why-us-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SunnySide Tours - Create Memories Together in Egypt",
  description:
    "Discover Egypt with SunnySide Tours. Explore destinations, book tours, and create unforgettable memories. Your trusted partner for Egyptian adventures.",
  openGraph: {
    title: "SunnySide Tours - Create Memories Together",
    description: "Discover Egypt's best tours and destinations. Start your adventure today.",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <ToursSection />
      <PopularDestinationsSection />
      <WhyUsSection />
      <HomeGallerySection />
      <BlogsSection />
      <FaqSection />
    </>
  );
}
