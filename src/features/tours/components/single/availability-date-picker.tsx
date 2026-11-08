"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  return (
    <div className="w-full select-none">
      {/* Month navigation */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={prevMonth}
          disabled={isPrevDisabled}
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#003A5A] transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-semibold text-[#111827]">{monthLabel}</span>
        <button
          type="button"
          onClick={nextMonth}
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#003A5A] transition-colors hover:bg-gray-100"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day headers */}
      <div className="mb-2 grid grid-cols-7 text-center">
        {DAY_NAMES.map((d) => (
          <span key={d} className="text-xs font-semibold text-[#9CA3AF]">
            {d}
          </span>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-y-1 text-center">
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
              className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors
                ${selected ? "bg-[#003A5A] text-white" : ""}
                ${!selected && todayCell ? "border border-[#003A5A] text-[#003A5A]" : ""}
                ${!selected && !todayCell && !disabled ? "text-[#111827] hover:bg-[#EFF6FF]" : ""}
                ${disabled ? "cursor-not-allowed text-gray-300" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
