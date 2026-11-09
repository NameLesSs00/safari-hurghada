"use client";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Loader2,
  Pencil,
  Plus,
  Tags,
  Trash2,
  X,
} from "lucide-react";
import { FormEvent, type ReactNode, useMemo, useState } from "react";

import { getImageUrl } from "@/src/shared/config/api";
import { AppImage } from "@/src/shared/components/app-image";
import {
  useCreateTripTypeMutation,
  useDeleteTripTypeMutation,
  useTripTypesQuery,
  useTripTypeTranslationsQuery,
  useUpdateTripTypeMutation,
} from "@/src/features/admin/trip-types/hooks";
import type {
  TripType,
  TripTypeFormValues,
  TripTypeLanguage,
  TripTypeNames,
} from "@/src/features/admin/trip-types/types";

const pageSizes = [6, 10, 20];

function getErrorText(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export function AdminTripTypesPage() {
  const [language, setLanguage] = useState<TripTypeLanguage>("en");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreating, setIsCreating] = useState(false);
  const [editingTripType, setEditingTripType] = useState<TripType | null>(null);
  const [tripTypeToDelete, setTripTypeToDelete] = useState<TripType | null>(
    null,
  );

  const tripTypesQuery = useTripTypesQuery({
    language,
    pageNumber,
    pageSize,
  });
  const deleteMutation = useDeleteTripTypeMutation();

  const tripTypes = tripTypesQuery.data?.data ?? [];
  const hasNextPage = tripTypes.length >= pageSize;

  const queryError = useMemo(
    () =>
      tripTypesQuery.error
        ? getErrorText(tripTypesQuery.error, "Unable to load trip types.")
        : "",
    [tripTypesQuery.error],
  );

  function handleDeleteTripType() {
    if (!tripTypeToDelete) {
      return;
    }

    deleteMutation.mutate(tripTypeToDelete.id, {
      onSuccess: () => {
        setTripTypeToDelete(null);
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
            Trip Types
          </h1>
          <p className="mt-3 max-w-[680px] text-base leading-[1.7] text-[var(--color-muted)]">
            Manage multilingual trip categories used to organize tours and
            customer browsing.
          </p>
        </div>

        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-ocean)] px-4 text-sm font-bold text-white transition hover:bg-[var(--color-deep-ocean)] sm:w-fit"
          onClick={() => setIsCreating(true)}
          type="button"
        >
          <Plus size={18} />
          <span>Add trip type</span>
        </button>
      </div>

      <section className="rounded-lg border border-black/5 bg-white p-4 shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
        <div className="flex sm:w-[180px]">
          <select
            className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold text-[var(--color-deep-ocean)] outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-orange-500/15"
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
            Trip type list
          </p>
          {tripTypesQuery.isFetching ? (
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

        {!queryError && tripTypesQuery.isLoading ? (
          <div className="grid min-h-[320px] place-items-center text-[var(--color-deep-ocean)]">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <Loader2 className="animate-spin" size={20} />
              <span>Loading trip types</span>
            </div>
          </div>
        ) : null}

        {!queryError && !tripTypesQuery.isLoading && tripTypes.length === 0 ? (
          <div className="grid min-h-[320px] place-items-center px-4 py-12 text-center">
            <div>
              <Tags className="mx-auto text-[var(--color-ocean)]" size={34} />
              <h2 className="mt-4 text-xl font-bold text-[var(--color-deep-ocean)]">
                No trip types found
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Add the first trip type to classify tours.
              </p>
            </div>
          </div>
        ) : null}

        {!queryError && tripTypes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead className="bg-slate-50 border-b border-black/5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                <tr>
                  <th className="px-4 py-3.5 w-[140px]">Image</th>
                  <th className="px-4 py-3.5">Name</th>
                  <th className="px-4 py-3.5 w-24">ID</th>
                  <th className="px-4 py-3.5 text-right w-28">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {tripTypes.map((tripType) => (
                  <tr key={tripType.id} className="transition hover:bg-slate-50/60">
                    <td className="px-4 py-3.5 align-middle">
                      <div className="relative h-18 w-28 shrink-0 overflow-hidden rounded-xl border border-black/10 bg-slate-100 shadow-xs">
                        <AppImage
                          alt={tripType.name}
                          className="size-full object-cover transition-transform duration-300 hover:scale-105"
                          fill
                          src={getImageUrl(tripType.imageUrl)}
                          unoptimized
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3.5 align-middle">
                      <p className="text-base font-bold text-[var(--color-deep-ocean)]">
                        {tripType.name}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 align-middle text-sm font-semibold text-[var(--foreground)]">
                      {tripType.id}
                    </td>
                    <td className="px-4 py-3.5 align-middle">
                      <div className="flex justify-end gap-2">
                        <button
                          aria-label={`Edit ${tripType.name}`}
                          className="grid size-9 place-items-center rounded-lg border border-black/10 text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] hover:text-[var(--color-ocean)]"
                          onClick={() => setEditingTripType(tripType)}
                          type="button"
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          aria-label={`Delete ${tripType.name}`}
                          className="grid size-9 place-items-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50"
                          onClick={() => setTripTypeToDelete(tripType)}
                          type="button"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-black/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--color-muted)]">
            Page {pageNumber}
          </p>
          <div className="flex gap-2">
            <button
              className="flex h-10 items-center gap-2 rounded-lg border border-black/10 px-3 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={pageNumber === 1 || tripTypesQuery.isFetching}
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
              disabled={!hasNextPage || tripTypesQuery.isFetching}
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
        <TripTypeFormPanel
          key="create"
          mode="create"
          onClose={() => setIsCreating(false)}
        />
      ) : null}

      {editingTripType ? (
        <TripTypeFormPanel
          key={editingTripType.id}
          mode="edit"
          onClose={() => setEditingTripType(null)}
          tripType={editingTripType}
        />
      ) : null}

      {tripTypeToDelete ? (
        <ConfirmDeletePanel
          error={getErrorText(deleteMutation.error, "")}
          isDeleting={deleteMutation.isPending}
          onCancel={() => setTripTypeToDelete(null)}
          onConfirm={handleDeleteTripType}
          tripType={tripTypeToDelete}
        />
      ) : null}
    </div>
  );
}

function TripTypeFormPanel({
  mode,
  onClose,
  tripType,
}: {
  mode: "create" | "edit";
  onClose: () => void;
  tripType?: TripType;
}) {
  const initialName = mode === "edit" ? (tripType?.name ?? "") : "";

  return (
    <TripTypeFormFields
      initialName={initialName}
      key={`${mode}-${tripType?.id ?? "new"}`}
      mode={mode}
      onClose={onClose}
      tripType={tripType}
    />
  );
}

function TripTypeFormFields({
  initialName,
  mode,
  onClose,
  tripType,
}: {
  initialName: string;
  mode: "create" | "edit";
  onClose: () => void;
  tripType?: TripType;
}) {
  const createMutation = useCreateTripTypeMutation();
  const updateMutation = useUpdateTripTypeMutation();
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState<File | null>(null);
  const [fieldError, setFieldError] = useState("");

  const isEdit = mode === "edit";
  const submitMutation = isEdit ? updateMutation : createMutation;
  const submitError = getErrorText(submitMutation.error, "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError("");

    if (!name.trim()) {
      setFieldError("Trip type name is required.");
      return;
    }

    const values: TripTypeFormValues = {
      id: tripType?.id,
      name: name.trim(),
      image,
    };

    submitMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <TripTypeModalFrame
      eyebrow={isEdit ? "Edit trip type" : "New trip type"}
      onClose={onClose}
      title={isEdit ? (tripType?.name ?? "Trip type") : "Add trip type"}
    >
      <form className="space-y-5 p-5" onSubmit={handleSubmit}>
        <div>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
              Trip Type Name <span className="text-red-600">*</span>
            </span>
            <input
              className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-orange-500/15"
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Desert Safari, Sea Trips, Historical"
              required
              value={name}
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
            Image {isEdit ? "" : <span className="text-red-600">*</span>}
          </span>
          <input
            accept="image/*"
            className="block w-full text-sm text-[var(--color-muted)] file:mr-4 file:rounded-full file:border-0 file:bg-[var(--color-ocean)]/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[var(--color-ocean)] hover:file:bg-[var(--color-ocean)]/20"
            onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                setImage(event.target.files[0]);
              }
            }}
            type="file"
            required={!isEdit}
          />
        </label>

        {fieldError || submitError ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {fieldError || submitError}
          </p>
        ) : null}

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
            disabled={submitMutation.isPending}
            type="submit"
          >
            {submitMutation.isPending ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Check size={18} />
            )}
            <span>{isEdit ? "Save changes" : "Create trip type"}</span>
          </button>
        </div>
      </form>
    </TripTypeModalFrame>
  );
}

function TripTypeModalFrame({
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
      <section className="max-h-full w-full max-w-[680px] overflow-y-auto rounded-lg bg-white shadow-2xl">
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
            aria-label="Close trip type form"
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
  tripType,
}: {
  error: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  tripType: TripType;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-4 py-6">
      <section className="w-full max-w-[420px] rounded-lg bg-white p-5 shadow-2xl">
        <h2 className="text-xl font-bold text-[var(--color-deep-ocean)]">
          Delete trip type
        </h2>
        <p className="mt-3 text-sm leading-[1.7] text-[var(--color-muted)]">
          This will remove {tripType.name}. Trip types already used by trips
          may not be deletable.
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
