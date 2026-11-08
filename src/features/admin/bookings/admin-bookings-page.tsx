"use client";

import {
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  CircleOff,
  Flag,
  Loader2,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";

import {
  useBookingDetailQuery,
  useBookingsQuery,
  useConfirmBookingMutation,
  useDeleteBookingMutation,
  useFinishBookingMutation,
} from "@/src/features/admin/bookings/hooks";
import type {
  Booking,
  BookingListParams,
  BookingStatusValue,
} from "@/src/features/admin/bookings/types";
import { bookingStatusLabels } from "@/src/features/admin/bookings/types";

// ─── Constants ────────────────────────────────────────────────────────────────

const pageSizes = [10, 20, 50];

const statusTabs: { label: string; value: BookingStatusValue | undefined }[] = [
  { label: "All", value: undefined },
  { label: "Pending", value: 0 },
  { label: "Confirmed", value: 1 },
  { label: "Finished", value: 2 },
  { label: "Cancelled", value: 3 },
];

const statusStyles: Record<string, string> = {
  Pending:
    "bg-amber-50 text-amber-700 border-amber-200",
  Confirmed:
    "bg-blue-50 text-blue-700 border-blue-200",
  Finished:
    "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelled:
    "bg-red-50 text-red-600 border-red-200",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getErrorText(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getStatusStyle(status: string) {
  return (
    statusStyles[status] ?? "bg-gray-100 text-gray-600 border-gray-200"
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function AdminBookingsPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState<
    BookingStatusValue | undefined
  >(undefined);
  const [searchItem, setSearchItem] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [date, setDate] = useState("");

  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);
  const [bookingToDelete, setBookingToDelete] = useState<Booking | null>(null);

  const params: BookingListParams = {
    pageNumber,
    pageSize,
    status: statusFilter,
    searchItem: searchItem.trim() || undefined,
    phone: phone.trim() || undefined,
    nationality: nationality.trim() || undefined,
    date: date || undefined,
  };

  const bookingsQuery = useBookingsQuery(params);
  const deleteMutation = useDeleteBookingMutation();
  const confirmMutation = useConfirmBookingMutation();
  const finishMutation = useFinishBookingMutation();

  const bookings = bookingsQuery.data?.data ?? [];
  const hasNextPage = bookings.length >= pageSize;

  const queryError = useMemo(
    () =>
      bookingsQuery.error
        ? getErrorText(bookingsQuery.error, "Unable to load bookings.")
        : "",
    [bookingsQuery.error],
  );

  function handleStatusTab(value: BookingStatusValue | undefined) {
    setStatusFilter(value);
    setPageNumber(1);
  }

  function handleSearch(value: string) {
    setSearchItem(value);
    setPageNumber(1);
  }

  function handleDeleteConfirm() {
    if (!bookingToDelete) return;
    deleteMutation.mutate(bookingToDelete.id, {
      onSuccess: () => {
        setBookingToDelete(null);
        if (viewingBooking?.id === bookingToDelete.id) {
          setViewingBooking(null);
        }
      },
    });
  }

  function handleConfirm(booking: Booking) {
    confirmMutation.mutate(booking.id);
  }

  function handleFinish(booking: Booking) {
    finishMutation.mutate(booking.id);
  }

  const isActionPending =
    confirmMutation.isPending || finishMutation.isPending;

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-ocean)]">
            Operations
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[var(--color-deep-ocean)] sm:text-4xl">
            Bookings
          </h1>
          <p className="mt-3 max-w-[680px] text-base leading-[1.7] text-[var(--color-muted)]">
            View, filter, and manage all customer bookings. Confirm pending
            bookings, mark them as finished, or remove them.
          </p>
        </div>
      </div>

      {/* ── Filters bar ── */}
      <section className="space-y-4 rounded-lg border border-black/5 bg-white p-4 shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
        {/* Status tabs */}
        <div className="flex flex-wrap gap-2">
          {statusTabs.map((tab) => {
            const isActive = tab.value === statusFilter;
            return (
              <button
                className={`h-9 rounded-full px-4 text-sm font-bold transition ${
                  isActive
                    ? "bg-[var(--color-ocean)] text-white"
                    : "border border-black/10 text-[var(--color-muted)] hover:border-[var(--color-ocean)] hover:text-[var(--color-deep-ocean)]"
                }`}
                key={String(tab.value)}
                onClick={() => handleStatusTab(tab.value)}
                type="button"
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Filter inputs */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--color-muted)]">
              <Search size={16} />
            </div>
            <input
              className="h-10 w-full rounded-lg border border-black/10 pl-9 pr-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by name or email…"
              type="text"
              value={searchItem}
            />
          </div>

          {/* Phone */}
          <input
            className="h-10 w-full rounded-lg border border-black/10 px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
            onChange={(e) => {
              setPhone(e.target.value);
              setPageNumber(1);
            }}
            placeholder="Filter by phone…"
            type="text"
            value={phone}
          />

          {/* Nationality */}
          <input
            className="h-10 w-full rounded-lg border border-black/10 px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
            onChange={(e) => {
              setNationality(e.target.value);
              setPageNumber(1);
            }}
            placeholder="Filter by nationality…"
            type="text"
            value={nationality}
          />

          {/* Date */}
          <input
            className="h-10 w-full rounded-lg border border-black/10 px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
            onChange={(e) => {
              setDate(e.target.value);
              setPageNumber(1);
            }}
            type="date"
            value={date}
          />
        </div>

        {/* Active filter chips + page size */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {searchItem && (
              <FilterChip
                label={`Search: "${searchItem}"`}
                onRemove={() => setSearchItem("")}
              />
            )}
            {phone && (
              <FilterChip
                label={`Phone: ${phone}`}
                onRemove={() => setPhone("")}
              />
            )}
            {nationality && (
              <FilterChip
                label={`Nationality: ${nationality}`}
                onRemove={() => setNationality("")}
              />
            )}
            {date && (
              <FilterChip
                label={`Date: ${date}`}
                onRemove={() => setDate("")}
              />
            )}
          </div>

          <select
            className="h-9 shrink-0 rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold text-[var(--color-deep-ocean)] outline-none transition focus:border-[var(--color-ocean)]"
            onChange={(e) => {
              setPageNumber(1);
              setPageSize(Number(e.target.value));
            }}
            value={pageSize}
          >
            {pageSizes.map((s) => (
              <option key={s} value={s}>
                {s} per page
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* ── Table ── */}
      <section className="overflow-hidden rounded-lg border border-black/5 bg-white shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
          <p className="text-sm font-bold text-[var(--color-deep-ocean)]">
            Bookings list
          </p>
          {bookingsQuery.isFetching ? (
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

        {!queryError && bookingsQuery.isLoading ? (
          <div className="grid min-h-[320px] place-items-center text-[var(--color-deep-ocean)]">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <Loader2 className="animate-spin" size={20} />
              <span>Loading bookings</span>
            </div>
          </div>
        ) : null}

        {!queryError && !bookingsQuery.isLoading && bookings.length === 0 ? (
          <div className="grid min-h-[320px] place-items-center px-4 py-12 text-center">
            <div>
              <CalendarCheck
                className="mx-auto text-[var(--color-ocean)]"
                size={34}
              />
              <h2 className="mt-4 text-xl font-bold text-[var(--color-deep-ocean)]">
                No bookings found
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Try adjusting the filters to find what you&apos;re looking for.
              </p>
            </div>
          </div>
        ) : null}

        {!queryError && bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead className="bg-[#f5f9ff] text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Nationality</th>
                  <th className="px-4 py-3">Booking Date</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {bookings.map((booking) => (
                  <BookingRow
                    booking={booking}
                    isActionPending={isActionPending}
                    key={booking.id}
                    onConfirm={() => handleConfirm(booking)}
                    onDelete={() => setBookingToDelete(booking)}
                    onFinish={() => handleFinish(booking)}
                    onView={() => setViewingBooking(booking)}
                  />
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
              disabled={pageNumber === 1 || bookingsQuery.isFetching}
              onClick={() =>
                setPageNumber((n) => Math.max(1, n - 1))
              }
              type="button"
            >
              <ChevronLeft size={17} />
              <span>Previous</span>
            </button>
            <button
              className="flex h-10 items-center gap-2 rounded-lg border border-black/10 px-3 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!hasNextPage || bookingsQuery.isFetching}
              onClick={() => setPageNumber((n) => n + 1)}
              type="button"
            >
              <span>Next</span>
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Modals ── */}
      {viewingBooking ? (
        <BookingDetailModal
          booking={viewingBooking}
          onClose={() => setViewingBooking(null)}
          onConfirm={() => handleConfirm(viewingBooking)}
          onDelete={() => {
            setViewingBooking(null);
            setBookingToDelete(viewingBooking);
          }}
          onFinish={() => handleFinish(viewingBooking)}
          isActionPending={isActionPending}
        />
      ) : null}

      {bookingToDelete ? (
        <ConfirmDeleteModal
          booking={bookingToDelete}
          error={getErrorText(deleteMutation.error, "")}
          isDeleting={deleteMutation.isPending}
          onCancel={() => setBookingToDelete(null)}
          onConfirm={handleDeleteConfirm}
        />
      ) : null}
    </div>
  );
}

// ─── Filter Chip ──────────────────────────────────────────────────────────────

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-[var(--color-ocean)]/30 bg-[var(--color-ocean)]/5 px-3 py-1 text-xs font-semibold text-[var(--color-ocean)]">
      {label}
      <button
        className="text-[var(--color-ocean)] hover:text-[var(--color-deep-ocean)]"
        onClick={onRemove}
        type="button"
      >
        <X size={12} />
      </button>
    </span>
  );
}

// ─── Booking Row ──────────────────────────────────────────────────────────────

function BookingRow({
  booking,
  isActionPending,
  onConfirm,
  onDelete,
  onFinish,
  onView,
}: {
  booking: Booking;
  isActionPending: boolean;
  onConfirm: () => void;
  onDelete: () => void;
  onFinish: () => void;
  onView: () => void;
}) {
  const status = booking.status;

  return (
    <tr
      className="cursor-pointer hover:bg-[#f9fbff]"
      onClick={onView}
    >
      <td className="px-4 py-3 text-sm font-semibold text-[var(--color-deep-ocean)]">
        #{booking.id}
      </td>
      <td className="px-4 py-3">
        <p className="text-sm font-bold text-[var(--color-deep-ocean)]">
          {booking.firstName} {booking.lastName}
        </p>
        <p className="mt-0.5 text-xs text-[var(--color-muted)]">
          {booking.email}
        </p>
      </td>
      <td className="px-4 py-3 text-sm text-[var(--color-muted)]">
        {booking.phone}
      </td>
      <td className="px-4 py-3 text-sm text-[var(--color-muted)]">
        {booking.nationality}
      </td>
      <td className="px-4 py-3 text-sm text-[var(--color-muted)]">
        {formatDate(booking.bookingDate)}
      </td>
      <td className="px-4 py-3 text-sm font-bold text-[var(--color-deep-ocean)]">
        €{booking.totalPrice.toFixed(2)}
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${getStatusStyle(status)}`}
        >
          {status}
        </span>
      </td>
      <td className="px-4 py-3">
        <div
          className="flex justify-end gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          {status === "Pending" && (
            <button
              aria-label={`Confirm booking ${booking.id}`}
              className="flex h-8 items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-2.5 text-xs font-bold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isActionPending}
              onClick={onConfirm}
              type="button"
            >
              <CalendarCheck size={14} />
              Confirm
            </button>
          )}
          {status === "Confirmed" && (
            <button
              aria-label={`Finish booking ${booking.id}`}
              className="flex h-8 items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isActionPending}
              onClick={onFinish}
              type="button"
            >
              <Flag size={14} />
              Finish
            </button>
          )}
          {(status === "Pending" || status === "Confirmed") && (
            <button
              aria-label={`Delete booking ${booking.id}`}
              className="grid size-8 place-items-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50"
              onClick={onDelete}
              type="button"
            >
              <Trash2 size={14} />
            </button>
          )}
          {(status === "Finished" || status === "Cancelled") && (
            <button
              aria-label={`View booking ${booking.id}`}
              className="h-8 rounded-lg border border-black/10 px-3 text-xs font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)]"
              onClick={onView}
              type="button"
            >
              View
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

// ─── Booking Detail Modal ─────────────────────────────────────────────────────

function BookingDetailModal({
  booking,
  isActionPending,
  onClose,
  onConfirm,
  onDelete,
  onFinish,
}: {
  booking: Booking;
  isActionPending: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onDelete: () => void;
  onFinish: () => void;
}) {
  const status = booking.status;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-4 py-6">
      <section className="max-h-full w-full max-w-[720px] overflow-y-auto rounded-lg bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-ocean)]">
              Booking Detail
            </p>
            <h2 className="mt-1 text-xl font-bold text-[var(--color-deep-ocean)]">
              Booking #{booking.id}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${getStatusStyle(status)}`}
            >
              {status}
            </span>
            <button
              aria-label="Close booking detail"
              className="grid size-9 place-items-center rounded-lg border border-black/10 text-[var(--color-deep-ocean)]"
              onClick={onClose}
              type="button"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-5 p-5">
          {/* Customer info grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailField
              label="Full Name"
              value={`${booking.firstName} ${booking.lastName}`}
            />
            <DetailField label="Email" value={booking.email} />
            <DetailField label="Phone" value={booking.phone} />
            <DetailField label="Nationality" value={booking.nationality} />
            <DetailField label="Hotel Name" value={booking.hotelName || "—"} />
            <DetailField label="Room No." value={booking.roomNo || "—"} />
            <DetailField
              label="Booking Date"
              value={formatDate(booking.bookingDate)}
            />
            <DetailField
              label="Created At"
              value={formatDate(booking.createdAt)}
            />
          </div>

          {/* Total */}
          <div className="rounded-lg border border-black/5 bg-[#f5f9ff] px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
              Total Price
            </p>
            <p className="mt-1 text-2xl font-bold text-[var(--color-deep-ocean)]">
              €{booking.totalPrice.toFixed(2)}
            </p>
          </div>

          {/* Trip line items */}
          {booking.tripsBookings.length > 0 ? (
            <div>
              <p className="mb-3 text-sm font-bold text-[var(--color-deep-ocean)]">
                Trips Booked ({booking.tripsBookings.length})
              </p>
              <div className="overflow-hidden rounded-lg border border-black/5">
                <table className="w-full border-collapse text-left">
                  <thead className="bg-[#f5f9ff] text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-muted)]">
                    <tr>
                      <th className="px-3 py-2.5">Trip</th>
                      <th className="px-3 py-2.5">Leave Date</th>
                      <th className="px-3 py-2.5">Adults</th>
                      <th className="px-3 py-2.5">Children</th>
                      <th className="px-3 py-2.5 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {booking.tripsBookings.map((item) => (
                      <tr key={item.id}>
                        <td className="px-3 py-3">
                          <p className="text-sm font-semibold text-[var(--color-deep-ocean)]">
                            {item.title}
                          </p>
                          <p className="text-xs text-[var(--color-muted)]">
                            €{item.priceForAdult}/adult · €{item.priceForChild}
                            /child
                          </p>
                        </td>
                        <td className="px-3 py-3 text-sm text-[var(--color-muted)]">
                          {item.leaveDate}
                        </td>
                        <td className="px-3 py-3 text-sm text-[var(--color-deep-ocean)]">
                          {item.noAdult}
                        </td>
                        <td className="px-3 py-3 text-sm text-[var(--color-deep-ocean)]">
                          {item.noChild}
                        </td>
                        <td className="px-3 py-3 text-right text-sm font-bold text-[var(--color-deep-ocean)]">
                          €{item.subTotal.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {/* Action buttons */}
          <div className="flex flex-col-reverse gap-2 border-t border-black/5 pt-4 sm:flex-row sm:justify-end">
            <button
              className="h-10 rounded-lg border border-black/10 px-4 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)]"
              onClick={onClose}
              type="button"
            >
              Close
            </button>

            {(status === "Pending" || status === "Confirmed") && (
              <button
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 px-4 text-sm font-bold text-red-600 transition hover:bg-red-50"
                onClick={onDelete}
                type="button"
              >
                <Trash2 size={16} />
                Delete
              </button>
            )}

            {status === "Pending" && (
              <button
                className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--color-ocean)] px-4 text-sm font-bold text-white transition hover:bg-[var(--color-deep-ocean)] disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isActionPending}
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                type="button"
              >
                {isActionPending ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <CalendarCheck size={16} />
                )}
                Confirm Booking
              </button>
            )}

            {status === "Confirmed" && (
              <button
                className="flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isActionPending}
                onClick={() => {
                  onFinish();
                  onClose();
                }}
                type="button"
              >
                {isActionPending ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Flag size={16} />
                )}
                Mark as Finished
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Confirm Delete Modal ─────────────────────────────────────────────────────

function ConfirmDeleteModal({
  booking,
  error,
  isDeleting,
  onCancel,
  onConfirm,
}: {
  booking: Booking;
  error: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-4 py-6">
      <section className="w-full max-w-[420px] rounded-lg bg-white p-5 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-red-100">
            <CircleOff className="text-red-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--color-deep-ocean)]">
              Delete Booking #{booking.id}
            </h2>
            <p className="mt-2 text-sm leading-[1.7] text-[var(--color-muted)]">
              This will permanently remove the booking for{" "}
              <span className="font-semibold text-[var(--color-deep-ocean)]">
                {booking.firstName} {booking.lastName}
              </span>
              . This action cannot be undone.
            </p>
          </div>
        </div>

        {error ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            className="h-10 rounded-lg border border-black/10 px-4 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)]"
            disabled={isDeleting}
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isDeleting}
            onClick={onConfirm}
            type="button"
          >
            {isDeleting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Trash2 size={16} />
            )}
            Delete
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── Detail Field ─────────────────────────────────────────────────────────────

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-muted)]">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[var(--color-deep-ocean)]">
        {value || "—"}
      </p>
    </div>
  );
}
