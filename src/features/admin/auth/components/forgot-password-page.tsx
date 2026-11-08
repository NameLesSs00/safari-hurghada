"use client";

import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

import { useForgotPasswordMutation } from "@/src/features/admin/auth/hooks";

import { AuthCard } from "./auth-card";
import { FormField } from "./form-field";

export function ForgotPasswordPage() {
  const router = useRouter();
  const forgotMutation = useForgotPasswordMutation();
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState("");

  const serverError = useMemo(() => {
    if (!forgotMutation.error) {
      return "";
    }

    return forgotMutation.error instanceof Error
      ? forgotMutation.error.message
      : "Unable to send reset instructions.";
  }, [forgotMutation.error]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError("");

    if (!email.trim()) {
      setFieldError("Email is required.");
      return;
    }

    forgotMutation.mutate(
      { email: email.trim() },
      {
        onSuccess: () => {
          router.push("/admin/reset-password");
        },
      },
    );
  }

  return (
    <AuthCard
      eyebrow="Password help"
      title="Reset access"
      subtitle="Enter your admin email and we will send a reset token if the account exists."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <FormField
          autoComplete="email"
          error={fieldError}
          label="Email"
          name="email"
          onChange={setEmail}
          placeholder="admin@example.com"
          type="email"
          value={email}
        />

        {forgotMutation.data?.message ? (
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {forgotMutation.data.message}
          </p>
        ) : null}

        {serverError ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {serverError}
          </p>
        ) : null}

        <button
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-ocean)] px-5 text-base font-bold text-white transition hover:bg-[var(--color-deep-ocean)] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={forgotMutation.isPending}
          type="submit"
        >
          {forgotMutation.isPending ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Mail size={20} />
          )}
          <span>Send reset token</span>
        </button>

        <Link
          className="block text-center text-sm font-semibold text-[var(--color-ocean)] transition hover:text-[var(--color-deep-ocean)]"
          href="/admin/login"
        >
          Back to sign in
        </Link>
      </form>
    </AuthCard>
  );
}
