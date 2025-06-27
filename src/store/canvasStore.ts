import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { DragStartPoint, TextBoxEntity } from "../types";
import { devtools } from "zustand/middleware";
import type { Coordinates } from "@dnd-kit/core/dist/types";

interface CanvasState {
  textBox: TextBoxEntity;
  isEditing: boolean;
  isDragging: boolean;
  dragStartPoint: DragStartPoint | null;
  scale: number | null;
  updateTextContent: (content: string) => void;
  setIsEditing: (editing: boolean) => void;
  startDrag: (clientX: number, clientY: number) => void;
  updateDrag: (clientX: number, clientY: number) => void;
  updateDragDnd: (delta: Coordinates) => void;
  endDrag: () => void;
  setScale: (scale: number) => void;
}

export const useCanvasStore = create<CanvasState>()(
  devtools(
    immer((set) => ({
      textBox: {
        id: 1,
        content: "Click to edit text.",
        transform: {
          x: 0,
          y: 0,
          width: 200,
          height: 60,
        },
      },
      isEditing: false,
      isDragging: false,
      dragStartPoint: null,
      scale: null,
      updateTextContent: (contnet: string) =>
        set((state) => {
          state.textBox.content = contnet;
        }),
      setIsEditing: (editing: boolean) =>
        set((state) => {
          state.isEditing = editing;
        }),
      startDrag: (clientX: number, clientY: number) =>
        set((state) => {
          state.isDragging = true;
          state.dragStartPoint = {
            x: clientX - state.textBox.transform.x,
            y: clientY - state.textBox.transform.y,
          };
        }),
      updateDragDnd: (delta: Coordinates) =>
        set((state) => {
          state.textBox.transform.x += delta.x;
          state.textBox.transform.y += delta.y;
        }),
      updateDrag: (clientX: number, clientY: number) =>
        set((state) => {
          if (state.isDragging && state.dragStartPoint) {
            state.textBox.transform.x = clientX - state.dragStartPoint.x;
            state.textBox.transform.y = clientY - state.dragStartPoint.y;
          }
        }),
      endDrag: () =>
        set((state) => {
          state.isDragging = false;
          state.dragStartPoint = null;
        }),
      setScale: (scale: number) =>
        set((state) => {
          state.scale = scale;
        }),
    })),
    { name: "cavasStore" }
  )
);
