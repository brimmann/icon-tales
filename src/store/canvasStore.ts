import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { TextBoxEntity, TextBoxStyle } from "../types";
import { devtools } from "zustand/middleware";
import type { Coordinates, UniqueIdentifier } from "@dnd-kit/core/dist/types";

interface CanvasState {
  textBoxes: TextBoxEntity[];
  temporaryTextContent: string;
  activeTextBoxId: UniqueIdentifier | null;
  isEditing: boolean;
  isDragging: boolean;
  scale: number | null;
  updateTextContent: () => void;
  setTemporaryTextContent: (content: string) => void;
  setActiveTextBoxId: (id: UniqueIdentifier | null) => void;
  getActiveTextBox: () => TextBoxEntity | null;
  setIsEditing: (editing: boolean) => void;
  updateDragDnd: (delta: Coordinates) => void;
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
      temporaryTextContent: "",
      activeTextBoxId: null,
      isEditing: false,
      isDragging: false,
      scale: null,
      updateTextContent: () =>
        set((state) => {
          if (!state.isEditing) return;
          const content = state.temporaryTextContent;
          const textBoxIndex = state.textBoxes.findIndex(
            (tb) => tb.id === state.activeTextBoxId
          );
          state.textBoxes[textBoxIndex].content = content;
          state.isEditing = false;
          state.temporaryTextContent = "";
        }),
      setTemporaryTextContent: (content: string) =>
        set((state) => {
          state.temporaryTextContent = content;
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
      updateDragDnd: (delta: Coordinates) =>
        set((state) => {
          const textBoxIndex = state.textBoxes.findIndex(
            (tb) => tb.id === state.activeTextBoxId
          );
          state.textBoxes[textBoxIndex].transform.x += delta.x;
          state.textBoxes[textBoxIndex].transform.y += delta.y;
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
