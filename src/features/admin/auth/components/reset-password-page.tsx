"use client";

import { CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import { useResetPasswordMutation } from "@/src/features/admin/auth/hooks";

import { AuthCard } from "./auth-card";
import { FormField } from "./form-field";

export function ResetPasswordPage({ initialToken }: { initialToken: string }) {
  const resetMutation = useResetPasswordMutation();
  const [token, setToken] = useState(initialToken);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldError, setFieldError] = useState("");

  const serverError = useMemo(() => {
    if (!resetMutation.error) {
      return "";
    }

    return resetMutation.error instanceof Error
      ? resetMutation.error.message
      : "Unable to reset password.";
  }, [resetMutation.error]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError("");

    if (!token.trim() || !newPassword) {
      setFieldError("Reset token and new password are required.");
      return;
    }

    resetMutation.mutate({
      token: token.trim(),
      newPassword,
    });
  }

  return (
    <AuthCard
      eyebrow="New password"
      title="Finish reset"
      subtitle="Paste the reset token and choose a new password for the admin account."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <FormField
          autoComplete="one-time-code"
          error={fieldError}
          label="Reset token"
          name="token"
          onChange={setToken}
          placeholder="443202"
          value={token}
        />

        <div className="relative">
          <FormField
            autoComplete="new-password"
            label="New password"
            name="newPassword"
            onChange={setNewPassword}
            placeholder="Enter a new password"
            type={showPassword ? "text" : "password"}
            value={newPassword}
          />
          <button
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute bottom-0 right-1 grid size-12 place-items-center text-[var(--color-muted)] transition hover:text-[var(--color-ocean)]"
            onClick={() => setShowPassword((current) => !current)}
            type="button"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {resetMutation.data?.message ? (
          <p className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle2 className="mt-0.5 shrink-0" size={17} />
            <span>{resetMutation.data.message}</span>
          </p>
        ) : null}

        {serverError ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {serverError}
          </p>
        ) : null}

        <button
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-ocean)] px-5 text-base font-bold text-white transition hover:bg-[var(--color-deep-ocean)] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={resetMutation.isPending}
          type="submit"
        >
          {resetMutation.isPending ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <CheckCircle2 size={20} />
          )}
          <span>Reset password</span>
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
