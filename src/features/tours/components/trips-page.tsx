"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { useTripsQuery } from "@/src/features/tours/api/get-trips";
import { TripsBreadcrumb } from "./trips-breadcrumb";
import { TripsGrid } from "./trips-grid";
import { TripsHero } from "./trips-hero";
import { TripsSidebar } from "./trips-sidebar";
import { TripsToolbar } from "./trips-toolbar";

export function TripsPage() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const t = useTranslations("TripsPage");

  // Seed initial filter from URL query param (e.g. from Destinations page)
  const initialDestinationId = searchParams.get("destinationId")
    ? Number(searchParams.get("destinationId"))
    : undefined;

  const initialTypeId = searchParams.get("typeId")
    ? Number(searchParams.get("typeId"))
    : undefined;

  // Filter state
  const [filters, setFilters] = useState<{
    destinationId?: number;
    minPrice?: number;
    maxPrice?: number;
    typeId?: number;
    searchItem?: string;
  }>({ destinationId: initialDestinationId, typeId: initialTypeId });

  // Debounce the search input to avoid spamming the API
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((prev) => ({ ...prev, searchItem: searchInput || undefined }));
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  // Sync destinationId and typeId from URL whenever they change
  useEffect(() => {
    const destId = searchParams.get("destinationId");
    const typeId = searchParams.get("typeId");
    setFilters((prev) => ({
      ...prev,
      destinationId: destId ? Number(destId) : undefined,
      typeId: typeId ? Number(typeId) : undefined,
    }));
  }, [searchParams]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const {
    data,
    isLoading,
    error,
  } = useTripsQuery({
    destinationId: filters.destinationId,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    typeId: filters.typeId,
    searchItem: filters.searchItem,
    pageSize: 50,
  });

  const trips = data || [];
  const totalPages = Math.ceil(trips.length / 9);
  const paginatedTrips = trips.slice((currentPage - 1) * 9, currentPage * 9);

  const clearFilters = () => {
    setFilters({});
    setSearchInput("");
  };

  return (
    <>
      <TripsHero />
      <TripsBreadcrumb />

      <section className="bg-white py-8 lg:py-16">
        <div className="mx-auto w-full px-5 md:px-8 lg:max-w-[1400px] lg:px-10">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-10">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <TripsSidebar
                filters={filters}
                setFilters={setFilters}
                onClearFilters={clearFilters}
              />
            </div>

            {/* Mobile Filters Overlay */}
            {isMobileFiltersOpen && (
              <div className="fixed inset-0 z-50 flex justify-end bg-black/50 lg:hidden">
                <div className="h-full w-[85%] max-w-sm overflow-y-auto bg-white p-6 shadow-xl">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#003A5A]">
                      {t("mobileFilters.title")}
                    </h2>
                    <button
                      onClick={() => setIsMobileFiltersOpen(false)}
                      className="rounded-full bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <TripsSidebar
                    filters={filters}
                    setFilters={setFilters}
                    onClearFilters={clearFilters}
                  />
                  <div className="mt-8">
                    <button
                      onClick={() => setIsMobileFiltersOpen(false)}
                      className="w-full rounded-full bg-[#003A5A] py-3 text-center font-semibold text-white transition-colors hover:bg-[#004d78]"
                    >
                      {t("mobileFilters.applyButton")}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="w-full lg:flex-1">
              <TripsToolbar
                totalCount={trips?.length || 0}
                searchItem={searchInput}
                setSearchItem={setSearchInput}
                onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
              />
              <TripsGrid trips={paginatedTrips} isLoading={isLoading} error={error} />
              
              {/* Pagination */}
              {!isLoading && !error && trips.length > 0 && totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => {
                      setCurrentPage((p) => Math.max(1, p - 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={currentPage === 1}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => {
                            setCurrentPage(page);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                            currentPage === page
                              ? "bg-[#003A5A] text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => {
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={currentPage === totalPages}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
