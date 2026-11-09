"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  CheckCircle2,
  CalendarDays,
  Users,
  Compass,
  MapPin,
  Building,
  User,
  Mail,
  Phone,
  Globe,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { WhatsAppIcon } from "@/src/shared/components/icons";
import { useCartStore } from "@/src/store/use-cart-store";
import type { AppLocale } from "@/src/i18n/locales";

export default function CheckoutSuccessPage() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("CheckoutSuccessPage");
  const { lastBooking } = useCartStore();

  const handleWhatsAppClick = () => {
    const nl = "%0A";
    let message = `Hello SunnySide Tours! I just made a reservation.${nl}${nl}`;
    if (lastBooking) {
      message += `*Lead Guest:* ${lastBooking.firstName} ${lastBooking.lastName}${nl}`;
      message += `*Email:* ${lastBooking.email}${nl}`;
      message += `*Phone:* ${lastBooking.phone}${nl}`;
      if (lastBooking.hotelName) message += `*Hotel:* ${lastBooking.hotelName}${nl}`;
      if (lastBooking.roomNo) message += `*Room No:* ${lastBooking.roomNo}${nl}`;
      message += `${nl}*Booked Tours:*${nl}`;
      lastBooking.tripsBookings.forEach((trip) => {
        message += `• *${trip.title}* on *${trip.leaveDate}* (${trip.noAdult} Adults${trip.noChild > 0 ? `, ${trip.noChild} Children` : ""})${nl}`;
      });
      message += `${nl}*Total Price:* €${lastBooking.totalPrice.toFixed(2)}${nl}${nl}`;
    }
    message += `Could you please confirm the pickup time and details for my trip?`;

    window.open(`https://wa.me/201093943595?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        
        {/* Celebration Header & Icon */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 shadow-lg shadow-emerald-500/10">
            <CheckCircle2 size={46} strokeWidth={2.2} />
            <div className="absolute -top-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#F36F21] text-white shadow-xs">
              <Sparkles size={14} />
            </div>
          </div>

          <div className="flex flex-col gap-2 max-w-xl">
            <div className="inline-flex items-center justify-center gap-1.5 self-center rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
              <span>Reservation Confirmed</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E232A]">
              {t("title")}
            </h1>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>

        {/* Official Voucher Ticket Card */}
        {lastBooking ? (
          <div className="w-full rounded-3xl border border-slate-100 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden text-left">
            {/* Voucher Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/70 px-6 py-4.5">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[#F36F21] text-base tracking-tight">SunnySide Tours</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Travel Voucher</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                  <ShieldCheck size={13} />
                  <span>Confirmed &amp; Secured</span>
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Lead Guest Information Grid */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Lead Guest Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50/80 p-3 border border-slate-100">
                    <User size={16} className="text-[#F36F21] shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] text-slate-400">Guest Name</span>
                      <span className="text-xs sm:text-sm font-bold text-[#1E232A] truncate">
                        {lastBooking.firstName} {lastBooking.lastName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50/80 p-3 border border-slate-100">
                    <Mail size={16} className="text-[#00A3C4] shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] text-slate-400">Email</span>
                      <span className="text-xs sm:text-sm font-bold text-[#1E232A] truncate">
                        {lastBooking.email}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50/80 p-3 border border-slate-100">
                    <Phone size={16} className="text-emerald-600 shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] text-slate-400">Phone / WhatsApp</span>
                      <span className="text-xs sm:text-sm font-bold text-[#1E232A] truncate">
                        {lastBooking.phone}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50/80 p-3 border border-slate-100">
                    <Globe size={16} className="text-amber-600 shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] text-slate-400">Nationality</span>
                      <span className="text-xs sm:text-sm font-bold text-[#1E232A] truncate">
                        {lastBooking.nationality}
                      </span>
                    </div>
                  </div>

                  {lastBooking.hotelName && (
                    <div className="flex items-center gap-3 rounded-2xl bg-slate-50/80 p-3 border border-slate-100">
                      <Building size={16} className="text-indigo-600 shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[11px] text-slate-400">Hotel Pickup</span>
                        <span className="text-xs sm:text-sm font-bold text-[#1E232A] truncate">
                          {lastBooking.hotelName}
                        </span>
                      </div>
                    </div>
                  )}

                  {lastBooking.roomNo && (
                    <div className="flex items-center gap-3 rounded-2xl bg-slate-50/80 p-3 border border-slate-100">
                      <MapPin size={16} className="text-rose-500 shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[11px] text-slate-400">Room Number</span>
                        <span className="text-xs sm:text-sm font-bold text-[#1E232A] truncate">
                          Room {lastBooking.roomNo}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Reserved Excursions Cards */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Booked Excursions &amp; Tours ({lastBooking.tripsBookings.length})
                </h3>
                <div className="space-y-3">
                  {lastBooking.tripsBookings.map((trip) => (
                    <div
                      key={trip.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-2xs hover:border-slate-200 transition-colors"
                    >
                      <div className="flex flex-col gap-1">
                        <h4 className="text-sm sm:text-base font-bold text-[#1E232A]">
                          {trip.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1 font-medium">
                            <CalendarDays size={13} className="text-[#F36F21]" />
                            <span>{trip.leaveDate}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-medium">
                            <Users size={13} className="text-[#00A3C4]" />
                            <span>
                              {trip.noAdult} Adult{trip.noAdult !== 1 ? "s" : ""}
                              {trip.noChild > 0 ? `, ${trip.noChild} Child${trip.noChild !== 1 ? "ren" : ""}` : ""}
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-baseline sm:flex-col sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                        <span className="text-xs text-slate-400 sm:text-[11px]">Subtotal</span>
                        <span className="text-lg font-black text-emerald-600">
                          €{trip.subTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grand Total Bar */}
              <div className="flex items-baseline justify-between pt-4 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-base font-extrabold text-[#1E232A]">Total Due on Pickup</span>
                  <span className="text-xs text-slate-400">All local transfers &amp; taxes included</span>
                </div>
                <span className="text-2xl sm:text-3xl font-black text-emerald-600">
                  €{lastBooking.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full rounded-3xl border border-slate-100 bg-white p-8 shadow-xs text-center">
            <p className="text-sm text-slate-600 font-medium">
              Your excursion reservation is saved in our system. Please click below to connect with your tour manager on WhatsApp!
            </p>
          </div>
        )}

        {/* Action Buttons: WhatsApp & Home Only (No Print, No IDs) */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full justify-center pt-2">
          {/* Main WhatsApp Confirmation CTA */}
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] px-8 py-4 font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-[#20bd5a] active:scale-[0.98] cursor-pointer"
          >
            <WhatsAppIcon className="size-5 text-white" />
            <span>Connect on WhatsApp for Pickup Time</span>
          </button>

          {/* Back Home */}
          <Link
            href={`/${locale}`}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 font-bold text-slate-700 shadow-2xs transition-all hover:border-[#F36F21] hover:text-[#F36F21] active:scale-[0.98]"
          >
            <Compass size={17} />
            <span>{t("backHome")}</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
}
