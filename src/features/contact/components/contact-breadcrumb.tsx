"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import type { AppLocale } from "@/src/i18n/locales";

export function ContactBreadcrumb() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("ContactPage.breadcrumb");

  return (
    <nav className="bg-white py-4" aria-label="Breadcrumb">
      <div className="mx-auto w-full px-5 text-center md:px-8 lg:max-w-[1400px] lg:px-10">
        <div className="flex items-center justify-center gap-2 text-sm">
          <Link
            href={`/${locale}`}
            className="text-[#6B7280] transition-colors hover:text-[#003A5A]"
          >
            {t("home")}
          </Link>
          <span className="text-[#6B7280]">&gt;</span>
          <span className="font-semibold text-[#003A5A]">{t("contact")}</span>
        </div>
      </div>
    </nav>
  );
}
