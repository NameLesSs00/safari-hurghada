import { CheckCircle2 } from "lucide-react";

interface TripHighlightsProps {
  highlights: string[];
}

export function TripHighlights({ highlights }: TripHighlightsProps) {
  const parsedHighlights = highlights
    .flatMap((item) => item.split("•"))
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] sm:p-8">
      <h2 className="mb-6 text-xl font-bold text-[#111827] sm:text-2xl">
        Tour Highlights
      </h2>

      <div className="flex flex-col gap-4">
        {parsedHighlights.map((highlight, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-[#10B981]"
            />
            <span className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              {highlight}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
