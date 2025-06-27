import type { Modifier } from "@dnd-kit/core";
import { useCanvasStore } from "../store/canvasStore";

export const scaleDragModifier: Modifier = ({ transform }) => {
  const scale = useCanvasStore.getState().scale;
  if (!scale) return { ...transform };
  return {
    ...transform,
    x: transform.x / scale,
    y: transform.y / scale,
  };
};
