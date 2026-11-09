"use client";

import { useCartStore } from "@/src/store/use-cart-store";
import { CartItemCard } from "@/src/features/cart/components/cart-item-card";
import { CartSummary } from "@/src/features/cart/components/cart-summary";
import { useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ShoppingBag, ChevronRight, Home, Compass, ArrowRight } from "lucide-react";
import type { AppLocale } from "@/src/i18n/locales";

// Header animations
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// Cart items list
const cartListVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cartItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// Summary sidebar
const summaryVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.15 } },
};

const subscribeToCartHydration = (onStoreChange: () => void) =>
  useCartStore.persist.onFinishHydration(onStoreChange);

const getCartHydrationSnapshot = () => useCartStore.persist.hasHydrated();

const getServerCartHydrationSnapshot = () => false;

export default function CartPage() {
  const { items, removeItem } = useCartStore();
  const isCartHydrated = useSyncExternalStore(
    subscribeToCartHydration,
    getCartHydrationSnapshot,
    getServerCartHydrationSnapshot,
  );
  const locale = useLocale() as AppLocale;
  const t = useTranslations("CartPage");

  // Show spinner while mounting
  if (!isCartHydrated) {
    return (
      <div
        className="flex min-h-[60vh] flex-col items-center justify-center gap-3 bg-[#FAFAFA]"
        role="status"
        aria-label={t("loading.label")}
      >
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#F36F21] border-t-transparent" />
        <p className="text-xs font-semibold text-slate-400">Loading your cart...</p>
      </div>
    );
  }

  // Handle empty cart
  if (items.length === 0) {
    return (
      <div className="min-h-[75vh] bg-[#FAFAFA] flex flex-col justify-center">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-orange-50 text-[#F36F21] border border-orange-100 shadow-xs">
            <ShoppingBag size={44} strokeWidth={1.75} />
          </div>

          <h2 className="mb-3 text-2xl sm:text-3xl font-extrabold text-[#1E232A]">
            {t("empty.title")}
          </h2>
          <p className="mb-8 text-sm sm:text-base leading-relaxed text-slate-500 max-w-md">
            {t("empty.description")}
          </p>

          <Link
            href={`/${locale}/trips`}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#F36F21] px-8 py-4 font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-[#d95c12] active:scale-[0.98]"
          >
            <Compass size={18} />
            <span>{t("empty.button")}</span>
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
              href="/trips"
              className="transition-colors hover:text-[#F36F21]"
            >
              Tours
            </Link>
            
            <ChevronRight size={14} className="text-slate-300" />

            <span className="font-semibold text-slate-800">
              Shopping Cart ({items.length})
            </span>
          </div>

          <Link
            href={`/${locale}/trips`}
            className="text-xs font-semibold text-slate-600 hover:text-[#F36F21] transition-colors"
          >
            ← Add More Tours
          </Link>
        </div>
      </nav>

      {/* Main Cart Content */}
      <main className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-6 lg:px-8">
        {/* Title Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="show"
          className="mb-8 flex flex-col gap-1.5"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F36F21]">
              Review &amp; Checkout
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E232A]">
            {t("header.title")}
          </h1>
          <p className="text-sm text-slate-500">
            {t("header.description")}
          </p>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          {/* Left Column: Cart Items List */}
          <motion.div
            variants={cartListVariants}
            initial="hidden"
            animate="show"
            className="flex flex-1 flex-col gap-4 sm:gap-5"
          >
            {items.map((item) => (
              <motion.div key={item.id} variants={cartItemVariants}>
                <CartItemCard
                  item={item}
                  onRemove={removeItem}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column: Sticky Summary */}
          <motion.aside
            variants={summaryVariants}
            initial="hidden"
            animate="show"
            className="w-full lg:w-[400px] xl:w-[420px] shrink-0 lg:sticky lg:top-20"
          >
            <CartSummary />
          </motion.aside>
        </div>
      </main>
    </div>
  );
}
