import { MapPin, Clock, Calendar, Compass, ShieldCheck } from "lucide-react";
import type { Trip } from "@/src/features/tours/types/trip";

interface TripQuickInfoProps {
  trip: Trip;
}

export function TripQuickInfo({ trip }: TripQuickInfoProps) {
  const destinationName = trip.destinationInfo?.name || "Hurghada";
  const daysString =
    trip.availableDays.length === 7 ? "Every Day (Daily)" : trip.availableDays.join(", ");

  const items = [
    {
      label: "Destination",
      value: `${destinationName}, Egypt`,
      icon: MapPin,
      bgColor: "bg-orange-50",
      textColor: "text-[#F36F21]",
    },
    {
      label: "Duration",
      value: `${trip.durationValue} ${trip.durationTypeName}`,
      icon: Clock,
      bgColor: "bg-cyan-50",
      textColor: "text-[#00A3C4]",
    },
    {
      label: "Tour Type",
      value: trip.tripTypeName || "Sightseeing & Adventure",
      icon: Compass,
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      label: "Availability",
      value: daysString,
      icon: Calendar,
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
      <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#F36F21]">
          <ShieldCheck size={18} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#1E232A]">
          Tour Details & Key Specs
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-white hover:shadow-sm"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.bgColor} ${item.textColor}`}
              >
                <Icon size={19} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {item.label}
                </span>
                <span className="text-sm font-bold text-[#1E232A] mt-0.5 break-words">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
