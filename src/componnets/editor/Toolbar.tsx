import React, { type ChangeEvent, type CSSProperties } from "react";
import { useCanvasStore } from "../../store/canvasStore";
import type { TextBoxStyle } from "../../types";
import { debounce } from "lodash";

const Toolbar: React.FC = () => {
  const textBoxFromStore = useCanvasStore((state) => state.textBox);
  const updateTextBoxStyle = useCanvasStore(
    (state) => state.updateTextBoxStyle
  );

  const debounceUpdateTextBoxStyle = debounce((newStyle: TextBoxStyle) => {
    updateTextBoxStyle(newStyle);
  }, 100);

  const handleFontSize = (e: ChangeEvent<HTMLInputElement>) => {
    const newStyle: TextBoxStyle = {
      ...textBoxFromStore.style,
      fontSize: parseInt(e.target.value),
    };
    debounce(
      (newStyle: TextBoxStyle) => updateTextBoxStyle(newStyle),
      100
    )(newStyle);
  };

  const handleBold = () => {
    const newStyle: TextBoxStyle = {
      ...textBoxFromStore.style,
      fontWeight:
        textBoxFromStore.style.fontWeight === "bold" ? "normal" : "bold",
    };
    debounceUpdateTextBoxStyle(newStyle);
  };

  const handleItalic = () => {
    const newStyle: TextBoxStyle = {
      ...textBoxFromStore.style,
      fontStyle:
        textBoxFromStore.style.fontStyle === "italic" ? "normal" : "italic",
    };
    debounceUpdateTextBoxStyle(newStyle);
  };

  const handleAlignment = (alignment: CSSProperties["textAlign"]) => {
    const newStyle: TextBoxStyle = {
      ...textBoxFromStore.style,
      textAlign: alignment,
    };
    debounceUpdateTextBoxStyle(newStyle);
  };

  const handleColor = (e: ChangeEvent<HTMLInputElement>) => {
    const newStyle: TextBoxStyle = {
      ...textBoxFromStore.style,
      color: e.target.value,
    };
    debounceUpdateTextBoxStyle(newStyle);
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
          value={textBoxFromStore.style.fontSize}
          onChange={handleFontSize}
          className="w-24 accent-blue-600"
        />
        <span className="text-sm text-gray-800 w-8 text-center font-monorounded-md">
          {textBoxFromStore.style.fontSize}px
        </span>
      </div>

      {/* Text Style Toggles */}
      <div className="flex items-center gap-2">
        <button
          title="Bold"
          className={`px-3 py-1 rounded-md text-sm font-bold transition-colors ${
            textBoxFromStore.style.fontWeight === "bold"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={handleBold}
        >
          B
        </button>

        <button
          title="Italic"
          className={`px-3 py-1 rounded-md text-sm italic transition-colors ${
            textBoxFromStore.style.fontStyle === "italic"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={handleItalic}
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
              textBoxFromStore.style.textAlign === align
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-300"
            }`}
            onClick={() => handleAlignment(align)}
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
          value={textBoxFromStore.style.color}
          onChange={handleColor}
          className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Toolbar;
