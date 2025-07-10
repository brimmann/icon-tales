import { create } from "zustand";
import type { TaleCreateData } from "../types";
import { devtools } from "zustand/middleware";

interface TalesState {
  createTale: (taleCreateData: TaleCreateData) => Promise<void>;
}

export const useTaleStore = create<TalesState>()(
  devtools(
    () => ({
      // TODO: Tales shouldn't be created from here.
      // createTale: async (taleCreateData: TaleCreateData) => {
      //   const tale = await taleStorageService.createTale(taleCreateData);
      //   const curretnTales = get().tales;
      //   set({
      //     tales: [tale, ...curretnTales],
      //   });
      // },
    }),
    { name: "talesStore" }
  )
);
