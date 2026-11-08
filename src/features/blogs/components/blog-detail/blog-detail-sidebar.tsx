"use client";

import { useState, useEffect } from "react";
import type { Blog } from "@/src/features/admin/blogs/types";
import { TableOfContents } from "./table-of-contents";
import { RecentPosts } from "./recent-posts";

interface BlogDetailSidebarProps {
  blog: Blog;
  recentBlogs: Blog[];
}

export function BlogDetailSidebar({ blog, recentBlogs }: BlogDetailSidebarProps) {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("section-", "");
            setActiveSection(Number(id));
          }
        });
      },
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: 0.5,
      }
    );

    const sections = document.querySelectorAll("[id^='section-']");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [blog.blogSections]);

  return (
    <aside className="space-y-6 lg:block">
      {/* Hidden on mobile, visible on desktop */}
      <div className="hidden lg:block">
        <TableOfContents
          sections={blog.blogSections}
          activeSection={activeSection}
        />
      </div>
      <RecentPosts blogs={recentBlogs} currentBlogId={blog.id} />
    </aside>
  );
}
