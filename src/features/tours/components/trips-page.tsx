"use client";

import { useState, useEffect } from "react";
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

  // Seed initial filter from URL query param (e.g. from Destinations page or Footer)
  const destParam = searchParams.get("destinationId");
  const typeParam = searchParams.get("typeId") || searchParams.get("tripTypeId");

  const initialDestinationId = destParam ? Number(destParam) : undefined;
  const initialTypeId = typeParam ? Number(typeParam) : undefined;

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
    const typeId = searchParams.get("typeId") || searchParams.get("tripTypeId");
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
    <div className="min-h-screen bg-[#FAFAFA]">
      <TripsHero />

      <main className="mx-auto w-full max-w-[1680px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <TripsBreadcrumb />

        <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-8 xl:gap-10">
          {/* Desktop Sidebar (Sticky) */}
          <div className="hidden lg:block lg:sticky lg:top-28">
            <TripsSidebar
              filters={filters}
              setFilters={setFilters}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Mobile Filters Overlay */}
          {isMobileFiltersOpen && (
            <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs lg:hidden">
              <div className="h-full w-[85%] max-w-sm overflow-y-auto bg-white p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                  <h2 className="text-lg font-extrabold text-[#1E232A]">
                    {t("mobileFilters.title")}
                  </h2>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-[#1E232A] transition-colors hover:bg-slate-200 cursor-pointer"
                  >
                    <X size={18} />
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
                    className="w-full rounded-full bg-[#F36F21] py-3.5 text-center text-sm font-bold text-white shadow-md transition-all hover:bg-[#df5d10] active:scale-98 cursor-pointer"
                  >
                    {t("mobileFilters.applyButton")}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Grid Content */}
          <div className="w-full lg:flex-1">
            <TripsToolbar
              totalCount={trips?.length || 0}
              searchItem={searchInput}
              setSearchItem={setSearchInput}
              onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
            />
            <TripsGrid
              trips={paginatedTrips}
              isLoading={isLoading}
              error={error}
              onResetFilters={clearFilters}
            />
            
            {/* Pagination */}
            {!isLoading && !error && trips.length > 0 && totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2 pt-6">
                <button
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 380, behavior: "smooth" });
                  }}
                  disabled={currentPage === 1}
                  className="flex size-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1E232A] shadow-xs transition-colors hover:border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex items-center gap-1.5">
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 380, behavior: "smooth" });
                        }}
                        className={`flex size-10 items-center justify-center rounded-full text-xs font-bold transition-all cursor-pointer ${
                          currentPage === page
                            ? "bg-[#F36F21] text-white shadow-md shadow-orange-500/20"
                            : "border border-gray-200 bg-white text-[#1E232A] shadow-xs hover:border-gray-300 hover:bg-gray-50"
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
                    window.scrollTo({ top: 380, behavior: "smooth" });
                  }}
                  disabled={currentPage === totalPages}
                  className="flex size-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1E232A] shadow-xs transition-colors hover:border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
