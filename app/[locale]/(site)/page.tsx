import { CategoriesSection } from "@/src/features/categories/components/categories-section";
import { FaqSection } from "@/src/features/faq/components/faq-section";
import { HeroSection } from "@/src/features/hero/components/hero-section";
import { ToursSection } from "@/src/features/tours/components/tours-section";
import { BlogsSection } from "@/src/features/blogs/components/blogs-section";
import { HomeGallerySection } from "@/src/features/gallery/components/home-gallery-section";
import { PopularDestinationsSection } from "@/src/features/destinations/components/popular-destinations-section";
import { WhyUsSection } from "@/src/features/why-us/components/why-us-section";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    de: "Safari Hurghada Tours - Gemeinsam Erinnerungen schaffen in Ägypten",
    fr: "Safari Hurghada Tours - Créez des souvenirs inoubliables en Égypte",
    pl: "Safari Hurghada Tours - Twórzmy wspomnienia razem w Egipcie",
    en: "Safari Hurghada Tours - Create Memories Together in Egypt",
  };

  const descriptions: Record<string, string> = {
    de: "Entdecken Sie Ägypten mit Safari Hurghada Tours. Entdecken Sie Reiseziele, buchen Sie Touren und schaffen Sie unvergessliche Erinnerungen.",
    fr: "Découvrez l'Égypte avec Safari Hurghada Tours. Explorez les destinations, réservez des excursions et créez des souvenirs inoubliables.",
    pl: "Odkryj Egipt z Safari Hurghada Tours. Zwiedzaj najciekawsze miejsca, rezerwuj wycieczki i twórz niezapomniane wspomnienia.",
    en: "Discover Egypt with Safari Hurghada Tours. Explore destinations, book tours, and create unforgettable memories. Your trusted partner for Egyptian adventures.",
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

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
