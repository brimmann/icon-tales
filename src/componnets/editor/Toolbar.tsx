import React, { useState, type CSSProperties } from "react";

// --- Type Definitions for TypeScript ---
// Defines the structure for the text style properties.
// Using CSSProperties allows for any valid CSS property while still
// getting type safety for the ones we define explicitly.
interface TextStyle extends CSSProperties {
  fontSize: number;
  fontWeight: "normal" | "bold";
  fontStyle: "normal" | "italic";
  textAlign: "left" | "center" | "right";
  color: string;
}

// Defines the structure for the text box object.
interface TextBox {
  style: TextStyle;
}

// --- Toolbar Component (Standalone) ---
// This component now manages its own state internally, making it
// a self-contained unit. It no longer requires props to be passed in.
const Toolbar: React.FC = () => {
  // --- Internal State Management ---
  // The state for the textbox styles is now managed directly within the Toolbar
  // using the `useState` hook.
  const [textBox, setTextBox] = useState<TextBox>({
    style: {
      fontSize: 16,
      fontWeight: "normal",
      fontStyle: "normal",
      textAlign: "left",
      color: "#333333",
    },
  });

  // This function updates the text style. It merges the new style
  // with the existing one, allowing for partial updates (e.g., changing
  // only the font size without affecting the color).
  const updateTextStyle = (newStyle: Partial<TextStyle>) => {
    setTextBox((prev) => ({
      ...prev,
      style: {
        ...prev.style,
        ...newStyle,
      },
    }));
  };

  return (
    <div className="bg-white p-3 border-b border-gray-200 shadow-sm flex items-center gap-4 flex-nowrap overflow-x-auto">
      {/* Font Size Control */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-600">Size</label>
        <input
          type="range"
          min="12"
          max="72"
          value={textBox.style.fontSize}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateTextStyle({ fontSize: parseInt(e.target.value, 10) })
          }
          className="w-24 accent-blue-600"
        />
        <span className="text-sm text-gray-800 w-8 text-center font-mono bg-gray-100 rounded-md py-1">
          {textBox.style.fontSize}
        </span>
      </div>

      {/* Text Style Toggles */}
      <div className="flex items-center gap-2">
        <button
          title="Bold"
          className={`px-3 py-1 rounded-md text-sm font-bold transition-colors ${
            textBox.style.fontWeight === "bold"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() =>
            updateTextStyle({
              fontWeight:
                textBox.style.fontWeight === "bold" ? "normal" : "bold",
            })
          }
        >
          B
        </button>

        <button
          title="Italic"
          className={`px-3 py-1 rounded-md text-sm italic transition-colors ${
            textBox.style.fontStyle === "italic"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() =>
            updateTextStyle({
              fontStyle:
                textBox.style.fontStyle === "italic" ? "normal" : "italic",
            })
          }
        >
          I
        </button>
      </div>

      {/* Text Alignment */}
      <div className="flex items-center bg-gray-200 rounded-md">
        {(["left", "center", "right"] as const).map((align) => (
          <button
            key={align}
            title={`Align ${align}`}
            className={`p-2 rounded-md transition-colors ${
              textBox.style.textAlign === align
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-300"
            }`}
            onClick={() => updateTextStyle({ textAlign: align })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              {align === "left" && (
                <path d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
              )}
              {align === "center" && (
                <path d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
              )}
              {align === "right" && (
                <path d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
              )}
            </svg>
          </button>
        ))}
      </div>

      {/* Color Picker */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="color-picker"
          className="text-sm font-medium text-gray-600"
        >
          Color
        </label>
        <input
          id="color-picker"
          type="color"
          value={textBox.style.color}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateTextStyle({ color: e.target.value })
          }
          className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Toolbar;
