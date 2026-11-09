"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import type { BlogSection } from "@/src/features/admin/blogs/types";

interface MobileTableOfContentsProps {
  sections: BlogSection[];
}

export function MobileTableOfContents({ sections }: MobileTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("BlogDetail.toc");

  const scrollToSection = (sectionId: number) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-xs overflow-hidden">
      {/* Header Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-50 cursor-pointer"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {t("title")}
        </span>
        {isOpen ? (
          <ChevronUp className="text-[#F36F21]" size={18} />
        ) : (
          <ChevronDown className="text-slate-400" size={18} />
        )}
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <nav className="border-t border-gray-100 p-4 bg-slate-50/40">
          <ul className="space-y-2">
            <li>
              <button
                onClick={scrollToTop}
                className="w-full text-left text-xs sm:text-sm font-medium text-slate-600 hover:text-[#F36F21] cursor-pointer"
              >
                {t("intro")}
              </button>
            </li>

            {sections.map((section, idx) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className="w-full text-left text-xs sm:text-sm text-slate-600 hover:text-[#F36F21] cursor-pointer"
                >
                  <span className="text-slate-400 mr-1.5">{idx + 1}.</span>
                  {section.title.replace(/^\d+\.\s*/, "")}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
