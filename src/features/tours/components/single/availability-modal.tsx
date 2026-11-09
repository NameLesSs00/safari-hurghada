"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AppImage } from "@/src/shared/components/app-image";
import { useRouter } from "next/navigation";
import { X, Calendar, Users, ShoppingCart, ArrowRight, Check, MapPin } from "lucide-react";
import type { Trip } from "@/src/features/tours/types/trip";
import { useCartStore } from "@/src/store/use-cart-store";
import { formatPrice } from "@/src/features/tours/utils/format-price";
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
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const primaryImage =
    trip.images.find((img) => img.isPrimary) ?? trip.images[0];

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedDate(null);
      setAdultCount(1);
      setChildCount(0);
      setIsAdded(false);
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

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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

    setIsAdded(true);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  const handleProceedToCheckout = () => {
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

    onClose();
    router.push("/checkout");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 backdrop-blur-sm sm:items-center sm:p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Card */}
      <div className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[32px] bg-white shadow-2xl sm:max-h-[88vh] sm:max-w-[940px] sm:rounded-[32px] border border-slate-100">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4.5">
          <div className="flex items-center gap-3.5 min-w-0 pr-4">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 hidden sm:block">
              <AppImage
                src={primaryImage?.imageUrl}
                alt={trip.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <h2 className="text-base sm:text-lg font-extrabold text-[#1E232A] truncate">
                {trip.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1 font-medium text-[#F36F21]">
                  <MapPin size={12} />
                  <span>{trip.destinationInfo?.name || "Hurghada"}</span>
                </span>
                <span>•</span>
                <span className="font-semibold text-emerald-600">
                  {trip.adultPrice > 0 ? `From ${formatPrice(trip.adultPrice, trip.currencyName)} / person` : "Contact us"}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-[#1E232A] cursor-pointer"
            aria-label="Close availability window"
          >
            <X size={18} />
          </button>
        </div>

        {/* Inner Content Grid */}
        <div className="flex flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
          
          {/* Left Column: Step 1 (Date) & Step 2 (Travelers) */}
          <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-5 sm:p-7 lg:pr-6">
            
            {/* Step 1: Calendar */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F36F21] text-xs font-bold text-white shadow-xs">
                  1
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#1E232A]">
                  Select Departure Date
                </h3>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
                <AvailabilityDatePicker
                  availableDays={trip.availableDays}
                  selectedDate={selectedDate}
                  onDateSelect={(date) => setSelectedDate(date)}
                />
              </div>
            </div>

            {/* Step 2: Quantity Selector */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F36F21] text-xs font-bold text-white shadow-xs">
                    2
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#1E232A]">
                    Select Travelers
                  </h3>
                </div>
                <span className="text-xs text-slate-400">Max 50 guests</span>
              </div>

              <div className="flex flex-col gap-3">
                <QuantitySelector
                  label="Adults"
                  sublabel="Age 12+"
                  unitPrice={trip.adultPrice}
                  currency={trip.currencyName}
                  count={adultCount}
                  min={1}
                  max={50}
                  onIncrement={() => setAdultCount((prev) => Math.min(50, prev + 1))}
                  onDecrement={() => setAdultCount((prev) => Math.max(1, prev - 1))}
                />

                {trip.childPrice > 0 && (
                  <QuantitySelector
                    label="Children"
                    sublabel="Age 3 - 11"
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
            </div>

            {/* Mobile Summary & Action Bar */}
            <div className="flex flex-col gap-4 pt-2 lg:hidden">
              <BookingSummary
                trip={trip}
                selectedDate={selectedDate}
                adultCount={adultCount}
                childCount={childCount}
              />

              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  disabled={!selectedDate}
                  onClick={handleProceedToCheckout}
                  className="w-full rounded-2xl bg-[#F36F21] py-3.5 text-center text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-[#d95c12] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  disabled={!selectedDate || isAdded}
                  onClick={handleAddToCart}
                  className="w-full rounded-2xl border-2 border-slate-800 bg-white py-3 text-center text-sm font-bold text-slate-800 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isAdded ? (
                    <>
                      <Check size={16} className="text-emerald-600" />
                      <span className="text-emerald-600">Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={16} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Desktop Summary Sidebar */}
          <div className="hidden w-full max-w-[340px] shrink-0 flex-col justify-between gap-5 overflow-y-auto border-l border-slate-100 bg-white p-6 sm:p-7 lg:flex">
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
                onClick={handleProceedToCheckout}
                className="w-full rounded-2xl bg-[#F36F21] py-3.5 text-center text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-[#d95c12] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                disabled={!selectedDate || isAdded}
                onClick={handleAddToCart}
                className="w-full rounded-2xl border-2 border-slate-800 bg-white py-3 text-center text-sm font-bold text-slate-800 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
              >
                {isAdded ? (
                  <>
                    <Check size={16} className="text-emerald-600" />
                    <span className="text-emerald-600">Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
