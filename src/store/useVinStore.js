import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useVinStore = create(
  persist(
    (set, get) => ({
      history: [],
      currentVin: "",
      decodeResults: [],
      variables: [],
      isLoading: false,
      isLoadingVariables: false,
      error: null,

      decodeVin: async (vin) => {
        const cleanVin = vin.trim().toUpperCase();
        if (!cleanVin) return;

        set({ isLoading: true, error: null, currentVin: cleanVin });

        try {
          const response = await fetch(
            `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${cleanVin}?format=json`,
          );

          if (!response.ok) {
            throw new Error(`Помилка сервера: ${response.status}`);
          }

          const data = await response.json();

          if (data.Message) {
            set({ error: data.Message });
          }

          const filteredResults = (data.Results || []).filter(
            (item) =>
              item.Value !== null &&
              item.Value !== undefined &&
              item.Value.toString().trim() !== "",
          );

          set({ decodeResults: filteredResults });
          get().addToHistory(cleanVin);
        } catch (err) {
          set({
            error: err.message || "Сталася помилка при завантаженні даних",
          });
        } finally {
          set({ isLoading: false });
        }
      },

      fetchVariables: async () => {
        if (get().variables.length > 0) return;

        set({ isLoadingVariables: true, error: null });

        try {
          const response = await fetch(
            "https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json",
          );

          if (!response.ok) {
            throw new Error(
              `Помилка сервера при отриманні змінних: ${response.status}`,
            );
          }

          const data = await response.json();

          set({ variables: data.Results || [] });
        } catch (err) {
          set({
            error: err.message || "Не вдалося завантажити список змінних",
          });
        } finally {
          set({ isLoadingVariables: false });
        }
      },

      addToHistory: (vin) => {
        const currentHistory = get().history;
        const filteredHistory = currentHistory.filter((item) => item !== vin);
        const updatedHistory = [vin, ...filteredHistory].slice(0, 3);
        set({ history: updatedHistory });
      },

      clearCurrentResults: () => {
        set({ decodeResults: [], currentVin: "", error: null });
      },
    }),
    {
      name: "vin-decoder-storage",
      partialize: (state) => ({ history: state.history }),
    },
  ),
);
