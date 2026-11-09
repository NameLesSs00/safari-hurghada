import Link from "next/link";
import { ChevronRight, ArrowLeft, Home, Compass } from "lucide-react";

interface TripHeaderProps {
  tripName: string;
  destinationName?: string;
}

export function TripHeader({ tripName, destinationName = "Hurghada" }: TripHeaderProps) {
  return (
    <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-30 py-3.5 transition-all shadow-sm" aria-label="Breadcrumb">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 overflow-x-auto no-scrollbar py-0.5">
          <Link
            href="/"
            className="flex items-center gap-1.5 transition-colors hover:text-[#F36F21]"
          >
            <Home size={14} className="text-slate-400" />
            <span>Home</span>
          </Link>
          
          <ChevronRight size={14} className="text-slate-300 shrink-0" />
          
          <Link
            href="/trips"
            className="transition-colors hover:text-[#F36F21]"
          >
            Tours
          </Link>
          
          <ChevronRight size={14} className="text-slate-300 shrink-0" />

          <Link
            href={`/trips?destination=${encodeURIComponent(destinationName.toLowerCase())}`}
            className="transition-colors hover:text-[#F36F21] whitespace-nowrap"
          >
            {destinationName}
          </Link>

          <ChevronRight size={14} className="text-slate-300 shrink-0" />

          <span className="font-semibold text-slate-800 line-clamp-1 max-w-[200px] sm:max-w-[320px] md:max-w-none">
            {tripName}
          </span>
        </div>

        {/* Right: Quick Back Link */}
        <Link
          href="/trips"
          className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:border-[#F36F21] hover:text-[#F36F21] hover:bg-orange-50/50 shadow-sm shrink-0"
        >
          <ArrowLeft size={14} />
          <span>Back to Tours</span>
        </Link>
      </div>
    </nav>
  );
}
