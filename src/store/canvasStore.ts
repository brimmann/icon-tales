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
  minScale: number | null;
  transformInit: boolean;
  setTextBoxes: (textBoxes: TextBoxEntity[]) => void;
  updateTextContent: () => void;
  updateTextBoxWidth: (width: number) => void;
  setTemporaryTextContent: (content: string) => void;
  setActiveTextBoxId: (id: UniqueIdentifier | null) => void;
  getActiveTextBox: () => TextBoxEntity | null;
  setIsEditing: (editing: boolean) => void;
  updateDragDnd: (delta: Coordinates) => void;
  setScale: (scale: number) => void;
  updateTextBoxStyle: (newStyle: TextBoxStyle) => void;
  setMinScale: (scale: number) => void;
  setTransformInit: (init: boolean) => void;
}

const initialTextBoxes: TextBoxEntity[] = [];

export const useCanvasStore = create<CanvasState>()(
  devtools(
    immer((set, get) => ({
      textBoxes: initialTextBoxes,
      temporaryTextContent: "",
      activeTextBoxId: null,
      isEditing: false,
      isDragging: false,
      scale: null,
      minScale: null,
      transformInit: false,
      setTextBoxes: (textBoxes: TextBoxEntity[]) =>
        set((state) => {
          state.textBoxes = textBoxes;
        }),
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
      updateTextBoxWidth: (width: number) =>
        set((state) => {
          const textBoxIndex = state.textBoxes.findIndex(
            (tb) => tb.id === state.activeTextBoxId
          );
          state.textBoxes[textBoxIndex].transform.width = width;
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
      setMinScale: (minScale: number) =>
        set((state) => {
          state.minScale = minScale;
        }),
      updateTextBoxStyle: (newStyle: TextBoxStyle) =>
        set((state) => {
          const textBoxIndex = state.textBoxes.findIndex(
            (tb) => tb.id === state.activeTextBoxId
          );
          state.textBoxes[textBoxIndex].style = { ...newStyle };
        }),
      setTransformInit: (init: boolean) =>
        set((state) => {
          state.transformInit = init;
        }),
    })),
    { name: "cavasStore" }
  )
);
