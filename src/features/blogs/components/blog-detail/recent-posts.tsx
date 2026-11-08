import Image from "next/image";
import Link from "next/link";
import { generateSlug } from "@/src/features/tours/utils/slugify";
import type { Blog } from "@/src/features/admin/blogs/types";

interface RecentPostsProps {
  blogs: Blog[];
  currentBlogId: number;
}

export function RecentPosts({ blogs, currentBlogId }: RecentPostsProps) {
  // Filter out the current blog
  const filteredBlogs = blogs.filter((blog) => blog.id !== currentBlogId).slice(0, 3);

  if (filteredBlogs.length === 0) {
    return null;
  }

  return (
    <div className="rounded-[20px] p-6 shadow-sm" style={{ backgroundColor: '#F5FCFF' }}>
      <h3 className="mb-4 text-lg font-bold text-[var(--color-deep-ocean)]">Recent Posts</h3>
      
      <div className="space-y-4">
        {filteredBlogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${generateSlug(blog.id, blog.title)}`}
            className="group flex gap-3 transition-transform hover:translate-x-1"
          >
            {/* Thumbnail */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
              {blog.imageUrl ? (
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="h-full w-full bg-gray-200" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="line-clamp-2 text-sm font-medium text-[var(--color-deep-ocean)] transition-colors group-hover:text-[var(--color-ocean)]">
                {blog.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
