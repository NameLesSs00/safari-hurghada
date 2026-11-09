"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarCheck } from "lucide-react";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Map API day name strings to JS day-of-week index (0=Sun, 1=Mon…)
const DAY_NAME_TO_INDEX: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

interface AvailabilityDatePickerProps {
  availableDays: string[]; // e.g. ["Saturday", "Friday", "Sunday"]
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function AvailabilityDatePicker({
  availableDays,
  selectedDate,
  onDateSelect,
}: AvailabilityDatePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const availableDayIndexes = new Set(
    availableDays.map((d) => DAY_NAME_TO_INDEX[d]).filter((v) => v !== undefined)
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0-6
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthLabel = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const prevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  // Disable prev button if current view is current month
  const isPrevDisabled =
    year === today.getFullYear() && month === today.getMonth();

  const cells: (number | null)[] = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Pad to complete the last row
  while (cells.length % 7 !== 0) cells.push(null);

  const isDisabled = (day: number): boolean => {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    if (date < today) return true;
    if (!availableDayIndexes.has(date.getDay())) return true;
    return false;
  };

  const isSelected = (day: number): boolean => {
    if (!selectedDate) return false;
    const date = new Date(year, month, day);
    return isSameDay(date, selectedDate);
  };

  const isToday = (day: number): boolean => {
    const date = new Date(year, month, day);
    return isSameDay(date, today);
  };

  const availabilityText =
    availableDays.length === 7
      ? "Daily departures available"
      : `Departs on ${availableDays.join(", ")}`;

  return (
    <div className="w-full select-none">
      {/* Month navigation */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={prevMonth}
          disabled={isPrevDisabled}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-orange-50 hover:text-[#F36F21] disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-bold text-[#1E232A]">{monthLabel}</span>
        <button
          type="button"
          onClick={nextMonth}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-orange-50 hover:text-[#F36F21]"
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day headers */}
      <div className="mb-2 grid grid-cols-7 text-center">
        {DAY_NAMES.map((d) => (
          <span key={d} className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {d}
          </span>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-y-1.5 text-center">
        {cells.map((day, idx) => {
          if (!day) {
            return <div key={`empty-${idx}`} />;
          }

          const disabled = isDisabled(day);
          const selected = isSelected(day);
          const todayCell = isToday(day);

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => onDateSelect(new Date(year, month, day))}
              className={`mx-auto flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-sm font-bold transition-all cursor-pointer
                ${selected ? "bg-[#F36F21] text-white shadow-md shadow-orange-500/30 scale-105" : ""}
                ${!selected && todayCell ? "border-2 border-[#F36F21] text-[#F36F21]" : ""}
                ${!selected && !todayCell && !disabled ? "text-[#1E232A] hover:bg-orange-50 hover:text-[#F36F21] hover:scale-105" : ""}
                ${disabled ? "cursor-not-allowed text-slate-300 font-normal line-through opacity-60" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend & Availability note */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 text-[#00A3C4] font-medium">
          <CalendarCheck size={14} className="text-[#00A3C4] shrink-0" />
          <span className="truncate">{availabilityText}</span>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#F36F21]" />
            <span>Selected</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-slate-300 line-through" />
            <span className="text-slate-400">Unavailable</span>
          </span>
        </div>
      </div>
    </div>
  );
}
