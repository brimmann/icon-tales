import { create } from "zustand";
import type { Tale } from "../types";
import { devtools } from "zustand/middleware";
import { taleStorageService } from "../services/talesService";

interface DataStoreState {
  talesMetaData: Omit<Tale, "slides">[];
  activeTale: Tale | null;
  loadTalesMetaData: () => Promise<void>;
  getTaleById: (id: number) => Promise<void>;
}

export const useDataStore = create<DataStoreState>()(
  devtools(
    (set) => ({
      talesMetaData: [],
      activeTale: null,
      loadTalesMetaData: async () => {
        const talesMetaData = await taleStorageService.loadTalesMetadata();
        set({ talesMetaData });
      },
      getTaleById: async (id: number) => {
        const tale = await taleStorageService.getTaleById(id);

        set({ activeTale: tale });
      },
    }),
    { name: "dataStore" }
  )
);
