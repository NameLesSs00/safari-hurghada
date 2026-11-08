import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Trip } from '@/src/features/tours/types/trip';
import type { BookingResponseData } from '@/src/features/checkout/api/create-booking';

export interface CartItem {
  id: string; // unique string e.g. `${trip.id}-${date}`
  trip: Trip;
  date: string;
  adultCount: number;
  childCount: number;
}

interface CartStore {
  items: CartItem[];
  lastBooking: BookingResponseData | null;
  setLastBooking: (booking: BookingResponseData | null) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      lastBooking: null,
      
      setLastBooking: (booking) => {
        set({ lastBooking: booking });
      },

      addItem: (newItem) => {
        set((state) => {
          // If the exact same trip+date exists, we could just update the quantities.
          // Or just add it as a new line item if we make the IDs truly unique (e.g. uuid).
          // For now, if the same item ID exists, replace it, otherwise append.
          const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
          
          if (existingItemIndex !== -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              adultCount: updatedItems[existingItemIndex].adultCount + newItem.adultCount,
              childCount: updatedItems[existingItemIndex].childCount + newItem.childCount,
            };
            return { items: updatedItems };
          }
          
          return { items: [...state.items, newItem] };
        });
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },

      getCartTotal: () => {
        return get().items.reduce((total, item) => {
          const adultTotal = item.adultCount * item.trip.adultPrice;
          const childTotal = item.childCount * item.trip.childPrice;
          return total + adultTotal + childTotal;
        }, 0);
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);
