import Link from "next/link";

interface TripHeaderProps {
  tripName: string;
}

export function TripHeader({ tripName }: TripHeaderProps) {
  return (
    <nav className="bg-white py-4 lg:py-6" aria-label="Breadcrumb">
      <div className="mx-auto w-full px-5 md:px-8 lg:max-w-[1200px] lg:px-10">
        <div className="flex items-center justify-center gap-2 text-sm">
          <Link
            href="/trips"
            className="text-[#6B7280] transition-colors hover:text-[#003A5A]"
          >
            Home
          </Link>
          <span className="text-[#6B7280]">&gt;</span>
          <span className="font-semibold text-[#003A5A]">Trip details</span>
        </div>
      </div>
    </nav>
  );
}
