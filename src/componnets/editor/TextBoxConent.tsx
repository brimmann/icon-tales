import { useRef, useEffect, useState } from "react";
import { useCanvasStore } from "../../store/canvasStore";
import type { TextBoxEntity } from "../../types";
import { type MouseEvent as ReactMouseEvent } from "react";
import { Resizable } from "react-resizable";

interface TextBoxConentProps {
  textBox: TextBoxEntity;
}
function TextBoxContent({ textBox }: TextBoxConentProps) {
  // const updateTextContent = useCanvasStore((state) => state.updateTextContent);
  const setIsEditing = useCanvasStore((state) => state.setIsEditing);
  const isEditing = useCanvasStore((state) => state.isEditing);
  const activeTextBoxId = useCanvasStore((state) => state.activeTextBoxId);
  const updateTextBoxWidth = useCanvasStore(
    (state) => state.updateTextBoxWidth
  );

  const [localWidth, setLocalWidth] = useState<number>(textBox.transform.width);

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

  // useEffect(() => {
  //   setLocalWidth(textBox.transform.width);
  // }, []);

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
    <Resizable
      width={localWidth}
      axis="x"
      handleSize={[12, 12]}
      resizeHandles={["e"]}
      height={textBox.transform.height}
      onResizeStop={(_, { size }) => {
        updateTextBoxWidth(size.width);
        setLocalWidth(size.width);
      }}
      onResize={(_, { size }) => {
        setLocalWidth(size.width);
      }}
      handle={
        <div
          className={`${
            isEditing && textBox.id === activeTextBoxId ? "" : "hidden"
          } absolute  top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-primary cursor-ew-resize`}
        />
      }
    >
      <div>
        <div
          ref={editableDivRef}
          contentEditable={isEditing && activeTextBoxId === textBox.id}
          suppressContentEditableWarning={true}
          style={{ ...textBox.style, width: localWidth }}
          // onBlur={handleOnBlure}
          onInput={(e) => {
            console.log("onChange");
            setTemporaryTextContent(e.currentTarget.innerText);
          }}
          className="box border-none outline-none"
          onDoubleClick={handleDoubleClick}
        >
          {textBox.content}
        </div>
      </div>
    </Resizable>
  );
}

export default TextBoxContent;
