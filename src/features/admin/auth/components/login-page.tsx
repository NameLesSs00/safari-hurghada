"use client";

import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

import { useLoginMutation } from "@/src/features/admin/auth/hooks";

import { AuthCard } from "./auth-card";
import { FormField } from "./form-field";

export function LoginPage() {
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldError, setFieldError] = useState("");

  const serverError = useMemo(() => {
    if (!loginMutation.error) {
      return "";
    }

    return loginMutation.error instanceof Error
      ? loginMutation.error.message
      : "Unable to sign in.";
  }, [loginMutation.error]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError("");

    if (!email.trim() || !password) {
      setFieldError("Email and password are required.");
      return;
    }

    loginMutation.mutate(
      {
        email: email.trim(),
        password,
      },
      {
        onSuccess: () => {
          router.replace("/admin/dashboard");
        },
      },
    );
  }

  return (
    <AuthCard
      eyebrow="Welcome back"
      title="Sign in"
      subtitle="Use your admin account to access the dashboard."
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

        <div>
          <div className="relative">
            <FormField
              autoComplete="current-password"
              label="Password"
              name="password"
              onChange={setPassword}
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={password}
            />
            <button
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute bottom-0 right-1 grid size-12 place-items-center text-slate-400 transition hover:text-[#F36F21]"
              onClick={() => setShowPassword((current) => !current)}
              type="button"
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
          <div className="mt-3 flex justify-end">
            <Link
              className="text-xs font-bold text-[#F36F21] transition hover:underline"
              href="/admin/forgot-password"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {serverError ? (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-600">
            {serverError}
          </p>
        ) : null}

        <button
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#F36F21] px-5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-[#d95c12] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          disabled={loginMutation.isPending}
          type="submit"
        >
          {loginMutation.isPending ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <LogIn size={18} />
          )}
          <span>Sign in to Dashboard</span>
        </button>
      </form>
    </AuthCard>
  );
}
