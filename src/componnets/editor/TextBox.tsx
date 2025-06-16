import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
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

  const mouseLastPosition = useRef({ x: 0, y: 0 });

  const handleDoubleClick = () => {
    console.log("double click");
    setIsEditing(true);
    setTempContent(textBox.content);
  };

  const handleMouseDown = (e: ReactMouseEvent) => {
    if (isEditing) return;
    e.preventDefault();
    mouseLastPosition.current = { x: e.clientX, y: e.clientY };
    startDrag(e.clientX, e.clientY);
  };

  const handleEditComplete = () => {
    updateTextContent(tempContent);
    setIsEditing(false);
  };

  useEffect(() => {
    if (!isDragging) return;

    let animationFrameId: number;

    const animationLoop = () => {
      updateDrag(mouseLastPosition.current.x, mouseLastPosition.current.y);
      animationFrameId = requestAnimationFrame(animationLoop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseLastPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      endDrag();
    };

    animationFrameId = requestAnimationFrame(animationLoop);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
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
        width: textBox.transform.width,
        height: textBox.transform.height,
        transform: `translate(${textBox.transform.x}px, ${textBox.transform.y}px)`,
        willChange: "transform",
      }}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
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
