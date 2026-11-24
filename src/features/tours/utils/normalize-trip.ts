import type { Trip } from "@/src/features/tours/types/trip";
import { getImageUrl } from "@/src/shared/config/api";

const DESTINATION_NAMES: Record<number, string> = {
  2: "Hurghada",
  3: "Giza",
  4: "Aswan",
  5: "Cairo",
  6: "Luxor",
  7: "El Gouna",
};

/**
 * Normalizes a Trip payload from the backend by resolving destination name
 * fallbacks and converting relative image paths to absolute URLs.
 */
export function normalizeTrip(trip: Trip): Trip {
  const destId = trip.destinationInfo?.id;
  const resolvedName =
    trip.destinationInfo?.name ||
    (destId ? DESTINATION_NAMES[destId] : undefined) ||
    trip.destination ||
    "Hurghada";

  return {
    ...trip,
    destinationInfo: {
      ...trip.destinationInfo,
      id: destId ?? 2,
      name: resolvedName,
      imageUrl: trip.destinationInfo?.imageUrl ?? "",
      isFeatured: trip.destinationInfo?.isFeatured ?? false,
    },
    images: (trip.images || []).map((img) => ({
      ...img,
      imageUrl: getImageUrl(img.imageUrl),
    })),
  };
}
