"use client";

import type { TripType } from "@/src/features/tours/types/trip-type";

interface TripTypeFilterProps {
  tripTypes: TripType[];
  selectedTypeId: number | null;
  onSelectType: (typeId: number | null) => void;
}

export function TripTypeFilter({
  tripTypes,
  selectedTypeId,
  onSelectType,
}: TripTypeFilterProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">


      {/* Trip type buttons */}
      {tripTypes.map((type) => (
        <button
          key={type.id}
          type="button"
          onClick={() => onSelectType(type.id)}
          className={`shrink-0 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
            selectedTypeId === type.id
              ? "bg-[#69DD84] text-[#FDFEFF]"
              : "border border-gray-200 bg-white text-[#979BA7] hover:border-gray-300"
          }`}
        >
          {type.name}
        </button>
      ))}
    </div>
  );
}
