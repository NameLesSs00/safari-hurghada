"use client";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  ImageOff,
  Images,
  Loader2,
  Pencil,
  Plus,
  Power,
  PowerOff,
  Route,
  Search,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  FormEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useDestinationsQuery } from "@/src/features/admin/destinations/hooks";
import type { Destination } from "@/src/features/admin/destinations/types";
import { adminLanguageOptions } from "@/src/features/admin/shared/languages";
import { useTripTypesQuery } from "@/src/features/admin/trip-types/hooks";
import type { TripType } from "@/src/features/admin/trip-types/types";
import { getTripImageUrl } from "@/src/features/admin/trips/api";
import {
  useCreateTripMutation,
  useDeactivateTripMutation,
  useDeleteTripImageMutation,
  useReactivateTripMutation,
  useSetPrimaryTripImageMutation,
  useTripTranslationsQuery,
  useTripsQuery,
  useUpdateTripMutation,
  useUploadTripImagesMutation,
} from "@/src/features/admin/trips/hooks";
import type {
  LocalizedText,
  Trip,
  TripFormValues,
  TripImage,
  TripLanguage,
  TripTranslations,
} from "@/src/features/admin/trips/types";
import { tripLanguages } from "@/src/features/admin/trips/types";

const languages = adminLanguageOptions;

const pageSizes = [6, 10, 20];

const durationTypes = [
  { label: "Hours", value: 0 },
  { label: "Days", value: 1 },
];

const weekDays = [
  { label: "Sun", fullLabel: "Sunday", value: 0 },
  { label: "Mon", fullLabel: "Monday", value: 1 },
  { label: "Tue", fullLabel: "Tuesday", value: 2 },
  { label: "Wed", fullLabel: "Wednesday", value: 3 },
  { label: "Thu", fullLabel: "Thursday", value: 4 },
  { label: "Fri", fullLabel: "Friday", value: 5 },
  { label: "Sat", fullLabel: "Saturday", value: 6 },
];

const formSteps = [
  "Setup",
  "Translations",
  "Content",
  "Images",
];

type ImageDraft = {
  file: File;
  previewUrl: string;
};

