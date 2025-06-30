import React from "react";
import ReactDOM from "react-dom/client";

// Ensure the root element exists before rendering
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <p>Place your prototype here</p>
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}
