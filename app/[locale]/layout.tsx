import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { routing } from "@/src/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isDe = locale === 'de';

  const titleText = isDe 
    ? "SunnySide Tours - Gemeinsam Erinnerungen schaffen | Ägypten Reisen & Tourismus"
    : "SunnySide Tours - Create Memories Together | Egypt Travel & Tourism";
    
  const descriptionText = isDe
    ? "Schaffen Sie gemeinsam mit SunnySide Tours Erinnerungen. Entdecken Sie die besten Reiseziele, Touren und Erlebnisse Ägyptens. Buchen Sie noch heute Ihr Ägypten-Abenteuer mit fachkundigen Führern."
    : "Create Memories Together with SunnySide Tours. Explore Egypt's best destinations, tours, and travel experiences. Book your Egyptian adventure today with expert guides and unforgettable journeys.";

  return {
    title: {
      default: titleText,
      template: "%s | SunnySide Tours",
    },
    description: descriptionText,
    keywords: [
      "Egypt tours",
      "Egypt travel",
      "SunnySide Tours",
      "Egyptian tourism",
      "Red Sea tours",
      "Pyramids tours",
      "Luxor trips",
      "Cairo tours",
      "Egypt vacation packages",
      "desert safari Egypt",
      "Nile cruise",
      "Hurghada tours",
      "Sharm El Sheikh",
      "Egypt travel guide",
      "Egyptian adventures",
    ],
    authors: [{ name: "SunnySide Tours" }],
    creator: "SunnySide Tours",
    publisher: "SunnySide Tours",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: isDe ? "de_DE" : "en_US",
      alternateLocale: isDe ? ["en_US"] : ["de_DE"],
      url: "https://sunnyside-tours.com",
      siteName: "SunnySide Tours",
      title: titleText,
      description: descriptionText,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "SunnySide Tours - Egypt Travel Experiences",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description: descriptionText,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
