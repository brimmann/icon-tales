import React from "react";
import ReactDOM from "react-dom/client";
import ZoomTest2 from "./ZoomTest2";

// Ensure the root element exists before rendering
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ZoomTest2 />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}
