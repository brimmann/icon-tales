import { create } from "zustand";
import type { Tale, TaleCreateData } from "../types";
import { devtools } from "zustand/middleware";
import { taleStorageService } from "../services/talesService";

interface TalesState {
  tales: Tale[];
  getTales: () => Promise<void>;
  createTale: (taleCreateData: TaleCreateData) => Promise<void>;
}

export const useTaleStore = create<TalesState>()(
  devtools(
    (set, get) => ({
      tales: [],
      getTales: async () => {
        const tales = await taleStorageService.getTales();
        set({ tales });
      },
      createTale: async (taleCreateData: TaleCreateData) => {
        const tale = await taleStorageService.createTale(taleCreateData);
        const curretnTales = get().tales;
        set({
          tales: [tale, ...curretnTales],
        });
      },
    }),
    { name: "talesStore" }
  )
);
