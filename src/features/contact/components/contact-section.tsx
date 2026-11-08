import { ContactBreadcrumb } from "./contact-breadcrumb";
import { ContactForm } from "./contact-form";
import { ContactHero } from "./contact-hero";
import { ContactInfo } from "./contact-info";
import { ContactMap } from "./contact-map";
import { ContactSocial } from "./contact-social";

export function ContactSection() {
  return (
    <>
      <ContactHero />
      <ContactBreadcrumb />

      <section className="bg-[#ffffff] py-12 md:py-16 lg:py-20">
        <div className="mx-auto w-full px-5 md:px-8 lg:max-w-[1400px] lg:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12 xl:gap-16">
            {/* Left side: Form */}
            <div className="w-full lg:w-[45%] xl:w-[40%]">
              <ContactForm />
            </div>

            {/* Right side: Map & Social */}
            <div className="flex w-full flex-col lg:w-[55%] xl:w-[60%]">
              <ContactMap />
              <ContactSocial />
            </div>
          </div>

          {/* Bottom: Contact Info Bar */}
          <div className="mt-8">
            <ContactInfo />
          </div>
        </div>
      </section>
    </>
  );
}
