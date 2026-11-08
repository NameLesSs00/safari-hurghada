"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { CheckoutForm } from "@/src/features/checkout/components/checkout-form";
import { CheckoutSummary } from "@/src/features/checkout/components/checkout-summary";
import { useCartStore } from "@/src/store/use-cart-store";
import type { AppLocale } from "@/src/i18n/locales";

function CheckoutContent() {
  const { items } = useCartStore();
  const locale = useLocale() as AppLocale;
  const t = useTranslations("CheckoutPage.empty");

  const [discountEuro, setDiscountEuro] = useState(0);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <h1 className="text-2xl font-bold text-red-500">{t("title")}</h1>
        <p className="mt-2 text-gray-600">{t("description")}</p>
        <Link
          href={`/${locale}/trips`}
          className="mt-6 inline-flex rounded-full bg-[#003A5A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#002a42]"
        >
          {t("cta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="flex flex-col-reverse gap-10 lg:flex-row lg:items-start lg:gap-16">
        {/* Left Side: Form */}
        <CheckoutForm
          onDiscountChange={setDiscountEuro}
        />

        {/* Right Side / Top on Mobile: Summary */}
        <div className="shrink-0">
          <CheckoutSummary
            discountEuro={discountEuro}
          />
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <CheckoutContent />
  );
}