function getErrorText(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function getEmptyLocalizedText(): LocalizedText {
  return {
    en: "",
    fr: "",
    ru: "",
    ro: "",
  };
}

function getEmptyTranslations(): TripTranslations {
  return {
    name: getEmptyLocalizedText(),
    description: getEmptyLocalizedText(),
    highlights: [getEmptyLocalizedText()],
    includes: [getEmptyLocalizedText()],
    excludes: [getEmptyLocalizedText()],
    whatToBring: [getEmptyLocalizedText()],
  };
}

function getDayNumbers(dayNames: string[]) {
  return dayNames
    .map(
      (dayName) =>
        weekDays.find(
          (day) => day.fullLabel.toLowerCase() === dayName.toLowerCase(),
        )?.value,
    )
    .filter((value): value is number => typeof value === "number");
}
function getDurationTypeValue(durationTypeName?: string) {
  const normalized = durationTypeName?.toLowerCase() ?? "";

  if (normalized.includes("day")) {
    return 1;
  }

  return 0;
}

function getInitialValues({
  destinations,
  trip,
  translations,
  tripTypes,
}: {
  destinations: Destination[];
  trip?: Trip;
  translations?: TripTranslations;
  tripTypes: TripType[];
}): TripFormValues {
  const destinationId =
    trip?.destinationInfo?.id ??
    destinations.find((destination) => destination.name === trip?.destination)
      ?.id ??
    0;
  const tripTypeId =
    tripTypes.find(
      (tripType) =>
        tripType.name.toLowerCase() === trip?.tripTypeName?.toLowerCase(),
    )?.id ?? 0;

  return {
    id: trip?.id,
    destinationId,
    tripTypeId,
    timeFrom: trip?.timeFrom ?? "08:00:00",
    durationValue: trip?.durationValue ?? 1,
    durationType: getDurationTypeValue(trip?.durationTypeName),
    adultPrice: trip?.adultPrice ?? 0,
    childPrice: trip?.childPrice ?? 0,
    availabilityDayNo: trip ? getDayNumbers(trip.availableDays) : [],
    ...(translations ?? getEmptyTranslations()),
  };
}

function getPrimaryImage(images: TripImage[]) {
  return images.find((image) => image.isPrimary) ?? images[0] ?? null;
}

function formatPrice(value: number, currencyName: string) {
  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value)} ${currencyName || ""}`.trim();
}

function formatAvailableDays(days: string[]) {
  if (days.length >= 7) {
    return "Daily";
  }

  return days.slice(0, 3).join(", ") + (days.length > 3 ? "..." : "");
}

function isCompleteLocalizedText(value: LocalizedText) {
  return tripLanguages.every((language) => value[language].trim());
}

function isEmptyLocalizedText(value: LocalizedText) {
  return tripLanguages.every((language) => !value[language].trim());
}

function hasPartialLocalizedItem(items: LocalizedText[]) {
  return items.some(
    (item) => !isEmptyLocalizedText(item) && !isCompleteLocalizedText(item),
  );
}

export function AdminTripsPage() {
  const [language, setLanguage] = useState<TripLanguage>("en");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [draftSearch, setDraftSearch] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [destinationText, setDestinationText] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [typeId, setTypeId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [includeInactive, setIncludeInactive] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingTripId, setEditingTripId] = useState<number | null>(null);
  const [tripToToggle, setTripToToggle] = useState<Trip | null>(null);

  const destinationsQuery = useDestinationsQuery({
    language: "en",
    pageNumber: 1,
    pageSize: 200,
    searchTerm: "",
  });
  const tripTypesQuery = useTripTypesQuery({
    language: "en",
    pageNumber: 1,
    pageSize: 200,
  });
  const tripsQuery = useTripsQuery({
    destination: destinationText,
    destinationId,
    includeInactive,
    language,
    maxPrice,
    minPrice,
    pageNumber,
    pageSize,
    searchItem,
    typeId,
  });
  const deactivateMutation = useDeactivateTripMutation();
  const reactivateMutation = useReactivateTripMutation();

  const trips = tripsQuery.data?.data ?? [];
  const destinations = destinationsQuery.data?.data ?? [];
  const tripTypes = tripTypesQuery.data?.data ?? [];
  const hasNextPage = trips.length >= pageSize;

  const queryError = useMemo(
    () =>
      tripsQuery.error ? getErrorText(tripsQuery.error, "Unable to load trips.") : "",
    [tripsQuery.error],
  );
  const toggleError =
    getErrorText(deactivateMutation.error, "") ||
    getErrorText(reactivateMutation.error, "");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPageNumber(1);
    setSearchItem(draftSearch.trim());
  }

  function handleToggleTrip() {
    if (!tripToToggle) {
      return;
    }

    const mutation = tripToToggle.isActive
      ? deactivateMutation
      : reactivateMutation;

    mutation.mutate(tripToToggle.id, {
      onSuccess: () => {
        setTripToToggle(null);
      },
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-ocean)]">
            Content manager
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[var(--color-deep-ocean)] sm:text-4xl">
            Trips
          </h1>
          <p className="mt-3 max-w-[760px] text-base leading-[1.7] text-[var(--color-muted)]">
            Manage tour content, prices, schedules, availability, translations,
            and image galleries.
          </p>
        </div>

        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-ocean)] px-4 text-sm font-bold text-white transition hover:bg-[var(--color-deep-ocean)] sm:w-fit"
          onClick={() => setIsCreating(true)}
          type="button"
        >
          <Plus size={18} />
          <span>Add trip</span>
        </button>
      </div>

      <section className="rounded-lg border border-black/5 bg-white p-4 shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
        <div className="grid gap-3 lg:grid-cols-[1.1fr_160px_160px_150px]">
          <form className="relative" onSubmit={handleSearch}>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
              size={18}
            />
            <input
              className="h-11 w-full rounded-lg border border-black/10 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
              onChange={(event) => setDraftSearch(event.target.value)}
              placeholder="Search trips"
              type="search"
              value={draftSearch}
            />
          </form>

          <select
            className="h-11 rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold text-[var(--color-deep-ocean)] outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
            onChange={(event) => {
              setPageNumber(1);
              setLanguage(event.target.value as TripLanguage);
            }}
            value={language}
          >
            {languages.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <select
            className="h-11 rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold text-[var(--color-deep-ocean)] outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
            onChange={(event) => {
              setPageNumber(1);
              setDestinationId(event.target.value);
            }}
            value={destinationId}
          >
            <option value="">All destinations</option>
            {destinations.map((destination) => (
              <option key={destination.id} value={destination.id}>
                {destination.name}
              </option>
            ))}
          </select>

          <select
            className="h-11 rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold text-[var(--color-deep-ocean)] outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
            onChange={(event) => {
              setPageNumber(1);
              setTypeId(event.target.value);
            }}
            value={typeId}
          >
            <option value="">All types</option>
            {tripTypes.map((tripType) => (
              <option key={tripType.id} value={tripType.id}>
                {tripType.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_130px_130px_150px_150px]">
          <input
            className="h-11 rounded-lg border border-black/10 bg-white px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
            onChange={(event) => {
              setPageNumber(1);
              setDestinationText(event.target.value);
            }}
            placeholder="Destination name"
            value={destinationText}
          />
          <input
            className="h-11 rounded-lg border border-black/10 bg-white px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
            min="0"
            onChange={(event) => {
              setPageNumber(1);
              setMinPrice(event.target.value);
            }}
            placeholder="Min price"
            type="number"
            value={minPrice}
          />
          <input
            className="h-11 rounded-lg border border-black/10 bg-white px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
            min="0"
            onChange={(event) => {
              setPageNumber(1);
              setMaxPrice(event.target.value);
            }}
            placeholder="Max price"
            type="number"
            value={maxPrice}
          />
          <select
            className="h-11 rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold text-[var(--color-deep-ocean)] outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
            onChange={(event) => {
              setPageNumber(1);
              setIncludeInactive(event.target.value === "true");
            }}
            value={String(includeInactive)}
          >
            <option value="false">Active only</option>
            <option value="true">All statuses</option>
          </select>
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
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-black/5 bg-white shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
          <p className="text-sm font-bold text-[var(--color-deep-ocean)]">
            Trip list
          </p>
          {tripsQuery.isFetching ? (
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

        {!queryError && tripsQuery.isLoading ? (
          <div className="grid min-h-[360px] place-items-center text-[var(--color-deep-ocean)]">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <Loader2 className="animate-spin" size={20} />
              <span>Loading trips</span>
            </div>
          </div>
        ) : null}

        {!queryError && !tripsQuery.isLoading && trips.length === 0 ? (
          <div className="grid min-h-[360px] place-items-center px-4 py-12 text-center">
            <div>
              <Route className="mx-auto text-[var(--color-ocean)]" size={34} />
              <h2 className="mt-4 text-xl font-bold text-[var(--color-deep-ocean)]">
                No trips found
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Add the first trip or adjust the filters.
              </p>
            </div>
          </div>
        ) : null}

        {!queryError && trips.length > 0 ? (
          <div>
            <div className="hidden grid-cols-[minmax(220px,1.35fr)_minmax(120px,0.7fr)_minmax(100px,0.55fr)_minmax(140px,0.75fr)_minmax(125px,0.7fr)_minmax(100px,0.55fr)_88px] gap-3 bg-[#f5f9ff] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] xl:grid">
              <span>Trip</span>
              <span>Destination</span>
              <span>Type</span>
              <span>Schedule</span>
              <span>Price</span>
              <span>Status</span>
              <span className="text-right">Actions</span>
            </div>
            <div className="divide-y divide-black/5">
              {trips.map((trip) => (
                <TripListRow
                  key={trip.id}
                  onEdit={() => setEditingTripId(trip.id)}
                  onToggle={() => setTripToToggle(trip)}
                  trip={trip}
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
              disabled={pageNumber === 1 || tripsQuery.isFetching}
              onClick={() => setPageNumber((current) => Math.max(1, current - 1))}
              type="button"
            >
              <ChevronLeft size={17} />
              <span>Previous</span>
            </button>
            <button
              className="flex h-10 items-center gap-2 rounded-lg border border-black/10 px-3 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!hasNextPage || tripsQuery.isFetching}
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
        <TripFormPanel
          destinations={destinations}
          isOptionsLoading={destinationsQuery.isLoading || tripTypesQuery.isLoading}
          key="create"
          mode="create"
          onClose={() => setIsCreating(false)}
          tripTypes={tripTypes}
        />
      ) : null}

      {editingTripId ? (
        <TripFormPanel
          destinations={destinations}
          isOptionsLoading={destinationsQuery.isLoading || tripTypesQuery.isLoading}
          key={editingTripId}
          mode="edit"
          onClose={() => setEditingTripId(null)}
          tripId={editingTripId}
          tripTypes={tripTypes}
        />
      ) : null}

      {tripToToggle ? (
        <ConfirmTogglePanel
          error={toggleError}
          isPending={
            deactivateMutation.isPending || reactivateMutation.isPending
          }
          onCancel={() => setTripToToggle(null)}
          onConfirm={handleToggleTrip}
          trip={tripToToggle}
        />
      ) : null}
    </div>
  );
}

function TripThumb({ trip }: { trip: Trip }) {
  const image = getPrimaryImage(trip.images);
  const imageUrl = image ? getTripImageUrl(image.imageUrl) : "";

  return (
    <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#eef4f8]">
      {imageUrl ? (
        <Image
          alt={`${trip.name} trip`}
          className="size-full object-cover"
          height={64}
          src={imageUrl}
          unoptimized
          width={64}
        />
      ) : (
        <ImageOff className="text-[var(--color-muted)]" size={22} />
      )}
    </div>
  );
}

function TripListRow({
  onEdit,
  onToggle,
  trip,
}: {
  onEdit: () => void;
  onToggle: () => void;
  trip: Trip;
}) {
  return (
    <div className="grid gap-4 px-4 py-4 xl:grid-cols-[minmax(220px,1.35fr)_minmax(120px,0.7fr)_minmax(100px,0.55fr)_minmax(140px,0.75fr)_minmax(125px,0.7fr)_minmax(100px,0.55fr)_88px] xl:items-center">
      <div className="flex min-w-0 items-center gap-3">
        <TripThumb trip={trip} />
        <div className="min-w-0">
          <p className="line-clamp-2 text-sm font-bold leading-[1.55] text-[var(--color-deep-ocean)]">
            {trip.name}
          </p>
          <p className="mt-1 truncate text-xs text-[var(--color-muted)]">
            ID {trip.id} / Marker {trip.markerID}
          </p>
        </div>
      </div>

      <TripListCell
        label="Destination"
        value={trip.destinationInfo?.name ?? trip.destination ?? "-"}
      />
      <TripListCell label="Type" value={trip.tripTypeName || "-"} />
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] xl:hidden">
          Schedule
        </p>
        <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] xl:mt-0">
          <Clock size={15} />
          {trip.timeFrom}
        </p>
        <p className="mt-1 text-xs text-[var(--color-muted)]">
          {trip.durationValue} {trip.durationTypeName} /{" "}
          {formatAvailableDays(trip.availableDays)}
        </p>
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] xl:hidden">
          Price
        </p>
        <p className="mt-1 text-sm font-bold text-[var(--color-deep-ocean)] xl:mt-0">
          {trip.adultPrice === 0 ? "Contact us for price" : formatPrice(trip.adultPrice, trip.currencyName)}
        </p>
        <p className="mt-1 text-xs text-[var(--color-muted)]">
          Child {trip.childPrice === 0 ? "Contact us for price" : formatPrice(trip.childPrice, trip.currencyName)}
        </p>
      </div>
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] xl:hidden">
          Status
        </p>
        <span
          className={`inline-flex h-8 items-center gap-1 rounded-full px-3 text-xs font-bold ${
            trip.isActive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {trip.isActive ? <Power size={14} /> : <PowerOff size={14} />}
          {trip.isActive ? "Active" : "Inactive"}
        </span>
      </div>
      <div className="flex justify-start gap-2 xl:justify-end">
        <button
          aria-label={`Edit ${trip.name}`}
          className="grid size-9 place-items-center rounded-lg border border-black/10 text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] hover:text-[var(--color-ocean)]"
          onClick={onEdit}
          type="button"
        >
          <Pencil size={17} />
        </button>
        <button
          aria-label={
            trip.isActive
              ? `Deactivate ${trip.name}`
              : `Reactivate ${trip.name}`
          }
          className={`grid size-9 place-items-center rounded-lg border transition ${
            trip.isActive
              ? "border-red-200 text-red-600 hover:bg-red-50"
              : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          }`}
          onClick={onToggle}
          type="button"
        >
          {trip.isActive ? <PowerOff size={17} /> : <Power size={17} />}
        </button>
      </div>
    </div>
  );
}

function TripListCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)] xl:hidden">
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-semibold text-[var(--foreground)] xl:mt-0">
        {value}
      </p>
    </div>
  );
}

function TripFormPanel({
  destinations,
  isOptionsLoading,
  mode,
  onClose,
  tripId,
  tripTypes,
}: {
  destinations: Destination[];
  isOptionsLoading: boolean;
  mode: "create" | "edit";
  onClose: () => void;
  tripId?: number;
  tripTypes: TripType[];
}) {
  const isEdit = mode === "edit";
  const translationsQuery = useTripTranslationsQuery(isEdit ? (tripId ?? null) : null);

  if (isOptionsLoading || (isEdit && translationsQuery.isLoading)) {
    return (
      <TripModalFrame
        eyebrow={isEdit ? "Edit trip" : "New trip"}
        onClose={onClose}
        title={isEdit ? "Loading trip" : "Add trip"}
      >
        <div className="grid min-h-[320px] place-items-center p-5 text-[var(--color-deep-ocean)]">
          <div className="flex items-center gap-3 text-sm font-semibold">
            <Loader2 className="animate-spin" size={20} />
            <span>Loading trip data</span>
          </div>
        </div>
      </TripModalFrame>
    );
  }

  if (isEdit && translationsQuery.error) {
    return (
      <TripModalFrame
        eyebrow="Edit trip"
        onClose={onClose}
        title="Unable to load trip"
      >
        <div className="space-y-4 p-5">
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {getErrorText(translationsQuery.error, "Unable to load trip.")}
          </p>
          <button
            className="h-10 rounded-lg border border-black/10 px-4 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)]"
            onClick={() => void translationsQuery.refetch()}
            type="button"
          >
            Try again
          </button>
        </div>
      </TripModalFrame>
    );
  }

  const trip = translationsQuery.data?.trip;
  const initialValues = getInitialValues({
    destinations,
    translations: translationsQuery.data?.translations,
    trip,
    tripTypes,
  });

  return (
    <TripFormFields
      destinations={destinations}
      initialTrip={trip}
      initialValues={initialValues}
      key={`${mode}-${trip?.id ?? "new"}-${tripTypes.length}-${destinations.length}`}
      mode={mode}
      onClose={onClose}
      tripTypes={tripTypes}
    />
  );
}

