import { type FocusEvent, useRef, useEffect } from "react";
import { useCanvasStore } from "../../store/canvasStore";
import type { TextBoxEntity } from "../../types";

interface TextBoxConentProps {
  textBox: TextBoxEntity;
}

function TextBoxContent({ textBox }: TextBoxConentProps) {
  const updateTextContent = useCanvasStore((state) => state.updateTextContent);
  const setIsEditing = useCanvasStore((state) => state.setIsEditing);
  const isEditing = useCanvasStore((state) => state.isEditing);
  const activeTextBoxId = useCanvasStore((state) => state.activeTextBoxId);
  const setActiveTextBoxId = useCanvasStore(
    (state) => state.setActiveTextBoxId
  );

  const editableDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing && activeTextBoxId === textBox.id && editableDivRef.current) {
      editableDivRef.current.focus();
    }
  }, [isEditing, activeTextBoxId, textBox.id]);

  const handleOnBlure = (e: FocusEvent<HTMLDivElement>) => {
    updateTextContent(e.currentTarget.innerText);
    console.log("Blured");
    setActiveTextBoxId(null);
    setIsEditing(false);
  };

  return (
    <div
      ref={editableDivRef}
      contentEditable={isEditing && activeTextBoxId === textBox.id}
      suppressContentEditableWarning={true}
      style={{ ...textBox.style }}
      onBlur={handleOnBlure}
      className="border-none outline-none"
    >
      {textBox.content}
    </div>
  );
}

export default TextBoxContent;
