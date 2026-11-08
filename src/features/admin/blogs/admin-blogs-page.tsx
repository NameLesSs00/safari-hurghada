"use client";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  ImageOff,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, type ReactNode, useMemo, useState } from "react";

import { getBlogImageUrl } from "@/src/features/admin/blogs/api";
import {
  useBlogQuery,
  useBlogsQuery,
  useCreateBlogMutation,
  useDeleteBlogImageMutation,
  useDeleteBlogMutation,
  useDeleteSectionImageMutation,
  useUpdateBlogMutation,
  useUploadBlogImageMutation,
  useUploadSectionImageMutation,
} from "@/src/features/admin/blogs/hooks";
import type {
  Blog,
  BlogFormValues,
  BlogSection,
  BlogSectionFormValues,
} from "@/src/features/admin/blogs/types";

const pageSizes = [6, 10, 20];

function getErrorText(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function getEmptySection(sectionNumber: number): BlogSectionFormValues {
  return {
    sectionNumber,
    title: "",
    content: "",
    imageFile: null,
    imagePreviewUrl: "",
  };
}

function getInitialSections(blog?: Blog): BlogSectionFormValues[] {
  if (!blog?.blogSections.length) {
    return [getEmptySection(1)];
  }

  return [...blog.blogSections]
    .sort((a, b) => a.sectionNumber - b.sectionNumber)
    .map((section) => ({
      id: section.id,
      sectionNumber: section.sectionNumber,
      title: section.title,
      content: section.content,
      imageFile: null,
      imagePreviewUrl: "",
    }));
}

export function AdminBlogsPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreating, setIsCreating] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);

  const blogsQuery = useBlogsQuery({ pageNumber, pageSize });
  const deleteMutation = useDeleteBlogMutation();

  const blogs = blogsQuery.data?.data ?? [];
  const hasNextPage = blogs.length >= pageSize;

  const queryError = useMemo(
    () =>
      blogsQuery.error
        ? getErrorText(blogsQuery.error, "Unable to load blogs.")
        : "",
    [blogsQuery.error],
  );

  function handleDeleteBlog() {
    if (!blogToDelete) {
      return;
    }

    deleteMutation.mutate(blogToDelete.id, {
      onSuccess: () => {
        setBlogToDelete(null);
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
            Blogs
          </h1>
          <p className="mt-3 max-w-[720px] text-base leading-[1.7] text-[var(--color-muted)]">
            Manage articles, section content, and the images that support each
            story.
          </p>
        </div>

        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-ocean)] px-4 text-sm font-bold text-white transition hover:bg-[var(--color-deep-ocean)] sm:w-fit"
          onClick={() => setIsCreating(true)}
          type="button"
        >
          <Plus size={18} />
          <span>Add blog</span>
        </button>
      </div>

      <section className="rounded-lg border border-black/5 bg-white p-4 shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
        <select
          className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold text-[var(--color-deep-ocean)] outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)] sm:w-[150px]"
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
      </section>

      <section className="overflow-hidden rounded-lg border border-black/5 bg-white shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
          <p className="text-sm font-bold text-[var(--color-deep-ocean)]">
            Blog list
          </p>
          {blogsQuery.isFetching ? (
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

        {!queryError && blogsQuery.isLoading ? (
          <div className="grid min-h-[320px] place-items-center text-[var(--color-deep-ocean)]">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <Loader2 className="animate-spin" size={20} />
              <span>Loading blogs</span>
            </div>
          </div>
        ) : null}

        {!queryError && !blogsQuery.isLoading && blogs.length === 0 ? (
          <div className="grid min-h-[320px] place-items-center px-4 py-12 text-center">
            <div>
              <FileText
                className="mx-auto text-[var(--color-ocean)]"
                size={34}
              />
              <h2 className="mt-4 text-xl font-bold text-[var(--color-deep-ocean)]">
                No blogs found
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Add the first blog to start publishing stories.
              </p>
            </div>
          </div>
        ) : null}

        {!queryError && blogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] border-collapse text-left">
              <thead className="bg-[#f5f9ff] text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                <tr>
                  <th className="px-4 py-3">Blog</th>
                  <th className="px-4 py-3">Content</th>
                  <th className="px-4 py-3">Sections</th>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <BlogThumb blog={blog} />
                        <p className="line-clamp-2 max-w-[300px] text-sm font-bold leading-[1.55] text-[var(--color-deep-ocean)]">
                          {blog.title}
                        </p>
                      </div>
                    </td>
                    <td className="max-w-[360px] px-4 py-4">
                      <p className="line-clamp-2 text-sm leading-[1.6] text-[var(--color-muted)]">
                        {blog.content}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-[var(--foreground)]">
                      {blog.blogSections.length}
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-[var(--foreground)]">
                      {blog.id}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          aria-label={`Edit ${blog.title}`}
                          className="grid size-9 place-items-center rounded-lg border border-black/10 text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] hover:text-[var(--color-ocean)]"
                          onClick={() => setEditingBlogId(blog.id)}
                          type="button"
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          aria-label={`Delete ${blog.title}`}
                          className="grid size-9 place-items-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50"
                          onClick={() => setBlogToDelete(blog)}
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
              disabled={pageNumber === 1 || blogsQuery.isFetching}
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
              disabled={!hasNextPage || blogsQuery.isFetching}
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
        <BlogFormPanel
          key="create"
          mode="create"
          onClose={() => setIsCreating(false)}
        />
      ) : null}

      {editingBlogId ? (
        <BlogFormPanel
          blogId={editingBlogId}
          key={editingBlogId}
          mode="edit"
          onClose={() => setEditingBlogId(null)}
        />
      ) : null}

      {blogToDelete ? (
        <ConfirmDeletePanel
          blog={blogToDelete}
          error={getErrorText(deleteMutation.error, "")}
          isDeleting={deleteMutation.isPending}
          onCancel={() => setBlogToDelete(null)}
          onConfirm={handleDeleteBlog}
        />
      ) : null}
    </div>
  );
}

