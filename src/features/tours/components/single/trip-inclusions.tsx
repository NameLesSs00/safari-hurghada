import { Check, X, CheckCircle2 } from "lucide-react";

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

  if (!parsedIncludes.length && !parsedExcludes.length) return null;

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
      <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#F36F21]">
          <CheckCircle2 size={18} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#1E232A]">
          What&apos;s Included &amp; Excluded
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Included Column */}
        {parsedIncludes.length > 0 && (
          <div className="rounded-2xl border border-emerald-100/80 bg-emerald-50/40 p-5 sm:p-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100/70 px-3.5 py-1 text-xs font-bold text-emerald-800">
              <Check size={14} strokeWidth={2.5} />
              <span>Included in Experience</span>
            </div>
            <ul className="flex flex-col gap-3">
              {parsedIncludes.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium leading-relaxed text-slate-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Excluded Column */}
        {parsedExcludes.length > 0 && (
          <div className="rounded-2xl border border-rose-100/80 bg-rose-50/30 p-5 sm:p-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100/70 px-3.5 py-1 text-xs font-bold text-rose-800">
              <X size={14} strokeWidth={2.5} />
              <span>Not Included</span>
            </div>
            <ul className="flex flex-col gap-3">
              {parsedExcludes.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                    <X size={13} strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-medium leading-relaxed text-slate-600">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
