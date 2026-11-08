"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { BlogSection } from "@/src/features/admin/blogs/types";

interface MobileTableOfContentsProps {
  sections: BlogSection[];
}

export function MobileTableOfContents({ sections }: MobileTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: number) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
      setIsOpen(false); // Close after clicking
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
    <div className="rounded-[20px] shadow-sm" style={{ backgroundColor: '#F5FCFF' }}>
      {/* Header Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <span className="font-semibold text-[var(--color-deep-ocean)]">
          Table of Contents
        </span>
        {isOpen ? (
          <ChevronUp className="text-[var(--color-ocean)]" size={20} />
        ) : (
          <ChevronDown className="text-[var(--color-ocean)]" size={20} />
        )}
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <nav className="border-t border-gray-100 p-4">
          <ul className="space-y-3">
            {/* Introduction */}
            <li>
              <button
                onClick={scrollToTop}
                className="w-full text-left text-sm text-[#6d7280] transition-colors hover:text-[var(--color-ocean)]"
              >
                Introduction
              </button>
            </li>

            {/* Dynamic Sections */}
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className="w-full text-left text-sm text-[#6d7280] transition-colors hover:text-[var(--color-ocean)]"
                >
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
