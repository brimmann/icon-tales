import React, { useRef, useState, useEffect } from "react";

// Main App Component
export default function App() {
  // Ref to access the contentEditable div directly
  const editorRef = useRef(null);
  // State to control the editable status of the div
  const [isEditable, setIsEditable] = useState(false);

  const initialHtml = `You can edit this text.`;

  // This effect runs when `isEditable` changes.
  // If it becomes true, we focus the editor to allow immediate typing.
  useEffect(() => {
    if (isEditable && editorRef.current) {
      editorRef.current.focus();
    }
  }, [isEditable]);

  return (
    <div className="bg-gray-100 text-gray-800 flex items-center justify-center min-h-screen p-4 font-sans">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Simple Editable Div
        </h1>
        <p className="text-gray-600 mb-6">
          Double-click the box below to start editing. Click outside to finish.
        </p>

        {/* Editor Area */}
        <div
          id="editor"
          ref={editorRef}
          contentEditable={isEditable}
          onDoubleClick={() => setIsEditable(true)}
          onBlur={() => setIsEditable(false)}
          suppressContentEditableWarning={true} // Necessary for React
          className={`border-2 rounded-lg p-4 min-h-[100px] transition-all duration-200 ${
            isEditable
              ? "border-indigo-500 ring-2 ring-indigo-400 bg-gray-50"
              : "border-gray-300 bg-white cursor-pointer"
          }`}
          dangerouslySetInnerHTML={{ __html: initialHtml }}
        ></div>

        <div className="mt-6 text-center text-sm text-gray-500">
          {isEditable ? "Editing mode is ON." : "Double-click the box to edit."}
        </div>
      </div>
    </div>
  );
}
