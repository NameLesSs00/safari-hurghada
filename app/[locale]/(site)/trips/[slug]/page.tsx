import { TripDetailsPage } from "@/src/features/tours/components/single/trip-details-page";
import { extractIdFromSlug } from "@/src/features/tours/utils/slugify";
import { getApiUrl } from "@/src/shared/config/api";
import { TouristTripJsonLd } from "@/src/components/json-ld";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const id = extractIdFromSlug(slug);
  
  if (!id) {
    return { title: "Trip Not Found" };
  }

  try {
    const response = await fetch(getApiUrl(`/api/Trips/${id}`), {
      headers: { "Accept-Language": locale },
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) throw new Error("Failed to fetch trip");
    
    const trip = await response.json();
    const title = `${trip.data.name} | Safari Hurghada`;
    const description = (trip.data.description || "").replace(/<[^>]+>/g, "").substring(0, 160) + "...";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: trip.data.images?.[0] ? [{ url: trip.data.images[0].url }] : undefined,
      },
    };
  } catch (error) {
    return {
      title: `Hurghada Excursion | Safari Hurghada`,
      description: `Explore this amazing Hurghada adventure with Safari Hurghada. Best prices for desert safaris and Red Sea tours.`,
    };
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);

  let tripData: any = null;
  if (id) {
    try {
      const response = await fetch(getApiUrl(`/api/Trips/${id}`), {
        next: { revalidate: 3600 },
      });
      if (response.ok) {
        const json = await response.json();
        tripData = json?.data;
      }
    } catch {}
  }

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
      <TripDetailsPage slug={slug} />
    </>
  );
}