function BlogThumb({ blog }: { blog: Blog }) {
  const imageUrl = getBlogImageUrl(blog.imageUrl);

  return (
    <div className="grid h-14 w-20 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#eef4f8]">
      {imageUrl ? (
        <Image
          alt={`${blog.title} blog`}
          className="size-full object-cover"
          height={56}
          src={imageUrl}
          unoptimized
          width={80}
        />
      ) : (
        <ImageOff className="text-[var(--color-muted)]" size={20} />
      )}
    </div>
  );
}

function BlogFormPanel({
  blogId,
  mode,
  onClose,
}: {
  blogId?: number;
  mode: "create" | "edit";
  onClose: () => void;
}) {
  const isEdit = mode === "edit";
  const blogQuery = useBlogQuery(isEdit ? (blogId ?? null) : null);

  if (isEdit && blogQuery.isLoading) {
    return (
      <BlogModalFrame eyebrow="Edit blog" onClose={onClose} title="Loading blog">
        <div className="grid min-h-[320px] place-items-center p-5 text-[var(--color-deep-ocean)]">
          <div className="flex items-center gap-3 text-sm font-semibold">
            <Loader2 className="animate-spin" size={20} />
            <span>Loading blog details</span>
          </div>
        </div>
      </BlogModalFrame>
    );
  }

  if (isEdit && blogQuery.error) {
    return (
      <BlogModalFrame eyebrow="Edit blog" onClose={onClose} title="Blog error">
        <div className="space-y-4 p-5">
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {getErrorText(blogQuery.error, "Unable to load blog details.")}
          </p>
          <button
            className="h-10 rounded-lg border border-black/10 px-4 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)]"
            onClick={() => void blogQuery.refetch()}
            type="button"
          >
            Try again
          </button>
        </div>
      </BlogModalFrame>
    );
  }

  return (
    <BlogFormFields
      blog={blogQuery.data?.data}
      key={`${mode}-${blogId ?? "new"}`}
      mode={mode}
      onClose={onClose}
    />
  );
}

