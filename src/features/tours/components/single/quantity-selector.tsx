import { Minus, Plus } from "lucide-react";
import { formatPrice } from "@/src/features/tours/utils/format-price";

interface QuantitySelectorProps {
  label: string;
  sublabel?: string;
  unitPrice: number;
  currency: string;
  count: number;
  min?: number;
  max?: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function QuantitySelector({
  label,
  sublabel,
  unitPrice,
  currency,
  count,
  min = 0,
  max = 50,
  onIncrement,
  onDecrement,
}: QuantitySelectorProps) {
  const subtotal = count * unitPrice;

  return (
    <div className="flex items-center justify-between rounded-2xl bg-[#F5F9FC] px-5 py-4">
      {/* Label */}
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-[#111827]">{label}</span>
        {sublabel && (
          <span className="text-xs text-[#9CA3AF]">{sublabel}</span>
        )}
      </div>

      {/* Price + Controls */}
      <div className="flex items-center gap-4">
        <span className="min-w-[56px] text-right text-sm font-semibold text-[#111827]">
          {unitPrice === 0
            ? "Contact us for price"
            : formatPrice(subtotal, currency)}
        </span>

        <button
          type="button"
          onClick={onIncrement}
          disabled={count >= max}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#003A5A] text-white shadow transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus size={16} strokeWidth={2.5} />
        </button>

        <span className="w-4 text-center text-base font-bold text-[#111827]">
          {count}
        </span>

        <button
          type="button"
          onClick={onDecrement}
          disabled={count <= min}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#003A5A] text-white shadow transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
