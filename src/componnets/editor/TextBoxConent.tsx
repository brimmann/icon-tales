import { useRef, useEffect } from "react";
import { useCanvasStore } from "../../store/canvasStore";
import type { TextBoxEntity } from "../../types";
import { type MouseEvent as ReactMouseEvent } from "react";

interface TextBoxConentProps {
  textBox: TextBoxEntity;
}
function TextBoxContent({ textBox }: TextBoxConentProps) {
  // const updateTextContent = useCanvasStore((state) => state.updateTextContent);
  const setIsEditing = useCanvasStore((state) => state.setIsEditing);
  const isEditing = useCanvasStore((state) => state.isEditing);
  const activeTextBoxId = useCanvasStore((state) => state.activeTextBoxId);

  const setTemporaryTextContent = useCanvasStore(
    (state) => state.setTemporaryTextContent
  );
  const setActiveTextBoxId = useCanvasStore(
    (state) => state.setActiveTextBoxId
  );

  const editableDivRef = useRef<HTMLDivElement>(null);

  // const handleOnBlure = (e: FocusEvent<HTMLDivElement>) => {
  //   console.log("handleOnBlure");
  //   updateTextContent(e.currentTarget.innerText);
  //   setActiveTextBoxId(null);
  //   setIsEditing(false);
  // };

  const handleDoubleClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    console.log("Double click called");
    setActiveTextBoxId(textBox.id);
    setIsEditing(true);
    setTemporaryTextContent(e.currentTarget.innerText);
  };

  useEffect(() => {
    const element = editableDivRef.current;
    if (element && activeTextBoxId === textBox.id) {
      element.focus();
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(element);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [isEditing]);
  return (
    <div
      ref={editableDivRef}
      contentEditable={isEditing && activeTextBoxId === textBox.id}
      suppressContentEditableWarning={true}
      style={{ ...textBox.style }}
      // onBlur={handleOnBlure}
      onInput={(e) => {
        console.log("onChange");
        setTemporaryTextContent(e.currentTarget.innerText);
      }}
      className="border-none outline-none"
      onDoubleClick={handleDoubleClick}
    >
      {textBox.content}
    </div>
  );
}

export default TextBoxContent;
