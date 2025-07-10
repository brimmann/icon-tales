import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SlideState {
  activeSlideId: number | null;
  setActiveSlideId: (id: number | null) => void;
}

export const useSlideStore = create<SlideState>()(
  devtools(
    (set) => ({
      activeSlideId: null,
      setActiveSlideId: (id: number | null) => {
        set({ activeSlideId: id });
      },
    }),
    { name: "slideStore" }
  )
);
