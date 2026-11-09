import { Sparkles, Check } from "lucide-react";

interface TripHighlightsProps {
  highlights: string[];
}

export function TripHighlights({ highlights }: TripHighlightsProps) {
  const parsedHighlights = highlights
    .flatMap((item) => item.split("•"))
    .map((item) => item.trim())
    .filter(Boolean);

  if (!parsedHighlights.length) return null;

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
      <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#F36F21]">
          <Sparkles size={18} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#1E232A]">
          Tour Highlights
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {parsedHighlights.map((highlight, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-2xl bg-orange-50/30 border border-orange-100/50 p-4 transition-all hover:bg-orange-50/60"
          >
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F36F21] text-white shadow-sm">
              <Check size={13} strokeWidth={3} />
            </div>
            <span className="text-sm font-medium leading-relaxed text-slate-700">
              {highlight}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
