import { useRef } from "react";
import { useCanvasStore } from "../../store/canvasStore";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import TextBoxContent from "./TextBoxConent";
import type { TextBoxEntity } from "../../types";

interface TextBoxDndProps {
  textBox: TextBoxEntity;
}

function TextBoxDnd({ textBox }: TextBoxDndProps) {
  const isEditing = useCanvasStore((state) => state.isEditing);
  const activeTextBoxId = useCanvasStore((state) => state.activeTextBoxId);
  const updateTextContent = useCanvasStore((state) => state.updateTextContent);

  const setActiveTextBoxId = useCanvasStore(
    (state) => state.setActiveTextBoxId
  );

  const { attributes, listeners, transform, setNodeRef, isDragging } =
    useDraggable({
      id: textBox.id,
      // disabled: isEditing,
    });

  const textBoxRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`absolute cursor-move select-none touch-none text-box  ${
        isEditing ? "" : ""
      } ${isDragging ? "" : ""} ${!isEditing && !isDragging ? "" : ""} ${
        activeTextBoxId === textBox.id
          ? "border-2 border-primary"
          : "hover:scale-105 hover:border hover:border-accent"
      }`}
      style={{
        width: textBox.transform.width,
        left: textBox.transform.x,
        top: textBox.transform.y,
        transform: CSS.Translate.toString(transform),
        willChange: "transform",
        resize:
          isEditing && activeTextBoxId === textBox.id ? "horizontal" : "none",
        overflow: "auto",
      }}
      ref={(node) => {
        setNodeRef(node);
        textBoxRef.current = node;
      }}
      onClick={() => {
        console.log("single click called");
        if (textBox.id && textBox.id === activeTextBoxId) return;
        updateTextContent();
        setActiveTextBoxId(textBox.id);
      }}
      {...attributes}
      {...listeners}
    >
      <TextBoxContent textBox={textBox} />
    </div>
  );
}
export default TextBoxDnd;
