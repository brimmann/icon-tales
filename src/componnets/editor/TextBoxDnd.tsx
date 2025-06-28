import { useRef } from "react";
import { useCanvasStore } from "../../store/canvasStore";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import TextBoxContent from "./TextBoxConent";

function TextBoxDnd() {
  const textBox = useCanvasStore((state) => state.textBox);
  const isEditing = useCanvasStore((state) => state.isEditing);

  const setIsEditing = useCanvasStore((state) => state.setIsEditing);

  const { attributes, listeners, transform, setNodeRef, isDragging } =
    useDraggable({
      id: textBox.id,
      disabled: isEditing,
    });

  const textBoxRef = useRef<HTMLDivElement>(null);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  return (
    <div
      className={`absolute cursor-move select-none touch-none text-box ${
        isEditing ? "border-2 border-base-300 hover:" : ""
      } ${isDragging ? "border border-accent" : ""} ${
        !isEditing && !isDragging ? "hover:border-2 hover:border-primary" : ""
      }`}
      style={{
        width: textBox.transform.width,
        left: textBox.transform.x,
        top: textBox.transform.y,
        transform: CSS.Translate.toString(transform),
        willChange: "transform",
        resize: isEditing ? "horizontal" : "none",
        overflow: "auto",
      }}
      onDoubleClick={handleDoubleClick}
      ref={(node) => {
        setNodeRef(node);
        textBoxRef.current = node;
      }}
      {...attributes}
      {...listeners}
    >
      <TextBoxContent />
    </div>
  );
}
export default TextBoxDnd;
