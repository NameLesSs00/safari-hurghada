"use client";

import {
  Check,
  Eye,
  ImageOff,
  Images,
  Loader2,
  Plus,
  Star,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, type ReactNode, useMemo, useState } from "react";

import { getGalleryImageUrl } from "@/src/features/admin/gallery/api";
import {
  useAddGalleryImageMutation,
  useDeleteGalleryImageMutation,
  useGalleryImageQuery,
  useGalleryImagesQuery,
} from "@/src/features/admin/gallery/hooks";
import type { GalleryImage } from "@/src/features/admin/gallery/types";

function getErrorText(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export function AdminGalleryPage() {
  const galleryQuery = useGalleryImagesQuery();
  const deleteMutation = useDeleteGalleryImageMutation();
  const [isAddingImage, setIsAddingImage] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<GalleryImage | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

  const images = galleryQuery.data?.data ?? [];
  const featuredCount = images.filter((image) => image.isFeatured).length;

  const queryError = useMemo(
    () =>
      galleryQuery.error
        ? getErrorText(galleryQuery.error, "Unable to load gallery images.")
        : "",
    [galleryQuery.error],
  );

  function handleDeleteImage() {
    if (!imageToDelete) {
      return;
    }

    deleteMutation.mutate(imageToDelete.id, {
      onSuccess: () => {
        setImageToDelete(null);
      },
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-ocean)]">
            Media manager
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[var(--color-deep-ocean)] sm:text-4xl">
            Gallery
          </h1>
          <p className="mt-3 max-w-[720px] text-base leading-[1.7] text-[var(--color-muted)]">
            Curate the images used across the travel experience. Featured
            images can be surfaced more prominently in the client app.
          </p>
        </div>

        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-ocean)] px-4 text-sm font-bold text-white transition hover:bg-[var(--color-deep-ocean)] sm:w-fit"
          onClick={() => setIsAddingImage(true)}
          type="button"
        >
          <Plus size={18} />
          <span>Add image</span>
        </button>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Total images" value={images.length} />
        <SummaryCard label="Featured" value={featuredCount} />
        <SummaryCard label="Standard" value={images.length - featuredCount} />
      </section>

      {queryError ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {queryError}
        </p>
      ) : null}

      {!queryError && galleryQuery.isLoading ? (
        <section className="grid min-h-[360px] place-items-center rounded-lg border border-black/5 bg-white text-[var(--color-deep-ocean)] shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
          <div className="flex items-center gap-3 text-sm font-semibold">
            <Loader2 className="animate-spin" size={20} />
            <span>Loading gallery</span>
          </div>
        </section>
      ) : null}

      {!queryError && !galleryQuery.isLoading && images.length === 0 ? (
        <section className="grid min-h-[360px] place-items-center rounded-lg border border-black/5 bg-white px-4 py-12 text-center shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
          <div>
            <Images className="mx-auto text-[var(--color-ocean)]" size={38} />
            <h2 className="mt-4 text-xl font-bold text-[var(--color-deep-ocean)]">
              No gallery images yet
            </h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Add the first image to start building the gallery.
            </p>
          </div>
        </section>
      ) : null}

      {!queryError && images.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {images.map((galleryImage) => (
            <GalleryCard
              galleryImage={galleryImage}
              key={galleryImage.id}
              onDelete={() => setImageToDelete(galleryImage)}
              onPreview={() => setSelectedImageId(galleryImage.id)}
            />
          ))}
        </section>
      ) : null}

      {isAddingImage ? (
        <AddGalleryImagePanel onClose={() => setIsAddingImage(false)} />
      ) : null}

      {imageToDelete ? (
        <ConfirmDeletePanel
          error={getErrorText(deleteMutation.error, "")}
          galleryImage={imageToDelete}
          isDeleting={deleteMutation.isPending}
          onCancel={() => setImageToDelete(null)}
          onConfirm={handleDeleteImage}
        />
      ) : null}

      {selectedImageId ? (
        <GalleryDetailPanel
          imageId={selectedImageId}
          onClose={() => setSelectedImageId(null)}
          onDelete={(galleryImage) => {
            setSelectedImageId(null);
            setImageToDelete(galleryImage);
          }}
        />
      ) : null}
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-black/5 bg-white p-5 shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
      <p className="text-sm font-semibold text-[var(--color-muted)]">
        {label}
      </p>
      <p className="mt-3 text-3xl font-bold text-[var(--color-deep-ocean)]">
        {value}
      </p>
    </div>
  );
}

