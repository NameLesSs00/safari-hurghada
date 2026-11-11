import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

import { routing } from "@/src/i18n/routing";
import { LocalBusinessJsonLd } from "@/src/components/json-ld";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Safari Hurghada - Excursions & Desert Tours | #1 Rated Tour Operator",
  };

  const descriptions: Record<string, string> = {
    en: "Safari Hurghada - #1 Rated Tour Operator in Hurghada. Best prices for VIP Desert Safaris, Quad Biking, Orange Bay Island, Submarine & Diving Excursions. Book your adventure now!",
  };

  const titleText = titles[locale] || titles.en;
  const descriptionText = descriptions[locale] || descriptions.en;

  const ogLocales: Record<string, { locale: string; alternate?: string[] }> = {
    en: { locale: "en_US" },
  };

  const ogLocaleInfo = ogLocales[locale] || ogLocales.en;

  return {
    title: {
      default: titleText,
      template: "%s | Safari Hurghada",
    },
    description: descriptionText,
    keywords: [
      "Safari Hurghada",
      "Hurghada desert safari",
      "quad bike Hurghada",
      "Hurghada excursions",
      "Orange Bay island",
      "Red Sea diving",
      "Sea Scope submarine",
      "dolphin show Hurghada",
      "Luxor day trip from Hurghada",
      "Cairo day trip from Hurghada",
      "Hurghada tours",
      "Egypt travel guide",
    ],
    authors: [{ name: "Safari Hurghada" }],
    creator: "Safari Hurghada",
    publisher: "Safari Hurghada",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: ogLocaleInfo.locale,
      alternateLocale: ogLocaleInfo.alternate,
      url: "https://safarihurghada.net",
      siteName: "Safari Hurghada",
      title: titleText,
      description: descriptionText,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Safari Hurghada - Excursions & Desert Tours",
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
      icon: [
        { url: "/favicon.ico" },
        { url: "/icon.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
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

  return (
    <NextIntlClientProvider>
      <LocalBusinessJsonLd />
      {children}
    </NextIntlClientProvider>
  );
}
