import { BlogDetailPage } from "@/src/features/blogs/components/blog-detail-page";
import { getBlogById } from "@/src/features/admin/blogs/api";
import { extractIdFromSlug } from "@/src/features/tours/utils/slugify";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const id = extractIdFromSlug(slug);
    if (!id) throw new Error("Invalid Blog ID");

    const response = await getBlogById(Number(id));
    return {
      title: `${response.data.title}`,
      description: response.data.content.substring(0, 160) + "...",
      openGraph: {
        title: `${response.data.title} | SunnySide Tours Blog`,
        description: response.data.content.substring(0, 160) + "...",
      },
    };
  } catch {
    return {
      title: "Blog Post",
      description: "Read our latest travel stories and guides about Egypt.",
    };
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogDetailPage slug={slug} />;
}
