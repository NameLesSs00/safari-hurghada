"use client";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { FormEvent, type ReactNode, useMemo, useState } from "react";

import { adminLanguageOptions } from "@/src/features/admin/shared/languages";
import {
  useCreateFaqQuestionMutation,
  useDeleteFaqQuestionMutation,
  useFaqQuestionTranslationsQuery,
  useFaqQuestionsQuery,
  useUpdateFaqQuestionMutation,
} from "@/src/features/admin/faq/hooks";
import type {
  FaqFormValues,
  FaqLanguage,
  FaqQuestion,
  FaqTranslations,
} from "@/src/features/admin/faq/types";

const languages = adminLanguageOptions;

const pageSizes = [6, 10, 20];

function getErrorText(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function getEmptyTranslations(): FaqTranslations {
  return {
    en: "",
    fr: "",
    ru: "",
    ro: "",
  };
}

export function AdminFaqPage() {
  const [language, setLanguage] = useState<FaqLanguage>("en");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreating, setIsCreating] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<FaqQuestion | null>(
    null,
  );
  const [questionToDelete, setQuestionToDelete] = useState<FaqQuestion | null>(
    null,
  );

  const faqQuery = useFaqQuestionsQuery({
    language,
    pageNumber,
    pageSize,
  });
  const deleteMutation = useDeleteFaqQuestionMutation();

  const questions = faqQuery.data?.data ?? [];
  const hasNextPage = questions.length >= pageSize;

  const queryError = useMemo(
    () =>
      faqQuery.error
        ? getErrorText(faqQuery.error, "Unable to load FAQ.")
        : "",
    [faqQuery.error],
  );

  function handleDeleteQuestion() {
    if (!questionToDelete) {
      return;
    }

    deleteMutation.mutate(questionToDelete.id, {
      onSuccess: () => {
        setQuestionToDelete(null);
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
            FAQ
          </h1>
          <p className="mt-3 max-w-[680px] text-base leading-[1.7] text-[var(--color-muted)]">
            Manage multilingual questions and answers shown across the travel
            experience.
          </p>
        </div>

        <button
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-ocean)] px-4 text-sm font-bold text-white transition hover:bg-[var(--color-deep-ocean)] sm:w-fit"
          onClick={() => setIsCreating(true)}
          type="button"
        >
          <Plus size={18} />
          <span>Add FAQ</span>
        </button>
      </div>

      <section className="rounded-lg border border-black/5 bg-white p-4 shadow-[0_12px_30px_rgba(0,69,96,0.08)]">
        <div className="grid gap-3 sm:grid-cols-[1fr_150px] lg:w-[380px]">
          <select
            className="h-11 rounded-lg border border-black/10 bg-white px-3 text-sm font-semibold text-[var(--color-deep-ocean)] outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
            onChange={(event) => {
              setPageNumber(1);
              setLanguage(event.target.value as FaqLanguage);
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
            FAQ list
          </p>
          {faqQuery.isFetching ? (
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

        {!queryError && faqQuery.isLoading ? (
          <div className="grid min-h-[320px] place-items-center text-[var(--color-deep-ocean)]">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <Loader2 className="animate-spin" size={20} />
              <span>Loading FAQ</span>
            </div>
          </div>
        ) : null}

        {!queryError && !faqQuery.isLoading && questions.length === 0 ? (
          <div className="grid min-h-[320px] place-items-center px-4 py-12 text-center">
            <div>
              <CircleHelp
                className="mx-auto text-[var(--color-ocean)]"
                size={34}
              />
              <h2 className="mt-4 text-xl font-bold text-[var(--color-deep-ocean)]">
                No FAQ items found
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Add the first question to start building the FAQ.
              </p>
            </div>
          </div>
        ) : null}

        {!queryError && questions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse text-left">
              <thead className="bg-[#f5f9ff] text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                <tr>
                  <th className="px-4 py-3">Question</th>
                  <th className="px-4 py-3">Answer</th>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {questions.map((question) => (
                  <tr key={question.id}>
                    <td className="max-w-[320px] px-4 py-4">
                      <p className="line-clamp-2 text-sm font-bold leading-[1.6] text-[var(--color-deep-ocean)]">
                        {question.text}
                      </p>
                    </td>
                    <td className="max-w-[420px] px-4 py-4">
                      <p className="line-clamp-2 text-sm leading-[1.6] text-[var(--color-muted)]">
                        {question.answer}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-[var(--foreground)]">
                      {question.id}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          aria-label={`Edit FAQ ${question.id}`}
                          className="grid size-9 place-items-center rounded-lg border border-black/10 text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] hover:text-[var(--color-ocean)]"
                          onClick={() => setEditingQuestion(question)}
                          type="button"
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          aria-label={`Delete FAQ ${question.id}`}
                          className="grid size-9 place-items-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50"
                          onClick={() => setQuestionToDelete(question)}
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
              disabled={pageNumber === 1 || faqQuery.isFetching}
              onClick={() => setPageNumber((current) => Math.max(1, current - 1))}
              type="button"
            >
              <ChevronLeft size={17} />
              <span>Previous</span>
            </button>
            <button
              className="flex h-10 items-center gap-2 rounded-lg border border-black/10 px-3 text-sm font-bold text-[var(--color-deep-ocean)] transition hover:border-[var(--color-ocean)] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!hasNextPage || faqQuery.isFetching}
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
        <FaqFormPanel
          key="create"
          mode="create"
          onClose={() => setIsCreating(false)}
        />
      ) : null}

      {editingQuestion ? (
        <FaqFormPanel
          key={editingQuestion.id}
          mode="edit"
          onClose={() => setEditingQuestion(null)}
          question={editingQuestion}
        />
      ) : null}

      {questionToDelete ? (
        <ConfirmDeletePanel
          error={getErrorText(deleteMutation.error, "")}
          isDeleting={deleteMutation.isPending}
          onCancel={() => setQuestionToDelete(null)}
          onConfirm={handleDeleteQuestion}
          question={questionToDelete}
        />
      ) : null}
    </div>
  );
}

function FaqFormPanel({
  mode,
  onClose,
  question,
}: {
  mode: "create" | "edit";
  onClose: () => void;
  question?: FaqQuestion;
}) {
  const isEdit = mode === "edit";
  const translationsQuery = useFaqQuestionTranslationsQuery(
    isEdit ? (question?.id ?? null) : null,
  );
  const title = isEdit ? `FAQ ${question?.id}` : "Add FAQ";

  if (isEdit && translationsQuery.isLoading) {
    return (
      <FaqModalFrame eyebrow="Edit FAQ" onClose={onClose} title={title}>
        <div className="grid min-h-[280px] place-items-center p-5 text-[var(--color-deep-ocean)]">
          <div className="flex items-center gap-3 text-sm font-semibold">
            <Loader2 className="animate-spin" size={20} />
            <span>Loading translations</span>
          </div>
        </div>
      </FaqModalFrame>
    );
  }

  if (isEdit && translationsQuery.error) {
    return (
      <FaqModalFrame eyebrow="Edit FAQ" onClose={onClose} title={title}>
        <div className="space-y-4 p-5">
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {getErrorText(
              translationsQuery.error,
              "Unable to load FAQ translations.",
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
      </FaqModalFrame>
    );
  }

  return (
    <FaqFormFields
      initialAnswer={translationsQuery.data?.answer ?? getEmptyTranslations()}
      initialText={translationsQuery.data?.text ?? getEmptyTranslations()}
      key={`${mode}-${question?.id ?? "new"}-${Object.values(translationsQuery.data?.text ?? {}).join("|")}`}
      mode={mode}
      onClose={onClose}
      question={question}
    />
  );
}

function FaqFormFields({
  initialAnswer,
  initialText,
  mode,
  onClose,
  question,
}: {
  initialAnswer: FaqTranslations;
  initialText: FaqTranslations;
  mode: "create" | "edit";
  onClose: () => void;
  question?: FaqQuestion;
}) {
  const createMutation = useCreateFaqQuestionMutation();
  const updateMutation = useUpdateFaqQuestionMutation();
  const [text, setText] = useState(initialText);
  const [answer, setAnswer] = useState(initialAnswer);
  const [fieldError, setFieldError] = useState("");

  const isEdit = mode === "edit";
  const submitMutation = isEdit ? updateMutation : createMutation;
  const submitError = getErrorText(submitMutation.error, "");

  function updateTranslation(
    group: "text" | "answer",
    language: FaqLanguage,
    value: string,
  ) {
    if (group === "text") {
      setText((current) => ({
        ...current,
        [language]: value,
      }));
      return;
    }

    setAnswer((current) => ({
      ...current,
      [language]: value,
    }));
  }

  function hasBlankValues(values: FaqTranslations) {
    return languages.some((item) => !values[item.value].trim());
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError("");

    if (hasBlankValues(text) || hasBlankValues(answer)) {
      setFieldError("All translated questions and answers are required.");
      return;
    }

    const values: FaqFormValues = {
      id: question?.id,
      text,
      answer,
    };

    submitMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <FaqModalFrame
      eyebrow={isEdit ? "Edit FAQ" : "New FAQ"}
      onClose={onClose}
      title={isEdit ? `FAQ ${question?.id}` : "Add FAQ"}
    >
      <form className="space-y-5 p-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          {languages.map((item) => (
            <label className="block" key={`text-${item.value}`}>
              <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
                Text.{item.displayCode}{" "}
                <span className="text-red-600">*</span>
              </span>
              <input
                className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
                onChange={(event) =>
                  updateTranslation("text", item.value, event.target.value)
                }
                placeholder={`${item.label} question`}
                required
                value={text[item.value]}
              />
            </label>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {languages.map((item) => (
            <label className="block" key={`answer-${item.value}`}>
              <span className="mb-2 block text-sm font-semibold text-[var(--color-deep-ocean)]">
                Answer.{item.displayCode}{" "}
                <span className="text-red-600">*</span>
              </span>
              <textarea
                className="min-h-28 w-full resize-y rounded-lg border border-black/10 px-3 py-3 text-sm leading-[1.6] outline-none transition focus:border-[var(--color-ocean)] focus:ring-4 focus:ring-[rgba(0,105,147,0.12)]"
                onChange={(event) =>
                  updateTranslation("answer", item.value, event.target.value)
                }
                placeholder={`${item.label} answer`}
                required
                value={answer[item.value]}
              />
            </label>
          ))}
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
            disabled={submitMutation.isPending}
            type="submit"
          >
            {submitMutation.isPending ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Check size={18} />
            )}
            <span>{isEdit ? "Save changes" : "Create FAQ"}</span>
          </button>
        </div>
      </form>
    </FaqModalFrame>
  );
}

function FaqModalFrame({
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
      <section className="max-h-full w-full max-w-[860px] overflow-y-auto rounded-lg bg-white shadow-2xl">
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
            aria-label="Close FAQ form"
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
  question,
}: {
  error: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  question: FaqQuestion;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-4 py-6">
      <section className="w-full max-w-[420px] rounded-lg bg-white p-5 shadow-2xl">
        <h2 className="text-xl font-bold text-[var(--color-deep-ocean)]">
          Delete FAQ
        </h2>
        <p className="mt-3 text-sm leading-[1.7] text-[var(--color-muted)]">
          This will remove FAQ {question.id}. This action cannot be undone.
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
