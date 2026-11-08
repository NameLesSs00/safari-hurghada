"use client";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Loader2,
  MapPinned,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, type ReactNode, useMemo, useState } from "react";

import { adminLanguageOptions } from "@/src/features/admin/shared/languages";
import { getDestinationImageUrl } from "@/src/features/admin/destinations/api";
import {
  useCreateDestinationMutation,
  useDeleteDestinationImageMutation,
  useDeleteDestinationMutation,
  useDestinationTranslationsQuery,
  useDestinationsQuery,
  useUpdateDestinationImageMutation,
  useUpdateDestinationMutation,
} from "@/src/features/admin/destinations/hooks";
import type {
  Destination,
  DestinationFormValues,
  DestinationLanguage,
  DestinationNames,
} from "@/src/features/admin/destinations/types";

const languages = adminLanguageOptions;

const pageSizes = [6, 10, 20];

function getErrorText(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function getEmptyNames(): DestinationNames {
  return {
    en: "",
    fr: "",
    ru: "",
    ro: "",
  };
}

export function AdminDestinationsPage() {
  const [language, setLanguage] = useState<DestinationLanguage>("en");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [draftSearch, setDraftSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingDestination, setEditingDestination] =
    useState<Destination | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [destinationToDelete, setDestinationToDelete] =
    useState<Destination | null>(null);

  const destinationsQuery = useDestinationsQuery({
    language,
    pageNumber,
    pageSize,
    searchTerm,
  });
  const deleteMutation = useDeleteDestinationMutation();

  const destinations = destinationsQuery.data?.data ?? [];
  const hasNextPage = destinations.length >= pageSize;

  const queryError = useMemo(
    () =>
      destinationsQuery.error
        ? getErrorText(
            destinationsQuery.error,
            "Unable to load destinations.",
          )
        : "",
    [destinationsQuery.error],
  );

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPageNumber(1);
    setSearchTerm(draftSearch.trim());
  }

  function handleDeleteDestination() {
    if (!destinationToDelete) {
      return;
    }

    deleteMutation.mutate(destinationToDelete.id, {
      onSuccess: () => {
        setDestinationToDelete(null);
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
            Destinations
          </h1>
          <p className="mt-3 max-w-[680px] text-base leading-[1.7] text-[var(--color-muted)]">
            Manage destination names, imagery, featured status, and translated
            API content.
          </p>
        </div>

        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-ocean)] px-4 text-sm font-bold text-white transition hover:bg-[var(--color-deep-ocean)] sm:w-fit"
          onClick={() => setIsCreating(true)}
          type="button"
        >
          <Plus size={18} />
          <span>Add destination</span>
        </button>
      </div>

      <section className="rounded-lg border border-black/5 bg-white p-4 shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
        <div className="grid gap-3 lg:grid-cols-[1fr_180px_150px]">
          <form className="relative" onSubmit={handleSearch}>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
              size={18}
            />
            <input
              className="h-11 w-full rounded-lg border border-black/10 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
              onChange={(event) => setDraftSearch(event.target.value)}
              placeholder="Search destinations"
              type="search"
              value={draftSearch}
            />
          </form>

          <select
            className="h-11 rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold text-[var(--color-deep-ocean)] outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
            onChange={(event) => {
              setPageNumber(1);
              setLanguage(event.target.value as DestinationLanguage);
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
            Destination list
          </p>
          {destinationsQuery.isFetching ? (
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

        {!queryError && destinationsQuery.isLoading ? (
          <div className="grid min-h-[320px] place-items-center text-[var(--color-deep-ocean)]">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <Loader2 className="animate-spin" size={20} />
              <span>Loading destinations</span>
            </div>
          </div>
        ) : null}

        {!queryError && !destinationsQuery.isLoading && destinations.length === 0 ? (
          <div className="grid min-h-[320px] place-items-center px-4 py-12 text-center">
            <div>
              <MapPinned
                className="mx-auto text-[var(--color-ocean)]"
                size={34}
              />
              <h2 className="mt-4 text-xl font-bold text-[var(--color-deep-ocean)]">
                No destinations found
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Add the first destination or adjust your search.
              </p>
            </div>
          </div>
        ) : null}

        {!queryError && destinations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead className="bg-[#f5f9ff] text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                <tr>
                  <th className="px-4 py-3">Destination</th>
                  <th className="px-4 py-3">Featured</th>
                  <th className="px-4 py-3">Trips</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {destinations.map((destination) => (
                  <tr key={destination.id}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <DestinationThumb destination={destination} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-[var(--color-deep-ocean)]">
                            {destination.name}
                          </p>
                          <p className="mt-1 text-xs text-[var(--color-muted)]">
                            ID {destination.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex h-8 items-center gap-1 rounded-full px-3 text-xs font-bold ${
                          destination.isFeatured
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {destination.isFeatured ? (
                          <Star size={14} />
                        ) : (
                          <X size={14} />
                        )}
                        {destination.isFeatured ? "Featured" : "Standard"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-[var(--foreground)]">
                      {destination.tripsCount}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          aria-label={`Edit ${destination.name}`}
                          className="grid size-9 place-items-center rounded-lg border border-black/10 text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] hover:text-[var(--color-ocean)]"
                          onClick={() => setEditingDestination(destination)}
                          type="button"
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          aria-label={`Delete ${destination.name}`}
                          className="grid size-9 place-items-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50"
                          onClick={() => setDestinationToDelete(destination)}
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
              disabled={pageNumber === 1 || destinationsQuery.isFetching}
              onClick={() => setPageNumber((current) => Math.max(1, current - 1))}
              type="button"
            >
              <ChevronLeft size={17} />
              <span>Previous</span>
            </button>
            <button
              className="flex h-10 items-center gap-2 rounded-lg border border-black/10 px-3 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!hasNextPage || destinationsQuery.isFetching}
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
        <DestinationFormPanel
          key="create"
          mode="create"
          onClose={() => setIsCreating(false)}
        />
      ) : null}

      {editingDestination ? (
        <DestinationFormPanel
          destination={editingDestination}
          key={editingDestination.id}
          mode="edit"
          onClose={() => setEditingDestination(null)}
        />
      ) : null}

      {destinationToDelete ? (
        <ConfirmDeletePanel
          destination={destinationToDelete}
          error={getErrorText(deleteMutation.error, "")}
          isDeleting={deleteMutation.isPending}
          onCancel={() => setDestinationToDelete(null)}
          onConfirm={handleDeleteDestination}
        />
      ) : null}
    </div>
  );
}

function DestinationThumb({ destination }: { destination: Destination }) {
  const imageUrl = getDestinationImageUrl(destination.imageUrl);

  return (
    <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#eef4f8]">
      {imageUrl ? (
        <Image
          alt={`${destination.name} destination`}
          className="size-full object-cover"
          height={56}
          src={imageUrl}
          unoptimized
          width={56}
        />
      ) : (
        <ImageOff className="text-[var(--color-muted)]" size={20} />
      )}
    </div>
  );
}

function DestinationFormPanel({
  destination,
  mode,
  onClose,
}: {
  destination?: Destination;
  mode: "create" | "edit";
  onClose: () => void;
}) {
  const isEdit = mode === "edit";
  const translationsQuery = useDestinationTranslationsQuery(
    isEdit ? (destination?.id ?? null) : null,
  );
  const title = isEdit ? (destination?.name ?? "Destination") : "Add destination";

  if (isEdit && translationsQuery.isLoading) {
    return (
      <DestinationModalFrame
        eyebrow="Edit destination"
        onClose={onClose}
        title={title}
      >
        <div className="grid min-h-[280px] place-items-center p-5 text-[var(--color-deep-ocean)]">
          <div className="flex items-center gap-3 text-sm font-semibold">
            <Loader2 className="animate-spin" size={20} />
            <span>Loading translations</span>
          </div>
        </div>
      </DestinationModalFrame>
    );
  }

  if (isEdit && translationsQuery.error) {
    return (
      <DestinationModalFrame
        eyebrow="Edit destination"
        onClose={onClose}
        title={title}
      >
        <div className="space-y-4 p-5">
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {getErrorText(
              translationsQuery.error,
              "Unable to load destination translations.",
            )}
          </p>
          <button
            className="h-10 rounded-lg border border-black/10 px-4 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)]"
            onClick={() => void translationsQuery.refetch()}
            type="button"
          >
            Try again
          </button>
        </div>
      </DestinationModalFrame>
    );
  }

  const initialNames = isEdit
    ? (translationsQuery.data ?? getEmptyNames())
    : getEmptyNames();

  return (
    <DestinationFormFields
      destination={destination}
      initialNames={initialNames}
      key={`${mode}-${destination?.id ?? "new"}-${Object.values(initialNames).join("|")}`}
      mode={mode}
      onClose={onClose}
    />
  );
}

function DestinationFormFields({
  destination,
  initialNames,
  mode,
  onClose,
}: {
  destination?: Destination;
  initialNames: DestinationNames;
  mode: "create" | "edit";
  onClose: () => void;
}) {
  const createMutation = useCreateDestinationMutation();
  const updateMutation = useUpdateDestinationMutation();
  const updateImageMutation = useUpdateDestinationImageMutation();
  const deleteImageMutation = useDeleteDestinationImageMutation();
  const [names, setNames] = useState(initialNames);
  const [isFeatured, setIsFeatured] = useState(
    destination?.isFeatured ?? false,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageActionFile, setImageActionFile] = useState<File | null>(null);
  const [fieldError, setFieldError] = useState("");

  const isEdit = mode === "edit";
  const submitMutation = isEdit ? updateMutation : createMutation;
  const imageUrl = destination
    ? getDestinationImageUrl(destination.imageUrl)
    : "";
  const submitError = getErrorText(submitMutation.error, "");
  const imageError =
    getErrorText(updateImageMutation.error, "") ||
    getErrorText(deleteImageMutation.error, "");

  function updateName(language: DestinationLanguage, value: string) {
    setNames((current) => ({
      ...current,
      [language]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError("");

    if (!names.en.trim() || !names.fr.trim()) {
      setFieldError("All translated names are required.");
      return;
    }

    if (!isEdit && !imageFile) {
      setFieldError("Destination image is required.");
      return;
    }

    const values: DestinationFormValues = {
      id: destination?.id,
      imageFile: isEdit ? null : imageFile,
      isFeatured,
      names,
    };

    submitMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  function handleReplaceImage() {
    if (!destination || !imageActionFile) {
      setFieldError("Choose an image before replacing it.");
      return;
    }

    setFieldError("");
    updateImageMutation.mutate(
      {
        id: destination.id,
        imageFile: imageActionFile,
      },
      {
        onSuccess: () => {
          setImageActionFile(null);
        },
      },
    );
  }

  function handleDeleteImage() {
    if (!destination) {
      return;
    }

    setFieldError("");
    deleteImageMutation.mutate(destination.id);
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-4 py-6">
      <section className="max-h-full w-full max-w-[760px] overflow-y-auto rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-ocean)]">
              {isEdit ? "Edit destination" : "New destination"}
            </p>
            <h2 className="mt-1 text-xl font-bold text-[var(--color-deep-ocean)]">
              {isEdit ? destination?.name : "Add destination"}
            </h2>
          </div>
          <button
            aria-label="Close destination form"
            className="grid size-9 place-items-center rounded-lg border border-black/10 text-[var(--color-deep-ocean)]"
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <form className="space-y-5 p-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            {languages.map((item) => (
              <label className="block" key={item.value}>
                <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
                  Name.{item.displayCode}
                </span>
                <input
                  className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
                  onChange={(event) =>
                    updateName(item.value, event.target.value)
                  }
                  placeholder={`${item.label} name`}
                  value={names[item.value]}
                />
              </label>
            ))}
          </div>

          <label className="flex items-center gap-3 rounded-lg border border-black/10 px-4 py-3">
            <input
              checked={isFeatured}
              className="size-4 accent-[var(--color-ocean)]"
              onChange={(event) => setIsFeatured(event.target.checked)}
              type="checkbox"
            />
            <span className="text-sm font-semibold text-[var(--color-deep-ocean)]">
              Featured destination
            </span>
          </label>

          {!isEdit ? (
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
                Image <span className="text-red-600">*</span>
              </span>
              <input
                accept="image/*"
                className="block w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-[var(--color-muted)] file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--color-ocean)] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
                onChange={(event) =>
                  setImageFile(event.target.files?.[0] ?? null)
                }
                required
                type="file"
              />
            </label>
          ) : null}

          {isEdit ? (
            <div className="rounded-lg border border-black/10 p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="grid h-24 w-full place-items-center overflow-hidden rounded-lg bg-[#eef4f8] md:w-36">
                  {imageUrl ? (
                    <Image
                      alt={`${destination?.name ?? "Destination"} current`}
                      className="size-full object-cover"
                      height={96}
                      src={imageUrl}
                      unoptimized
                      width={144}
                    />
                  ) : (
                    <ImageOff className="text-[var(--color-muted)]" size={22} />
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  <input
                    accept="image/*"
                    className="block w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-[var(--color-muted)] file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--color-ocean)] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
                    onChange={(event) =>
                      setImageActionFile(event.target.files?.[0] ?? null)
                    }
                    type="file"
                  />
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      className="flex h-10 items-center justify-center gap-2 rounded-lg border border-black/10 px-3 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={
                        updateImageMutation.isPending || !imageActionFile
                      }
                      onClick={handleReplaceImage}
                      type="button"
                    >
                      {updateImageMutation.isPending ? (
                        <Loader2 className="animate-spin" size={17} />
                      ) : (
                        <Upload size={17} />
                      )}
                      <span>Replace image</span>
                    </button>
                    <button
                      className="flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 px-3 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={deleteImageMutation.isPending}
                      onClick={handleDeleteImage}
                      type="button"
                    >
                      {deleteImageMutation.isPending ? (
                        <Loader2 className="animate-spin" size={17} />
                      ) : (
                        <ImageOff size={17} />
                      )}
                      <span>Delete image</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {fieldError || submitError || imageError ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {fieldError || submitError || imageError}
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
              <span>{isEdit ? "Save changes" : "Create destination"}</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function DestinationModalFrame({
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
      <section className="max-h-full w-full max-w-[760px] overflow-y-auto rounded-lg bg-white shadow-2xl">
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
            aria-label="Close destination form"
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
  destination,
  error,
  isDeleting,
  onCancel,
  onConfirm,
}: {
  destination: Destination;
  error: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-4 py-6">
      <section className="w-full max-w-[420px] rounded-lg bg-white p-5 shadow-2xl">
        <h2 className="text-xl font-bold text-[var(--color-deep-ocean)]">
          Delete destination
        </h2>
        <p className="mt-3 text-sm leading-[1.7] text-[var(--color-muted)]">
          This will remove {destination.name}. This action cannot be undone.
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
