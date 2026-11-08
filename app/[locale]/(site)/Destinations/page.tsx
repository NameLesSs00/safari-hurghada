import { DestinationsPage } from "@/src/features/destinations/components/destinations-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations - Discover Egypt's Best Travel Spots",
  description:
    "Explore Egypt's top destinations with SunnySide Tours. From the Red Sea to Luxor, discover where to go and what to see. Create memories together in Egypt's most beautiful locations.",
  openGraph: {
    title: "Egypt Destinations | SunnySide Tours",
    description:
      "Discover Egypt's best destinations - beaches, pyramids, ancient temples, and more.",
  },
};

export default function Page() {
  return <DestinationsPage />;
}
