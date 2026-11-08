import { Check, X } from "lucide-react";

interface TripInclusionsProps {
  includes: string[];
  excludes: string[];
}

export function TripInclusions({ includes, excludes }: TripInclusionsProps) {
  const parsedIncludes = includes
    .flatMap((item) => item.split("•"))
    .map((item) => item.trim())
    .filter(Boolean);

  const parsedExcludes = excludes
    .flatMap((item) => item.split("•"))
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-[#111827] sm:text-2xl">
        Included/Exclude
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-10">
        {/* Included */}
        <div className="rounded-xl bg-[#F9FAFB] p-5 sm:p-6 lg:bg-transparent lg:p-0">
          <div className="mb-4 inline-block rounded-full bg-white px-8 py-2 shadow-sm lg:bg-[#F9FAFB]">
            <h3 className="text-sm font-semibold text-[#111827]">Included</h3>
          </div>
          <ul className="flex flex-col gap-3">
            {parsedIncludes.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10B981]">
                  <Check size={14} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-sm text-[#374151]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Excluded */}
        <div className="rounded-xl bg-[#FEF2F2] p-5 sm:p-6 lg:bg-transparent lg:p-0">
          <div className="mb-4 inline-block rounded-full bg-white px-8 py-2 shadow-sm lg:bg-[#FEF2F2]">
            <h3 className="text-sm font-semibold text-[#111827]">Excluded</h3>
          </div>
          <ul className="flex flex-col gap-3">
            {parsedExcludes.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                  <X size={18} className="text-[#EF4444]" strokeWidth={2.5} />
                </div>
                <span className="text-sm text-[#374151]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
