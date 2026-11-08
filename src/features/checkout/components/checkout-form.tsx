"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
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
          // Success! Redirect to success page with booking ID
          router.push(`/${locale}/checkout/success?id=${data.id}`);
        },
        onError: () => {
          setBookingError(t("submit.error"));
        },
      }
    );
  };

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        
        {/* Billing Details */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium text-[#111827]">
            {t("billing.title")}
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#111827]">
                {t("billing.fields.firstName.label")}
              </label>
              <input
                type="text"
                required
                placeholder={t("billing.fields.firstName.placeholder")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[#003A5A]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#111827]">
                {t("billing.fields.lastName.label")}
              </label>
              <input
                type="text"
                required
                placeholder={t("billing.fields.lastName.placeholder")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[#003A5A]"
              />
            </div>
            
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="text-sm font-medium text-[#111827]">
                {t("billing.fields.nationality.label")}
              </label>
              <input
                type="text"
                required
                placeholder={t("billing.fields.nationality.placeholder")}
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[#003A5A]"
              />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="text-sm font-medium text-[#111827]">
                {t("billing.fields.email.label")}
              </label>
              <input
                type="email"
                required
                placeholder={t("billing.fields.email.placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[#003A5A]"
              />
            </div>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="text-sm font-medium text-[#111827]">
                {t("billing.fields.phone.label")}
              </label>
              <input
                type="tel"
                required
                placeholder={t("billing.fields.phone.placeholder")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[#003A5A]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#111827]">
                {t("billing.fields.hotelName.label")}
              </label>
              <input
                type="text"
                placeholder={t("billing.fields.hotelName.placeholder")}
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                className="rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[#003A5A]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#111827]">
                {t("billing.fields.roomNo.label")}
              </label>
              <input
                type="text"
                placeholder={t("billing.fields.roomNo.placeholder")}
                value={roomNo}
                onChange={(e) => setRoomNo(e.target.value)}
                className="rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[#003A5A]"
              />
            </div>
          </div>
        </div>

        {/* Coupon */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-medium text-[#111827]">
            {t("coupon.title")}
          </h2>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              placeholder={t("coupon.placeholder")}
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full flex-1 rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[#003A5A]"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              disabled={applyPromoMutation.isPending || !coupon.trim()}
              className="w-full shrink-0 rounded-xl bg-[#003A5A] px-8 py-3.5 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
            >
              {applyPromoMutation.isPending ? t("coupon.applying") : t("coupon.apply")}
            </button>
          </div>
          {couponError && <p className="text-sm text-red-500">{couponError}</p>}
          {couponSuccess && <p className="text-sm text-green-600">{couponSuccess}</p>}
        </div>

        {/* Payment Method */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium text-[#111827]">
            {t("payment.title")}
          </h2>
          <div className="flex flex-col gap-4">
            <label className="flex cursor-pointer items-center gap-3">
              <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#003A5A]">
                <div className="h-2.5 w-2.5 rounded-full bg-[#003A5A]" />
              </div>
              <span className="text-sm text-[#374151]">
                {t("payment.bookNowPayLater")}
              </span>
            </label>
            <label className="flex cursor-not-allowed items-center gap-3 opacity-50">
              <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
              <span className="text-sm text-[#374151]">Paypal</span>
            </label>
            <label className="flex cursor-not-allowed items-center gap-3 opacity-50">
              <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
              <span className="text-sm text-[#374151]">Visa</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={createBookingMutation.isPending}
          className="mt-4 w-full rounded-full border border-[#003A5A] py-3.5 text-center font-semibold text-[#003A5A] transition-colors hover:bg-[#003A5A] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:max-w-md"
        >
          {createBookingMutation.isPending
            ? t("submit.confirming")
            : t("submit.confirm")}
        </button>
        {bookingError && <p className="text-sm text-red-500">{bookingError}</p>}

      </form>
    </div>
  );
}
