"use client";

import { useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/src/shared/components/icons";
import { whatsappUrl } from "@/src/shared/config/site-config";

export function WhatsAppButton() {
  const headerT = useTranslations("Header");
  const footerT = useTranslations("Footer");
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 sm:bottom-8 sm:right-8">
      {/* Tooltip */}
      <div className="relative flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#1E232A] shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
        {headerT("bookNow")}
        {/* Right Arrow */}
        <div className="absolute -right-[6px] top-1/2 -translate-y-1/2 border-y-[6px] border-l-[8px] border-y-transparent border-l-white" />
      </div>

      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 sm:size-16"
        aria-label={footerT("chatOnWhatsApp")}
      >
        <WhatsAppIcon className="size-8 sm:size-9" />
      </a>
    </div>
  );
}