function TripFormFields({
  destinations,
  initialTrip,
  initialValues,
  mode,
  onClose,
  tripTypes,
}: {
  destinations: Destination[];
  initialTrip?: Trip;
  initialValues: TripFormValues;
  mode: "create" | "edit";
  onClose: () => void;
  tripTypes: TripType[];
}) {
  const isEdit = mode === "edit";
  const createMutation = useCreateTripMutation();
  const updateMutation = useUpdateTripMutation();
  const uploadMutation = useUploadTripImagesMutation();
  const deleteImageMutation = useDeleteTripImageMutation();
  const setPrimaryMutation = useSetPrimaryTripImageMutation();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(initialValues);
  const [images, setImages] = useState(initialTrip?.images ?? []);
  const [imageDrafts, setImageDrafts] = useState<ImageDraft[]>([]);
  const imageDraftsRef = useRef<ImageDraft[]>([]);
  const [fieldError, setFieldError] = useState("");

  const submitMutation = isEdit ? updateMutation : createMutation;
  const isSaving = submitMutation.isPending || uploadMutation.isPending;
  const actionError =
    fieldError ||
    getErrorText(submitMutation.error, "") ||
    getErrorText(uploadMutation.error, "") ||
    getErrorText(deleteImageMutation.error, "") ||
    getErrorText(setPrimaryMutation.error, "");

  useEffect(() => {
    imageDraftsRef.current = imageDrafts;
  }, [imageDrafts]);

  useEffect(() => {
    return () => {
      imageDraftsRef.current.forEach((draft) =>
        URL.revokeObjectURL(draft.previewUrl),
      );
    };
  }, []);

  function updateValue<TKey extends keyof TripFormValues>(
    key: TKey,
    value: TripFormValues[TKey],
  ) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function updateLocalizedField(
    field: "name" | "description",
    language: TripLanguage,
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [field]: {
        ...current[field],
        [language]: value,
      },
    }));
  }

  function updateListItem(
    field: "highlights" | "includes" | "excludes" | "whatToBring",
    index: number,
    language: TripLanguage,
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [field]: current[field].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [language]: value } : item,
      ),
    }));
  }

  function addListItem(
    field: "highlights" | "includes" | "excludes" | "whatToBring",
  ) {
    setValues((current) => ({
      ...current,
      [field]: [...current[field], getEmptyLocalizedText()],
    }));
  }

  function removeListItem(
    field: "highlights" | "includes" | "excludes" | "whatToBring",
    index: number,
  ) {
    setValues((current) => ({
      ...current,
      [field]:
        current[field].length === 1
          ? [getEmptyLocalizedText()]
          : current[field].filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  function toggleDay(dayNo: number) {
    setValues((current) => {
      const nextDays = current.availabilityDayNo.includes(dayNo)
        ? current.availabilityDayNo.filter((item) => item !== dayNo)
        : [...current.availabilityDayNo, dayNo].sort((a, b) => a - b);

      return {
        ...current,
        availabilityDayNo: nextDays,
      };
    });
  }

  function validateCurrentStep() {
    if (step === 0) {
      if (!values.destinationId || !values.tripTypeId) {
        return "Destination and trip type are required.";
      }

      if (!values.timeFrom || values.durationValue <= 0) {
        return "Time and duration are required.";
      }

      if (values.adultPrice < 0 || values.childPrice < 0) {
        return "Prices cannot be negative.";
      }

      if (values.availabilityDayNo.length === 0) {
        return "Choose at least one available day.";
      }
    }

    if (step === 1) {
      if (
        !isCompleteLocalizedText(values.name) ||
        !isCompleteLocalizedText(values.description)
      ) {
        return "All translated names and descriptions are required.";
      }
    }

    if (step === 2) {
      if (
        hasPartialLocalizedItem(values.highlights) ||
        hasPartialLocalizedItem(values.includes) ||
        hasPartialLocalizedItem(values.excludes) ||
        hasPartialLocalizedItem(values.whatToBring)
      ) {
        return "Fill every language for each content item, or leave the whole item empty.";
      }
    }

    return "";
  }

  function goNext() {
    const validationError = validateCurrentStep();

    if (validationError) {
      setFieldError(validationError);
      return;
    }

    setFieldError("");
    setStep((current) => Math.min(formSteps.length - 1, current + 1));
  }

  function handleImageFiles(files: FileList | null) {
    if (!files?.length) {
      return;
    }

    setImageDrafts((current) => [
      ...current,
      ...Array.from(files).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    ]);
  }

  function removeDraftImage(previewUrl: string) {
    URL.revokeObjectURL(previewUrl);
    setImageDrafts((current) =>
      current.filter((draft) => draft.previewUrl !== previewUrl),
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step < formSteps.length - 1) {
      goNext();
      return;
    }

    const validationError = validateCurrentStep();

    if (validationError) {
      setFieldError(validationError);
      return;
    }

    setFieldError("");

    try {
      const response = await submitMutation.mutateAsync(values);
      const savedTripId = response.data.id;

      if (imageDrafts.length > 0) {
        await uploadMutation.mutateAsync({
          id: savedTripId,
          files: imageDrafts.map((draft) => draft.file),
        });
      }

      onClose();
    } catch {
      setFieldError("");
    }
  }

  function handleDeleteImage(imageId: number) {
    if (!values.id) {
      return;
    }

    deleteImageMutation.mutate(
      { id: values.id, imageId },
      {
        onSuccess: () => {
          setImages((current) => current.filter((image) => image.id !== imageId));
        },
      },
    );
  }

  function handleSetPrimaryImage(imageId: number) {
    if (!values.id) {
      return;
    }

    setPrimaryMutation.mutate(
      { id: values.id, imageId },
      {
        onSuccess: () => {
          setImages((current) =>
            current.map((image) => ({
              ...image,
              isPrimary: image.id === imageId,
            })),
          );
        },
      },
    );
  }

  return (
    <TripModalFrame
      eyebrow={isEdit ? "Edit trip" : "New trip"}
      onClose={onClose}
      title={isEdit ? (initialTrip?.name ?? "Edit trip") : "Add trip"}
    >
      <form onSubmit={handleSubmit}>
        <div className="border-b border-black/5 bg-[#fbfdff] px-5 py-3">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {formSteps.map((label, index) => (
              <button
                className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-left text-xs font-bold transition ${
                  index === step
                    ? "bg-[var(--color-deep-ocean)] text-white"
                    : index < step
                      ? "bg-[#e8f5f9] text-[var(--color-ocean)]"
                      : "bg-[#f5f9ff] text-[var(--color-muted)]"
                }`}
                key={label}
                onClick={() => {
                  if (index <= step) {
                    setFieldError("");
                    setStep(index);
                  }
                }}
                type="button"
              >
                <span
                  className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] ${
                    index === step ? "bg-white/18" : "bg-white"
                  }`}
                >
                  {index + 1}
                </span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-5">
          {step === 0 ? (
            <div className="rounded-lg border border-black/10 bg-white p-5">
              <div className="mb-5 flex flex-col gap-3 border-b border-black/5 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-lg bg-[#e8f5f9] text-[var(--color-ocean)]">
                    <Route size={20} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-deep-ocean)]">
                      Trip setup
                    </h3>
                    <p className="text-sm text-[var(--color-muted)]">
                      Destination, timing, EUR pricing, and availability.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                <BasicsStep
                  destinations={destinations}
                  onUpdate={updateValue}
                  tripTypes={tripTypes}
                  values={values}
                />
                <AvailabilityStep
                  onSelectAll={() =>
                    updateValue(
                      "availabilityDayNo",
                      values.availabilityDayNo.length === 7
                        ? []
                        : weekDays.map((day) => day.value),
                    )
                  }
                  onToggle={toggleDay}
                  values={values}
                />
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <LanguageStep
              onUpdate={updateLocalizedField}
              values={values}
            />
          ) : null}

          {step === 2 ? (
            <DetailsStep
              onAdd={addListItem}
              onRemove={removeListItem}
              onUpdate={updateListItem}
              values={values}
            />
          ) : null}

          {step === 3 ? (
            <div className="grid gap-5">
              <ImagesStep
                drafts={imageDrafts}
                images={images}
                isDeleting={deleteImageMutation.isPending}
                isSettingPrimary={setPrimaryMutation.isPending}
                onDeleteImage={handleDeleteImage}
                onFilesSelected={handleImageFiles}
                onRemoveDraft={removeDraftImage}
                onSetPrimary={handleSetPrimaryImage}
              />
            </div>
          ) : null}

          {actionError ? (
            <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {actionError}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-black/5 px-5 py-4 sm:flex-row sm:justify-end">
          <button
            className="h-11 rounded-lg border border-black/10 px-4 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)]"
            disabled={isSaving}
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          {step > 0 ? (
            <button
              className="h-11 rounded-lg border border-black/10 px-4 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSaving}
              onClick={() => {
                setFieldError("");
                setStep((current) => Math.max(0, current - 1));
              }}
              type="button"
            >
              Previous
            </button>
          ) : null}
          <button
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-[var(--color-ocean)] px-4 text-sm font-bold text-white transition hover:bg-[var(--color-deep-ocean)] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSaving}
            type="submit"
          >
            {isSaving ? (
              <Loader2 className="animate-spin" size={18} />
            ) : step === formSteps.length - 1 ? (
              <Check size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
            <span>
              {step === formSteps.length - 1
                ? isEdit
                  ? "Save changes"
                  : "Create trip"
                : "Next step"}
            </span>
          </button>
        </div>
      </form>
    </TripModalFrame>
  );
}

function BasicsStep({
  destinations,
  onUpdate,
  tripTypes,
  values,
}: {
  destinations: Destination[];
  onUpdate: <TKey extends keyof TripFormValues>(
    key: TKey,
    value: TripFormValues[TKey],
  ) => void;
  tripTypes: TripType[];
  values: TripFormValues;
}) {
  return (
    <div className="space-y-5">
      <div className="rounded-lg bg-[#f7fbfd] p-4">
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Classification
          </p>
          <h4 className="mt-1 text-base font-bold text-[var(--color-deep-ocean)]">
            Where this trip appears
          </h4>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
              Destination
            </span>
            <select
              className="h-12 w-full rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold text-[var(--color-deep-ocean)] outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
              onChange={(event) =>
                onUpdate("destinationId", Number(event.target.value))
              }
              value={values.destinationId}
            >
              <option value={0}>Choose destination</option>
              {destinations.map((destination) => (
                <option key={destination.id} value={destination.id}>
                  {destination.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
              Trip type
            </span>
            <select
              className="h-12 w-full rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold text-[var(--color-deep-ocean)] outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
              onChange={(event) =>
                onUpdate("tripTypeId", Number(event.target.value))
              }
              value={values.tripTypeId}
            >
              <option value={0}>Choose trip type</option>
              {tripTypes.map((tripType) => (
                <option key={tripType.id} value={tripType.id}>
                  {tripType.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="rounded-lg bg-[#f7fbfd] p-4">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
              Schedule
            </p>
            <h4 className="mt-1 text-base font-bold text-[var(--color-deep-ocean)]">
              Time and duration
            </h4>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 2xl:grid-cols-3">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
                Start time
              </span>
              <input
                className="h-12 w-full rounded-lg border border-black/10 bg-white px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
                onChange={(event) =>
                  onUpdate("timeFrom", `${event.target.value}:00`)
                }
                type="time"
                value={values.timeFrom.slice(0, 5)}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
                Duration
              </span>
              <input
                className="h-12 w-full rounded-lg border border-black/10 bg-white px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
                min="1"
                onChange={(event) =>
                  onUpdate("durationValue", Number(event.target.value))
                }
                type="number"
                value={values.durationValue}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
                Duration type
              </span>
              <select
                className="h-12 w-full rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold text-[var(--color-deep-ocean)] outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
                onChange={(event) =>
                  onUpdate("durationType", Number(event.target.value))
                }
                value={values.durationType}
              >
                {durationTypes.map((durationType) => (
                  <option key={durationType.value} value={durationType.value}>
                    {durationType.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="rounded-lg bg-[#f7fbfd] p-4">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
              Pricing
            </p>
            <h4 className="mt-1 text-base font-bold text-[var(--color-deep-ocean)]">
              Prices in EUR
            </h4>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <PriceInput
              label="Adult price"
              onChange={(value) => onUpdate("adultPrice", value)}
              value={values.adultPrice}
            />
            <PriceInput
              label="Child price"
              onChange={(value) => onUpdate("childPrice", value)}
              value={values.childPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PriceInput({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: number) => void;
  value: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
        {label} <span className="text-xs font-normal text-[var(--color-muted)]">(0 = Contact us)</span>
      </span>
      <div className="flex h-12 overflow-hidden rounded-lg border border-black/10 bg-white focus-within:border-[var(--color-ocean)] focus-within:ring-4 focus-within:ring-[rgba(0,105,147,0.12)]">
        <span className="grid w-16 shrink-0 place-items-center border-r border-black/10 bg-[#eef7fa] text-sm font-bold text-[var(--color-ocean)]">
          EUR
        </span>
        <input
          className="min-w-0 flex-1 px-3 text-sm outline-none"
          min="0"
          onChange={(event) => onChange(Number(event.target.value))}
          step="0.01"
          type="number"
          value={value}
        />
      </div>
    </label>
  );
}

function LanguageStep({
  onUpdate,
  values,
}: {
  onUpdate: (
    field: "name" | "description",
    language: TripLanguage,
    value: string,
  ) => void;
  values: TripFormValues;
}) {
  const completedLanguages = languages.filter(
    (language) =>
      (values.name[language.value] || "").trim() &&
      (values.description[language.value] || "").trim(),
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-lg border border-black/10 bg-[#fbfdff] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Translations
          </p>
          <h3 className="mt-1 text-lg font-bold text-[var(--color-deep-ocean)]">
            Trip title and description
          </h3>
        </div>
        <span className="inline-flex h-9 w-fit items-center rounded-lg bg-[#e8f5f9] px-3 text-sm font-bold text-[var(--color-ocean)]">
          {completedLanguages} / {languages.length} complete
        </span>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {languages.map((language) => {
          const isComplete =
            (values.name[language.value] || "").trim() &&
            (values.description[language.value] || "").trim();

          return (
            <div
              className="overflow-hidden rounded-lg border border-black/10 bg-white"
              key={language.value}
            >
              <div className="flex items-center justify-between gap-3 border-b border-black/5 bg-[#f7fbfd] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-white text-sm font-bold text-[var(--color-ocean)] shadow-sm">
                    {language.displayCode}
                  </span>
                  <p className="text-sm font-bold text-[var(--color-deep-ocean)]">
                    {language.label}
                  </p>
                </div>
                <span
                  className={`inline-flex h-8 items-center gap-1 rounded-lg px-2.5 text-xs font-bold ${
                    isComplete
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {isComplete ? <Check size={14} /> : <X size={14} />}
                  {isComplete ? "Ready" : "Missing"}
                </span>
              </div>

              <div className="space-y-4 p-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
                    Trip name
                  </span>
                  <input
                    className="h-12 w-full rounded-lg border border-black/10 bg-white px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
                    onChange={(event) =>
                      onUpdate("name", language.value, event.target.value)
                    }
                    placeholder={`${language.label} trip name`}
                    value={values.name[language.value] || ""}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
                    Description
                  </span>
                  <textarea
                    className="min-h-32 w-full resize-y rounded-lg border border-black/10 bg-white px-3 py-3 text-sm leading-6 outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
                    onChange={(event) =>
                      onUpdate(
                        "description",
                        language.value,
                        event.target.value,
                      )
                    }
                    placeholder={`${language.label} trip description`}
                    value={values.description[language.value] || ""}
                  />
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DetailsStep({
  onAdd,
  onRemove,
  onUpdate,
  values,
}: {
  onAdd: (
    field: "highlights" | "includes" | "excludes" | "whatToBring",
  ) => void;
  onRemove: (
    field: "highlights" | "includes" | "excludes" | "whatToBring",
    index: number,
  ) => void;
  onUpdate: (
    field: "highlights" | "includes" | "excludes" | "whatToBring",
    index: number,
    language: TripLanguage,
    value: string,
  ) => void;
  values: TripFormValues;
}) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <LocalizedListEditor
        items={values.highlights}
        label="Highlights"
        onAdd={() => onAdd("highlights")}
        onRemove={(index) => onRemove("highlights", index)}
        onUpdate={(index, language, value) =>
          onUpdate("highlights", index, language, value)
        }
      />
      <LocalizedListEditor
        items={values.includes}
        label="Includes"
        onAdd={() => onAdd("includes")}
        onRemove={(index) => onRemove("includes", index)}
        onUpdate={(index, language, value) =>
          onUpdate("includes", index, language, value)
        }
      />
      <LocalizedListEditor
        items={values.excludes}
        label="Excludes"
        onAdd={() => onAdd("excludes")}
        onRemove={(index) => onRemove("excludes", index)}
        onUpdate={(index, language, value) =>
          onUpdate("excludes", index, language, value)
        }
      />
      <LocalizedListEditor
        items={values.whatToBring}
        label="What to bring"
        onAdd={() => onAdd("whatToBring")}
        onRemove={(index) => onRemove("whatToBring", index)}
        onUpdate={(index, language, value) =>
          onUpdate("whatToBring", index, language, value)
        }
      />
    </div>
  );
}

function LocalizedListEditor({
  items,
  label,
  onAdd,
  onRemove,
  onUpdate,
}: {
  items: LocalizedText[];
  label: string;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, language: TripLanguage, value: string) => void;
}) {
  return (
    <div className="rounded-lg border border-black/10 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-[var(--color-deep-ocean)]">
          {label}
        </p>
        <button
          className="flex h-9 items-center gap-2 rounded-lg border border-black/10 px-3 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)]"
          onClick={onAdd}
          type="button"
        >
          <Plus size={16} />
          <span>Add</span>
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {items.map((item, index) => (
          <div
            className="rounded-lg bg-[#f7fbfd] p-3"
            key={`${label}-${index}`}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                Item {index + 1}
              </p>
              <button
                aria-label={`Remove ${label} item ${index + 1}`}
                className="grid size-8 place-items-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50"
                onClick={() => onRemove(index)}
                type="button"
              >
                <Trash2 size={15} />
              </button>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {languages.map((language) => (
                <div className="relative" key={language.value}>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-xs font-bold text-[var(--color-ocean)]">
                      {language.displayCode}
                    </span>
                  </div>
                  <input
                    className="h-10 w-full rounded-lg border border-black/10 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
                    onChange={(event) =>
                      onUpdate(index, language.value, event.target.value)
                    }
                    placeholder={`${label}`}
                    value={item[language.value] || ""}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AvailabilityStep({
  onSelectAll,
  onToggle,
  values,
}: {
  onSelectAll: () => void;
  onToggle: (dayNo: number) => void;
  values: TripFormValues;
}) {
  const isDaily = values.availabilityDayNo.length === 7;

  return (
    <div className="rounded-lg bg-[#f7fbfd] p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Availability
          </p>
          <h4 className="mt-1 text-base font-bold text-[var(--color-deep-ocean)]">
            Booking days
          </h4>
          <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
            Choose the days this trip can be booked.
          </p>
        </div>
        <button
          className={`h-10 rounded-lg px-4 text-sm font-bold transition ${
            isDaily
              ? "bg-[var(--color-deep-ocean)] text-white"
              : "border border-black/10 text-[var(--color-deep-ocean)] hover:border-[var(--color-ocean)]"
          }`}
          onClick={onSelectAll}
          type="button"
        >
          Daily
        </button>
      </div>

      <p className="mt-4 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-[var(--color-muted)]">
        Day numbers: 0 Sunday, 1 Monday, 2 Tuesday, 3 Wednesday, 4 Thursday,
        5 Friday, 6 Saturday.
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {weekDays.map((day) => {
          const isSelected = values.availabilityDayNo.includes(day.value);

          return (
            <button
              className={`min-h-16 rounded-lg border px-3 py-3 text-left transition ${
                isSelected
                  ? "border-[var(--color-ocean)] bg-[#e8f5f9]"
                  : "border-black/10 bg-white hover:border-[var(--color-ocean)]"
              }`}
              key={day.value}
              onClick={() => onToggle(day.value)}
              type="button"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                Day {day.value}
              </span>
              <span className="mt-1 block text-sm font-bold text-[var(--color-deep-ocean)]">
                {day.fullLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


function ImagesStep({
  drafts,
  images,
  isDeleting,
  isSettingPrimary,
  onDeleteImage,
  onFilesSelected,
  onRemoveDraft,
  onSetPrimary,
}: {
  drafts: ImageDraft[];
  images: TripImage[];
  isDeleting: boolean;
  isSettingPrimary: boolean;
  onDeleteImage: (imageId: number) => void;
  onFilesSelected: (files: FileList | null) => void;
  onRemoveDraft: (previewUrl: string) => void;
  onSetPrimary: (imageId: number) => void;
}) {
  return (
    <div className="space-y-5">
      <label className="block cursor-pointer rounded-xl border-2 border-dashed border-[rgba(0,105,147,0.3)] bg-[#f7fbfd] px-6 py-8 text-center transition hover:bg-[#f0f7ff] hover:border-[var(--color-ocean)]">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-white shadow-sm">
          <Upload className="text-[var(--color-ocean)]" size={24} />
        </div>
        <p className="mt-4 text-sm font-bold text-[var(--color-deep-ocean)]">
          Click to upload images
        </p>
        <p className="mt-1.5 text-xs text-[var(--color-muted)]">
          Select high-quality photos to showcase this trip
        </p>
        <input
          accept="image/*"
          className="hidden"
          multiple
          onChange={(event) => onFilesSelected(event.target.files)}
          type="file"
        />
      </label>

      {drafts.length > 0 ? (
        <div>
          <p className="mb-3 text-sm font-bold text-[var(--color-deep-ocean)]">
            New image preview
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {drafts.map((draft) => (
              <div
                className="overflow-hidden rounded-lg border border-black/10 bg-white"
                key={draft.previewUrl}
              >
                <div className="relative aspect-[4/3] bg-[#eef4f8]">
                  <Image
                    alt={draft.file.name}
                    className="object-cover"
                    fill
                    src={draft.previewUrl}
                    unoptimized
                  />
                </div>
                <div className="flex items-center justify-between gap-3 p-3">
                  <p className="truncate text-xs font-semibold text-[var(--color-muted)]">
                    {draft.file.name}
                  </p>
                  <button
                    aria-label={`Remove ${draft.file.name}`}
                    className="grid size-8 place-items-center rounded-lg border border-red-200 text-red-600"
                    onClick={() => onRemoveDraft(draft.previewUrl)}
                    type="button"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <p className="mb-3 text-sm font-bold text-[var(--color-deep-ocean)]">
          Existing images
        </p>
        {images.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <div
                className="overflow-hidden rounded-lg border border-black/10 bg-white"
                key={image.id}
              >
                <div className="relative aspect-[4/3] bg-[#eef4f8]">
                  <Image
                    alt="Trip"
                    className="object-cover"
                    fill
                    src={getTripImageUrl(image.imageUrl)}
                    unoptimized
                  />
                  {image.isPrimary ? (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-xs font-bold text-[var(--color-ocean)]">
                      <Star size={13} />
                      Primary
                    </span>
                  ) : null}
                </div>
                <div className="grid grid-cols-2 gap-2 p-3">
                  <button
                    className="flex h-9 items-center justify-center gap-2 rounded-lg border border-black/10 px-2 text-xs font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSettingPrimary || image.isPrimary}
                    onClick={() => onSetPrimary(image.id)}
                    type="button"
                  >
                    <Star size={14} />
                    <span>Primary</span>
                  </button>
                  <button
                    className="flex h-9 items-center justify-center gap-2 rounded-lg border border-red-200 px-2 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isDeleting}
                    onClick={() => onDeleteImage(image.id)}
                    type="button"
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid min-h-40 place-items-center rounded-lg border border-dashed border-black/10 bg-[#fbfdff] px-4 text-center">
            <div>
              <Images
                className="mx-auto text-[var(--color-ocean)]"
                size={30}
              />
              <p className="mt-3 text-sm font-bold text-[var(--color-deep-ocean)]">
                No images yet
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TripModalFrame({
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
      <section className="max-h-full w-full max-w-[1120px] overflow-y-auto rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/5 bg-white px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-ocean)]">
              {eyebrow}
            </p>
            <h2 className="mt-1 line-clamp-2 text-xl font-bold text-[var(--color-deep-ocean)]">
              {title}
            </h2>
          </div>
          <button
            aria-label="Close trip form"
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

function ConfirmTogglePanel({
  error,
  isPending,
  onCancel,
  onConfirm,
  trip,
}: {
  error: string;
  isPending: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  trip: Trip;
}) {
  const isDeactivating = trip.isActive;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-4 py-6">
      <section className="w-full max-w-[440px] rounded-lg bg-white p-5 shadow-2xl">
        <h2 className="text-xl font-bold text-[var(--color-deep-ocean)]">
          {isDeactivating ? "Deactivate trip" : "Reactivate trip"}
        </h2>
        <p className="mt-3 text-sm leading-[1.7] text-[var(--color-muted)]">
          {isDeactivating
            ? `${trip.name} will be hidden from active trip results.`
            : `${trip.name} will be available again in active trip results.`}
        </p>

        {error ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            className="h-10 rounded-lg border border-black/10 px-4 text-sm font-bold text-[var(--color-deep-ocean)]"
            disabled={isPending}
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className={`flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-70 ${
              isDeactivating
                ? "bg-red-600 hover:bg-red-700"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
            disabled={isPending}
            onClick={onConfirm}
            type="button"
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={17} />
            ) : isDeactivating ? (
              <PowerOff size={17} />
            ) : (
              <Power size={17} />
            )}
            <span>{isDeactivating ? "Deactivate" : "Reactivate"}</span>
          </button>
        </div>
      </section>
    </div>
  );
}
