"use client";

import { ChevronDown, MapPin, SlidersHorizontal, Tags } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useDestinationsQuery } from "@/src/features/categories/api/get-destinations";
import { useTripTypesQuery } from "@/src/features/tours/api/get-trip-types";

interface TripsSidebarProps {
  filters: {
    destinationId?: number;
    minPrice?: number;
    maxPrice?: number;
    typeId?: number;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      destinationId?: number;
      minPrice?: number;
      maxPrice?: number;
      typeId?: number;
      searchItem?: string;
    }>
  >;
  onClearFilters: () => void;
}

export function TripsSidebar({
  filters,
  setFilters,
  onClearFilters,
}: TripsSidebarProps) {
  // Fetch all destinations (not just featured)
  const { data: destinations } = useDestinationsQuery(false);
  const { data: tripTypes } = useTripTypesQuery();
  const t = useTranslations("TripsPage.sidebar");

  const hasActiveFilters = Boolean(
    filters.destinationId ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.typeId
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="flex w-full flex-col gap-6 rounded-3xl border border-gray-200/80 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.04)] lg:w-[290px] lg:shrink-0"
    >
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-orange-50 text-[#F36F21]">
            <SlidersHorizontal size={15} />
          </span>
          <h2 className="text-base font-bold text-[#1E232A]">{t("filterTitle")}</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-xs font-bold text-[#F36F21] transition-colors hover:text-[#df5d10] cursor-pointer"
          >
            {t("clearAll")}
          </button>
        )}
      </div>

      {/* Destination Select */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <MapPin size={14} className="text-[#F36F21]" />
          <span>{t("destination")}</span>
        </label>
        <div className="relative">
          <select
            value={filters.destinationId || ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                destinationId: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              }))
            }
            className="w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50/60 py-3 pl-4 pr-10 text-sm font-medium text-[#1E232A] outline-none transition-all focus:border-[#F36F21] focus:bg-white focus:ring-4 focus:ring-[#F36F21]/10 cursor-pointer"
          >
            <option value="">{t("anyDestination")}</option>
            {destinations?.map((dest) => (
              <option key={dest.id} value={dest.id}>
                {dest.name.trim()}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <Tags size={14} className="text-[#F36F21]" />
          <span>{t("priceRange")}</span>
        </label>
        <div className="flex items-center gap-2.5">
          <div className="relative w-full">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
              $
            </span>
            <input
              type="number"
              placeholder={t("min")}
              value={filters.minPrice || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              className="w-full rounded-2xl border border-gray-200 bg-gray-50/60 py-2.5 pl-8 pr-3 text-sm font-medium text-[#1E232A] outline-none transition-all focus:border-[#F36F21] focus:bg-white focus:ring-4 focus:ring-[#F36F21]/10"
            />
          </div>
          <span className="text-xs font-semibold text-slate-400">{t("to")}</span>
          <div className="relative w-full">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
              $
            </span>
            <input
              type="number"
              placeholder={t("max")}
              value={filters.maxPrice || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              className="w-full rounded-2xl border border-gray-200 bg-gray-50/60 py-2.5 pl-8 pr-3 text-sm font-medium text-[#1E232A] outline-none transition-all focus:border-[#F36F21] focus:bg-white focus:ring-4 focus:ring-[#F36F21]/10"
            />
          </div>
        </div>
      </div>

      {/* Trips Types */}
      <div className="flex flex-col gap-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {t("tripsTypes")}
        </span>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => setFilters((prev) => ({ ...prev, typeId: undefined }))}
            className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
              !filters.typeId
                ? "bg-orange-50 text-[#F36F21] border border-orange-200/70"
                : "text-slate-600 hover:bg-gray-50 hover:text-[#1E232A]"
            }`}
          >
            <span>{t("allTrips")}</span>
            {!filters.typeId && (
              <span className="size-2 rounded-full bg-[#F36F21]" />
            )}
          </button>

          {tripTypes?.map((type) => {
            const isSelected = filters.typeId === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, typeId: type.id }))}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-orange-50 text-[#F36F21] border border-orange-200/70"
                    : "text-slate-600 hover:bg-gray-50 hover:text-[#1E232A]"
                }`}
              >
                <span className="truncate pr-2">{type.name.trim()}</span>
                {isSelected && (
                  <span className="size-2 shrink-0 rounded-full bg-[#F36F21]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
