"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/src/i18n/locales";

export function ContactBreadcrumb() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("ContactPage.breadcrumb");

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 sm:mb-12 flex items-center justify-center text-xs sm:text-sm font-medium text-slate-500"
    >
      <Link
        href="/"
        className="transition-colors hover:text-[#F36F21]"
      >
        {t("home")}
      </Link>
      <span className="mx-2 text-slate-300">/</span>
      <span className="font-semibold text-[#F36F21]">{t("contact")}</span>
    </nav>
  );
}
