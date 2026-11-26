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
    en: "Safari Hurghada - Desert Safaris, Red Sea Excursions & Egypt Tours",
    de: "Safari Hurghada - Wüstensafaris, Rotes Meer Ausflüge & Ägypten Touren",
    fr: "Safari Hurghada - Safaris dans le Désert, Excursions Mer Rouge & Circuits en Égypte",
    pl: "Safari Hurghada - Safari na Pustyni, Wycieczki nad Morze Czerwone i Egipt",
  };

  const descriptions: Record<string, string> = {
    en: "Book top-rated desert safaris, quad biking, Orange Bay boat trips, diving, and Luxor & Cairo excursions in Hurghada. Trusted local experts with best-price guarantee.",
    de: "Buchen Sie erstklassige Wüstensafaris, Quad-Touren, Orange Bay Bootsausflüge, Tauchen sowie Luxor- & Kairo-Ausflüge ab Hurghada. Lokale Experten mit Bestpreisgarantie.",
    fr: "Réservez les meilleurs safaris dans le désert, sorties quad, excursions à Orange Bay, plongée et circuits à Louxor et au Caire depuis Hurghada. Experts locaux au meilleur prix.",
    pl: "Zarezerwuj najlepsze safari po pustyni, quady, rejsy na Orange Bay, nurkowanie oraz wycieczki do Luksoru i Kairu z Hurghady. Lokalni eksperci i gwarancja najlepszej ceny.",
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title: {
      absolute: title,
    },
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
