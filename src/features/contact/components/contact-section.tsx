"use client";

import { ContactBreadcrumb } from "./contact-breadcrumb";
import { ContactForm } from "./contact-form";
import { ContactHero } from "./contact-hero";
import { ContactInfo } from "./contact-info";
import { ContactMap } from "./contact-map";
import { ContactSocial } from "./contact-social";

export function ContactSection() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <ContactHero />

      <main className="mx-auto w-full max-w-[1360px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <ContactBreadcrumb />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* Left Column: Inquiry Form */}
          <div className="lg:col-span-6 xl:col-span-6">
            <ContactForm />
          </div>

          {/* Right Column: Contact Info Cards, Map & Social */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col gap-6">
            <ContactInfo />
            <ContactMap />
            <ContactSocial />
          </div>
        </div>
      </main>
    </div>
  );
}
