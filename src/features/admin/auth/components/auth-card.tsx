import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck, Zap, Compass, ArrowLeft } from "lucide-react";

export function AuthCard({
  children,
  eyebrow,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="grid min-h-screen w-full bg-[#FAFAFA] lg:grid-cols-[1.1fr_0.9fr]">
      {/* ─── Left Side: Visual Hero Image & Branding ─── */}
      <div className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between p-12 xl:p-16 text-white min-h-screen">
        {/* Real Hero Image */}
        <Image
          src="/Hero/Hero.png"
          alt="Safari Hurghada Tours Red Sea Experience"
          fill
          priority
          sizes="55vw"
          className="object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E232A]/95 via-[#1E232A]/65 to-[#1E232A]/40" />

        {/* Top: Logo & Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="inline-block transition-opacity hover:opacity-90">
            <Image
              src="/Logo_white.png"
              alt="Safari Hurghada Tours"
              width={180}
              height={40}
              priority
              className="h-auto w-[160px]"
            />
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1 text-xs font-bold tracking-wide text-white backdrop-blur-md border border-white/20">
            <ShieldCheck size={13} className="text-[#F36F21]" />
            <span>Admin Workspace</span>
          </span>
        </div>

        {/* Bottom Content: Headline, Text & Trust Chips */}
        <div className="relative z-10 max-w-[540px]">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#F36F21]/20 px-3.5 py-1 text-xs font-bold text-[#F36F21] border border-[#F36F21]/30 backdrop-blur-md">
            <Sparkles size={13} />
            <span>Management Portal</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-black leading-[1.1] tracking-tight">
            Manage unforgettable Red Sea travel experiences.
          </h1>

          <p className="mt-4 text-base xl:text-lg leading-relaxed text-white/80">
            Secure administration console for tour itineraries, real-time booking vouchers, customer reviews, and daily excursions operations.
          </p>

          {/* Micro Feature Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-semibold text-white/90">
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md border border-white/10">
              <Zap size={13} className="text-[#F36F21]" />
              <span>Real-Time Bookings</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md border border-white/10">
              <Compass size={13} className="text-[#00A3C4]" />
              <span>Tour Moderation</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-md border border-white/10">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>Encrypted Session</span>
            </span>
          </div>
        </div>
      </div>

      {/* ─── Right Side: Auth Form Card ─── */}
      <div className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-10 lg:p-12">
        <div className="w-full max-w-[440px]">
          
          {/* Mobile Logo (only shown on small screens when left banner is hidden) */}
          <div className="mb-8 flex items-center justify-center lg:hidden">
            <Link href="/">
              <Image
                src="/Logo.png"
                alt="Safari Hurghada Tours"
                width={160}
                height={35}
                className="h-auto w-[150px]"
              />
            </Link>
          </div>

          {/* White Elevated Form Card */}
          <div className="rounded-3xl border border-slate-100 bg-white p-7 sm:p-9 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
            <div className="mb-7">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#F36F21] border border-orange-200/60">
                <Sparkles size={12} />
                <span>{eyebrow}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E232A]">
                {title}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                {subtitle}
              </p>
            </div>

            {children}
          </div>

          {/* Back to Home Link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#F36F21] transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to public website</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
