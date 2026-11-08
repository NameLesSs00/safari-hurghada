"use client";

import type { BlogSection } from "@/src/features/admin/blogs/types";

interface TableOfContentsProps {
  sections: BlogSection[];
  activeSection: number | null;
}

export function TableOfContents({ sections, activeSection }: TableOfContentsProps) {
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
    <div className="sticky top-24 rounded-[20px] p-6 shadow-sm" style={{ backgroundColor: '#F5FCFF' }}>
      <nav aria-label="Table of Contents">
        <ul className="relative space-y-4">
          {/* Connecting Line */}
          <div className="absolute left-[11px] top-[12px] h-[calc(100%-24px)] w-[2px] bg-gray-200" />

          {/* Introduction (Optional) */}
          <li className="relative flex items-start">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-start text-left"
            >
              <div className="relative z-10 mr-3 mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 bg-white transition-colors group-hover:border-[var(--color-ocean)]">
                <div className="h-3 w-3 rounded-full bg-white transition-colors group-hover:bg-[var(--color-ocean)]" />
              </div>
              <span className="text-sm text-[#6d7280] transition-colors group-hover:text-[var(--color-ocean)]">
                Introduction
              </span>
            </button>
          </li>

          {/* Dynamic Sections */}
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <li key={section.id} className="relative flex items-start">
                <button
                  onClick={() => scrollToSection(section.id)}
                  className="group flex items-start text-left"
                >
                  <div
                    className={`relative z-10 mr-3 mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      isActive
                        ? "border-[var(--color-ocean)] bg-white"
                        : "border-gray-300 bg-white group-hover:border-[var(--color-ocean)]"
                    }`}
                  >
                    <div
                      className={`h-3 w-3 rounded-full transition-colors ${
                        isActive
                          ? "bg-[var(--color-ocean)]"
                          : "bg-white group-hover:bg-[var(--color-ocean)]"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-sm transition-colors ${
                      isActive
                        ? "font-medium text-[var(--color-ocean)]"
                        : "text-[#6d7280] group-hover:text-[var(--color-ocean)]"
                    }`}
                  >
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
