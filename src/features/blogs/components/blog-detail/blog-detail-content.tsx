"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Copy, ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Blog } from "@/src/features/admin/blogs/types";
import { MobileTableOfContents } from "./mobile-table-of-contents";
import { WhatsAppIcon } from "@/src/shared/components/icons";
import type { AppLocale } from "@/src/i18n/locales";

interface BlogDetailContentProps {
  blog: Blog;
}

/** Parses **text** markdown and returns React nodes with bold text */
function renderContent(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-bold text-[#0F2942]">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export function BlogDetailContent({ blog }: BlogDetailContentProps) {
  const [copied, setCopied] = useState(false);
  const locale = useLocale() as AppLocale;
  const t = useTranslations("BlogDetail");

  function handleCopy() {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleWhatsAppShare() {
    if (typeof window !== "undefined") {
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(
        `${blog.title} - ${window.location.href}`
      )}`;
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  }

  const paragraphs = blog.content.split("\n\n").filter(Boolean);

  return (
    <article className="w-full">
      {/* Mobile Table of Contents */}
      <div className="lg:hidden mb-8">
        <MobileTableOfContents sections={blog.blogSections} />
      </div>

      {/* Intro Lead Paragraphs */}
      <div className="space-y-4 mb-10 text-slate-700">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className={
              index === 0
                ? "text-lg sm:text-[19px] font-medium leading-[1.8] text-[#0F2942]"
                : "text-base sm:text-[17px] leading-[1.85] text-slate-600"
            }
          >
            {renderContent(paragraph)}
          </p>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-12">
        {blog.blogSections?.map((section) => (
          <section
            key={section.id}
            id={`section-${section.id}`}
            className="scroll-mt-28 border-t border-gray-100 pt-8"
          >
            <h2 className="mb-4 text-xl sm:text-2xl font-black tracking-tight text-[#0F2942] leading-snug">
              {section.title}
            </h2>

            {section.imageUrl && (
              <div className="relative mb-5 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100 border border-gray-100 shadow-sm">
                <Image
                  src={section.imageUrl}
                  alt={section.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 820px, 100vw"
                />
              </div>
            )}

            <div className="space-y-4 text-base sm:text-[17px] leading-[1.85] text-slate-600">
              {section.content.split("\n\n").filter(Boolean).map((p, pIdx) => (
                <p key={pIdx}>{renderContent(p)}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Social Share & Navigation Row */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="text-xs sm:text-sm font-semibold text-slate-500 mr-1">
            {t("share.title")}:
          </span>

          {/* WhatsApp Share */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            aria-label="Share on WhatsApp"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-110 shadow-xs cursor-pointer"
          >
            <WhatsAppIcon className="size-4" />
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopy}
            className="relative inline-flex h-9 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-xs transition-colors hover:border-[#F36F21] hover:text-[#F36F21] cursor-pointer"
            aria-label={t("share.copyLink")}
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-500" />
                <span className="text-emerald-600">{t("share.copied")}</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>{t("share.copyLink")}</span>
              </>
            )}
          </button>
        </div>

        {/* Back to All Blogs Link */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#F36F21] hover:underline"
        >
          <ArrowLeft size={16} />
          <span>{t("share.backToBlogs")}</span>
        </Link>
      </div>
    </article>
  );
}
