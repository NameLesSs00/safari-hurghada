import Link from "next/link";
import { Mail, MapPin, MoreHorizontal, Phone } from "lucide-react";

import {
  FacebookIcon,
  InstagramIcon,
  TripAdvisorIcon,
  WhatsAppIcon,
} from "@/src/shared/components/icons";
import { SITE, telHref, mailtoHref, whatsappUrl } from "@/src/shared/config/site-config";

export function TopHeaderBar() {
  const tripAdvisorLink =
    SITE.social.find((s) => s.name === "TripAdvisor")?.href ||
    "https://ar.tripadvisor.com/Attraction_Review-g27118717-d34383266-Reviews-Safarihurghada-Hurghada_1_Hurghada_Red_Sea_and_Sinai.html";

  return (
    <div className="hidden border-b border-dashed border-gray-200/90 bg-white md:block">
      <div className="mx-auto flex h-10 w-full max-w-[1340px] items-center justify-between px-4 text-xs font-medium text-[#4B5563] sm:px-6 lg:px-8">
        {/* Left: Contact Info Items */}
        <div className="flex items-center gap-5 lg:gap-7">
          {/* Address */}
          <a
            href={SITE.contact.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 transition-colors hover:text-[#F36F21]"
            title={SITE.contact.address.full}
          >
            <MapPin
              size={15}
              className="shrink-0 text-[#1E232A] transition-colors group-hover:text-[#F36F21]"
            />
            <span className="truncate max-w-[260px] lg:max-w-none">
              {SITE.contact.address.street}
            </span>
          </a>

          {/* Phone */}
          <a
            href={telHref(SITE.contact.phones.primary)}
            className="group flex items-center gap-2 transition-colors hover:text-[#F36F21]"
            title="Call Safari Hurghada"
          >
            <Phone
              size={15}
              className="shrink-0 text-[#1E232A] transition-colors group-hover:text-[#F36F21]"
            />
            <span>+2 01099466832</span>
          </a>

          {/* Email */}
          <a
            href={mailtoHref(SITE.contact.emails.primary)}
            className="group flex items-center gap-2 transition-colors hover:text-[#F36F21]"
            title="Email Safari Hurghada"
          >
            <Mail
              size={15}
              className="shrink-0 text-[#1E232A] transition-colors group-hover:text-[#F36F21]"
            />
            <span>{SITE.contact.emails.primary}</span>
          </a>
        </div>

        {/* Right: Social Media Pill Icons */}
        <div className="flex items-center gap-2">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/SafariHurghada/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Safari Hurghada on Facebook"
            className="grid size-7 place-items-center rounded-md bg-[#F3F4F6] text-[#374151] transition-all hover:bg-[#1877F2] hover:text-white"
          >
            <FacebookIcon className="size-[17px]" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/safarihurghada/?igshid=YmMyMTA2M2Y="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Safari Hurghada on Instagram"
            className="grid size-7 place-items-center rounded-md bg-[#F3F4F6] text-[#374151] transition-all hover:bg-[#E4405F] hover:text-white"
          >
            <InstagramIcon className="size-[17px]" />
          </a>

          {/* TripAdvisor */}
          <a
            href={tripAdvisorLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Safari Hurghada on TripAdvisor"
            className="grid size-7 place-items-center rounded-md bg-[#F3F4F6] text-[#374151] transition-all hover:bg-[#00AA6C] hover:text-white"
          >
            <TripAdvisorIcon className="size-[18px]" />
          </a>

          {/* WhatsApp */}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Safari Hurghada on WhatsApp"
            className="grid size-7 place-items-center rounded-md bg-[#F3F4F6] text-[#374151] transition-all hover:bg-[#25D366] hover:text-white"
          >
            <WhatsAppIcon className="size-[17px]" />
          </a>

          {/* More Contact Options / Dropdown */}
          <Link
            href="/contact-us"
            aria-label="Contact options"
            className="grid size-7 place-items-center rounded-md bg-[#F3F4F6] text-[#374151] transition-all hover:bg-[#F36F21] hover:text-white"
          >
            <MoreHorizontal size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

