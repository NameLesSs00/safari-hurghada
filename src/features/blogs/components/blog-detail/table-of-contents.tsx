"use client";

import { useTranslations } from "next-intl";
import type { BlogSection } from "@/src/features/admin/blogs/types";

interface TableOfContentsProps {
  sections: BlogSection[];
  activeSection: number | null;
}

export function TableOfContents({ sections, activeSection }: TableOfContentsProps) {
  const t = useTranslations("BlogDetail.toc");

  const scrollToSection = (sectionId: number) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-xs">
      <h3 className="mb-3.5 text-xs font-bold uppercase tracking-wider text-slate-400">
        {t("title")}
      </h3>

      <nav aria-label="Table of Contents">
        <ul className="space-y-1 border-l-2 border-gray-100">
          {/* Introduction */}
          <li>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`block w-full -ml-[2px] border-l-2 pl-3 py-1 text-left text-xs sm:text-[13px] transition-colors cursor-pointer ${
                activeSection === null
                  ? "border-[#F36F21] font-bold text-[#F36F21]"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="line-clamp-1">{t("intro")}</span>
            </button>
          </li>

          {/* Dynamic Sections */}
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className={`block w-full -ml-[2px] border-l-2 pl-3 py-1 text-left text-xs sm:text-[13px] transition-colors cursor-pointer ${
                    isActive
                      ? "border-[#F36F21] font-bold text-[#F36F21]"
                      : "border-transparent text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span className="line-clamp-1">
                    {section.title.replace(/^\d+\.\s*/, "")}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
