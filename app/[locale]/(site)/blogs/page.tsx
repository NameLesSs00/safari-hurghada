import { BlogsPage } from "@/src/features/blogs/components/blogs-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Guides & Tips - Egypt Blog",
  description:
    "Read SunnySide Tours' travel guides, tips, and stories about Egypt. Plan your perfect Egyptian vacation with expert advice. Discover destinations and create memories together.",
  openGraph: {
    title: "Egypt Travel Blog | SunnySide Tours",
    description: "Expert travel guides and tips for your Egyptian adventure.",
  },
};

export default function Page() {
  return <BlogsPage />;
}
