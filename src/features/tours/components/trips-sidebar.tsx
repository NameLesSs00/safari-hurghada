"use client";

import { ChevronDown, MapPin, Tags } from "lucide-react";
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex w-full flex-col gap-6 rounded-2xl bg-[#F9FAFB] p-6 lg:w-[280px] lg:shrink-0"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#003A5A]">{t("filterTitle")}</h2>
        <button
          onClick={onClearFilters}
          className="text-sm text-[#3B82F6] underline decoration-transparent transition-colors hover:decoration-[#3B82F6]"
        >
          {t("clearAll")}
        </button>
      </div>

      {/* Destination */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-[#374151]">
          <MapPin size={16} className="text-[#6B7280]" />
          <span>{t("destination")}</span>
        </div>
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
            className="w-full appearance-none rounded-lg border border-[#D1D5DB] bg-white py-2.5 pl-4 pr-10 text-sm text-[#374151] outline-none focus:border-[#003A5A] focus:ring-1 focus:ring-[#003A5A]"
          >
            <option value="">{t("anyDestination")}</option>
            {destinations?.map((dest) => (
              <option key={dest.id} value={dest.id}>
                {dest.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
          />
        </div>
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-[#374151]">
          <Tags size={16} className="text-[#6B7280]" />
          <span>{t("priceRange")}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6B7280]">
              €
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
              className="w-full rounded-lg border border-[#D1D5DB] bg-white py-2.5 pl-7 pr-3 text-sm text-[#374151] outline-none focus:border-[#003A5A] focus:ring-1 focus:ring-[#003A5A]"
            />
          </div>
          <span className="text-sm text-[#6B7280]">{t("to")}</span>
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6B7280]">
              €
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
              className="w-full rounded-lg border border-[#D1D5DB] bg-white py-2.5 pl-7 pr-3 text-sm text-[#374151] outline-none focus:border-[#003A5A] focus:ring-1 focus:ring-[#003A5A]"
            />
          </div>
        </div>
      </div>

      {/* Trips Types */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-[#374151]">{t("tripsTypes")}</h3>
        <div className="flex flex-col gap-3">
          <label className="flex cursor-pointer items-center justify-between group">
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                checked={!filters.typeId}
                onChange={() =>
                  setFilters((prev) => ({ ...prev, typeId: undefined }))
                }
                className="h-4 w-4 border-gray-300 text-[#003A5A] focus:ring-[#003A5A]"
              />
              <span className="text-sm text-[#4B5563] group-hover:text-[#111827]">
                {t("allTrips")}
              </span>
            </div>
          </label>
          {tripTypes?.map((type) => (
            <label
              key={type.id}
              className="flex cursor-pointer items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  checked={filters.typeId === type.id}
                  onChange={() =>
                    setFilters((prev) => ({ ...prev, typeId: type.id }))
                  }
                  className="h-4 w-4 border-gray-300 text-[#003A5A] focus:ring-[#003A5A]"
                />
                <span className="text-sm text-[#4B5563] group-hover:text-[#111827]">
                  {type.name}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
