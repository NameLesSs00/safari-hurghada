import { TripDetailsPage } from "@/src/features/tours/components/single/trip-details-page";
import { extractIdFromSlug } from "@/src/features/tours/utils/slugify";
import { getApiUrl } from "@/src/shared/config/api";
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
    const title = `${trip.data.name} | SunnySide Tours`;
    const description = trip.data.description.replace(/<[^>]+>/g, "").substring(0, 160) + "...";

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
      title: `Egypt Tour | SunnySide Tours`,
      description: `Explore this amazing Egypt tour with SunnySide Tours. Book your adventure and create memories together.`,
    };
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <TripDetailsPage slug={slug} />;
}
