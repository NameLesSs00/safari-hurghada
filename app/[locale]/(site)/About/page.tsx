import { AboutPage } from "@/src/features/about/components/about-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Your Trusted Egypt Travel Partner",
  description:
    "Learn about SunnySide Tours - your trusted partner for Egyptian adventures. Discover our mission to create memories together through exceptional travel experiences in Egypt.",
  openGraph: {
    title: "About SunnySide Tours",
    description: "Your trusted partner for unforgettable Egyptian travel experiences.",
  },
};

export default function Page() {
  return <AboutPage />;
}
