import Image from "next/image";
import Link from "next/link";
import { generateSlug } from "@/src/features/tours/utils/slugify";
import type { Blog } from "@/src/features/admin/blogs/types";

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md">
      <div className="relative aspect-[398/304] w-full shrink-0 overflow-hidden bg-gray-100">
        {blog.imageUrl ? (
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(min-width: 1024px) 398px, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h2 className="mb-6 line-clamp-2 text-xl font-bold leading-[130%] text-[var(--color-deep-ocean)] sm:text-[22px]">
          {blog.title}
        </h2>

        <div className="mt-auto flex justify-center">
          <Link
            href={`/blogs/${generateSlug(blog.id, blog.title)}`}
            className="rounded-full border border-[var(--color-ocean)] px-8 py-2 text-sm font-semibold text-[var(--color-deep-ocean)] transition-colors hover:bg-[var(--color-ocean)] hover:text-white sm:px-10 sm:py-2.5 sm:text-base"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}
