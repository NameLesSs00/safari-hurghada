"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

interface TripsToolbarProps {
  totalCount: number;
  searchItem: string;
  setSearchItem: (val: string) => void;
  onOpenMobileFilters: () => void;
}

export function TripsToolbar({
  totalCount,
  searchItem,
  setSearchItem,
  onOpenMobileFilters,
}: TripsToolbarProps) {
  const t = useTranslations("TripsPage.toolbar");
  
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Found count and Mobile Filter Button */}
      <div className="flex items-center justify-between sm:w-auto">
        {/* Found count removed per request */}
        <div></div>
        <button
          onClick={onOpenMobileFilters}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2 text-sm text-[#4B5563] lg:hidden"
        >
          <SlidersHorizontal size={16} />
          <span>{t("filter")}</span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-[240px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
          />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className="w-full rounded-full border border-[#D1D5DB] bg-white py-2 pl-9 pr-4 text-sm text-[#374151] outline-none focus:border-[#003A5A] focus:ring-1 focus:ring-[#003A5A]"
          />
        </div>
      </div>
    </div>
  );
}
