import { create } from "zustand";
import type { Tale, TaleCreateData } from "../types";
import { devtools } from "zustand/middleware";
import { taleStorageService } from "../services/talesService";

interface TalesState {
  tales: Tale[];
  createTale: (taleCreateData: TaleCreateData) => Tale;
}

export const useTaleStore = create<TalesState>()(
  devtools((set) => ({
    tales: [],
    createTale: (taleCreateData: TaleCreateData) => {
      const tale = taleStorageService.createProject(taleCreateData);
      set((state) => ({
        tales: [tale, ...state.tales],
      }));
      return tale;
    },
  }))
);
