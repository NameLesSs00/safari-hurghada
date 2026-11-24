import { cache } from "react";
import type { Metadata } from "next";

import { TripDetailsPage } from "@/src/features/tours/components/single/trip-details-page";
import type { Trip } from "@/src/features/tours/types/trip";
import { normalizeTrip } from "@/src/features/tours/utils/normalize-trip";
import { extractIdFromSlug } from "@/src/features/tours/utils/slugify";
import { getApiUrl, getLanguageHeaders } from "@/src/shared/config/api";
import { TouristTripJsonLd } from "@/src/components/json-ld";

const getServerTrip = cache(async (id: number, locale: string): Promise<Trip | null> => {
  try {
    const response = await fetch(getApiUrl(`/api/Trips/${id}`), {
      headers: getLanguageHeaders(locale),
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const json = await response.json();
    if (!json?.data) return null;

    return normalizeTrip(json.data as Trip);
  } catch {
    return null;
  }
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const id = extractIdFromSlug(slug);

  if (!id) {
    return { title: "Trip Not Found" };
  }

  const trip = await getServerTrip(id, locale);
  if (!trip) {
    return {
      title: `Hurghada Excursion | Safari Hurghada`,
      description: `Explore this amazing Hurghada adventure with Safari Hurghada. Best prices for desert safaris and Red Sea tours.`,
    };
  }

  const title = `${trip.name} | Safari Hurghada`;
  const description =
    (trip.description || "").replace(/<[^>]+>/g, "").substring(0, 160) + "...";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: trip.images?.[0]?.imageUrl ? [{ url: trip.images[0].imageUrl }] : undefined,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const id = extractIdFromSlug(slug);

  const tripData = id ? await getServerTrip(id, locale) : null;

  return (
    <>
      {tripData ? (
        <TouristTripJsonLd
          name={tripData.name}
          description={tripData.description || ""}
          price={tripData.adultPrice}
          currency={tripData.currencyName || "EUR"}
          imageUrl={tripData.images?.[0]?.imageUrl}
          url={`https://safarihurghada.net/trips/${slug}`}
        />
      ) : null}
      <TripDetailsPage slug={slug} initialTrip={tripData} />
    </>
  );
}
