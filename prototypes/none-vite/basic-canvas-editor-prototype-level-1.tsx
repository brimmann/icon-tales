/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React, { useState, useRef, useCallback } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Types - Core data structures for our canvas app
interface TextStyle {
  fontSize: number;
  fontWeight: "normal" | "bold";
  fontStyle: "normal" | "italic";
  textAlign: "left" | "center" | "right";
  color: string;
}

interface Transform {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface TextBoxEntity {
  id: string;
  content: string;
  transform: Transform;
  style: TextStyle;
}

interface CanvasState {
  textBox: TextBoxEntity;
  isEditing: boolean;
  isDragging: boolean;
  dragStart: { x: number; y: number } | null;
}

// Zustand Store - ECS-inspired pattern for state management
const useCanvasStore = create<CanvasState>()(
  immer((set) => ({
    // Initial state with a single text box
    textBox: {
      id: "textbox-1",
      content: "Click to edit text",
      transform: { x: 200, y: 150, width: 200, height: 60 },
      style: {
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        textAlign: "left",
        color: "#000000",
      },
    },
    isEditing: false,
    isDragging: false,
    dragStart: null,

    // Actions
    updateTextContent: (content: string) =>
      set((state) => {
        state.textBox.content = content;
      }),

    updateTextStyle: (styleUpdate: Partial<TextStyle>) =>
      set((state) => {
        Object.assign(state.textBox.style, styleUpdate);
      }),

    updateTransform: (transformUpdate: Partial<Transform>) =>
      set((state) => {
        Object.assign(state.textBox.transform, transformUpdate);
      }),

    setEditing: (editing: boolean) =>
      set((state) => {
        state.isEditing = editing;
      }),

    startDrag: (clientX: number, clientY: number) =>
      set((state) => {
        state.isDragging = true;
        state.dragStart = {
          x: clientX - state.textBox.transform.x,
          y: clientY - state.textBox.transform.y,
        };
      }),

    updateDrag: (clientX: number, clientY: number) =>
      set((state) => {
        if (state.isDragging && state.dragStart) {
          state.textBox.transform.x = clientX - state.dragStart.x;
          state.textBox.transform.y = clientY - state.dragStart.y;
        }
      }),

    endDrag: () =>
      set((state) => {
        state.isDragging = false;
        state.dragStart = null;
      }),
  }))
);

// Toolbar Component - Controls for text formatting
const Toolbar: React.FC = () => {
  const { textBox, updateTextStyle } = useCanvasStore();

  return (
    <div className="bg-base-200 p-4 border-b border-base-300 flex items-center gap-4">
      <h2 className="text-lg font-semibold">Canvas Editor - Basic Level</h2>

      <div className="divider divider-horizontal"></div>

      {/* Font Size Control */}
      <div className="flex items-center gap-2">
        <label className="text-sm">Size:</label>
        <input
          type="range"
          min="12"
          max="48"
          value={textBox.style.fontSize}
          onChange={(e) =>
            updateTextStyle({ fontSize: parseInt(e.target.value) })
          }
          className="range range-xs range-primary w-20"
        />
        <span className="text-sm w-8">{textBox.style.fontSize}</span>
      </div>

      {/* Text Style Toggles */}
      <button
        className={`btn btn-sm ${
          textBox.style.fontWeight === "bold" ? "btn-primary" : "btn-outline"
        }`}
        onClick={() =>
          updateTextStyle({
            fontWeight: textBox.style.fontWeight === "bold" ? "normal" : "bold",
          })
        }
      >
        <strong>B</strong>
      </button>

      <button
        className={`btn btn-sm ${
          textBox.style.fontStyle === "italic" ? "btn-primary" : "btn-outline"
        }`}
        onClick={() =>
          updateTextStyle({
            fontStyle:
              textBox.style.fontStyle === "italic" ? "normal" : "italic",
          })
        }
      >
        <em>I</em>
      </button>

      {/* Text Alignment */}
      <div className="flex gap-1">
        {(["left", "center", "right"] as const).map((align) => (
          <button
            key={align}
            className={`btn btn-xs ${
              textBox.style.textAlign === align ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => updateTextStyle({ textAlign: align })}
          >
            {align.charAt(0).toUpperCase()}
          </button>
        ))}
      </div>

      {/* Color Picker */}
      <div className="flex items-center gap-2">
        <label className="text-sm">Color:</label>
        <input
          type="color"
          value={textBox.style.color}
          onChange={(e) => updateTextStyle({ color: e.target.value })}
          className="w-8 h-8 rounded border border-base-300"
        />
      </div>
    </div>
  );
};

// TextBox Component - The draggable, editable text element
const TextBox: React.FC = () => {
  const {
    textBox,
    isEditing,
    isDragging,
    updateTextContent,
    setEditing,
    startDrag,
    updateDrag,
    endDrag,
  } = useCanvasStore();

  const [tempContent, setTempContent] = useState(textBox.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle double-click to enter edit mode
  const handleDoubleClick = useCallback(() => {
    setEditing(true);
    setTempContent(textBox.content);
    // Focus textarea on next tick
    setTimeout(() => textareaRef.current?.focus(), 0);
  }, [textBox.content, setEditing]);

  // Handle drag start
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isEditing) return; // Don't drag while editing

      e.preventDefault();
      startDrag(e.clientX, e.clientY);
    },
    [isEditing, startDrag]
  );

  // Handle text editing completion
  const handleEditComplete = useCallback(() => {
    updateTextContent(tempContent);
    setEditing(false);
  }, [tempContent, updateTextContent, setEditing]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleEditComplete();
      } else if (e.key === "Escape") {
        setTempContent(textBox.content); // Reset content
        setEditing(false);
      }
    },
    [handleEditComplete, textBox.content, setEditing]
  );

  // Global mouse events for dragging - attached to window
  React.useEffect(() => {
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
      className={`absolute border-2 cursor-move select-none transition-all duration-150 ${
        isDragging
          ? "border-primary shadow-lg scale-105"
          : "border-transparent hover:border-base-300"
      }`}
      style={{
        left: textBox.transform.x,
        top: textBox.transform.y,
        width: textBox.transform.width,
        height: textBox.transform.height,
        transform: isDragging ? "rotate(1deg)" : "rotate(0deg)", // Subtle rotation when dragging
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        // Edit Mode - Textarea for text input
        <textarea
          ref={textareaRef}
          value={tempContent}
          onChange={(e) => setTempContent(e.target.value)}
          onBlur={handleEditComplete}
          onKeyDown={handleKeyDown}
          className="w-full h-full resize-none border-none outline-none bg-base-100 p-2"
          style={{
            fontSize: textBox.style.fontSize,
            fontWeight: textBox.style.fontWeight,
            fontStyle: textBox.style.fontStyle,
            textAlign: textBox.style.textAlign,
            color: textBox.style.color,
          }}
          placeholder="Enter text..."
        />
      ) : (
        // Display Mode - Styled text display
        <div
          className="w-full h-full p-2 flex items-center"
          style={{
            fontSize: textBox.style.fontSize,
            fontWeight: textBox.style.fontWeight,
            fontStyle: textBox.style.fontStyle,
            textAlign: textBox.style.textAlign,
            color: textBox.style.color,
          }}
        >
          {textBox.content || "Empty text box"}
        </div>
      )}

      {/* Drag Handle - Visual indicator */}
      {!isEditing && (
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-grab"></div>
      )}
    </div>
  );
};

// Canvas Component - The main workspace area
const Canvas: React.FC = () => {
  const { isEditing, setEditing } = useCanvasStore();

  // Click outside to exit edit mode
  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      // Only handle clicks on the canvas itself, not child elements
      if (e.target === e.currentTarget && isEditing) {
        setEditing(false);
      }
    },
    [isEditing, setEditing]
  );

  return (
    <div
      className="flex-1 bg-base-100 relative overflow-hidden"
      onClick={handleCanvasClick}
      style={{ cursor: isEditing ? "text" : "default" }}
    >
      {/* Grid Background - Visual helper */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Instructions */}
      <div className="absolute top-4 left-4 text-sm text-base-content/60">
        <p>• Double-click to edit text</p>
        <p>• Drag to move</p>
        <p>• Use toolbar to style</p>
      </div>

      {/* The Text Box */}
      <TextBox />

      {/* Canvas Info - Shows current state for learning */}
      <div className="absolute bottom-4 right-4 bg-base-200 p-3 rounded-lg text-xs">
        <div>
          Position: ({Math.round(useCanvasStore().textBox.transform.x)},{" "}
          {Math.round(useCanvasStore().textBox.transform.y)})
        </div>
        <div>Editing: {isEditing ? "Yes" : "No"}</div>
        <div>Dragging: {useCanvasStore().isDragging ? "Yes" : "No"}</div>
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-base-100">
      <Toolbar />
      <Canvas />

      {/* Footer with Learning Notes */}
      <div className="bg-base-300 p-2 text-xs text-center">
        <strong>Learning Focus:</strong> DOM-based positioning, Zustand ECS
        pattern, Event handling, CSS transforms
      </div>
    </div>
  );
};

export default App;
