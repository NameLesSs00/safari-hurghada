"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
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
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Mobile Filter Button */}
      <button
        type="button"
        onClick={onOpenMobileFilters}
        className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200/90 bg-white px-4 py-2.5 text-xs font-bold text-[#1E232A] shadow-xs transition-colors hover:border-[#F36F21] hover:text-[#F36F21] lg:hidden cursor-pointer active:scale-95"
      >
        <SlidersHorizontal size={15} className="text-[#F36F21]" />
        <span>{t("filter")}</span>
      </button>

      {/* Search Input */}
      <div className="relative w-full sm:w-[320px]">
        <Search
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="w-full rounded-full border border-gray-200/90 bg-white py-2.5 pl-11 pr-10 text-xs sm:text-sm font-medium text-[#1E232A] shadow-xs outline-none transition-all placeholder:text-gray-400 focus:border-[#F36F21] focus:bg-white focus:ring-4 focus:ring-[#F36F21]/10"
        />
        {searchItem && (
          <button
            type="button"
            onClick={() => setSearchItem("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-gray-400 hover:text-[#1E232A] cursor-pointer"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
