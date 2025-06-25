import { useEffect, useRef } from "react";
import { useCanvasStore } from "../../store/canvasStore";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function TextBoxDnd() {
  const textBox = useCanvasStore((state) => state.textBox);
  const isEditing = useCanvasStore((state) => state.isEditing);
  const updateTextContent = useCanvasStore((state) => state.updateTextContent);
  const setIsEditing = useCanvasStore((state) => state.setIsEditing);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // We can disable features we don't need to keep it light
        heading: false,
        strike: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
        history: false, // Important for stability with external state
        dropcursor: false,
      }),
    ],
    content: textBox.content,
    onBlur: ({ editor }) => {
      updateTextContent(editor.getHTML());
      setIsEditing(false);
    },
  });

  const { attributes, listeners, transform, setNodeRef, isDragging } =
    useDraggable({
      id: textBox.id,
      disabled: isEditing,
    });

  const textBoxRef = useRef<HTMLDivElement>(null);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (!editor) return;

    editor.setEditable(isEditing);
  }, [isEditing, editor]);

  return (
    <div
      className={`absolute cursor-move select-none touch-none  ${
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
      <EditorContent editor={editor} />
    </div>
  );
}
export default TextBoxDnd;
