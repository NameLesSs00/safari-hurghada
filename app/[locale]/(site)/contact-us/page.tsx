import { ContactSection } from "@/src/features/contact/components/contact-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with SunnySide Tours",
  description:
    "Contact SunnySide Tours for inquiries and bookings. Call us at +20 109 394 3595 or visit our office in Egypt. We're here to help you create memories together.",
  openGraph: {
    title: "Contact SunnySide Tours",
    description: "Get in touch for bookings and inquiries. We're here to help plan your Egyptian adventure.",
  },
};

export default function ContactUsPage() {
  return <ContactSection />;
}
