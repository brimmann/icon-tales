import { throttle } from "lodash";
import { useCanvasStore } from "../../store/canvasStore";
import { useMemo, type ChangeEvent, type CSSProperties } from "react";
import type { TextBoxStyle } from "../../types";

function TextBoxFormatingTools() {
  const textBoxFromStore = useCanvasStore((state) => state.getActiveTextBox());

  const updateTextBoxStyle = useCanvasStore(
    (state) => state.updateTextBoxStyle
  );

  const throttledUpdateTextBoxStlye = useMemo(
    () =>
      throttle((newStyle: TextBoxStyle) => {
        updateTextBoxStyle(newStyle);
      }, 100),
    [updateTextBoxStyle]
  );

  const handleFontSize = (e: ChangeEvent<HTMLInputElement>) => {
    if (!textBoxFromStore) return;
    const newStyle: TextBoxStyle = {
      ...textBoxFromStore.style,
      fontSize: parseInt(e.target.value),
    };
    throttledUpdateTextBoxStlye(newStyle);
  };

  const handleBold = () => {
    if (!textBoxFromStore) return;
    const newStyle: TextBoxStyle = {
      ...textBoxFromStore.style,
      fontWeight:
        textBoxFromStore.style.fontWeight === "bold" ? "normal" : "bold",
    };
    updateTextBoxStyle(newStyle);
  };

  const handleItalic = () => {
    if (!textBoxFromStore) return;
    const newStyle: TextBoxStyle = {
      ...textBoxFromStore.style,
      fontStyle:
        textBoxFromStore.style.fontStyle === "italic" ? "normal" : "italic",
    };
    updateTextBoxStyle(newStyle);
  };

  const handleAlignment = (alignment: CSSProperties["textAlign"]) => {
    if (!textBoxFromStore) return;
    const newStyle: TextBoxStyle = {
      ...textBoxFromStore.style,
      textAlign: alignment,
    };
    updateTextBoxStyle(newStyle);
  };

  const handleColor = (e: ChangeEvent<HTMLInputElement>) => {
    if (!textBoxFromStore) return;
    const newStyle: TextBoxStyle = {
      ...textBoxFromStore.style,
      color: e.target.value,
    };
    throttledUpdateTextBoxStlye(newStyle);
  };

  return (
    <div
      className={` bg-white flex items-center gap-4 flex-nowrap p-3 ${
        textBoxFromStore
          ? "opacity-100 pointer-events-auto"
          : "opacity-50 pointer-events-none"
      }`}
    >
      {/* Font Size Control */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-600">Size</label>
        <input
          type="range"
          min="12"
          max="72"
          value={textBoxFromStore?.style.fontSize ?? "12"}
          onChange={handleFontSize}
          disabled={!textBoxFromStore}
          className="w-24 accent-blue-600"
        />
        <span className="text-sm text-gray-800 w-8 text-center font-monorounded-md">
          {textBoxFromStore?.style.fontSize ?? "12"}px
        </span>
      </div>

      {/* Text Style Toggles */}
      <div className="flex items-center gap-2">
        <button
          disabled={!textBoxFromStore}
          title="Bold"
          className={`px-3 py-1 rounded-md text-sm font-bold transition-colors ${
            textBoxFromStore?.style.fontWeight === "bold"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={handleBold}
        >
          B
        </button>

        <button
          disabled={!textBoxFromStore}
          title="Italic"
          className={`px-3 py-1 rounded-md text-sm italic transition-colors ${
            textBoxFromStore?.style.fontStyle === "italic"
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
            disabled={!textBoxFromStore}
            key={align}
            title={`Align ${align}`}
            className={`p-2 rounded-md transition-colors ${
              textBoxFromStore?.style.textAlign === align
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
          value={textBoxFromStore?.style.color ?? "#000000"}
          onChange={handleColor}
          disabled={!textBoxFromStore}
          className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer"
        />
      </div>
    </div>
  );
}
export default TextBoxFormatingTools;
