import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useCallback } from "react";
import { useCanvasStore } from "../../store/canvasStore";
import TextBoxDnd from "./TextBoxDnd";
import { restrictToParent } from "../../utils/dnd-custom-modifiers";

function CanvasDnd() {
  const updateDragDnd = useCanvasStore((state) => state.updateDragDnd);
  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      const { delta } = e;
      updateDragDnd(delta);
    },
    [updateDragDnd]
  );

  return (
    <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToParent]}>
      <div className="relative w-full h-full">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
            backgroundSize: "20px 20px",
          }}
        />
        <TextBoxDnd />
      </div>
    </DndContext>
  );
}
export default CanvasDnd;
