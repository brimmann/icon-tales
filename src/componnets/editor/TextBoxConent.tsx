import { type FocusEvent } from "react";
import { useCanvasStore } from "../../store/canvasStore";

function TextBoxContent() {
  const textBox = useCanvasStore((state) => state.textBox);
  const updateTextContent = useCanvasStore((state) => state.updateTextContent);
  const setIsEditing = useCanvasStore((state) => state.setIsEditing);
  const isEditing = useCanvasStore((state) => state.isEditing);

  const handleOnBlure = (e: FocusEvent<HTMLDivElement>) => {
    updateTextContent(e.currentTarget.innerText);
    setIsEditing(false);
  };

  return (
    <div
      contentEditable={isEditing}
      suppressContentEditableWarning={true}
      style={{ ...textBox.style }}
      onBlur={handleOnBlure}
    >
      {textBox.content}
    </div>
  );
}

export default TextBoxContent;
