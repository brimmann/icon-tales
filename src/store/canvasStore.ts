import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { DragStartPoint, TextBoxEntity, TextBoxStyle } from "../types";
import { devtools } from "zustand/middleware";
import type { Coordinates, UniqueIdentifier } from "@dnd-kit/core/dist/types";

interface CanvasState {
  textBoxes: TextBoxEntity[];
  textBox: TextBoxEntity;
  activeTextBoxId: UniqueIdentifier | null;
  isEditing: boolean;
  isDragging: boolean;
  dragStartPoint: DragStartPoint | null;
  scale: number | null;
  updateTextContent: (content: string) => void;
  setActiveTextBoxId: (id: UniqueIdentifier | null) => void;
  getActiveTextBox: () => TextBoxEntity | null;
  setIsEditing: (editing: boolean) => void;
  startDrag: (clientX: number, clientY: number) => void;
  updateDrag: (clientX: number, clientY: number) => void;
  updateDragDnd: (delta: Coordinates) => void;
  endDrag: () => void;
  setScale: (scale: number) => void;
  updateTextBoxStyle: (newStyle: TextBoxStyle) => void;
}

const initialTextBoxes: TextBoxEntity[] = [
  {
    id: 1,
    content: "Click to edit text 1.",
    transform: {
      x: 0,
      y: 0,
      width: 200,
      height: 60,
    },
    style: {
      fontSize: 16,
      fontWeight: "bold",
      fontStyle: "normal",
      textAlign: "left",
      color: "#333333",
    },
  },
  {
    id: 2,
    content: "Click to edit text 2.",
    transform: {
      x: 300,
      y: 200,
      width: 200,
      height: 60,
    },
    style: {
      fontSize: 16,
      fontWeight: "bold",
      fontStyle: "normal",
      textAlign: "left",
      color: "#333333",
    },
  },
];

export const useCanvasStore = create<CanvasState>()(
  devtools(
    immer((set, get) => ({
      textBoxes: initialTextBoxes,
      textBox: {
        id: 1,
        content: "Click to edit text.",
        transform: {
          x: 0,
          y: 0,
          width: 200,
          height: 60,
        },
        style: {
          fontSize: 16,
          fontWeight: "bold",
          fontStyle: "normal",
          textAlign: "left",
          color: "#333333",
        },
      },
      activeTextBoxId: null,
      isEditing: false,
      isDragging: false,
      dragStartPoint: null,
      scale: null,
      updateTextContent: (contnet: string) =>
        set((state) => {
          const textBoxIndex = state.textBoxes.findIndex(
            (tb) => tb.id === state.activeTextBoxId
          );
          state.textBoxes[textBoxIndex].content = contnet;
        }),
      setActiveTextBoxId: (id: UniqueIdentifier | null) =>
        set((state) => {
          state.activeTextBoxId = id;
        }),
      getActiveTextBox: () => {
        const textBox = get().textBoxes.find(
          (tb) => tb.id === get().activeTextBoxId
        );
        return textBox || null;
      },
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
          const textBoxIndex = state.textBoxes.findIndex(
            (tb) => tb.id === state.activeTextBoxId
          );
          state.textBoxes[textBoxIndex].transform.x += delta.x;
          state.textBoxes[textBoxIndex].transform.y += delta.y;
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
      updateTextBoxStyle: (newStyle: TextBoxStyle) =>
        set((state) => {
          const textBoxIndex = state.textBoxes.findIndex(
            (tb) => tb.id === state.activeTextBoxId
          );
          state.textBoxes[textBoxIndex].style = { ...newStyle };
        }),
    })),
    { name: "cavasStore" }
  )
);
