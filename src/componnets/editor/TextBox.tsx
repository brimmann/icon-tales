import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import { useCanvasStore } from "../../store/canvasStore";

function TextBox() {
  const isEditing = useCanvasStore((state) => state.isEditing);
  const isDragging = useCanvasStore((state) => state.isDragging);

  const textBox = useCanvasStore((state) => state.textBox);

  const updateTextContent = useCanvasStore((state) => state.updateTextContent);
  const setIsEditing = useCanvasStore((state) => state.setIsEditing);
  const startDrag = useCanvasStore((state) => state.startDrag);
  const updateDrag = useCanvasStore((state) => state.updateDrag);
  const endDrag = useCanvasStore((state) => state.endDrag);

  const [tempContent, setTempContent] = useState(textBox.content);

  const handleDoubleClick = () => {
    console.log("double click");
    setIsEditing(true);
    setTempContent(textBox.content);
  };

  const handleMouseDown = (e: ReactMouseEvent) => {
    if (isEditing) return;
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  };

  const handleEditComplete = () => {
    updateTextContent(tempContent);
    setIsEditing(false);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      updateDrag(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      endDrag();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, updateDrag, endDrag]);

  return (
    <div
      className={`absolute border-2 cursor-move select-none  ${
        isDragging
          ? "border-primary shadow-lg scale-105"
          : "border-transparent hover:border-base-300"
      }`}
      style={{
        left: textBox.transform.x,
        top: textBox.transform.y,
        width: textBox.transform.width,
        height: textBox.transform.height,
      }}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
    >
      {isEditing ? (
        <textarea
          value={tempContent}
          onChange={(e) => setTempContent(e.target.value)}
          onBlur={handleEditComplete}
          className="w-full h-full resize-none border-none outline-none p-2"
        />
      ) : (
        <div>{textBox.content}</div>
      )}
    </div>
  );
}
export default TextBox;
