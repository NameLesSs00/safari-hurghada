import type { Metadata } from "next";
import { SavedTripsPage } from "@/src/features/saved-trips/components/saved-trips-page";

export const metadata: Metadata = {
  title: "Saved Trips - Your Personal Egypt Wishlist | Safari Hurghada Tours",
  description:
    "View and manage your saved excursions, desert safaris, and Red Sea trips with Safari Hurghada Tours. Compare your favorite Egyptian adventures anytime.",
  openGraph: {
    title: "Saved Trips | Safari Hurghada Tours",
    description: "Your personalized collection of favorite Egyptian adventures and tours.",
  },
};

export default function Page() {
  return <SavedTripsPage />;
}

