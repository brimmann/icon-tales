import {
  DndContext,
  PointerSensor,
  useSensor,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useCallback } from "react";
import { useCanvasStore } from "../../store/canvasStore";
import TextBoxDnd from "./TextBoxDnd";
import {
  createSnapModifier,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { scaleDragModifier } from "../../utils/scaleDragMoveDndKitModifier";

function CanvasDnd() {
  const updateDragDnd = useCanvasStore((state) => state.updateDragDnd);
  const updateTextContent = useCanvasStore((state) => state.updateTextContent);

  const snapToGrid = createSnapModifier(20);

  const textBoxes = useCanvasStore((state) => state.textBoxes);
  const setActiveTextBoxId = useCanvasStore(
    (state) => state.setActiveTextBoxId
  );
  const dragContorlSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

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
      modifiers={[restrictToParentElement, scaleDragModifier, snapToGrid]}
      sensors={[dragContorlSensor]}
      onDragStart={(e) => {
        updateTextContent();
        setActiveTextBoxId(e.active.id);
      }}
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
        {textBoxes.map((tb) => (
          <TextBoxDnd textBox={tb} key={tb.id} />
        ))}
      </div>
    </DndContext>
  );
}
export default CanvasDnd;
