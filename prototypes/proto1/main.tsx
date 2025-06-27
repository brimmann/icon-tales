import React from "react";
import ReactDOM from "react-dom/client";
import DndSensorsDemo from "./DndSensorsDemo";

// Ensure the root element exists before rendering
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <DndSensorsDemo />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}
