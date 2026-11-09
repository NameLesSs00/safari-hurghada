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
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-600">
            {serverError}
          </p>
        ) : null}

        <button
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#F36F21] px-5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-[#d95c12] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          disabled={forgotMutation.isPending}
          type="submit"
        >
          {forgotMutation.isPending ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Mail size={18} />
          )}
          <span>Send reset instructions</span>
        </button>

        <Link
          className="block text-center text-xs font-bold text-slate-500 transition hover:text-[#F36F21]"
          href="/admin/login"
        >
          ← Back to sign in
        </Link>
      </form>
    </AuthCard>
  );
}
