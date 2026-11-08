import { Suspense } from "react";
import { TripsPage } from "@/src/features/tours/components/trips-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Egypt Tours & Trip Packages",
  description:
    "Browse SunnySide Tours' collection of Egypt tours and travel packages. Find your perfect Egyptian adventure - sea tours, safari experiences, or historical journeys. Create memories together.",
  openGraph: {
    title: "Egypt Tours & Packages | SunnySide Tours",
    description: "Explore Egypt with our curated tour packages. Book your adventure today!",
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#003A5A] border-t-transparent" /></div>}>
      <TripsPage />
    </Suspense>
  );
}
