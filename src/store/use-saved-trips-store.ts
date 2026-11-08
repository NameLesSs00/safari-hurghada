import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Trip } from '@/src/features/tours/types/trip';

interface SavedTripsStore {
  savedTripIds: number[];
  savedTrips: Trip[];
  toggleSaveTrip: (trip: Trip) => void;
  isTripSaved: (tripId: number) => boolean;
  removeSavedTrip: (tripId: number) => void;
  clearSavedTrips: () => void;
}

export const useSavedTripsStore = create<SavedTripsStore>()(
  persist(
    (set, get) => ({
      savedTripIds: [],
      savedTrips: [],

      toggleSaveTrip: (trip) => {
        const { savedTripIds, savedTrips } = get();
        const isSaved = savedTripIds.includes(trip.id);

        if (isSaved) {
          set({
            savedTripIds: savedTripIds.filter((id) => id !== trip.id),
            savedTrips: savedTrips.filter((t) => t.id !== trip.id),
          });
        } else {
          set({
            savedTripIds: [...savedTripIds, trip.id],
            savedTrips: [...savedTrips, trip],
          });
        }
      },

      isTripSaved: (tripId) => {
        return get().savedTripIds.includes(tripId);
      },

      removeSavedTrip: (tripId) => {
        set((state) => ({
          savedTripIds: state.savedTripIds.filter((id) => id !== tripId),
          savedTrips: state.savedTrips.filter((t) => t.id !== tripId),
        }));
      },

      clearSavedTrips: () => {
        set({ savedTripIds: [], savedTrips: [] });
      },
    }),
    {
      name: 'saved-trips-storage',
    }
  )
);

