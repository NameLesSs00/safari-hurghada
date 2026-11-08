"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { useCartStore } from "@/src/store/use-cart-store";
import type { AppLocale } from "@/src/i18n/locales";

export default function CheckoutSuccessPage() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("CheckoutSuccessPage");
  const { lastBooking } = useCartStore();

  const handleWhatsAppClick = () => {
    if (!lastBooking) return;
    const nl = "%0A";
    let message = `Hello, I just made a booking!${nl}${nl}`;
    message += `*Name:* ${lastBooking.firstName} ${lastBooking.lastName}${nl}`;
    message += `*Email:* ${lastBooking.email}${nl}`;
    message += `*Phone:* ${lastBooking.phone}${nl}`;
    if (lastBooking.hotelName) message += `*Hotel:* ${lastBooking.hotelName}${nl}`;
    if (lastBooking.roomNo) message += `*Room No:* ${lastBooking.roomNo}${nl}`;
    message += `${nl}*Trips:*${nl}`;
    lastBooking.tripsBookings.forEach((trip) => {
      message += `*Trip:* ${trip.title}${nl}`;
      message += `*Date:* ${trip.leaveDate}${nl}`;
      message += `*Travellers:* ${trip.noAdult} Adults, ${trip.noChild} Children${nl}${nl}`;
    });
    message += `and my total price is €${lastBooking.totalPrice.toFixed(2)}. right?`;

    window.open(`https://wa.me/201093943595?text=${message}`, "_blank");
  };

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8 px-4 py-20 text-center max-w-3xl mx-auto">
      <div className="relative h-48 w-48">
        <Image
          src="/succes.gif"
          alt={t("imageAlt")}
          fill
          unoptimized
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-[#111827]">
          {t("title")}
        </h1>
        <p className="text-[#6B7280]">
          {t("description")}
        </p>
      </div>

      {lastBooking && (
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-left">
          <h2 className="mb-4 text-xl font-bold text-[#003A5A]">Booking Details (ID: #{lastBooking.id})</h2>
          
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-medium">{lastBooking.firstName} {lastBooking.lastName}</p>
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium">{lastBooking.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium">{lastBooking.phone}</p>
            </div>
            <div>
              <p className="text-gray-500">Nationality</p>
              <p className="font-medium">{lastBooking.nationality}</p>
            </div>
            {lastBooking.hotelName && (
              <div>
                <p className="text-gray-500">Hotel Name</p>
                <p className="font-medium">{lastBooking.hotelName}</p>
              </div>
            )}
            {lastBooking.roomNo && (
              <div>
                <p className="text-gray-500">Room No.</p>
                <p className="font-medium">{lastBooking.roomNo}</p>
              </div>
            )}
          </div>

          <h3 className="mb-3 text-lg font-semibold text-gray-800">Trips</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-3 py-2 font-medium">Trip Name</th>
                  <th className="px-3 py-2 font-medium">Date</th>
                  <th className="px-3 py-2 font-medium text-center">Travellers</th>
                  <th className="px-3 py-2 font-medium text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {lastBooking.tripsBookings.map((trip) => (
                  <tr key={trip.id}>
                    <td className="px-3 py-3 font-medium text-gray-800">{trip.title}</td>
                    <td className="px-3 py-3 text-gray-600">{trip.leaveDate}</td>
                    <td className="px-3 py-3 text-center text-gray-600">
                      {trip.noAdult} Adults, {trip.noChild} Children
                    </td>
                    <td className="px-3 py-3 text-right font-medium text-[#003A5A]">
                      €{trip.subTotal.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 border-t border-gray-100 pt-4 flex justify-between items-center">
            <span className="font-bold text-gray-800">Total Price</span>
            <span className="text-xl font-bold text-green-600">€{lastBooking.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-4 mt-4 w-full justify-center">
        {lastBooking && (
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 font-semibold text-white transition-colors hover:bg-[#20bd5a] w-full sm:w-auto"
          >
            <MessageCircle size={20} />
            Message us to know the full details
          </button>
        )}
      </div>
    </div>
  );
}
