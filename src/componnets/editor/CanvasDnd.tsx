import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useCallback } from "react";
import { useCanvasStore } from "../../store/canvasStore";
import TextBoxDnd from "./TextBoxDnd";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { scaleDragModifier } from "../../utils/scaleDragMoveDndKitModifier";

function CanvasDnd() {
  const updateDragDnd = useCanvasStore((state) => state.updateDragDnd);

  const handleDragEnd = useCallback(
    (e: DragEndEvent) => {
      const { delta } = e;
      updateDragDnd({ x: delta.x, y: delta.y });
    },
    [updateDragDnd]
  );

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement, scaleDragModifier]}
    >
      <div
        className="relative w-full h-full "
        style={{
          width: "1200px",
          height: "675px",
          minWidth: "1200px",
          minHeight: "675px",
        }}
      >
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