function GalleryCard({
  galleryImage,
  onDelete,
  onPreview,
}: {
  galleryImage: GalleryImage;
  onDelete: () => void;
  onPreview: () => void;
}) {
  const imageUrl = getGalleryImageUrl(galleryImage.imageUrl);

  return (
    <article className="overflow-hidden rounded-lg border border-black/5 bg-white shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
      <button
        className="relative block aspect-[4/3] w-full overflow-hidden bg-[#eef4f8] cursor-pointer"
        onClick={onPreview}
        type="button"
      >
        {imageUrl ? (
          <Image
            alt={`Gallery image ${galleryImage.id}`}
            className="object-cover transition duration-300 hover:scale-105"
            fill
            sizes="(min-width: 1536px) 25vw, (min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            src={imageUrl}
            unoptimized
          />
        ) : (
          <span className="grid size-full place-items-center">
            <ImageOff className="text-[var(--color-muted)]" size={28} />
          </span>
        )}
        {galleryImage.isFeatured ? (
          <span className="absolute left-3 top-3 inline-flex h-8 items-center gap-1 rounded-full bg-emerald-50 px-3 text-xs font-bold text-emerald-700 shadow-sm">
            <Star size={14} />
            Featured
          </span>
        ) : null}
      </button>

      <div className="flex items-center justify-between gap-3 p-4">
        <div>
          <p className="text-sm font-bold text-[var(--color-deep-ocean)]">
            Image {galleryImage.id}
          </p>
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            {galleryImage.isFeatured ? "Featured" : "Standard"}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            aria-label={`Preview gallery image ${galleryImage.id}`}
            className="grid size-9 place-items-center rounded-lg border border-black/10 text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] hover:text-[var(--color-ocean)]"
            onClick={onPreview}
            type="button"
          >
            <Eye size={17} />
          </button>
          <button
            aria-label={`Delete gallery image ${galleryImage.id}`}
            className="grid size-9 place-items-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50"
            onClick={onDelete}
            type="button"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

function AddGalleryImagePanel({ onClose }: { onClose: () => void }) {
  const addMutation = useAddGalleryImageMutation();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [fieldError, setFieldError] = useState("");

  const submitError = getErrorText(addMutation.error, "");

  function handleImageChange(file: File | null) {
    setImageFile(file);
    setImagePreviewUrl(file ? URL.createObjectURL(file) : "");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError("");

    if (!imageFile) {
      setFieldError("Gallery image is required.");
      return;
    }

    addMutation.mutate(
      {
        imageFile,
        isFeatured,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  }

  return (
    <GalleryModalFrame eyebrow="New image" onClose={onClose} title="Add image">
      <form className="space-y-5 p-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
                Image <span className="text-red-600">*</span>
              </span>
              <input
                accept="image/*"
                className="block w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-[var(--color-muted)] file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--color-ocean)] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
                onChange={(event) =>
                  handleImageChange(event.target.files?.[0] ?? null)
                }
                required
                type="file"
              />
            </label>

            <label className="flex items-center gap-3 rounded-lg border border-black/10 px-4 py-3">
              <input
                checked={isFeatured}
                className="size-4 accent-[var(--color-ocean)]"
                onChange={(event) => setIsFeatured(event.target.checked)}
                type="checkbox"
              />
              <span className="text-sm font-semibold text-[var(--color-deep-ocean)]">
                Featured image
              </span>
            </label>
          </div>

          <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-lg bg-[#eef4f8]">
            {imagePreviewUrl ? (
              <Image
                alt="Selected gallery preview"
                className="size-full object-cover"
                height={195}
                unoptimized
                src={imagePreviewUrl}
                width={260}
              />
            ) : (
              <ImageOff className="text-[var(--color-muted)]" size={28} />
            )}
          </div>
        </div>

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
            disabled={addMutation.isPending}
            type="submit"
          >
            {addMutation.isPending ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Check size={18} />
            )}
            <span>Add image</span>
          </button>
        </div>
      </form>
    </GalleryModalFrame>
  );
}

function GalleryDetailPanel({
  imageId,
  onClose,
  onDelete,
}: {
  imageId: number;
  onClose: () => void;
  onDelete: (galleryImage: GalleryImage) => void;
}) {
  const imageQuery = useGalleryImageQuery(imageId);
  const galleryImage = imageQuery.data?.data;
  const imageUrl = galleryImage ? getGalleryImageUrl(galleryImage.imageUrl) : "";

  return (
    <GalleryModalFrame
      eyebrow="Image details"
      onClose={onClose}
      title={`Image ${imageId}`}
    >
      <div className="space-y-5 p-5">
        {imageQuery.isLoading ? (
          <div className="grid min-h-[280px] place-items-center text-[var(--color-deep-ocean)]">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <Loader2 className="animate-spin" size={20} />
              <span>Loading image</span>
            </div>
          </div>
        ) : null}

        {imageQuery.error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {getErrorText(imageQuery.error, "Unable to load image details.")}
          </p>
        ) : null}

        {galleryImage ? (
          <>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[#eef4f8]">
              {imageUrl ? (
                <Image
                  alt={`Gallery image ${galleryImage.id}`}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 760px, 100vw"
                  src={imageUrl}
                  unoptimized
                />
              ) : (
                <span className="grid size-full place-items-center">
                  <ImageOff className="text-[var(--color-muted)]" size={28} />
                </span>
              )}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-[var(--color-deep-ocean)]">
                  ID {galleryImage.id}
                </p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  {galleryImage.isFeatured ? "Featured image" : "Standard image"}
                </p>
              </div>
              <button
                className="flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 px-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
                onClick={() => onDelete(galleryImage)}
                type="button"
              >
                <Trash2 size={17} />
                <span>Delete image</span>
              </button>
            </div>
          </>
        ) : null}
      </div>
    </GalleryModalFrame>
  );
}

function GalleryModalFrame({
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
      <section className="max-h-full w-full max-w-[820px] overflow-y-auto rounded-lg bg-white shadow-2xl">
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
            aria-label="Close gallery panel"
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
  galleryImage,
  isDeleting,
  onCancel,
  onConfirm,
}: {
  error: string;
  galleryImage: GalleryImage;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-4 py-6">
      <section className="w-full max-w-[420px] rounded-lg bg-white p-5 shadow-2xl">
        <h2 className="text-xl font-bold text-[var(--color-deep-ocean)]">
          Delete image
        </h2>
        <p className="mt-3 text-sm leading-[1.7] text-[var(--color-muted)]">
          This will remove gallery image {galleryImage.id}. This action cannot
          be undone.
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