function BlogFormFields({
  blog,
  mode,
  onClose,
}: {
  blog?: Blog;
  mode: "create" | "edit";
  onClose: () => void;
}) {
  const createMutation = useCreateBlogMutation();
  const updateMutation = useUpdateBlogMutation();
  const uploadBlogImageMutation = useUploadBlogImageMutation();
  const uploadSectionImageMutation = useUploadSectionImageMutation();
  const deleteBlogImageMutation = useDeleteBlogImageMutation();
  const deleteSectionImageMutation = useDeleteSectionImageMutation();

  const [title, setTitle] = useState(blog?.title ?? "");
  const [content, setContent] = useState(blog?.content ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [sections, setSections] = useState(() => getInitialSections(blog));
  const [fieldError, setFieldError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const isEdit = mode === "edit";
  const submitError =
    getErrorText(createMutation.error, "") ||
    getErrorText(updateMutation.error, "") ||
    getErrorText(uploadBlogImageMutation.error, "") ||
    getErrorText(uploadSectionImageMutation.error, "") ||
    getErrorText(deleteBlogImageMutation.error, "") ||
    getErrorText(deleteSectionImageMutation.error, "");
  const blogImageUrl = imagePreviewUrl || getBlogImageUrl(blog?.imageUrl ?? null);

  function handleBlogImageChange(file: File | null) {
    setImageFile(file);
    setImagePreviewUrl(file ? URL.createObjectURL(file) : "");
  }

  function updateSection(
    index: number,
    updates: Partial<BlogSectionFormValues>,
  ) {
    setSections((current) =>
      current.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, ...updates } : section,
      ),
    );
  }

  function addSection() {
    setSections((current) => [
      ...current,
      getEmptySection(current.length + 1),
    ]);
  }

  function removeSection(index: number) {
    setSections((current) =>
      current
        .filter((_, sectionIndex) => sectionIndex !== index)
        .map((section, sectionIndex) => ({
          ...section,
          sectionNumber: sectionIndex + 1,
        })),
    );
  }

  async function uploadSelectedImages(savedBlog: Blog) {
    if (imageFile) {
      await uploadBlogImageMutation.mutateAsync({
        blogId: savedBlog.id,
        file: imageFile,
      });
    }

    for (const section of sections) {
      if (!section.imageFile) {
        continue;
      }

      const savedSection = savedBlog.blogSections.find((item) =>
        section.id
          ? item.id === section.id
          : item.sectionNumber === section.sectionNumber,
      );

      if (savedSection) {
        await uploadSectionImageMutation.mutateAsync({
          blogId: savedBlog.id,
          file: section.imageFile,
          sectionId: savedSection.id,
        });
      }
    }
  }

  function validateForm() {
    if (!title.trim() || !content.trim()) {
      return "Title and content are required.";
    }

    if (sections.length === 0) {
      return "At least one section is required.";
    }

    if (
      sections.some(
        (section) =>
          !section.title.trim() ||
          !section.content.trim() ||
          !section.sectionNumber,
      )
    ) {
      return "Every section needs a number, title, and content.";
    }

    return "";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError("");
    setSaveMessage("");

    const validationError = validateForm();
    if (validationError) {
      setFieldError(validationError);
      return;
    }

    const values: BlogFormValues = {
      id: blog?.id,
      title,
      content,
      imageFile,
      blogSections: sections,
    };

    setIsSaving(true);
    try {
      const savedResponse = isEdit
        ? await updateMutation.mutateAsync({
            id: blog?.id as number,
            values,
          })
        : await createMutation.mutateAsync(values);

      await uploadSelectedImages(savedResponse.data);
      onClose();
    } catch {
      setSaveMessage("Content was saved only if all requested steps completed.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteBlogImage() {
    if (!blog) {
      return;
    }

    await deleteBlogImageMutation.mutateAsync(blog.id);
  }

  async function handleDeleteSectionImage(section: BlogSection) {
    await deleteSectionImageMutation.mutateAsync(section.id);
  }

  return (
    <BlogModalFrame
      eyebrow={isEdit ? "Edit blog" : "New blog"}
      onClose={onClose}
      title={isEdit ? (blog?.title ?? "Blog") : "Add blog"}
    >
      <form className="space-y-6 p-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
                Title <span className="text-red-600">*</span>
              </span>
              <input
                className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Blog title"
                required
                value={title}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
                Content <span className="text-red-600">*</span>
              </span>
              <textarea
                className="min-h-36 w-full resize-y rounded-lg border border-black/10 px-3 py-3 text-sm leading-[1.6] outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
                onChange={(event) => setContent(event.target.value)}
                placeholder="Main blog content"
                required
                value={content}
              />
            </label>
          </div>

          <div className="rounded-lg border border-black/10 p-4">
            <p className="text-sm font-bold text-[var(--color-deep-ocean)]">
              Main image
            </p>
            <div className="mt-3 grid h-32 place-items-center overflow-hidden rounded-lg bg-[#eef4f8]">
              {blogImageUrl ? (
                <Image
                  alt={`${blog?.title ?? "Blog"} current`}
                  className="size-full object-cover"
                  height={128}
                  src={blogImageUrl}
                  unoptimized
                  width={280}
                />
              ) : (
                <ImageOff className="text-[var(--color-muted)]" size={24} />
              )}
            </div>
            <input
              accept="image/*"
              className="mt-3 block w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-[var(--color-muted)] file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--color-ocean)] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
              onChange={(event) =>
                handleBlogImageChange(event.target.files?.[0] ?? null)
              }
              type="file"
            />
            {isEdit ? (
              <button
                className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-3 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={deleteBlogImageMutation.isPending || !blogImageUrl}
                onClick={() => void handleDeleteBlogImage()}
                type="button"
              >
                {deleteBlogImageMutation.isPending ? (
                  <Loader2 className="animate-spin" size={17} />
                ) : (
                  <ImageOff size={17} />
                )}
                <span>Delete image</span>
              </button>
            ) : null}
          </div>
        </div>

        <section className="space-y-4 border-t border-black/5 pt-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-[var(--color-deep-ocean)]">
                Sections
              </h3>
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                Add article sections in the order they should appear.
              </p>
            </div>
            <button
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-black/10 px-3 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)]"
              onClick={addSection}
              type="button"
            >
              <Plus size={17} />
              <span>Add section</span>
            </button>
          </div>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <SectionEditor
                blog={blog}
                canRemove={sections.length > 1}
                index={index}
                key={section.id ?? `new-${index}`}
                onDeleteImage={handleDeleteSectionImage}
                onRemove={() => removeSection(index)}
                onUpdate={(updates) => updateSection(index, updates)}
                section={section}
                sectionImageDeletePending={deleteSectionImageMutation.isPending}
              />
            ))}
          </div>
        </section>

        {fieldError || submitError || saveMessage ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {fieldError || submitError || saveMessage}
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
            disabled={isSaving}
            type="submit"
          >
            {isSaving ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Check size={18} />
            )}
            <span>{isEdit ? "Save changes" : "Create blog"}</span>
          </button>
        </div>
      </form>
    </BlogModalFrame>
  );
}

