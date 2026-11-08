"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Info } from "lucide-react";
import type { Trip } from "@/src/features/tours/types/trip";
import { useCartStore } from "@/src/store/use-cart-store";
import { AvailabilityDatePicker } from "./availability-date-picker";
import { QuantitySelector } from "./quantity-selector";
import { BookingSummary } from "./booking-summary";

interface AvailabilityModalProps {
  trip: Trip;
  isOpen: boolean;
  onClose: () => void;
}

export function AvailabilityModal({
  trip,
  isOpen,
  onClose,
}: AvailabilityModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedDate(null);
      setAdultCount(1);
      setChildCount(0);
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleAddToCart = () => {
    if (!selectedDate) return;
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;
    addItem({
      id: `${trip.id}-${dateStr}`,
      trip,
      date: dateStr,
      adultCount,
      childCount,
    });
    onClose(); // Optional: close modal on add
  };

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Panel */}
      <div className="relative flex max-h-[95dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[90vh] sm:max-w-[900px] sm:rounded-3xl">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
        >
          <X size={18} />
        </button>

        {/* Inner scrollable layout */}
        <div className="flex flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
          {/* ─── Left / Main Section ─── */}
          <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6 sm:p-8 lg:pr-6">
            <h2 className="pr-8 text-lg font-bold text-[#111827]">
              Please select a tour date
            </h2>

            {/* Inline calendar */}
            <div className="rounded-2xl border border-gray-100 bg-[#F9FAFB] p-4 sm:p-5">
              <AvailabilityDatePicker
                availableDays={trip.availableDays}
                selectedDate={selectedDate}
                onDateSelect={(date) => setSelectedDate(date)}
              />
            </div>

            {/* Quantity section */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="font-semibold text-[#111827]">Quantity</p>
                  <p className="text-sm text-[#6B7280]">
                    You can select up to 50 for this package
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                  <Info size={15} />
                  <span>( Min: 1 )</span>
                </div>
              </div>

              {/* Adult row */}
              <QuantitySelector
                label="Adult"
                unitPrice={trip.adultPrice}
                currency={trip.currencyName}
                count={adultCount}
                min={1}
                max={50}
                onIncrement={() => setAdultCount((prev) => Math.min(50, prev + 1))}
                onDecrement={() => setAdultCount((prev) => Math.max(1, prev - 1))}
              />

              {/* Child row — only show if trip has child pricing */}
              {trip.childPrice > 0 && (
                <QuantitySelector
                  label="Children"
                  sublabel="3-11 years"
                  unitPrice={trip.childPrice}
                  currency={trip.currencyName}
                  count={childCount}
                  min={0}
                  max={50}
                  onIncrement={() => setChildCount((prev) => Math.min(50, prev + 1))}
                  onDecrement={() => setChildCount((prev) => Math.max(0, prev - 1))}
                />
              )}
            </div>

            {/* Mobile: Booking Summary + Proceed button */}
            <div className="flex flex-col gap-4 lg:hidden">
              <BookingSummary
                trip={trip}
                selectedDate={selectedDate}
                adultCount={adultCount}
                childCount={childCount}
              />

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  disabled={!selectedDate}
                  onClick={handleAddToCart}
                  className="w-full rounded-full border-2 border-[#003A5A] bg-white py-3.5 text-center font-semibold text-[#003A5A] transition-colors hover:bg-[#F8FBFC] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  disabled={!selectedDate}
                  onClick={() => {
                    if (selectedDate) {
                      handleAddToCart();
                      router.push('/checkout');
                    }
                  }}
                  className="w-full rounded-full border border-[#003A5A] py-3.5 text-center font-semibold text-[#003A5A] transition-colors hover:bg-[#003A5A] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Proceed to check out →
                </button>
              </div>
            </div>
          </div>

          {/* ─── Right / Summary Section (desktop only) ─── */}
          <div className="hidden w-full max-w-[340px] shrink-0 flex-col justify-between gap-6 overflow-y-auto border-l border-gray-100 p-6 sm:p-8 lg:flex">
            <BookingSummary
              trip={trip}
              selectedDate={selectedDate}
              adultCount={adultCount}
              childCount={childCount}
            />

            <div className="flex flex-col gap-3 mt-auto">
              <button
                type="button"
                disabled={!selectedDate}
                onClick={handleAddToCart}
                className="w-full rounded-full border-2 border-[#003A5A] bg-white py-3 text-center font-semibold text-[#003A5A] transition-colors hover:bg-[#F8FBFC] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Add to Cart
              </button>
              <button
                type="button"
                disabled={!selectedDate}
                onClick={() => {
                  if (selectedDate) {
                    handleAddToCart();
                    router.push('/checkout');
                  }
                }}
                className="w-full rounded-full border border-[#003A5A] py-3 text-center font-semibold text-[#003A5A] transition-colors hover:bg-[#003A5A] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Proceed to check out →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
