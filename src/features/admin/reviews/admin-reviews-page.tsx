"use client";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Mail,
  MessageSquareText,
  Phone,
  Search,
  Star,
  Trash2,
  User,
  X,
  type LucideIcon,
} from "lucide-react";
import { FormEvent, type ReactNode, useMemo, useState } from "react";

import {
  useDeleteReviewMutation,
  useReviewQuery,
  useReviewsQuery,
} from "@/src/features/admin/reviews/hooks";
import type { Review } from "@/src/features/admin/reviews/types";

const pageSizes = [6, 10, 20];

function getErrorText(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function getReviewerName(review: Review) {
  return `${review.firstName ?? ""} ${review.lastName ?? ""}`.trim() || "Guest";
}

function formatDate(value: string | null) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatPrice(value: number, currencyName: string | null) {
  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value)} ${currencyName || "EUR"}`;
}

function renderStars(rate: number | null) {
  const rating = Math.max(0, Math.min(5, rate ?? 0));

  return Array.from({ length: 5 }, (_, index) => (
    <Star
      className={
        index < rating
          ? "fill-[#f5b301] text-[#f5b301]"
          : "fill-transparent text-slate-300"
      }
      key={index}
      size={16}
    />
  ));
}

export function AdminReviewsPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [draftTripId, setDraftTripId] = useState("");
  const [tripId, setTripId] = useState("");
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);

  const reviewsQuery = useReviewsQuery({
    pageNumber,
    pageSize,
    tripId,
  });
  const deleteMutation = useDeleteReviewMutation();

  const reviews = reviewsQuery.data?.data ?? [];
  const hasNextPage = reviews.length >= pageSize;
  const queryError = useMemo(
    () =>
      reviewsQuery.error
        ? getErrorText(reviewsQuery.error, "Unable to load reviews.")
        : "",
    [reviewsQuery.error],
  );

  function handleFilter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPageNumber(1);
    setTripId(draftTripId.trim());
  }

  function clearTripFilter() {
    setPageNumber(1);
    setDraftTripId("");
    setTripId("");
  }

  function handleDeleteReview() {
    if (!reviewToDelete) {
      return;
    }

    deleteMutation.mutate(reviewToDelete.id, {
      onSuccess: () => {
        setReviewToDelete(null);
        if (selectedReviewId === reviewToDelete.id) {
          setSelectedReviewId(null);
        }
      },
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-ocean)]">
            Moderation
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[var(--color-deep-ocean)] sm:text-4xl">
            Reviews
          </h1>
          <p className="mt-3 max-w-[760px] text-base leading-[1.7] text-[var(--color-muted)]">
            Read customer feedback, inspect the related trip, and remove
            reviews when needed.
          </p>
        </div>

        <div className="rounded-lg border border-black/5 bg-white px-4 py-3 shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Showing
          </p>
          <p className="mt-1 text-2xl font-bold text-[var(--color-deep-ocean)]">
            {reviews.length}
          </p>
        </div>
      </div>

      <section className="rounded-lg border border-black/5 bg-white p-4 shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
        <div className="grid gap-3 lg:grid-cols-[1fr_150px_120px]">
          <form className="relative" onSubmit={handleFilter}>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
              size={18}
            />
            <input
              className="h-11 w-full rounded-lg border border-black/10 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
              min="1"
              onChange={(event) => setDraftTripId(event.target.value)}
              placeholder="Filter by Trip ID"
              type="number"
              value={draftTripId}
            />
          </form>

          <select
            className="h-11 rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold text-[var(--color-deep-ocean)] outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
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

          <button
            className="h-11 rounded-lg border border-black/10 px-4 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!tripId && !draftTripId}
            onClick={clearTripFilter}
            type="button"
          >
            Clear
          </button>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-black/5 bg-white shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
          <p className="text-sm font-bold text-[var(--color-deep-ocean)]">
            Review list
          </p>
          {reviewsQuery.isFetching ? (
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

        {!queryError && reviewsQuery.isLoading ? (
          <div className="grid min-h-[340px] place-items-center text-[var(--color-deep-ocean)]">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <Loader2 className="animate-spin" size={20} />
              <span>Loading reviews</span>
            </div>
          </div>
        ) : null}

        {!queryError && !reviewsQuery.isLoading && reviews.length === 0 ? (
          <div className="grid min-h-[340px] place-items-center px-4 py-12 text-center">
            <div>
              <MessageSquareText
                className="mx-auto text-[var(--color-ocean)]"
                size={34}
              />
              <h2 className="mt-4 text-xl font-bold text-[var(--color-deep-ocean)]">
                No reviews found
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Reviews will appear here after customers submit feedback.
              </p>
            </div>
          </div>
        ) : null}

        {!queryError && reviews.length > 0 ? (
          <div>
            <div className="hidden grid-cols-[minmax(220px,0.85fr)_minmax(280px,1.2fr)_minmax(220px,1fr)_minmax(150px,0.65fr)_96px] gap-4 bg-[#f5f9ff] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] xl:grid">
              <span>Customer</span>
              <span>Comment</span>
              <span>Trip</span>
              <span>Rating</span>
              <span className="text-right">Actions</span>
            </div>
            <div className="divide-y divide-black/5">
              {reviews.map((review) => (
                <ReviewRow
                  key={review.id}
                  onDelete={() => setReviewToDelete(review)}
                  onView={() => setSelectedReviewId(review.id)}
                  review={review}
                />
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-black/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--color-muted)]">
            Page {pageNumber}
          </p>
          <div className="flex gap-2">
            <button
              className="flex h-10 items-center gap-2 rounded-lg border border-black/10 px-3 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={pageNumber === 1 || reviewsQuery.isFetching}
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
              disabled={!hasNextPage || reviewsQuery.isFetching}
              onClick={() => setPageNumber((current) => current + 1)}
              type="button"
            >
              <span>Next</span>
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {selectedReviewId ? (
        <ReviewDetailsPanel
          onClose={() => setSelectedReviewId(null)}
          reviewId={selectedReviewId}
        />
      ) : null}

      {reviewToDelete ? (
        <ConfirmDeletePanel
          error={getErrorText(deleteMutation.error, "")}
          isDeleting={deleteMutation.isPending}
          onCancel={() => setReviewToDelete(null)}
          onConfirm={handleDeleteReview}
          review={reviewToDelete}
        />
      ) : null}
    </div>
  );
}

function ReviewRow({
  onDelete,
  onView,
  review,
}: {
  onDelete: () => void;
  onView: () => void;
  review: Review;
}) {
  return (
    <div className="grid gap-4 px-4 py-4 xl:grid-cols-[minmax(220px,0.85fr)_minmax(280px,1.2fr)_minmax(220px,1fr)_minmax(150px,0.65fr)_96px] xl:items-center">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#e8f5f9] text-[var(--color-ocean)]">
            <User size={19} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[var(--color-deep-ocean)]">
              {getReviewerName(review)}
            </p>
            <p className="mt-1 truncate text-xs text-[var(--color-muted)]">
              {review.email || "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] xl:hidden">
          Comment
        </p>
        <p className="mt-1 line-clamp-2 text-sm leading-6 text-[var(--foreground)] xl:mt-0">
          {review.comment || "-"}
        </p>
        <p className="mt-1 text-xs text-[var(--color-muted)]">
          {formatDate(review.createdAt)}
        </p>
      </div>

      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] xl:hidden">
          Trip
        </p>
        <p className="mt-1 line-clamp-2 text-sm font-bold leading-6 text-[var(--color-deep-ocean)] xl:mt-0">
          {review.tripName || "-"}
        </p>
        <p className="mt-1 truncate text-xs text-[var(--color-muted)]">
          {review.destination || "-"} / {review.tripTypeName || "-"}
        </p>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] xl:hidden">
          Rating
        </p>
        <div className="flex items-center gap-1">{renderStars(review.rate)}</div>
        <p className="mt-1 text-xs font-semibold text-[var(--color-muted)]">
          {review.rate ?? 0} / 5
        </p>
      </div>

      <div className="flex justify-start gap-2 xl:justify-end">
        <button
          aria-label={`View review ${review.id}`}
          className="grid size-9 place-items-center rounded-lg border border-black/10 text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] hover:text-[var(--color-ocean)]"
          onClick={onView}
          type="button"
        >
          <Eye size={17} />
        </button>
        <button
          aria-label={`Delete review ${review.id}`}
          className="grid size-9 place-items-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50"
          onClick={onDelete}
          type="button"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
}

function ReviewDetailsPanel({
  onClose,
  reviewId,
}: {
  onClose: () => void;
  reviewId: number;
}) {
  const reviewQuery = useReviewQuery(reviewId);
  const review = reviewQuery.data?.data;

  return (
    <ReviewModalFrame
      eyebrow="Review details"
      onClose={onClose}
      title={review ? getReviewerName(review) : "Loading review"}
    >
      {reviewQuery.isLoading ? (
        <div className="grid min-h-[320px] place-items-center p-5 text-[var(--color-deep-ocean)]">
          <div className="flex items-center gap-3 text-sm font-semibold">
            <Loader2 className="animate-spin" size={20} />
            <span>Loading review</span>
          </div>
        </div>
      ) : null}

      {reviewQuery.error ? (
        <div className="space-y-4 p-5">
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {getErrorText(reviewQuery.error, "Unable to load review.")}
          </p>
          <button
            className="h-10 rounded-lg border border-black/10 px-4 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)]"
            onClick={() => void reviewQuery.refetch()}
            type="button"
          >
            Try again
          </button>
        </div>
      ) : null}

      {review ? (
        <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <div className="rounded-lg border border-black/10 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-[var(--color-deep-ocean)]">
                  Review
                </p>
                <div className="flex items-center gap-1">
                  {renderStars(review.rate)}
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--foreground)]">
                {review.comment || "-"}
              </p>
              <p className="mt-4 text-xs font-semibold text-[var(--color-muted)]">
                {formatDate(review.createdAt)}
              </p>
            </div>

            <div className="rounded-lg border border-black/10 p-4">
              <p className="text-sm font-bold text-[var(--color-deep-ocean)]">
                Trip
              </p>
              <h3 className="mt-3 text-xl font-bold text-[var(--color-deep-ocean)]">
                {review.tripName || "-"}
              </h3>
              <p className="mt-3 line-clamp-4 text-sm leading-7 text-[var(--color-muted)]">
                {review.description || "-"}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <InfoItem label="Marker" value={review.markerID || "-"} />
                <InfoItem label="Destination" value={review.destination || "-"} />
                <InfoItem label="Trip type" value={review.tripTypeName || "-"} />
                <InfoItem
                  label="Adult price"
                  value={formatPrice(review.adultPrice, review.currencyName)}
                />
                <InfoItem
                  label="Child price"
                  value={formatPrice(review.childPrice, review.currencyName)}
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-black/10 p-4">
            <p className="text-sm font-bold text-[var(--color-deep-ocean)]">
              Customer
            </p>
            <div className="mt-4 space-y-3">
              <InfoItem label="Name" value={getReviewerName(review)} />
              <IconInfoItem icon={Mail} label="Email" value={review.email || "-"} />
              <IconInfoItem icon={Phone} label="Phone" value={review.phone || "-"} />
              <InfoItem label="Review ID" value={String(review.id)} />
            </div>
          </div>
        </div>
      ) : null}
    </ReviewModalFrame>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-[#f7fbfd] px-3 py-3">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-bold text-[var(--color-deep-ocean)]">
        {value}
      </p>
    </div>
  );
}

function IconInfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-lg bg-[#f7fbfd] px-3 py-3">
      <Icon className="mt-0.5 shrink-0 text-[var(--color-ocean)]" size={17} />
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-bold text-[var(--color-deep-ocean)]">
          {value}
        </p>
      </div>
    </div>
  );
}

function ReviewModalFrame({
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
      <section className="max-h-full w-full max-w-[880px] overflow-y-auto rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-ocean)]">
              {eyebrow}
            </p>
            <h2 className="mt-1 line-clamp-2 text-xl font-bold text-[var(--color-deep-ocean)]">
              {title}
            </h2>
          </div>
          <button
            aria-label="Close review details"
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

function ConfirmDeletePanel({
  error,
  isDeleting,
  onCancel,
  onConfirm,
  review,
}: {
  error: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  review: Review;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-4 py-6">
      <section className="w-full max-w-[440px] rounded-lg bg-white p-5 shadow-2xl">
        <h2 className="text-xl font-bold text-[var(--color-deep-ocean)]">
          Delete review
        </h2>
        <p className="mt-3 text-sm leading-[1.7] text-[var(--color-muted)]">
          This will remove the review from {getReviewerName(review)}. This
          action cannot be undone.
        </p>

        {error ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            className="h-10 rounded-lg border border-black/10 px-4 text-sm font-bold text-[var(--color-deep-ocean)]"
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
              <Loader2 className="animate-spin" size={17} />
            ) : (
              <Trash2 size={17} />
            )}
            <span>Delete</span>
          </button>
        </div>
      </section>
    </div>
  );
}
