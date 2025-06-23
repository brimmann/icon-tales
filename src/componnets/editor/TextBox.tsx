import { useEffect, useRef, useState } from "react";
import { useCanvasStore } from "../../store/canvasStore";
import type { NativeDragEvent } from "../../types";

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

  const mouseLastPosition = useRef({ x: 0, y: 0 });
  const textBoxRef = useRef<HTMLDivElement>(null);

  const getCoords = (e: NativeDragEvent): { x: number; y: number } => {
    if ("touches" in e) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    setTempContent(textBox.content);
  };

  const handleEditComplete = () => {
    updateTextContent(tempContent);
    setIsEditing(false);
  };

  useEffect(() => {
    const handleStartDrag = (e: NativeDragEvent) => {
      console.log("Event attached!");
      if (isEditing) return;
      e.preventDefault();
      const { x, y } = getCoords(e);
      mouseLastPosition.current = { x: x, y: y };
      startDrag(x, y);
    };

    if (!textBoxRef.current) return;

    textBoxRef.current.addEventListener("mousedown", handleStartDrag);
    textBoxRef.current.addEventListener("touchstart", handleStartDrag, {
      passive: false,
    });

    return () => {
      window.removeEventListener("mousedown", handleStartDrag);
      window.removeEventListener("touchstart", handleStartDrag);
    };
  }, [isEditing, startDrag]);

  useEffect(() => {
    if (!isDragging) return;

    let animationFrameId: number;

    const animationLoop = () => {
      updateDrag(mouseLastPosition.current.x, mouseLastPosition.current.y);
      animationFrameId = requestAnimationFrame(animationLoop);
    };

    const handleDragMove = (e: NativeDragEvent) => {
      mouseLastPosition.current = getCoords(e);
    };

    const handleDragEnd = () => {
      endDrag();
    };

    animationFrameId = requestAnimationFrame(animationLoop);

    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("touchmove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchend", handleDragEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);

      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, updateDrag, endDrag]);

  return (
    <div
      className={`absolute border-2 cursor-move select-none  ${
        isDragging
          ? "border-primary"
          : "border-transparent hover:border-base-300 transition-transform duration-150"
      }`}
      style={{
        width: textBox.transform.width,
        height: textBox.transform.height,
        transform: `translate(${textBox.transform.x}px, ${textBox.transform.y}px)`,
        willChange: "transform",
      }}
      onDoubleClick={handleDoubleClick}
      ref={textBoxRef}
    >
      {isEditing ? (
        <textarea
          value={tempContent}
          onChange={(e) => setTempContent(e.target.value)}
          onBlur={handleEditComplete}
          className="w-full h-full resize-none border-none outline-none"
        />
      ) : (
        <div>{textBox.content}</div>
      )}
    </div>
  );
}
export default TextBox;
