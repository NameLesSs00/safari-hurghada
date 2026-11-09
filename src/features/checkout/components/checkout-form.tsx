"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { User, Mail, Phone, Globe, Building, KeyRound, Ticket, CreditCard, ShieldCheck, Check } from "lucide-react";
import { useApplyPromoMutation } from "../api/apply-promo";
import { useCreateBookingMutation, type TripBookingInput } from "../api/create-booking";

import { formatPrice } from "@/src/features/tours/utils/format-price";
import type { AppLocale } from "@/src/i18n/locales";
import { useCartStore } from "@/src/store/use-cart-store";

interface CheckoutFormProps {
  onDiscountChange: (amount: number) => void;
}

export function CheckoutForm({
  onDiscountChange,
}: CheckoutFormProps) {
  const router = useRouter();
  const { items, clearCart, setLastBooking } = useCartStore();
  const locale = useLocale() as AppLocale;
  const t = useTranslations("CheckoutPage.form");
  
  // Billing Details State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [roomNo, setRoomNo] = useState("");

  // Coupon State
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [bookingError, setBookingError] = useState("");

  const applyPromoMutation = useApplyPromoMutation();
  const createBookingMutation = useCreateBookingMutation();
  const currencyName = items[0]?.trip.currencyName || "EUR";

  const handleApplyCoupon = (e: React.MouseEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");
    if (!coupon.trim()) return;

    applyPromoMutation.mutate(coupon, {
      onSuccess: (data) => {
        setAppliedCoupon(coupon);
        setCouponSuccess(
          t("coupon.success", {
            amount: formatPrice(data.discountEuro, currencyName),
          }),
        );
        onDiscountChange(data.discountEuro);
      },
      onError: () => {
        setCouponError(t("coupon.invalid"));
        setAppliedCoupon(null);
        onDiscountChange(0);
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError("");

    if (items.length === 0) return;

    const tripsBookings: TripBookingInput[] = items.map((item) => ({
      tripId: item.trip.id,
      noAdult: item.adultCount,
      noChild: item.childCount,
      leaveDate: item.date,
    }));

    createBookingMutation.mutate(
      {
        firstName,
        lastName,
        email,
        phone,
        nationality: nationality || t("nationalityFallback"),
        code: appliedCoupon,
        hotelName,
        roomNo,
        tripsBookings,
      },
      {
        onSuccess: (data) => {
          setLastBooking(data);
          clearCart(); // Clear cart after successful booking
          router.push("/checkout/success");
        },
        onError: () => {
          setBookingError(t("submit.error"));
        },
      }
    );
  };

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        
        {/* Section 1: Contact & Personal Details */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-[0px_4px_25px_rgba(0,0,0,0.03)]">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#F36F21]">
              <User size={18} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#1E232A]">
                {t("billing.title")}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Please enter the lead traveler details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* First Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                {t("billing.fields.firstName.label")} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder={t("billing.fields.firstName.placeholder")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#1E232A] outline-none transition-all focus:border-[#F36F21] focus:ring-2 focus:ring-[#F36F21]/20 placeholder:text-slate-400"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                {t("billing.fields.lastName.label")} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder={t("billing.fields.lastName.placeholder")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#1E232A] outline-none transition-all focus:border-[#F36F21] focus:ring-2 focus:ring-[#F36F21]/20 placeholder:text-slate-400"
              />
            </div>
            
            {/* Nationality */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">
                {t("billing.fields.nationality.label")} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder={t("billing.fields.nationality.placeholder")}
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#1E232A] outline-none transition-all focus:border-[#F36F21] focus:ring-2 focus:ring-[#F36F21]/20 placeholder:text-slate-400"
                />
                <Globe size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">
                {t("billing.fields.email.label")} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder={t("billing.fields.email.placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#1E232A] outline-none transition-all focus:border-[#F36F21] focus:ring-2 focus:ring-[#F36F21]/20 placeholder:text-slate-400"
                />
                <Mail size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
              <p className="text-[11px] text-slate-400">Your reservation voucher will be sent to this email.</p>
            </div>

            {/* Phone / WhatsApp */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700">
                {t("billing.fields.phone.label")} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder={t("billing.fields.phone.placeholder")}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#1E232A] outline-none transition-all focus:border-[#F36F21] focus:ring-2 focus:ring-[#F36F21]/20 placeholder:text-slate-400"
                />
                <Phone size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
              <p className="text-[11px] text-slate-400">Used for driver pickup updates and tour coordination.</p>
            </div>

            {/* Hotel Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                {t("billing.fields.hotelName.label")} <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t("billing.fields.hotelName.placeholder")}
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#1E232A] outline-none transition-all focus:border-[#F36F21] focus:ring-2 focus:ring-[#F36F21]/20 placeholder:text-slate-400"
                />
                <Building size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Room Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">
                {t("billing.fields.roomNo.label")} <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t("billing.fields.roomNo.placeholder")}
                  value={roomNo}
                  onChange={(e) => setRoomNo(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#1E232A] outline-none transition-all focus:border-[#F36F21] focus:ring-2 focus:ring-[#F36F21]/20 placeholder:text-slate-400"
                />
                <KeyRound size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Promo Code / Coupon */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-[0px_4px_25px_rgba(0,0,0,0.03)]">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#F36F21]">
              <Ticket size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1E232A]">
                {t("coupon.title")}
              </h2>
              <p className="text-xs text-slate-400">Have a promotional discount voucher?</p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 sm:flex-row">
            <input
              type="text"
              placeholder={t("coupon.placeholder")}
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#1E232A] outline-none transition-all focus:border-[#F36F21] focus:ring-2 focus:ring-[#F36F21]/20 uppercase tracking-wider"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              disabled={applyPromoMutation.isPending || !coupon.trim()}
              className="w-full shrink-0 rounded-xl bg-[#1E232A] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-98 disabled:opacity-40 cursor-pointer sm:w-auto"
            >
              {applyPromoMutation.isPending ? t("coupon.applying") : t("coupon.apply")}
            </button>
          </div>

          {couponError && (
            <p className="mt-2 text-xs font-semibold text-rose-500">{couponError}</p>
          )}
          {couponSuccess && (
            <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <Check size={14} />
              <span>{couponSuccess}</span>
            </div>
          )}
        </div>

        {/* Section 3: Payment Method */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-[0px_4px_25px_rgba(0,0,0,0.03)]">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-[#00A3C4]">
              <CreditCard size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1E232A]">
                {t("payment.title")}
              </h2>
              <p className="text-xs text-slate-400">Select how you want to pay</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* Pay on arrival / Book now pay later */}
            <label className="flex cursor-pointer items-center justify-between rounded-2xl border-2 border-[#F36F21] bg-orange-50/40 p-4 transition-all">
              <div className="flex items-center gap-3.5">
                <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#F36F21]">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#F36F21]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#1E232A]">
                    {t("payment.bookNowPayLater")}
                  </span>
                  <span className="text-xs text-slate-500">
                    Pay in cash or card directly to your driver or guide upon pickup
                  </span>
                </div>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-100">
                Recommended
              </span>
            </label>

            {/* Disabled gateway placeholders */}
            <label className="flex cursor-not-allowed items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/60 p-4 opacity-50">
              <div className="flex items-center gap-3.5">
                <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
                <span className="text-sm font-medium text-slate-600">Credit / Debit Card (Online Gateway)</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Coming Soon</span>
            </label>

            <label className="flex cursor-not-allowed items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/60 p-4 opacity-50">
              <div className="flex items-center gap-3.5">
                <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
                <span className="text-sm font-medium text-slate-600">PayPal</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Coming Soon</span>
            </label>
          </div>
        </div>

        {/* Submit Booking Button */}
        <div>
          {bookingError && (
            <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-600">
              {bookingError}
            </div>
          )}

          <button
            type="submit"
            disabled={createBookingMutation.isPending}
            className="w-full rounded-2xl bg-[#F36F21] py-4 text-center text-base font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-[#d95c12] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            <ShieldCheck size={20} />
            <span>
              {createBookingMutation.isPending
                ? t("submit.confirming")
                : t("submit.confirm")}
            </span>
          </button>
          <p className="mt-2 text-center text-xs text-slate-400">
            By completing this booking, you agree to our Terms of Service and Cancellation Policy.
          </p>
        </div>

      </form>
    </div>
  );
}