function SectionEditor({
  blog,
  canRemove,
  index,
  onDeleteImage,
  onRemove,
  onUpdate,
  section,
  sectionImageDeletePending,
}: {
  blog?: Blog;
  canRemove: boolean;
  index: number;
  onDeleteImage: (section: BlogSection) => Promise<void>;
  onRemove: () => void;
  onUpdate: (updates: Partial<BlogSectionFormValues>) => void;
  section: BlogSectionFormValues;
  sectionImageDeletePending: boolean;
}) {
  const savedSection = blog?.blogSections.find((item) => item.id === section.id);
  const imageUrl =
    section.imagePreviewUrl || getBlogImageUrl(savedSection?.imageUrl ?? null);

  return (
    <article className="rounded-lg border border-black/10 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="text-sm font-bold text-[var(--color-deep-ocean)]">
          Section {index + 1}
        </h4>
        <button
          className="grid size-9 place-items-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!canRemove}
          onClick={onRemove}
          type="button"
          aria-label={`Remove section ${index + 1}`}
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[110px_1fr]">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
            Number
          </span>
          <input
            className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
            min={1}
            onChange={(event) =>
              onUpdate({ sectionNumber: Number(event.target.value) })
            }
            required
            type="number"
            value={section.sectionNumber}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
            Title <span className="text-red-600">*</span>
          </span>
          <input
            className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
            onChange={(event) => onUpdate({ title: event.target.value })}
            placeholder="Section title"
            required
            value={section.title}
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
          Content <span className="text-red-600">*</span>
        </span>
        <textarea
          className="min-h-28 w-full resize-y rounded-lg border border-black/10 px-3 py-3 text-sm leading-[1.6] outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
          onChange={(event) => onUpdate({ content: event.target.value })}
          placeholder="Section content"
          required
          value={section.content}
        />
      </label>

      <div className="mt-4 grid gap-4 lg:grid-cols-[180px_1fr]">
        <div className="grid h-24 place-items-center overflow-hidden rounded-lg bg-[#eef4f8]">
          {imageUrl ? (
            <Image
              alt={`${section.title || "Section"} current`}
              className="size-full object-cover"
              height={96}
              src={imageUrl}
              unoptimized
              width={180}
            />
          ) : (
            <ImageOff className="text-[var(--color-muted)]" size={22} />
          )}
        </div>
        <div className="space-y-3">
          <input
            accept="image/*"
            className="block w-full rounded-lg border border-black/10 px-3 py-2 text-sm text-[var(--color-muted)] file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--color-ocean)] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;

              onUpdate({
                imageFile: file,
                imagePreviewUrl: file ? URL.createObjectURL(file) : "",
              });
            }}
            type="file"
          />
          {savedSection ? (
            <button
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-red-200 px-3 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={sectionImageDeletePending || !imageUrl}
              onClick={() => void onDeleteImage(savedSection)}
              type="button"
            >
              {sectionImageDeletePending ? (
                <Loader2 className="animate-spin" size={17} />
              ) : (
                <ImageOff size={17} />
              )}
              <span>Delete section image</span>
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function BlogModalFrame({
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
      <section className="max-h-full w-full max-w-[980px] overflow-y-auto rounded-lg bg-white shadow-2xl">
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
            aria-label="Close blog form"
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
  blog,
  error,
  isDeleting,
  onCancel,
  onConfirm,
}: {
  blog: Blog;
  error: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-4 py-6">
      <section className="w-full max-w-[420px] rounded-lg bg-white p-5 shadow-2xl">
        <h2 className="text-xl font-bold text-[var(--color-deep-ocean)]">
          Delete blog
        </h2>
        <p className="mt-3 text-sm leading-[1.7] text-[var(--color-muted)]">
          This will remove {blog.title}. This action cannot be undone.
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
