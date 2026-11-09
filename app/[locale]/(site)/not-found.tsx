"use client";

import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FAFAFA] px-4 py-16 text-center">
      <span className="font-serif text-8xl font-black tracking-tight text-[var(--color-ocean)] sm:text-9xl">
        {t("title")}
      </span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-deep-ocean)] sm:text-4xl">
        {t("subtitle")}
      </h1>
      <p className="mt-3 max-w-md text-base text-[var(--color-muted)]">
        {t("description")}
      </p>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ocean)] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-[var(--color-ocean-hover)] hover:shadow-orange-500/30"
        >
          <MoveLeft size={18} />
          <span>{t("backToHome")}</span>
        </Link>
      </div>
    </div>
  );
}
