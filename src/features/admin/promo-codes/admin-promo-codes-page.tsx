"use client";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  Euro,
  Loader2,
  Percent,
  Plus,
  Search,
  Tag,
  Ticket,
  X,
} from "lucide-react";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useTripsQuery } from "@/src/features/admin/trips/hooks";
import {
  useCreatePromoCodeMutation,
  usePromoCodesQuery,
} from "@/src/features/admin/promo-codes/hooks";
import type {
  PromoCode,
  PromoCodeFormValues,
} from "@/src/features/admin/promo-codes/types";

const pageSizes = [6, 10, 20];

function getErrorText(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function formatDiscount(code: PromoCode) {
  if (code.discountEuro && code.discountEuro > 0) {
    return `€${code.discountEuro}`;
  }
  if (code.discountpercent && code.discountpercent > 0) {
    return `${code.discountpercent}%`;
  }
  return "—";
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function AdminPromoCodesPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreating, setIsCreating] = useState(false);

  const promoCodesQuery = usePromoCodesQuery({ pageNumber, pageSize });

  const promoCodes = promoCodesQuery.data?.data ?? [];
  const hasNextPage = promoCodes.length >= pageSize;

  const queryError = useMemo(
    () =>
      promoCodesQuery.error
        ? getErrorText(promoCodesQuery.error, "Unable to load promo codes.")
        : "",
    [promoCodesQuery.error],
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-ocean)]">
            Marketing
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[var(--color-deep-ocean)] sm:text-4xl">
            Promo Codes
          </h1>
          <p className="mt-3 max-w-[680px] text-base leading-[1.7] text-[var(--color-muted)]">
            Create and manage discount promo codes. Codes can apply a percentage
            or euro discount to all trips or a specific trip.
          </p>
        </div>

        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-ocean)] px-4 text-sm font-bold text-white transition hover:bg-[var(--color-deep-ocean)] sm:w-fit"
          onClick={() => setIsCreating(true)}
          type="button"
        >
          <Plus size={18} />
          <span>New Promo Code</span>
        </button>
      </div>

      {/* Filters Bar */}
      <section className="rounded-lg border border-black/5 bg-white p-4 shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
        <div className="w-[150px]">
          <select
            className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold text-[var(--color-deep-ocean)] outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
            onChange={(event) => {
              setPageNumber(1);
              setPageSize(Number(event.target.value));
            }}
            value={pageSize}
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Promo Codes Table */}
      <section className="overflow-hidden rounded-lg border border-black/5 bg-white shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
          <p className="text-sm font-bold text-[var(--color-deep-ocean)]">
            Promo codes list
          </p>
          {promoCodesQuery.isFetching ? (
            <span className="flex items-center gap-2 text-xs font-semibold text-[var(--color-muted)]">
              <Loader2 className="animate-spin" size={15} />
              Updating
            </span>
          ) : null}
        </div>

        {queryError ? (
          <div className="p-4">
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {queryError}
            </p>
          </div>
        ) : null}

        {!queryError && promoCodesQuery.isLoading ? (
          <div className="grid min-h-[320px] place-items-center text-[var(--color-deep-ocean)]">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <Loader2 className="animate-spin" size={20} />
              <span>Loading promo codes</span>
            </div>
          </div>
        ) : null}

        {!queryError && !promoCodesQuery.isLoading && promoCodes.length === 0 ? (
          <div className="grid min-h-[320px] place-items-center px-4 py-12 text-center">
            <div>
              <Ticket
                className="mx-auto text-[var(--color-ocean)]"
                size={34}
              />
              <h2 className="mt-4 text-xl font-bold text-[var(--color-deep-ocean)]">
                No promo codes found
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Create the first promo code to start offering discounts.
              </p>
            </div>
          </div>
        ) : null}

        {!queryError && promoCodes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead className="bg-[#f5f9ff] text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Discount</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Trip</th>
                  <th className="px-4 py-3">Uses Left</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Created By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {promoCodes.map((promoCode) => (
                  <tr key={promoCode.id} className="hover:bg-[#f9fbff]">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-[var(--color-ocean)]/10 px-2.5 py-1 text-sm font-bold tracking-wider text-[var(--color-ocean)]">
                          <Tag size={13} />
                          {promoCode.code}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-bold ${
                          promoCode.discountEuro > 0
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-violet-50 text-violet-700"
                        }`}
                      >
                        {promoCode.discountEuro > 0 ? (
                          <Euro size={13} />
                        ) : (
                          <Percent size={13} />
                        )}
                        {formatDiscount(promoCode)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-[var(--color-muted)]">
                      {promoCode.tripId ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                          Trip-specific
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                          All trips
                        </span>
                      )}
                    </td>
                    <td className="max-w-[200px] px-4 py-4">
                      {promoCode.tripName ? (
                        <div>
                          <p className="truncate text-sm font-semibold text-[var(--color-deep-ocean)]">
                            {promoCode.tripName}
                          </p>
                          {promoCode.tripType ? (
                            <p className="mt-0.5 text-xs text-[var(--color-muted)]">
                              {promoCode.tripType}
                            </p>
                          ) : null}
                        </div>
                      ) : (
                        <span className="text-sm text-[var(--color-muted)]">
                          —
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-[var(--color-deep-ocean)]">
                      {promoCode.limited}
                    </td>
                    <td className="px-4 py-4 text-sm text-[var(--color-muted)]">
                      {formatDate(promoCode.createdAt)}
                    </td>
                    <td className="px-4 py-4 text-sm text-[var(--color-muted)]">
                      {promoCode.createdBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-black/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--color-muted)]">
            Page {pageNumber}
          </p>
          <div className="flex gap-2">
            <button
              className="flex h-10 items-center gap-2 rounded-lg border border-black/10 px-3 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={pageNumber === 1 || promoCodesQuery.isFetching}
              onClick={() =>
                setPageNumber((current) => Math.max(1, current - 1))
              }
              type="button"
            >
              <ChevronLeft size={17} />
              <span>Previous</span>
            </button>
            <button
              className="flex h-10 items-center gap-2 rounded-lg border border-black/10 px-3 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!hasNextPage || promoCodesQuery.isFetching}
              onClick={() => setPageNumber((current) => current + 1)}
              type="button"
            >
              <span>Next</span>
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {isCreating ? (
        <PromoCodeFormModal
          key="create"
          onClose={() => setIsCreating(false)}
        />
      ) : null}
    </div>
  );
}

function PromoCodeFormModal({ onClose }: { onClose: () => void }) {
  const createMutation = useCreatePromoCodeMutation();

  // Form state
  const [discountType, setDiscountType] = useState<"percent" | "euro">(
    "percent",
  );
  const [discountValue, setDiscountValue] = useState("");
  const [limited, setLimited] = useState("");
  const [tripId, setTripId] = useState<number | null>(null);
  const [tripSearch, setTripSearch] = useState("");
  const [showTripDropdown, setShowTripDropdown] = useState(false);
  const [selectedTripName, setSelectedTripName] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState("");
  const tripDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tripDropdownRef.current &&
        !tripDropdownRef.current.contains(event.target as Node)
      ) {
        setShowTripDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const tripsQuery = useTripsQuery({
    pageNumber: 1,
    pageSize: 50,
    language: "en",
    includeInactive: false,
    searchItem: tripSearch.trim() || undefined,
  });

  const trips = tripsQuery.data?.data ?? [];

  const filteredTrips = useMemo(
    () =>
      tripSearch.trim() && !selectedTripName
        ? trips.filter((t) =>
            t.name.toLowerCase().includes(tripSearch.toLowerCase()),
          )
        : trips,
    [trips, tripSearch, selectedTripName],
  );

  const submitError = getErrorText(createMutation.error, "");

  function handleSelectTrip(id: number, name: string) {
    setTripId(id);
    setSelectedTripName(name);
    setTripSearch(name);
    setShowTripDropdown(false);
  }

  function handleClearTrip() {
    setTripId(null);
    setSelectedTripName(null);
    setTripSearch("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError("");

    const parsedDiscount = parseFloat(discountValue);
    const parsedLimited = parseInt(limited, 10);

    if (!discountValue.trim() || isNaN(parsedDiscount) || parsedDiscount <= 0) {
      setFieldError("Please enter a valid discount value greater than 0.");
      return;
    }

    if (!limited.trim() || isNaN(parsedLimited) || parsedLimited < 1) {
      setFieldError("Please enter a valid number of uses (minimum 1).");
      return;
    }

    const values: PromoCodeFormValues = {
      discountEuro: discountType === "euro" ? parsedDiscount : null,
      discountpercent: discountType === "percent" ? parsedDiscount : null,
      limited: parsedLimited,
      tripId,
    };

    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <PromoCodeModalFrame
      eyebrow="Marketing"
      onClose={onClose}
      title="New Promo Code"
    >
      <form className="space-y-5 p-5" onSubmit={handleSubmit}>
        {/* Discount Type Toggle */}
        <div>
          <p className="mb-2 text-sm font-semibold text-[var(--color-deep-ocean)]">
            Discount Type <span className="text-red-600">*</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              className={`flex h-11 items-center justify-center gap-2 rounded-lg border text-sm font-bold transition ${
                discountType === "percent"
                  ? "border-[var(--color-ocean)] bg-[var(--color-ocean)]/5 text-[var(--color-ocean)]"
                  : "border-black/10 text-[var(--color-muted)] hover:border-[var(--color-ocean)]"
              }`}
              onClick={() => setDiscountType("percent")}
              type="button"
            >
              <Percent size={16} />
              Percentage (%)
            </button>
            <button
              className={`flex h-11 items-center justify-center gap-2 rounded-lg border text-sm font-bold transition ${
                discountType === "euro"
                  ? "border-[var(--color-ocean)] bg-[var(--color-ocean)]/5 text-[var(--color-ocean)]"
                  : "border-black/10 text-[var(--color-muted)] hover:border-[var(--color-ocean)]"
              }`}
              onClick={() => setDiscountType("euro")}
              type="button"
            >
              <Euro size={16} />
              Euro Amount (€)
            </button>
          </div>
        </div>

        {/* Discount Value */}
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
            {discountType === "percent" ? "Percentage Discount" : "Euro Discount"}{" "}
            <span className="text-red-600">*</span>
          </span>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--color-muted)]">
              {discountType === "percent" ? (
                <Percent size={16} />
              ) : (
                <Euro size={16} />
              )}
            </div>
            <input
              className="h-11 w-full rounded-lg border border-black/10 pl-9 pr-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
              min="0.01"
              onChange={(e) => setDiscountValue(e.target.value)}
              placeholder={
                discountType === "percent" ? "e.g. 20" : "e.g. 15.00"
              }
              step="0.01"
              type="number"
              value={discountValue}
            />
          </div>
        </label>

        {/* Usage Limit */}
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
            Max Uses (limited) <span className="text-red-600">*</span>
          </span>
          <input
            className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
            min="1"
            onChange={(e) => setLimited(e.target.value)}
            placeholder="e.g. 50"
            step="1"
            type="number"
            value={limited}
          />
          <p className="mt-1.5 text-xs text-[var(--color-muted)]">
            Leave empty for unlimited uses — or enter the maximum number of times this code can be redeemed.
          </p>
        </label>

        {/* Trip Selector */}
        <div>
          <p className="mb-2 text-sm font-semibold text-[var(--color-deep-ocean)]">
            Trip{" "}
            <span className="text-xs font-normal text-[var(--color-muted)]">
              (optional — leave blank to apply to all trips)
            </span>
          </p>

          <div className="relative" ref={tripDropdownRef}>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--color-muted)]">
                <Search size={16} />
              </div>
              <input
                className="h-11 w-full rounded-lg border border-black/10 pl-9 pr-9 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
                onChange={(e) => {
                  setTripSearch(e.target.value);
                  setSelectedTripName(null);
                  setTripId(null);
                  setShowTripDropdown(true);
                }}
                onFocus={() => setShowTripDropdown(true)}
                placeholder="Search trips by name..."
                type="text"
                value={tripSearch}
              />
              {tripSearch ? (
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--color-muted)] hover:text-[var(--color-deep-ocean)]"
                  onClick={handleClearTrip}
                  type="button"
                >
                  <X size={16} />
                </button>
              ) : null}
            </div>

            {showTripDropdown && (
              <div className="absolute z-10 mt-1 max-h-52 w-full overflow-y-auto rounded-lg border border-black/10 bg-white shadow-lg">
                {tripsQuery.isLoading ? (
                  <div className="flex items-center gap-2 px-3 py-3 text-sm text-[var(--color-muted)]">
                    <Loader2 className="animate-spin" size={15} />
                    Loading trips...
                  </div>
                ) : filteredTrips.length === 0 ? (
                  <p className="px-3 py-3 text-sm text-[var(--color-muted)]">
                    No trips found.
                  </p>
                ) : (
                  filteredTrips.map((trip) => (
                    <button
                      className="flex w-full flex-col items-start px-3 py-2.5 text-left text-sm transition hover:bg-[var(--color-ocean)]/5"
                      key={trip.id}
                      onClick={() => handleSelectTrip(trip.id, trip.name)}
                      type="button"
                    >
                      <span className="font-semibold text-[var(--color-deep-ocean)]">
                        {trip.name}
                      </span>
                      {trip.tripTypeName ? (
                        <span className="text-xs text-[var(--color-muted)]">
                          {trip.tripTypeName}
                        </span>
                      ) : null}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {tripId && selectedTripName ? (
            <div className="mt-2 flex items-center gap-2 rounded-lg border border-[var(--color-ocean)]/30 bg-[var(--color-ocean)]/5 px-3 py-2">
              <Check className="shrink-0 text-[var(--color-ocean)]" size={15} />
              <p className="text-sm font-semibold text-[var(--color-deep-ocean)]">
                {selectedTripName}
              </p>
            </div>
          ) : null}
        </div>

        {/* Errors */}
        {fieldError || submitError ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {fieldError || submitError}
          </p>
        ) : null}

        {/* Actions */}
        <div className="flex flex-col-reverse gap-2 border-t border-black/5 pt-5 sm:flex-row sm:justify-end">
          <button
            className="h-11 rounded-lg border border-black/10 px-4 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)]"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-[var(--color-ocean)] px-4 text-sm font-bold text-white transition hover:bg-[var(--color-deep-ocean)] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={createMutation.isPending}
            type="submit"
          >
            {createMutation.isPending ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Check size={18} />
            )}
            <span>Generate Code</span>
          </button>
        </div>
      </form>
    </PromoCodeModalFrame>
  );
}

function PromoCodeModalFrame({
  children,
  eyebrow,
  onClose,
  title,
}: {
  children: ReactNode;
  eyebrow: string;
  onClose: () => void;
  title: string;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-4 py-6">
      <section className="max-h-full w-full max-w-[620px] overflow-y-auto rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-ocean)]">
              {eyebrow}
            </p>
            <h2 className="mt-1 text-xl font-bold text-[var(--color-deep-ocean)]">
              {title}
            </h2>
          </div>
          <button
            aria-label="Close promo code form"
            className="grid size-9 place-items-center rounded-lg border border-black/10 text-[var(--color-deep-ocean)]"
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
