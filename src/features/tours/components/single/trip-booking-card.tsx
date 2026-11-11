"use client";

import { useState } from "react";
import { Clock, User, Users, Calendar, ShieldCheck, Zap, Sparkles } from "lucide-react";
import type { Trip } from "@/src/features/tours/types/trip";
import { formatPrice } from "@/src/features/tours/utils/format-price";
import { WhatsAppIcon } from "@/src/shared/components/icons";
import { SITE, whatsappUrl } from "@/src/shared/config/site-config";
import { AvailabilityModal } from "./availability-modal";

interface TripBookingCardProps {
  trip: Trip;
}

export function TripBookingCard({ trip }: TripBookingCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const whatsappMessage = `Hello ${SITE.brand.name}! I am interested in booking "${trip.name}". Could you please check availability and pricing for me?`;

  return (
    <>
      <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        {/* Pricing Header */}
        <div className="flex items-baseline justify-between border-b border-slate-100 pb-5">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Starting from
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#1E232A]">
                {trip.adultPrice === 0 ? "Contact Us" : formatPrice(trip.adultPrice, trip.currencyName)}
              </span>
              {trip.adultPrice > 0 && (
                <span className="text-sm font-medium text-slate-500">/ person</span>
              )}
            </div>
          </div>

          <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-100">
            Best Price
          </div>
        </div>

        {/* Quick Specs summary */}
        <div className="flex flex-col gap-3.5 py-5 border-b border-slate-100 text-sm">
          {/* Duration */}
          <div className="flex items-center justify-between text-slate-700">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-[#F36F21]">
                <Clock size={16} />
              </div>
              <span className="font-medium">Duration</span>
            </div>
            <span className="font-semibold text-[#1E232A]">
              {trip.durationValue} {trip.durationTypeName}
            </span>
          </div>

          {/* Adult Price */}
          <div className="flex items-center justify-between text-slate-700">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                <User size={16} />
              </div>
              <span className="font-medium">Adult Ticket</span>
            </div>
            <span className="font-semibold text-emerald-600">
              {trip.adultPrice === 0 ? "Contact us" : `${formatPrice(trip.adultPrice, trip.currencyName)}`}
            </span>
          </div>

          {/* Child Price if available */}
          {trip.childPrice > 0 && (
            <div className="flex items-center justify-between text-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                  <Users size={16} />
                </div>
                <span className="font-medium">Child (3-11 yrs)</span>
              </div>
              <span className="font-semibold text-emerald-600">
                {formatPrice(trip.childPrice, trip.currencyName)}
              </span>
            </div>
          )}

          {/* Available Days */}
          <div className="flex items-center justify-between text-slate-700">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-50 text-[#00A3C4]">
                <Calendar size={16} />
              </div>
              <span className="font-medium">Availability</span>
            </div>
            <span className="font-semibold text-[#1E232A]">
              {trip.availableDays.length === 7 ? "Daily" : `${trip.availableDays.length} days/week`}
            </span>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col gap-3 pt-5">
          {/* Main Book Now / Check Availability Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full rounded-2xl bg-[#F36F21] py-4 text-center text-base font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-[#d95c12] hover:shadow-orange-500/35 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
          >
            <Calendar size={18} />
            <span>Check Dates & Book</span>
          </button>

          {/* WhatsApp Instant Inquiry */}
          <a
            href={whatsappUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-2xl border border-emerald-200 bg-emerald-50/70 py-3 text-center text-sm font-bold text-emerald-700 transition-all hover:bg-emerald-100 hover:border-emerald-300 flex items-center justify-center gap-2"
          >
            <WhatsAppIcon className="size-4 text-[#25D366]" />
            <span>Inquire on WhatsApp</span>
          </a>
        </div>

        {/* Guarantees List */}
        <div className="mt-6 flex flex-col gap-2 rounded-2xl bg-slate-50/80 p-3.5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-[#F36F21] shrink-0" />
            <span>Instant booking confirmation</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
            <span>Free cancellation up to 24h prior</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-[#00A3C4] shrink-0" />
            <span>Best price guarantee with no hidden fees</span>
          </div>
        </div>
      </div>

      <AvailabilityModal
        trip={trip}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
