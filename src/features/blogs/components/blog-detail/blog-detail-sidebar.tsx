"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import type { Blog } from "@/src/features/admin/blogs/types";
import { WhatsAppIcon } from "@/src/shared/components/icons";
import { whatsappUrl } from "@/src/shared/config/site-config";
import { TableOfContents } from "./table-of-contents";

interface BlogDetailSidebarProps {
  blog: Blog;
}

export function BlogDetailSidebar({ blog }: BlogDetailSidebarProps) {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const t = useTranslations("BlogDetail.cta");

  useEffect(() => {
    function handleScroll() {
      const sections = document.querySelectorAll<HTMLElement>("[id^='section-']");
      const scrollPos = window.scrollY + 140;

      let current: number | null = null;
      sections.forEach((section) => {
        if (section.offsetTop <= scrollPos) {
          const id = section.id.replace("section-", "");
          current = Number(id);
        }
      });

      setActiveSection(current);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blog.blogSections]);

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 space-y-5">
        {/* Table of Contents */}
        <TableOfContents
          sections={blog.blogSections}
          activeSection={activeSection}
        />

        {/* Compact WhatsApp Consultation Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#25D366]/15 text-[#25D366]">
              <WhatsAppIcon className="size-4.5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              {t("title")}
            </h4>
          </div>

          <p className="text-xs leading-relaxed text-slate-500 mb-4">
            {t("subtitle")}
          </p>

          <a
            href={whatsappUrl(
              `Hello! I am reading "${blog.title}" and would like to ask some questions.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3.5 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#1ebe5d]"
          >
            <WhatsAppIcon className="size-4" />
            <span>{t("button")}</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
