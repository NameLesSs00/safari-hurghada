import { FaqPage } from "@/src/features/faq/components/faq-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions",
  description:
    "Find answers to common questions about SunnySide Tours - bookings, payments, cancellations, and travel tips for Egypt. Get the information you need to create memories together.",
  openGraph: {
    title: "FAQ | SunnySide Tours",
    description: "Answers to your questions about booking and traveling with us.",
  },
};

export default function Page() {
  return <FaqPage />;
}
