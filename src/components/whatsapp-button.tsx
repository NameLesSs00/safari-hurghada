"use client";

import { WhatsAppIcon } from "@/src/shared/components/icons";

export function WhatsAppButton() {
  const phoneNumber = "+201093943595";
  // Remove any spaces or pluses for the WhatsApp URL
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 sm:bottom-8 sm:right-8">
      {/* Tooltip */}
      <div className="relative flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#003A5A] shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
        Book now
        {/* Right Arrow */}
        <div className="absolute -right-[6px] top-1/2 -translate-y-1/2 border-y-[6px] border-l-[8px] border-y-transparent border-l-white" />
      </div>

      <a
        href={`https://wa.me/${cleanPhone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 sm:size-16"
        aria-label="Chat with us on WhatsApp"
      >
        <WhatsAppIcon className="size-8 sm:size-9" />
      </a>
    </div>
  );
}
