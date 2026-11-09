"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ChevronRight, Home, ShoppingBag, ArrowRight } from "lucide-react";
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
      <div className="min-h-[75vh] bg-[#FAFAFA] flex flex-col justify-center">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-orange-50 text-[#F36F21] border border-orange-100 shadow-xs">
            <ShoppingBag size={44} strokeWidth={1.75} />
          </div>

          <h1 className="mb-3 text-2xl sm:text-3xl font-extrabold text-[#1E232A]">
            {t("title")}
          </h1>
          <p className="mb-8 text-sm sm:text-base leading-relaxed text-slate-500 max-w-md">
            {t("description")}
          </p>

          <Link
            href={`/${locale}/trips`}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#F36F21] px-8 py-4 font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-[#d95c12] active:scale-[0.98]"
          >
            <span>{t("cta")}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Top Breadcrumb Navigation */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-30 py-3.5 shadow-2xs" aria-label="Breadcrumb">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
            <Link
              href="/"
              className="flex items-center gap-1.5 transition-colors hover:text-[#F36F21]"
            >
              <Home size={14} className="text-slate-400" />
              <span>Home</span>
            </Link>
            
            <ChevronRight size={14} className="text-slate-300" />
            
            <Link
              href={`/${locale}/cart`}
              className="transition-colors hover:text-[#F36F21]"
            >
              Cart
            </Link>
            
            <ChevronRight size={14} className="text-slate-300" />

            <span className="font-semibold text-slate-800">
              Checkout &amp; Confirmation
            </span>
          </div>

          <Link
            href={`/${locale}/cart`}
            className="text-xs font-semibold text-slate-600 hover:text-[#F36F21] transition-colors"
          >
            ← Back to Cart
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-6 lg:px-8">
        {/* Title Header */}
        <div className="mb-8 flex flex-col gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F36F21]">
            Step 2 of 2
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E232A]">
            Complete Your Reservation
          </h1>
          <p className="text-sm text-slate-500">
            Enter your details below to secure your excursion with free cancellation.
          </p>
        </div>

        {/* 2-Column Split */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          {/* Left Side: Form */}
          <CheckoutForm onDiscountChange={setDiscountEuro} />

          {/* Right Side: Sticky Summary */}
          <aside className="w-full lg:w-[400px] xl:w-[420px] shrink-0 lg:sticky lg:top-20">
            <CheckoutSummary discountEuro={discountEuro} />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return <CheckoutContent />;
}
