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
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-100 px-5 py-4">
      {/* Label */}
      <div className="flex flex-col">
        <span className="text-sm font-bold text-[#1E232A]">{label}</span>
        {sublabel && (
          <span className="text-xs text-slate-400">{sublabel}</span>
        )}
      </div>

      {/* Price + Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="min-w-[64px] text-right text-sm font-bold text-emerald-600">
          {unitPrice === 0
            ? "Contact us"
            : formatPrice(subtotal, currency)}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDecrement}
            disabled={count <= min}
            className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-xs transition-all hover:border-[#F36F21] hover:text-[#F36F21] active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus size={15} strokeWidth={2.5} />
          </button>

          <span className="w-6 text-center text-base font-extrabold text-[#1E232A]">
            {count}
          </span>

          <button
            type="button"
            onClick={onIncrement}
            disabled={count >= max}
            className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-[#F36F21] text-white shadow-xs transition-all hover:bg-[#d95c12] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus size={15} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
