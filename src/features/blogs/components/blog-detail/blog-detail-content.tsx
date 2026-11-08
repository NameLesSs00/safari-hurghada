"use client";

import Image from "next/image";
import type { Blog } from "@/src/features/admin/blogs/types";
import { MobileTableOfContents } from "./mobile-table-of-contents";

interface BlogDetailContentProps {
  blog: Blog;
}

/** Parses **text** markdown and returns React nodes with bold + larger styled text */
function renderContent(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong
        key={i}
        className="text-[1.05em] font-bold text-[var(--color-deep-ocean)]"
      >
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export function BlogDetailContent({ blog }: BlogDetailContentProps) {
  return (
    <article className="space-y-6 lg:space-y-0">
      {/* Mobile TOC - Only visible on mobile */}
      <div className="lg:hidden">
        <MobileTableOfContents sections={blog.blogSections} />
      </div>

      {/* Main Content */}
      <div className="rounded-[20px] bg-white p-6 shadow-sm lg:p-8">
        {/* Featured Image */}
        {blog.imageUrl && (
          <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-[20px]">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 800px, 100vw"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="mb-6 text-2xl font-bold leading-[1.3] text-[var(--color-deep-ocean)] sm:text-3xl lg:text-4xl">
          {blog.title}
          <div className="mt-2 h-1 w-20 rounded-full bg-[var(--color-ocean)]" />
        </h1>

        {/* Introduction Content */}
        <div className="mb-8 leading-relaxed text-[#374151]">
          {blog.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {renderContent(paragraph)}
            </p>
          ))}
        </div>

        {/* Blog Sections */}
        {blog.blogSections?.map((section) => (
          <section
            key={section.id}
            id={`section-${section.id}`}
            className="mb-10 scroll-mt-24"
          >
            <h2 className="mb-4 text-xl font-bold text-[var(--color-deep-ocean)] sm:text-2xl">
              {section.title}
            </h2>

            {section.imageUrl && (
              <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-[20px]">
                <Image
                  src={section.imageUrl}
                  alt={section.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 800px, 100vw"
                />
              </div>
            )}

            <div className="leading-relaxed text-[#374151]">
              {section.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {renderContent(paragraph)}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
